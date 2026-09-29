import React, { useState } from 'react';
import { CheckCircle2, Shield, Activity, RefreshCw } from 'lucide-react';

const INTEGRATIONS = [
  { id: 'stripe', name: 'Stripe Billing Engine', desc: 'Automatic webhooks ingestion for recurring invoices and dispute tracking.', active: true },
  { id: 'aws', name: 'AWS CloudWatch & Lambda', desc: 'Sync telemetry spikes directly to CloudWatch logs and metrics.', active: true },
  { id: 'datadog', name: 'Datadog APM Streams', desc: 'Forward p99 latency histograms to Datadog agent pipelines.', active: false },
  { id: 'slack', name: 'Slack Incident Webhook', desc: 'Trigger high-priority alerts to #telemetry-ops when SLA falls below 99.9%.', active: true },
  { id: 'github', name: 'GitHub Actions Audit', desc: 'Deploy automated edge benchmarks on each feature branch pull request.', active: true },
];

export default function IntegrationsView() {
  const [list, setList] = useState(INTEGRATIONS);

  const toggle = (id) => {
    setList(list.map(item => item.id === id ? { ...item, active: !item.active } : item));
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-extrabold text-[var(--text-main)]">Cloud & Service Integrations</h2>
        <p className="text-xs text-[var(--text-muted)]">Connected edge pipelines, logging brokers, and notification hooks.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {list.map((item) => (
          <div key={item.id} className="p-5 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] shadow-[var(--shadow-card)] flex items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-[var(--text-main)]">{item.name}</h3>
                {item.active && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />}
              </div>
              <p className="text-xs text-[var(--text-muted)] mt-1.5 leading-relaxed">{item.desc}</p>
            </div>

            <button
              onClick={() => toggle(item.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer flex-shrink-0 ${
                item.active 
                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
                  : 'bg-[var(--bg-subtle)] text-[var(--text-muted)] hover:text-[var(--text-main)]'
              }`}
            >
              {item.active ? 'Connected' : 'Connect'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}