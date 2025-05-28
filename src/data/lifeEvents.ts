
import { LifeEvent } from '../types/game';

const childEvents: LifeEvent[] = [
  {
    id: 'elementary_grades',
    title: 'Report Card Day',
    description: 'You received your elementary school report card. How did you do?',
    emoji: '📊',
    category: 'education',
    ageRequirement: { min: 6, max: 12 },
    choices: [
      {
        id: 'straight_a',
        text: 'Straight A\'s! You studied hard',
        emoji: '🌟',
        effects: { smarts: 15, happiness: 10 }
      },
      {
        id: 'average_grades',
        text: 'B\'s and C\'s - pretty average',
        emoji: '📝',
        effects: { smarts: 5, happiness: 5 }
      },
      {
        id: 'poor_grades',
        text: 'Mostly D\'s and F\'s...',
        emoji: '😞',
        effects: { smarts: -5, happiness: -10 }
      }
    ]
  },
  {
    id: 'playground_bully',
    title: 'Playground Bully',
    description: 'A bigger kid is picking on you at school. What do you do?',
    emoji: '😠',
    category: 'random',
    ageRequirement: { min: 6, max: 12 },
    choices: [
      {
        id: 'fight_back',
        text: 'Fight back!',
        emoji: '👊',
        effects: { health: -10, happiness: 5, relationships: -5 }
      },
      {
        id: 'tell_teacher',
        text: 'Tell a teacher',
        emoji: '👩‍🏫',
        effects: { happiness: 10, relationships: 5 }
      },
      {
        id: 'ignore_bully',
        text: 'Just ignore them',
        emoji: '🙄',
        effects: { happiness: -5, health: -5 }
      }
    ]
  }
];

const teenEvents: LifeEvent[] = [
  {
    id: 'high_school_graduation',
    title: 'High School Graduation',
    description: 'You\'re graduating high school! What\'s your next step?',
    emoji: '🎓',
    category: 'education',
    ageRequirement: { min: 17, max: 19 },
    choices: [
      {
        id: 'go_to_college',
        text: 'Go to university',
        emoji: '🏫',
        effects: { education: 'University Student', wealth: -50, smarts: 10 }
      },
      {
        id: 'get_job',
        text: 'Get a job immediately',
        emoji: '💼',
        effects: { job: 'Retail Worker', salary: 25, wealth: 20 }
      },
      {
        id: 'gap_year',
        text: 'Take a gap year',
        emoji: '🌎',
        effects: { happiness: 15, wealth: -10 }
      }
    ]
  },
  {
    id: 'first_crush',
    title: 'First Crush',
    description: 'You have a crush on someone at school. Do you make a move?',
    emoji: '💕',
    category: 'relationship',
    ageRequirement: { min: 13, max: 17 },
    choices: [
      {
        id: 'ask_out',
        text: 'Ask them out',
        emoji: '💌',
        effects: { happiness: 20, relationships: 15, relationshipStatus: 'dating', partnerName: 'Alex' }
      },
      {
        id: 'write_note',
        text: 'Write them a love note',
        emoji: '💝',
        effects: { happiness: 10, relationships: 5 }
      },
      {
        id: 'stay_shy',
        text: 'Stay shy and do nothing',
        emoji: '😊',
        effects: { happiness: -5 }
      }
    ]
  },
  {
    id: 'part_time_job',
    title: 'Part-Time Job Opportunity',
    description: 'A local business is hiring part-time workers. Apply?',
    emoji: '💰',
    category: 'career',
    ageRequirement: { min: 14, max: 17 },
    choices: [
      {
        id: 'take_job',
        text: 'Take the job',
        emoji: '✅',
        effects: { job: 'Part-time Worker', salary: 15, wealth: 25 }
      },
      {
        id: 'focus_studies',
        text: 'Focus on studies instead',
        emoji: '📚',
        effects: { smarts: 10, happiness: 5 }
      }
    ]
  }
];

const adultEvents: LifeEvent[] = [
  {
    id: 'job_promotion',
    title: 'Promotion Opportunity',
    description: 'Your boss is considering you for a promotion. How do you handle it?',
    emoji: '📈',
    category: 'career',
    ageRequirement: { min: 22 },
    requirements: { job: 'any' },
    choices: [
      {
        id: 'work_overtime',
        text: 'Work extra hours to impress',
        emoji: '⏰',
        effects: { salary: 20, jobLevel: 1, health: -5, happiness: 10 }
      },
      {
        id: 'network_boss',
        text: 'Take your boss out for drinks',
        emoji: '🍻',
        effects: { salary: 15, wealth: -10, relationships: 5 }
      },
      {
        id: 'decline_promotion',
        text: 'You\'re happy where you are',
        emoji: '😌',
        effects: { happiness: 5, salary: 0 }
      }
    ]
  },
  {
    id: 'marriage_proposal',
    title: 'Marriage Proposal',
    description: 'Your partner wants to get married! What do you say?',
    emoji: '💍',
    category: 'relationship',
    ageRequirement: { min: 18 },
    requirements: { relationshipStatus: 'dating' },
    choices: [
      {
        id: 'say_yes',
        text: 'Yes! Let\'s get married!',
        emoji: '💒',
        effects: { relationshipStatus: 'married', happiness: 25, wealth: -100 }
      },
      {
        id: 'not_ready',
        text: 'I\'m not ready yet',
        emoji: '⏰',
        effects: { relationships: -10, happiness: -5 }
      },
      {
        id: 'break_up',
        text: 'Actually, let\'s break up',
        emoji: '💔',
        effects: { relationshipStatus: 'single', relationships: -30, happiness: -15, partnerName: undefined }
      }
    ]
  },
  {
    id: 'lottery_ticket',
    title: 'Lucky Lottery',
    description: 'You found a lottery ticket on the ground. The jackpot is $50,000!',
    emoji: '🎫',
    category: 'random',
    choices: [
      {
        id: 'keep_ticket',
        text: 'Keep it - finders keepers!',
        emoji: '🤞',
        effects: { wealth: 500, happiness: 30, fame: 5 }
      },
      {
        id: 'find_owner',
        text: 'Try to find the real owner',
        emoji: '👮',
        effects: { relationships: 15, happiness: 20 }
      },
      {
        id: 'throw_away',
        text: 'Throw it away - gambling is bad',
        emoji: '🗑️',
        effects: { happiness: -5, smarts: 5 }
      }
    ]
  },
  {
    id: 'investment_opportunity',
    title: 'Investment Opportunity',
    description: 'A friend wants you to invest in their startup company.',
    emoji: '💼',
    category: 'career',
    ageRequirement: { min: 25 },
    requirements: { wealth: 100 },
    choices: [
      {
        id: 'invest_big',
        text: 'Invest $500',
        emoji: '💰',
        effects: { wealth: 1000, happiness: 15 }
      },
      {
        id: 'invest_small',
        text: 'Invest $100',
        emoji: '💵',
        effects: { wealth: 150, happiness: 10 }
      },
      {
        id: 'decline_investment',
        text: 'Too risky for me',
        emoji: '🛡️',
        effects: { relationships: -5, happiness: 5 }
      }
    ]
  },
  {
    id: 'midlife_crisis',
    title: 'Midlife Crisis',
    description: 'You\'re feeling restless about your life choices. Time for a change?',
    emoji: '🏃‍♂️',
    category: 'random',
    ageRequirement: { min: 40, max: 55 },
    choices: [
      {
        id: 'buy_sports_car',
        text: 'Buy a sports car',
        emoji: '🏎️',
        effects: { wealth: -200, happiness: 20, fame: 5 }
      },
      {
        id: 'change_career',
        text: 'Change careers completely',
        emoji: '🔄',
        effects: { job: 'New Career', salary: 30, happiness: 15, wealth: -50 }
      },
      {
        id: 'stay_course',
        text: 'Stay the course',
        emoji: '⚓',
        effects: { happiness: 5, health: 5 }
      }
    ]
  }
];

const crimeEvents: LifeEvent[] = [
  {
    id: 'shoplifting_temptation',
    title: 'Shoplifting Temptation',
    description: 'You see an expensive item in a store with no security cameras...',
    emoji: '🛒',
    category: 'crime',
    ageRequirement: { min: 13 },
    choices: [
      {
        id: 'steal_item',
        text: 'Take it when no one\'s looking',
        emoji: '😈',
        effects: { wealth: 50, happiness: 10, criminalRecord: true }
      },
      {
        id: 'buy_item',
        text: 'Buy it honestly',
        emoji: '💳',
        effects: { wealth: -50, happiness: 10 }
      },
      {
        id: 'walk_away',
        text: 'Walk away',
        emoji: '🚶',
        effects: { happiness: 5 }
      }
    ]
  }
];

export const lifeEvents: LifeEvent[] = [
  ...childEvents,
  ...teenEvents,
  ...adultEvents,
  ...crimeEvents
];

export const getRandomEvent = (character: any): LifeEvent => {
  // Filter events based on age and requirements
  const availableEvents = lifeEvents.filter(event => {
    // Age requirement check
    if (event.ageRequirement) {
      if (event.ageRequirement.min && character.age < event.ageRequirement.min) return false;
      if (event.ageRequirement.max && character.age > event.ageRequirement.max) return false;
    }
    
    // Requirements check
    if (event.requirements) {
      if (event.requirements.education && character.education !== event.requirements.education) return false;
      if (event.requirements.job && event.requirements.job !== 'any' && character.job !== event.requirements.job) return false;
      if (event.requirements.relationshipStatus && character.relationshipStatus !== event.requirements.relationshipStatus) return false;
      if (event.requirements.wealth && character.wealth < event.requirements.wealth) return false;
    }
    
    return true;
  });
  
  if (availableEvents.length === 0) {
    // Fallback to basic events if no age-appropriate events
    return lifeEvents[Math.floor(Math.random() * lifeEvents.length)];
  }
  
  const randomIndex = Math.floor(Math.random() * availableEvents.length);
  return availableEvents[randomIndex];
};
