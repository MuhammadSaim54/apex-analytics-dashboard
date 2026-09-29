import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Building, 
  Mail, 
  CreditCard, 
  Building2, 
  Calendar, 
  CheckCircle2, 
  Clock, 
  Copy, 
  ShieldCheck, 
  ExternalLink 
} from 'lucide-react';

export default function RecordInspectorDrawer({ record, isOpen, onClose }) {
  if (!isOpen || !record) return null;

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-hidden">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-950/40 backdrop-blur-xs transition-opacity"
        />

        <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 300 }}
            className="w-screen max-w-md bg-[var(--bg-surface)] border-l border-[var(--border-subtle)] shadow-2xl flex flex-col justify-between"
          >
            {/* Drawer Header */}
            <div className="p-5 sm:p-6 border-b border-[var(--border-subtle)] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-[#0B0F17] text-[#2DD4BF] flex items-center justify-center font-black text-sm shadow-xs">
                  {record.customer?.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-[var(--text-main)] truncate max-w-[220px]">
                    {record.customer}
                  </h3>
                  <div className="flex items-center gap-1.5 text-[11px] font-mono text-[var(--text-muted)]">
                    <span>{record.id}</span>
                    <button
                      onClick={() => copyToClipboard(record.id)}
                      className="hover:text-[var(--text-main)] transition cursor-pointer"
                      title="Copy Record ID"
                    >
                      <Copy className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>

              <button
                onClick={onClose}
                className="p-2 text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[var(--bg-subtle)] rounded-xl transition cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Drawer Body */}
            <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6">
              
              {/* Highlight Card */}
              <div className="p-4 rounded-2xl bg-[var(--bg-subtle)] border border-[var(--border-subtle)] flex items-center justify-between">
                <div>
                  <span className="text-[11px] font-semibold text-[var(--text-muted)] uppercase tracking-wider block">
                    Settled Volume
                  </span>
                  <span className="text-2xl font-black text-[var(--text-main)] mt-0.5 block">
                    ${Number(record.amount).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </span>
                </div>
                <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  {record.status}
                </span>
              </div>

              {/* Metadata Grid */}
              <div className="space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--text-subtle)]">
                  Account Metadata
                </h4>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="p-3 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)]">
                    <span className="text-[10px] text-[var(--text-muted)] block">Plan Tier</span>
                    <span className="font-bold text-[var(--text-main)] mt-0.5 block">{record.tier}</span>
                  </div>

                  <div className="p-3 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)]">
                    <span className="text-[10px] text-[var(--text-muted)] block">Payment Channel</span>
                    <span className="font-bold text-[var(--text-main)] mt-0.5 block">{record.channel}</span>
                  </div>

                  <div className="p-3 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] col-span-2">
                    <span className="text-[10px] text-[var(--text-muted)] block">Verified Ingestion Email</span>
                    <span className="font-mono font-medium text-[var(--text-main)] mt-0.5 block truncate">
                      {record.email}
                    </span>
                  </div>

                  <div className="p-3 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] col-span-2">
                    <span className="text-[10px] text-[var(--text-muted)] block">Creation Timestamp</span>
                    <span className="font-mono text-[var(--text-muted)] mt-0.5 block">
                      {record.date} (UTC 00:00)
                    </span>
                  </div>
                </div>
              </div>

              {/* Raw JSON Payload */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--text-subtle)]">
                    Raw Telemetry Payload
                  </h4>
                  <button
                    onClick={() => copyToClipboard(JSON.stringify(record, null, 2))}
                    className="text-[10px] font-bold text-[var(--primary)] hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <Copy className="w-2.5 h-2.5" />
                    Copy JSON
                  </button>
                </div>

                <pre className="p-3 rounded-xl bg-[#0B0F17] text-[#2DD4BF] text-[10.5px] font-mono overflow-x-auto border border-slate-800">
                  {JSON.stringify(record, null, 2)}
                </pre>
              </div>

            </div>

            {/* Drawer Footer */}
            <div className="p-4 sm:p-5 border-t border-[var(--border-subtle)] bg-[var(--bg-subtle)]/50 flex items-center justify-end">
              <button
                type="button"
                onClick={onClose}
                className="w-full py-2.5 rounded-xl bg-[#0B0F17] hover:bg-[#1A2232] text-white text-xs font-bold transition shadow-xs cursor-pointer text-center"
              >
                Close Inspector
              </button>
            </div>

          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
}