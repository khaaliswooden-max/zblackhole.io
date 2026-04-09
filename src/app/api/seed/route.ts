import { NextResponse } from 'next/server';

// Treasury wallet that receives seed round USDC
const TREASURY = 'H1eSx6ij1Q296Tzss62AHuamn1rD4a9MkDapYu1CyvVM';

// USDC mint addresses
const USDC_MINT_MAINNET = 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v';

async function fetchUsdcBalance(rpcUrl: string, mint: string): Promise<number> {
  const res = await fetch(rpcUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      jsonrpc: '2.0',
      id: 1,
      method: 'getTokenAccountsByOwner',
      params: [
        TREASURY,
        { mint },
        { encoding: 'jsonParsed' },
      ],
    }),
  });

  if (!res.ok) return 0;

  const data = await res.json();
  const accounts: unknown[] = data?.result?.value ?? [];

  return accounts.reduce<number>((sum, acc) => {
    const ui = (acc as { account: { data: { parsed: { info: { tokenAmount: { uiAmount: number } } } } } })
      ?.account?.data?.parsed?.info?.tokenAmount?.uiAmount ?? 0;
    return sum + Number(ui);
  }, 0);
}

export async function GET() {
  // Allow overrides via env — useful for manual entry before on-chain data is live
  const envRaised = process.env.SEED_RAISED ? Number(process.env.SEED_RAISED) : null;
  const investors = process.env.SEED_INVESTORS ? Number(process.env.SEED_INVESTORS) : 0;

  let raised = 0;

  if (envRaised !== null) {
    raised = envRaised;
  } else {
    // Query Solana RPC for live USDC balance
    const rpcUrl = process.env.SOLANA_RPC_URL ?? 'https://api.mainnet-beta.solana.com';
    const mint = process.env.USDC_MINT ?? USDC_MINT_MAINNET;

    try {
      raised = await fetchUsdcBalance(rpcUrl, mint);
    } catch {
      raised = 0;
    }
  }

  return NextResponse.json(
    { raised, investors },
    { headers: { 'Cache-Control': 's-maxage=60, stale-while-revalidate=120' } },
  );
}
