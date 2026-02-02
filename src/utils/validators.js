/**
 * Validation utility functions for form inputs
 */

/**
 * Validate required field
 * @param {string} value - Value to validate
 * @param {string} fieldName - Field name for error message
 * @returns {string|null} Error message or null
 */
export const validateRequired = (value, fieldName) => {
  if (!value || value.trim() === '') {
    return `${fieldName} is required`;
  }
  return null;
};

/**
 * Validate email format
 * @param {string} email - Email to validate
 * @returns {string|null} Error message or null
 */
export const validateEmail = (email) => {
  if (!email) {
    return 'Email is required';
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return 'Please enter a valid email address';
  }
  return null;
};

/**
 * Validate password strength
 * @param {string} password - Password to validate
 * @returns {string|null} Error message or null
 */
export const validatePassword = (password) => {
  if (!password) {
    return 'Password is required';
  }
  if (password.length < 6) {
    return 'Password must be at least 6 characters';
  }
  return null;
};

/**
 * Validate password confirmation
 * @param {string} password - Original password
 * @param {string} confirmPassword - Confirmation password
 * @returns {string|null} Error message or null
 */
export const validateConfirmPassword = (password, confirmPassword) => {
  if (!confirmPassword) {
    return 'Please confirm your password';
  }
  if (password !== confirmPassword) {
    return 'Passwords do not match';
  }
  return null;
};

/**
 * Validate positive number
 * @param {number|string} value - Value to validate
 * @param {string} fieldName - Field name for error message
 * @returns {string|null} Error message or null
 */
export const validatePositiveNumber = (value, fieldName) => {
  const num = parseFloat(value);
  if (isNaN(num)) {
    return `${fieldName} must be a valid number`;
  }
  if (num <= 0) {
    return `${fieldName} must be greater than 0`;
  }
  return null;
};

/**
 * Validate transaction form
 * @param {object} data - Transaction data
 * @returns {object} Object with isValid and errors
 */
export const validateTransaction = (data) => {
  const errors = {};
  
  const amountError = validatePositiveNumber(data.amount, 'Amount');
  if (amountError) errors.amount = amountError;
  
  const categoryError = validateRequired(data.category, 'Category');
  if (categoryError) errors.category = categoryError;
  
  const typeError = validateRequired(data.type, 'Transaction type');
  if (typeError) errors.type = typeError;
  
  const divisionError = validateRequired(data.division, 'Division');
  if (divisionError) errors.division = divisionError;
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

/**
 * Validate login form
 * @param {object} data - Login data
 * @returns {object} Object with isValid and errors
 */
export const validateLogin = (data) => {
  const errors = {};
  
  const emailError = validateEmail(data.email);
  if (emailError) errors.email = emailError;
  
  const passwordError = validateRequired(data.password, 'Password');
  if (passwordError) errors.password = passwordError;
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

/**
 * Validate registration form
 * @param {object} data - Registration data
 * @returns {object} Object with isValid and errors
 */
export const validateRegister = (data) => {
  const errors = {};
  
  const nameError = validateRequired(data.name, 'Name');
  if (nameError) errors.name = nameError;
  
  const emailError = validateEmail(data.email);
  if (emailError) errors.email = emailError;
  
  const passwordError = validatePassword(data.password);
  if (passwordError) errors.password = passwordError;
  
  if (data.confirmPassword !== undefined) {
    const confirmError = validateConfirmPassword(data.password, data.confirmPassword);
    if (confirmError) errors.confirmPassword = confirmError;
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

/**
 * Validate transfer form
 * @param {object} data - Transfer data
 * @returns {object} Object with isValid and errors
 */
export const validateTransfer = (data) => {
  const errors = {};
  
  const fromAccountError = validateRequired(data.fromAccount, 'Source account');
  if (fromAccountError) errors.fromAccount = fromAccountError;
  
  const toAccountError = validateRequired(data.toAccount, 'Destination account');
  if (toAccountError) errors.toAccount = toAccountError;
  
  if (data.fromAccount && data.toAccount && data.fromAccount === data.toAccount) {
    errors.toAccount = 'Cannot transfer to the same account';
  }
  
  const amountError = validatePositiveNumber(data.amount, 'Amount');
  if (amountError) errors.amount = amountError;
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

/**
 * Validate account form
 * @param {object} data - Account data
 * @returns {object} Object with isValid and errors
 */
export const validateAccount = (data) => {
  const errors = {};
  
  const nameError = validateRequired(data.name, 'Account name');
  if (nameError) errors.name = nameError;
  
  const typeError = validateRequired(data.type, 'Account type');
  if (typeError) errors.type = typeError;
  
  if (data.initialBalance !== undefined && data.initialBalance !== '') {
    const num = parseFloat(data.initialBalance);
    if (isNaN(num)) {
      errors.initialBalance = 'Initial balance must be a valid number';
    } else if (num < 0) {
      errors.initialBalance = 'Initial balance cannot be negative';
    }
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};
