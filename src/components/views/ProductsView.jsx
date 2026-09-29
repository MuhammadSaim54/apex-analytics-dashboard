import React from 'react';
import { Check, ShieldCheck, Zap, Server } from 'lucide-react';
import { useDashboard } from '../../context/DashboardContext';

export default function ProductsView() {
  const { transactions } = useDashboard();

  const TIERS = [
    {
      name: "Starter Cloud",
      price: "$4,800",
      cadence: "/month",
      desc: "Standard telemetry pipe for growing microservices.",
      features: ["500k Telemetry Events/day", "p99 Latency SLA: 45ms", "Community Discord Support", "Shared Edge Nodes"],
      activeCount: transactions.filter(t => t.tier === 'Starter').length
    },
    {
      name: "Pro Developer",
      price: "$9,800",
      cadence: "/month",
      desc: "High-throughput cloud architecture for scaling SaaS.",
      features: ["5M Events/day", "p99 Latency SLA: 25ms", "Automated Failover Routing", "Direct Slack Support"],
      activeCount: transactions.filter(t => t.tier === 'Pro').length,
      popular: true
    },
    {
      name: "Enterprise Dedicated",
      price: "$28,400",
      cadence: "/month",
      desc: "Zero-latency dedicated bare-metal infrastructure.",
      features: ["Unlimited Edge Pipelines", "Sub-15ms Guarantee", "Dedicated TAM & 24/7 Hotline", "Custom Compliance & SSO"],
      activeCount: transactions.filter(t => t.tier === 'Enterprise').length
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-extrabold text-[var(--text-main)]">Infrastructure Tier Catalog</h2>
        <p className="text-xs text-[var(--text-muted)]">Production rate limits, provisioning packages, and subscribed accounts.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {TIERS.map((tier) => (
          <div key={tier.name} className={`p-6 rounded-3xl bg-[var(--bg-surface)] border ${
            tier.popular ? 'border-[#0F766E] shadow-xl relative' : 'border-[var(--border-subtle)]'
          } flex flex-col justify-between space-y-5`}>
            {tier.popular && (
              <span className="absolute -top-3 right-6 bg-[#0F766E] text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                Most Active
              </span>
            )}

            <div>
              <h3 className="text-base font-extrabold text-[var(--text-main)]">{tier.name}</h3>
              <p className="text-xs text-[var(--text-muted)] mt-1">{tier.desc}</p>

              <div className="mt-4 flex items-baseline gap-1">
                <span className="text-3xl font-black text-[var(--text-main)]">{tier.price}</span>
                <span className="text-xs text-[var(--text-muted)]">{tier.cadence}</span>
              </div>

              <div className="mt-5 space-y-2.5 pt-4 border-t border-[var(--border-subtle)]">
                {tier.features.map(f => (
                  <div key={f} className="flex items-center gap-2 text-xs text-[var(--text-main)]">
                    <Check className="w-3.5 h-3.5 text-[#0F766E] flex-shrink-0" />
                    <span>{f}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-[var(--border-subtle)] flex items-center justify-between text-xs">
              <span className="text-[var(--text-subtle)]">Subscribed Entities</span>
              <span className="font-bold text-[var(--primary)]">{tier.activeCount} Active</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}