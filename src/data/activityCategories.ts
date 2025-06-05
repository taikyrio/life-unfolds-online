
import { ActivityCategory } from '../types/activities';

export const getActivityCategories = (characterAge: number, codingSkill: number): ActivityCategory[] => {
  const categories: ActivityCategory[] = [
    {
      id: 'mind',
      title: 'Mind & Body',
      emoji: '🧠',
      activities: [
        {
          id: 'study',
          title: 'Study',
          description: 'Hit the books and increase your intelligence',
          emoji: '📚',
          minAge: 6,
          effects: { smarts: 5, happiness: -2 },
          category: 'mind'
        },
        {
          id: 'gym',
          title: 'Go to the Gym',
          description: 'Work out and improve your health',
          emoji: '💪',
          minAge: 14,
          minWealth: 30,
          effects: { health: 10, looks: 5, wealth: -30 },
          category: 'mind'
        },
        {
          id: 'meditate',
          title: 'Meditate',
          description: 'Find inner peace and happiness',
          emoji: '🧘',
          minAge: 10,
          effects: { happiness: 8, health: 3 },
          category: 'mind'
        },
        {
          id: 'coding_practice',
          title: 'Practice Coding',
          description: 'Learn programming skills for future opportunities',
          emoji: '💻',
          minAge: 8,
          effects: { smarts: 6, happiness: -1 },
          category: 'mind'
        }
      ]
    },
    {
      id: 'social',
      title: 'Social',
      emoji: '👥',
      activities: [
        {
          id: 'find_love',
          title: 'Find Love',
          description: 'Look for someone special',
          emoji: '💕',
          minAge: 16,
          effects: { happiness: 10, relationships: 15 },
          category: 'social'
        },
        {
          id: 'date_night',
          title: 'Date Night',
          description: 'Have a romantic evening with your partner',
          emoji: '🌹',
          minAge: 16,
          minWealth: 50,
          requiresPartner: true,
          effects: { happiness: 15, relationships: 10, wealth: -50 },
          category: 'social'
        },
        {
          id: 'party',
          title: 'Go to a Party',
          description: 'Have fun but risk your health',
          emoji: '🎉',
          minAge: 16,
          effects: { happiness: 12, health: -5, relationships: 8 },
          category: 'social'
        },
        {
          id: 'volunteer',
          title: 'Volunteer',
          description: 'Help others and feel good about yourself',
          emoji: '🤝',
          minAge: 14,
          effects: { happiness: 10, relationships: 5 },
          category: 'social'
        }
      ]
    },
    {
      id: 'entertainment',
      title: 'Entertainment',
      emoji: '🎮',
      activities: [
        {
          id: 'movie',
          title: 'Watch a Movie',
          description: 'Relax and enjoy some entertainment',
          emoji: '🎬',
          minAge: 5,
          minWealth: 15,
          effects: { happiness: 8, wealth: -15 },
          category: 'entertainment'
        },
        {
          id: 'shopping',
          title: 'Go Shopping',
          description: 'Treat yourself to something nice',
          emoji: '🛍️',
          minAge: 12,
          minWealth: 50,
          effects: { happiness: 12, looks: 3, wealth: -50 },
          category: 'entertainment'
        }
      ]
    }
  ];

  // Add crime category
  categories.push({
    id: 'crime',
    title: 'Criminal Activities',
    emoji: '🔫',
    activities: [
      {
        id: 'pickpocket',
        title: 'Pickpocket',
        description: 'Steal from unsuspecting victims',
        emoji: '👛',
        minAge: 12,
        effects: { wealth: 25, notoriety: 2 },
        category: 'crime'
      },
      {
        id: 'burglary',
        title: 'Burglary',
        description: 'Break into homes and steal valuables',
        emoji: '🏠',
        minAge: 14,
        effects: { wealth: 100, notoriety: 5 },
        category: 'crime'
      },
      {
        id: 'bank_robbery',
        title: 'Bank Robbery',
        description: 'Rob a bank for big money (high risk)',
        emoji: '🏦',
        minAge: 18,
        minWealth: 10,
        effects: { wealth: 500, notoriety: 20 },
        category: 'crime'
      },
      {
        id: 'extortion',
        title: 'Extortion',
        description: 'Collect protection money from businesses',
        emoji: '💰',
        minAge: 16,
        effects: { wealth: 75, notoriety: 8 },
        category: 'crime'
      },
      {
        id: 'murder_family',
        title: 'Murder Family Member',
        description: 'Kill a family member (extremely dangerous)',
        emoji: '🔪',
        minAge: 16,
        effects: { notoriety: 50, happiness: -30 },
        category: 'crime'
      },
      {
        id: 'murder_stranger',
        title: 'Murder Stranger',
        description: 'Kill a random person (very risky)',
        emoji: '💀',
        minAge: 16,
        effects: { notoriety: 30, happiness: -20 },
        category: 'crime'
      }
    ]
  });

  // Add cybercrime if eligible
  if (characterAge >= 14 && codingSkill >= 20) {
    categories.push({
      id: 'cybercrime',
      title: 'Cybercrime',
      emoji: '💻',
      activities: [
        {
          id: 'hack_bank',
          title: 'Hack Bank',
          description: 'Steal money through digital theft',
          emoji: '🏧',
          minAge: 14,
          effects: { wealth: 200, notoriety: 10, smarts: 2 },
          category: 'cybercrime'
        },
        {
          id: 'identity_theft',
          title: 'Identity Theft',
          description: 'Steal personal information for profit',
          emoji: '🆔',
          minAge: 14,
          effects: { wealth: 50, notoriety: 5, smarts: 1 },
          category: 'cybercrime'
        },
        {
          id: 'ransomware',
          title: 'Deploy Ransomware',
          description: 'Lock computer systems for ransom',
          emoji: '🔒',
          minAge: 16,
          effects: { wealth: 400, notoriety: 15, smarts: 3 },
          category: 'cybercrime'
        },
        {
          id: 'corporate_espionage',
          title: 'Corporate Espionage',
          description: 'Steal company secrets and data',
          emoji: '🕵️',
          minAge: 18,
          effects: { wealth: 150, notoriety: 8, smarts: 2 },
          category: 'cybercrime'
        }
      ]
    });
  }

  // Add adult activities if character is 18+
  if (characterAge >= 18) {
    categories.push({
      id: 'adult',
      title: 'Adult Activities',
      emoji: '🏦',
      activities: [
        {
          id: 'casino',
          title: 'Go to Casino',
          description: 'Try your luck but risk losing money',
          emoji: '🎰',
          minAge: 21,
          minWealth: 100,
          effects: { happiness: 5, wealth: -50 },
          category: 'adult'
        },
        {
          id: 'bar',
          title: 'Go to Bar',
          description: 'Have some drinks and socialize',
          emoji: '🍺',
          minAge: 21,
          minWealth: 30,
          effects: { happiness: 8, health: -3, wealth: -30 },
          category: 'adult'
        }
      ]
    });
  }

  return categories;
};
