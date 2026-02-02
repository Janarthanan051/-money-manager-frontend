import React, { useState, useEffect } from 'react';
import { transactionService } from '../services/transactionService';
import { getIndianDateTime } from '../utils/helpers';

function AddTransactionModal({ isOpen, onClose, onSuccess, accounts = [], defaultType = 'income' }) {
  const [activeTab, setActiveTab] = useState(defaultType);
  const [formData, setFormData] = useState({
    amount: '',
    category: '',
    division: 'personal',
    description: '',
    date: getIndianDateTime(),
    accountId: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Update active tab when defaultType changes
  useEffect(() => {
    if (isOpen) {
      setActiveTab(defaultType);
      // Reset form with fresh Indian time
      setFormData(prev => ({
        ...prev,
        date: getIndianDateTime(),
      }));
    }
  }, [defaultType, isOpen]);

  const categories = {
    income: ['salary', 'business', 'investment', 'others'],
    expense: ['fuel', 'food', 'movie', 'medical', 'loan', 'others'],
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await transactionService.addTransaction({
        ...formData,
        amount: parseFloat(formData.amount),
        type: activeTab,
      });
      
      // Reset form
      setFormData({
        amount: '',
        category: '',
        division: 'personal',
        description: '',
        date: getIndianDateTime(),
        accountId: '',
      });
      
      onSuccess();
      onClose();
    } catch (err) {
      setError(err.response?.data?.message || err.response?.data?.errors?.[0]?.msg || 'Failed to add transaction');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Add Transaction</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 text-2xl"
            >
              ×
            </button>
          </div>

          {/* Tabs */}
          <div className="flex space-x-2 mb-6">
            <button
              onClick={() => setActiveTab('income')}
              className={`flex-1 py-2 px-4 rounded-md font-medium transition-colors ${
                activeTab === 'income'
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Income
            </button>
            <button
              onClick={() => setActiveTab('expense')}
              className={`flex-1 py-2 px-4 rounded-md font-medium transition-colors ${
                activeTab === 'expense'
                  ? 'bg-red-500 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Expense
            </button>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Amount (₹)
              </label>
              <input
                type="number"
                name="amount"
                required
                min="0"
                step="0.01"
                value={formData.amount}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="0.00"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category
              </label>
              <select
                name="category"
                required
                value={formData.category}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select category</option>
                {categories[activeTab].map((cat) => (
                  <option key={cat} value={cat}>
                    {cat.charAt(0).toUpperCase() + cat.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Division
              </label>
              <div className="flex space-x-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="division"
                    value="personal"
                    checked={formData.division === 'personal'}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  Personal
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="division"
                    value="office"
                    checked={formData.division === 'office'}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  Office
                </label>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Date & Time
              </label>
              <input
                type="datetime-local"
                name="date"
                required
                value={formData.date}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Brief description..."
                maxLength="100"
              />
            </div>
{accounts && accounts.length > 0 && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Account (Optional)
                </label>
                <select
                  name="accountId"
                  value={formData.accountId}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">No account</option>
                  {accounts.map((account) => (
                    <option key={account._id} value={account._id}>
                      {account.name} (₹{account.balance.toLocaleString('en-IN')})
                    </option>
                  ))}
                </select>
              </div>
            )}

            
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
                disabled={loading}
                className={`flex-1 py-2 px-4 rounded-md text-white font-medium ${
                  activeTab === 'income'
                    ? 'bg-green-500 hover:bg-green-600'
                    : 'bg-red-500 hover:bg-red-600'
                } disabled:opacity-50`}
              >
                {loading ? 'Adding...' : 'Add Transaction'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddTransactionModal;
