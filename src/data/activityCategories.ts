

export interface ActivityOption {
  id: string;
  title: string;
  description: string;
  emoji: string;
  minAge?: number;
  maxAge?: number;
  minWealth?: number;
  requiresPartner?: boolean;
}

export interface ActivityCategory {
  id: string;
  title: string;
  emoji: string;
  activities: ActivityOption[];
}

export const getActivityCategories = (age: number, codingSkill: number): ActivityCategory[] => {
  return [
    {
      id: 'general',
      title: 'General Activities',
      emoji: '🎯',
      activities: [
        {
          id: 'workout',
          title: 'Work Out',
          description: 'Exercise to improve your health',
          emoji: '💪',
          minAge: 10
        },
        {
          id: 'read_book',
          title: 'Read a Book',
          description: 'Expand your knowledge',
          emoji: '📚',
          minAge: 5
        },
        {
          id: 'socialize',
          title: 'Socialize',
          description: 'Meet new people and make friends',
          emoji: '👥',
          minAge: 12
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
          emoji: '👜',
          minAge: 14
        },
        {
          id: 'burglary',
          title: 'Burglary',
          description: 'Break into homes and steal valuables',
          emoji: '🏠',
          minAge: 16
        }
      ]
    }
  ];
};

