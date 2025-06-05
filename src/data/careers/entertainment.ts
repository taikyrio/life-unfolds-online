
import { Career } from './types';

export const entertainmentCareers: Career[] = [
  {
    id: 'actor',
    name: 'Actor',
    category: 'Entertainment',
    description: 'Bring characters to life on stage and screen',
    requirements: { age: 18 },
    levels: [
      {
        id: 'background_extra',
        title: 'Background Extra',
        salary: 18000,
        requirements: { age: 18, stats: { looks: 50 } },
        promotionChance: 0.2
      },
      {
        id: 'small_roles',
        title: 'Small Role Actor',
        salary: 35000,
        requirements: { experience: 2, stats: { looks: 60, happiness: 50 } },
        promotionChance: 0.15
      },
      {
        id: 'supporting_actor',
        title: 'Supporting Actor',
        salary: 75000,
        requirements: { experience: 5, stats: { looks: 70, happiness: 60, fame: 30 } },
        promotionChance: 0.1
      },
      {
        id: 'lead_actor',
        title: 'Lead Actor',
        salary: 200000,
        requirements: { experience: 8, stats: { looks: 80, happiness: 70, fame: 60 } },
        promotionChance: 0.05
      },
      {
        id: 'movie_star',
        title: 'Movie Star',
        salary: 2000000,
        requirements: { experience: 12, stats: { looks: 90, happiness: 75, fame: 85 } },
        promotionChance: 0.02
      }
    ]
  }
];
