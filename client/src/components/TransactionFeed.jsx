import { useState, useMemo } from 'react';
import Skeleton from './Skeleton';
import TransactionCard from './TransactionCard';
import SearchBar from './SearchBar';

export default function TransactionFeed({ transactions, loading, error, onCategoryChange }) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTransactions = useMemo(() => {
    if (!searchQuery) return transactions;
    const lowerQuery = searchQuery.toLowerCase();
    return transactions.filter(tx => 
      tx.description.toLowerCase().includes(lowerQuery) ||
      tx.category.toLowerCase().includes(lowerQuery) ||
      (tx.vpa && tx.vpa.toLowerCase().includes(lowerQuery)) ||
      (tx.rrn && tx.rrn.toLowerCase().includes(lowerQuery)) ||
      (tx.bankAccount && tx.bankAccount.toLowerCase().includes(lowerQuery))
    );
  }, [transactions, searchQuery]);

  // Human Usability: Cap at 50 to prevent infinite DOM growth
  const displayedTransactions = filteredTransactions.slice(0, 50);

  // Group by date for human-readable sections
  const groupedTransactions = useMemo(() => {
    const groups = {};
    // Ensure chronological order for groups, though transactions should already be sorted
    displayedTransactions.forEach(tx => {
      const dateObj = new Date(tx.timestamp);
      const dateKey = dateObj.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
      
      const today = new Date();
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      
      let finalKey = dateKey;
      if (dateObj.toDateString() === today.toDateString()) finalKey = 'Today';
      else if (dateObj.toDateString() === yesterday.toDateString()) finalKey = 'Yesterday';

      if (!groups[finalKey]) groups[finalKey] = [];
      groups[finalKey].push(tx);
    });
    return groups;
  }, [displayedTransactions]);

  if (loading && transactions.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-4">
        <Skeleton />
      </div>
    );
  }

  if (error && transactions.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 sm:px-6 flex flex-col items-center justify-center gap-3 py-16">
        <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl px-6 py-4 text-sm font-medium text-center">
          {error}
        </div>
        <button 
          onClick={() => window.location.reload()} 
          className="bg-[#1C1917] hover:bg-stone-800 text-white text-sm font-medium px-5 py-2 rounded-lg transition-colors"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-3 sm:px-6 py-4">
      <SearchBar value={searchQuery} onChange={setSearchQuery} />

      <div className="flex justify-between items-center mb-4 mt-2">
        <h2 className="text-stone-900 font-semibold text-sm">
          {searchQuery ? 'Search Results' : 'Recent Transactions'}
        </h2>
        <span className="text-xs text-stone-400 font-medium">
          {filteredTransactions.length > 50 ? '50+ showing' : `${filteredTransactions.length} transactions`}
        </span>
      </div>
      
      {filteredTransactions.length === 0 ? (
        <div className="text-center text-sm text-stone-500 py-10">
          {searchQuery ? 'No transactions found matching your search.' : 'No transactions yet.'}
        </div>
      ) : (
        <div className="flex flex-col gap-6">
          {Object.entries(groupedTransactions).map(([dateLabel, txs]) => (
            <div key={dateLabel}>
              <div className="text-xs font-semibold text-stone-400 uppercase tracking-wider mb-3 px-1">
                {dateLabel}
              </div>
              <div>
                {txs.map(tx => (
                  <TransactionCard 
                    key={tx.id} 
                    transaction={tx} 
                    onCategoryChange={onCategoryChange} 
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
