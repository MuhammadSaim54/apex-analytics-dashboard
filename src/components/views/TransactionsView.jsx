import React from 'react';
import RecentTransactionsTable from '../RecentTransactionsTable';

export default function TransactionsView() {
  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-lg font-extrabold text-[var(--text-main)]">Billing & Transaction Ledger</h2>
        <p className="text-xs text-[var(--text-muted)]">Verified multi-rail settlements, wire transfers, and subscription events.</p>
      </div>
      <RecentTransactionsTable />
    </div>
  );
}