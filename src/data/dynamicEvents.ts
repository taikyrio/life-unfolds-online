

import { Character, LifeEvent, EventTracker } from '../types/game';
import { getLifeStage } from '../utils/gameUtils';

export interface EventCondition {
  minAge?: number;
  maxAge?: number;
  lifeStage?: string;
  minStat?: { stat: keyof Character; value: number };
  maxStat?: { stat: keyof Character; value: number };
  hasFlag?: string;
  hasJob?: boolean;
  hasEducation?: string;
  probability?: number;
}

export interface DynamicEvent extends LifeEvent {
  conditions: EventCondition;
  flags?: string[];
  consequences?: string[];
  weight: number;
}

export const createDynamicEventSystem = () => {
  const events: DynamicEvent[] = [
    // Infant/Toddler Events (0-3)
    {
      id: 'first_word',
      title: 'First Word',
      description: 'You spoke your first word! Your parents are overjoyed.',
      emoji: '👶',
      choices: [
        {
          id: 'mama',
          text: 'Say "Mama"',
          effects: { happiness: 15, relationships: 10 },
          emoji: '👶'
        },
        {
          id: 'dada',
          text: 'Say "Dada"',
          effects: { happiness: 15, relationships: 10 },
          emoji: '👶'
        }
      ],
      conditions: { minAge: 1, maxAge: 2, probability: 0.8 },
      weight: 10
    },
    {
      id: 'potty_training',
      title: 'Potty Training',
      description: 'Your parents are trying to potty train you.',
      emoji: '🚽',
      choices: [
        {
          id: 'cooperate',
          text: 'Try your best to learn',
          effects: { happiness: 10, smarts: 5, relationships: 15 },
          emoji: '🚽'
        },
        {
          id: 'resist',
          text: 'Throw a tantrum',
          effects: { happiness: -5, relationships: -10 },
          emoji: '😭'
        }
      ],
      conditions: { minAge: 2, maxAge: 3, probability: 0.9 },
      weight: 8
    },

    // Child Events (4-11)
    {
      id: 'school_bully',
      title: 'School Bully',
      description: 'A bigger kid at school is picking on you and demanding your lunch money.',
      emoji: '👊',
      choices: [
        {
          id: 'stand_up',
          text: 'Stand up to the bully',
          effects: { happiness: 20, relationships: 10, health: -5 },
          emoji: '👊',
          consequences: ['You gained confidence but got a black eye.']
        },
        {
          id: 'tell_teacher',
          text: 'Tell a teacher',
          effects: { happiness: 5, relationships: -5, smarts: 5 },
          emoji: '🏫',
          consequences: ['The teacher helped, but some kids call you a snitch.']
        },
        {
          id: 'give_money',
          text: 'Give them your lunch money',
          effects: { happiness: -15, wealth: -5, relationships: -10 },
          emoji: '💰',
          consequences: ['The bullying continues and you go hungry.']
        }
      ],
      conditions: { minAge: 6, maxAge: 11, probability: 0.4 },
      flags: ['bully_encounter'],
      weight: 12
    },
    {
      id: 'talent_show',
      title: 'School Talent Show',
      description: 'Your school is hosting a talent show. Do you want to participate?',
      emoji: '🎤',
      choices: [
        {
          id: 'sing',
          text: 'Perform a song',
          effects: { happiness: 25, looks: 10, relationships: 15 },
          emoji: '🎤'
        },
        {
          id: 'dance',
          text: 'Do a dance routine',
          effects: { happiness: 20, health: 5, looks: 15, relationships: 10 },
          emoji: '💃'
        },
        {
          id: 'skip',
          text: 'Don\'t participate',
          effects: { happiness: -5 },
          emoji: '😔'
        }
      ],
      conditions: { minAge: 7, maxAge: 11, probability: 0.3 },
      weight: 8
    },

    // Teenage Events (12-17)
    {
      id: 'first_crush',
      title: 'First Crush',
      description: 'You have developed feelings for someone at school. What do you do?',
      emoji: '💕',
      choices: [
        {
          id: 'confess',
          text: 'Tell them how you feel',
          effects: { happiness: 15, relationships: 20, looks: 5 },
          emoji: '💕',
          consequences: ['Whether they like you back depends on your looks and charm.']
        },
        {
          id: 'write_note',
          text: 'Write them a secret note',
          effects: { happiness: 10, smarts: 5, relationships: 10 },
          emoji: '💌'
        },
        {
          id: 'stay_quiet',
          text: 'Keep your feelings to yourself',
          effects: { happiness: -10 },
          emoji: '🤐'
        }
      ],
      conditions: { minAge: 12, maxAge: 16, probability: 0.6 },
      flags: ['romantic_interest'],
      weight: 15
    },
    {
      id: 'peer_pressure_party',
      title: 'Party Invitation',
      description: 'Your friends invite you to a party where there will be drinking and smoking.',
      emoji: '🎉',
      choices: [
        {
          id: 'go_party',
          text: 'Go to the party',
          effects: { happiness: 20, relationships: 15, health: -10 },
          emoji: '🎉',
          flags: ['party_experience'],
          consequences: ['You had fun but feel sick the next day.']
        },
        {
          id: 'go_supervised',
          text: 'Go but stay responsible',
          effects: { happiness: 10, relationships: 5, smarts: 5 },
          emoji: '🤝'
        },
        {
          id: 'decline',
          text: 'Decline the invitation',
          effects: { happiness: -5, relationships: -10, health: 5 },
          emoji: '🏠'
        }
      ],
      conditions: { minAge: 14, maxAge: 17, probability: 0.5 },
      weight: 12
    },

    // Young Adult Events (18-25)
    {
      id: 'college_decision',
      title: 'College Application Results',
      description: 'You received responses from the colleges you applied to.',
      emoji: '🎓',
      choices: [
        {
          id: 'prestigious_college',
          text: 'Accept prestigious university (expensive)',
          effects: { happiness: 30, smarts: 20, wealth: -500, relationships: 10 },
          emoji: '🎓'
        },
        {
          id: 'community_college',
          text: 'Go to community college (affordable)',
          effects: { happiness: 10, smarts: 10, wealth: -100 },
          emoji: '📚'
        },
        {
          id: 'skip_college',
          text: 'Enter the workforce immediately',
          effects: { happiness: -10, wealth: 200, smarts: -5 },
          emoji: '💼'
        }
      ],
      conditions: { minAge: 18, maxAge: 18, minStat: { stat: 'smarts', value: 60 }, probability: 0.9 },
      weight: 20
    },
    {
      id: 'first_apartment',
      title: 'Moving Out',
      description: 'It\'s time to get your own place. What type of housing do you choose?',
      emoji: '🏠',
      choices: [
        {
          id: 'luxury_apartment',
          text: 'Luxury apartment downtown',
          effects: { happiness: 30, wealth: -800, looks: 10 },
          emoji: '🏢'
        },
        {
          id: 'modest_apartment',
          text: 'Modest apartment',
          effects: { happiness: 15, wealth: -400 },
          emoji: '🏠'
        },
        {
          id: 'roommates',
          text: 'Share with roommates',
          effects: { happiness: 10, wealth: -200, relationships: 15 },
          emoji: '👥'
        },
        {
          id: 'stay_home',
          text: 'Stay with parents longer',
          effects: { happiness: -15, wealth: 100, relationships: -5 },
          emoji: '🏡'
        }
      ],
      conditions: { minAge: 18, maxAge: 22, probability: 0.7 },
      weight: 15
    },

    // Adult Events (26-50)
    {
      id: 'career_crossroads',
      title: 'Career Opportunity',
      description: 'You\'ve been offered a new job with better pay but in a different city.',
      emoji: '✈️',
      choices: [
        {
          id: 'take_job',
          text: 'Take the new job',
          effects: { happiness: 20, wealth: 300, relationships: -15 },
          emoji: '✈️'
        },
        {
          id: 'negotiate',
          text: 'Try to negotiate with current employer',
          effects: { happiness: 5, wealth: 100 },
          emoji: '💬'
        },
        {
          id: 'stay_put',
          text: 'Stay in current job',
          effects: { happiness: -5, relationships: 10 },
          emoji: '🏢'
        }
      ],
      conditions: { minAge: 26, maxAge: 45, hasJob: true, probability: 0.4 },
      weight: 12
    },
    {
      id: 'midlife_crisis',
      title: 'Midlife Reflection',
      description: 'You\'re feeling unsatisfied with your life direction. What do you do?',
      emoji: '🔄',
      choices: [
        {
          id: 'career_change',
          text: 'Make a dramatic career change',
          effects: { happiness: 25, wealth: -200, smarts: 10 },
          emoji: '🔄'
        },
        {
          id: 'new_hobby',
          text: 'Pick up an exciting new hobby',
          effects: { happiness: 15, health: 5, wealth: -50 },
          emoji: '🎨'
        },
        {
          id: 'therapy',
          text: 'Seek professional help',
          effects: { happiness: 20, wealth: -100, smarts: 10 },
          emoji: '🛋️'
        },
        {
          id: 'accept_status_quo',
          text: 'Accept life as it is',
          effects: { happiness: -10 },
          emoji: '😔'
        }
      ],
      conditions: { minAge: 35, maxAge: 50, probability: 0.3 },
      weight: 10
    },

    // Senior Events (65+)
    {
      id: 'retirement_planning',
      title: 'Retirement Decision',
      description: 'You\'re eligible for retirement. What\'s your plan?',
      emoji: '🏖️',
      choices: [
        {
          id: 'full_retirement',
          text: 'Retire and enjoy life',
          effects: { happiness: 30, health: 10, wealth: -100 },
          emoji: '🏖️'
        },
        {
          id: 'part_time',
          text: 'Work part-time',
          effects: { happiness: 15, wealth: 50 },
          emoji: '⏰'
        },
        {
          id: 'keep_working',
          text: 'Continue working full-time',
          effects: { happiness: -10, health: -5, wealth: 200 },
          emoji: '💼'
        }
      ],
      conditions: { minAge: 65, maxAge: 70, hasJob: true, probability: 0.8 },
      weight: 15
    }
  ];

  const getAvailableEvents = (character: Character, eventTracker: EventTracker): DynamicEvent[] => {
    const lifeStage = getLifeStage(character.age);
    
    return events.filter(event => {
      const conditions = event.conditions;
      
      // Check age range
      if (conditions.minAge && character.age < conditions.minAge) return false;
      if (conditions.maxAge && character.age > conditions.maxAge) return false;
      
      // Check life stage
      if (conditions.lifeStage && lifeStage !== conditions.lifeStage) return false;
      
      // Check stat requirements
      if (conditions.minStat) {
        const statValue = character[conditions.minStat.stat] as number;
        if (statValue < conditions.minStat.value) return false;
      }
      
      if (conditions.maxStat) {
        const statValue = character[conditions.maxStat.stat] as number;
        if (statValue > conditions.maxStat.value) return false;
      }
      
      // Check job requirement
      if (conditions.hasJob !== undefined) {
        if (conditions.hasJob && !character.job) return false;
        if (!conditions.hasJob && character.job) return false;
      }
      
      // Check education requirement
      if (conditions.hasEducation && !character.education.includes(conditions.hasEducation)) return false;
      
      // Check probability
      if (conditions.probability && Math.random() > conditions.probability) return false;
      
      // Check if event was already triggered recently
      if (eventTracker.triggeredEvents.has(event.id)) return false;
      
      return true;
    });
  };

  const selectEvent = (availableEvents: DynamicEvent[]): DynamicEvent | null => {
    if (availableEvents.length === 0) return null;
    
    // Weighted random selection
    const totalWeight = availableEvents.reduce((sum, event) => sum + event.weight, 0);
    let random = Math.random() * totalWeight;
    
    for (const event of availableEvents) {
      random -= event.weight;
      if (random <= 0) return event;
    }
    
    return availableEvents[0];
  };

  return {
    getAvailableEvents,
    selectEvent,
    events
  };
};

export const dynamicEventSystem = createDynamicEventSystem();
