import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, CheckCheck, X } from 'lucide-react';

export default function NotificationPopover({ isOpen, onClose, notifications, onMarkAllRead }) {
  if (!isOpen) return null;

  const unreadCount = notifications.filter(n => n.unread).length;

  return (
    <AnimatePresence>
      {/* 1. Global Click-Outside Overlay to close */}
      <div 
        onClick={onClose} 
        className="fixed inset-0 z-40 bg-black/20 md:bg-transparent" 
      />

      {/* 2. Popover Window: Mobile par fixed right-3 left-3, Desktop par absolute right-0 */}
      <motion.div
        initial={{ opacity: 0, y: -8, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -8, scale: 0.98 }}
        transition={{ duration: 0.15 }}
        className="fixed sm:absolute right-3 sm:right-0 left-3 sm:left-auto top-16 mt-1 sm:w-84 max-w-sm bg-[var(--bg-surface)] rounded-2xl shadow-2xl border border-[var(--border-subtle)] overflow-hidden z-50 select-none"
      >
        {/* Header */}
        <div className="p-3.5 border-b border-[var(--border-subtle)] flex items-center justify-between bg-[var(--bg-subtle)]/40">
          <div className="flex items-center gap-2">
            <Bell className="w-3.5 h-3.5 text-[var(--primary)]" />
            <h4 className="text-xs font-extrabold text-[var(--text-main)]">Telemetry Signals</h4>
            {unreadCount > 0 && (
              <span className="text-[10px] font-bold px-1.5 py-0.2 rounded-full bg-[var(--primary-light)] text-[var(--primary)] border border-[var(--primary)]/20">
                {unreadCount}
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            {unreadCount > 0 && (
              <button
                type="button"
                onClick={onMarkAllRead}
                className="text-[10.5px] font-bold text-[var(--primary)] hover:underline flex items-center gap-1 cursor-pointer"
              >
                <CheckCheck className="w-3 h-3" />
                <span>Mark all read</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1 rounded-md text-[var(--text-subtle)] hover:text-[var(--text-main)] sm:hidden"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* List */}
        <div className="divide-y divide-[var(--border-subtle)] max-h-72 overflow-y-auto overscroll-contain">
          {notifications.map((n) => (
            <div
              key={n.id}
              className={`p-3.5 space-y-1 hover:bg-[var(--bg-subtle)]/50 transition cursor-pointer ${
                n.unread ? 'bg-[var(--primary-light)]/20' : ''
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[var(--text-main)] flex items-center gap-1.5 truncate">
                  {n.unread && <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 flex-shrink-0" />}
                  <span className="truncate">{n.title}</span>
                </span>
                <span className="text-[10px] font-mono text-[var(--text-subtle)] flex-shrink-0 ml-2">{n.time}</span>
              </div>
              <p className="text-[11px] text-[var(--text-muted)] leading-relaxed">
                {n.desc}
              </p>
            </div>
          ))}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}