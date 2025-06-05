import React from 'react';
import { Card, CardContent } from '../ui/card';
import { PieChart } from 'lucide-react';
import { Character } from '../../types/game';

interface InvestmentPortfolioProps {
  character: Character;
}

export const InvestmentPortfolio: React.FC<InvestmentPortfolioProps> = ({ character }) => {
  const totalInvestmentValue = typeof character.financialRecord?.investments === 'number' 
    ? character.financialRecord.investments 
    : 0;

  return (
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
              Total Value: ${totalInvestmentValue.toLocaleString()}k
            </span>
          </div>
        </div>
        <div className="max-h-48 overflow-y-auto">
          <div className="flex items-center justify-center py-8 text-gray-400">
            <span className="text-sm">Investment details not available</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};