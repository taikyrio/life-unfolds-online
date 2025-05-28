
import { LifeEvent } from '../types/game';

export const lifeEvents: LifeEvent[] = [
  {
    id: 'birthday_party',
    title: 'Birthday Party',
    description: "It's your birthday! Your friends want to throw you a party.",
    emoji: '🎂',
    choices: [
      {
        id: 'big_party',
        text: 'Throw a big party',
        emoji: '🎉',
        effects: { happiness: 15, wealth: -50, relationships: 10 }
      },
      {
        id: 'small_party',
        text: 'Have a small gathering',
        emoji: '👥',
        effects: { happiness: 8, wealth: -20, relationships: 5 }
      },
      {
        id: 'no_party',
        text: 'Skip the party',
        emoji: '🏠',
        effects: { happiness: -5, wealth: 0, relationships: -5 }
      }
    ]
  },
  {
    id: 'job_opportunity',
    title: 'Job Opportunity',
    description: 'A new job opportunity has come up with better pay but longer hours.',
    emoji: '💼',
    choices: [
      {
        id: 'take_job',
        text: 'Take the new job',
        emoji: '✅',
        effects: { wealth: 100, happiness: -10, health: -5 }
      },
      {
        id: 'stay_current',
        text: 'Stay at current job',
        emoji: '🤝',
        effects: { wealth: 20, happiness: 5 }
      },
      {
        id: 'negotiate',
        text: 'Try to negotiate',
        emoji: '💬',
        effects: { wealth: 60, happiness: 10 }
      }
    ]
  },
  {
    id: 'health_checkup',
    title: 'Health Check-up',
    description: 'Your doctor recommends a lifestyle change to improve your health.',
    emoji: '🏥',
    choices: [
      {
        id: 'exercise',
        text: 'Start exercising regularly',
        emoji: '💪',
        effects: { health: 20, happiness: 10, wealth: -30 }
      },
      {
        id: 'diet',
        text: 'Improve your diet',
        emoji: '🥗',
        effects: { health: 15, wealth: -20 }
      },
      {
        id: 'ignore',
        text: 'Ignore the advice',
        emoji: '🍔',
        effects: { health: -10, happiness: 5 }
      }
    ]
  },
  {
    id: 'relationship_drama',
    title: 'Relationship Drama',
    description: 'You had a big argument with someone close to you.',
    emoji: '💔',
    choices: [
      {
        id: 'apologize',
        text: 'Apologize first',
        emoji: '🙏',
        effects: { relationships: 15, happiness: 5 }
      },
      {
        id: 'wait',
        text: 'Wait for them to apologize',
        emoji: '⏰',
        effects: { relationships: -5, happiness: -10 }
      },
      {
        id: 'cut_ties',
        text: 'Cut ties completely',
        emoji: '✂️',
        effects: { relationships: -20, happiness: -15 }
      }
    ]
  },
  {
    id: 'lottery_ticket',
    title: 'Lucky Day',
    description: 'You found a lottery ticket on the ground. What do you do?',
    emoji: '🎫',
    choices: [
      {
        id: 'keep_ticket',
        text: 'Keep it and hope for the best',
        emoji: '🤞',
        effects: { wealth: 200, happiness: 20 }
      },
      {
        id: 'return_ticket',
        text: 'Try to find the owner',
        emoji: '👮',
        effects: { relationships: 10, happiness: 15 }
      },
      {
        id: 'throw_away',
        text: 'Throw it away',
        emoji: '🗑️',
        effects: { happiness: -5 }
      }
    ]
  },
  {
    id: 'learning_opportunity',
    title: 'Learning Opportunity',
    description: 'A chance to learn a new skill has presented itself.',
    emoji: '📚',
    choices: [
      {
        id: 'take_course',
        text: 'Take an expensive course',
        emoji: '🎓',
        effects: { happiness: 15, wealth: -100, relationships: 5 }
      },
      {
        id: 'self_teach',
        text: 'Teach yourself online',
        emoji: '💻',
        effects: { happiness: 10, wealth: -20 }
      },
      {
        id: 'skip_learning',
        text: 'Skip it for now',
        emoji: '📺',
        effects: { happiness: 5 }
      }
    ]
  }
];

export const getRandomEvent = (): LifeEvent => {
  const randomIndex = Math.floor(Math.random() * lifeEvents.length);
  return lifeEvents[randomIndex];
};
