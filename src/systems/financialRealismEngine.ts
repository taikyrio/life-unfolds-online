
import { Character } from '../types/character';

export interface FinancialResult {
  character: Character;
  netWorth: number;
  taxesPaid: number;
  monthlyExpenses: number;
}

export class FinancialRealismEngine {
  processYearlyFinances(character: Character): FinancialResult {
    const annualIncome = (character.salary || 0) * 1000;
    const taxRate = this.calculateTaxRate(annualIncome);
    const taxesPaid = annualIncome * taxRate;
    const netIncome = annualIncome - taxesPaid;
    
    const monthlyExpenses = this.calculateMonthlyExpenses(character);
    const annualExpenses = monthlyExpenses * 12;
    
    const netWorth = character.wealth * 1000 + (netIncome - annualExpenses);
    
    return {
      character: {
        ...character,
        wealth: Math.max(0, Math.floor(netWorth / 1000))
      },
      netWorth,
      taxesPaid,
      monthlyExpenses
    };
  }

  private calculateTaxRate(income: number): number {
    if (income <= 25000) return 0.1;
    if (income <= 50000) return 0.15;
    if (income <= 100000) return 0.22;
    if (income <= 200000) return 0.24;
    return 0.32;
  }

  private calculateMonthlyExpenses(character: Character): number {
    const baseExpenses = 2000; // Basic living expenses
    const lifestyleMultiplier = Math.max(1, character.wealth / 50);
    return baseExpenses * lifestyleMultiplier;
  }
}

export const financialEngine = new FinancialRealismEngine();
