
import { Character } from '../types/game';

export interface LoanApplication {
  amount: number;
  approved: boolean;
  interestRate: number;
  monthlyPayment: number;
  reason?: string;
}

export const calculateYearlySalaryIncrease = (character: Character): number => {
  if (!character.job || character.salary === 0) return 0;
  
  // Convert yearly salary to actual yearly amount
  // If salary is stored as yearly amount, return it directly
  // If it's stored as some other format, convert it
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
    if (character.salary > 50000) score += 20;
    else if (character.salary > 30000) score += 10;
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
  if (character.education.includes('College') || character.education.includes('University')) score += 10;
  else if (character.education.includes('High School')) score += 5;

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

export const processYearlyFinances = (character: Character): Character => {
  const updatedCharacter = { ...character };
  
  // Add yearly salary to wealth
  if (character.job && character.salary > 0) {
    updatedCharacter.wealth += character.salary;
  }
  
  // Deduct living expenses based on age and lifestyle
  let livingExpenses = 0;
  if (character.age >= 18) {
    livingExpenses = Math.max(12000, character.salary * 0.3); // At least $12k/year for living
  } else if (character.age >= 16) {
    livingExpenses = 3000; // Minimal expenses for teens
  }
  
  updatedCharacter.wealth = Math.max(0, updatedCharacter.wealth - livingExpenses);
  
  return updatedCharacter;
};

export const formatCurrency = (amount: number): string => {
  if (amount >= 1000000) {
    return `$${(amount / 1000000).toFixed(1)}M`;
  } else if (amount >= 1000) {
    return `$${(amount / 1000).toFixed(0)}K`;
  }
  return `$${amount.toLocaleString()}`;
};
