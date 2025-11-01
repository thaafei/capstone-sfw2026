import React, { useState } from 'react';
import './Home.css'; // reuse your existing styles


const parseGitHubRepo = (value: string): { owner: string; repo: string } | null => {
  const v = value.trim();
  const regex = /^(?:https?:\/\/)?(?:www\.)?github\.com\/([^\/\s]+)\/([^\/\s]+)(?:\/.*)?$/i;
  const m = v.match(regex);
  if (!m) return null;
  const owner = m[1];
  const repo = m[2].replace(/\.git$/, '');
  return { owner, repo };
};

const sampleStarsFor = (_key: string): number => {
  return Math.floor(Math.random() * 3) + 3; // 3..5
};

const Visualize: React.FC = () => {
  const [inputs, setInputs] = useState<string[]>(['https://github.com/pytorch/pytorch', 'https://github.com/tensorflow/tensorflow']);
  const [error, setError] = useState<string | null>(null);
  const [chartData, setChartData] = useState<{ label: string; stars: number }[] | null>(null);
  const [loading, setLoading] = useState(false);

  const addField = () => setInputs((s) => [...s, '']);
  const removeField = (index: number) => setInputs((s) => s.filter((_, i) => i !== index));
  const updateField = (index: number, value: string) => setInputs((s) => s.map((v, i) => (i === index ? value : v)));

  const handleVisualize = () => {
    setError(null);
    setChartData(null);

    const parsed = inputs
      .map((v) => v.trim())
      .filter((v) => v.length > 0)
      .map((v) => {
        const p = parseGitHubRepo(v);
        return p ? { normalized: `https://github.com/${p.owner}/${p.repo}`, owner: p.owner, repo: p.repo } : null;
      });

    // Check validity
    const badIndex = parsed.findIndex((p) => p === null);
    if (badIndex !== -1) {
      setError(`Invalid GitHub repo URL at input #${badIndex + 1}. Use: github.com/owner/repo`);
      return;
    }

    const valid = (parsed as { normalized: string; owner: string; repo: string }[]).map((p) => ({
      label: `${p.owner}/${p.repo}`,
      url: p.normalized,
    }));

    const uniqueMap = new Map<string, { label: string; url: string }>();
    valid.forEach((v) => uniqueMap.set(v.url.toLowerCase(), v));
    const unique = Array.from(uniqueMap.values());

    if (unique.length < 2) {
      setError('Please provide at least two unique GitHub repo URLs.');
      return;
    }

    setLoading(true);

    const data = unique.map((u) => ({
      label: u.label,
      stars: sampleStarsFor(u.url),
    }));

    setTimeout(() => {
      setChartData(data);
      setLoading(false);
    }, 300);
  };

  const reset = () => {
    setInputs(['', '']);
    setChartData(null);
    setError(null);
  };

  const maxStars = chartData && chartData.length ? Math.max(...chartData.map((d) => d.stars)) : 1;

  return (
    <div className="dx-bg" style={{ padding: 28 }}>
      <div style={{ width: '100%', maxWidth: 1100, margin: '0 auto' }}>
        <div className="dx-card" style={{ marginBottom: 18 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12 }}>
            <div>
              <h2 style={{ margin: 0 }}>Visualize GitHub Repo Stars (sample)</h2>
              <div style={{ color: 'rgba(255,255,255,0.75)', marginTop: 6 }}>
                Enter two or more GitHub repo URLs and click Visualize.
              </div>
            </div>

            <div style={{ display: 'flex', gap: 8 }}>
              <button className="dx-btn dx-btn-outline" onClick={reset}>Reset</button>
              <button className="dx-btn dx-btn-primary" onClick={handleVisualize} disabled={loading}>
                {loading ? 'Working...' : 'Visualize'}
              </button>
            </div>
          </div>
        </div>

        <div className="dx-card" style={{ marginBottom: 18 }}>
          <div style={{ display: 'grid', gap: 10 }}>
            {inputs.map((val, idx) => (
              <div key={idx} style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                <input
                  value={val}
                  onChange={(e) => updateField(idx, e.target.value)}
                  className="dx-input"
                  placeholder={idx === 0 ? 'Primary GitHub repo URL (owner/repo)' : 'Enter GitHub repo URL (owner/repo)'}
                  style={{ flex: 1 }}
                />
                <button
                  className="dx-btn dx-btn-outline"
                  onClick={() => removeField(idx)}
                  aria-label="Remove URL"
                >
                  Remove
                </button>
              </div>
            ))}

            <div style={{ display: 'flex', gap: 8 }}>
              <button className="dx-btn dx-btn-outline" onClick={addField}>Add URL</button>
            </div>

            {error && <div className="dx-error">{error}</div>}
          </div>
        </div>

        <div className="dx-card" style={{ padding: 18 }}>
          <h3 style={{ marginTop: 0 }}>Stars Comparison (vertical bars)</h3>

          {!chartData && <div style={{ color: 'var(--muted)' }}>No chart yet — enter repos and click Visualize.</div>}

          {chartData && (
            <div style={{ marginTop: 16 }}>
              <div style={{ display: 'flex', alignItems: 'flex-end', gap: 12, height: 320, padding: '12px 8px' }}>
                {chartData.map((d, i) => {
                  const heightPercent = Math.round((d.stars / maxStars) * 100);
                  return (
                    <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: 80 }}>
                      <div
                        title={`${d.stars} stars`}
                        style={{
                          height: `${(heightPercent / 100) * 240}px`, // map 100% -> 240px
                          width: '100%',
                          background: 'linear-gradient(180deg,#06b6d4,#2563eb)',
                          borderRadius: 8,
                          display: 'flex',
                          alignItems: 'flex-end',
                          justifyContent: 'center',
                          color: 'white',
                          fontWeight: 700,
                          boxShadow: '0 6px 14px rgba(6,99,173,0.15)',
                        }}
                      >
                        <div style={{ padding: '6px 4px', fontSize: 13 }}>{d.stars}</div>
                      </div>

                      <div style={{ marginTop: 8, fontSize: 13, textAlign: 'center', wordBreak: 'break-word' }}>
                        <div style={{ fontWeight: 600 }}>{d.label}</div>
                      </div>
                    </div>
                  );
                })}
              </div>


            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Visualize;