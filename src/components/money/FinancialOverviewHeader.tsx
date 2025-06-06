import React from 'react';

export const FinancialOverviewHeader: React.FC = () => {
  return (
    <div className="text-center mb-6">
      <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-3xl mb-4 shadow-lg">
        <span className="text-2xl">💰</span>
      </div>
      <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-2">
        Financial Center
      </h1>
      <p className="text-gray-600 text-lg">Manage your wealth and investments</p>
    </div>
  );
};