
import { Character } from '../types/game';
import { 
  FinancialTransaction, 
  FinancialRecord, 
  Loan, 
  Investment, 
  RecurringExpense,
  FinancialGoal,
  BankAccount 
} from '../types/finance';

export interface LoanApplication {
  amount: number;
  approved: boolean;
  interestRate: number;
  monthlyPayment: number;
  reason?: string;
}

// Initialize financial record for new characters
export const initializeFinancialRecord = (): FinancialRecord => {
  return {
    bankBalance: 0,
    transactionHistory: [],
    yearlyIncome: 0,
    yearlyExpenses: 0,
    totalLifetimeEarnings: 0,
    totalLifetimeSpending: 0,
    currentLoans: [],
    investments: [],
    recurringExpenses: []
  };
};

// Core transaction system
export const modifyBankBalance = (
  character: Character, 
  amount: number, 
  reason: string, 
  category: FinancialTransaction['category'],
  recurring = false
): Character => {
  const updatedCharacter = { ...character };
  
  // Initialize financial record if it doesn't exist
  if (!updatedCharacter.financialRecord) {
    updatedCharacter.financialRecord = initializeFinancialRecord();
  }

  const financialRecord = { ...updatedCharacter.financialRecord };
  
  // Update bank balance
  financialRecord.bankBalance += amount;
  
  // Sync with wealth (for backward compatibility)
  updatedCharacter.wealth = Math.max(0, Math.floor(financialRecord.bankBalance / 1000));

  // Create transaction record
  const transaction: FinancialTransaction = {
    id: `txn_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    year: updatedCharacter.age,
    type: amount >= 0 ? 'Income' : 'Expense',
    amount: Math.abs(amount),
    description: reason,
    category: category,
    recurring: recurring,
    timestamp: Date.now()
  };

  financialRecord.transactionHistory.push(transaction);

  // Update yearly totals
  if (amount >= 0) {
    financialRecord.yearlyIncome += amount;
    financialRecord.totalLifetimeEarnings += amount;
  } else {
    financialRecord.yearlyExpenses += Math.abs(amount);
    financialRecord.totalLifetimeSpending += Math.abs(amount);
  }

  updatedCharacter.financialRecord = financialRecord;
  return updatedCharacter;
};

export const calculateYearlySalaryIncrease = (character: Character): number => {
  if (!character.job || character.salary === 0) return 0;
  
  // Convert yearly salary to actual yearly amount
  return character.salary;
};

export const applyForLoan = (character: Character, requestedAmount: number): LoanApplication => {
  const baseRate = 0.05; // 5% base interest rate
  let approved = false;
  let interestRate = baseRate;
  let reason = '';

  // Calculate approval score based on various factors
  let score = 0;
  
  // Job and salary factor (40% of score)
  if (character.job) {
    score += 40;
    if (character.salary > 50) score += 20;
    else if (character.salary > 30) score += 10;
  } else {
    reason = 'No steady employment';
  }

  // Age factor (20% of score)
  if (character.age >= 25) score += 20;
  else if (character.age >= 21) score += 15;
  else if (character.age >= 18) score += 10;
  else reason = 'Too young for loan approval';

  // Wealth factor (20% of score)
  if (character.wealth > requestedAmount * 0.5) score += 20;
  else if (character.wealth > requestedAmount * 0.2) score += 15;
  else if (character.wealth > 0) score += 10;

  // Education factor (10% of score)
  if (character.education.completedStages.includes('college') || character.education.completedStages.includes('university')) score += 10;
  else if (character.education.completedStages.includes('high school')) score += 5;

  // Criminal record factor (10% of score)
  if (character.criminalRecord) {
    score -= 20;
    reason += reason ? ' and criminal record' : 'Criminal record affects approval';
  } else {
    score += 10;
  }

  // Determine approval
  approved = score >= 60;
  
  if (approved) {
    // Adjust interest rate based on score
    if (score >= 90) interestRate = 0.03; // 3% for excellent credit
    else if (score >= 80) interestRate = 0.04; // 4% for good credit
    else if (score >= 70) interestRate = 0.05; // 5% for fair credit
    else interestRate = 0.08; // 8% for poor credit
  } else if (!reason) {
    reason = 'Insufficient creditworthiness';
  }

  const monthlyPayment = approved ? 
    (requestedAmount * (interestRate / 12)) / (1 - Math.pow(1 + (interestRate / 12), -36)) : // 3-year loan
    0;

  return {
    amount: requestedAmount,
    approved,
    interestRate,
    monthlyPayment: Math.round(monthlyPayment),
    reason: approved ? undefined : reason
  };
};

// Enhanced recurring expense system
export const getRecurringExpenses = (character: Character): RecurringExpense[] => {
  const expenses: RecurringExpense[] = [];
  
  // Basic living expenses
  if (character.age >= 18) {
    const livingWithParents = character.age < 25 && character.familyMembers.some(m => 
      m.relationship === 'mother' || m.relationship === 'father'
    );
    
    if (!livingWithParents) {
      expenses.push({
        id: 'rent',
        name: 'Rent/Housing',
        amount: 800 + Math.random() * 400, // $800-1200/month
        frequency: 'Monthly',
        category: 'Rent',
        startAge: 18
      });
    }
    
    expenses.push(
      {
        id: 'food',
        name: 'Food & Groceries',
        amount: 300 + Math.random() * 200, // $300-500/month
        frequency: 'Monthly',
        category: 'Food',
        startAge: 16
      },
      {
        id: 'phone',
        name: 'Phone Bill',
        amount: 50 + Math.random() * 50, // $50-100/month
        frequency: 'Monthly',
        category: 'Phone',
        startAge: 16
      }
    );
  }
  
  // Asset-based expenses
  const hasHouse = character.assets.some(asset => asset.type === 'property');
  const hasCar = character.assets.some(asset => asset.type === 'vehicle');
  
  if (hasHouse) {
    expenses.push({
      id: 'property_tax',
      name: 'Property Tax & Maintenance',
      amount: 200 + Math.random() * 300, // $200-500/month
      frequency: 'Monthly',
      category: 'Other',
      startAge: character.age
    });
  }
  
  if (hasCar) {
    expenses.push({
      id: 'car_expenses',
      name: 'Car Insurance & Maintenance',
      amount: 150 + Math.random() * 150, // $150-300/month
      frequency: 'Monthly',
      category: 'Car Maintenance',
      startAge: character.age
    });
  }
  
  return expenses;
};

// Validation system
export const canAfford = (character: Character, amount: number): boolean => {
  const balance = character.financialRecord?.bankBalance || character.wealth * 1000;
  return balance >= amount;
};

export const validatePurchase = (character: Character, amount: number, itemName: string): {
  canPurchase: boolean;
  message: string;
} => {
  if (!canAfford(character, amount)) {
    const balance = character.financialRecord?.bankBalance || character.wealth * 1000;
    const shortfall = amount - balance;
    return {
      canPurchase: false,
      message: `You need $${shortfall.toLocaleString()} more to afford ${itemName}. Current balance: $${balance.toLocaleString()}`
    };
  }
  
  return {
    canPurchase: true,
    message: `Purchase confirmed: ${itemName} for $${amount.toLocaleString()}`
  };
};

export const processYearlyFinances = (character: Character): Character => {
  let updatedCharacter = { ...character };
  
  // Initialize financial record if needed
  if (!updatedCharacter.financialRecord) {
    updatedCharacter.financialRecord = initializeFinancialRecord();
  }
  
  // Reset yearly totals
  updatedCharacter.financialRecord.yearlyIncome = 0;
  updatedCharacter.financialRecord.yearlyExpenses = 0;
  
  // Add yearly salary
  if (character.job && character.salary && character.salary > 0) {
    const salaryAmount = character.salary * 1000; // Convert to dollars
    updatedCharacter = modifyBankBalance(
      updatedCharacter,
      salaryAmount,
      `Annual salary from ${character.job}`,
      'Salary',
      true
    );
  }
  
  // Process recurring expenses
  const recurringExpenses = getRecurringExpenses(character);
  
  for (const expense of recurringExpenses) {
    if (expense.startAge <= character.age && (!expense.endAge || expense.endAge >= character.age)) {
      const yearlyAmount = expense.frequency === 'Monthly' ? expense.amount * 12 : expense.amount;
      
      updatedCharacter = modifyBankBalance(
        updatedCharacter,
        -yearlyAmount,
        expense.name,
        expense.category as FinancialTransaction['category'],
        true
      );
    }
  }
  
  // Process loan payments
  if (updatedCharacter.financialRecord.currentLoans.length > 0) {
    const updatedLoans: Loan[] = [];
    
    for (const loan of updatedCharacter.financialRecord.currentLoans) {
      if (loan.remainingMonths > 0) {
        const yearlyPayment = loan.monthlyPayment * 12;
        
        updatedCharacter = modifyBankBalance(
          updatedCharacter,
          -yearlyPayment,
          `Loan payment to ${loan.lender}`,
          'Loan',
          true
        );
        
        const updatedLoan = { 
          ...loan, 
          remainingMonths: loan.remainingMonths - 12,
          amount: Math.max(0, loan.amount - yearlyPayment)
        };
        
        if (updatedLoan.remainingMonths > 0) {
          updatedLoans.push(updatedLoan);
        }
      }
    }
    
    updatedCharacter.financialRecord.currentLoans = updatedLoans;
  }
  
  // Random financial events
  if (Math.random() < 0.15) { // 15% chance of random expense
    const randomExpenses = [
      { name: 'Car repair', amount: 500 + Math.random() * 1500, category: 'Car Maintenance' },
      { name: 'Medical bill', amount: 200 + Math.random() * 800, category: 'Medical' },
      { name: 'Home repair', amount: 300 + Math.random() * 1200, category: 'Other' },
      { name: 'Traffic fine', amount: 50 + Math.random() * 200, category: 'Fine' },
      { name: 'Emergency expense', amount: 100 + Math.random() * 500, category: 'Other' }
    ];
    
    const randomExpense = randomExpenses[Math.floor(Math.random() * randomExpenses.length)];
    
    updatedCharacter = modifyBankBalance(
      updatedCharacter,
      -randomExpense.amount,
      randomExpense.name,
      randomExpense.category as FinancialTransaction['category']
    );
  }
  
  return updatedCharacter;
};

export const formatCurrency = (amount: number): string => {
  if (amount >= 1000000) {
    return `$${(amount / 1000000).toFixed(1)}M`;
  } else if (amount >= 1000) {
    return `$${(amount / 1000).toFixed(1)}k`;
  }
  return `$${amount.toLocaleString()}`;
};

// Investment system
export const createInvestment = (
  character: Character,
  type: Investment['type'],
  amount: number,
  description: string
): Character => {
  if (!canAfford(character, amount)) {
    return character;
  }

  let updatedCharacter = modifyBankBalance(
    character,
    -amount,
    `Investment in ${type}: ${description}`,
    'Investment'
  );

  if (!updatedCharacter.financialRecord) {
    updatedCharacter.financialRecord = initializeFinancialRecord();
  }

  const investment: Investment = {
    id: `inv_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    type,
    amount,
    currentValue: amount,
    annualReturn: getInvestmentReturn(type),
    yearPurchased: character.age,
    description
  };

  updatedCharacter.financialRecord.investments.push(investment);
  return updatedCharacter;
};

export const getInvestmentReturn = (type: Investment['type']): number => {
  const returns = {
    'Stocks': 0.08 + (Math.random() * 0.12), // 8-20% with volatility
    'Bonds': 0.03 + (Math.random() * 0.04), // 3-7%
    'Real Estate': 0.05 + (Math.random() * 0.08), // 5-13%
    'Crypto': 0.15 + (Math.random() * 0.25), // 15-40% (very volatile)
    'Savings Account': 0.01 + (Math.random() * 0.02), // 1-3%
    'CD': 0.02 + (Math.random() * 0.03) // 2-5%
  };
  return returns[type];
};

// Loan creation
export const createLoan = (
  character: Character,
  amount: number,
  type: Loan['type'],
  lender: string,
  interestRate: number,
  termMonths: number
): Character => {
  let updatedCharacter = modifyBankBalance(
    character,
    amount,
    `Loan from ${lender}`,
    'Loan'
  );

  if (!updatedCharacter.financialRecord) {
    updatedCharacter.financialRecord = initializeFinancialRecord();
  }

  const monthlyPayment = (amount * (interestRate / 12)) / (1 - Math.pow(1 + (interestRate / 12), -termMonths));

  const loan: Loan = {
    id: `loan_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    amount,
    originalAmount: amount,
    interestRate,
    monthlyPayment,
    remainingMonths: termMonths,
    type,
    lender,
    startYear: character.age
  };

  updatedCharacter.financialRecord.currentLoans.push(loan);
  return updatedCharacter;
};

// Financial analytics
export const getFinancialSummary = (character: Character): {
  netWorth: number;
  monthlyIncome: number;
  monthlyExpenses: number;
  totalAssets: number;
  totalLiabilities: number;
  debtToIncomeRatio: number;
} => {
  const financialRecord = character.financialRecord || initializeFinancialRecord();
  
  const totalAssets = financialRecord.bankBalance + 
    financialRecord.investments.reduce((sum, inv) => sum + inv.currentValue, 0) +
    character.assets.reduce((sum, asset) => sum + (asset.value || 0), 0);
  
  const totalLiabilities = financialRecord.currentLoans.reduce((sum, loan) => sum + loan.amount, 0);
  
  const netWorth = totalAssets - totalLiabilities;
  
  const monthlyIncome = (character.salary || 0) * 1000 / 12;
  const monthlyExpenses = getRecurringExpenses(character)
    .filter(exp => exp.frequency === 'Monthly')
    .reduce((sum, exp) => sum + exp.amount, 0);
  
  const debtToIncomeRatio = monthlyIncome > 0 ? 
    (financialRecord.currentLoans.reduce((sum, loan) => sum + loan.monthlyPayment, 0) / monthlyIncome) : 0;

  return {
    netWorth,
    monthlyIncome,
    monthlyExpenses,
    totalAssets,
    totalLiabilities,
    debtToIncomeRatio
  };
};

export const calculateLoanEligibility = (character: Character): { maxAmount: number; minInterest: number } => {
  let maxAmount = 0;
  let minInterest = 0.15; // 15% worst case
  
  // Base eligibility on job and salary
  if (character.job && character.salary > 0) {
    maxAmount = character.salary * 3; // 3x annual salary
    minInterest = 0.08; // 8% with job
    
    // Better rates for higher salaries
    if (character.salary > 100) minInterest = 0.04;
    else if (character.salary > 50) minInterest = 0.06;
  }
  
  // Education bonus
  if (character.education.completedStages.includes('university') || character.education.completedStages.includes('college')) {
    maxAmount *= 1.5;
    minInterest = Math.max(0.03, minInterest - 0.01);
  }
  
  // Age factor
  if (character.age < 18) {
    maxAmount = 0; // No loans for minors
  } else if (character.age < 25) {
    maxAmount *= 0.7; // Reduced for young adults
  }
  
  // Wealth factor
  if (character.wealth > 100) {
    minInterest = Math.max(0.03, minInterest - 0.02);
  }
  
  return { maxAmount: Math.floor(maxAmount), minInterest };
};
