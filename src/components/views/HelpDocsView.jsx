import React from 'react';
import { Terminal, BookOpen, ExternalLink } from 'lucide-react';

export default function HelpDocsView() {
  return (
    <div className="max-w-3xl space-y-6">
      <div>
        <h2 className="text-lg font-extrabold text-[var(--text-main)]">Telemetry API Quickstart & Docs</h2>
        <p className="text-xs text-[var(--text-muted)]">Integrate real-time metric streams into your Next.js, Node.js, or Go servers.</p>
      </div>

      <div className="p-6 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] shadow-[var(--shadow-card)] space-y-3">
        <div className="flex items-center gap-2 text-[var(--text-main)] font-bold text-xs">
          <Terminal className="w-4 h-4 text-[#0F766E]" />
          <span>cURL Edge Payload Sample</span>
        </div>
        <pre className="p-4 rounded-xl bg-[#0B0F17] text-[#2DD4BF] font-mono text-[11px] overflow-x-auto border border-slate-800 leading-relaxed">
{`curl -X POST https://api.apex-telemetry.io/v1/records \\
  -H "Authorization: Bearer apex_live_sec_***" \\
  -H "Content-Type: application/json" \\
  -d '{
    "customer": "Stripe Atlas",
    "amount": 18500,
    "tier": "Enterprise",
    "channel": "Stripe"
  }'`}
        </pre>
      </div>

      <div className="p-6 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] shadow-[var(--shadow-card)] space-y-2">
        <h3 className="text-sm font-bold text-[var(--text-main)]">Architecture Protocol Specifications</h3>
        <p className="text-xs text-[var(--text-muted)] leading-relaxed">
          Apex Telemetry aggregates p99 request times across 5 global regions with automatic fallbacks and sub-20ms edge latency.
        </p>
      </div>
    </div>
  );
}