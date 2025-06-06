import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Character } from '../../types/character';

interface TransactionHistoryProps {
  character: Character;
}

export const TransactionHistory: React.FC<TransactionHistoryProps> = ({ character }) => {
  // Mock transaction history for display
  const transactions = [
    { id: 1, type: 'income', description: 'Salary Payment', amount: character.salary || 0, date: 'Today' },
    { id: 2, type: 'expense', description: 'Living Expenses', amount: -500, date: 'Yesterday' },
  ];

  return (
    <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg mb-6">
      <CardHeader>
        <CardTitle className="text-lg">Recent Transactions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {transactions.map((transaction) => (
            <div key={transaction.id} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0">
              <div>
                <p className="font-medium text-gray-800">{transaction.description}</p>
                <p className="text-sm text-gray-500">{transaction.date}</p>
              </div>
              <span className={`font-semibold ${transaction.amount >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {transaction.amount >= 0 ? '+' : ''}${Math.abs(transaction.amount)}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};