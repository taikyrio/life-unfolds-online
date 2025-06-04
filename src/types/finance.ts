
export interface FinancialRecord {
  totalIncome: number;
  totalExpenses: number;
  monthlyIncome: number;
  monthlyExpenses: number;
  investments: Investment[];
  loans: Loan[];
  creditScore: number;
  bankAccounts: BankAccount[];
  taxes: TaxRecord[];
}

export interface Investment {
  id: string;
  type: 'stocks' | 'bonds' | 'crypto' | 'real_estate' | 'mutual_funds';
  name: string;
  amount: number;
  currentValue: number;
  purchaseDate: string;
  roi: number;
}

export interface Loan {
  id: string;
  type: 'student' | 'mortgage' | 'personal' | 'auto' | 'credit_card';
  principal: number;
  remaining: number;
  interestRate: number;
  monthlyPayment: number;
  startDate: string;
}

export interface BankAccount {
  id: string;
  type: 'checking' | 'savings' | 'investment';
  bank: string;
  balance: number;
  interestRate: number;
}

export interface TaxRecord {
  year: number;
  income: number;
  taxesPaid: number;
  refund: number;
  deductions: number;
}
