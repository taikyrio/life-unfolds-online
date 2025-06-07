
import { Investment, Loan } from './core';

export interface FinancialRecord {
  totalAssets: number;
  totalLiabilities: number;
  netWorth: number;
  monthlyIncome: number;
  monthlyExpenses: number;
  totalIncome: number;
  investments: Investment[];
  currentLoans: Loan[];
  loans: Loan[];
  creditScore: number;
  bankBalance: number;
  transactions: Transaction[];
  transactionHistory: Transaction[];
}

export interface Transaction {
  id: string;
  amount: number;
  type: 'income' | 'expense' | 'investment';
  category: string;
  description: string;
  date: string;
}
