
// Money System Type Definitions
export interface MoneyTransaction {
  amount: number;
  type: 'income' | 'expense' | 'bonus' | 'penalty';
  source: string;
  description: string;
  timestamp: number;
}

export interface MoneyState {
  balance: number;
  monthlyIncome: number;
  monthlyExpenses: number;
  transactions: MoneyTransaction[];
  lastSalaryAge: number;
}

export interface SpendingResult {
  success: boolean;
  newBalance: number;
  message: string;
}

export interface FinancialStatus {
  status: string;
  color: string;
}

export interface MonthlyFinanceResult {
  newMoneyState: MoneyState;
  transaction: MoneyTransaction | null;
  message: string;
}
