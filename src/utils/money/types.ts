
export interface MoneyState {
  balance: number;
  income: number;
  monthlyIncome: number;
  expenses: number;
  investments: any[];
  loans: any[];
  transactions: MoneyTransaction[];
}

export interface MoneyTransaction {
  id: string;
  amount: number;
  type: 'income' | 'expense' | 'investment';
  category: string;
  description: string;
  date: string;
}

export interface SpendingResult {
  success: boolean;
  newBalance: number;
  message: string;
}

export interface FinancialStatus {
  netWorth: number;
  monthlyIncome: number;
  monthlyExpenses: number;
  savings: number;
}

export interface MonthlyFinanceResult {
  income: number;
  expenses: number;
  savings: number;
  newBalance: number;
}
