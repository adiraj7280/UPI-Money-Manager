import Skeleton from './Skeleton';
import TransactionCard from './TransactionCard';

export default function TransactionFeed({ transactions, loading, error, onCategoryChange }) {
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
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-stone-900 font-semibold text-sm">Recent Transactions</h2>
        <span className="text-xs text-stone-400 font-medium">{transactions.length} transactions</span>
      </div>
      
      {transactions.length === 0 ? (
        <div className="text-center text-sm text-stone-500 py-10">
          No transactions yet.
        </div>
      ) : (
        <div>
          {transactions.map(tx => (
            <TransactionCard 
              key={tx.id} 
              transaction={tx} 
              onCategoryChange={onCategoryChange} 
            />
          ))}
        </div>
      )}
    </div>
  );
}
