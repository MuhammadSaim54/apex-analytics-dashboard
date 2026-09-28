import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Mail, 
  Trash2, 
  CreditCard, 
  Building2, 
  CheckCircle2
} from 'lucide-react';
import { useDashboard } from '../context/DashboardContext';

export default function RecentTransactionsTable() {
  const { transactions, deleteTransaction } = useDashboard();

  return (
    <div className="bg-[var(--bg-surface)] rounded-2xl border border-[var(--border-subtle)] shadow-[var(--shadow-card)] overflow-hidden">
      
      {/* Header Controls */}
      <div className="p-4 sm:p-5 lg:p-6 border-b border-[var(--border-subtle)] flex items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-sm sm:text-base font-extrabold text-[var(--text-main)]">
              Live Ingested Telemetry Stream
            </h2>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-[var(--primary-light)] text-[var(--primary)] border border-[var(--primary)]/20">
              {transactions.length} Records
            </span>
          </div>
          <p className="text-[11px] sm:text-xs text-[var(--text-muted)] mt-0.5">
            Active customer subscriptions, verified billing payloads, and payment routing.
          </p>
        </div>
      </div>

      {/* 1. Mobile Cards (< 640px / sm) */}
      <div className="block sm:hidden divide-y divide-[var(--border-subtle)]">
        <AnimatePresence>
          {transactions.map((tx) => {
            const initial = tx.customer ? tx.customer.charAt(0).toUpperCase() : 'C';

            return (
              <motion.div
                key={tx.id}
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.15 }}
                className="p-4 space-y-2.5 hover:bg-[var(--bg-subtle)]/40 transition"
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="w-8 h-8 rounded-xl bg-[#0B0F17] text-[#2DD4BF] font-extrabold text-xs flex items-center justify-center flex-shrink-0 shadow-xs">
                      {initial}
                    </div>
                    <div className="min-w-0">
                      <span className="font-bold text-xs text-[var(--text-main)] block truncate">
                        {tx.customer}
                      </span>
                      <span className="text-[10.5px] text-[var(--text-muted)] font-mono block truncate">
                        {tx.email}
                      </span>
                    </div>
                  </div>

                  <span className="text-xs sm:text-sm font-extrabold text-[var(--text-main)] flex-shrink-0">
                    ${Number(tx.amount).toLocaleString('en-US', { minimumFractionDigits: 0 })}
                  </span>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className={`px-2 py-0.5 rounded-md text-[9px] font-bold tracking-wide ${
                      tx.tier === 'Enterprise'
                        ? 'bg-[#0B0F17] text-[#2DD4BF]'
                        : tx.tier === 'Pro'
                        ? 'bg-blue-50 text-blue-700 border border-blue-200'
                        : 'bg-slate-100 text-slate-700'
                    }`}>
                      {tx.tier}
                    </span>

                    <span className="inline-flex items-center gap-0.5 text-[9.5px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-full border border-emerald-200">
                      <CheckCircle2 className="w-2.5 h-2.5 text-emerald-600" />
                      <span>{tx.status}</span>
                    </span>
                  </div>

                  <button
                    onClick={() => deleteTransaction(tx.id)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition cursor-pointer"
                    title="Delete Record"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* 2. Responsive Table (Tablet, 1024px Laptop & Large Monitors) */}
      <div className="hidden sm:block w-full overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-[var(--border-subtle)] bg-[var(--bg-subtle)] text-[10px] lg:text-[11px] font-bold uppercase tracking-wider text-[var(--text-subtle)]">
              <th className="py-3 px-3 sm:px-4 lg:px-5">Customer / Entity</th>
              <th className="py-3 px-3 sm:px-4 lg:px-5 hidden 2xl:table-cell">Billing Email</th>
              <th className="py-3 px-3 sm:px-4 lg:px-5">Plan Tier</th>
              {/* Payment Rail hidden on small laptop (1024px), shows on xl (1280px+) */}
              <th className="py-3 px-3 sm:px-4 lg:px-5 hidden xl:table-cell">Payment Rail</th>
              <th className="py-3 px-3 sm:px-4 lg:px-5">Monthly Revenue</th>
              <th className="py-3 px-3 sm:px-4 lg:px-5">Status</th>
              <th className="py-3 px-3 sm:px-4 lg:px-5 text-right">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-[var(--border-subtle)] text-xs font-medium">
            <AnimatePresence>
              {transactions.map((tx) => {
                const initial = tx.customer ? tx.customer.charAt(0).toUpperCase() : 'C';

                return (
                  <motion.tr
                    key={tx.id}
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.15 }}
                    className="hover:bg-[var(--bg-subtle)]/50 transition group"
                  >
                    {/* Entity + Embedded Email on tablet & small laptop */}
                    <td className="py-3 px-3 sm:px-4 lg:px-5">
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-xl bg-[#0B0F17] text-[#2DD4BF] font-extrabold text-xs flex items-center justify-center flex-shrink-0 shadow-xs">
                          {initial}
                        </div>
                        <div className="min-w-0">
                          <span className="font-bold text-xs text-[var(--text-main)] block truncate leading-tight">
                            {tx.customer}
                          </span>
                          <span className="text-[10px] text-[var(--text-muted)] font-mono block truncate 2xl:hidden">
                            {tx.email}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Dedicated Email Column on 2XL wide screens */}
                    <td className="py-3 px-3 sm:px-4 lg:px-5 text-[var(--text-muted)] hidden 2xl:table-cell">
                      <div className="flex items-center gap-1.5 font-mono text-[11px] truncate max-w-[200px]">
                        <Mail className="w-3.5 h-3.5 text-[var(--text-subtle)] flex-shrink-0" />
                        <span className="truncate">{tx.email}</span>
                      </div>
                    </td>

                    {/* Plan Tier */}
                    <td className="py-3 px-3 sm:px-4 lg:px-5 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-[9.5px] lg:text-[10px] font-bold tracking-wide ${
                        tx.tier === 'Enterprise'
                          ? 'bg-[#0B0F17] text-[#2DD4BF]'
                          : tx.tier === 'Pro'
                          ? 'bg-blue-50 text-blue-700 border border-blue-200'
                          : 'bg-slate-100 text-slate-700'
                      }`}>
                        {tx.tier}
                      </span>
                    </td>

                    {/* Payment Rail (Visible only on XL 1280px+) */}
                    <td className="py-3 px-3 sm:px-4 lg:px-5 text-[var(--text-muted)] hidden xl:table-cell whitespace-nowrap">
                      <div className="flex items-center gap-1.5 text-xs truncate">
                        {tx.channel === 'Bank Wire' ? (
                          <Building2 className="w-3.5 h-3.5 text-amber-600 flex-shrink-0" />
                        ) : (
                          <CreditCard className="w-3.5 h-3.5 text-[var(--primary)] flex-shrink-0" />
                        )}
                        <span>{tx.channel}</span>
                      </div>
                    </td>

                    {/* Monthly Revenue */}
                    <td className="py-3 px-3 sm:px-4 lg:px-5 font-extrabold text-[var(--text-main)] whitespace-nowrap">
                      ${Number(tx.amount).toLocaleString('en-US', { minimumFractionDigits: 0 })}
                    </td>

                    {/* Status */}
                    <td className="py-3 px-3 sm:px-4 lg:px-5 whitespace-nowrap">
                      <span className="inline-flex items-center gap-1 text-[10px] lg:text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                        <span>{tx.status}</span>
                      </span>
                    </td>

                    {/* Actions: Always fully visible without cutting */}
                    <td className="py-3 px-3 sm:px-4 lg:px-5 text-right whitespace-nowrap">
                      <button
                        onClick={() => deleteTransaction(tx.id)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition cursor-pointer"
                        title="Delete Record"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </motion.tr>
                );
              })}
            </AnimatePresence>
          </tbody>
        </table>
      </div>

    </div>
  );
}