
import { MoneyState } from './types';

// Calculate age-based salary progression
export const calculateSalaryProgression = (baseSalary: number, age: number, experience: number): number => {
  const ageMultiplier = Math.max(1, 1 + ((age - 18) * 0.02)); // 2% increase per year after 18
  const experienceMultiplier = Math.max(1, 1 + (experience * 0.05)); // 5% increase per year of experience
  return Math.floor(baseSalary * ageMultiplier * experienceMultiplier);
};

// Calculate monthly living expenses based on age and lifestyle
export const calculateLivingExpenses = (character: any): number => {
  let baseExpenses = 0;
  
  if (character.age < 18) {
    baseExpenses = 0; // Living with parents
  } else if (character.age < 25) {
    baseExpenses = 800; // Young adult, shared housing
  } else if (character.age < 35) {
    baseExpenses = 1500; // Adult, own place
  } else {
    baseExpenses = 2200; // Mature adult, higher lifestyle
  }

  // Adjust based on wealth level for lifestyle inflation
  const wealthMultiplier = 1 + (character.wealth / 100000);
  return Math.floor(baseExpenses * wealthMultiplier);
};

// Initialize money state for new character
export const initializeMoneyState = (): MoneyState => ({
  balance: 0,
  monthlyIncome: 0,
  monthlyExpenses: 0,
  transactions: [],
  lastSalaryAge: 0
});
