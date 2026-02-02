import api from './api';

export const transactionService = {
  // Add new transaction
  addTransaction: async (transactionData) => {
    const response = await api.post('/transactions/add', transactionData);
    return response.data;
  },

  // Get all transactions with optional filters
  getTransactions: async (filters = {}) => {
    const params = new URLSearchParams();
    
    if (filters.type) params.append('type', filters.type);
    if (filters.category) params.append('category', filters.category);
    if (filters.division) params.append('division', filters.division);
    if (filters.startDate) params.append('startDate', filters.startDate);
    if (filters.endDate) params.append('endDate', filters.endDate);

    const response = await api.get(`/transactions?${params.toString()}`);
    return response.data;
  },

  // Get summary
  getSummary: async () => {
    const response = await api.get('/transactions/summary');
    return response.data;
  },

  // Edit transaction
  editTransaction: async (id, transactionData) => {
    const response = await api.put(`/transactions/edit/${id}`, transactionData);
    return response.data;
  },

  // Delete transaction
  deleteTransaction: async (id) => {
    const response = await api.delete(`/transactions/${id}`);
    return response.data;
  },
};
