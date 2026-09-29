import React, { useState, useEffect } from 'react';
import { DashboardProvider, useDashboard } from './context/DashboardContext';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import KPIDeck from './components/KPIDeck';
import RevenueAreaChart from './components/RevenueAreaChart';
import RegionalTrafficBarChart from './components/RegionalTrafficBarChart';
import RecentTransactionsTable from './components/RecentTransactionsTable';
import AddTransactionModal from './components/AddTransactionModal';
import CommandPalette from './components/CommandPalette';
import { Plus, RotateCcw } from 'lucide-react';

function DashboardContent() {
  const [activeTab, setActiveTab] = useState('overview');
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCommandOpen, setIsCommandOpen] = useState(false);

  const { transactions, resetToDemoData } = useDashboard();

  // Global Keyboard Shortcut: Cmd+K / Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsCommandOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Real Dynamic CSV File Generation & Instant Download Engine
  const handleExportCSV = () => {
    if (!transactions.length) return;

    const headers = ['Record ID', 'Customer Entity', 'Billing Email', 'Subscription Tier', 'Payment Rail', 'Monthly Revenue USD', 'Settlement Status', 'Timestamp'];
    const rows = transactions.map((t) => [
      t.id,
      `"${t.customer}"`,
      t.email,
      t.tier,
      t.channel,
      t.amount,
      t.status,
      t.date
    ]);

    const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `apex_telemetry_export_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="h-screen w-screen flex bg-[var(--bg-app)] overflow-hidden font-sans antialiased">
      {/* 1. Sidebar */}
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        mobileOpen={mobileSidebarOpen}
        setMobileOpen={setMobileSidebarOpen}
      />

      {/* 2. Main Viewport */}
      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden bg-[var(--bg-app)]">
        
        {/* Header */}
        <Header 
          activeTab={activeTab} 
          onOpenMobileSidebar={() => setMobileSidebarOpen(true)}
          onOpenCommandPalette={() => setIsCommandOpen(true)}
          onExportCSV={handleExportCSV}
        />

        {/* 3. Independent Scrollable Viewport */}
        <main className="flex-1 h-full overflow-y-auto overscroll-contain px-4 sm:px-6 lg:px-8 py-5 sm:py-6">
          <div className="w-full space-y-6 pb-16">
            
            {/* Title & Action Controls */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h1 className="text-xl sm:text-2xl font-extrabold text-[var(--text-main)] tracking-tight capitalize">
                  {activeTab}
                </h1>
                <p className="text-xs sm:text-sm text-[var(--text-muted)] mt-0.5">
                  Real-time telemetry and operational metrics across cloud infrastructure.
                </p>
              </div>
              
              <div className="flex items-center gap-2 self-start sm:self-auto">
                <button
                  onClick={resetToDemoData}
                  className="p-2 text-[var(--text-muted)] hover:text-[var(--text-main)] bg-[var(--bg-surface)] hover:bg-[var(--bg-subtle)] border border-[var(--border-subtle)] rounded-xl transition cursor-pointer"
                  title="Reset to Demo State"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>

                <button
                  onClick={() => setIsModalOpen(true)}
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#0B0F17] hover:bg-[#1A2232] text-white text-xs font-bold transition shadow-xs cursor-pointer group"
                >
                  <Plus className="w-3.5 h-3.5 text-[#2DD4BF] group-hover:rotate-90 transition-transform duration-200" />
                  <span>Add Record</span>
                </button>
              </div>
            </div>

            {/* Live Reactive KPI Deck */}
            <KPIDeck />

            {/* Charts Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-6">
              <RevenueAreaChart />
              <RegionalTrafficBarChart />
            </div>

            {/* Enterprise Telemetry Data Grid */}
            <RecentTransactionsTable />

          </div>
        </main>
      </div>

      {/* Add Record Modal */}
      <AddTransactionModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      {/* Global Command Palette (Cmd + K) */}
      <CommandPalette 
        isOpen={isCommandOpen}
        onClose={() => setIsCommandOpen(false)}
        onOpenAddModal={() => setIsModalOpen(true)}
        onExportCSV={handleExportCSV}
        setActiveTab={setActiveTab}
      />
    </div>
  );
}

export default function App() {
  return (
    <DashboardProvider>
      <DashboardContent />
    </DashboardProvider>
  );
}