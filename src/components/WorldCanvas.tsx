'use client';

import dynamic from 'next/dynamic';
import type { NodeObject, LinkObject } from 'react-force-graph-2d';
import { useCallback, useEffect, useRef, useState } from 'react';

const ForceGraph2D = dynamic(() => import('react-force-graph-2d'), { ssr: false });

type NodeType =
  | 'WorldActor'
  | 'ComplianceState'
  | 'ProcurementState'
  | 'HistoricalRecon'
  | 'BiologicalState'
  | 'SubstrateEvent';

type LinkType = 'HAS_STATE' | 'CAUSED_BY';

interface GraphNode extends NodeObject {
  type: NodeType;
  timestamp: string;
}

interface GraphLink extends LinkObject {
  type: LinkType;
}

const NODE_COLOR: Record<NodeType, string> = {
  WorldActor: '#1D9E75',
  ComplianceState: '#7F77DD',
  ProcurementState: '#7F77DD',
  HistoricalRecon: '#EF9F27',
  BiologicalState: '#EF9F27',
  SubstrateEvent: '#888780',
};

const NODE_RADIUS: Record<NodeType, number> = {
  WorldActor: 7,
  ComplianceState: 5,
  ProcurementState: 5,
  HistoricalRecon: 5,
  BiologicalState: 5,
  SubstrateEvent: 4,
};

const MOCK_NODES: GraphNode[] = [
  { id: 'actor-001', type: 'WorldActor', timestamp: '2026-04-06T08:12:00Z' },
  { id: 'actor-002', type: 'WorldActor', timestamp: '2026-04-06T08:14:00Z' },
  { id: 'actor-003', type: 'WorldActor', timestamp: '2026-04-06T08:16:00Z' },
  { id: 'comp-001', type: 'ComplianceState', timestamp: '2026-04-06T08:20:00Z' },
  { id: 'comp-002', type: 'ComplianceState', timestamp: '2026-04-06T08:22:00Z' },
  { id: 'proc-001', type: 'ProcurementState', timestamp: '2026-04-06T08:24:00Z' },
  { id: 'proc-002', type: 'ProcurementState', timestamp: '2026-04-06T08:26:00Z' },
  { id: 'hist-001', type: 'HistoricalRecon', timestamp: '2026-04-06T08:28:00Z' },
  { id: 'hist-002', type: 'HistoricalRecon', timestamp: '2026-04-06T08:30:00Z' },
  { id: 'bio-001', type: 'BiologicalState', timestamp: '2026-04-06T08:32:00Z' },
  { id: 'event-001', type: 'SubstrateEvent', timestamp: '2026-04-06T08:34:00Z' },
  { id: 'event-002', type: 'SubstrateEvent', timestamp: '2026-04-06T08:36:00Z' },
  { id: 'event-003', type: 'SubstrateEvent', timestamp: '2026-04-06T08:38:00Z' },
  { id: 'event-004', type: 'SubstrateEvent', timestamp: '2026-04-06T08:40:00Z' },
];

const MOCK_LINKS: GraphLink[] = [
  { source: 'actor-001', target: 'comp-001', type: 'HAS_STATE' },
  { source: 'actor-001', target: 'proc-001', type: 'HAS_STATE' },
  { source: 'actor-002', target: 'comp-002', type: 'HAS_STATE' },
  { source: 'actor-002', target: 'hist-001', type: 'HAS_STATE' },
  { source: 'actor-003', target: 'proc-002', type: 'HAS_STATE' },
  { source: 'actor-003', target: 'bio-001', type: 'HAS_STATE' },
  { source: 'actor-003', target: 'hist-002', type: 'HAS_STATE' },
  { source: 'comp-001', target: 'event-001', type: 'CAUSED_BY' },
  { source: 'comp-002', target: 'event-002', type: 'CAUSED_BY' },
  { source: 'proc-001', target: 'event-003', type: 'CAUSED_BY' },
  { source: 'bio-001', target: 'event-004', type: 'CAUSED_BY' },
];

export default function WorldCanvas() {
  const [selected, setSelected] = useState<GraphNode | null>(null);
  const [dims, setDims] = useState({ width: 1200, height: 600 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function measure() {
      if (containerRef.current) {
        setDims({
          width: containerRef.current.offsetWidth,
          height: containerRef.current.offsetHeight,
        });
      }
    }
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  const nodeCanvasObject = useCallback(
    (node: NodeObject, ctx: CanvasRenderingContext2D, globalScale: number) => {
      const n = node as GraphNode;
      const x = n.x ?? 0;
      const y = n.y ?? 0;
      const color = NODE_COLOR[n.type];
      const r = NODE_RADIUS[n.type];

      ctx.beginPath();
      ctx.arc(x, y, r, 0, 2 * Math.PI);
      ctx.fillStyle = color;
      ctx.fill();

      const fontSize = 10 / globalScale;
      ctx.font = `${fontSize}px 'IBM Plex Mono', monospace`;
      ctx.fillStyle = '#888880';
      ctx.textAlign = 'center';
      ctx.fillText(String(n.id ?? ''), x, y + r + fontSize + 1);
    },
    []
  );

  const handleNodeClick = useCallback(
    (node: NodeObject, _event: MouseEvent) => {
      setSelected(node as GraphNode);
    },
    []
  );

  const getLinkColor = useCallback(
    (link: LinkObject) => ((link as GraphLink).type === 'CAUSED_BY' ? '#D85A30' : 'rgba(255,255,255,0.25)'),
    []
  );

  const getLinkWidth = useCallback(
    (link: LinkObject) => ((link as GraphLink).type === 'CAUSED_BY' ? 1.5 : 1),
    []
  );

  return (
    <div
      ref={containerRef}
      style={{ width: '100%', height: '60vh', background: '#0a0a0a', position: 'relative' }}
    >
      <ForceGraph2D
        graphData={{ nodes: MOCK_NODES, links: MOCK_LINKS }}
        backgroundColor="#0a0a0a"
        width={dims.width}
        height={dims.height}
        nodeCanvasObject={nodeCanvasObject}
        nodeCanvasObjectMode={() => 'replace'}
        linkColor={getLinkColor}
        linkWidth={getLinkWidth}
        linkDirectionalArrowLength={4}
        linkDirectionalArrowRelPos={1}
        onNodeClick={handleNodeClick}
      />

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
            {String(selected.id ?? '')}
          </div>
          <div style={{ fontSize: 10, color: '#888880' }}>
            {selected.timestamp.replace('T', ' ').slice(0, 19)} UTC
          </div>
        </div>
      )}
    </div>
  );
}
