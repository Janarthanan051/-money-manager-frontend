import React, { useState, useEffect } from 'react';
import { transactionService } from '../services/transactionService';
import { getIndianDateTime } from '../utils/helpers';

function EditTransactionModal({ isOpen, onClose, onSuccess, transaction, accounts = [] }) {
  const [formData, setFormData] = useState({
    amount: '',
    category: '',
    division: 'personal',
    description: '',
    date: getIndianDateTime(),
    type: 'expense',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const categories = {
    income: ['salary', 'business', 'investment', 'others'],
    expense: ['fuel', 'food', 'movie', 'medical', 'loan', 'others'],
    transfer: ['transfer'],
  };

  // Check if transaction is a transfer (transfers can't be fully edited)
  const isTransfer = transaction?.type === 'transfer';

  useEffect(() => {
    if (transaction) {
      setFormData({
        amount: transaction.amount || '',
        category: transaction.category || (transaction.type === 'transfer' ? 'transfer' : ''),
        division: transaction.division || 'personal',
        description: transaction.description || '',
        date: transaction.date ? new Date(transaction.date).toISOString().slice(0, 16) : new Date().toISOString().slice(0, 16),
        type: transaction.type || 'expense',
      });
    }
  }, [transaction]);

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
      await transactionService.editTransaction(transaction._id, {
        ...formData,
        amount: parseFloat(formData.amount),
      });
      onSuccess();
      onClose();
    } catch (err) {
      setError(err.response?.data?.message || err.response?.data?.errors?.[0]?.msg || 'Failed to update transaction');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen || !transaction) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Edit Transaction</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 text-2xl"
            >
              ×
            </button>
          </div>

          {/* Type indicator */}
          <div className="mb-4">
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
              formData.type === 'income' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
            }`}>
              {formData.type.toUpperCase()}
            </span>
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
                disabled={isTransfer}
                className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${isTransfer ? 'bg-gray-100 cursor-not-allowed' : ''}`}
                placeholder="0.00"
              />
            </div>

            {/* Category - hide for transfers */}
            {!isTransfer && (
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
                {categories[formData.type]?.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat.charAt(0).toUpperCase() + cat.slice(1)}
                  </option>
                ))}
              </select>
            </div>
            )}

            {isTransfer && (
              <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg text-yellow-700 text-sm">
                ⚠️ Transfer transactions have limited edit options. You can only update the description and date.
              </div>
            )}

            {/* Division - hide for transfers */}
            {!isTransfer && (
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
            )}

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
                className="flex-1 py-2 px-4 rounded-md text-white font-medium bg-blue-500 hover:bg-blue-600 disabled:opacity-50"
              >
                {loading ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditTransactionModal;
