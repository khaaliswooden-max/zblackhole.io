'use client';

import { useState } from 'react';

type ZNodeType =
  | 'WorldActor'
  | 'ComplianceState'
  | 'ProcurementState'
  | 'HistoricalRecon'
  | 'BiologicalState'
  | 'SubstrateEvent';

interface GraphNode {
  id: string;
  type: ZNodeType;
  timestamp: string;
  x: number;
  y: number;
}

interface GraphLink {
  source: string;
  target: string;
  type: 'HAS_STATE' | 'CAUSED_BY';
}

const NODE_COLOR: Record<ZNodeType, string> = {
  WorldActor: '#1D9E75',
  ComplianceState: '#7F77DD',
  ProcurementState: '#7F77DD',
  HistoricalRecon: '#EF9F27',
  BiologicalState: '#EF9F27',
  SubstrateEvent: '#888780',
};

const NODE_RADIUS: Record<ZNodeType, number> = {
  WorldActor: 7,
  ComplianceState: 5,
  ProcurementState: 5,
  HistoricalRecon: 5,
  BiologicalState: 5,
  SubstrateEvent: 4,
};

const NODES: GraphNode[] = [
  { id: 'actor-001', type: 'WorldActor',      timestamp: '2026-04-06T08:12:00Z', x: 130, y: 110 },
  { id: 'actor-002', type: 'WorldActor',      timestamp: '2026-04-06T08:14:00Z', x: 130, y: 300 },
  { id: 'actor-003', type: 'WorldActor',      timestamp: '2026-04-06T08:16:00Z', x: 130, y: 490 },
  { id: 'comp-001',  type: 'ComplianceState', timestamp: '2026-04-06T08:20:00Z', x: 340, y:  70 },
  { id: 'proc-001',  type: 'ProcurementState',timestamp: '2026-04-06T08:24:00Z', x: 340, y: 160 },
  { id: 'comp-002',  type: 'ComplianceState', timestamp: '2026-04-06T08:22:00Z', x: 340, y: 255 },
  { id: 'hist-001',  type: 'HistoricalRecon', timestamp: '2026-04-06T08:28:00Z', x: 340, y: 345 },
  { id: 'proc-002',  type: 'ProcurementState',timestamp: '2026-04-06T08:26:00Z', x: 340, y: 430 },
  { id: 'bio-001',   type: 'BiologicalState', timestamp: '2026-04-06T08:32:00Z', x: 340, y: 510 },
  { id: 'hist-002',  type: 'HistoricalRecon', timestamp: '2026-04-06T08:30:00Z', x: 340, y: 590 },
  { id: 'event-001', type: 'SubstrateEvent',  timestamp: '2026-04-06T08:34:00Z', x: 550, y:  70 },
  { id: 'event-003', type: 'SubstrateEvent',  timestamp: '2026-04-06T08:38:00Z', x: 550, y: 160 },
  { id: 'event-002', type: 'SubstrateEvent',  timestamp: '2026-04-06T08:36:00Z', x: 550, y: 255 },
  { id: 'event-004', type: 'SubstrateEvent',  timestamp: '2026-04-06T08:40:00Z', x: 550, y: 510 },
];

const LINKS: GraphLink[] = [
  { source: 'actor-001', target: 'comp-001',  type: 'HAS_STATE' },
  { source: 'actor-001', target: 'proc-001',  type: 'HAS_STATE' },
  { source: 'actor-002', target: 'comp-002',  type: 'HAS_STATE' },
  { source: 'actor-002', target: 'hist-001',  type: 'HAS_STATE' },
  { source: 'actor-003', target: 'proc-002',  type: 'HAS_STATE' },
  { source: 'actor-003', target: 'bio-001',   type: 'HAS_STATE' },
  { source: 'actor-003', target: 'hist-002',  type: 'HAS_STATE' },
  { source: 'comp-001',  target: 'event-001', type: 'CAUSED_BY' },
  { source: 'proc-001',  target: 'event-003', type: 'CAUSED_BY' },
  { source: 'comp-002',  target: 'event-002', type: 'CAUSED_BY' },
  { source: 'bio-001',   target: 'event-004', type: 'CAUSED_BY' },
];

const nodeById = Object.fromEntries(NODES.map((n) => [n.id, n]));

export default function WorldCanvas() {
  const [selected, setSelected] = useState<GraphNode | null>(null);

  return (
    <div
      style={{
        width: '100%',
        height: '60vh',
        background: '#0a0a0a',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 700 660"
        preserveAspectRatio="xMidYMid meet"
        style={{ display: 'block' }}
      >
        <defs>
          <marker id="arr-causedby" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
            <path d="M0,0 L0,6 L6,3 z" fill="#D85A30" />
          </marker>
          <marker id="arr-hasstate" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
            <path d="M0,0 L0,6 L6,3 z" fill="rgba(255,255,255,0.15)" />
          </marker>
        </defs>

        {LINKS.map((link, i) => {
          const src = nodeById[link.source];
          const tgt = nodeById[link.target];
          if (!src || !tgt) return null;
          const isCausedBy = link.type === 'CAUSED_BY';
          const dx = tgt.x - src.x;
          const dy = tgt.y - src.y;
          const len = Math.sqrt(dx * dx + dy * dy);
          const r = NODE_RADIUS[tgt.type] + 3;
          return (
            <line
              key={i}
              x1={src.x}
              y1={src.y}
              x2={tgt.x - (dx / len) * r}
              y2={tgt.y - (dy / len) * r}
              stroke={isCausedBy ? '#D85A30' : 'rgba(255,255,255,0.25)'}
              strokeWidth={isCausedBy ? 1.5 : 1}
              markerEnd={isCausedBy ? 'url(#arr-causedby)' : 'url(#arr-hasstate)'}
            />
          );
        })}

        {NODES.map((node) => {
          const color = NODE_COLOR[node.type];
          const r = NODE_RADIUS[node.type];
          const isSelected = selected?.id === node.id;
          return (
            <g
              key={node.id}
              onClick={() => setSelected(isSelected ? null : node)}
              style={{ cursor: 'pointer' }}
            >
              <circle
                cx={node.x}
                cy={node.y}
                r={r + (isSelected ? 2 : 0)}
                fill={color}
                stroke={isSelected ? '#ffffff' : 'none'}
                strokeWidth={isSelected ? 1.5 : 0}
              />
              <text
                x={node.x}
                y={node.y + r + 12}
                textAnchor="middle"
                fontSize={9}
                fontFamily="'IBM Plex Mono', monospace"
                fill="#888880"
              >
                {node.id}
              </text>
            </g>
          );
        })}
      </svg>

      {selected && (
        <div
          style={{
            position: 'absolute',
            top: 16,
            right: 16,
            width: 240,
            background: 'rgba(10,10,10,0.95)',
            border: '1px solid rgba(255,255,255,0.12)',
            padding: '20px 16px 16px',
            fontFamily: "'IBM Plex Mono', monospace",
          }}
        >
          <button
            onClick={() => setSelected(null)}
            style={{
              position: 'absolute',
              top: 8,
              right: 12,
              background: 'none',
              border: 'none',
              color: '#888880',
              cursor: 'pointer',
              fontSize: 16,
              lineHeight: 1,
            }}
          >
            ×
          </button>
          <div
            style={{
              fontSize: 10,
              color: '#888880',
              marginBottom: 8,
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
            }}
          >
            {selected.type}
          </div>
          <div
            style={{
              fontSize: 12,
              color: NODE_COLOR[selected.type],
              marginBottom: 8,
              wordBreak: 'break-all',
            }}
          >
            {selected.id}
          </div>
          <div style={{ fontSize: 10, color: '#888880' }}>
            {selected.timestamp.replace('T', ' ').slice(0, 19)} UTC
          </div>
        </div>
      )}
    </div>
  );
}
