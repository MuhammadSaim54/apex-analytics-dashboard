import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, 
  BarChart3, 
  Users, 
  CreditCard, 
  Package, 
  Settings, 
  HelpCircle, 
  Layers,
  X
} from 'lucide-react';

import ApexLogo from './ApexLogo';
import SidebarToggleIcon from './SidebarToggleIcon';

const NAV_ITEMS = [
  { id: 'overview', label: 'Overview', icon: LayoutDashboard },
  { id: 'analytics', label: 'Analytics', icon: BarChart3, badge: 'Live' },
  { id: 'customers', label: 'Customers', icon: Users },
  { id: 'transactions', label: 'Transactions', icon: CreditCard },
  { id: 'products', label: 'Products', icon: Package },
  { id: 'integrations', label: 'Integrations', icon: Layers },
];

const BOTTOM_ITEMS = [
  { id: 'settings', label: 'Settings', icon: Settings },
  { id: 'support', label: 'Help & Docs', icon: HelpCircle },
];

export default function Sidebar({ 
  activeTab, 
  setActiveTab, 
  mobileOpen, 
  setMobileOpen 
}) {
  const [collapsed, setCollapsed] = useState(false);
  const [isLogoHovered, setIsLogoHovered] = useState(false);

  const handleSelectNav = (id) => {
    setActiveTab(id);
    if (mobileOpen) setMobileOpen(false);
  };

  const sidebarContent = (isMobileView = false) => (
    <div className="h-full flex flex-col justify-between bg-[var(--bg-surface)]">
      <div>
        {/* Brand Header */}
        <div className="h-16 px-4 border-b border-[var(--border-subtle)] flex items-center justify-between">
          {!isMobileView && collapsed ? (
            <div className="w-full flex justify-center">
              <button
                type="button"
                onClick={() => setCollapsed(false)}
                onMouseEnter={() => setIsLogoHovered(true)}
                onMouseLeave={() => setIsLogoHovered(false)}
                className="w-10 h-10 rounded-xl bg-[var(--bg-subtle)] hover:bg-[var(--primary-light)] text-[var(--text-muted)] hover:text-[var(--primary)] flex items-center justify-center transition-all duration-200 cursor-pointer group shadow-2xs"
                title="Expand sidebar"
              >
                {isLogoHovered ? (
                  <SidebarToggleIcon className="w-5 h-5 text-[var(--primary)] transition-transform duration-200 scale-110" />
                ) : (
                  <div className="w-8 h-8 rounded-lg bg-[#0B0F17] text-white flex items-center justify-center shadow-xs">
                    <ApexLogo className="w-4 h-4" color="#FFFFFF" />
                  </div>
                )}
              </button>
            </div>
          ) : (
            <>
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-9 h-9 rounded-xl bg-[#0B0F17] text-white flex items-center justify-center shadow-sm flex-shrink-0">
                  <ApexLogo className="w-4 h-4" color="#FFFFFF" />
                </div>
                
                <div className="min-w-0">
                  <span className="font-extrabold text-[15px] tracking-tight text-[var(--text-main)] block leading-none">
                    Apex
                  </span>
                  <span className="text-[9.5px] font-bold uppercase tracking-wider text-[var(--primary)] mt-0.5 block">
                    Telemetry Engine
                  </span>
                </div>
              </div>

              {isMobileView ? (
                <button
                  type="button"
                  onClick={() => setMobileOpen(false)}
                  className="p-2 hover:bg-[var(--bg-subtle)] text-[var(--text-muted)] rounded-xl transition cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              ) : (
                <button 
                  type="button"
                  onClick={() => setCollapsed(true)}
                  className="p-2 hover:bg-[var(--bg-subtle)] text-[var(--text-muted)] hover:text-[var(--text-main)] rounded-xl transition cursor-pointer"
                  title="Collapse sidebar"
                >
                  <SidebarToggleIcon className="w-4 h-4" />
                </button>
              )}
            </>
          )}
        </div>

        {/* Nav Items */}
        <div className="p-3 space-y-1">
          <div className={`py-1.5 text-[10px] font-bold uppercase tracking-wider text-[var(--text-subtle)] ${!isMobileView && collapsed ? 'text-center' : 'px-3'}`}>
            {!isMobileView && collapsed ? '•••' : 'Telemetry'}
          </div>

          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            const isItemCollapsed = !isMobileView && collapsed;

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleSelectNav(item.id)}
                className={`w-full flex items-center rounded-xl text-xs font-semibold relative transition-colors cursor-pointer ${
                  isItemCollapsed ? 'justify-center p-3' : 'gap-3 px-3 py-2.5'
                } ${
                  isActive 
                    ? 'text-[var(--primary)]' 
                    : 'text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[var(--bg-subtle)]'
                }`}
                title={isItemCollapsed ? item.label : undefined}
              >
                {isActive && (
                  <motion.div
                    layoutId={isMobileView ? "activeMobileNavPill" : "activeSidebarPill"}
                    className="absolute inset-0 bg-[var(--primary-light)] rounded-xl border border-[var(--primary)]/15"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}

                <Icon className={`w-4 h-4 relative z-10 flex-shrink-0 ${isActive ? 'text-[var(--primary)]' : 'text-[var(--text-muted)]'}`} />
                
                {!isItemCollapsed && (
                  <div className="flex-1 flex items-center justify-between relative z-10 min-w-0">
                    <span className="truncate">{item.label}</span>
                    {item.badge && (
                      <span className="px-1.5 py-0.5 rounded-md text-[9px] font-bold bg-[#0B0F17] text-white tracking-wide">
                        {item.badge}
                      </span>
                    )}
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Footer Profile */}
      <div className="p-3 border-t border-[var(--border-subtle)] space-y-1">
        {BOTTOM_ITEMS.map((item) => {
          const Icon = item.icon;
          const isItemCollapsed = !isMobileView && collapsed;

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => handleSelectNav(item.id)}
              className={`w-full flex items-center rounded-xl text-xs font-semibold text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[var(--bg-subtle)] transition cursor-pointer ${
                isItemCollapsed ? 'justify-center p-3' : 'gap-3 px-3 py-2.5'
              }`}
              title={isItemCollapsed ? item.label : undefined}
            >
              <Icon className="w-4 h-4 flex-shrink-0" />
              {!isItemCollapsed && <span className="truncate">{item.label}</span>}
            </button>
          );
        })}

        <div className={`mt-2 pt-2 border-t border-[var(--border-subtle)] flex items-center gap-3 ${!isMobileView && collapsed ? 'justify-center p-1' : 'px-2 py-2'}`}>
          <div className="w-8 h-8 rounded-full bg-[#0B0F17] text-[#2DD4BF] font-extrabold text-xs flex items-center justify-center flex-shrink-0 shadow-xs">
            MS
          </div>
          {(!isMobileView ? !collapsed : true) && (
            <div className="min-w-0 flex-1">
              <p className="text-xs font-bold text-[var(--text-main)] truncate">Muhammad Saim</p>
              <p className="text-[10px] text-[var(--text-subtle)] truncate">Lead Architect</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <>
      <aside 
        className={`hidden lg:flex h-screen border-r border-[var(--border-subtle)] max-w-fit transition-all duration-300 select-none z-30 flex-shrink-0 max-w-fit ${
          collapsed ? 'w-[72px]' : 'w-64'
        }`}
      >
        {sidebarContent(false)}
      </aside>

      <AnimatePresence>
        {mobileOpen && (
          <div className="fixed inset-0 z-50 lg:hidden flex">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 bg-slate-950/40 backdrop-blur-xs"
            />

            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 300 }}
              className="relative w-72 max-w-[85vw] h-full shadow-2xl z-10"
            >
              {sidebarContent(true)}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}