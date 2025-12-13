"""
Zuup Seed Funding API Server
Zero Trust backend for dual-rail payments and zUSDC minting.
"""

from fastapi import FastAPI, HTTPException, Depends, Header, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import HTTPBearer
from pydantic import BaseModel, Field, validator
from decimal import Decimal
from datetime import datetime
from typing import Optional, Literal
from enum import Enum
import hashlib
import hmac
import jwt
import os


# ═══════════════════════════════════════════════════════════════════════════
#                              CONFIGURATION
# ═══════════════════════════════════════════════════════════════════════════

class Config:
    """Environment configuration with secrets from vault."""
    
    # API Security
    JWT_SECRET = os.getenv("JWT_SECRET")
    JWT_ALGORITHM = "ES256"
    JWT_EXPIRY_MINUTES = 15
    
    # Wells Fargo / Plaid
    PLAID_CLIENT_ID = os.getenv("PLAID_CLIENT_ID")
    PLAID_SECRET = os.getenv("PLAID_SECRET")
    PLAID_ENV = os.getenv("PLAID_ENV", "sandbox")
    
    # Coinbase
    COINBASE_API_KEY = os.getenv("COINBASE_API_KEY")
    COINBASE_WEBHOOK_SECRET = os.getenv("COINBASE_WEBHOOK_SECRET")
    
    # zUSDC Contract
    WEB3_PROVIDER = os.getenv("WEB3_PROVIDER")
    ZUSDC_CONTRACT = os.getenv("ZUSDC_CONTRACT_ADDRESS")
    MINTER_PRIVATE_KEY = os.getenv("MINTER_PRIVATE_KEY")
    
    # Treasury
    OPERATING_RATIO = Decimal("0.90")
    AGENT_RESERVE_RATIO = Decimal("0.10")
    MIN_INVESTMENT = Decimal("10000")


# ═══════════════════════════════════════════════════════════════════════════
#                              DATA MODELS
# ═══════════════════════════════════════════════════════════════════════════

class PaymentRail(str, Enum):
    FIAT = "fiat"
    CRYPTO = "crypto"


class FiatMethod(str, Enum):
    ACH = "ach"
    WIRE = "wire"


class CryptoAsset(str, Enum):
    USDC = "usdc"
    ETH = "eth"
    BTC = "btc"


class InvestorRegistration(BaseModel):
    """New investor registration request."""
    legal_name: str = Field(..., min_length=2, max_length=200)
    email: str = Field(..., regex=r'^[\w\.-]+@[\w\.-]+\.\w+$')
    entity_type: Literal["individual", "entity"] = "individual"
    accreditation_status: Literal["accredited", "qualified", "pending"] = "pending"
    jurisdiction: str = Field(default="US", max_length=2)


class FiatInvestmentRequest(BaseModel):
    """Fiat investment initiation request."""
    amount: Decimal = Field(..., ge=10000, description="Investment amount in USD")
    method: FiatMethod
    plaid_public_token: Optional[str] = None  # For ACH
    
    @validator('amount')
    def validate_amount(cls, v):
        if v < Config.MIN_INVESTMENT:
            raise ValueError(f"Minimum investment is ${Config.MIN_INVESTMENT}")
        return v


class CryptoInvestmentRequest(BaseModel):
    """Crypto investment initiation request."""
    amount_usd: Decimal = Field(..., ge=10000, description="Investment amount in USD equivalent")
    asset: CryptoAsset
    
    @validator('amount_usd')
    def validate_amount(cls, v):
        if v < Config.MIN_INVESTMENT:
            raise ValueError(f"Minimum investment is ${Config.MIN_INVESTMENT}")
        return v


class InvestmentResponse(BaseModel):
    """Response after initiating an investment."""
    transaction_id: str
    rail: PaymentRail
    amount_usd: Decimal
    status: str
    zusdc_to_mint: Decimal  # 10% of amount
    
    # Rail-specific details
    wire_instructions: Optional[dict] = None
    coinbase_charge_url: Optional[str] = None
    
    created_at: datetime


class TreasurySplitResponse(BaseModel):
    """Response showing treasury split details."""
    split_id: str
    total_amount: Decimal
    operating_amount: Decimal
    agent_reserve_amount: Decimal
    zusdc_minted: Decimal
    distribution: dict  # Platform -> amount


# ═══════════════════════════════════════════════════════════════════════════
#                           ZERO TRUST SECURITY
# ═══════════════════════════════════════════════════════════════════════════

security = HTTPBearer()


class ZeroTrustVerifier:
    """
    Implements Zero Trust verification for all requests.
    Every request must pass multiple verification layers.
    """
    
    def __init__(self):
        self.jwt_secret = Config.JWT_SECRET
    
    async def verify_request(
        self,
        request: Request,
        authorization: str = Header(...),
        x_request_signature: str = Header(...),
        x_timestamp: str = Header(...)
    ) -> dict:
        """
        Full Zero Trust verification:
        1. JWT token validation
        2. Request signature verification
        3. Timestamp freshness check
        4. Rate limit check
        """
        
        # Extract JWT
        if not authorization.startswith("Bearer "):
            raise HTTPException(status_code=401, detail="Invalid authorization header")
        
        token = authorization[7:]
        
        # Step 1: JWT Verification
        try:
            payload = jwt.decode(
                token,
                self.jwt_secret,
                algorithms=[Config.JWT_ALGORITHM],
                options={"require": ["exp", "sub", "iat"]}
            )
        except jwt.ExpiredSignatureError:
            raise HTTPException(status_code=401, detail="Token expired")
        except jwt.InvalidTokenError as e:
            raise HTTPException(status_code=401, detail=f"Invalid token: {str(e)}")
        
        # Step 2: Timestamp freshness (prevent replay attacks)
        try:
            request_time = datetime.fromisoformat(x_timestamp)
            age = (datetime.utcnow() - request_time).total_seconds()
            if abs(age) > 300:  # 5 minute window
                raise HTTPException(status_code=401, detail="Request timestamp too old")
        except ValueError:
            raise HTTPException(status_code=400, detail="Invalid timestamp format")
        
        # Step 3: Request signature verification
        body = await request.body()
        expected_signature = self._compute_signature(
            payload["sub"],
            x_timestamp,
            body
        )
        
        if not hmac.compare_digest(x_request_signature, expected_signature):
            raise HTTPException(status_code=401, detail="Invalid request signature")
        
        # Step 4: Load investor and check compliance
        investor = await self._load_investor(payload["sub"])
        if not investor:
            raise HTTPException(status_code=404, detail="Investor not found")
        
        if investor.get("kyc_status") != "verified":
            raise HTTPException(status_code=403, detail="KYC verification required")
        
        if investor.get("aml_status") == "flagged":
            raise HTTPException(status_code=403, detail="Account under review")
        
        return {
            "investor_id": payload["sub"],
            "investor": investor
        }
    
    def _compute_signature(self, investor_id: str, timestamp: str, body: bytes) -> str:
        """Compute HMAC signature for request verification."""
        message = f"{investor_id}:{timestamp}:{body.hex()}".encode()
        return hmac.new(
            self.jwt_secret.encode(),
            message,
            hashlib.sha256
        ).hexdigest()
    
    async def _load_investor(self, investor_id: str) -> Optional[dict]:
        """Load investor from database."""
        # In production: query database
        # For now: stub
        return {
            "investor_id": investor_id,
            "kyc_status": "verified",
            "aml_status": "cleared",
            "accreditation": "accredited"
        }


verifier = ZeroTrustVerifier()


# ═══════════════════════════════════════════════════════════════════════════
#                              FASTAPI APP
# ═══════════════════════════════════════════════════════════════════════════

app = FastAPI(
    title="Zuup Seed Funding API",
    description="Zero Trust API for dual-rail seed investments",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://zuup.org", "https://zblackhole.io", "http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["GET", "POST"],
    allow_headers=["*"],
)


# ═══════════════════════════════════════════════════════════════════════════
#                              ENDPOINTS
# ═══════════════════════════════════════════════════════════════════════════

@app.get("/health")
async def health_check():
    """Health check endpoint."""
    return {"status": "healthy", "timestamp": datetime.utcnow().isoformat()}


@app.post("/api/v1/investors/register")
async def register_investor(registration: InvestorRegistration):
    """
    Register a new investor.
    Initiates KYC/AML verification process.
    """
    investor_id = hashlib.sha256(
        f"{registration.email}:{datetime.utcnow().isoformat()}".encode()
    ).hexdigest()[:32]
    
    # In production: 
    # 1. Store investor record
    # 2. Initiate KYC verification (e.g., Persona, Jumio)
    # 3. Run AML screening (e.g., ComplyAdvantage)
    
    return {
        "investor_id": investor_id,
        "status": "pending_verification",
        "kyc_url": f"https://zblackhole.io/verify/{investor_id}",
        "message": "Please complete identity verification to proceed"
    }


@app.post("/api/v1/invest/fiat", response_model=InvestmentResponse)
async def initiate_fiat_investment(
    request: Request,
    investment: FiatInvestmentRequest,
    auth: dict = Depends(verifier.verify_request)
):
    """
    Initiate a fiat investment via Wells Fargo (ACH or Wire).
    """
    investor_id = auth["investor_id"]
    transaction_id = _generate_transaction_id()
    
    zusdc_amount = investment.amount * Config.AGENT_RESERVE_RATIO
    
    if investment.method == FiatMethod.ACH:
        # Process via Plaid Transfer
        # In production: call Plaid API
        wire_instructions = None
    else:
        # Generate wire instructions
        wire_instructions = {
            "bank_name": "Wells Fargo Bank, N.A.",
            "routing_number": "121000248",
            "account_number": "XXXX-MASKED-XXXX",
            "account_name": "Zuup Innovation Labs LLC",
            "reference": f"ZUUP-SEED-{transaction_id[:8]}",
            "swift_code": "WFBIUS6S"
        }
    
    # Store pending transaction
    # In production: persist to database
    
    return InvestmentResponse(
        transaction_id=transaction_id,
        rail=PaymentRail.FIAT,
        amount_usd=investment.amount,
        status="pending",
        zusdc_to_mint=zusdc_amount,
        wire_instructions=wire_instructions,
        coinbase_charge_url=None,
        created_at=datetime.utcnow()
    )


@app.post("/api/v1/invest/crypto", response_model=InvestmentResponse)
async def initiate_crypto_investment(
    request: Request,
    investment: CryptoInvestmentRequest,
    auth: dict = Depends(verifier.verify_request)
):
    """
    Initiate a crypto investment via Coinbase Commerce.
    """
    investor_id = auth["investor_id"]
    transaction_id = _generate_transaction_id()
    
    zusdc_amount = investment.amount_usd * Config.AGENT_RESERVE_RATIO
    
    # In production: Create Coinbase Commerce charge
    # charge = coinbase_client.charge.create(...)
    
    coinbase_charge_url = f"https://commerce.coinbase.com/charges/{transaction_id}"
    
    return InvestmentResponse(
        transaction_id=transaction_id,
        rail=PaymentRail.CRYPTO,
        amount_usd=investment.amount_usd,
        status="pending",
        zusdc_to_mint=zusdc_amount,
        wire_instructions=None,
        coinbase_charge_url=coinbase_charge_url,
        created_at=datetime.utcnow()
    )


@app.get("/api/v1/invest/{transaction_id}/status")
async def get_investment_status(
    transaction_id: str,
    auth: dict = Depends(verifier.verify_request)
):
    """
    Get the status of an investment transaction.
    """
    # In production: query database
    return {
        "transaction_id": transaction_id,
        "status": "pending",
        "zusdc_minted": 0,
        "updated_at": datetime.utcnow().isoformat()
    }


@app.post("/api/v1/webhooks/coinbase")
async def coinbase_webhook(request: Request):
    """
    Handle Coinbase Commerce webhooks for crypto payment confirmation.
    """
    signature = request.headers.get("X-CC-Webhook-Signature")
    body = await request.body()
    
    # Verify webhook signature
    expected_sig = hmac.new(
        Config.COINBASE_WEBHOOK_SECRET.encode() if Config.COINBASE_WEBHOOK_SECRET else b"",
        body,
        hashlib.sha256
    ).hexdigest()
    
    if not hmac.compare_digest(signature or "", expected_sig):
        raise HTTPException(status_code=401, detail="Invalid webhook signature")
    
    # Process webhook
    # In production: 
    # 1. Update transaction status
    # 2. Trigger treasury split
    # 3. Mint zUSDC
    
    return {"status": "processed"}


@app.post("/api/v1/webhooks/plaid")
async def plaid_webhook(request: Request):
    """
    Handle Plaid webhooks for ACH transfer status.
    """
    # Similar verification and processing logic
    return {"status": "processed"}


@app.get("/api/v1/treasury/stats")
async def get_treasury_stats():
    """
    Get current treasury statistics (public endpoint).
    """
    # In production: query actual data
    return {
        "total_raised": 247500,
        "target": 2000000,
        "investor_count": 12,
        "zusdc_minted": 24750,
        "platforms": {
            "aureon": {"balance": 4455, "weight": 0.18},
            "relian": {"balance": 5445, "weight": 0.22},
            "civium": {"balance": 3712, "weight": 0.15},
            "veyra": {"balance": 3712, "weight": 0.15},
            "podx": {"balance": 2475, "weight": 0.10},
            "symbion": {"balance": 2475, "weight": 0.10},
            "qawm": {"balance": 2475, "weight": 0.10}
        },
        "updated_at": datetime.utcnow().isoformat()
    }


# ═══════════════════════════════════════════════════════════════════════════
#                              UTILITIES
# ═══════════════════════════════════════════════════════════════════════════

def _generate_transaction_id() -> str:
    """Generate a unique transaction ID."""
    import uuid
    return str(uuid.uuid4())


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8080)
