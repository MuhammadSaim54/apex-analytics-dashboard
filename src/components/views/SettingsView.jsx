import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDashboard } from '../../context/DashboardContext';
import { Key, RotateCcw, ShieldCheck, Check, Sparkles, AlertTriangle } from 'lucide-react';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 16, filter: 'blur(4px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      type: 'spring',
      stiffness: 280,
      damping: 24,
    },
  },
};

export default function SettingsView() {
  const { resetToDemoData } = useDashboard();
  const [apiKey, setApiKey] = useState('apex_live_sec_99482fa810e74b91');
  const [copied, setCopied] = useState(false);
  const [purged, setPurged] = useState(false);

  const rollKey = () => {
    setApiKey(`apex_live_sec_${Math.random().toString(36).substring(2, 18)}`);
  };

  const copyKey = () => {
    navigator.clipboard.writeText(apiKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePurge = () => {
    resetToDemoData();
    setPurged(true);
    setTimeout(() => setPurged(false), 2500);
  };

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="max-w-3xl space-y-6 w-full"
    >
      {/* Title */}
      <motion.div variants={cardVariants}>
        <div className="flex items-center gap-2">
          <h2 className="text-lg font-extrabold text-[var(--text-main)] tracking-tight">
            System & Workspace Settings
          </h2>
          <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-[var(--primary-light)] text-[var(--primary)] border border-[var(--primary)]/20">
            v2.4 Live
          </span>
        </div>
        <p className="text-xs text-[var(--text-muted)] mt-1">
          Manage telemetry credentials, local persistence caches, and access keys.
        </p>
      </motion.div>

      {/* Production Ingestion Secret Card */}
      <motion.div 
        variants={cardVariants}
        whileHover={{ y: -2, transition: { duration: 0.2 } }}
        className="p-4 sm:p-6 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] shadow-[var(--shadow-card)] space-y-3.5 transition-shadow hover:shadow-lg"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[var(--primary-light)] text-[var(--primary)] flex items-center justify-center">
              <Key className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-[var(--text-main)]">
                Production Ingestion Secret
              </h3>
              <p className="text-[11px] text-[var(--text-muted)] mt-0.5">
                Authorize cURL telemetry pushes from edge workers.
              </p>
            </div>
          </div>

          <span className="hidden sm:inline-flex items-center gap-1 text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
            <ShieldCheck className="w-3 h-3" />
            Active
          </span>
        </div>

        {/* Responsive Input & Button Row (Fixes the Cut-Off Issue on Mobile) */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 pt-1 w-full">
          <div className="relative flex-1 min-w-0">
            <input
              type="text"
              readOnly
              value={apiKey}
              className="w-full bg-[var(--bg-subtle)] border border-[var(--border-subtle)] focus:border-[var(--primary)] rounded-xl px-3.5 py-2.5 font-mono text-xs text-[var(--text-main)] outline-none transition select-all truncate"
            />
          </div>

          <div className="flex items-center gap-2 flex-shrink-0">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={copyKey}
              className="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl bg-[#0B0F17] hover:bg-[#1A2232] text-white text-xs font-bold transition shadow-xs flex items-center justify-center gap-1.5 cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-[#2DD4BF]" />
                  <span>Copied!</span>
                </>
              ) : (
                <span>Copy</span>
              )}
            </motion.button>

            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={rollKey}
              className="flex-1 sm:flex-initial px-3.5 py-2.5 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] hover:bg-[var(--bg-subtle)] text-xs font-semibold text-[var(--text-muted)] hover:text-[var(--text-main)] transition cursor-pointer flex items-center justify-center"
            >
              Rotate Key
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* State Purge Card */}
      <motion.div 
        variants={cardVariants}
        whileHover={{ y: -2, transition: { duration: 0.2 } }}
        className="p-4 sm:p-6 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] shadow-[var(--shadow-card)] space-y-3.5 transition-shadow hover:shadow-lg"
      >
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center">
            <AlertTriangle className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-rose-600">
              Factory State Purge
            </h3>
            <p className="text-[11px] text-[var(--text-muted)] mt-0.5">
              Reset localStorage cache and restore initial seed records.
            </p>
          </div>
        </div>

        <p className="text-xs text-[var(--text-muted)] leading-relaxed">
          This operation clears all locally ingested telemetry transactions and resets all KPI deck numbers to standard seed state.
        </p>

        <div className="pt-1">
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={handlePurge}
            className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-200 text-xs font-bold transition cursor-pointer flex items-center justify-center gap-2"
          >
            <RotateCcw className={`w-3.5 h-3.5 ${purged ? 'animate-spin' : ''}`} />
            <span>{purged ? 'Storage Cache Purged!' : 'Purge Local Storage Cache'}</span>
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
}