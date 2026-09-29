import React, { useState } from 'react';
import { 
  Menu, 
  Search, 
  Bell, 
  Download, 
  ChevronRight
} from 'lucide-react';
import NotificationPopover from './NotificationPopover';

const INITIAL_NOTIFICATIONS = [
  { id: 'notif_1', title: 'New Enterprise Settlement', desc: 'Vercel Edge completed $28,400 run-rate wire.', time: '4m ago', unread: true },
  { id: 'notif_2', title: 'Edge Node Latency Optimized', desc: 'US-East edge dropped p99 to 12.1ms.', time: '18m ago', unread: true },
  { id: 'notif_3', title: 'Global Failover Sync Passed', desc: 'Frankfurt availability zone backup verified.', time: '1h ago', unread: false },
];

export default function Header({ activeTab, onOpenMobileSidebar, onOpenCommandPalette, onExportCSV }) {
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS);

  const unreadCount = notifications.filter(n => n.unread).length;

  const handleMarkAllRead = () => {
    setNotifications((prev) => prev.map(n => ({ ...n, unread: false })));
  };

  return (
    <header className="h-16 border-b border-[var(--border-subtle)] bg-[var(--bg-surface)] px-3 sm:px-6 lg:px-8 flex items-center justify-between flex-shrink-0 z-20">
      
      {/* Left: Mobile trigger & Breadcrumbs */}
      <div className="flex items-center gap-2 sm:gap-3 min-w-0">
        <button
          onClick={onOpenMobileSidebar}
          className="p-1.5 -ml-1 text-[var(--text-muted)] hover:text-[var(--text-main)] lg:hidden rounded-lg hover:bg-[var(--bg-subtle)] transition cursor-pointer"
          aria-label="Open mobile menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <nav className="flex items-center gap-1.5 text-xs text-[var(--text-muted)] font-medium truncate">
          <span className="hover:text-[var(--text-main)] transition cursor-pointer hidden sm:inline">Telemetry</span>
          <ChevronRight className="w-3.5 h-3.5 text-[var(--text-subtle)] hidden sm:inline" />
          <span className="font-bold text-[var(--text-main)] capitalize truncate">{activeTab}</span>
        </nav>
      </div>

      {/* Center: Global Search trigger (Cmd + K) */}
      <div className="hidden md:flex items-center flex-1 max-w-md mx-6">
        <button
          type="button"
          onClick={onOpenCommandPalette}
          className="w-full flex items-center justify-between px-3.5 py-1.5 rounded-xl bg-[var(--bg-subtle)] border border-[var(--border-subtle)] hover:border-slate-300 transition text-left cursor-pointer group"
        >
          <div className="flex items-center gap-2 text-xs text-[var(--text-subtle)] group-hover:text-[var(--text-muted)]">
            <Search className="w-3.5 h-3.5" />
            <span>Search telemetry, streams, endpoints...</span>
          </div>
          <kbd className="font-mono text-[10px] font-bold text-[var(--text-muted)] bg-[var(--bg-surface)] px-1.5 py-0.5 rounded border border-[var(--border-subtle)] shadow-2xs">
            ⌘K
          </kbd>
        </button>
      </div>

      {/* Right: Actions, Notifications & Real CSV Export */}
      <div className="flex items-center gap-1.5 sm:gap-3 flex-shrink-0">
        
        {/* Mobile Search Button */}
        <button
          onClick={onOpenCommandPalette}
          className="p-2 text-[var(--text-muted)] hover:text-[var(--text-main)] md:hidden rounded-lg hover:bg-[var(--bg-subtle)] transition cursor-pointer"
          title="Search (Cmd+K)"
        >
          <Search className="w-4 h-4" />
        </button>

        {/* Notifications Trigger */}
        <div className="relative">
          <button
            onClick={() => setIsNotifOpen(!isNotifOpen)}
            className="p-2 text-[var(--text-muted)] hover:text-[var(--text-main)] rounded-lg hover:bg-[var(--bg-subtle)] transition relative cursor-pointer"
            title="Telemetry Signals"
          >
            <Bell className="w-4 h-4" />
            {/* Green Badge only renders if unreadCount > 0 */}
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-emerald-500 ring-2 ring-[var(--bg-surface)] animate-pulse" />
            )}
          </button>

          <NotificationPopover 
            isOpen={isNotifOpen} 
            onClose={() => setIsNotifOpen(false)}
            notifications={notifications}
            onMarkAllRead={handleMarkAllRead}
          />
        </div>

        {/* CSV Export Button */}
        <button
          onClick={onExportCSV}
          className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl bg-[#0B0F17] hover:bg-[#1A2232] text-white text-xs font-bold transition shadow-xs cursor-pointer group"
          title="Download Real CSV File"
        >
          <Download className="w-3.5 h-3.5 text-[#2DD4BF] group-hover:translate-y-0.5 transition-transform" />
          <span className="hidden sm:inline">Export Feed</span>
        </button>
      </div>

    </header>
  );
}