import React from 'react';
import { Card, CardContent } from '../ui/card';

interface BalanceCardsProps {
  currentMoney: number;
  bankBalance: number;
}

export const BalanceCards: React.FC<BalanceCardsProps> = ({ 
  currentMoney, 
  bankBalance 
}) => {
  return (
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
  );
};