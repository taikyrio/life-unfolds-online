
import { Career } from './types';

export const entryLevelCareers: Career[] = [
  {
    id: 'fast_food',
    name: 'Fast Food Worker',
    category: 'Entry Level',
    description: 'Entry-level position in food service',
    requirements: { age: 16 },
    levels: [
      {
        id: 'crew_member',
        title: 'Crew Member',
        salary: 22000,
        requirements: { age: 16 },
        promotionChance: 0.3
      },
      {
        id: 'shift_leader',
        title: 'Shift Leader',
        salary: 26000,
        requirements: { experience: 1, stats: { smarts: 40 } },
        promotionChance: 0.25
      },
      {
        id: 'assistant_manager',
        title: 'Assistant Manager',
        salary: 32000,
        requirements: { experience: 3, stats: { smarts: 60, relationships: 50 } },
        promotionChance: 0.2
      },
      {
        id: 'store_manager',
        title: 'Store Manager',
        salary: 45000,
        requirements: { experience: 5, stats: { smarts: 70, relationships: 60 } },
        promotionChance: 0.15
      }
    ]
  },
  {
    id: 'retail',
    name: 'Retail Associate',
    category: 'Entry Level',
    description: 'Customer service and sales position',
    requirements: { age: 16 },
    levels: [
      {
        id: 'sales_associate',
        title: 'Sales Associate',
        salary: 24000,
        requirements: { age: 16 },
        promotionChance: 0.3
      },
      {
        id: 'senior_associate',
        title: 'Senior Associate',
        salary: 28000,
        requirements: { experience: 1, stats: { relationships: 45 } },
        promotionChance: 0.25
      },
      {
        id: 'department_supervisor',
        title: 'Department Supervisor',
        salary: 35000,
        requirements: { experience: 3, stats: { smarts: 55, relationships: 55 } },
        promotionChance: 0.2
      },
      {
        id: 'store_manager',
        title: 'Store Manager',
        salary: 52000,
        requirements: { experience: 5, stats: { smarts: 70, relationships: 65 } },
        promotionChance: 0.15
      }
    ]
  }
];
