
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Character } from '../../types/game';
import { DollarSign, TrendingUp, Wallet, Star } from 'lucide-react';

interface MoneyTabProps {
  character: Character;
  onMoneyAction: (action: string, data?: any) => void;
}

export const MoneyTab: React.FC<MoneyTabProps> = ({ 
  character, 
  onMoneyAction 
}) => {
  const [loanAmount, setLoanAmount] = useState(50);
  const [investAmount, setInvestAmount] = useState(20);

  const totalAssetValue = character.assets.reduce((total, asset) => total + asset.value, 0);
  const netWorth = character.wealth + totalAssetValue;

  const getWealthStatus = (wealth: number) => {
    if (wealth >= 1000) return { status: 'Wealthy', color: 'text-green-600', emoji: '💰' };
    if (wealth >= 500) return { status: 'Well-off', color: 'text-blue-600', emoji: '💵' };
    if (wealth >= 100) return { status: 'Comfortable', color: 'text-yellow-600', emoji: '💴' };
    if (wealth >= 50) return { status: 'Getting by', color: 'text-orange-600', emoji: '💳' };
    return { status: 'Struggling', color: 'text-red-600', emoji: '🪙' };
  };

  const wealthStatus = getWealthStatus(netWorth);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 pb-24">
      <div className="px-4 py-6">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            💰 Money Management
          </h1>
          <p className="text-gray-600">Build your financial future</p>
        </div>

        {/* Financial Overview */}
        <Card className="mb-6 border-green-200 bg-green-50">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <Wallet className="h-5 w-5 text-green-600" />
              Financial Status
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center">
              <div className="text-3xl mb-2">{wealthStatus.emoji}</div>
              <div className={`font-bold text-xl ${wealthStatus.color}`}>
                {wealthStatus.status}
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-3 bg-white rounded-lg">
                <div className="font-semibold text-green-600">Cash</div>
                <div className="text-lg">${character.wealth}k</div>
              </div>
              <div className="text-center p-3 bg-white rounded-lg">
                <div className="font-semibold text-blue-600">Net Worth</div>
                <div className="text-lg">${netWorth}k</div>
              </div>
            </div>

            {character.job && (
              <div className="text-center p-3 bg-white rounded-lg">
                <div className="font-semibold text-purple-600">Annual Income</div>
                <div className="text-lg">${character.salary}k/year</div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Loan System */}
        <Card className="mb-6">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-blue-600" />
              Apply for Loan
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Loan Amount ($k)</label>
              <Input
                type="number"
                value={loanAmount}
                onChange={(e) => setLoanAmount(Number(e.target.value))}
                min={10}
                max={500}
                step={10}
              />
            </div>
            
            <div className="text-xs text-gray-600 space-y-1">
              <p>• Approval based on age, job, education, and wealth</p>
              <p>• Interest rates vary by creditworthiness</p>
              <p>• Must be 18+ years old</p>
            </div>
            
            <Button
              className="w-full"
              onClick={() => onMoneyAction('apply_loan', { amount: loanAmount })}
              disabled={character.age < 18}
            >
              Apply for ${loanAmount}k Loan
            </Button>
          </CardContent>
        </Card>

        {/* Investment System */}
        <Card className="mb-6">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-purple-600" />
              Investments
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Investment Amount ($k)</label>
              <Input
                type="number"
                value={investAmount}
                onChange={(e) => setInvestAmount(Number(e.target.value))}
                min={5}
                max={character.wealth}
                step={5}
              />
            </div>
            
            <div className="text-xs text-gray-600 space-y-1">
              <p>• Returns can range from -20% to +30%</p>
              <p>• Higher risk, higher potential reward</p>
              <p>• Results are immediate but random</p>
            </div>
            
            <Button
              className="w-full"
              onClick={() => onMoneyAction('invest', { amount: investAmount })}
              disabled={character.wealth < investAmount || investAmount < 5}
              variant="outline"
            >
              Invest ${investAmount}k
            </Button>
          </CardContent>
        </Card>

        {/* Savings Account */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <Star className="h-5 w-5 text-yellow-600" />
              Savings Account
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-sm text-gray-600">
              <p>Earn 2% annual interest on your savings safely.</p>
            </div>
            
            <Button
              className="w-full"
              onClick={() => onMoneyAction('save', { amount: character.wealth })}
              disabled={character.wealth < 10}
              variant="outline"
            >
              Earn Interest on ${character.wealth}k
            </Button>
          </CardContent>
        </Card>

        {/* Financial Tips */}
        <Card className="mt-6">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">💡 Financial Tips</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-gray-600 space-y-2">
              <p>• Higher education and better jobs improve loan approval</p>
              <p>• Investments are risky but can multiply your wealth</p>
              <p>• Savings accounts provide steady, safe returns</p>
              <p>• Assets contribute to your overall net worth</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
