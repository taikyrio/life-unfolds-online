
export interface AssetTransaction {
  id: string;
  assetId: string;
  type: 'purchase' | 'sale' | 'maintenance';
  amount: number;
  date: string;
  description: string;
}

export interface AssetMarketEvent {
  id: string;
  type: 'appreciation' | 'depreciation' | 'market_crash' | 'boom';
  affectedCategories: string[];
  multiplier: number;
  description: string;
  startDate: string;
  endDate?: string;
}

export interface Transaction {
  id: string;
  type: 'income' | 'expense' | 'investment';
  amount: number;
  description: string;
  date: string;
  category: string;
}

export interface FinancialRecord {
  totalIncome: number;
  totalExpenses: number;
  investments: number;
  debts: number;
  creditScore: number;
  bankAccount: number;
  bankBalance: number;
  monthlyIncome: number;
  monthlyExpenses: number;
  transactionHistory: Transaction[];
  assetTransactions: AssetTransaction[];
  assetMarketEvents: AssetMarketEvent[];
}
