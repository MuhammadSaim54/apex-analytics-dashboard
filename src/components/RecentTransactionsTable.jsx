import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  Trash2, 
  CreditCard, 
  Building2, 
  CheckCircle2, 
  ArrowUpDown, 
  ChevronLeft, 
  ChevronRight,
  Eye,
  SlidersHorizontal
} from 'lucide-react';
import { useDashboard } from '../context/DashboardContext';
import RecordInspectorDrawer from './RecordInspectorDrawer';

export default function RecentTransactionsTable() {
  const { transactions, deleteTransaction } = useDashboard();

  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState('');
  const [tierFilter, setTierFilter] = useState('All');
  const [sortField, setSortField] = useState('amount'); // 'amount' | 'customer'
  const [sortOrder, setSortOrder] = useState('desc'); // 'asc' | 'desc'

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Selected Record for Inspection Drawer
  const [selectedRecord, setSelectedRecord] = useState(null);

  // Filtered & Sorted Records
  const filteredData = useMemo(() => {
    return transactions
      .filter((tx) => {
        const matchesSearch = 
          tx.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
          tx.email.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesTier = tierFilter === 'All' || tx.tier === tierFilter;
        return matchesSearch && matchesTier;
      })
      .sort((a, b) => {
        if (sortField === 'amount') {
          return sortOrder === 'desc' ? b.amount - a.amount : a.amount - b.amount;
        }
        if (sortField === 'customer') {
          return sortOrder === 'desc' 
            ? b.customer.localeCompare(a.customer) 
            : a.customer.localeCompare(b.customer);
        }
        return 0;
      });
  }, [transactions, searchQuery, tierFilter, sortField, sortOrder]);

  // Paginated Slice
  const totalPages = Math.ceil(filteredData.length / itemsPerPage) || 1;
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredData.slice(start, start + itemsPerPage);
  }, [filteredData, currentPage]);

  const handleSort = (field) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('desc');
    }
  };

  return (
    <div className="bg-[var(--bg-surface)] rounded-2xl border border-[var(--border-subtle)] shadow-[var(--shadow-card)] overflow-hidden">
      
      {/* 1. Header & Live Search / Filter Bar */}
      <div className="p-4 sm:p-5 lg:p-6 border-b border-[var(--border-subtle)] flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-sm sm:text-base font-extrabold text-[var(--text-main)]">
              Enterprise Telemetry Data Grid
            </h2>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-[var(--primary-light)] text-[var(--primary)] border border-[var(--primary)]/20">
              {filteredData.length} Matched
            </span>
          </div>
          <p className="text-[11px] sm:text-xs text-[var(--text-muted)] mt-0.5">
            Click any row to inspect deep payload parameters.
          </p>
        </div>

        {/* Search & Filter Controls */}
        <div className="flex items-center gap-2.5 flex-wrap sm:flex-nowrap">
          {/* Search Box */}
          <div className="flex items-center gap-2 bg-[var(--bg-subtle)] border border-[var(--border-subtle)] rounded-xl px-3 py-1.5 focus-within:border-[var(--primary)] focus-within:bg-white transition w-full sm:w-56">
            <Search className="w-3.5 h-3.5 text-[var(--text-subtle)] flex-shrink-0" />
            <input
              type="text"
              placeholder="Search entity, email..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              className="bg-transparent text-xs text-[var(--text-main)] placeholder-[var(--text-subtle)] outline-none w-full font-medium"
            />
          </div>

          {/* Tier Filter Pills */}
          <div className="flex items-center gap-1 p-1 bg-[var(--bg-subtle)] border border-[var(--border-subtle)] rounded-xl flex-shrink-0">
            {['All', 'Enterprise', 'Pro'].map((t) => (
              <button
                key={t}
                onClick={() => {
                  setTierFilter(t);
                  setCurrentPage(1);
                }}
                className={`px-2.5 py-1 rounded-lg text-[10px] font-bold transition cursor-pointer ${
                  tierFilter === t
                    ? 'bg-[#0B0F17] text-white shadow-2xs'
                    : 'text-[var(--text-muted)] hover:text-[var(--text-main)]'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 2. Mobile View: Clickable Card Stream */}
      <div className="block sm:hidden divide-y divide-[var(--border-subtle)]">
        <AnimatePresence>
          {paginatedData.map((tx) => {
            const initial = tx.customer ? tx.customer.charAt(0).toUpperCase() : 'C';

            return (
              <motion.div
                key={tx.id}
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.15 }}
                onClick={() => setSelectedRecord(tx)}
                className="p-4 space-y-2.5 hover:bg-[var(--bg-subtle)]/50 transition cursor-pointer active:bg-[var(--bg-subtle)]"
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
                      <span className="text-[10px] text-[var(--text-muted)] font-mono block truncate">
                        {tx.email}
                      </span>
                    </div>
                  </div>

                  <span className="text-xs font-extrabold text-[var(--text-main)] flex-shrink-0">
                    ${Number(tx.amount).toLocaleString('en-US', { minimumFractionDigits: 0 })}
                  </span>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className={`px-2 py-0.5 rounded-md text-[9px] font-bold ${
                      tx.tier === 'Enterprise'
                        ? 'bg-[#0B0F17] text-[#2DD4BF]'
                        : 'bg-blue-50 text-blue-700'
                    }`}>
                      {tx.tier}
                    </span>

                    <span className="text-[9.5px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-full border border-emerald-200">
                      {tx.status}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedRecord(tx);
                      }}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-[var(--primary)] hover:bg-[var(--bg-subtle)] transition"
                      title="Inspect Record"
                    >
                      <Eye className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteTransaction(tx.id);
                      }}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition"
                      title="Delete Record"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* 3. Desktop / Laptop / Tablet Table */}
      <div className="hidden sm:block w-full overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-[var(--border-subtle)] bg-[var(--bg-subtle)] text-[10px] lg:text-[11px] font-bold uppercase tracking-wider text-[var(--text-subtle)] select-none">
              <th 
                onClick={() => handleSort('customer')}
                className="py-3 px-3 sm:px-4 lg:px-5 cursor-pointer hover:text-[var(--text-main)] transition"
              >
                <div className="flex items-center gap-1.5">
                  <span>Customer / Entity</span>
                  <ArrowUpDown className="w-3 h-3 text-[var(--text-subtle)]" />
                </div>
              </th>
              <th className="py-3 px-3 sm:px-4 lg:px-5 hidden 2xl:table-cell">Billing Email</th>
              <th className="py-3 px-3 sm:px-4 lg:px-5">Plan Tier</th>
              <th className="py-3 px-3 sm:px-4 lg:px-5 hidden xl:table-cell">Payment Rail</th>
              <th 
                onClick={() => handleSort('amount')}
                className="py-3 px-3 sm:px-4 lg:px-5 cursor-pointer hover:text-[var(--text-main)] transition"
              >
                <div className="flex items-center gap-1.5">
                  <span>Monthly Revenue</span>
                  <ArrowUpDown className="w-3 h-3 text-[var(--text-subtle)]" />
                </div>
              </th>
              <th className="py-3 px-3 sm:px-4 lg:px-5">Status</th>
              <th className="py-3 px-3 sm:px-4 lg:px-5 text-right">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-[var(--border-subtle)] text-xs font-medium">
            <AnimatePresence>
              {paginatedData.map((tx) => {
                const initial = tx.customer ? tx.customer.charAt(0).toUpperCase() : 'C';

                return (
                  <motion.tr
                    key={tx.id}
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.15 }}
                    onClick={() => setSelectedRecord(tx)}
                    className="hover:bg-[var(--bg-subtle)]/60 transition group cursor-pointer"
                  >
                    <td className="py-3.5 px-3 sm:px-4 lg:px-5">
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 lg:w-8 lg:h-8 rounded-xl bg-[#0B0F17] text-[#2DD4BF] font-extrabold text-xs flex items-center justify-center flex-shrink-0 shadow-xs">
                          {initial}
                        </div>
                        <div className="min-w-0">
                          <span className="font-bold text-xs text-[var(--text-main)] block truncate leading-tight group-hover:text-[var(--primary)] transition-colors">
                            {tx.customer}
                          </span>
                          <span className="text-[10px] text-[var(--text-muted)] font-mono block truncate 2xl:hidden">
                            {tx.email}
                          </span>
                        </div>
                      </div>
                    </td>

                    <td className="py-3.5 px-3 sm:px-4 lg:px-5 text-[var(--text-muted)] hidden 2xl:table-cell">
                      <span className="font-mono text-[11px] truncate max-w-[200px] block">
                        {tx.email}
                      </span>
                    </td>

                    <td className="py-3.5 px-3 sm:px-4 lg:px-5 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-[9.5px] lg:text-[10px] font-bold tracking-wide ${
                        tx.tier === 'Enterprise'
                          ? 'bg-[#0B0F17] text-[#2DD4BF]'
                          : 'bg-blue-50 text-blue-700 border border-blue-200'
                      }`}>
                        {tx.tier}
                      </span>
                    </td>

                    <td className="py-3.5 px-3 sm:px-4 lg:px-5 text-[var(--text-muted)] hidden xl:table-cell whitespace-nowrap">
                      <div className="flex items-center gap-1.5 text-xs">
                        {tx.channel === 'Bank Wire' ? (
                          <Building2 className="w-3.5 h-3.5 text-amber-600 flex-shrink-0" />
                        ) : (
                          <CreditCard className="w-3.5 h-3.5 text-[var(--primary)] flex-shrink-0" />
                        )}
                        <span>{tx.channel}</span>
                      </div>
                    </td>

                    <td className="py-3.5 px-3 sm:px-4 lg:px-5 font-extrabold text-[var(--text-main)] whitespace-nowrap">
                      ${Number(tx.amount).toLocaleString('en-US', { minimumFractionDigits: 0 })}
                    </td>

                    <td className="py-3.5 px-3 sm:px-4 lg:px-5 whitespace-nowrap">
                      <span className="inline-flex items-center gap-1 text-[10px] lg:text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                        <span>{tx.status}</span>
                      </span>
                    </td>

                    <td className="py-3.5 px-3 sm:px-4 lg:px-5 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-1" onClick={(e) => e.stopPropagation()}>
                        <button
                          onClick={() => setSelectedRecord(tx)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-[var(--text-main)] hover:bg-[var(--bg-subtle)] transition cursor-pointer"
                          title="Inspect Payload"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => deleteTransaction(tx.id)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition cursor-pointer"
                          title="Delete Record"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                );
              })}
            </AnimatePresence>
          </tbody>
        </table>
      </div>

      {/* 4. Pagination Controls Footer */}
      <div className="p-3 sm:p-4 border-t border-[var(--border-subtle)] bg-[var(--bg-subtle)]/30 flex items-center justify-between text-xs text-[var(--text-muted)]">
        <span>
          Showing <strong>{paginatedData.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0}</strong>–
          <strong>{Math.min(currentPage * itemsPerPage, filteredData.length)}</strong> of{' '}
          <strong>{filteredData.length}</strong>
        </span>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="p-1.5 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-surface)] hover:bg-[var(--bg-subtle)] disabled:opacity-40 disabled:cursor-not-allowed transition cursor-pointer"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
          </button>
          <span className="font-mono text-[11px] font-bold text-[var(--text-main)]">
            {currentPage} / {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="p-1.5 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-surface)] hover:bg-[var(--bg-subtle)] disabled:opacity-40 disabled:cursor-not-allowed transition cursor-pointer"
          >
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Slide-Over Drawer Integration */}
      <RecordInspectorDrawer
        record={selectedRecord}
        isOpen={Boolean(selectedRecord)}
        onClose={() => setSelectedRecord(null)}
      />

    </div>
  );
}