
import { MoneyState, MoneyTransaction, SpendingResult, MonthlyFinanceResult } from './types';
import { calculateLivingExpenses } from './calculations';
import { generateRandomFinancialEvent } from './events';
import { formatMoney } from './formatting';

// Process monthly money changes (called on age up)
export const processMonthlyFinances = (character: any, moneyState: MoneyState): MonthlyFinanceResult => {
  const monthlyExpenses = calculateLivingExpenses(character);
  const randomEvent = generateRandomFinancialEvent(character);
  
  let newBalance = moneyState.balance;
  let message = '';
  let monthlyIncome = 0;
  
  // Add job income if employed
  if (character.job || character.career?.currentJob) {
    const job = character.job || character.career?.currentJob;
    const monthlySalary = Math.floor((job.salary || 30000) / 12);
    monthlyIncome = monthlySalary;
    newBalance += monthlySalary;
    message = `Salary: +${formatMoney(monthlySalary)}`;
  }
  
  // Deduct living expenses if character is adult
  if (character.age >= 18) {
    newBalance -= monthlyExpenses;
    message += message ? ` | Expenses: -${formatMoney(monthlyExpenses)}` : `Monthly expenses: -${formatMoney(monthlyExpenses)}`;
  }
  
  // Process random event
  if (randomEvent) {
    newBalance += randomEvent.amount;
    message += message ? ` | ${randomEvent.description}: ${randomEvent.amount > 0 ? '+' : ''}${formatMoney(randomEvent.amount)}` : randomEvent.description;
  }
  
  const newMoneyState: MoneyState = {
    ...moneyState,
    balance: Math.max(0, newBalance), // Can't go negative
    monthlyIncome,
    monthlyExpenses,
    transactions: [
      ...moneyState.transactions.slice(-50), // Keep last 50 transactions
      ...(randomEvent ? [randomEvent] : [])
    ]
  };
  
  return { newMoneyState, transaction: randomEvent, message };
};

// Handle spending money on activities/purchases
export const spendMoney = (
  character: any, 
  amount: number, 
  source: string, 
  description: string
): SpendingResult => {
  if (character.wealth < amount) {
    return {
      success: false,
      newBalance: character.wealth,
      message: `Not enough money! Need ${formatMoney(amount)}, have ${formatMoney(character.wealth)}`
    };
  }
  
  const newBalance = character.wealth - amount;
  return {
    success: true,
    newBalance,
    message: `Spent ${formatMoney(amount)} on ${description}`
  };
};
