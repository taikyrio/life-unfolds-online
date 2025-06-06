
import { LifeEvent } from '../../types/game';

export const expandedSchoolEvents: LifeEvent[] = [
  {
    id: 'school_bully',
    title: 'School Bully',
    description: 'A bigger kid at school has been picking on you.',
    emoji: '😠',
    category: 'social',
    minAge: 6,
    maxAge: 16,
    choices: [
      {
        id: 'fight_back',
        text: 'Stand up and fight back',
        effects: [
          { type: 'stat', target: 'happiness', value: 10 },
          { type: 'stat', target: 'health', value: -10 },
          { type: 'stat', target: 'relationships', value: 5 }
        ],
        emoji: '👊',
        consequences: ['You earned respect but got in trouble with teachers.']
      },
      {
        id: 'tell_teacher',
        text: 'Tell a teacher',
        effects: [
          { type: 'stat', target: 'happiness', value: 5 },
          { type: 'stat', target: 'relationships', value: -5 },
          { type: 'stat', target: 'health', value: 5 }
        ],
        emoji: '👨‍🏫',
        consequences: ['The bullying stopped but some kids called you a snitch.']
      },
      {
        id: 'make_friends',
        text: 'Try to befriend the bully',
        effects: [
          { type: 'stat', target: 'relationships', value: 15 },
          { type: 'stat', target: 'happiness', value: 10 }
        ],
        emoji: '🤝',
        consequences: ['You discovered they were just having problems at home.']
      }
    ]
  },
  {
    id: 'first_smartphone',
    title: 'First Smartphone',
    description: 'Your parents finally got you your first smartphone!',
    emoji: '📱',
    category: 'social',
    minAge: 10,
    maxAge: 16,
    choices: [
      {
        id: 'social_media_addict',
        text: 'Spend all day on social media',
        effects: [
          { type: 'stat', target: 'happiness', value: 15 },
          { type: 'stat', target: 'relationships', value: 10 },
          { type: 'stat', target: 'health', value: -10 },
          { type: 'stat', target: 'smarts', value: -5 }
        ],
        emoji: '📱',
        consequences: ['You became popular online but your grades suffered.']
      },
      {
        id: 'responsible_use',
        text: 'Use it responsibly',
        effects: [
          { type: 'stat', target: 'happiness', value: 10 },
          { type: 'stat', target: 'smarts', value: 5 },
          { type: 'stat', target: 'relationships', value: 5 }
        ],
        emoji: '⚖️',
        consequences: ['You maintained a healthy balance with technology.']
      },
      {
        id: 'learn_programming',
        text: 'Learn to code apps',
        effects: [
          { type: 'stat', target: 'smarts', value: 20 },
          { type: 'stat', target: 'happiness', value: 5 },
          { type: 'money', value: 10 }
        ],
        emoji: '💻',
        consequences: ['You discovered a passion for technology and programming.']
      }
    ]
  }
];
