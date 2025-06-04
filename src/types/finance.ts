
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
  bankBalance: number;
  transactionHistory: Transaction[];
  currentLoans: Loan[];
}

export interface Investment {
  id: string;
  type: 'stocks' | 'bonds' | 'crypto' | 'real_estate' | 'mutual_funds' | 'savings_account' | 'cd';
  name: string;
  amount: number;
  currentValue: number;
  purchaseDate: string;
  yearPurchased: number;
  roi: number;
  annualReturn: number;
}

export interface Loan {
  id: string;
  type: 'student' | 'mortgage' | 'personal' | 'auto' | 'credit_card' | 'business';
  principal: number;
  remaining: number;
  amount: number;
  originalAmount: number;
  interestRate: number;
  monthlyPayment: number;
  startDate: string;
  lender: string;
  remainingMonths: number;
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

export interface Transaction {
  id: string;
  amount: number;
  description: string;
  category: string;
  type: 'Income' | 'Expense';
  year: number;
  date: string;
}
