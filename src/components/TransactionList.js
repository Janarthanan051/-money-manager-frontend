import React from 'react';

function TransactionList({ transactions, onEdit, onDelete }) {
  const categoryIcons = {
    fuel: '⛽',
    food: '🍔',
    movie: '🎬',
    medical: '🏥',
    loan: '💳',
    salary: '💰',
    business: '💼',
    investment: '📈',
    others: '📦',
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      timeZone: 'Asia/Kolkata',
    });
  };

  const formatAmount = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const canEdit = (createdAt) => {
    const hoursPassed = (Date.now() - new Date(createdAt)) / (1000 * 60 * 60);
    return hoursPassed <= 12;
  };

  if (transactions.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="text-6xl mb-4 animate-bounce">💸</div>
        <p className="text-xl text-gray-500 font-medium">No transactions found</p>
        <p className="text-sm text-gray-400 mt-2">Add your first transaction to get started!</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {transactions.map((transaction, index) => (
        <div
          key={transaction._id}
          className="bg-white/80 backdrop-blur-sm rounded-xl shadow-sm hover:shadow-lg p-4 transition-all duration-300 transform hover:-translate-x-1 border border-gray-100 group"
          style={{ animationDelay: `${index * 50}ms` }}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              {/* Category Icon */}
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl transition-transform group-hover:scale-110 ${
                transaction.type === 'income' 
                  ? 'bg-gradient-to-br from-emerald-100 to-teal-100' 
                  : 'bg-gradient-to-br from-rose-100 to-pink-100'
              }`}>
                {categoryIcons[transaction.category] || '📦'}
              </div>
              
              <div className="flex-1">
                <div className="flex items-center space-x-2 flex-wrap gap-1">
                  <span
                    className={`px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                      transaction.type === 'income'
                        ? 'bg-emerald-100 text-emerald-700'
                        : 'bg-rose-100 text-rose-700'
                    }`}
                  >
                    {transaction.type === 'income' ? '↑' : '↓'} {transaction.type}
                  </span>
                  <span className="px-2.5 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-medium">
                    {transaction.category}
                  </span>
                  <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                    transaction.division === 'office' 
                      ? 'bg-blue-100 text-blue-700' 
                      : 'bg-purple-100 text-purple-700'
                  }`}>
                    {transaction.division === 'office' ? '🏢' : '👤'} {transaction.division}
                  </span>
                </div>
                <p className="text-gray-800 font-medium mt-1.5">{transaction.description}</p>
                <p className="text-gray-400 text-sm mt-0.5 flex items-center space-x-1">
                  <span>🕐</span>
                  <span>{formatDate(transaction.date)}</span>
                </p>
              </div>
            </div>
            
            <div className="text-right ml-4">
              <p
                className={`text-2xl font-bold ${
                  transaction.type === 'income' ? 'text-emerald-600' : 'text-rose-600'
                }`}
              >
                {transaction.type === 'income' ? '+' : '-'}
                {formatAmount(transaction.amount)}
              </p>
              <div className="flex space-x-2 mt-2 justify-end opacity-0 group-hover:opacity-100 transition-opacity">
                {canEdit(transaction.createdAt) && (
                  <button
                    onClick={() => onEdit(transaction)}
                    className="px-3 py-1 text-blue-600 hover:bg-blue-50 rounded-lg text-sm font-medium transition-colors flex items-center space-x-1"
                  >
                    <span>✏️</span>
                    <span>Edit</span>
                  </button>
                )}
                <button
                  onClick={() => onDelete(transaction._id)}
                  className="px-3 py-1 text-red-600 hover:bg-red-50 rounded-lg text-sm font-medium transition-colors flex items-center space-x-1"
                >
                  <span>🗑️</span>
                  <span>Delete</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default TransactionList;
