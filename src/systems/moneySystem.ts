
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

export const processYearlyFinances = (character: Character): Character => {
  const updatedCharacter = { ...character };
  
  // Add yearly salary to wealth
  if (character.job && character.salary > 0) {
    updatedCharacter.wealth += character.salary;
  }
  
  // Deduct living expenses based on age and lifestyle
  let livingExpenses = 0;
  if (character.age >= 18) {
    // Base living expenses
    livingExpenses = 12;
    
    // Add expenses for assets
    const hasHouse = character.assets.some(asset => asset.type === 'property');
    const hasCar = character.assets.some(asset => asset.type === 'vehicle');
    
    if (hasHouse) livingExpenses += 8; // Property taxes, maintenance
    if (hasCar) livingExpenses += 3; // Insurance, gas, maintenance
    
    // Reduce expenses if living with family
    if (character.age < 25 && character.familyMembers.some(m => m.relationship === 'mother' || m.relationship === 'father')) {
      livingExpenses = Math.floor(livingExpenses * 0.5);
    }
  } else if (character.age >= 16) {
    livingExpenses = 2; // Minimal expenses for teens
  }
  
  updatedCharacter.wealth = Math.max(0, updatedCharacter.wealth - livingExpenses);
  
  return updatedCharacter;
};

export const formatCurrency = (amount: number): string => {
  if (amount >= 1000) {
    return `$${(amount / 1000).toFixed(1)}M`;
  } else if (amount >= 100) {
    return `$${amount}k`;
  }
  return `$${amount}k`;
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
