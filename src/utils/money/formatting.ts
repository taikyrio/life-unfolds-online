
// Money Formatting Utilities

// Format money consistently throughout the app
export const formatMoney = (amount: number): string => {
  if (amount === 0) return '$0';
  if (amount < 1000) return `$${amount}`;
  if (amount < 1000000) return `$${(amount / 1000).toFixed(1)}k`;
  return `$${(amount / 1000000).toFixed(1)}M`;
};

// Get financial status description
export const getFinancialStatus = (wealth: number): { status: string; color: string } => {
  if (wealth < 0) return { status: 'In Debt', color: 'text-red-600' };
  if (wealth < 1000) return { status: 'Poor', color: 'text-red-500' };
  if (wealth < 10000) return { status: 'Struggling', color: 'text-orange-500' };
  if (wealth < 50000) return { status: 'Middle Class', color: 'text-yellow-600' };
  if (wealth < 100000) return { status: 'Well Off', color: 'text-green-600' };
  if (wealth < 500000) return { status: 'Wealthy', color: 'text-green-700' };
  return { status: 'Rich', color: 'text-emerald-600' };
};
