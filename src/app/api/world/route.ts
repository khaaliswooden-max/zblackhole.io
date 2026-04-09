import { NextResponse } from 'next/server';

// These types mirror the ZNode / ZLink shapes in WorldCanvas.tsx
type NodeType =
  | 'WorldActor'
  | 'ComplianceState'
  | 'ProcurementState'
  | 'HistoricalRecon'
  | 'BiologicalState'
  | 'MigrationState'
  | 'ComputeState'
  | 'SubstrateEvent';

type RelType = 'HAS_STATE' | 'SUPERSEDES' | 'CAUSED_BY' | 'EMITTED';

interface ZNode {
  id: string;
  label: string;
  type: NodeType;
  substrate: string;
  timestamp?: string;
  [key: string]: unknown;
}

interface ZLink {
  source: string;
  target: string;
  rel: RelType;
}

interface WorldGraph {
  nodes: ZNode[];
  links: ZLink[];
  fetchedAt: string;
}

// ---------------------------------------------------------------------------
// Live data source
// ---------------------------------------------------------------------------
// Set WORLD_API_URL in your environment to forward to a real backend.
// When not set, this route returns the canonical seed graph so the
// WorldCanvas always has data to display even before the live service exists.
// ---------------------------------------------------------------------------

async function fetchFromUpstream(url: string): Promise<WorldGraph | null> {
  try {
    const res = await fetch(url);
    if (!res.ok) return null;
    const data = await res.json();
    return { ...data, fetchedAt: new Date().toISOString() };
  } catch {
    return null;
  }
}

function seedGraph(): WorldGraph {
  const nodes: ZNode[] = [
    { id: 'actor-001', label: 'actor-001', type: 'WorldActor', substrate: 'world' },
    { id: 'actor-002', label: 'actor-002', type: 'WorldActor', substrate: 'world' },
    { id: 'actor-003', label: 'actor-003', type: 'WorldActor', substrate: 'world' },
    { id: 'comp-001', label: 'comp-001', type: 'ComplianceState', substrate: 'civium', timestamp: '2026-04-06T10:01:00Z', score: 88 },
    { id: 'comp-002', label: 'comp-002', type: 'ComplianceState', substrate: 'civium', timestamp: '2026-04-06T09:44:00Z', score: 71 },
    { id: 'proc-001', label: 'proc-001', type: 'ProcurementState', substrate: 'aureon', timestamp: '2026-04-06T10:02:00Z', fitiq: 84 },
    { id: 'proc-002', label: 'proc-002', type: 'ProcurementState', substrate: 'aureon', timestamp: '2026-04-06T09:51:00Z', fitiq: 46 },
    { id: 'hist-001', label: 'hist-001', type: 'HistoricalRecon', substrate: 'qal', timestamp: '2026-04-06T09:55:00Z', confidence: 0.82 },
    { id: 'hist-002', label: 'hist-002', type: 'HistoricalRecon', substrate: 'qal', timestamp: '2026-04-06T09:33:00Z', confidence: 0.61 },
    { id: 'bio-001', label: 'bio-001', type: 'BiologicalState', substrate: 'symbion', timestamp: '2026-04-06T10:03:00Z', anomaly: true },
    { id: 'mig-001', label: 'mig-001', type: 'MigrationState', substrate: 'relian', timestamp: '2026-04-06T09:48:00Z', preservation: 0.97 },
    { id: 'compute-001', label: 'compute-001', type: 'ComputeState', substrate: 'podx', timestamp: '2026-04-06T10:04:00Z', availability: 0.99 },
    { id: 'event-001', label: 'event-001', type: 'SubstrateEvent', substrate: 'civium', timestamp: '2026-04-06T09:44:00Z' },
    { id: 'event-002', label: 'event-002', type: 'SubstrateEvent', substrate: 'aureon', timestamp: '2026-04-06T09:51:00Z' },
    { id: 'event-003', label: 'event-003', type: 'SubstrateEvent', substrate: 'symbion', timestamp: '2026-04-06T10:03:00Z' },
    { id: 'event-004', label: 'event-004', type: 'SubstrateEvent', substrate: 'qal', timestamp: '2026-04-06T09:55:00Z' },
  ];

  const links: ZLink[] = [
    { source: 'actor-001', target: 'comp-001', rel: 'HAS_STATE' },
    { source: 'actor-001', target: 'proc-001', rel: 'HAS_STATE' },
    { source: 'actor-001', target: 'mig-001',  rel: 'HAS_STATE' },
    { source: 'actor-002', target: 'comp-002',    rel: 'HAS_STATE' },
    { source: 'actor-002', target: 'hist-001',    rel: 'HAS_STATE' },
    { source: 'actor-002', target: 'compute-001', rel: 'HAS_STATE' },
    { source: 'actor-003', target: 'bio-001',  rel: 'HAS_STATE' },
    { source: 'actor-003', target: 'hist-002', rel: 'HAS_STATE' },
    { source: 'actor-003', target: 'proc-002', rel: 'HAS_STATE' },
    { source: 'comp-001', target: 'comp-002', rel: 'SUPERSEDES' },
    { source: 'proc-001', target: 'proc-002', rel: 'SUPERSEDES' },
    { source: 'hist-001', target: 'hist-002', rel: 'SUPERSEDES' },
    { source: 'comp-002', target: 'event-001', rel: 'CAUSED_BY' },
    { source: 'proc-002', target: 'event-002', rel: 'CAUSED_BY' },
    { source: 'bio-001',  target: 'event-003', rel: 'CAUSED_BY' },
    { source: 'hist-001', target: 'event-004', rel: 'CAUSED_BY' },
    { source: 'comp-002', target: 'event-001', rel: 'EMITTED' },
    { source: 'proc-002', target: 'event-002', rel: 'EMITTED' },
  ];

  return { nodes, links, fetchedAt: new Date().toISOString() };
}

export async function GET() {
  const upstreamUrl = process.env.WORLD_API_URL;
  const graph = upstreamUrl ? (await fetchFromUpstream(upstreamUrl) ?? seedGraph()) : seedGraph();

  return NextResponse.json(graph, {
    headers: { 'Cache-Control': 's-maxage=30, stale-while-revalidate=60' },
  });
}
