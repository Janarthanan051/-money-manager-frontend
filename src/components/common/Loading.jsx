import React from 'react';

const Loading = ({ 
  size = 'md', 
  text = 'Loading...', 
  fullScreen = false,
  showText = true 
}) => {
  const sizes = {
    sm: 'h-6 w-6',
    md: 'h-10 w-10',
    lg: 'h-16 w-16',
    xl: 'h-24 w-24'
  };

  const spinner = (
    <div className="flex flex-col items-center justify-center">
      <svg
        className={`animate-spin text-indigo-600 ${sizes[size]}`}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>
      {showText && (
        <p className="mt-3 text-gray-600 font-medium">{text}</p>
      )}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-white bg-opacity-90 flex items-center justify-center z-50">
        {spinner}
      </div>
    );
  }

  return spinner;
};

// Skeleton Loading Component
export const Skeleton = ({ 
  width = 'full', 
  height = '4', 
  rounded = 'md',
  className = '' 
}) => {
  const widthClasses = {
    full: 'w-full',
    '3/4': 'w-3/4',
    '1/2': 'w-1/2',
    '1/4': 'w-1/4',
    '1/3': 'w-1/3',
    '2/3': 'w-2/3'
  };

  return (
    <div 
      className={`
        animate-pulse bg-gray-200 
        ${typeof width === 'string' && widthClasses[width] ? widthClasses[width] : `w-${width}`}
        h-${height}
        rounded-${rounded}
        ${className}
      `}
    />
  );
};

// Card Skeleton for loading state
export const CardSkeleton = () => (
  <div className="bg-white rounded-xl shadow-md p-6 animate-pulse">
    <div className="flex items-center justify-between mb-4">
      <Skeleton width="1/3" height="4" />
      <Skeleton width="1/4" height="8" rounded="full" />
    </div>
    <Skeleton width="1/2" height="8" className="mb-2" />
    <Skeleton width="full" height="3" />
  </div>
);

// Transaction Skeleton
export const TransactionSkeleton = () => (
  <div className="flex items-center justify-between p-4 border-b animate-pulse">
    <div className="flex items-center space-x-4">
      <Skeleton width="12" height="12" rounded="full" className="w-12 h-12" />
      <div>
        <Skeleton width="32" height="4" className="w-32 mb-2" />
        <Skeleton width="24" height="3" className="w-24" />
      </div>
    </div>
    <Skeleton width="20" height="6" className="w-20" />
  </div>
);

export default Loading;
