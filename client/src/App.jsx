import React from 'react';
import Header from './components/Header';
import AnalyticsBlock from './components/AnalyticsBlock';
import TransactionFeed from './components/TransactionFeed';
import { useSummary } from './hooks/useSummary';
import { useTransactions } from './hooks/useTransactions';

function App() {
  const { summary, setSummary, summaryLoading } = useSummary();
  const { transactions, loading, error, updateCategory } = useTransactions({ setSummary });

  return (
    <div className="min-h-screen flex flex-col font-sans text-stone-900 bg-[#FAF9F7]">
      <Header />
      <AnalyticsBlock summary={summary} loading={summaryLoading} />
      <main className="flex-1 overflow-y-auto">
        <TransactionFeed 
          transactions={transactions} 
          loading={loading} 
          error={error} 
          onCategoryChange={updateCategory} 
        />
      </main>
      <footer className="text-center text-xs text-stone-400 py-4 border-t border-[#E8E0D0] mt-auto">
        UPI Money Manager · {new Date().getFullYear()}
      </footer>
    </div>
  );
}

export default App;
