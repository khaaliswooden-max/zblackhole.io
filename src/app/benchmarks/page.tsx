type Metric = {
  value: string;
  platform: string;
  name: string;
  label: string;
  bar: number;
};

function MetricCell({ m }: { m: Metric }) {
  return (
    <div
      className="flex flex-col gap-2 border p-4 font-mono"
      style={{ borderColor: 'var(--line)', background: 'var(--bg)' }}
    >
      <span className="text-[36px] font-light tabular-nums leading-none" style={{ color: 'var(--fg)' }}>
        {m.value}
      </span>
      <span className="text-[10px] uppercase tracking-wider" style={{ color: 'var(--fg-muted)' }}>
        {m.platform}
      </span>
      <span className="text-[9px] uppercase tracking-wider" style={{ color: 'var(--fg-muted)' }}>
        {m.name}
      </span>
      <span className="text-[11px]" style={{ color: 'var(--fg-dim)' }}>
        {m.label}
      </span>
      <div className="mt-2 h-0.5 w-full" style={{ background: 'var(--line)' }}>
        <div
          className="h-0.5"
          style={{
            width: `${m.bar}%`,
            background: 'var(--fg-muted)',
          }}
        />
      </div>
    </div>
  );
}

export default function BenchmarksPage() {
  const sections: { title: string; metrics: Metric[] }[] = [
    {
      title: 'PodX (XdoP Composite)',
      metrics: [
        { value: '100', platform: 'PODX', name: 'WCBI Score', label: 'Weighted Composite', bar: 100 },
        { value: '99.99%', platform: 'PODX', name: 'Availability', label: 'Uptime Target', bar: 100 },
        { value: '24hr+', platform: 'PODX', name: 'DDIL Autonomy', label: 'Off-grid Runtime', bar: 85 },
        { value: '320', platform: 'PODX', name: 'AI Inference', label: 'TOPS', bar: 90 },
      ],
    },
    {
      title: 'Symbion (Clinical Validation)',
      metrics: [
        { value: '92.5%', platform: 'SYMBION', name: 'Sensitivity', label: 'Neurotransmitter Detection', bar: 93 },
        { value: '94.3%', platform: 'SYMBION', name: 'Specificity', label: 'False Positive Rate', bar: 94 },
        { value: '4', platform: 'SYMBION', name: 'Biomarkers', label: 'Serotonin, Dopamine, GABA, pH', bar: 80 },
        { value: '50M', platform: 'SYMBION', name: 'Target Users', label: 'By 2030', bar: 70 },
      ],
    },
    {
      title: 'Relian (Migration Performance)',
      metrics: [
        { value: '100x', platform: 'RELIAN', name: 'Speed', label: 'vs Manual Migration', bar: 100 },
        { value: '99%', platform: 'RELIAN', name: 'Cost Reduction', label: 'vs Industry Average', bar: 99 },
        { value: '85%+', platform: 'RELIAN', name: 'Risk Accuracy', label: 'ML Defect Prediction', bar: 85 },
        { value: '80%+', platform: 'RELIAN', name: 'Test Coverage', label: 'Automated via Symbolic Exec', bar: 80 },
      ],
    },
    {
      title: 'Zuup HQ (Chain Infrastructure)',
      metrics: [
        { value: '65K', platform: 'ZHQ', name: 'TPS', label: 'Solana Throughput', bar: 100 },
        { value: '400ms', platform: 'ZHQ', name: 'Block Time', label: 'Sub-second Finality', bar: 95 },
        { value: '100%', platform: 'ZHQ', name: 'Attestation', label: 'Coverage Across Products', bar: 100 },
        { value: '$0.02', platform: 'ZHQ', name: 'Deploy Cost', label: 'Per Transaction (Devnet)', bar: 75 },
      ],
    },
  ];

  return (
    <main className="page-shell">
      <h1 className="mb-2 font-mono text-xl font-normal" style={{ color: 'var(--fg)' }}>
        Benchmarks
      </h1>
      <p className="body-small mb-12 max-w-2xl">
        Composite metrics by platform. Bars are scaled within each section for comparison.
      </p>
      <div className="flex flex-col gap-16">
        {sections.map((sec) => (
          <section key={sec.title}>
            <h2 className="mb-6 font-mono text-[13px] font-medium uppercase tracking-wide" style={{ color: 'var(--fg-dim)' }}>
              {sec.title}
            </h2>
            <div
              className="grid gap-4 max-[900px]:grid-cols-1"
              style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}
            >
              {sec.metrics.map((m) => (
                <MetricCell key={m.name + m.label} m={m} />
              ))}
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}
