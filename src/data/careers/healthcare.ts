
import { Career } from './types';

export const healthcareCareers: Career[] = [
  {
    id: 'doctor',
    name: 'Doctor',
    category: 'Healthcare',
    description: 'Heal and care for patients',
    requirements: { education: 'Medical Degree', age: 26 },
    levels: [
      {
        id: 'resident',
        title: 'Medical Resident',
        salary: 55000,
        requirements: { age: 26, stats: { smarts: 90, health: 70 } },
        promotionChance: 0.8
      },
      {
        id: 'attending_physician',
        title: 'Attending Physician',
        salary: 220000,
        requirements: { experience: 3, stats: { smarts: 92, relationships: 70 } },
        promotionChance: 0.3
      },
      {
        id: 'senior_physician',
        title: 'Senior Physician',
        salary: 280000,
        requirements: { experience: 8, stats: { smarts: 95, relationships: 75 } },
        promotionChance: 0.2
      },
      {
        id: 'department_chief',
        title: 'Department Chief',
        salary: 350000,
        requirements: { experience: 15, stats: { smarts: 97, relationships: 85 } },
        promotionChance: 0.1
      }
    ]
  }
];
