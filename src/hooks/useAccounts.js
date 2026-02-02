import { useState, useCallback } from 'react';
import { accountService } from '../services/api';

export const useAccounts = () => {
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchAccounts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await accountService.getAll();
      setAccounts(response.data.accounts || []);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch accounts');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const createAccount = useCallback(async (accountData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await accountService.create(accountData);
      setAccounts(prev => [...prev, response.data.account]);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create account');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const transferFunds = useCallback(async (transferData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await accountService.transfer(transferData);
      // Refresh accounts after transfer
      await fetchAccounts();
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to transfer funds');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [fetchAccounts]);

  return {
    accounts,
    loading,
    error,
    fetchAccounts,
    createAccount,
    transferFunds
  };
};

export default useAccounts;
