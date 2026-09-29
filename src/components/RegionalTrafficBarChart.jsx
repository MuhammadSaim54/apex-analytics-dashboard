import React from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer, 
  Cell 
} from 'recharts';
import { Globe2, Activity } from 'lucide-react';

const REGIONAL_DATA = [
  { region: 'US-East (N. Virginia)', short: 'US-East', reqs: 4820, latency: '12ms' },
  { region: 'EU-Central (Frankfurt)', short: 'EU-Cent', reqs: 3640, latency: '18ms' },
  { region: 'AP-South (Mumbai)', short: 'AP-South', reqs: 2980, latency: '24ms' },
  { region: 'AP-East (Tokyo)', short: 'AP-East', reqs: 2410, latency: '19ms' },
  { region: 'SA-East (São Paulo)', short: 'SA-East', reqs: 1420, latency: '42ms' },
];

function CustomBarTooltip({ active, payload }) {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-[#0B0F17]/95 backdrop-blur-md text-white p-3 rounded-xl shadow-xl border border-slate-800 text-xs space-y-1 min-w-[160px] pointer-events-none select-none z-50">
        <p className="font-bold text-white text-[11px] truncate">{data.region}</p>
        <div className="flex justify-between text-slate-400 text-[11px]">
          <span>Throughput:</span>
          <span className="font-mono text-white font-bold">{data.reqs.toLocaleString()} req/s</span>
        </div>
        <div className="flex justify-between text-slate-400 text-[11px]">
          <span>Edge Ping:</span>
          <span className="font-mono text-[#2DD4BF] font-bold">{data.latency}</span>
        </div>
      </div>
    );
  }
  return null;
}

export default function RegionalTrafficBarChart() {
  return (
    <div className="bg-[var(--bg-surface)] rounded-2xl border border-[var(--border-subtle)] shadow-[var(--shadow-card)] p-4 sm:p-5 lg:p-6 flex flex-col justify-between overflow-hidden">
      
      {/* Header */}
      <div className="flex flex-row items-center justify-between gap-2 pb-4 border-b border-[var(--border-subtle)]">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-sm sm:text-base font-extrabold text-[var(--text-main)]">
              Regional Edge Compute
            </h2>
            <Globe2 className="w-4 h-4 text-[var(--primary)]" />
          </div>
          <p className="text-[11px] sm:text-xs text-[var(--text-muted)] mt-0.5">
            Distributed request volume across global zones.
          </p>
        </div>

        <div className="flex items-center gap-1.5 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full bg-[var(--primary-light)] text-[var(--primary)] font-mono text-[9.5px] sm:text-[10px] font-bold flex-shrink-0">
          <Activity className="w-3 h-3 animate-pulse" />
          <span>Healthy</span>
        </div>
      </div>

      {/* Bar Chart Canvas Area */}
      <div className="w-full h-64 sm:h-72 lg:h-80 pt-4 select-none">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart 
            data={REGIONAL_DATA} 
            margin={{ top: 12, right: 8, left: -22, bottom: 0 }}
          >
            <XAxis 
              dataKey="short" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: 'var(--text-subtle)', fontSize: 10, fontWeight: 600 }}
              dy={6}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: 'var(--text-subtle)', fontSize: 10, fontWeight: 500 }}
              tickFormatter={(v) => `${(v / 1000).toFixed(1)}k`}
              dx={-2}
            />
            
            {/* cursor={false} grey background pillar artifact ko completely remove kar deta hai */}
            <Tooltip 
              content={<CustomBarTooltip />} 
              cursor={false} 
              isAnimationActive={false}
            />
            
            <Bar 
              dataKey="reqs" 
              radius={[6, 6, 0, 0]}
              animationDuration={600}
            >
              {REGIONAL_DATA.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={index === 0 ? '#0B0F17' : index === 1 ? '#0F766E' : index === 2 ? '#0D9488' : '#2DD4BF'} 
                  className="transition-opacity hover:opacity-85 cursor-pointer"
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Footer Subtext */}
      <div className="pt-3 border-t border-[var(--border-subtle)] mt-1 flex items-center justify-between text-[11px] sm:text-xs text-[var(--text-muted)]">
        <span className="truncate">Highest: <strong>US-East</strong></span>
        <span className="font-mono text-[10px] sm:text-[11px] text-[var(--text-subtle)] flex-shrink-0">
          Latency: ~18.4ms
        </span>
      </div>

    </div>
  );
}