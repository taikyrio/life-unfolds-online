import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { formatMoney } from '../../utils/gameUtils';

interface BalanceCardsProps {
  currentMoney: number;
  bankBalance: number;
}

export const BalanceCards: React.FC<BalanceCardsProps> = ({ currentMoney, bankBalance }) => {
  return (
    <div className="grid grid-cols-2 gap-4 mb-6">
      <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm text-gray-600">Cash</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold text-green-600">{formatMoney(currentMoney)}</p>
        </CardContent>
      </Card>
      <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm text-gray-600">Bank Balance</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold text-blue-600">{formatMoney(bankBalance)}</p>
        </CardContent>
      </Card>
    </div>
  );
};