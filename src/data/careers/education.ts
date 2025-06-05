
import { Career } from './types';

export const educationCareers: Career[] = [
  {
    id: 'teacher',
    name: 'Teacher',
    category: 'Education',
    description: 'Educate and inspire the next generation',
    requirements: { education: 'Bachelor\'s Degree', age: 22 },
    levels: [
      {
        id: 'substitute_teacher',
        title: 'Substitute Teacher',
        salary: 32000,
        requirements: { age: 22, stats: { smarts: 70 } },
        promotionChance: 0.4
      },
      {
        id: 'classroom_teacher',
        title: 'Classroom Teacher',
        salary: 45000,
        requirements: { experience: 1, stats: { smarts: 75, relationships: 60 } },
        promotionChance: 0.25
      },
      {
        id: 'senior_teacher',
        title: 'Senior Teacher',
        salary: 55000,
        requirements: { experience: 5, stats: { smarts: 80, relationships: 70 } },
        promotionChance: 0.2
      },
      {
        id: 'department_head',
        title: 'Department Head',
        salary: 68000,
        requirements: { experience: 8, stats: { smarts: 85, relationships: 75 } },
        promotionChance: 0.15
      },
      {
        id: 'principal',
        title: 'Principal',
        salary: 85000,
        requirements: { experience: 12, stats: { smarts: 90, relationships: 80 } },
        promotionChance: 0.1
      }
    ]
  }
];
