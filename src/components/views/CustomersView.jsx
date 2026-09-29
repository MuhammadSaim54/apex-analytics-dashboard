import React, { useState } from 'react';
import { useDashboard } from '../../context/DashboardContext';
import { Search, Mail, ShieldCheck, ExternalLink } from 'lucide-react';

export default function CustomersView() {
  const { transactions } = useDashboard();
  const [search, setSearch] = useState('');

  const uniqueCustomers = Array.from(
    new Map(transactions.map(t => [t.email, t])).values()
  ).filter(c => 
    c.customer.toLowerCase().includes(search.toLowerCase()) || 
    c.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-extrabold text-[var(--text-main)]">Active Customer Directory</h2>
          <p className="text-xs text-[var(--text-muted)]">Verified enterprise and developer tenant profiles.</p>
        </div>

        <div className="flex items-center gap-2 bg-[var(--bg-subtle)] border border-[var(--border-subtle)] rounded-xl px-3 py-1.5 w-full sm:w-64">
          <Search className="w-3.5 h-3.5 text-[var(--text-subtle)]" />
          <input
            type="text"
            placeholder="Search accounts..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-transparent text-xs text-[var(--text-main)] outline-none w-full"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {uniqueCustomers.map((c) => (
          <div key={c.email} className="p-5 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] shadow-[var(--shadow-card)] space-y-3">
            <div className="flex items-center justify-between">
              <div className="w-9 h-9 rounded-xl bg-[#0B0F17] text-[#2DD4BF] font-black text-sm flex items-center justify-center">
                {c.customer.charAt(0).toUpperCase()}
              </div>
              <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${
                c.tier === 'Enterprise' ? 'bg-[#0B0F17] text-[#2DD4BF]' : 'bg-blue-50 text-blue-700'
              }`}>
                {c.tier}
              </span>
            </div>

            <div>
              <h3 className="text-sm font-bold text-[var(--text-main)]">{c.customer}</h3>
              <p className="text-xs font-mono text-[var(--text-muted)] flex items-center gap-1.5 mt-0.5">
                <Mail className="w-3 h-3 text-[var(--text-subtle)]" />
                <span className="truncate">{c.email}</span>
              </p>
            </div>

            <div className="pt-3 border-t border-[var(--border-subtle)] flex items-center justify-between text-xs">
              <span className="text-[var(--text-subtle)]">Active Monthly Plan</span>
              <span className="font-extrabold text-[var(--text-main)]">${Number(c.amount).toLocaleString()}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}