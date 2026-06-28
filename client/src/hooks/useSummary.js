import { useState, useEffect } from 'react';

const API_BASE = "http://localhost:5000/api";

export function useSummary() {
  const [summary, setSummary] = useState(null);
  const [summaryLoading, setSummaryLoading] = useState(true);
  const [summaryError, setSummaryError] = useState(null);

  useEffect(() => {
    let mounted = true;
    fetch(`${API_BASE}/summary`)
      .then(res => {
        if (!res.ok) throw new Error("Failed to fetch summary");
        return res.json();
      })
      .then(data => {
        if (mounted) {
          setSummary(data);
          setSummaryLoading(false);
        }
      })
      .catch(err => {
        if (mounted) {
          setSummaryError(err.message);
          setSummaryLoading(false);
        }
      });
    return () => { mounted = false; };
  }, []);

  return { summary, setSummary, summaryLoading, summaryError };
}
