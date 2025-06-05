import React from 'react';

export const FinancialOverviewHeader: React.FC = () => {
  return (
    <div className="text-center">
      <h1 className="text-xl font-bold text-gray-800 dark:text-white mb-1">
        💰 Financial Overview
      </h1>
      <p className="text-sm text-gray-600 dark:text-gray-300">Manage your finances</p>
    </div>
  );
};