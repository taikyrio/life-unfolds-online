
import { Career } from './types';

export const businessCareers: Career[] = [
  {
    id: 'entrepreneur',
    name: 'Entrepreneur',
    category: 'Business',
    description: 'Build your own business empire',
    requirements: { age: 18 },
    levels: [
      {
        id: 'startup_founder',
        title: 'Startup Founder',
        salary: 25000,
        requirements: { age: 18, stats: { smarts: 60, relationships: 50 } },
        promotionChance: 0.3
      },
      {
        id: 'small_business_owner',
        title: 'Small Business Owner',
        salary: 55000,
        requirements: { experience: 3, stats: { smarts: 70, relationships: 60 } },
        promotionChance: 0.25
      },
      {
        id: 'successful_entrepreneur',
        title: 'Successful Entrepreneur',
        salary: 150000,
        requirements: { experience: 6, stats: { smarts: 80, relationships: 70 } },
        promotionChance: 0.2
      },
      {
        id: 'business_mogul',
        title: 'Business Mogul',
        salary: 500000,
        requirements: { experience: 10, stats: { smarts: 90, relationships: 80 } },
        promotionChance: 0.1
      },
      {
        id: 'billionaire_ceo',
        title: 'Billionaire CEO',
        salary: 5000000,
        requirements: { experience: 15, stats: { smarts: 95, relationships: 85 } },
        promotionChance: 0.05
      }
    ]
  }
];
