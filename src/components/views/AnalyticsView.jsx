import React from 'react';
import RevenueAreaChart from '../RevenueAreaChart';
import RegionalTrafficBarChart from '../RegionalTrafficBarChart';
import { Cpu, Zap, Activity, HardDrive } from 'lucide-react';
import { useDashboard } from '../../context/DashboardContext';

export default function AnalyticsView() {
  const { metrics } = useDashboard();

  const STATS = [
    { title: "Average Edge Latency", value: metrics.latency, sub: "Target < 25ms", icon: Cpu },
    { title: "Peak Query Throughput", value: "14.8k req/s", sub: "US-East Peak Zone", icon: Zap },
    { title: "Packet Loss Rate", value: "0.001%", sub: "Optimal edge routing", icon: Activity },
    { title: "Memory Allocation", value: "4.2 / 8.0 GB", sub: "Global serverless nodes", icon: HardDrive },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-extrabold text-[var(--text-main)]">Telemetry & Performance Analytics</h2>
        <p className="text-xs text-[var(--text-muted)]">Real-time throughput, load distribution, and edge telemetry health.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {STATS.map((s) => {
          const Icon = s.icon;
          return (
            <div key={s.title} className="p-5 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] shadow-[var(--shadow-card)]">
              <div className="flex items-center justify-between text-[var(--text-muted)]">
                <span className="text-xs font-semibold">{s.title}</span>
                <Icon className="w-4 h-4 text-[var(--primary)]" />
              </div>
              <p className="text-2xl font-black text-[var(--text-main)] mt-3">{s.value}</p>
              <p className="text-[11px] text-[var(--text-subtle)] mt-1">{s.sub}</p>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-6">
        <RevenueAreaChart />
        <RegionalTrafficBarChart />
      </div>
    </div>
  );
}