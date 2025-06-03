
import { LifeEvent } from '../../types/game';

export const expandedLifeEvents: LifeEvent[] = [
  // Childhood Events (0-12)
  {
    id: 'first_word',
    title: 'First Word',
    description: 'You spoke your first word!',
    emoji: '👶',
    category: 'family',
    ageRequirement: { min: 0, max: 2 },
    choices: [
      {
        id: 'mama',
        text: 'Say "Mama"',
        effects: { happiness: 10, relationships: 5 },
        emoji: '👩'
      },
      {
        id: 'dada',
        text: 'Say "Dada"',
        effects: { happiness: 10, relationships: 5 },
        emoji: '👨'
      }
    ]
  },
  {
    id: 'playground_incident',
    title: 'Playground Drama',
    description: 'Another kid took your toy at the playground.',
    emoji: '🏰',
    category: 'social',
    ageRequirement: { min: 3, max: 7 },
    choices: [
      {
        id: 'fight_back',
        text: 'Fight for your toy',
        effects: { health: -5, happiness: 5, relationships: -10 },
        emoji: '👊'
      },
      {
        id: 'tell_parent',
        text: 'Tell your parent',
        effects: { happiness: 5, relationships: 10 },
        emoji: '🗣️'
      },
      {
        id: 'share',
        text: 'Offer to share',
        effects: { happiness: 10, relationships: 15 },
        emoji: '🤝'
      }
    ]
  },
  {
    id: 'school_bully',
    title: 'School Bully',
    description: 'A bully is picking on you at school.',
    emoji: '😠',
    category: 'social',
    ageRequirement: { min: 6, max: 12 },
    choices: [
      {
        id: 'stand_up',
        text: 'Stand up to them',
        effects: { health: -10, happiness: 5, relationships: -5 },
        emoji: '💪'
      },
      {
        id: 'tell_teacher',
        text: 'Tell a teacher',
        effects: { happiness: 10, relationships: 5 },
        emoji: '👩‍🏫'
      },
      {
        id: 'avoid',
        text: 'Try to avoid them',
        effects: { happiness: -5, health: 5 },
        emoji: '🏃'
      }
    ]
  },
  
  // Teenage Events (13-19)
  {
    id: 'first_crush',
    title: 'First Crush',
    description: 'You have a crush on someone at school!',
    emoji: '💕',
    category: 'relationship',
    ageRequirement: { min: 13, max: 16 },
    choices: [
      {
        id: 'confess',
        text: 'Tell them how you feel',
        effects: { happiness: 15, relationships: 10 },
        emoji: '💌'
      },
      {
        id: 'secret_admirer',
        text: 'Keep it a secret',
        effects: { happiness: 5 },
        emoji: '🤐'
      },
      {
        id: 'ask_friend',
        text: 'Ask a friend for advice',
        effects: { happiness: 8, relationships: 5 },
        emoji: '👥'
      }
    ]
  },
  {
    id: 'driving_test',
    title: 'Driving Test',
    description: 'Time to take your driving test!',
    emoji: '🚗',
    category: 'random',
    ageRequirement: { min: 16, max: 18 },
    choices: [
      {
        id: 'practice_more',
        text: 'Practice more before the test',
        effects: { happiness: 5, smarts: 5 },
        emoji: '📚'
      },
      {
        id: 'take_test',
        text: 'Take the test now',
        effects: { happiness: 20, wealth: -50 },
        emoji: '✅'
      },
      {
        id: 'postpone',
        text: 'Wait until later',
        effects: { happiness: -5 },
        emoji: '⏰'
      }
    ]
  },
  {
    id: 'prom_invitation',
    title: 'Prom Invitation',
    description: 'Someone asked you to prom!',
    emoji: '💃',
    category: 'social',
    ageRequirement: { min: 17, max: 18 },
    choices: [
      {
        id: 'accept',
        text: 'Accept the invitation',
        effects: { happiness: 25, relationships: 15, wealth: -100 },
        emoji: '✨'
      },
      {
        id: 'decline',
        text: 'Politely decline',
        effects: { happiness: -5, relationships: -10 },
        emoji: '❌'
      },
      {
        id: 'go_with_friends',
        text: 'Go with a group of friends',
        effects: { happiness: 15, relationships: 10, wealth: -80 },
        emoji: '👥'
      }
    ]
  },
  
  // Young Adult Events (18-30)
  {
    id: 'college_party',
    title: 'College Party',
    description: 'You\'re invited to a wild college party.',
    emoji: '🎉',
    category: 'social',
    ageRequirement: { min: 18, max: 22 },
    choices: [
      {
        id: 'party_hard',
        text: 'Party all night',
        effects: { happiness: 20, health: -10, relationships: 15 },
        emoji: '🍻'
      },
      {
        id: 'stay_sober',
        text: 'Go but stay sober',
        effects: { happiness: 10, health: 5, relationships: 5 },
        emoji: '🥤'
      },
      {
        id: 'study_instead',
        text: 'Stay home and study',
        effects: { happiness: -5, smarts: 10, health: 5 },
        emoji: '📖'
      }
    ]
  },
  {
    id: 'job_interview',
    title: 'Job Interview',
    description: 'You have an important job interview today.',
    emoji: '💼',
    category: 'career',
    ageRequirement: { min: 18, max: 65 },
    choices: [
      {
        id: 'dress_formally',
        text: 'Dress very formally',
        effects: { happiness: 5, looks: 10, wealth: -20 },
        emoji: '👔'
      },
      {
        id: 'be_confident',
        text: 'Be very confident',
        effects: { happiness: 10, relationships: 5 },
        emoji: '💪'
      },
      {
        id: 'be_honest',
        text: 'Be completely honest',
        effects: { happiness: 5, relationships: 10 },
        emoji: '💯'
      }
    ]
  },
  {
    id: 'apartment_hunting',
    title: 'Apartment Hunting',
    description: 'Time to find your first apartment!',
    emoji: '🏠',
    category: 'random',
    ageRequirement: { min: 18, max: 25 },
    choices: [
      {
        id: 'expensive_nice',
        text: 'Choose the expensive but nice one',
        effects: { happiness: 15, wealth: -200, looks: 5 },
        emoji: '✨'
      },
      {
        id: 'cheap_basic',
        text: 'Go with the cheap basic one',
        effects: { happiness: -5, wealth: 50 },
        emoji: '💸'
      },
      {
        id: 'roommate',
        text: 'Find a roommate to split costs',
        effects: { happiness: 5, wealth: -100, relationships: 10 },
        emoji: '👥'
      }
    ]
  },
  
  // Adult Events (30-50)
  {
    id: 'midlife_crisis',
    title: 'Midlife Crisis',
    description: 'You\'re questioning all your life choices.',
    emoji: '🤔',
    category: 'random',
    ageRequirement: { min: 35, max: 50 },
    choices: [
      {
        id: 'buy_sports_car',
        text: 'Buy a sports car',
        effects: { happiness: 20, wealth: -500, looks: 10 },
        emoji: '🏎️'
      },
      {
        id: 'change_career',
        text: 'Change your career',
        effects: { happiness: 15, wealth: -100, smarts: 5 },
        emoji: '🔄'
      },
      {
        id: 'take_vacation',
        text: 'Take a long vacation',
        effects: { happiness: 25, wealth: -300, health: 10 },
        emoji: '🏝️'
      },
      {
        id: 'accept_it',
        text: 'Accept where you are',
        effects: { happiness: 10, health: 5 },
        emoji: '🧘'
      }
    ]
  },
  {
    id: 'inheritance',
    title: 'Unexpected Inheritance',
    description: 'A distant relative left you money in their will.',
    emoji: '💰',
    category: 'random',
    ageRequirement: { min: 25, max: 60 },
    choices: [
      {
        id: 'invest_wisely',
        text: 'Invest it wisely',
        effects: { happiness: 10, wealth: 300, smarts: 5 },
        emoji: '📈'
      },
      {
        id: 'spend_freely',
        text: 'Spend it on luxuries',
        effects: { happiness: 30, wealth: 200, looks: 10 },
        emoji: '🛍️'
      },
      {
        id: 'donate_some',
        text: 'Donate half to charity',
        effects: { happiness: 20, wealth: 150, relationships: 15 },
        emoji: '❤️'
      }
    ]
  },
  
  // Senior Events (60+)
  {
    id: 'retirement_decision',
    title: 'Retirement Time',
    description: 'It\'s time to think about retirement.',
    emoji: '🏖️',
    category: 'career',
    ageRequirement: { min: 60, max: 70 },
    choices: [
      {
        id: 'retire_early',
        text: 'Retire early and enjoy life',
        effects: { happiness: 25, wealth: -100, health: 10 },
        emoji: '🌅'
      },
      {
        id: 'work_longer',
        text: 'Work a few more years',
        effects: { happiness: -5, wealth: 200, health: -5 },
        emoji: '💼'
      },
      {
        id: 'part_time',
        text: 'Switch to part-time',
        effects: { happiness: 15, wealth: 50, health: 5 },
        emoji: '⏰'
      }
    ]
  },
  {
    id: 'grandchildren',
    title: 'Grandchildren Visit',
    description: 'Your grandchildren are visiting for the weekend.',
    emoji: '👴',
    category: 'family',
    ageRequirement: { min: 50, max: 90 },
    choices: [
      {
        id: 'spoil_them',
        text: 'Spoil them with gifts',
        effects: { happiness: 20, wealth: -50, relationships: 15 },
        emoji: '🎁'
      },
      {
        id: 'teach_skills',
        text: 'Teach them life skills',
        effects: { happiness: 15, relationships: 10, smarts: 5 },
        emoji: '📚'
      },
      {
        id: 'tell_stories',
        text: 'Tell them stories about the past',
        effects: { happiness: 10, relationships: 12 },
        emoji: '📖'
      }
    ]
  }
];
