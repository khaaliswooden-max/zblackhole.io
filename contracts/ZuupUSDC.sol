// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";

/**
 * @title zUSDC - Zuup Innovation Labs Agent Treasury Token
 * @notice Stablecoin backed 1:1 by USDC, used to fund autonomous platform agents
 * @dev Implements ERC20 with role-based minting and burning
 * 
 * MECHANISM:
 * - For every $100,000 invested in Zuup, $10,000 is set aside
 * - That $10,000 mints 10,000 zUSDC
 * - zUSDC is distributed to platform agent treasuries
 * - Agents use zUSDC for self-improvement and self-financing
 */
contract ZuupUSDC is ERC20, ERC20Burnable, Pausable, AccessControl {
    
    // ═══════════════════════════════════════════════════════════════════
    //                              ROLES
    // ═══════════════════════════════════════════════════════════════════
    
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
    bytes32 public constant PAUSER_ROLE = keccak256("PAUSER_ROLE");
    bytes32 public constant TREASURY_ROLE = keccak256("TREASURY_ROLE");
    
    // ═══════════════════════════════════════════════════════════════════
    //                           STATE VARIABLES
    // ═══════════════════════════════════════════════════════════════════
    
    /// @notice Address of the USDC reserve backing zUSDC
    address public usdcReserve;
    
    /// @notice Total USDC backing in reserve (tracked for transparency)
    uint256 public totalBacking;
    
    /// @notice Platform agent treasury addresses
    mapping(string => address) public platformTreasuries;
    
    /// @notice Platform allocation weights (basis points, sum = 10000)
    mapping(string => uint256) public platformWeights;
    
    /// @notice List of platform identifiers
    string[] public platforms;
    
    // ═══════════════════════════════════════════════════════════════════
    //                              EVENTS
    // ═══════════════════════════════════════════════════════════════════
    
    event Minted(
        address indexed to,
        uint256 amount,
        uint256 usdcBacking,
        string sourceTransaction
    );
    
    event AgentFunded(
        string indexed platform,
        address indexed treasury,
        uint256 amount
    );
    
    event PlatformRegistered(
        string platform,
        address treasury,
        uint256 weight
    );
    
    event ReserveUpdated(
        address oldReserve,
        address newReserve
    );
    
    // ═══════════════════════════════════════════════════════════════════
    //                            CONSTRUCTOR
    // ═══════════════════════════════════════════════════════════════════
    
    constructor(address _usdcReserve) ERC20("Zuup USD Coin", "zUSDC") {
        require(_usdcReserve != address(0), "Invalid reserve address");
        
        usdcReserve = _usdcReserve;
        
        // Grant roles to deployer (Zuup Labs multisig)
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(MINTER_ROLE, msg.sender);
        _grantRole(PAUSER_ROLE, msg.sender);
        _grantRole(TREASURY_ROLE, msg.sender);
        
        // Initialize the 7 Zuup platforms
        _initializePlatforms();
    }
    
    // ═══════════════════════════════════════════════════════════════════
    //                         CORE FUNCTIONS
    // ═══════════════════════════════════════════════════════════════════
    
    /**
     * @notice Mint zUSDC backed by USDC in reserve
     * @param to Recipient address (typically agent treasury)
     * @param amount Amount to mint (6 decimals, matching USDC)
     * @param sourceTransaction Reference to the investment transaction
     */
    function mint(
        address to,
        uint256 amount,
        string calldata sourceTransaction
    ) external onlyRole(MINTER_ROLE) whenNotPaused {
        require(to != address(0), "Cannot mint to zero address");
        require(amount > 0, "Amount must be positive");
        
        // Update backing tracker
        totalBacking += amount;
        
        // Mint zUSDC
        _mint(to, amount);
        
        emit Minted(to, amount, amount, sourceTransaction);
    }
    
    /**
     * @notice Distribute zUSDC to all platform agent treasuries
     * @param totalAmount Total amount to distribute
     * @dev Splits according to platform weights
     */
    function distributeToAgents(
        uint256 totalAmount
    ) external onlyRole(TREASURY_ROLE) whenNotPaused {
        require(totalAmount > 0, "Amount must be positive");
        require(balanceOf(msg.sender) >= totalAmount, "Insufficient balance");
        
        for (uint i = 0; i < platforms.length; i++) {
            string memory platform = platforms[i];
            address treasury = platformTreasuries[platform];
            uint256 weight = platformWeights[platform];
            
            if (treasury != address(0) && weight > 0) {
                uint256 platformAmount = (totalAmount * weight) / 10000;
                
                if (platformAmount > 0) {
                    _transfer(msg.sender, treasury, platformAmount);
                    emit AgentFunded(platform, treasury, platformAmount);
                }
            }
        }
    }
    
    /**
     * @notice Fund a specific platform's agent treasury
     * @param platform Platform identifier
     * @param amount Amount of zUSDC to transfer
     */
    function fundPlatform(
        string calldata platform,
        uint256 amount
    ) external onlyRole(TREASURY_ROLE) whenNotPaused {
        address treasury = platformTreasuries[platform];
        require(treasury != address(0), "Platform not registered");
        require(amount > 0, "Amount must be positive");
        
        _transfer(msg.sender, treasury, amount);
        emit AgentFunded(platform, treasury, amount);
    }
    
    // ═══════════════════════════════════════════════════════════════════
    //                      PLATFORM MANAGEMENT
    // ═══════════════════════════════════════════════════════════════════
    
    /**
     * @notice Register or update a platform's treasury address and weight
     * @param platform Platform identifier (e.g., "aureon", "relian")
     * @param treasury Treasury address for the platform's agent
     * @param weight Allocation weight in basis points
     */
    function registerPlatform(
        string calldata platform,
        address treasury,
        uint256 weight
    ) external onlyRole(DEFAULT_ADMIN_ROLE) {
        require(treasury != address(0), "Invalid treasury address");
        require(weight <= 10000, "Weight exceeds maximum");
        
        // Check if new platform
        if (platformTreasuries[platform] == address(0)) {
            platforms.push(platform);
        }
        
        platformTreasuries[platform] = treasury;
        platformWeights[platform] = weight;
        
        emit PlatformRegistered(platform, treasury, weight);
    }
    
    /**
     * @notice Update platform allocation weights
     * @param _platforms Array of platform identifiers
     * @param _weights Array of weights (must sum to 10000)
     */
    function updateWeights(
        string[] calldata _platforms,
        uint256[] calldata _weights
    ) external onlyRole(DEFAULT_ADMIN_ROLE) {
        require(_platforms.length == _weights.length, "Length mismatch");
        
        uint256 totalWeight = 0;
        for (uint i = 0; i < _weights.length; i++) {
            totalWeight += _weights[i];
        }
        require(totalWeight == 10000, "Weights must sum to 10000");
        
        for (uint i = 0; i < _platforms.length; i++) {
            platformWeights[_platforms[i]] = _weights[i];
        }
    }
    
    // ═══════════════════════════════════════════════════════════════════
    //                         ADMIN FUNCTIONS
    // ═══════════════════════════════════════════════════════════════════
    
    function pause() external onlyRole(PAUSER_ROLE) {
        _pause();
    }
    
    function unpause() external onlyRole(PAUSER_ROLE) {
        _unpause();
    }
    
    function updateReserve(address newReserve) external onlyRole(DEFAULT_ADMIN_ROLE) {
        require(newReserve != address(0), "Invalid reserve address");
        address oldReserve = usdcReserve;
        usdcReserve = newReserve;
        emit ReserveUpdated(oldReserve, newReserve);
    }
    
    // ═══════════════════════════════════════════════════════════════════
    //                          VIEW FUNCTIONS
    // ═══════════════════════════════════════════════════════════════════
    
    /**
     * @notice Get all registered platforms
     */
    function getPlatforms() external view returns (string[] memory) {
        return platforms;
    }
    
    /**
     * @notice Get platform details
     */
    function getPlatformDetails(string calldata platform) 
        external 
        view 
        returns (address treasury, uint256 weight, uint256 balance) 
    {
        treasury = platformTreasuries[platform];
        weight = platformWeights[platform];
        balance = treasury != address(0) ? balanceOf(treasury) : 0;
    }
    
    /**
     * @notice Returns 6 decimals to match USDC
     */
    function decimals() public pure override returns (uint8) {
        return 6;
    }
    
    // ═══════════════════════════════════════════════════════════════════
    //                      INTERNAL FUNCTIONS
    // ═══════════════════════════════════════════════════════════════════
    
    /**
     * @dev Initialize the 7 Zuup platforms with default weights
     */
    function _initializePlatforms() internal {
        // Platform weights based on maturity and revenue potential
        // Total = 10000 basis points (100%)
        
        platforms.push("aureon");
        platformWeights["aureon"] = 1800;  // 18% - Procurement intelligence
        
        platforms.push("relian");
        platformWeights["relian"] = 2200;  // 22% - Legacy refactoring (highest revenue)
        
        platforms.push("civium");
        platformWeights["civium"] = 1500;  // 15% - Compliance engine
        
        platforms.push("veyra");
        platformWeights["veyra"] = 1500;   // 15% - Autonomy OS
        
        platforms.push("podx");
        platformWeights["podx"] = 1000;    // 10% - Mobile data center
        
        platforms.push("symbion");
        platformWeights["symbion"] = 1000; // 10% - Gut-brain interface
        
        platforms.push("qawm");
        platformWeights["qawm"] = 1000;    // 10% - Quantum archaeology
    }
    
    /**
     * @dev Override to add pause functionality
     */
    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 amount
    ) internal override whenNotPaused {
        super._beforeTokenTransfer(from, to, amount);
    }
}
