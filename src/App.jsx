import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DashboardProvider, useDashboard } from './context/DashboardContext';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import KPIDeck from './components/KPIDeck';
import RevenueAreaChart from './components/RevenueAreaChart';
import RegionalTrafficBarChart from './components/RegionalTrafficBarChart';
import RecentTransactionsTable from './components/RecentTransactionsTable';
import AddTransactionModal from './components/AddTransactionModal';
import CommandPalette from './components/CommandPalette';
import AnalyticsView from './components/views/AnalyticsView';
import CustomersView from './components/views/CustomersView';
import TransactionsView from './components/views/TransactionsView';
import ProductsView from './components/views/ProductsView';
import IntegrationsView from './components/views/IntegrationsView';
import SettingsView from './components/views/SettingsView';
import HelpDocsView from './components/views/HelpDocsView';
import { Plus, RotateCcw } from 'lucide-react';

function DashboardContent() {
  const [activeTab, setActiveTab] = useState('overview');
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCommandOpen, setIsCommandOpen] = useState(false);

  // Viewport scroll container reference
  const mainScrollRef = useRef(null);

  const { transactions, resetToDemoData } = useDashboard();

  // Route tab change hone par viewport ko instantly top par reset karta hai
  useEffect(() => {
    if (mainScrollRef.current) {
      mainScrollRef.current.scrollTo({ top: 0, behavior: 'instant' });
    }
  }, [activeTab]);

  // Global Spotlight Keyboard Shortcut: Cmd+K / Ctrl+K
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

  // Real In-Browser Dynamic CSV Generation & Download
  const handleExportCSV = () => {
    if (!transactions.length) return;
    const headers = [
      'Record ID',
      'Customer Entity',
      'Billing Email',
      'Subscription Tier',
      'Payment Rail',
      'Monthly Revenue USD',
      'Settlement Status',
      'Timestamp'
    ];
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

    const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `apex_telemetry_export_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Awwwards-style Dynamic Animated View Switcher
  const renderActiveView = () => {
    return (
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 14, filter: 'blur(4px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          exit={{ opacity: 0, y: -10, filter: 'blur(3px)' }}
          transition={{
            type: 'spring',
            stiffness: 320,
            damping: 26,
            mass: 0.6,
          }}
          className="w-full space-y-6"
        >
          {(() => {
            switch (activeTab) {
              case 'analytics':
                return <AnalyticsView />;
              case 'customers':
                return <CustomersView />;
              case 'transactions':
                return <TransactionsView />;
              case 'products':
                return <ProductsView />;
              case 'integrations':
                return <IntegrationsView />;
              case 'settings':
                return <SettingsView />;
              case 'help':
                return <HelpDocsView />;
              case 'overview':
              default:
                return (
                  <>
                    <KPIDeck />
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-6">
                      <RevenueAreaChart />
                      <RegionalTrafficBarChart />
                    </div>
                    <RecentTransactionsTable />
                  </>
                );
            }
          })()}
        </motion.div>
      </AnimatePresence>
    );
  };

  return (
    <div className="h-screen w-screen flex bg-[var(--bg-app)] overflow-hidden font-sans antialiased selection:bg-[#2DD4BF]/20 selection:text-[#0F766E]">
      {/* 1. Sidebar Navigation */}
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        mobileOpen={mobileSidebarOpen}
        setMobileOpen={setMobileSidebarOpen}
      />

      {/* 2. Main Workspace Viewport */}
      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden bg-[var(--bg-app)]">
        {/* Command Header */}
        <Header 
          activeTab={activeTab} 
          onOpenMobileSidebar={() => setMobileSidebarOpen(true)}
          onOpenCommandPalette={() => setIsCommandOpen(true)}
          onExportCSV={handleExportCSV}
        />

        {/* 3. Independent Fluid Scroll Area */}
        <main 
          ref={mainScrollRef}
          className="flex-1 h-full overflow-y-auto overscroll-contain px-4 sm:px-6 lg:px-8 py-5 sm:py-6"
        >
          <div className="w-full space-y-6 pb-16">
            
            {/* View Header Bar & Actions */}
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
                <motion.button
                  whileTap={{ scale: 0.92 }}
                  onClick={resetToDemoData}
                  className="p-2 text-[var(--text-muted)] hover:text-[var(--text-main)] bg-[var(--bg-surface)] hover:bg-[var(--bg-subtle)] border border-[var(--border-subtle)] rounded-xl transition cursor-pointer"
                  title="Reset to Demo State"
                >
                  <RotateCcw className="w-4 h-4" />
                </motion.button>

                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsModalOpen(true)}
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#0B0F17] hover:bg-[#1A2232] text-white text-xs font-bold transition shadow-xs cursor-pointer group"
                >
                  <Plus className="w-3.5 h-3.5 text-[#2DD4BF] group-hover:rotate-90 transition-transform duration-200" />
                  <span>Add Record</span>
                </motion.button>
              </div>
            </div>

            {/* Render Active View Route */}
            {renderActiveView()}

          </div>
        </main>
      </div>

      {/* Dynamic Telemetry Entry Modal */}
      <AddTransactionModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />

      {/* Global Spotlight Command Runner (Cmd + K) */}
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