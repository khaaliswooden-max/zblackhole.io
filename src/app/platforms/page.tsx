import { PLATFORMS, statusClass, statusLabel } from '@/lib/platforms';

export default function PlatformsPage() {
  return (
    <main className="page-shell">
      <h1 className="mb-2 font-mono text-xl font-normal" style={{ color: 'var(--fg)' }}>
        Platforms
      </h1>
      <p className="body-small mb-10 max-w-2xl">
        Nine canonical programs. Domains and migration targets follow ΩVEB-1 RSF notation.
      </p>
      <div className="overflow-x-auto">
        <table className="data-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Platform</th>
              <th>Domain</th>
              <th>Architecture</th>
              <th>Status</th>
              <th>ω Target</th>
            </tr>
          </thead>
          <tbody>
            {PLATFORMS.map((p) => (
              <tr key={p.id}>
                <td style={{ color: 'var(--fg)' }}>{p.id}</td>
                <td style={{ color: 'var(--fg)' }}>{p.name}</td>
                <td>{p.domain}</td>
                <td>{p.arch}</td>
                <td>
                  <span className={statusClass(p.status)}>{statusLabel(p.status)}</span>
                </td>
                <td style={{ color: 'var(--chain-color)' }}>{p.omega}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
