import React, { useState } from 'react';

function Filters({ filters, onFilterChange }) {
  const [dateRange, setDateRange] = useState('');
  const [showCustomDates, setShowCustomDates] = useState(false);
  const [customStartDate, setCustomStartDate] = useState('');
  const [customEndDate, setCustomEndDate] = useState('');

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

  const handleTypeChange = (e) => {
    const value = e.target.value;
    onFilterChange('type', value || undefined);
  };

  const handleCategoryChange = (e) => {
    const value = e.target.value;
    onFilterChange('category', value || undefined);
  };

  const handleDivisionChange = (e) => {
    const value = e.target.value;
    onFilterChange('division', value || undefined);
  };

  const handleDateRangeChange = (e) => {
    const value = e.target.value;
    setDateRange(value);
    const now = new Date();
    
    if (value === 'custom') {
      setShowCustomDates(true);
      return;
    }
    
    setShowCustomDates(false);
    
    if (!value) {
      onFilterChange('startDate', undefined);
      onFilterChange('endDate', undefined);
      return;
    }
    
    let startDate = '';
    
    if (value === 'week') {
      const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      startDate = weekAgo.toISOString().split('T')[0];
    } else if (value === 'month') {
      const monthAgo = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());
      startDate = monthAgo.toISOString().split('T')[0];
    } else if (value === 'year') {
      const yearAgo = new Date(now.getFullYear() - 1, now.getMonth(), now.getDate());
      startDate = yearAgo.toISOString().split('T')[0];
    }
    
    onFilterChange('startDate', startDate);
    onFilterChange('endDate', now.toISOString().split('T')[0]);
  };

  const handleCustomDateApply = () => {
    if (customStartDate) {
      onFilterChange('startDate', customStartDate);
    }
    if (customEndDate) {
      onFilterChange('endDate', customEndDate);
    }
  };

  const clearAllFilters = () => {
    setDateRange('');
    setShowCustomDates(false);
    setCustomStartDate('');
    setCustomEndDate('');
    onFilterChange('type', undefined);
    onFilterChange('category', undefined);
    onFilterChange('division', undefined);
    onFilterChange('startDate', undefined);
    onFilterChange('endDate', undefined);
  };

  const hasActiveFilters = filters.type || filters.category || filters.division || filters.startDate || filters.endDate;

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-5 mb-6 border border-gray-100">
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-lg font-bold text-gray-800 flex items-center">
          <span className="mr-2 text-xl">🔍</span>
          Filters
          {hasActiveFilters && (
            <span className="ml-2 px-2 py-0.5 bg-blue-100 text-blue-600 text-xs rounded-full font-medium animate-pulse">
              Active
            </span>
          )}
        </h3>
        <button
          onClick={clearAllFilters}
          className="text-sm text-blue-600 hover:text-blue-800 font-medium flex items-center px-3 py-1.5 hover:bg-blue-50 rounded-lg transition-colors"
        >
          <span className="mr-1">✕</span>
          Clear All
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="group">
          <label className="block text-sm font-medium text-gray-600 mb-2 flex items-center">
            <span className="mr-1.5">📊</span>
            Type
          </label>
          <select
            value={filters.type || ''}
            onChange={handleTypeChange}
            className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/50 hover:bg-white transition-colors cursor-pointer"
          >
            <option value="">All Types</option>
            <option value="income">📈 Income</option>
            <option value="expense">📉 Expense</option>
          </select>
        </div>

        <div className="group">
          <label className="block text-sm font-medium text-gray-600 mb-2 flex items-center">
            <span className="mr-1.5">📁</span>
            Category
          </label>
          <select
            value={filters.category || ''}
            onChange={handleCategoryChange}
            className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/50 hover:bg-white transition-colors cursor-pointer"
          >
            <option value="">All Categories</option>
            <option value="fuel">{categoryIcons.fuel} Fuel</option>
            <option value="food">{categoryIcons.food} Food</option>
            <option value="movie">{categoryIcons.movie} Movie</option>
            <option value="medical">{categoryIcons.medical} Medical</option>
            <option value="loan">{categoryIcons.loan} Loan</option>
            <option value="salary">{categoryIcons.salary} Salary</option>
            <option value="business">{categoryIcons.business} Business</option>
            <option value="investment">{categoryIcons.investment} Investment</option>
            <option value="others">{categoryIcons.others} Others</option>
          </select>
        </div>

        <div className="group">
          <label className="block text-sm font-medium text-gray-600 mb-2 flex items-center">
            <span className="mr-1.5">🏷️</span>
            Division
          </label>
          <select
            value={filters.division || ''}
            onChange={handleDivisionChange}
            className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/50 hover:bg-white transition-colors cursor-pointer"
          >
            <option value="">All Divisions</option>
            <option value="personal">👤 Personal</option>
            <option value="office">🏢 Office</option>
          </select>
        </div>

        <div className="group">
          <label className="block text-sm font-medium text-gray-600 mb-2 flex items-center">
            <span className="mr-1.5">📅</span>
            Date Range
          </label>
          <select
            value={dateRange}
            onChange={handleDateRangeChange}
            className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/50 hover:bg-white transition-colors cursor-pointer"
          >
            <option value="">All Time</option>
            <option value="week">📆 Last Week</option>
            <option value="month">📆 Last Month</option>
            <option value="year">📆 Last Year</option>
            <option value="custom">⚙️ Custom Range</option>
          </select>
        </div>
      </div>

      {/* Custom Date Range Picker */}
      {showCustomDates && (
        <div className="mt-5 p-5 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100 animate-fadeIn">
          <h4 className="text-sm font-semibold text-blue-800 mb-4 flex items-center">
            <span className="mr-2">🗓️</span>
            Select Custom Date Range
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-medium text-blue-600 mb-2">Start Date</label>
              <input
                type="date"
                value={customStartDate}
                onChange={(e) => setCustomStartDate(e.target.value)}
                className="w-full px-4 py-2.5 border border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-blue-600 mb-2">End Date</label>
              <input
                type="date"
                value={customEndDate}
                onChange={(e) => setCustomEndDate(e.target.value)}
                className="w-full px-4 py-2.5 border border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              />
            </div>
            <div className="flex items-end">
              <button
                onClick={handleCustomDateApply}
                className="w-full px-4 py-2.5 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl hover:from-blue-600 hover:to-indigo-700 font-semibold shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all flex items-center justify-center"
              >
                <span className="mr-2">✓</span>
                Apply Filter
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Filters;
