import React, { useState } from 'react';
import { Card, CardContent } from '../ui/card';
import { Calendar } from 'lucide-react';
import { Character } from '../../types/game';

interface TransactionHistoryProps {
  character: Character;
}

export const TransactionHistory: React.FC<TransactionHistoryProps> = ({ character }) => {
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
          {character.financialRecord?.transactionHistory && character.financialRecord.transactionHistory.length > 0 ? (
            character.financialRecord.transactionHistory.map((transaction) => (
              <div key={transaction.id} className="flex items-center justify-between py-2 border-b border-gray-200 dark:border-gray-700">
                <div>
                  <div className="text-xs font-medium text-gray-700 dark:text-gray-200">
                    {transaction.description}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    {transaction.date}
                  </div>
                </div>
                <div className={`text-sm font-bold ${transaction.type === 'income' ? 'text-green-600' : 'text-red-600'}`}>
                  ${transaction.amount.toLocaleString()}k
                </div>
              </div>
            ))
          ) : (
            <div className="flex items-center justify-center py-8 text-gray-400">
              <span className="text-sm">No transaction history available</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};