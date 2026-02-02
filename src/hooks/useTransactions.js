import { useState, useCallback } from 'react';
import { transactionService } from '../services/api';

export const useTransactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchTransactions = useCallback(async (filters = {}) => {
    setLoading(true);
    setError(null);
    try {
      const response = await transactionService.getAll(filters);
      setTransactions(response.data.transactions || []);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch transactions');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchSummary = useCallback(async (period = 'monthly') => {
    setLoading(true);
    setError(null);
    try {
      const response = await transactionService.getSummary(period);
      setSummary(response.data);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch summary');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const addTransaction = useCallback(async (transactionData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await transactionService.create(transactionData);
      setTransactions(prev => [response.data.transaction, ...prev]);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add transaction');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const updateTransaction = useCallback(async (id, transactionData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await transactionService.update(id, transactionData);
      setTransactions(prev => 
        prev.map(t => t._id === id ? response.data.transaction : t)
      );
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update transaction');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteTransaction = useCallback(async (id) => {
    setLoading(true);
    setError(null);
    try {
      await transactionService.delete(id);
      setTransactions(prev => prev.filter(t => t._id !== id));
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete transaction');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    transactions,
    summary,
    loading,
    error,
    fetchTransactions,
    fetchSummary,
    addTransaction,
    updateTransaction,
    deleteTransaction
  };
};

export default useTransactions;
