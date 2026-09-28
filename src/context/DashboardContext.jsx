import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';

const DashboardContext = createContext();

const INITIAL_TRANSACTIONS = [
  { id: 'tx_101', customer: 'Acme Corp', email: 'billing@acme.com', amount: 14200, tier: 'Enterprise', status: 'Completed', date: '2026-09-28', channel: 'Stripe' },
  { id: 'tx_102', customer: 'Vercel Edge', email: 'infra@vercel.com', amount: 28400, tier: 'Enterprise', status: 'Completed', date: '2026-09-27', channel: 'Bank Wire' },
  { id: 'tx_103', customer: 'Supabase Cloud', email: 'finance@supabase.io', amount: 9800, tier: 'Pro', status: 'Completed', date: '2026-09-26', channel: 'Stripe' },
  { id: 'tx_104', customer: 'Linear Labs', email: 'ops@linear.app', amount: 16500, tier: 'Enterprise', status: 'Completed', date: '2026-09-25', channel: 'Card' },
  { id: 'tx_105', customer: 'Raycast HQ', email: 'dev@raycast.com', amount: 7200, tier: 'Pro', status: 'Completed', date: '2026-09-24', channel: 'Stripe' },
  { id: 'tx_106', customer: 'Retool Inc', email: 'accounts@retool.com', amount: 12900, tier: 'Enterprise', status: 'Completed', date: '2026-09-23', channel: 'Card' },
  { id: 'tx_107', customer: 'Resend Co', email: 'team@resend.com', amount: 4800, tier: 'Starter', status: 'Completed', date: '2026-09-22', channel: 'Stripe' },
  { id: 'tx_108', customer: 'PlanetScale', email: 'billing@planetscale.com', amount: 30792, tier: 'Enterprise', status: 'Completed', date: '2026-09-21', channel: 'Bank Wire' },
];

export function DashboardProvider({ children }) {
  const [transactions, setTransactions] = useState(() => {
    try {
      const saved = localStorage.getItem('apex_transactions_v2');
      return saved ? JSON.parse(saved) : INITIAL_TRANSACTIONS;
    } catch {
      return INITIAL_TRANSACTIONS;
    }
  });

  const [dateRange, setDateRange] = useState('30d');

  useEffect(() => {
    localStorage.setItem('apex_transactions_v2', JSON.stringify(transactions));
  }, [transactions]);

  // Derived Reactive Numbers
  const metrics = useMemo(() => {
    const totalMRR = transactions.reduce((acc, curr) => acc + (Number(curr.amount) || 0), 0);
    const activeConsumers = new Set(transactions.map((t) => t.email.toLowerCase())).size;
    const latencyVal = Math.max(12.4, (24.2 - (transactions.length * 0.4))).toFixed(1);
    const healthRate = (99.99 - (transactions.filter(t => t.status === 'Failed').length * 0.05)).toFixed(2);
    const enterpriseCount = transactions.filter(t => t.tier === 'Enterprise').length;

    return {
      mrr: totalMRR,
      activeConsumers,
      latency: `${latencyVal} ms`,
      healthRate: `${healthRate}%`,
      transactionCount: transactions.length,
      enterpriseShare: Math.round((enterpriseCount / (transactions.length || 1)) * 100)
    };
  }, [transactions]);

  // Guaranteed State Mutation
  const addTransaction = (newRecord) => {
    const numericAmount = Math.abs(parseFloat(newRecord.amount) || 0);

    const record = {
      id: `tx_${Date.now()}`,
      customer: newRecord.customer,
      email: newRecord.email || `${newRecord.customer.toLowerCase().replace(/\s+/g, '')}@cloud.io`,
      amount: numericAmount,
      tier: newRecord.tier || 'Enterprise',
      status: 'Completed',
      channel: newRecord.channel || 'Stripe',
      date: new Date().toISOString().split('T')[0]
    };

    setTransactions((prev) => [record, ...prev]);
  };

  const deleteTransaction = (id) => {
    setTransactions((prev) => prev.filter((t) => t.id !== id));
  };

  const resetToDemoData = () => {
    setTransactions(INITIAL_TRANSACTIONS);
    localStorage.removeItem('apex_transactions_v2');
  };

  return (
    <DashboardContext.Provider
      value={{
        transactions,
        metrics,
        dateRange,
        setDateRange,
        addTransaction,
        deleteTransaction,
        resetToDemoData,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
}

export function useDashboard() {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error('useDashboard must be used within a DashboardProvider');
  }
  return context;
}