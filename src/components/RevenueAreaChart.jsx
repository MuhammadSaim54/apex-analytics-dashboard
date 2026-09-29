import React, { useState, useMemo } from 'react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer, 
  CartesianGrid 
} from 'recharts';
import { TrendingUp, Calendar } from 'lucide-react';
import { useDashboard } from '../context/DashboardContext';

function CustomTooltip({ active, payload, label }) {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-[#0B0F17]/95 backdrop-blur-md text-white p-3 rounded-xl shadow-xl border border-slate-800 text-xs min-w-[180px] space-y-1.5 pointer-events-none select-none z-50">
        <div className="flex items-center justify-between border-b border-slate-800/80 pb-1.5">
          <span className="text-[10px] font-mono text-slate-400 flex items-center gap-1">
            <Calendar className="w-3 h-3 text-[#2DD4BF]" />
            {label}
          </span>
          <span className="text-[9px] font-bold px-1 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            Live
          </span>
        </div>

        <div className="space-y-1">
          <div className="flex items-center justify-between text-[11px]">
            <span className="text-slate-400">Gross Telemetry:</span>
            <span className="font-extrabold text-white font-mono">
              ${data.revenue.toLocaleString()}
            </span>
          </div>

          <div className="flex items-center justify-between text-[11px]">
            <span className="text-slate-400">Net Settlement:</span>
            <span className="font-bold text-[#2DD4BF] font-mono">
              ${(data.revenue * 0.94).toFixed(0).toLocaleString()}
            </span>
          </div>
        </div>
      </div>
    );
  }
  return null;
}

export default function RevenueAreaChart() {
  const { transactions } = useDashboard();
  const [viewMode, setViewMode] = useState('mrr');

  const chartData = useMemo(() => {
    const baseDays = [
      { date: 'Sep 21', base: 45000 },
      { date: 'Sep 22', base: 52000 },
      { date: 'Sep 23', base: 61000 },
      { date: 'Sep 24', base: 58000 },
      { date: 'Sep 25', base: 74000 },
      { date: 'Sep 26', base: 82000 },
      { date: 'Sep 27', base: 98000 },
      { date: 'Sep 28', base: 112000 },
    ];

    const extraWeight = transactions.length > 8 ? (transactions.length - 8) * 8500 : 0;

    return baseDays.map((item, index) => {
      const multiplier = viewMode === 'mrr' ? 1 : 1.45;
      const boost = index >= 4 ? extraWeight : extraWeight * 0.3;
      return {
        date: item.date,
        revenue: Math.round((item.base + boost) * multiplier),
      };
    });
  }, [transactions, viewMode]);

  return (
    <div className="bg-[var(--bg-surface)] rounded-2xl border border-[var(--border-subtle)] shadow-[var(--shadow-card)] p-4 sm:p-5 lg:p-6 flex flex-col justify-between overflow-hidden">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[var(--border-subtle)]">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-sm sm:text-base font-extrabold text-[var(--text-main)]">
              Revenue Velocity
            </h2>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-[var(--primary-light)] text-[var(--primary)] border border-[var(--primary)]/20">
              Active Flow
            </span>
          </div>
          <p className="text-[11px] sm:text-xs text-[var(--text-muted)] mt-0.5">
            Streaming liquidity trends across endpoints.
          </p>
        </div>

        {/* Toggle Switch */}
        <div className="flex items-center p-1 bg-[var(--bg-subtle)] border border-[var(--border-subtle)] rounded-xl self-start sm:self-auto">
          <button
            type="button"
            onClick={() => setViewMode('mrr')}
            className={`px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-lg text-[11px] sm:text-xs font-bold transition cursor-pointer ${
              viewMode === 'mrr'
                ? 'bg-[#0B0F17] text-white shadow-xs'
                : 'text-[var(--text-muted)] hover:text-[var(--text-main)]'
            }`}
          >
            MRR Run-Rate
          </button>
          <button
            type="button"
            onClick={() => setViewMode('volume')}
            className={`px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-lg text-[11px] sm:text-xs font-bold transition cursor-pointer ${
              viewMode === 'volume'
                ? 'bg-[#0B0F17] text-white shadow-xs'
                : 'text-[var(--text-muted)] hover:text-[var(--text-main)]'
            }`}
          >
            Gross Volume
          </button>
        </div>
      </div>

      {/* Chart Canvas Area */}
      <div className="w-full h-64 sm:h-72 lg:h-80 pt-4 select-none">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart 
            data={chartData} 
            margin={{ top: 12, right: 8, left: -22, bottom: 0 }}
          >
            <defs>
              <linearGradient id="mintWaveGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#0F766E" stopOpacity={0.35} />
                <stop offset="60%" stopColor="#2DD4BF" stopOpacity={0.08} />
                <stop offset="100%" stopColor="#2DD4BF" stopOpacity={0.0} />
              </linearGradient>
            </defs>

            <CartesianGrid 
              strokeDasharray="3 3" 
              vertical={false} 
              stroke="var(--border-subtle)" 
            />

            <XAxis 
              dataKey="date" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: 'var(--text-subtle)', fontSize: 10, fontWeight: 500 }}
              dy={6}
            />

            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: 'var(--text-subtle)', fontSize: 10, fontWeight: 500 }}
              tickFormatter={(value) => `$${value >= 1000 ? `${(value / 1000).toFixed(0)}k` : value}`}
              dx={-2}
            />

            <Tooltip 
              content={<CustomTooltip />} 
              cursor={{ stroke: '#0F766E', strokeWidth: 1.5, strokeDasharray: '4 4' }} 
              isAnimationActive={false}
            />

            <Area 
              type="monotone" 
              dataKey="revenue" 
              stroke="#0F766E" 
              strokeWidth={2.4}
              fillOpacity={1} 
              fill="url(#mintWaveGradient)" 
              animationDuration={800}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Footer Metrics Row */}
      <div className="pt-3 border-t border-[var(--border-subtle)] mt-1 flex flex-wrap items-center justify-between gap-2 text-[11px] sm:text-xs">
        <div className="flex items-center gap-3 text-[var(--text-muted)]">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#0F766E]" />
            <span className="font-semibold text-[var(--text-main)]">Settled</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#2DD4BF]" />
            <span>Projected</span>
          </div>
        </div>

        <div className="flex items-center gap-1 font-mono text-[10px] sm:text-[11px] text-emerald-600 font-bold">
          <TrendingUp className="w-3.5 h-3.5" />
          <span>+22.4% Cycle</span>
        </div>
      </div>

    </div>
  );
}