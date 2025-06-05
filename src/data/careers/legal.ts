
import { Career } from './types';

export const legalCareers: Career[] = [
  {
    id: 'lawyer',
    name: 'Lawyer',
    category: 'Legal',
    description: 'Advocate for justice and defend clients',
    requirements: { education: 'Law Degree', age: 25 },
    levels: [
      {
        id: 'junior_associate',
        title: 'Junior Associate',
        salary: 85000,
        requirements: { age: 25, stats: { smarts: 85, relationships: 60 } },
        promotionChance: 0.4
      },
      {
        id: 'associate',
        title: 'Associate',
        salary: 150000,
        requirements: { experience: 3, stats: { smarts: 88, relationships: 70 } },
        promotionChance: 0.3
      },
      {
        id: 'senior_associate',
        title: 'Senior Associate',
        salary: 220000,
        requirements: { experience: 6, stats: { smarts: 92, relationships: 75 } },
        promotionChance: 0.2
      },
      {
        id: 'partner',
        title: 'Partner',
        salary: 400000,
        requirements: { experience: 12, stats: { smarts: 95, relationships: 85 } },
        promotionChance: 0.1
      }
    ]
  }
];
