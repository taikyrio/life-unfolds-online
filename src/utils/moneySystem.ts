// BitLife-style Dynamic Money System - Refactored
// This file maintains backward compatibility by re-exporting from the new modular structure

export * from './money';

// Backward compatibility exports
export type {
  MoneyTransaction,
  MoneyState,
  SpendingResult,
  FinancialStatus,
  MonthlyFinanceResult
} from './money/types';

export {
  formatMoney,
  getFinancialStatus,
  calculateSalaryProgression,
  calculateLivingExpenses,
  initializeMoneyState,
  generateRandomFinancialEvent,
  processMonthlyFinances,
  spendMoney
} from './money';