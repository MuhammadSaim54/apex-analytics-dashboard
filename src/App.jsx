import { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';

export default function App() {
  const [activeTab, setActiveTab] = useState('overview');
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  return (
    <div className="h-screen w-screen flex bg-[var(--bg-app)] overflow-hidden font-sans antialiased">
      
      {/* 1. Sidebar */}
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        mobileOpen={mobileSidebarOpen}
        setMobileOpen={setMobileSidebarOpen}
      />

      {/* 2. Main Viewport Wrapper */}
      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden bg-[var(--bg-app)]">
        
        {/* Global Header */}
        <Header 
          activeTab={activeTab} 
          onOpenMobileSidebar={() => setMobileSidebarOpen(true)}
        />

        {/* 3. Independent Scrollable Content Viewport */}
        <main className="flex-1 h-full overflow-y-auto overscroll-contain px-4 sm:px-6 lg:px-8 py-5 sm:py-6">
          <div className="w-full space-y-6 pb-12">
            
            {/* Title Bar */}
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
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-[var(--success-light)] text-[var(--success)] shadow-2xs">
                  <span className="w-2 h-2 rounded-full bg-[var(--success)] animate-pulse" />
                  Live Telemetry Active
                </span>
              </div>
            </div>

            {/* Responsive KPI Grid: Laptops (1024px) -> 2 cols, Big screens (1280px+) -> 4 cols */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-5">
              {[
                { title: "Monthly Recurring Revenue", val: "$124,592.00", change: "+14.2%" },
                { title: "Active API Consumers", val: "48,290", change: "+8.1%" },
                { title: "Average Latency", val: "18.4 ms", change: "-3.5%" },
                { title: "System Health Rate", val: "99.98%", change: "+0.02%" },
              ].map((kpi, idx) => (
                <div 
                  key={idx} 
                  className="bg-[var(--bg-surface)] p-5 rounded-2xl border border-[var(--border-subtle)] shadow-[var(--shadow-card)] flex flex-col justify-between"
                >
                  <span className="text-xs font-semibold text-[var(--text-muted)] truncate">{kpi.title}</span>
                  <div className="mt-3 flex items-baseline justify-between gap-2">
                    <span className="text-xl sm:text-2xl font-extrabold text-[var(--text-main)] truncate">{kpi.val}</span>
                    <span className="text-xs font-bold text-[var(--success)] bg-[var(--success-light)] px-2 py-0.5 rounded-md flex-shrink-0">
                      {kpi.change}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Test Content: Height deliberately set to test smooth vertical scrolling */}
            <div className="w-full min-h-[520px] rounded-2xl border border-dashed border-[var(--border-strong)] flex flex-col items-center justify-center text-center p-8 bg-[var(--bg-surface)] shadow-xs">
              <div className="w-12 h-12 rounded-2xl bg-[var(--primary-light)] text-[var(--primary)] flex items-center justify-center text-xl font-bold mb-3 shadow-2xs">
                ✦
              </div>
              <h3 className="text-base sm:text-lg font-bold text-[var(--text-main)]">
                Phase 1 Shell Complete
              </h3>
              <p className="text-xs sm:text-sm text-[var(--text-muted)] max-w-md mt-1 leading-relaxed">
                Scrollbarless independent viewport is active. Now ready to populate Phase 2 interactive charts and telemetry data feeds.
              </p>
            </div>

            {/* Second Card to test native page scroll behavior */}
            <div className="w-full h-72 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] p-6 flex items-center justify-center text-slate-400 text-xs font-mono">
              Scroll Area Extender Block • Phase 2 Analytics Deck Placeholder
            </div>

          </div>
        </main>

      </div>

    </div>
  );
}