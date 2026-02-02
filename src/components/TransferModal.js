import React, { useState } from 'react';
import { accountService } from '../services/accountService';
import { getIndianDateTime } from '../utils/helpers';

function TransferModal({ isOpen, onClose, accounts = [], onSuccess }) {
  const [formData, setFormData] = useState({
    fromAccountId: '',
    toAccountId: '',
    amount: '',
    description: '',
    date: getIndianDateTime(),
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!accounts || accounts.length < 2) {
      setError('You need at least 2 accounts to make a transfer. Please create accounts first.');
      return;
    }

    if (formData.fromAccountId === formData.toAccountId) {
      setError('Cannot transfer to the same account');
      return;
    }

    const fromAccount = accounts.find(a => a._id === formData.fromAccountId);
    if (fromAccount && parseFloat(formData.amount) > fromAccount.balance) {
      setError('Insufficient balance in the source account');
      return;
    }

    setLoading(true);

    try {
      await accountService.transferFunds({
        ...formData,
        amount: parseFloat(formData.amount),
      });
      
      // Reset form
      setFormData({
        fromAccountId: '',
        toAccountId: '',
        amount: '',
        description: '',
        date: getIndianDateTime(),
      });
      
      onSuccess();
      onClose();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to transfer funds');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  const hasEnoughAccounts = accounts && accounts.length >= 2;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Transfer Funds</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 text-2xl"
            >
              ×
            </button>
          </div>

          {!hasEnoughAccounts && (
            <div className="mb-4 p-4 bg-yellow-50 border border-yellow-200 text-yellow-800 rounded">
              <p className="font-medium">No accounts available</p>
              <p className="text-sm mt-1">You need at least 2 accounts to make a transfer. Click on the Balance card button to create accounts first.</p>
            </div>
          )}

          {error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                From Account
              </label>
              <select
                name="fromAccountId"
                required
                value={formData.fromAccountId}
                onChange={handleChange}
                disabled={!hasEnoughAccounts}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
              >
                <option value="">Select account</option>
                {accounts && accounts.map((account) => (
                  <option key={account._id} value={account._id}>
                    {account.name} (₹{account.balance.toLocaleString('en-IN')})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                To Account
              </label>
              <select
                name="toAccountId"
                required
                value={formData.toAccountId}
                onChange={handleChange}
                disabled={!hasEnoughAccounts}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
              >
                <option value="">Select account</option>
                {accounts && accounts.filter(a => a._id !== formData.fromAccountId).map((account) => (
                  <option key={account._id} value={account._id}>
                    {account.name} (₹{account.balance.toLocaleString('en-IN')})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Amount (₹)
              </label>
              <input
                type="number"
                name="amount"
                required
                min="1"
                step="0.01"
                value={formData.amount}
                onChange={handleChange}
                disabled={!hasEnoughAccounts}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                placeholder="0.00"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Date & Time (IST)
              </label>
              <input
                type="datetime-local"
                name="date"
                required
                value={formData.date}
                onChange={handleChange}
                disabled={!hasEnoughAccounts}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <input
                type="text"
                name="description"
                required
                value={formData.description}
                onChange={handleChange}
                disabled={!hasEnoughAccounts}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                placeholder="Transfer description..."
                maxLength="100"
              />
            </div>

            <div className="flex space-x-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 py-2 px-4 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 font-medium"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading || !hasEnoughAccounts}
                className="flex-1 py-2 px-4 rounded-md text-white font-medium bg-purple-500 hover:bg-purple-600 disabled:opacity-50"
              >
                {loading ? 'Transferring...' : 'Transfer'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default TransferModal;
