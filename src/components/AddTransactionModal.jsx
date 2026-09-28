import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Plus, 
  DollarSign, 
  Building, 
  Mail, 
  ChevronDown, 
  Check, 
  Sparkles,
  Layers,
  CreditCard,
  Building2
} from 'lucide-react';
import { useDashboard } from '../context/DashboardContext';

const TIER_OPTIONS = [
  { id: 'Enterprise', label: 'Enterprise Plan', desc: 'Unlimited streams & dedicated nodes' },
  { id: 'Pro', label: 'Pro Developer', desc: 'Up to 100K calls/day' },
  { id: 'Starter', label: 'Starter Tier', desc: 'Standard cloud sandbox' }
];

const CHANNEL_OPTIONS = [
  { id: 'Stripe', label: 'Stripe Checkout', icon: CreditCard },
  { id: 'Bank Wire', label: 'Bank Wire Transfer', icon: Building2 },
  { id: 'Card', label: 'Direct Card Auth', icon: CreditCard }
];

export default function AddTransactionModal({ isOpen, onClose }) {
  const { addTransaction } = useDashboard();

  const [customer, setCustomer] = useState('');
  const [email, setEmail] = useState('');
  const [amount, setAmount] = useState('');
  const [tier, setTier] = useState('Enterprise');
  const [channel, setChannel] = useState('Stripe');

  // Custom Dropdown Open States
  const [isTierDropdownOpen, setIsTierDropdownOpen] = useState(false);
  const [isChannelDropdownOpen, setIsChannelDropdownOpen] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!customer.trim() || !amount) return;

    addTransaction({
      customer: customer.trim(),
      email: email.trim(),
      amount: amount,
      tier: tier,
      channel: channel
    });

    // Reset & Close
    setCustomer('');
    setEmail('');
    setAmount('');
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-950/50 backdrop-blur-xs"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 12 }}
          transition={{ type: 'spring', damping: 26, stiffness: 320 }}
          className="relative w-full max-w-lg bg-[var(--bg-surface)] rounded-3xl shadow-[0_25px_60px_-15px_rgba(11,15,23,0.18)] border border-[var(--border-subtle)] p-6 sm:p-7 z-10"
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-[var(--border-subtle)]">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#0B0F17] text-[#2DD4BF] flex items-center justify-center shadow-xs">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-base font-extrabold text-[var(--text-main)]">Add Telemetry Record</h3>
                <p className="text-xs text-[var(--text-muted)]">Live ingestion into MRR and consumer metrics</p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[var(--bg-subtle)] rounded-xl transition cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="mt-5 space-y-4">
            
            {/* Customer & Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label className="block text-xs font-semibold text-[var(--text-main)] mb-1.5">Company / Client</label>
                <div className="flex items-center gap-2 bg-[var(--bg-subtle)] border border-[var(--border-subtle)] rounded-xl px-3.5 py-2.5 focus-within:border-[var(--primary)] focus-within:bg-white transition">
                  <Building className="w-4 h-4 text-[var(--text-subtle)]" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. OpenAI Global"
                    value={customer}
                    onChange={(e) => setCustomer(e.target.value)}
                    className="bg-transparent text-xs text-[var(--text-main)] placeholder-[var(--text-subtle)] outline-none w-full font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[var(--text-main)] mb-1.5">Billing Email</label>
                <div className="flex items-center gap-2 bg-[var(--bg-subtle)] border border-[var(--border-subtle)] rounded-xl px-3.5 py-2.5 focus-within:border-[var(--primary)] focus-within:bg-white transition">
                  <Mail className="w-4 h-4 text-[var(--text-subtle)]" />
                  <input
                    type="email"
                    placeholder="finance@openai.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-transparent text-xs text-[var(--text-main)] placeholder-[var(--text-subtle)] outline-none w-full font-medium"
                  />
                </div>
              </div>
            </div>

            {/* Amount */}
            <div>
              <label className="block text-xs font-semibold text-[var(--text-main)] mb-1.5">Monthly Amount (USD)</label>
              <div className="flex items-center gap-2 bg-[var(--bg-subtle)] border border-[var(--border-subtle)] rounded-xl px-3.5 py-2.5 focus-within:border-[var(--primary)] focus-within:bg-white transition">
                <DollarSign className="w-4 h-4 text-[var(--text-subtle)]" />
                <input
                  type="number"
                  step="any"
                  required
                  placeholder="e.g. 25000"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="bg-transparent text-sm text-[var(--text-main)] placeholder-[var(--text-subtle)] outline-none w-full font-bold"
                />
              </div>
            </div>

            {/* Premium Custom Dropdowns Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
              
              {/* 1. Custom Tier Dropdown */}
              <div className="relative">
                <label className="block text-xs font-semibold text-[var(--text-main)] mb-1.5">Subscription Tier</label>
                <button
                  type="button"
                  onClick={() => {
                    setIsTierDropdownOpen(!isTierDropdownOpen);
                    setIsChannelDropdownOpen(false);
                  }}
                  className="w-full flex items-center justify-between bg-[var(--bg-subtle)] border border-[var(--border-subtle)] hover:border-slate-300 rounded-xl px-3.5 py-2.5 text-xs font-semibold text-[var(--text-main)] transition cursor-pointer"
                >
                  <div className="flex items-center gap-2 truncate">
                    <span className="w-2 h-2 rounded-full bg-[#0F766E]" />
                    <span>{tier}</span>
                  </div>
                  <ChevronDown className={`w-3.5 h-3.5 text-[var(--text-muted)] transition-transform duration-200 ${isTierDropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {isTierDropdownOpen && (
                  <div className="absolute top-full left-0 right-0 mt-1.5 bg-white rounded-2xl shadow-xl border border-[var(--border-subtle)] p-1.5 z-30 animate-in fade-in zoom-in-95">
                    {TIER_OPTIONS.map((item) => (
                      <div
                        key={item.id}
                        onClick={() => {
                          setTier(item.id);
                          setIsTierDropdownOpen(false);
                        }}
                        className={`p-2 rounded-xl flex items-center justify-between cursor-pointer transition ${
                          tier === item.id ? 'bg-[var(--primary-light)] text-[var(--primary)]' : 'hover:bg-slate-50 text-[var(--text-main)]'
                        }`}
                      >
                        <div>
                          <p className="text-xs font-bold">{item.label}</p>
                          <p className="text-[10px] text-[var(--text-muted)]">{item.desc}</p>
                        </div>
                        {tier === item.id && <Check className="w-3.5 h-3.5" />}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* 2. Custom Channel Dropdown */}
              <div className="relative">
                <label className="block text-xs font-semibold text-[var(--text-main)] mb-1.5">Payment Rail</label>
                <button
                  type="button"
                  onClick={() => {
                    setIsChannelDropdownOpen(!isChannelDropdownOpen);
                    setIsTierDropdownOpen(false);
                  }}
                  className="w-full flex items-center justify-between bg-[var(--bg-subtle)] border border-[var(--border-subtle)] hover:border-slate-300 rounded-xl px-3.5 py-2.5 text-xs font-semibold text-[var(--text-main)] transition cursor-pointer"
                >
                  <div className="flex items-center gap-2 truncate">
                    <CreditCard className="w-3.5 h-3.5 text-[var(--primary)]" />
                    <span>{channel}</span>
                  </div>
                  <ChevronDown className={`w-3.5 h-3.5 text-[var(--text-muted)] transition-transform duration-200 ${isChannelDropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {isChannelDropdownOpen && (
                  <div className="absolute top-full left-0 right-0 mt-1.5 bg-white rounded-2xl shadow-xl border border-[var(--border-subtle)] p-1.5 z-30 animate-in fade-in zoom-in-95">
                    {CHANNEL_OPTIONS.map((item) => {
                      const Icon = item.icon;
                      return (
                        <div
                          key={item.id}
                          onClick={() => {
                            setChannel(item.id);
                            setIsChannelDropdownOpen(false);
                          }}
                          className={`p-2 rounded-xl flex items-center justify-between cursor-pointer transition ${
                            channel === item.id ? 'bg-[var(--primary-light)] text-[var(--primary)]' : 'hover:bg-slate-50 text-[var(--text-main)]'
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <Icon className="w-3.5 h-3.5" />
                            <span className="text-xs font-bold">{item.label}</span>
                          </div>
                          {channel === item.id && <Check className="w-3.5 h-3.5" />}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

            </div>

            {/* Actions */}
            <div className="pt-4 border-t border-[var(--border-subtle)] flex items-center justify-end gap-2.5">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 rounded-xl text-xs font-semibold text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[var(--bg-subtle)] transition cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-[#0B0F17] hover:bg-[#1A2232] text-white text-xs font-bold transition shadow-xs flex items-center gap-1.5 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5 text-[#2DD4BF]" />
                <span>Inject Record & Recalculate</span>
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}