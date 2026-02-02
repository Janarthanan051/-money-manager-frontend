import api from './api';

export const accountService = {
  // Get all accounts
  getAccounts: async () => {
    const response = await api.get('/accounts');
    return response.data;
  },

  // Create new account
  createAccount: async (accountData) => {
    const response = await api.post('/accounts/create', accountData);
    return response.data;
  },

  // Transfer funds between accounts
  transferFunds: async (transferData) => {
    const response = await api.post('/accounts/transfer', transferData);
    return response.data;
  },

  // Update account
  updateAccount: async (id, accountData) => {
    const response = await api.put(`/accounts/${id}`, accountData);
    return response.data;
  },

  // Delete account
  deleteAccount: async (id) => {
    const response = await api.delete(`/accounts/${id}`);
    return response.data;
  },
};
