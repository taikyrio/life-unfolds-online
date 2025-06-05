import React from 'react';
import { Character } from '../../types/game';
import {
  FinancialOverviewHeader,
  BalanceCards,
  IncomeExpenseChart,
  TransactionHistory,
  InvestmentPortfolio
} from '../money';

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
  // Ensure money and wealth are synchronized
  const currentMoney = character.money || character.wealth || 0;
  const bankBalance = character.financialRecord?.bankBalance || currentMoney;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-700 pb-20">
      <div className="px-3 py-4 space-y-4">
        <FinancialOverviewHeader />
        
        <BalanceCards 
          currentMoney={currentMoney} 
          bankBalance={bankBalance} 
        />
        
        <IncomeExpenseChart character={character} />
        
        <TransactionHistory character={character} />
        
        <InvestmentPortfolio character={character} />
      </div>
    </div>
  );
};
