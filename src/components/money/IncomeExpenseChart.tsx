import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Character } from '../../types/character';

interface IncomeExpenseChartProps {
  character: Character;
}

export const IncomeExpenseChart: React.FC<IncomeExpenseChartProps> = ({ character }) => {
  const monthlyIncome = character.salary || 0;
  const monthlyExpenses = Math.floor(monthlyIncome * 0.3); // Estimated expenses

  return (
    <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg mb-6">
      <CardHeader>
        <CardTitle className="text-lg">Monthly Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Income</span>
            <span className="text-green-600 font-semibold">+${monthlyIncome}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Expenses</span>
            <span className="text-red-600 font-semibold">-${monthlyExpenses}</span>
          </div>
          <hr className="border-gray-200" />
          <div className="flex justify-between items-center">
            <span className="font-semibold">Net Income</span>
            <span className={`font-bold ${monthlyIncome - monthlyExpenses >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              ${monthlyIncome - monthlyExpenses}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};