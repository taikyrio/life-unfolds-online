// BitLife-style Dynamic Money System
export interface MoneyTransaction {
  amount: number;
  type: 'income' | 'expense' | 'bonus' | 'penalty';
  source: string;
  description: string;
  timestamp: number;
}

export interface MoneyState {
  balance: number;
  monthlyIncome: number;
  monthlyExpenses: number;
  transactions: MoneyTransaction[];
  lastSalaryAge: number;
}

// Format money consistently throughout the app
export const formatMoney = (amount: number): string => {
  if (amount === 0) return '$0';
  if (amount < 1000) return `$${amount}`;
  if (amount < 1000000) return `$${(amount / 1000).toFixed(1)}k`;
  return `$${(amount / 1000000).toFixed(1)}M`;
};

// Calculate age-based salary progression
export const calculateSalaryProgression = (baseSalary: number, age: number, experience: number): number => {
  const ageMultiplier = Math.max(1, 1 + ((age - 18) * 0.02)); // 2% increase per year after 18
  const experienceMultiplier = Math.max(1, 1 + (experience * 0.05)); // 5% increase per year of experience
  return Math.floor(baseSalary * ageMultiplier * experienceMultiplier);
};

// Random financial events based on age and circumstances
export const generateRandomFinancialEvent = (character: any): MoneyTransaction | null => {
  const events = [
    // Positive events
    { 
      probability: 0.05, 
      amount: () => Math.floor(Math.random() * 500) + 100,
      type: 'bonus' as const,
      source: 'lottery',
      description: 'Won a small lottery prize!'
    },
    { 
      probability: 0.03, 
      amount: () => Math.floor(Math.random() * 2000) + 500,
      type: 'bonus' as const,
      source: 'inheritance',
      description: 'Received a small inheritance'
    },
    { 
      probability: 0.02, 
      amount: () => Math.floor(Math.random() * 1000) + 200,
      type: 'bonus' as const,
      source: 'bonus',
      description: 'Work performance bonus'
    },
    // Negative events
    { 
      probability: 0.04, 
      amount: () => -(Math.floor(Math.random() * 800) + 200),
      type: 'expense' as const,
      source: 'medical',
      description: 'Unexpected medical bill'
    },
    { 
      probability: 0.03, 
      amount: () => -(Math.floor(Math.random() * 1200) + 300),
      type: 'expense' as const,
      source: 'car',
      description: 'Car repair needed'
    },
    { 
      probability: 0.02, 
      amount: () => -(Math.floor(Math.random() * 600) + 150),
      type: 'expense' as const,
      source: 'fine',
      description: 'Traffic ticket fine'
    }
  ];

  for (const event of events) {
    if (Math.random() < event.probability) {
      const amount = event.amount();
      return {
        amount,
        type: event.type,
        source: event.source,
        description: event.description,
        timestamp: Date.now()
      };
    }
  }
  
  return null;
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

// Process monthly money changes (called on age up)
export const processMonthlyFinances = (character: any, moneyState: MoneyState): { 
  newMoneyState: MoneyState, 
  transaction: MoneyTransaction | null,
  message: string 
} => {
  const monthlyExpenses = calculateLivingExpenses(character);
  const randomEvent = generateRandomFinancialEvent(character);
  
  let newBalance = moneyState.balance;
  let message = '';
  
  // Deduct living expenses if character is adult
  if (character.age >= 18) {
    newBalance -= monthlyExpenses;
    message = `Monthly expenses: -${formatMoney(monthlyExpenses)}`;
  }
  
  // Add job income if employed
  if (character.career?.currentJob) {
    const monthlySalary = Math.floor(character.career.currentJob.salary / 12);
    newBalance += monthlySalary;
    message += message ? ` | Salary: +${formatMoney(monthlySalary)}` : `Salary: +${formatMoney(monthlySalary)}`;
  }
  
  // Process random event
  if (randomEvent) {
    newBalance += randomEvent.amount;
    message += message ? ` | ${randomEvent.description}: ${randomEvent.amount > 0 ? '+' : ''}${formatMoney(randomEvent.amount)}` : randomEvent.description;
  }
  
  const newMoneyState: MoneyState = {
    ...moneyState,
    balance: Math.max(0, newBalance), // Can't go negative
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
): { success: boolean; newBalance: number; message: string } => {
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

// Initialize money state for new character
export const initializeMoneyState = (): MoneyState => ({
  balance: 0,
  monthlyIncome: 0,
  monthlyExpenses: 0,
  transactions: [],
  lastSalaryAge: 0
});