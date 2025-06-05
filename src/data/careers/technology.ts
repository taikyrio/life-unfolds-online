
import { Career } from './types';

export const technologyCareers: Career[] = [
  {
    id: 'engineer',
    name: 'Engineer',
    category: 'Technology',
    description: 'Design and build solutions to complex problems',
    requirements: { education: 'Bachelor\'s Degree', age: 22 },
    levels: [
      {
        id: 'junior_engineer',
        title: 'Junior Engineer',
        salary: 65000,
        requirements: { age: 22, stats: { smarts: 80 } },
        promotionChance: 0.35
      },
      {
        id: 'engineer',
        title: 'Engineer',
        salary: 85000,
        requirements: { experience: 2, stats: { smarts: 85 } },
        promotionChance: 0.3
      },
      {
        id: 'senior_engineer',
        title: 'Senior Engineer',
        salary: 110000,
        requirements: { experience: 5, stats: { smarts: 90 } },
        promotionChance: 0.25
      },
      {
        id: 'lead_engineer',
        title: 'Lead Engineer',
        salary: 140000,
        requirements: { experience: 8, stats: { smarts: 92, relationships: 70 } },
        promotionChance: 0.2
      },
      {
        id: 'engineering_manager',
        title: 'Engineering Manager',
        salary: 180000,
        requirements: { experience: 12, stats: { smarts: 95, relationships: 80 } },
        promotionChance: 0.15
      }
    ]
  }
];
