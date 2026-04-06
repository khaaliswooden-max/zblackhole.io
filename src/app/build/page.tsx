'use client';

import { useState } from 'react';

const TRACKS = [
  {
    id: 'api',
    name: 'API Access',
    audience: 'Developers and engineering teams',
    description:
      'Query ZWM world state, subscribe to causal events, and build on top of nine on-chain substrates via GraphQL.',
    perks: [
      'Full GraphQL API access to worldState and causalChain queries',
      'WebSocket subscriptions for real-time SubstrateEvent streams',
      'Devnet access with seeded mock data for local development',
      'TypeScript SDK and schema documentation',
    ],
    cta: 'Request API Key',
  },
  {
    id: 'partner',
    name: 'Platform Partnership',
    audience: 'Organizations integrating a Zuup substrate',
    description:
      'Embed one of nine ZIL substrates into your existing infrastructure — procurement, compliance, compute, biosensing, and more.',
    perks: [
      'Direct integration support for your chosen substrate',
      'POST /zwm/ingest endpoint for causal event propagation',
      'Co-development access during Phase 2B build window',
      'Named partner listing on zblackhole.io',
    ],
    cta: 'Apply to Partner',
  },
  {
    id: 'institutional',
    name: 'Institutional Access',
    audience: 'Agencies and enterprise organizations',
    description:
      'Full ZWM access for institutional use cases — procurement intelligence, compliance graphs, compute allocation, and settlement rails.',
    perks: [
      'Full read/write access across all nine substrate APIs',
      'Custom Veyra reasoning sessions against your entity graph',
      'SLA-backed indexer with Neo4j world state queries',
      'Dedicated onboarding and ZWM architecture review',
    ],
    cta: 'Schedule a Call',
  },
];

export default function BuildPage() {
  const [track, setTrack] = useState('api');
  const [form, setForm] = useState({ name: '', email: '', org: '', message: '' });

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  }

  return (
    <main>
      <section className="page-shell">
        <p
          className="mb-3 font-mono text-[11px] uppercase tracking-widest"
          style={{ color: 'var(--fg-muted)' }}
        >
          Zuup Innovation Lab — Build
        </p>
        <h1
          className="mb-4 font-mono text-[clamp(1.5rem,3vw,2.25rem)] font-normal leading-tight"
          style={{ color: 'var(--fg)' }}
        >
          Access the ZWM.
        </h1>
        <p className="body-small max-w-lg" style={{ color: 'var(--fg-dim)' }}>
          Three tracks for builders, partners, and institutions. Choose the access level
          that fits your use case.
        </p>
      </section>

      {/* Three-column tracks */}
      <section className="page-shell border-t" style={{ borderColor: 'var(--line)' }}>
        <div
          className="grid grid-cols-3 gap-px max-[900px]:grid-cols-1"
          style={{
            background: 'var(--line)',
            border: '1px solid var(--line)',
          }}
        >
          {TRACKS.map((t) => (
            <div
              key={t.id}
              className="flex flex-col p-6"
              style={{ background: 'var(--bg)' }}
            >
              <h2 className="mono-14 mb-1" style={{ color: 'var(--fg)' }}>
                {t.name}
              </h2>
              <p
                className="mb-4 font-mono text-[11px]"
                style={{ color: 'var(--fg-muted)' }}
              >
                {t.audience}
              </p>
              <p className="body-small mb-5 flex-1" style={{ color: 'var(--fg-dim)' }}>
                {t.description}
              </p>
              <ul className="mb-6 flex flex-col gap-2">
                {t.perks.map((perk, i) => (
                  <li
                    key={i}
                    className="body-small"
                    style={{ color: 'var(--fg-dim)', display: 'flex', gap: 8 }}
                  >
                    <span style={{ color: 'var(--chain-color)', flexShrink: 0 }}>—</span>
                    {perk}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => setTrack(t.id)}
                className="btn-outline"
                style={{
                  background: track === t.id ? 'var(--fg)' : undefined,
                  color: track === t.id ? 'var(--bg)' : undefined,
                  cursor: 'pointer',
                  textAlign: 'center',
                }}
              >
                {t.cta}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Contact form */}
      <section className="page-shell border-t" style={{ borderColor: 'var(--line)' }}>
        <div className="mx-auto max-w-[560px]">
          <h2 className="mono-14 mb-6" style={{ color: 'var(--fg)' }}>
            Get in touch
          </h2>
          <form className="flex flex-col gap-4" onSubmit={(e) => e.preventDefault()}>
            {[
              { name: 'name', label: 'Name', type: 'text' as const, placeholder: 'Your full name' },
              { name: 'email', label: 'Email', type: 'email' as const, placeholder: 'you@org.com' },
              { name: 'org', label: 'Organization', type: 'text' as const, placeholder: 'Company or agency' },
            ].map((field) => (
              <div key={field.name} className="flex flex-col gap-1">
                <label
                  htmlFor={field.name}
                  className="font-mono text-[11px] uppercase tracking-wider"
                  style={{ color: 'var(--fg-muted)' }}
                >
                  {field.label}
                </label>
                <input
                  id={field.name}
                  name={field.name}
                  type={field.type}
                  placeholder={field.placeholder}
                  value={form[field.name as keyof typeof form]}
                  onChange={handleChange}
                  style={{
                    background: 'transparent',
                    border: '1px solid var(--line)',
                    padding: '10px 12px',
                    fontFamily: "'IBM Plex Mono', monospace",
                    fontSize: 12,
                    color: 'var(--fg)',
                    outline: 'none',
                    width: '100%',
                  }}
                />
              </div>
            ))}

            <div className="flex flex-col gap-1">
              <label
                htmlFor="track-select"
                className="font-mono text-[11px] uppercase tracking-wider"
                style={{ color: 'var(--fg-muted)' }}
              >
                Access Track
              </label>
              <select
                id="track-select"
                name="track"
                value={track}
                onChange={(e) => setTrack(e.target.value)}
                style={{
                  background: 'var(--bg)',
                  border: '1px solid var(--line)',
                  padding: '10px 12px',
                  fontFamily: "'IBM Plex Mono', monospace",
                  fontSize: 12,
                  color: 'var(--fg)',
                  outline: 'none',
                  width: '100%',
                  cursor: 'pointer',
                }}
              >
                {TRACKS.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-1">
              <label
                htmlFor="message"
                className="font-mono text-[11px] uppercase tracking-wider"
                style={{ color: 'var(--fg-muted)' }}
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                placeholder="Tell us about your use case..."
                rows={4}
                value={form.message}
                onChange={handleChange}
                style={{
                  background: 'transparent',
                  border: '1px solid var(--line)',
                  padding: '10px 12px',
                  fontFamily: "'IBM Plex Mono', monospace",
                  fontSize: 12,
                  color: 'var(--fg)',
                  outline: 'none',
                  resize: 'vertical',
                  width: '100%',
                }}
              />
            </div>

            <button
              type="submit"
              className="btn-outline"
              style={{ cursor: 'pointer', marginTop: 8 }}
            >
              Send →
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}
