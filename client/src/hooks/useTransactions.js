import { useState, useEffect, useCallback, useRef } from 'react';

const API_BASE = "http://localhost:5000/api";
const POLL_INTERVAL = 4500;

export function useTransactions({ setSummary }) {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const txCountRef = useRef(0);

  const fetchTransactions = useCallback(async (isInitial = false) => {
    try {
      if (isInitial) setLoading(true);
      const res = await fetch(`${API_BASE}/transactions`);
      if (!res.ok) throw new Error("Failed to fetch transactions");
      const data = await res.json();
      
      if (data.transactions.length !== txCountRef.current) {
        setTransactions(data.transactions);
        txCountRef.current = data.transactions.length;
      }
      setError(null);
    } catch (err) {
      if (isInitial) setError(err.message);
    } finally {
      if (isInitial) setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTransactions(true);

    let intervalId = null;

    const startPolling = () => {
      if (!intervalId) {
        intervalId = setInterval(() => fetchTransactions(false), POLL_INTERVAL);
      }
    };

    const stopPolling = () => {
      if (intervalId) {
        clearInterval(intervalId);
        intervalId = null;
      }
    };

    startPolling();

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        stopPolling();
      } else {
        startPolling();
        fetchTransactions(false); // fetch immediately on resume
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      stopPolling();
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [fetchTransactions]);

  const updateCategory = useCallback(async (id, category) => {
    // Save snapshot for rollback
    const previousTransactions = transactions;
    
    // Optimistic update
    setTransactions(prev => 
      prev.map(tx => tx.id === id ? { ...tx, category, autoTagged: false } : tx)
    );

    try {
      const res = await fetch(`${API_BASE}/transactions/${id}/category`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ category }),
      });
      if (!res.ok) throw new Error("Failed to update category");
      
      const { transaction: updatedTx, summary: updatedSummary } = await res.json();
      
      // Update with server truth
      setTransactions(prev => 
        prev.map(tx => tx.id === id ? updatedTx : tx)
      );
      // Push new summary to the other hook without a second GET call
      setSummary(updatedSummary);
    } catch (err) {
      // Rollback on failure
      setTransactions(previousTransactions);
      console.error(err);
    }
  }, [transactions, setSummary]);

  return { transactions, loading, error, updateCategory };
}
