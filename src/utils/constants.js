// Transaction Categories
export const CATEGORIES = {
  FUEL: 'fuel',
  FOOD: 'food',
  MOVIE: 'movie',
  MEDICAL: 'medical',
  LOAN: 'loan',
  SALARY: 'salary',
  RENT: 'rent',
  UTILITIES: 'utilities',
  SHOPPING: 'shopping',
  ENTERTAINMENT: 'entertainment',
  TRAVEL: 'travel',
  EDUCATION: 'education',
  OTHER: 'other'
};

// Category Display Names
export const CATEGORY_LABELS = {
  [CATEGORIES.FUEL]: 'Fuel',
  [CATEGORIES.FOOD]: 'Food',
  [CATEGORIES.MOVIE]: 'Movie',
  [CATEGORIES.MEDICAL]: 'Medical',
  [CATEGORIES.LOAN]: 'Loan',
  [CATEGORIES.SALARY]: 'Salary',
  [CATEGORIES.RENT]: 'Rent',
  [CATEGORIES.UTILITIES]: 'Utilities',
  [CATEGORIES.SHOPPING]: 'Shopping',
  [CATEGORIES.ENTERTAINMENT]: 'Entertainment',
  [CATEGORIES.TRAVEL]: 'Travel',
  [CATEGORIES.EDUCATION]: 'Education',
  [CATEGORIES.OTHER]: 'Other'
};

// Category Icons (emoji)
export const CATEGORY_ICONS = {
  [CATEGORIES.FUEL]: '⛽',
  [CATEGORIES.FOOD]: '🍔',
  [CATEGORIES.MOVIE]: '🎬',
  [CATEGORIES.MEDICAL]: '🏥',
  [CATEGORIES.LOAN]: '💳',
  [CATEGORIES.SALARY]: '💰',
  [CATEGORIES.RENT]: '🏠',
  [CATEGORIES.UTILITIES]: '💡',
  [CATEGORIES.SHOPPING]: '🛒',
  [CATEGORIES.ENTERTAINMENT]: '🎮',
  [CATEGORIES.TRAVEL]: '✈️',
  [CATEGORIES.EDUCATION]: '📚',
  [CATEGORIES.OTHER]: '📦'
};

// Transaction Types
export const TRANSACTION_TYPES = {
  INCOME: 'income',
  EXPENSE: 'expense'
};

// Division Types
export const DIVISIONS = {
  PERSONAL: 'personal',
  OFFICE: 'office'
};

// Summary Periods
export const PERIODS = {
  WEEKLY: 'weekly',
  MONTHLY: 'monthly',
  YEARLY: 'yearly'
};

// Edit Time Limit (in hours)
export const EDIT_TIME_LIMIT_HOURS = 12;

// API Endpoints
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    ME: '/auth/me'
  },
  TRANSACTIONS: {
    BASE: '/transactions',
    SUMMARY: '/transactions/summary'
  },
  ACCOUNTS: {
    BASE: '/accounts',
    TRANSFER: '/accounts/transfer'
  }
};

// Local Storage Keys
export const STORAGE_KEYS = {
  TOKEN: 'token',
  USER: 'user',
  THEME: 'theme'
};

// Pagination
export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 10,
  OPTIONS: [10, 25, 50, 100]
};
