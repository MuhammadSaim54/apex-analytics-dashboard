import React from 'react';
import { 
  Search, 
  Bell, 
  Command, 
  HelpCircle,
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import SidebarToggleIcon from './SidebarToggleIcon';

export default function Header({ activeTab, onOpenMobileSidebar }) {
  return (
    <header className="h-16 px-5 sm:px-6 bg-[var(--bg-surface)] border-b border-[var(--border-subtle)] flex items-center justify-between flex-shrink-0 select-none z-20">
      
      {/* Left: Mobile Menu Trigger & Breadcrumbs */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onOpenMobileSidebar}
          className="lg:hidden p-1.5 -ml-1 hover:bg-[var(--bg-subtle)] text-[var(--text-muted)] hover:text-[var(--text-main)] rounded-xl transition cursor-pointer"
          title="Open Navigation"
        >
          <SidebarToggleIcon className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-1.5 text-xs sm:text-sm">
          <span className="text-[var(--text-subtle)] font-medium hidden sm:inline">Telemetry</span>
          <ChevronRight className="w-3.5 h-3.5 text-[var(--text-subtle)] hidden sm:inline" />
          <span className="text-[var(--text-main)] font-bold capitalize">{activeTab}</span>
        </div>
      </div>

      {/* Center: Command / Search Bar */}
      <div className="hidden md:flex items-center gap-2.5 bg-[var(--bg-subtle)] border border-[var(--border-subtle)] px-3.5 py-1.5 rounded-xl w-60 lg:w-80 xl:w-96 focus-within:border-[var(--primary)] focus-within:bg-[var(--bg-surface)] transition">
        <Search className="w-4 h-4 text-[var(--text-subtle)]" />
        <input 
          type="text" 
          placeholder="Search telemetry, streams, endpoints..." 
          className="bg-transparent text-xs text-[var(--text-main)] placeholder-[var(--text-subtle)] outline-none w-full font-medium"
        />
        <div className="hidden lg:flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-[10px] text-[var(--text-subtle)] font-mono shadow-2xs">
          <Command className="w-2.5 h-2.5" />
          <span>K</span>
        </div>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-2 sm:gap-3">
        <button 
          type="button" 
          className="p-2 hover:bg-[var(--bg-subtle)] text-[var(--text-muted)] hover:text-[var(--text-main)] rounded-xl transition cursor-pointer relative"
          title="Notifications"
        >
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[var(--primary)]" />
        </button>

        <button 
          type="button" 
          className="p-2 hover:bg-[var(--bg-subtle)] text-[var(--text-muted)] hover:text-[var(--text-main)] rounded-xl transition cursor-pointer hidden sm:flex"
          title="Documentation"
        >
          <HelpCircle className="w-4 h-4" />
        </button>

        <div className="h-5 w-[1px] bg-[var(--border-subtle)] mx-1 hidden sm:block" />

        <button 
          type="button"
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#0B0F17] hover:bg-[#1A2232] text-white text-xs font-semibold shadow-xs transition cursor-pointer group"
        >
          <span>Export Feed</span>
          <ExternalLink className="w-3.5 h-3.5 text-[#2DD4BF] group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>

    </header>
  );
}