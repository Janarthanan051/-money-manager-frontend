import React from 'react';

function SummaryCard({ title, amount, type, icon, onClick }) {
  const getGradient = () => {
    if (type === 'income') return 'from-emerald-500 to-teal-500';
    if (type === 'expense') return 'from-rose-500 to-pink-500';
    return 'from-blue-500 to-indigo-500';
  };

  const getBgGradient = () => {
    if (type === 'income') return 'from-emerald-50 to-teal-50';
    if (type === 'expense') return 'from-rose-50 to-pink-50';
    return 'from-blue-50 to-indigo-50';
  };

  const getTextColor = () => {
    if (type === 'income') return 'text-emerald-600';
    if (type === 'expense') return 'text-rose-600';
    return 'text-blue-600';
  };

  const formatAmount = (amt) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amt);
  };

  return (
    <div className={`bg-gradient-to-br ${getBgGradient()} rounded-2xl shadow-md hover:shadow-xl p-6 transition-all duration-300 transform hover:-translate-y-1 border border-white/50 group`}>
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-gray-500 text-sm font-medium uppercase tracking-wider flex items-center space-x-1">
            <span>{type === 'income' ? '📈' : type === 'expense' ? '📉' : '💰'}</span>
            <span>{title}</span>
          </p>
          <p className={`text-3xl font-bold ${getTextColor()} mt-3 transition-transform group-hover:scale-105`}>
            {formatAmount(amount)}
          </p>
        </div>
        <button
          onClick={onClick}
          className={`bg-gradient-to-br ${getGradient()} p-4 rounded-2xl text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 hover:rotate-3`}
        >
          {icon}
        </button>
      </div>
    </div>
  );
}

export default SummaryCard;
