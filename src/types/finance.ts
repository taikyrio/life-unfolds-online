export interface FinancialTransaction {
  id: string;
  year: number;
  type: 'Income' | 'Expense';
  amount: number;
  description: string;
  category: 'Salary' | 'Gift' | 'Inheritance' | 'Asset Sale' | 'Crime' | 'Rent' | 'Food' | 'Taxes' | 'Car Maintenance' | 'Child Support' | 'Asset Purchase' | 'Education' | 'Medical' | 'Fine' | 'Loan' | 'Investment' | 'Other';
  recurring: boolean;
  timestamp: number;
}

export interface FinancialRecord {
  bankBalance: number;
  transactionHistory: FinancialTransaction[];
  yearlyIncome: number;
  yearlyExpenses: number;
  totalLifetimeEarnings: number;
  totalLifetimeSpending: number;
  currentLoans: Loan[];
  investments: Investment[];
  recurringExpenses: RecurringExpense[];
}

export interface Loan {
  id: string;
  amount: number;
  originalAmount: number;
  interestRate: number;
  monthlyPayment: number;
  remainingMonths: number;
  type: 'Personal' | 'Mortgage' | 'Car' | 'Student' | 'Business';
  lender: string;
  startYear: number;
}

export interface Investment {
  id: string;
  type: 'Stocks' | 'Bonds' | 'Real Estate' | 'Crypto' | 'Savings Account' | 'CD';
  amount: number;
  currentValue: number;
  annualReturn: number;
  yearPurchased: number;
  description: string;
}

export interface RecurringExpense {
  id: string;
  name: string;
  amount: number;
  frequency: 'Monthly' | 'Yearly';
  category: 'Rent' | 'Food' | 'Insurance' | 'Utilities' | 'Phone' | 'Internet' | 'Subscriptions' | 'Other';
  startAge: number;
  endAge?: number;
}

export interface FinancialGoal {
  id: string;
  name: string;
  targetAmount: number;
  currentAmount: number;
  deadline: number; // age
  priority: 'Low' | 'Medium' | 'High';
  category: 'Emergency Fund' | 'House' | 'Car' | 'Vacation' | 'Retirement' | 'Education' | 'Other';
}

export interface BankAccount {
  id: string;
  type: 'Checking' | 'Savings' | 'Investment';
  balance: number;
  interestRate: number;
  minimumBalance: number;
  monthlyFee: number;
  bankName: string;
}