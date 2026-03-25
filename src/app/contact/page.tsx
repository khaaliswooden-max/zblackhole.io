'use client';

import { useState } from 'react';

const PURPOSES = [
  'Investment / Seed Round',
  'Research Collaboration',
  'Federal / Government Partnership',
  'Enterprise Integration',
  'Academic / Publication',
  'Press',
  'Other',
];

export default function ContactPage() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'done' | 'error'>('idle');

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('sending');
    const form = e.currentTarget;
    const fd = new FormData(form);
    const payload = Object.fromEntries(fd.entries());
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error('fail');
      setStatus('done');
      form.reset();
    } catch {
      setStatus('error');
    }
  }

  const rows: { label: string; value: string; href?: string }[] = [
    { label: 'General', value: 'khaaliswooden@gmail.com', href: 'mailto:khaaliswooden@gmail.com' },
    {
      label: 'Enterprise / Federal',
      value: 'khaalis.wooden@visionblox.com',
      href: 'mailto:khaalis.wooden@visionblox.com',
    },
    { label: 'Academic', value: 'aldrich.wooden@snhu.edu', href: 'mailto:aldrich.wooden@snhu.edu' },
    { label: 'Location', value: 'Huntsville, Alabama, USA' },
    {
      label: 'GitHub',
      value: 'github.com/khaaliswooden-max',
      href: 'https://github.com/khaaliswooden-max',
    },
    {
      label: 'On-Chain',
      value: 'H1eSx6ij1Q296Tzss62AHuamn1rD4a9MkDapYu1CyvVM',
    },
  ];

  return (
    <main className="page-shell">
      <h1 className="mb-2 font-mono text-xl font-normal" style={{ color: 'var(--fg)' }}>
        Contact
      </h1>
      <p className="body-small mb-10 max-w-xl">Routes and program id for verification.</p>
      <div
        className="grid gap-12 max-[900px]:grid-cols-1"
        style={{ gridTemplateColumns: '1fr 1fr' }}
      >
        <div>
          <div className="font-mono text-[11px] uppercase tracking-wider mb-6" style={{ color: 'var(--fg-muted)' }}>
            Channels
          </div>
          <dl className="space-y-5">
            {rows.map((r) => (
              <div key={r.label} className="border-b pb-4" style={{ borderColor: 'var(--line)' }}>
                <dt className="mb-1 font-mono text-[10px] uppercase tracking-wider" style={{ color: 'var(--fg-muted)' }}>
                  {r.label}
                </dt>
                <dd className="font-mono text-[13px] break-all" style={{ color: 'var(--fg-dim)' }}>
                  {r.href ? (
                    <a href={r.href} target="_blank" rel="noopener noreferrer" className="underline-offset-4 hover:underline">
                      {r.value}
                    </a>
                  ) : (
                    r.value
                  )}
                </dd>
              </div>
            ))}
          </dl>
        </div>
        <div>
          <div className="font-mono text-[11px] uppercase tracking-wider mb-6" style={{ color: 'var(--fg-muted)' }}>
            Inquiry
          </div>
          {status === 'done' && (
            <p className="body-small mb-4" style={{ color: 'var(--chain-color)' }}>
              Submitted. Expect a reply by email.
            </p>
          )}
          {status === 'error' && (
            <p className="body-small mb-4" style={{ color: 'var(--status-amber)' }}>
              Submit failed. Email directly using the addresses at left.
            </p>
          )}
          <form onSubmit={onSubmit} className="flex flex-col gap-4">
            <div>
              <label className="mb-1 block font-mono text-[10px] uppercase" style={{ color: 'var(--fg-muted)' }}>
                Full Name
              </label>
              <input name="fullName" required className="w-full border px-3 py-2 font-sans text-sm" style={{ borderColor: 'var(--line)', background: 'var(--bg)', color: 'var(--fg)' }} />
            </div>
            <div>
              <label className="mb-1 block font-mono text-[10px] uppercase" style={{ color: 'var(--fg-muted)' }}>
                Organization
              </label>
              <input name="organization" className="w-full border px-3 py-2 font-sans text-sm" style={{ borderColor: 'var(--line)', background: 'var(--bg)', color: 'var(--fg)' }} />
            </div>
            <div>
              <label className="mb-1 block font-mono text-[10px] uppercase" style={{ color: 'var(--fg-muted)' }}>
                Email
              </label>
              <input name="email" type="email" required className="w-full border px-3 py-2 font-sans text-sm" style={{ borderColor: 'var(--line)', background: 'var(--bg)', color: 'var(--fg)' }} />
            </div>
            <div>
              <label className="mb-1 block font-mono text-[10px] uppercase" style={{ color: 'var(--fg-muted)' }}>
                Purpose
              </label>
              <select name="purpose" required className="w-full border px-3 py-2 font-sans text-sm" style={{ borderColor: 'var(--line)', background: 'var(--bg)', color: 'var(--fg)' }}>
                <option value="">Select</option>
                {PURPOSES.map((p) => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-1 block font-mono text-[10px] uppercase" style={{ color: 'var(--fg-muted)' }}>
                Message
              </label>
              <textarea name="message" required rows={5} className="w-full border px-3 py-2 font-sans text-sm" style={{ borderColor: 'var(--line)', background: 'var(--bg)', color: 'var(--fg)' }} />
            </div>
            <button type="submit" disabled={status === 'sending'} className="btn-outline self-start">
              {status === 'sending' ? 'Sending…' : 'Submit'}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
