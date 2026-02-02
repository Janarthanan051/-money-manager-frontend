import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/authService';
import { transactionService } from '../services/transactionService';
import { accountService } from '../services/accountService';
import SummaryCard from '../components/SummaryCard';
import AddTransactionModal from '../components/AddTransactionModal';
import EditTransactionModal from '../components/EditTransactionModal';
import TransferModal from '../components/TransferModal';
import CreateAccountModal from '../components/CreateAccountModal';
import TransactionList from '../components/TransactionList';
import Filters from '../components/Filters';
import CategorySummary from '../components/CategorySummary';

function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [summary, setSummary] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [accounts, setAccounts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isTransferModalOpen, setIsTransferModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isCreateAccountModalOpen, setIsCreateAccountModalOpen] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState(null);
  const [defaultTransactionType, setDefaultTransactionType] = useState('income');
  const [filters, setFilters] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authService.isAuthenticated()) {
      navigate('/login');
      return;
    }

    const currentUser = authService.getCurrentUser();
    setUser(currentUser);
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigate]);

  const loadData = async () => {
    try {
      setLoading(true);
      const [summaryData, transactionsData, accountsData] = await Promise.all([
        transactionService.getSummary(),
        transactionService.getTransactions(filters),
        accountService.getAccounts(),
      ]);
      setSummary(summaryData);
      setTransactions(transactionsData.transactions);
      setAccounts(accountsData.accounts || []);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      loadData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters]);

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleLogout = () => {
    authService.logout();
    navigate('/login');
  };

  const handleDeleteTransaction = async (id) => {
    if (window.confirm('Are you sure you want to delete this transaction?')) {
      try {
        await transactionService.deleteTransaction(id);
        loadData();
      } catch (error) {
        alert('Failed to delete transaction');
      }
    }
  };

  const handleEditTransaction = (transaction) => {
    setEditingTransaction(transaction);
    setIsEditModalOpen(true);
  };

  const openAddModal = (type = 'income') => {
    setDefaultTransactionType(type);
    setIsModalOpen(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-center">
          <div className="relative">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-200 border-t-blue-600 mx-auto"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-2xl">💰</span>
            </div>
          </div>
          <p className="mt-4 text-gray-600 font-medium animate-pulse">Loading your finances...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md shadow-lg sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg transform hover:scale-105 transition-transform">
                <span className="text-white text-xl">💸</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Money Manager</h1>
                <p className="text-sm text-gray-500">Welcome back, <span className="font-medium text-gray-700">{user?.name}</span>! 👋</p>
              </div>
            </div>
            <div className="flex space-x-3">
              <button
                onClick={() => setIsCreateAccountModalOpen(true)}
                className="group px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-xl hover:from-emerald-600 hover:to-teal-600 transition-all duration-300 shadow-md hover:shadow-lg flex items-center space-x-2 transform hover:-translate-y-0.5"
              >
                <span>🏦</span>
                <span>Add Account</span>
              </button>
              <button
                onClick={() => setIsTransferModalOpen(true)}
                className="group px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all duration-300 shadow-md hover:shadow-lg flex items-center space-x-2 transform hover:-translate-y-0.5"
              >
                <span>🔄</span>
                <span>Transfer</span>
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-xl hover:bg-red-50 hover:text-red-600 transition-all duration-300 flex items-center space-x-2"
              >
                <span>🚪</span>
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fadeIn">
        {/* Accounts Section */}
        {accounts && accounts.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center space-x-2">
              <span className="text-2xl">🏦</span>
              <span>Your Accounts</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {accounts.map((account, index) => (
                <div 
                  key={account._id} 
                  className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-md hover:shadow-xl p-5 transform hover:-translate-y-1 transition-all duration-300 border border-gray-100"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-gray-500 uppercase tracking-wider font-medium">{account.type}</p>
                    <span className="text-lg">{account.type === 'savings' ? '💰' : account.type === 'checking' ? '🏧' : account.type === 'cash' ? '💵' : account.type === 'credit' ? '💳' : account.type === 'investment' ? '📈' : '🏦'}</span>
                  </div>
                  <p className="text-lg font-semibold text-gray-800 mt-2">{account.name}</p>
                  <p className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mt-2">
                    ₹{account.balance.toLocaleString('en-IN')}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Summary Cards */}
        {summary && (
          <>
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Overall Summary</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <SummaryCard
                  title="Total Income"
                  amount={summary.total.income}
                  type="income"
                  onClick={() => openAddModal('income')}
                  icon={
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                  }
                />
                <SummaryCard
                  title="Total Expenses"
                  amount={summary.total.expense}
                  type="expense"
                  onClick={() => openAddModal('expense')}
                  icon={
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                    </svg>
                  }
                />
                <SummaryCard
                  title="Balance"
                  amount={summary.total.balance}
                  type="balance"
                  onClick={() => setIsCreateAccountModalOpen(true)}
                  icon={
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                    </svg>
                  }
                />
              </div>
            </div>

            {/* Period Summaries */}
            <div className="mb-8 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-violet-50 to-purple-100 rounded-2xl shadow-lg p-6 border border-purple-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group">
                <h3 className="text-lg font-bold text-purple-800 mb-4 flex items-center">
                  <span className="mr-2 text-xl group-hover:animate-bounce">📅</span>
                  Weekly Summary
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-2 bg-white/50 rounded-lg">
                    <span className="text-gray-600 flex items-center"><span className="mr-2">📈</span>Income:</span>
                    <span className="text-emerald-600 font-bold">₹{summary.weekly.income.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-white/50 rounded-lg">
                    <span className="text-gray-600 flex items-center"><span className="mr-2">📉</span>Expense:</span>
                    <span className="text-rose-600 font-bold">₹{summary.weekly.expense.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gradient-to-r from-purple-500 to-violet-600 rounded-xl text-white">
                    <span className="font-medium flex items-center"><span className="mr-2">💰</span>Balance:</span>
                    <span className="font-bold text-lg">₹{summary.weekly.balance.toLocaleString('en-IN')}</span>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-sky-50 to-blue-100 rounded-2xl shadow-lg p-6 border border-blue-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group">
                <h3 className="text-lg font-bold text-blue-800 mb-4 flex items-center">
                  <span className="mr-2 text-xl group-hover:animate-bounce">📆</span>
                  Monthly Summary
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-2 bg-white/50 rounded-lg">
                    <span className="text-gray-600 flex items-center"><span className="mr-2">📈</span>Income:</span>
                    <span className="text-emerald-600 font-bold">₹{summary.monthly.income.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-white/50 rounded-lg">
                    <span className="text-gray-600 flex items-center"><span className="mr-2">📉</span>Expense:</span>
                    <span className="text-rose-600 font-bold">₹{summary.monthly.expense.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gradient-to-r from-blue-500 to-sky-600 rounded-xl text-white">
                    <span className="font-medium flex items-center"><span className="mr-2">💰</span>Balance:</span>
                    <span className="font-bold text-lg">₹{summary.monthly.balance.toLocaleString('en-IN')}</span>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-amber-50 to-orange-100 rounded-2xl shadow-lg p-6 border border-orange-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group">
                <h3 className="text-lg font-bold text-orange-800 mb-4 flex items-center">
                  <span className="mr-2 text-xl group-hover:animate-bounce">🗓️</span>
                  Yearly Summary
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-2 bg-white/50 rounded-lg">
                    <span className="text-gray-600 flex items-center"><span className="mr-2">📈</span>Income:</span>
                    <span className="text-emerald-600 font-bold">₹{summary.yearly.income.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-white/50 rounded-lg">
                    <span className="text-gray-600 flex items-center"><span className="mr-2">📉</span>Expense:</span>
                    <span className="text-rose-600 font-bold">₹{summary.yearly.expense.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gradient-to-r from-orange-500 to-amber-600 rounded-xl text-white">
                    <span className="font-medium flex items-center"><span className="mr-2">💰</span>Balance:</span>
                    <span className="font-bold text-lg">₹{summary.yearly.balance.toLocaleString('en-IN')}</span>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {/* Filters */}
        <Filters filters={filters} onFilterChange={handleFilterChange} />

        {/* Category Summary */}
        <CategorySummary transactions={transactions} />

        {/* Transactions */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-800 flex items-center">
              <span className="mr-2 text-2xl">📝</span>
              Transaction History
            </h2>
            <span className="px-4 py-1.5 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-full text-sm font-semibold shadow">
              {transactions.length} transactions
            </span>
          </div>
          <TransactionList
            transactions={transactions}
            onEdit={handleEditTransaction}
            onDelete={handleDeleteTransaction}
          />
        </div>
      </main>

      {/* Floating Add Button */}
      <button
        onClick={() => openAddModal('income')}
        className="fixed bottom-8 right-8 w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl shadow-xl hover:shadow-2xl flex items-center justify-center text-3xl hover:scale-110 transition-all duration-300 animate-float group"
      >
        +
      </button>

      {/* Add Transaction Modal */}
      <AddTransactionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={loadData}
        accounts={accounts}
        defaultType={defaultTransactionType}
      />

      {/* Edit Transaction Modal */}
      <EditTransactionModal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setEditingTransaction(null);
        }}
        onSuccess={loadData}
        transaction={editingTransaction}
        accounts={accounts}
      />

      {/* Transfer Modal */}
      <TransferModal
        isOpen={isTransferModalOpen}
        onClose={() => setIsTransferModalOpen(false)}
        accounts={accounts}
        onSuccess={loadData}
      />

      {/* Create Account Modal */}
      <CreateAccountModal
        isOpen={isCreateAccountModalOpen}
        onClose={() => setIsCreateAccountModalOpen(false)}
        onSuccess={loadData}
      />
    </div>
  );
}

export default Dashboard;
