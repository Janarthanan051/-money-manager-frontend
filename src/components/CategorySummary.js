import React from 'react';

function CategorySummary({ transactions }) {
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

  const categoryColors = {
    fuel: { bg: 'from-amber-400 to-orange-500', light: 'bg-amber-100' },
    food: { bg: 'from-yellow-400 to-red-500', light: 'bg-yellow-100' },
    movie: { bg: 'from-purple-400 to-pink-500', light: 'bg-purple-100' },
    medical: { bg: 'from-blue-400 to-cyan-500', light: 'bg-blue-100' },
    loan: { bg: 'from-slate-400 to-gray-600', light: 'bg-slate-100' },
    salary: { bg: 'from-emerald-400 to-teal-500', light: 'bg-emerald-100' },
    business: { bg: 'from-indigo-400 to-blue-500', light: 'bg-indigo-100' },
    investment: { bg: 'from-green-400 to-emerald-500', light: 'bg-green-100' },
    others: { bg: 'from-gray-400 to-slate-500', light: 'bg-gray-100' },
  };

  // Calculate category-wise summary
  const getCategorySummary = () => {
    const summary = {};
    
    transactions.forEach((t) => {
      const cat = t.category || 'others';
      if (!summary[cat]) {
        summary[cat] = { income: 0, expense: 0, count: 0 };
      }
      if (t.type === 'income') {
        summary[cat].income += t.amount;
      } else if (t.type === 'expense') {
        summary[cat].expense += t.amount;
      }
      summary[cat].count += 1;
    });
    
    return summary;
  };

  const categorySummary = getCategorySummary();
  const categories = Object.keys(categorySummary);

  if (categories.length === 0) {
    return null;
  }

  // Calculate totals for percentages
  const totalExpense = Object.values(categorySummary).reduce((sum, c) => sum + c.expense, 0);
  const totalIncome = Object.values(categorySummary).reduce((sum, c) => sum + c.income, 0);

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 mb-6 border border-gray-100">
      <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
        <span className="mr-2 text-2xl">📊</span>
        Category Summary
      </h3>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Expense by Category */}
        <div className="bg-gradient-to-br from-rose-50 to-pink-50 rounded-xl p-5">
          <h4 className="text-md font-semibold text-rose-700 mb-4 flex items-center">
            <span className="mr-2">📉</span>
            Expenses by Category
          </h4>
          {totalExpense > 0 ? (
            <div className="space-y-4">
              {categories
                .filter((cat) => categorySummary[cat].expense > 0)
                .sort((a, b) => categorySummary[b].expense - categorySummary[a].expense)
                .map((cat, index) => {
                  const amount = categorySummary[cat].expense;
                  const percentage = ((amount / totalExpense) * 100).toFixed(1);
                  const colors = categoryColors[cat] || categoryColors.others;
                  return (
                    <div 
                      key={cat} 
                      className="relative group hover:scale-[1.02] transition-transform"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-700 flex items-center">
                          <span className={`w-8 h-8 rounded-lg ${colors.light} flex items-center justify-center mr-2 text-lg group-hover:scale-110 transition-transform`}>
                            {categoryIcons[cat] || '📦'}
                          </span>
                          {cat.charAt(0).toUpperCase() + cat.slice(1)}
                        </span>
                        <span className="text-sm font-bold text-rose-600">
                          ₹{amount.toLocaleString('en-IN')}
                          <span className="text-xs font-normal text-rose-400 ml-1">({percentage}%)</span>
                        </span>
                      </div>
                      <div className="w-full bg-rose-100 rounded-full h-2.5 overflow-hidden">
                        <div
                          className="bg-gradient-to-r from-rose-400 to-pink-500 h-2.5 rounded-full transition-all duration-500 ease-out"
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  );
                })}
            </div>
          ) : (
            <div className="text-center py-6">
              <span className="text-3xl">🎉</span>
              <p className="text-rose-400 text-sm mt-2">No expenses recorded</p>
            </div>
          )}
        </div>

        {/* Income by Category */}
        <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl p-5">
          <h4 className="text-md font-semibold text-emerald-700 mb-4 flex items-center">
            <span className="mr-2">📈</span>
            Income by Category
          </h4>
          {totalIncome > 0 ? (
            <div className="space-y-4">
              {categories
                .filter((cat) => categorySummary[cat].income > 0)
                .sort((a, b) => categorySummary[b].income - categorySummary[a].income)
                .map((cat, index) => {
                  const amount = categorySummary[cat].income;
                  const percentage = ((amount / totalIncome) * 100).toFixed(1);
                  const colors = categoryColors[cat] || categoryColors.others;
                  return (
                    <div 
                      key={cat} 
                      className="relative group hover:scale-[1.02] transition-transform"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-700 flex items-center">
                          <span className={`w-8 h-8 rounded-lg ${colors.light} flex items-center justify-center mr-2 text-lg group-hover:scale-110 transition-transform`}>
                            {categoryIcons[cat] || '📦'}
                          </span>
                          {cat.charAt(0).toUpperCase() + cat.slice(1)}
                        </span>
                        <span className="text-sm font-bold text-emerald-600">
                          ₹{amount.toLocaleString('en-IN')}
                          <span className="text-xs font-normal text-emerald-400 ml-1">({percentage}%)</span>
                        </span>
                      </div>
                      <div className="w-full bg-emerald-100 rounded-full h-2.5 overflow-hidden">
                        <div
                          className="bg-gradient-to-r from-emerald-400 to-teal-500 h-2.5 rounded-full transition-all duration-500 ease-out"
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  );
                })}
            </div>
          ) : (
            <div className="text-center py-6">
              <span className="text-3xl">💤</span>
              <p className="text-emerald-400 text-sm mt-2">No income recorded</p>
            </div>
          )}
        </div>
      </div>

      {/* Transaction Count by Category */}
      <div className="mt-6 pt-5 border-t border-gray-200">
        <h4 className="text-md font-semibold text-gray-700 mb-4 flex items-center">
          <span className="mr-2">🔢</span>
          Transaction Count
        </h4>
        <div className="flex flex-wrap gap-3">
          {categories.map((cat, index) => {
            const colors = categoryColors[cat] || categoryColors.others;
            return (
              <span
                key={cat}
                className={`inline-flex items-center px-4 py-2 rounded-xl text-sm ${colors.light} text-gray-700 font-medium hover:scale-105 transition-transform cursor-default shadow-sm`}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <span className="mr-2 text-lg">{categoryIcons[cat] || '📦'}</span>
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
                <span className="ml-2 bg-white/60 px-2 py-0.5 rounded-full text-xs font-bold">
                  {categorySummary[cat].count}
                </span>
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default CategorySummary;
