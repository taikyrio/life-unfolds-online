
import { Character, FinancialRecord, Investment, Loan, Transaction } from '../types/game';

export const initializeFinancialRecord = (): FinancialRecord => {
  return {
    totalIncome: 0,
    totalExpenses: 0,
    monthlyIncome: 0,
    monthlyExpenses: 0,
    investments: [],
    loans: [],
    creditScore: 700,
    bankAccounts: [],
    taxes: [],
    bankBalance: 0,
    transactionHistory: [],
    currentLoans: []
  };
};

export const processYearlyFinances = (character: Character): Character => {
  const updatedCharacter = { ...character };
  
  if (!updatedCharacter.financialRecord) {
    updatedCharacter.financialRecord = initializeFinancialRecord();
  }

  // Process investment returns
  updatedCharacter.financialRecord.investments = updatedCharacter.financialRecord.investments.map(investment => {
    const return_rate = investment.annualReturn || 0.07; // Default 7% return
    const newValue = investment.currentValue * (1 + return_rate);
    return {
      ...investment,
      currentValue: newValue,
      roi: ((newValue - investment.amount) / investment.amount) * 100
    };
  });

  // Process loan payments
  updatedCharacter.financialRecord.currentLoans = updatedCharacter.financialRecord.currentLoans.map(loan => {
    const monthlyPayment = loan.monthlyPayment || (loan.remaining * 0.1 / 12);
    const yearlyPayment = monthlyPayment * 12;
    const newRemaining = Math.max(0, loan.remaining - yearlyPayment);
    
    return {
      ...loan,
      remaining: newRemaining,
      remainingMonths: Math.max(0, loan.remainingMonths - 12)
    };
  });

  // Calculate yearly income from job
  if (character.salary) {
    const yearlyIncome = character.salary; // Salary is already in dollars
    updatedCharacter.financialRecord.bankBalance += yearlyIncome;
    
    const transaction: Transaction = {
      id: Date.now().toString(),
      amount: yearlyIncome,
      description: 'Annual salary',
      category: 'Income',
      type: 'Income',
      year: character.age,
      date: new Date().toISOString()
    };
    
    updatedCharacter.financialRecord.transactionHistory.push(transaction);
  }

  return updatedCharacter;
};

export const modifyBankBalance = (
  character: Character,
  amount: number,
  description: string,
  category: string
): Character => {
  const updatedCharacter = { ...character };
  
  if (!updatedCharacter.financialRecord) {
    updatedCharacter.financialRecord = initializeFinancialRecord();
  }

  updatedCharacter.financialRecord.bankBalance += amount;
  updatedCharacter.wealth = Math.max(0, updatedCharacter.wealth + amount); // Keep amount as-is

  const transaction: Transaction = {
    id: Date.now().toString(),
    amount: Math.abs(amount),
    description,
    category,
    type: amount > 0 ? 'Income' : 'Expense',
    year: character.age,
    date: new Date().toISOString()
  };

  updatedCharacter.financialRecord.transactionHistory.push(transaction);

  return updatedCharacter;
};

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
};

export const getFinancialSummary = (character: Character) => {
  const financialRecord = character.financialRecord || initializeFinancialRecord();
  
  const totalInvestmentValue = financialRecord.investments.reduce((sum, inv) => sum + inv.currentValue, 0);
  const totalDebt = financialRecord.currentLoans.reduce((sum, loan) => sum + loan.amount, 0);
  const netWorth = financialRecord.bankBalance + totalInvestmentValue - totalDebt;
  
  const monthlyIncome = (character.salary || 0) * 1000 / 12; // Convert from thousands
  const monthlyExpenses = getRecurringExpenses(character).reduce((sum, exp) => sum + exp.amount, 0);
  const debtToIncomeRatio = monthlyIncome > 0 ? (totalDebt / 12) / monthlyIncome : 0;

  return {
    netWorth,
    monthlyIncome,
    monthlyExpenses,
    debtToIncomeRatio,
    totalDebt,
    totalInvestments: totalInvestmentValue
  };
};

export const canAfford = (character: Character, amount: number): boolean => {
  const financialRecord = character.financialRecord || initializeFinancialRecord();
  return financialRecord.bankBalance >= amount;
};

export const validatePurchase = (character: Character, amount: number, item: string) => {
  if (!canAfford(character, amount)) {
    return {
      canPurchase: false,
      message: `You can't afford ${item}. You need ${formatCurrency(amount)} but only have ${formatCurrency((character.financialRecord?.bankBalance || 0))}.`
    };
  }
  return {
    canPurchase: true,
    message: 'Purchase approved'
  };
};

export const createInvestment = (
  character: Character,
  type: string,
  amount: number,
  name: string
): Character => {
  const updatedCharacter = modifyBankBalance(character, -amount, `Investment in ${name}`, 'Investment');
  
  const investmentTypeMap: Record<string, string> = {
    'Stocks': 'stocks',
    'Bonds': 'bonds',
    'Real Estate': 'real_estate',
    'Crypto': 'crypto',
    'Savings Account': 'savings_account',
    'CD': 'cd'
  };

  const investment: Investment = {
    id: Date.now().toString(),
    type: investmentTypeMap[type] as any || 'stocks',
    name,
    amount,
    currentValue: amount,
    purchaseDate: new Date().toISOString(),
    yearPurchased: character.age,
    roi: 0,
    annualReturn: Math.random() * 0.15 + 0.05 // 5-20% annual return
  };

  updatedCharacter.financialRecord!.investments.push(investment);
  
  return updatedCharacter;
};

export const createLoan = (
  character: Character,
  amount: number,
  type: string,
  lender: string,
  interestRate: number,
  termMonths: number
): Character => {
  const updatedCharacter = modifyBankBalance(character, amount, `${type} loan from ${lender}`, 'Loan');
  
  const loanTypeMap: Record<string, string> = {
    'Personal': 'personal',
    'Mortgage': 'mortgage',
    'Car': 'auto',
    'Student': 'student',
    'Business': 'credit_card' // Using credit_card as fallback for business
  };

  const monthlyPayment = (amount * (interestRate / 12)) / (1 - Math.pow(1 + (interestRate / 12), -termMonths));

  const loan: Loan = {
    id: Date.now().toString(),
    type: loanTypeMap[type] as any || 'personal',
    principal: amount,
    remaining: amount,
    amount,
    originalAmount: amount,
    interestRate,
    monthlyPayment,
    startDate: new Date().toISOString(),
    lender,
    remainingMonths: termMonths
  };

  updatedCharacter.financialRecord!.loans.push(loan);
  updatedCharacter.financialRecord!.currentLoans.push(loan);
  
  return updatedCharacter;
};

export const getRecurringExpenses = (character: Character) => {
  // Basic recurring expenses based on character status
  const expenses = [];
  
  if (character.job) {
    expenses.push({
      id: 'living',
      name: 'Living Expenses',
      amount: 1500,
      category: 'Essential',
      frequency: 'Monthly'
    });
  }
  
  if (character.education?.currentStage) {
    expenses.push({
      id: 'education',
      name: 'Education Costs',
      amount: 500,
      category: 'Education',
      frequency: 'Monthly'
    });
  }

  return expenses;
};
