import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Users, Cpu, ShieldCheck, ArrowUpRight } from 'lucide-react';
import { useDashboard } from '../context/DashboardContext';

function Sparkline({ points, color }) {
  return (
    <svg className="w-16 h-7 overflow-visible" viewBox="0 0 60 24" fill="none">
      <path
        d={points}
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function KPIDeck() {
  const { metrics, dateRange, setDateRange } = useDashboard();

  const formattedMRR = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0
  }).format(metrics.mrr);

  const CARDS = [
    {
      title: "Monthly Recurring Revenue",
      value: formattedMRR,
      delta: `+${metrics.transactionCount} Recs`,
      subtext: `${metrics.enterpriseShare}% Enterprise Volume`,
      icon: TrendingUp,
      sparkline: "M0 18 Q15 6, 30 14 T60 4",
      sparkColor: "#059669"
    },
    {
      title: "Active API Consumers",
      value: metrics.activeConsumers.toLocaleString(),
      delta: `Total Accounts`,
      subtext: "99.2% retained accounts",
      icon: Users,
      sparkline: "M0 16 Q15 14, 30 8 T60 2",
      sparkColor: "#0D9488"
    },
    {
      title: "Edge Engine Latency",
      value: metrics.latency,
      delta: "Sub-20ms",
      subtext: "Global p99 edge telemetry",
      icon: Cpu,
      sparkline: "M0 8 Q15 16, 30 10 T60 14",
      sparkColor: "#0F766E"
    },
    {
      title: "System Reliability SLA",
      value: metrics.healthRate,
      delta: "Target: 99.9%",
      subtext: "Zero critical incident spikes",
      icon: ShieldCheck,
      sparkline: "M0 12 Q20 12, 40 10 T60 6",
      sparkColor: "#059669"
    }
  ];

  return (
    <div className="space-y-4">
      {/* Date Range Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-1.5 p-1 bg-[var(--bg-subtle)] border border-[var(--border-subtle)] rounded-xl w-fit">
          {['7d', '30d', 'qtd', 'all'].map((range) => (
            <button
              key={range}
              onClick={() => setDateRange(range)}
              className={`px-3 py-1 rounded-lg text-xs font-bold uppercase transition ${
                dateRange === range
                  ? 'bg-[var(--bg-surface)] text-[var(--text-main)] shadow-2xs'
                  : 'text-[var(--text-muted)] hover:text-[var(--text-main)]'
              }`}
            >
              {range}
            </button>
          ))}
        </div>

        <div className="text-xs text-[var(--text-muted)] font-mono flex items-center gap-2">
          <span>Active Ingestion Pipe: {metrics.transactionCount} entries</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-5">
        {CARDS.map((card, idx) => {
          const Icon = card.icon;

          return (
            <div
              key={card.title}
              className="bg-[var(--bg-surface)] p-5 sm:p-6 rounded-2xl border border-[var(--border-subtle)] shadow-[var(--shadow-card)] hover:border-[var(--primary)]/30 hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-[var(--text-muted)] tracking-wide">
                    {card.title}
                  </span>
                  <div className="w-8 h-8 rounded-xl bg-[var(--bg-subtle)] text-[var(--text-muted)] group-hover:bg-[var(--primary-light)] group-hover:text-[var(--primary)] flex items-center justify-center transition-colors">
                    <Icon className="w-4 h-4" />
                  </div>
                </div>

                <div className="mt-3 flex items-baseline justify-between gap-2 overflow-hidden">
                  {/* Key ensures smooth pop-in animation on value change */}
                  <motion.span
                    key={card.value}
                    initial={{ y: 8, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ type: 'spring', damping: 20, stiffness: 300 }}
                    className="text-2xl sm:text-3xl font-extrabold text-[var(--text-main)] tracking-tight truncate"
                  >
                    {card.value}
                  </motion.span>
                  <Sparkline points={card.sparkline} color={card.sparkColor} />
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-[var(--border-subtle)]/60 flex items-center justify-between text-xs">
                <span className="text-[var(--text-subtle)] truncate">{card.subtext}</span>
                <span className="font-bold text-[var(--success)] bg-[var(--success-light)] px-1.5 py-0.5 rounded-md flex items-center gap-0.5 flex-shrink-0">
                  <ArrowUpRight className="w-3 h-3" />
                  {card.delta}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}