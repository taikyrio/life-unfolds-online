
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
          minAge: 6
        },
        {
          id: 'gym',
          title: 'Go to the Gym',
          description: 'Work out and improve your health',
          emoji: '💪',
          minAge: 14,
          minWealth: 30
        },
        {
          id: 'meditate',
          title: 'Meditate',
          description: 'Find inner peace and happiness',
          emoji: '🧘',
          minAge: 10
        },
        {
          id: 'coding_practice',
          title: 'Practice Coding',
          description: 'Learn programming skills for future opportunities',
          emoji: '💻',
          minAge: 8
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
          minAge: 16
        },
        {
          id: 'date_night',
          title: 'Date Night',
          description: 'Have a romantic evening with your partner',
          emoji: '🌹',
          minAge: 16,
          minWealth: 50,
          requiresPartner: true
        },
        {
          id: 'party',
          title: 'Go to a Party',
          description: 'Have fun but risk your health',
          emoji: '🎉',
          minAge: 16
        },
        {
          id: 'volunteer',
          title: 'Volunteer',
          description: 'Help others and feel good about yourself',
          emoji: '🤝',
          minAge: 14
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
          minWealth: 15
        },
        {
          id: 'shopping',
          title: 'Go Shopping',
          description: 'Treat yourself to something nice',
          emoji: '🛍️',
          minAge: 12,
          minWealth: 50
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
        minAge: 12
      },
      {
        id: 'burglary',
        title: 'Burglary',
        description: 'Break into homes and steal valuables',
        emoji: '🏠',
        minAge: 14
      },
      {
        id: 'bank_robbery',
        title: 'Bank Robbery',
        description: 'Rob a bank for big money (high risk)',
        emoji: '🏦',
        minAge: 18,
        minWealth: 10
      },
      {
        id: 'extortion',
        title: 'Extortion',
        description: 'Collect protection money from businesses',
        emoji: '💰',
        minAge: 16
      },
      {
        id: 'murder_family',
        title: 'Murder Family Member',
        description: 'Kill a family member (extremely dangerous)',
        emoji: '🔪',
        minAge: 16
      },
      {
        id: 'murder_stranger',
        title: 'Murder Stranger',
        description: 'Kill a random person (very risky)',
        emoji: '💀',
        minAge: 16
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
          minAge: 14
        },
        {
          id: 'identity_theft',
          title: 'Identity Theft',
          description: 'Steal personal information for profit',
          emoji: '🆔',
          minAge: 14
        },
        {
          id: 'ransomware',
          title: 'Deploy Ransomware',
          description: 'Lock computer systems for ransom',
          emoji: '🔒',
          minAge: 16
        },
        {
          id: 'corporate_espionage',
          title: 'Corporate Espionage',
          description: 'Steal company secrets and data',
          emoji: '🕵️',
          minAge: 18
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
          minWealth: 100
        },
        {
          id: 'bar',
          title: 'Go to Bar',
          description: 'Have some drinks and socialize',
          emoji: '🍺',
          minAge: 21,
          minWealth: 30
        }
      ]
    });
  }

  return categories;
};
