
import { MoneyTransaction } from './types';

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
