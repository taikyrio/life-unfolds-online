
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
