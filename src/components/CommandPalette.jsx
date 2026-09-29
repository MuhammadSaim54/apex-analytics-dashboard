import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  Plus, 
  RotateCcw, 
  Download, 
  LayoutDashboard, 
  BarChart3, 
  Users, 
  ArrowRight,
  Sparkles,
  Command
} from 'lucide-react';
import { useDashboard } from '../context/DashboardContext';

export default function CommandPalette({ isOpen, onClose, onOpenAddModal, onExportCSV, setActiveTab }) {
  const [query, setQuery] = useState('');
  const { resetToDemoData } = useDashboard();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else onOpenAddModal ? null : null; // Handled at App level
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const ACTIONS = [
    {
      id: 'add-record',
      title: 'Add Telemetry Record',
      category: 'Actions',
      icon: Plus,
      run: () => {
        onClose();
        onOpenAddModal();
      }
    },
    {
      id: 'export-csv',
      title: 'Export Telemetry Feed (.CSV)',
      category: 'Actions',
      icon: Download,
      run: () => {
        onClose();
        onExportCSV();
      }
    },
    {
      id: 'reset-demo',
      title: 'Reset to Factory Demo State',
      category: 'System',
      icon: RotateCcw,
      run: () => {
        resetToDemoData();
        onClose();
      }
    },
    {
      id: 'nav-overview',
      title: 'Navigate to Overview',
      category: 'Navigation',
      icon: LayoutDashboard,
      run: () => {
        setActiveTab('overview');
        onClose();
      }
    },
    {
      id: 'nav-analytics',
      title: 'Navigate to Analytics Engine',
      category: 'Navigation',
      icon: BarChart3,
      run: () => {
        setActiveTab('analytics');
        onClose();
      }
    },
    {
      id: 'nav-customers',
      title: 'Navigate to Customer Management',
      category: 'Navigation',
      icon: Users,
      run: () => {
        setActiveTab('customers');
        onClose();
      }
    }
  ];

  const filtered = ACTIONS.filter(a => 
    a.title.toLowerCase().includes(query.toLowerCase()) ||
    a.category.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 sm:pt-28 p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-950/50 backdrop-blur-xs"
        />

        {/* Command Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: -10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: -10 }}
          transition={{ duration: 0.15 }}
          className="relative w-full max-w-xl bg-[var(--bg-surface)] rounded-2xl shadow-2xl border border-[var(--border-subtle)] overflow-hidden z-10"
        >
          {/* Search Input Bar */}
          <div className="flex items-center gap-3 px-4 py-3.5 border-b border-[var(--border-subtle)]">
            <Search className="w-4 h-4 text-[var(--text-subtle)] flex-shrink-0" />
            <input
              type="text"
              autoFocus
              placeholder="Type a command or jump to feature..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full bg-transparent text-xs sm:text-sm font-medium text-[var(--text-main)] placeholder-[var(--text-subtle)] outline-none"
            />
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[var(--bg-subtle)] text-[var(--text-muted)] border border-[var(--border-subtle)]">
              ESC
            </span>
          </div>

          {/* Action List */}
          <div className="max-h-72 overflow-y-auto p-2 space-y-1">
            {filtered.length === 0 ? (
              <div className="p-6 text-center text-xs text-[var(--text-muted)]">
                No matching telemetry actions found.
              </div>
            ) : (
              filtered.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={item.run}
                    className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-[var(--bg-subtle)] transition text-left group cursor-pointer"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-7 h-7 rounded-lg bg-[var(--bg-subtle)] text-[var(--text-muted)] group-hover:bg-[var(--primary-light)] group-hover:text-[var(--primary)] flex items-center justify-center transition-colors">
                        <Icon className="w-3.5 h-3.5" />
                      </div>
                      <div className="truncate">
                        <span className="text-xs font-semibold text-[var(--text-main)] block truncate">
                          {item.title}
                        </span>
                        <span className="text-[10px] text-[var(--text-subtle)] block">
                          {item.category}
                        </span>
                      </div>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                );
              })
            )}
          </div>

          {/* Footer Bar */}
          <div className="px-4 py-2 bg-[var(--bg-subtle)]/60 border-t border-[var(--border-subtle)] flex items-center justify-between text-[10.5px] text-[var(--text-muted)]">
            <span className="flex items-center gap-1.5">
              <Command className="w-3 h-3 text-[var(--primary)]" />
              <span>Apex Command Runner</span>
            </span>
            <span className="font-mono text-[9.5px]">v2.4.0 Engine</span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}