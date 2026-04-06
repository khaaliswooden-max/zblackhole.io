'use client';

import dynamic from 'next/dynamic';
import { useCallback, useEffect, useRef, useState } from 'react';

const ForceGraph2D = dynamic(() => import('react-force-graph-2d'), { ssr: false });

// ── Types ─────────────────────────────────────────────────────────────────────

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

// ── Colour palette (from CLAUDE.md design tokens) ────────────────────────────

const NODE_COLOR: Record<NodeType, string> = {
  WorldActor: '#1D9E75',
  ComplianceState: '#7F77DD',
  ProcurementState: '#7F77DD',
  HistoricalRecon: '#EF9F27',
  BiologicalState: '#EF9F27',
  MigrationState: '#EF9F27',
  ComputeState: '#EF9F27',
  SubstrateEvent: '#888780',
};

const NODE_RADIUS: Record<NodeType, number> = {
  WorldActor: 10,
  ComplianceState: 7,
  ProcurementState: 7,
  HistoricalRecon: 7,
  BiologicalState: 7,
  MigrationState: 7,
  ComputeState: 7,
  SubstrateEvent: 5,
};

const LINK_COLOR: Record<RelType, string> = {
  HAS_STATE: 'rgba(255,255,255,0.18)',
  SUPERSEDES: 'rgba(255,255,255,0.07)',
  CAUSED_BY: '#D85A30',
  EMITTED: 'rgba(200,200,200,0.12)',
};

const LINK_WIDTH: Record<RelType, number> = {
  HAS_STATE: 1,
  SUPERSEDES: 1,
  CAUSED_BY: 2,
  EMITTED: 1,
};

// ── Mock graph data ───────────────────────────────────────────────────────────

const RAW_NODES: ZNode[] = [
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

const RAW_LINKS: ZLink[] = [
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

// ── Legend entries ────────────────────────────────────────────────────────────

const LEGEND = [
  { color: NODE_COLOR.WorldActor,      label: 'WorldActor' },
  { color: NODE_COLOR.ComplianceState, label: 'ComplianceState / ProcurementState' },
  { color: NODE_COLOR.HistoricalRecon, label: 'HistoricalRecon / BiologicalState / …' },
  { color: NODE_COLOR.SubstrateEvent,  label: 'SubstrateEvent' },
  { color: LINK_COLOR.CAUSED_BY,       label: 'CAUSED_BY edge', isEdge: true },
];

// ── Inspector helpers ─────────────────────────────────────────────────────────

function inspectorRows(node: ZNode): { k: string; v: string }[] {
  const skip = new Set(['id', 'label', 'index', 'x', 'y', 'vx', 'vy', '__indexColor', 'fx', 'fy']);
  return Object.entries(node)
    .filter(([k]) => !skip.has(k))
    .map(([k, v]) => ({
      k,
      v: v === null || v === undefined ? '—' : String(v),
    }));
}

// ── Component ─────────────────────────────────────────────────────────────────

export default function WorldCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dims, setDims] = useState({ w: 800, h: 600 });
  const [selected, setSelected] = useState<ZNode | null>(null);

  // Resize observer
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => {
      setDims({ w: el.clientWidth, h: el.clientHeight });
    });
    ro.observe(el);
    setDims({ w: el.clientWidth, h: el.clientHeight });
    return () => ro.disconnect();
  }, []);

  // Custom node renderer
  const nodeCanvasObject = useCallback((node: unknown, ctx: CanvasRenderingContext2D) => {
    const n = node as ZNode & { x: number; y: number };
    const r = NODE_RADIUS[n.type] ?? 6;
    const color = NODE_COLOR[n.type] ?? '#888';

    // Circle
    ctx.beginPath();
    ctx.arc(n.x, n.y, r, 0, 2 * Math.PI);
    ctx.fillStyle = color;
    ctx.fill();

    // Subtle glow for WorldActors
    if (n.type === 'WorldActor') {
      ctx.beginPath();
      ctx.arc(n.x, n.y, r + 3, 0, 2 * Math.PI);
      ctx.strokeStyle = `${color}44`;
      ctx.lineWidth = 2;
      ctx.stroke();
    }

    // Highlight selected
    if (selected?.id === n.id) {
      ctx.beginPath();
      ctx.arc(n.x, n.y, r + 4, 0, 2 * Math.PI);
      ctx.strokeStyle = '#ffffff88';
      ctx.lineWidth = 1.5;
      ctx.stroke();
    }

    // Label
    ctx.font = '9px "IBM Plex Mono", monospace';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';
    ctx.fillStyle = '#888880';
    ctx.fillText(n.label, n.x, n.y + r + 3);
  }, [selected]);

  const linkColor = useCallback((link: unknown) => {
    const l = link as ZLink;
    return LINK_COLOR[l.rel] ?? 'rgba(255,255,255,0.1)';
  }, []);

  const linkWidth = useCallback((link: unknown) => {
    const l = link as ZLink;
    return LINK_WIDTH[l.rel] ?? 1;
  }, []);

  const linkDirectionalParticles = useCallback((link: unknown) => {
    const l = link as ZLink;
    return l.rel === 'CAUSED_BY' ? 3 : 0;
  }, []);

  const linkDirectionalParticleColor = useCallback(() => '#D85A30', []);
  const linkDirectionalParticleWidth = useCallback(() => 2, []);
  const linkDirectionalParticleSpeed = useCallback(() => 0.006, []);

  const onNodeClick = useCallback((node: unknown) => {
    const n = node as ZNode;
    setSelected(prev => prev?.id === n.id ? null : n);
  }, []);

  const panelWidth = 260;
  const graphWidth = selected ? dims.w - panelWidth : dims.w;

  return (
    <div
      ref={containerRef}
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        background: '#0a0a0a',
        overflow: 'hidden',
        fontFamily: '"IBM Plex Mono", monospace',
      }}
    >
      {/* Graph */}
      <ForceGraph2D
        width={graphWidth}
        height={dims.h}
        graphData={{ nodes: RAW_NODES as never[], links: RAW_LINKS as never[] }}
        backgroundColor="#0a0a0a"
        nodeCanvasObject={nodeCanvasObject}
        nodeCanvasObjectMode={() => 'replace'}
        nodeLabel={() => ''}
        linkColor={linkColor}
        linkWidth={linkWidth}
        linkDirectionalArrowLength={(link: unknown) => {
          const l = link as ZLink;
          return l.rel === 'CAUSED_BY' ? 5 : 0;
        }}
        linkDirectionalArrowRelPos={1}
        linkDirectionalParticles={linkDirectionalParticles}
        linkDirectionalParticleColor={linkDirectionalParticleColor}
        linkDirectionalParticleWidth={linkDirectionalParticleWidth}
        linkDirectionalParticleSpeed={linkDirectionalParticleSpeed}
        onNodeClick={onNodeClick}
        nodePointerAreaPaint={(node: unknown, color: string, ctx: CanvasRenderingContext2D) => {
          const n = node as ZNode & { x: number; y: number };
          ctx.fillStyle = color;
          ctx.beginPath();
          ctx.arc(n.x, n.y, (NODE_RADIUS[n.type] ?? 6) + 4, 0, 2 * Math.PI);
          ctx.fill();
        }}
        cooldownTicks={120}
        d3AlphaDecay={0.02}
        d3VelocityDecay={0.3}
      />

      {/* Legend */}
      <div
        style={{
          position: 'absolute',
          top: 16,
          left: 16,
          background: 'rgba(10,10,10,0.85)',
          border: '1px solid rgba(255,255,255,0.1)',
          padding: '10px 14px',
          display: 'flex',
          flexDirection: 'column',
          gap: 6,
        }}
      >
        <div style={{ fontSize: 9, color: '#555550', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 4 }}>
          Node Types
        </div>
        {LEGEND.map(({ color, label, isEdge }) => (
          <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            {isEdge ? (
              <div style={{ width: 20, height: 2, background: color, flexShrink: 0 }} />
            ) : (
              <div style={{ width: 10, height: 10, borderRadius: '50%', background: color, flexShrink: 0 }} />
            )}
            <span style={{ fontSize: 10, color: '#888880', whiteSpace: 'nowrap' }}>{label}</span>
          </div>
        ))}
      </div>

      {/* Inspector panel */}
      {selected && (
        <div
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            width: panelWidth,
            height: '100%',
            background: 'rgba(14,14,14,0.97)',
            borderLeft: '1px solid rgba(255,255,255,0.1)',
            padding: '20px 16px',
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            gap: 16,
          }}
        >
          {/* Close */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: 9, color: '#555550', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              Inspector
            </span>
            <button
              onClick={() => setSelected(null)}
              style={{
                background: 'none',
                border: 'none',
                color: '#888880',
                cursor: 'pointer',
                fontSize: 14,
                lineHeight: 1,
                padding: 0,
              }}
            >
              ×
            </button>
          </div>

          {/* Node ID + type dot */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
              <div
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: '50%',
                  background: NODE_COLOR[selected.type] ?? '#888',
                  flexShrink: 0,
                }}
              />
              <span style={{ fontSize: 13, color: '#f0ece4', wordBreak: 'break-all' }}>{selected.id}</span>
            </div>
            <div style={{ fontSize: 10, color: '#7F77DD', marginLeft: 18 }}>{selected.type}</div>
          </div>

          {/* Divider */}
          <div style={{ height: 1, background: 'rgba(255,255,255,0.07)' }} />

          {/* Properties */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {inspectorRows(selected).map(({ k, v }) => (
              <div key={k}>
                <div style={{ fontSize: 9, color: '#555550', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 2 }}>
                  {k}
                </div>
                <div style={{ fontSize: 11, color: '#888880', wordBreak: 'break-all' }}>{v}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Bottom descriptor */}
      <div
        style={{
          position: 'absolute',
          bottom: 16,
          left: 16,
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
        }}
      >
        <span style={{ fontSize: 9, color: '#555550', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
          ZWM — Zuup World Model
        </span>
        <span style={{ fontSize: 10, color: '#444440' }}>
          Force-directed graph of WorldActors, substrate state snapshots, and causal SubstrateEvents.
        </span>
      </div>
    </div>
  );
}
