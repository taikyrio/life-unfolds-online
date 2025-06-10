
import { LifeEvent } from '../../types/game';

export const expandedSchoolEvents: LifeEvent[] = [
  {
    id: 'school_bully',
    title: 'School Bully',
    description: 'A bigger kid at school has been picking on you.',
    emoji: '😠',
    category: 'social',
    age: 10,
    minAge: 6,
    maxAge: 16,
    choices: [
      {
        id: 'fight_back',
        text: 'Stand up and fight back',
        effects: {
          happiness: 10,
          health: -10,
          relationships: 5
        },
        emoji: '👊',
        consequences: ['You earned respect but got in trouble with teachers.']
      },
      {
        id: 'tell_teacher',
        text: 'Tell a teacher',
        effects: {
          happiness: 5,
          relationships: -5,
          health: 5
        },
        emoji: '👨‍🏫',
        consequences: ['The bullying stopped but some kids called you a snitch.']
      },
      {
        id: 'make_friends',
        text: 'Try to befriend the bully',
        effects: {
          relationships: 15,
          happiness: 10
        },
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
    age: 12,
    minAge: 10,
    maxAge: 16,
    choices: [
      {
        id: 'social_media_addict',
        text: 'Spend all day on social media',
        effects: {
          happiness: 15,
          relationships: 10,
          health: -10,
          smarts: -5
        },
        emoji: '📱',
        consequences: ['You became popular online but your grades suffered.']
      },
      {
        id: 'responsible_use',
        text: 'Use it responsibly',
        effects: {
          happiness: 10,
          smarts: 5,
          relationships: 5
        },
        emoji: '⚖️',
        consequences: ['You maintained a healthy balance with technology.']
      },
      {
        id: 'learn_programming',
        text: 'Learn to code apps',
        effects: {
          smarts: 20,
          happiness: 5,
          wealth: 100
        },
        emoji: '💻',
        consequences: ['You discovered a passion for technology and programming.']
      }
    ]
  }
];
