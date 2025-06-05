import React from 'react';
import { Card, CardContent } from '../ui/card';
import { BarChart3 } from 'lucide-react';
import { Character } from '../../types/game';

interface IncomeExpenseChartProps {
  character: Character;
}

export const IncomeExpenseChart: React.FC<IncomeExpenseChartProps> = ({ character }) => {
  return (
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
  );
};