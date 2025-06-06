import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Character } from '../../types/character';

interface InvestmentPortfolioProps {
  character: Character;
}

export const InvestmentPortfolio: React.FC<InvestmentPortfolioProps> = ({ character }) => {
  const totalInvestments = character.assets
    .filter(asset => asset.type === 'investment')
    .reduce((total, asset) => total + asset.value, 0);

  return (
    <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
      <CardHeader>
        <CardTitle className="text-lg">Investment Portfolio</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-center py-6">
          <p className="text-3xl font-bold text-blue-600 mb-2">${totalInvestments}</p>
          <p className="text-gray-600 mb-4">Total Portfolio Value</p>
          <Button variant="outline" className="w-full">
            Manage Investments
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};