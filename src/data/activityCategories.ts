import { ActivityCategory } from '../types/activities';

export const getActivityCategories = (age: number, codingSkill: number): ActivityCategory[] => {
  const categories: ActivityCategory[] = [
    {
      id: 'basic',
      title: 'Basic Activities',
      emoji: '🎮',
      activities: [
        {
          id: 'study_harder',
          title: 'Study Harder',
          description: 'Focus on your studies',
          emoji: '📚',
          minAge: 6,
          effects: { smarts: 8, happiness: -3 },
          category: 'education'
        },
        {
          id: 'workout',
          title: 'Work Out',
          description: 'Exercise to stay fit',
          emoji: '💪',
          minAge: 12,
          effects: { health: 10, happiness: 5, wealth: -20 },
          category: 'health'
        },
        {
          id: 'socialize',
          title: 'Socialize',
          description: 'Spend time with friends',
          emoji: '👥',
          effects: { relationships: 12, happiness: 10 },
          category: 'social'
        }
      ]
    },
    {
      id: 'crime',
      title: 'Criminal Activities',
      emoji: '🔫',
      activities: [
        {
          id: 'pickpocket',
          title: 'Pickpocket',
          description: 'Steal from unsuspecting victims',
          emoji: '💰',
          minAge: 18,
          effects: { wealth: 100, happiness: -5 },
          category: 'crime',
          consequences: { arrestChance: 15, crimeType: 'pickpocket' }
        },
        {
          id: 'shoplift',
          title: 'Shoplift',
          description: 'Steal merchandise from stores',
          emoji: '🛍️',
          minAge: 18,
          effects: { wealth: 150, happiness: -3 },
          category: 'crime',
          consequences: { arrestChance: 20, crimeType: 'shoplift' }
        },
        {
          id: 'burglary',
          title: 'Burglary',
          description: 'Break into homes and steal valuables',
          emoji: '🏠',
          minAge: 18,
          effects: { wealth: 500, happiness: -10 },
          category: 'crime',
          consequences: { arrestChance: 35, crimeType: 'burglary' }
        },
        {
          id: 'grand_theft_auto',
          title: 'Grand Theft Auto',
          description: 'Steal expensive vehicles',
          emoji: '🚗',
          minAge: 18,
          effects: { wealth: 1000, happiness: -15 },
          category: 'crime',
          consequences: { arrestChance: 45, crimeType: 'grand_theft_auto' }
        },
        {
          id: 'bank_robbery',
          title: 'Bank Robbery',
          description: 'Rob a bank for a huge payout',
          emoji: '🏦',
          minAge: 18,
          effects: { wealth: 5000, happiness: -25 },
          category: 'crime',
          consequences: { arrestChance: 70, crimeType: 'bank_robbery' }
        }
      ]
    }
  ];

  if (age <= 5) {
    categories.push({
      id: 'toddler',
      title: 'Toddler Activities',
      emoji: '🧸',
      activities: [
        {
          id: 'play_toys',
          title: 'Play with Toys',
          description: 'Have fun with your toys',
          emoji: '🧸',
          maxAge: 8,
          effects: { happiness: 10, smarts: 2 },
          category: 'play'
        },
        {
          id: 'nap',
          title: 'Take a Nap',
          description: 'Rest and recharge',
          emoji: '😴',
          maxAge: 10,
          effects: { health: 10, happiness: 5 },
          category: 'rest'
        }
      ]
    });
  }

  return categories;
};