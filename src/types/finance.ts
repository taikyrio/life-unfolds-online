

import { Investment, Loan } from './core';

export interface FinancialRecord {
  totalAssets: number;
  totalLiabilities: number;
  netWorth: number;
  monthlyIncome: number;
  monthlyExpenses: number;
  investments: Investment[];
  currentLoans: Loan[];
  creditScore: number;
  bankBalance: number;
  transactions: Transaction[];
}

export interface Transaction {
  id: string;
  amount: number;
  type: 'income' | 'expense' | 'investment';
  category: string;
  description: string;
  date: string;
}

