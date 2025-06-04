
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Character } from '../../types/game';
import { DollarSign, TrendingUp, TrendingDown, PiggyBank, CreditCard, Building2, History } from 'lucide-react';

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
  const [activeAction, setActiveAction] = useState<string | null>(null);

  // Calculate proper bank balance from character wealth
  const bankBalance = character.wealth * 1000; // Convert wealth from thousands to actual amount
  const netWorth = bankBalance + (character.assets?.reduce((sum, asset) => sum + asset.value, 0) || 0);
  const monthlyIncome = character.salary || 0;
  const monthlyExpenses = Math.floor(monthlyIncome * 0.3); // Estimate 30% for expenses

  const quickActions = [
    {
      id: 'work',
      title: 'Work',
      description: '+$500',
      cost: 0,
      color: 'bg-green-500 hover:bg-green-600',
      icon: '💼',
      disabled: !character.job
    },
    {
      id: 'food',
      title: 'Food',
      description: '-$100',
      cost: 100,
      color: 'bg-red-500 hover:bg-red-600',
      icon: '🍔'
    },
    {
      id: 'fun',
      title: 'Fun',
      description: '-$50',
      cost: 50,
      color: 'bg-orange-500 hover:bg-orange-600',
      icon: '🎉'
    },
    {
      id: 'gift',
      title: 'Gift',
      description: '+$1,000',
      cost: -1000,
      color: 'bg-blue-500 hover:bg-blue-600',
      icon: '🎁'
    }
  ];

  const handleQuickAction = (action: any) => {
    const updatedCharacter = {
      ...character,
      wealth: character.wealth + (action.cost / 1000 * -1) // Convert to thousands
    };
    
    onCharacterUpdate(updatedCharacter);
    onEvent(`${action.title}: ${action.description}`);
  };

  const handleInvestment = () => {
    const amount = 1000; // $1k investment
    if (character.wealth >= 1) {
      const updatedCharacter = {
        ...character,
        wealth: character.wealth - 1
      };
      onCharacterUpdate(updatedCharacter);
      onEvent('Invested $1,000 in stocks');
    }
  };

  const handleLoan = () => {
    const loanAmount = 5000; // $5k loan
    const updatedCharacter = {
      ...character,
      wealth: character.wealth + 5
    };
    onCharacterUpdate(updatedCharacter);
    onEvent('Received $5,000 loan');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-700 pb-24">
      <div className="px-4 py-6">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
            💰 Financial Overview
          </h1>
          <p className="text-gray-600 dark:text-gray-300">Manage your money and investments</p>
        </div>

        {/* Financial Overview Cards */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <Card className="glass border-white/20">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                ${bankBalance.toLocaleString()}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-300">Bank Balance</div>
            </CardContent>
          </Card>
          
          <Card className="glass border-white/20">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                ${netWorth.toLocaleString()}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-300">Net Worth</div>
            </CardContent>
          </Card>
          
          <Card className="glass border-white/20">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                ${(monthlyIncome * 1000).toLocaleString()}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-300">Monthly Income</div>
            </CardContent>
          </Card>
          
          <Card className="glass border-white/20">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-red-600 dark:text-red-400">
                ${(monthlyExpenses * 1000).toLocaleString()}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-300">Monthly Expenses</div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="glass border-white/20 mb-6">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg text-gray-800 dark:text-white">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              {quickActions.map((action) => (
                <Button
                  key={action.id}
                  onClick={() => handleQuickAction(action)}
                  disabled={action.disabled || (action.cost > 0 && character.wealth < action.cost / 1000)}
                  className={`${action.color} text-white p-4 h-auto flex flex-col items-center gap-2`}
                >
                  <span className="text-2xl">{action.icon}</span>
                  <span className="font-medium">{action.title}</span>
                  <span className="text-sm opacity-90">{action.description}</span>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Investment & Loan Actions */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <Button
            onClick={handleInvestment}
            disabled={character.wealth < 1}
            className="h-20 bg-white/10 hover:bg-white/20 border border-white/20 text-gray-800 dark:text-white flex flex-col items-center gap-2"
          >
            <TrendingUp className="h-6 w-6 text-green-500" />
            <span className="font-medium">Invest</span>
            <span className="text-xs opacity-70">Grow money</span>
          </Button>
          
          <Button
            onClick={handleLoan}
            className="h-20 bg-white/10 hover:bg-white/20 border border-white/20 text-gray-800 dark:text-white flex flex-col items-center gap-2"
          >
            <CreditCard className="h-6 w-6 text-blue-500" />
            <span className="font-medium">Get Loan</span>
            <span className="text-xs opacity-70">Borrow money</span>
          </Button>
        </div>

        {/* Financial Tabs */}
        <Tabs defaultValue="investments" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-white/10 dark:bg-slate-800/50">
            <TabsTrigger value="investments" className="text-gray-700 dark:text-gray-300">Investments</TabsTrigger>
            <TabsTrigger value="loans" className="text-gray-700 dark:text-gray-300">Loans</TabsTrigger>
            <TabsTrigger value="history" className="text-gray-700 dark:text-gray-300">History</TabsTrigger>
          </TabsList>
          
          <TabsContent value="investments" className="mt-4">
            <Card className="glass border-white/20">
              <CardHeader>
                <CardTitle className="text-lg text-gray-800 dark:text-white flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Investment Portfolio
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                  <PiggyBank className="h-12 w-12 mx-auto mb-3 opacity-50" />
                  <p>No investments yet</p>
                  <p className="text-sm">Start investing to grow your wealth</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="loans" className="mt-4">
            <Card className="glass border-white/20">
              <CardHeader>
                <CardTitle className="text-lg text-gray-800 dark:text-white flex items-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  Active Loans
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                  <Building2 className="h-12 w-12 mx-auto mb-3 opacity-50" />
                  <p>No active loans</p>
                  <p className="text-sm">Borrow money when you need it</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="history" className="mt-4">
            <Card className="glass border-white/20">
              <CardHeader>
                <CardTitle className="text-lg text-gray-800 dark:text-white flex items-center gap-2">
                  <History className="h-5 w-5" />
                  Transaction History
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                  <History className="h-12 w-12 mx-auto mb-3 opacity-50" />
                  <p>No transactions yet</p>
                  <p className="text-sm">Your financial activity will appear here</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
