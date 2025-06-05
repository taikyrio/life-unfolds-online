import React, { useState } from 'react';
import { Character } from '../../types/game';
import { Card, CardContent } from '../ui/card';
import { BarChart3, PieChart, Calendar } from 'lucide-react';

interface MoneyTabProps {
  character: Character;
  onCharacterUpdate: (character: Character) => void;
  onEvent: (message: string) => void;
}

export const MoneyTab: React.FC<MoneyTabProps> = ({ 
  character, 
  onCharacterUpdate, 
  onEvent 
}) => {
  // Ensure money and wealth are synchronized
  const currentMoney = character.money || character.wealth || 0;
  const bankBalance = character.financialRecord?.bankBalance || currentMoney;

  const [sortBy, setSortBy] = useState<'date' | 'amount'>('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  const toggleSort = (newSortBy: typeof sortBy) => {
    if (sortBy === newSortBy) {
      setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc');
    } else {
      setSortBy(newSortBy);
      setSortOrder('desc');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-700 pb-20">
      <div className="px-3 py-4 space-y-4">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-xl font-bold text-gray-800 dark:text-white mb-1">
            💰 Financial Overview
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-300">Manage your finances</p>
        </div>

        {/* Main Balance Cards */}
        <div className="grid grid-cols-2 gap-3">
          <Card className="glass border-white/20">
            <CardContent className="p-3 text-center">
              <div className="text-lg font-bold text-green-600 dark:text-green-400">
                ${currentMoney.toLocaleString()}k
              </div>
              <div className="text-xs text-gray-600 dark:text-gray-300">Total Wealth</div>
            </CardContent>
          </Card>
          
          <Card className="glass border-white/20">
            <CardContent className="p-3 text-center">
              <div className="text-lg font-bold text-blue-600 dark:text-blue-400">
                ${bankBalance.toLocaleString()}k
              </div>
              <div className="text-xs text-gray-600 dark:text-gray-300">Bank Balance</div>
            </CardContent>
          </Card>
        </div>

        {/* Financial Analytics */}
        <Card className="glass border-white/20">
          <CardContent className="p-3">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <BarChart3 className="h-4 w-4 text-gray-500" />
                <h2 className="text-sm font-semibold text-gray-700 dark:text-gray-200">
                  Income vs Expenses
                </h2>
              </div>
              <div className="text-right">
                <span className="text-xs text-green-600 dark:text-green-400">
                  Income: ${character.financialRecord?.monthlyIncome.toLocaleString()}k
                </span>
                <span className="text-xs text-red-600 dark:text-red-400 ml-2">
                  Expenses: ${character.financialRecord?.monthlyExpenses.toLocaleString()}k
                </span>
              </div>
            </div>
            <div className="h-24 bg-gray-100 dark:bg-gray-800 rounded-md flex items-center justify-center text-gray-400">
              <span className="text-sm">Visual data here</span>
            </div>
          </CardContent>
        </Card>

        {/* Transaction History */}
        <Card className="glass border-white/20">
          <CardContent className="p-3">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-gray-500" />
                <h2 className="text-sm font-semibold text-gray-700 dark:text-gray-200">
                  Transaction History
                </h2>
              </div>
              <div className="space-x-2">
                <button
                  onClick={() => toggleSort('date')}
                  className="text-xs text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  Date {sortBy === 'date' && (sortOrder === 'desc' ? '↓' : '↑')}
                </button>
                <button
                  onClick={() => toggleSort('amount')}
                  className="text-xs text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  Amount {sortBy === 'amount' && (sortOrder === 'desc' ? '↓' : '↑')}
                </button>
              </div>
            </div>
            <div className="max-h-48 overflow-y-auto">
              {character.financialRecord?.transactionHistory.map((transaction) => (
                <div key={transaction.id} className="flex items-center justify-between py-2 border-b border-gray-200 dark:border-gray-700">
                  <div>
                    <div className="text-xs font-medium text-gray-700 dark:text-gray-200">
                      {transaction.description}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      {transaction.date}
                    </div>
                  </div>
                  <div className={`text-sm font-bold ${transaction.type === 'Income' ? 'text-green-600' : 'text-red-600'}`}>
                    ${transaction.amount.toLocaleString()}k
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Investment Portfolio */}
        <Card className="glass border-white/20">
          <CardContent className="p-3">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <PieChart className="h-4 w-4 text-gray-500" />
                <h2 className="text-sm font-semibold text-gray-700 dark:text-gray-200">
                  Investment Portfolio
                </h2>
              </div>
              <div className="text-right">
                <span className="text-xs text-blue-600 dark:text-blue-400">
                  Total Value: ${character.financialRecord?.investments.reduce((sum, investment) => sum + investment.currentValue, 0).toLocaleString()}k
                </span>
              </div>
            </div>
            <div className="max-h-48 overflow-y-auto">
              {character.financialRecord?.investments.map((investment) => (
                <div key={investment.id} className="flex items-center justify-between py-2 border-b border-gray-200 dark:border-gray-700">
                  <div>
                    <div className="text-xs font-medium text-gray-700 dark:text-gray-200">
                      {investment.name}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      {investment.type}
                    </div>
                  </div>
                  <div className="text-sm font-bold text-blue-600">
                    ${investment.currentValue.toLocaleString()}k
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
