
// Main Money System Exports
export * from './types';
export * from './formatting';
export * from './calculations';
export * from './events';
export * from './transactions';

// Re-export for backward compatibility
export { formatMoney, getFinancialStatus } from './formatting';
export { calculateSalaryProgression, calculateLivingExpenses, initializeMoneyState } from './calculations';
export { generateRandomFinancialEvent } from './events';
export { processMonthlyFinances, spendMoney } from './transactions';
