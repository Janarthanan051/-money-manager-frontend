import { EDIT_TIME_LIMIT_HOURS, CATEGORY_ICONS, CATEGORY_LABELS } from './constants';

/**
 * Get current date/time in Indian Standard Time for datetime-local input
 * @returns {string} Date string in format YYYY-MM-DDTHH:MM
 */
export const getIndianDateTime = () => {
  const now = new Date();
  // Convert to IST (UTC+5:30)
  const istOffset = 5.5 * 60 * 60 * 1000;
  const utcTime = now.getTime() + (now.getTimezoneOffset() * 60 * 1000);
  const istTime = new Date(utcTime + istOffset);
  
  const year = istTime.getFullYear();
  const month = String(istTime.getMonth() + 1).padStart(2, '0');
  const day = String(istTime.getDate()).padStart(2, '0');
  const hours = String(istTime.getHours()).padStart(2, '0');
  const minutes = String(istTime.getMinutes()).padStart(2, '0');
  
  return `${year}-${month}-${day}T${hours}:${minutes}`;
};

/**
 * Format currency amount
 * @param {number} amount - The amount to format
 * @param {string} currency - Currency code (default: INR)
 * @returns {string} Formatted currency string
 */
export const formatCurrency = (amount, currency = 'INR') => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2
  }).format(amount);
};

/**
 * Format date to readable string in Indian format
 * @param {string|Date} date - Date to format
 * @param {object} options - Intl.DateTimeFormat options
 * @returns {string} Formatted date string
 */
export const formatDate = (date, options = {}) => {
  const defaultOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    timeZone: 'Asia/Kolkata'
  };
  return new Date(date).toLocaleDateString('en-IN', { ...defaultOptions, ...options });
};

/**
 * Format date with time in Indian format
 * @param {string|Date} date - Date to format
 * @returns {string} Formatted date and time string
 */
export const formatDateTime = (date) => {
  return new Date(date).toLocaleString('en-IN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'Asia/Kolkata'
  });
};

/**
 * Check if a transaction can be edited (within 12 hours)
 * @param {string|Date} createdAt - Transaction creation date
 * @returns {boolean} Whether the transaction can be edited
 */
export const canEditTransaction = (createdAt) => {
  const createdTime = new Date(createdAt).getTime();
  const now = Date.now();
  const hoursDiff = (now - createdTime) / (1000 * 60 * 60);
  return hoursDiff <= EDIT_TIME_LIMIT_HOURS;
};

/**
 * Get remaining edit time for a transaction
 * @param {string|Date} createdAt - Transaction creation date
 * @returns {object} Object with hours and minutes remaining
 */
export const getRemainingEditTime = (createdAt) => {
  const createdTime = new Date(createdAt).getTime();
  const now = Date.now();
  const hoursDiff = (now - createdTime) / (1000 * 60 * 60);
  const remainingHours = Math.max(0, EDIT_TIME_LIMIT_HOURS - hoursDiff);
  
  return {
    hours: Math.floor(remainingHours),
    minutes: Math.floor((remainingHours % 1) * 60),
    canEdit: remainingHours > 0
  };
};

/**
 * Get category icon
 * @param {string} category - Category name
 * @returns {string} Category emoji icon
 */
export const getCategoryIcon = (category) => {
  return CATEGORY_ICONS[category] || '📦';
};

/**
 * Get category label
 * @param {string} category - Category name
 * @returns {string} Category display label
 */
export const getCategoryLabel = (category) => {
  return CATEGORY_LABELS[category] || category;
};

/**
 * Calculate percentage
 * @param {number} value - The value
 * @param {number} total - The total
 * @returns {number} Percentage
 */
export const calculatePercentage = (value, total) => {
  if (total === 0) return 0;
  return ((value / total) * 100).toFixed(1);
};

/**
 * Get date range for a period
 * @param {string} period - Period type (weekly, monthly, yearly)
 * @returns {object} Object with startDate and endDate
 */
export const getDateRange = (period) => {
  const now = new Date();
  let startDate;
  
  switch (period) {
    case 'weekly':
      startDate = new Date(now);
      startDate.setDate(now.getDate() - 7);
      break;
    case 'monthly':
      startDate = new Date(now.getFullYear(), now.getMonth(), 1);
      break;
    case 'yearly':
      startDate = new Date(now.getFullYear(), 0, 1);
      break;
    default:
      startDate = new Date(now.getFullYear(), now.getMonth(), 1);
  }
  
  return {
    startDate: startDate.toISOString().split('T')[0],
    endDate: now.toISOString().split('T')[0]
  };
};

/**
 * Debounce function
 * @param {function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
 * @returns {function} Debounced function
 */
export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

/**
 * Generate unique ID
 * @returns {string} Unique ID
 */
export const generateId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

/**
 * Truncate text
 * @param {string} text - Text to truncate
 * @param {number} length - Max length
 * @returns {string} Truncated text
 */
export const truncateText = (text, length = 50) => {
  if (text.length <= length) return text;
  return text.substring(0, length) + '...';
};

/**
 * Validate email
 * @param {string} email - Email to validate
 * @returns {boolean} Whether email is valid
 */
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Get greeting based on time of day
 * @returns {string} Greeting message
 */
export const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good Morning';
  if (hour < 17) return 'Good Afternoon';
  return 'Good Evening';
};
