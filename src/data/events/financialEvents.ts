
import { DynamicEvent } from './eventTypes';

export const financialEvents: DynamicEvent[] = [
  {
    id: 'unexpected_inheritance',
    title: 'Surprise Inheritance',
    description: 'A distant relative you barely knew has left you money in their will.',
    emoji: '💰',
    category: 'random',
    choices: [
      {
        id: 'invest_wisely',
        text: 'Invest the money wisely',
        effects: { wealth: 15000, smarts: 10, happiness: 20 },
        emoji: '📈',
        consequences: ['Your smart investment choices paid off well.']
      },
      {
        id: 'pay_off_debts',
        text: 'Pay off existing debts',
        effects: { wealth: 8000, happiness: 25, health: 10 },
        emoji: '💳',
        consequences: ['Being debt-free feels amazing and reduces stress.']
      },
      {
        id: 'splurge_spending',
        text: 'Go on a shopping spree',
        effects: { wealth: 5000, happiness: 30, looks: 15 },
        emoji: '🛍️',
        consequences: ['You enjoyed the splurge but wonder if you should have saved more.']
      },
      {
        id: 'donate_charity',
        text: 'Donate most to charity',
        effects: { wealth: 2000, happiness: 40, relationships: 20 },
        emoji: '❤️',
        consequences: ['Your generosity made a real difference in others\' lives.']
      }
    ],
    conditions: { minAge: 18, maxAge: 80, probability: 0.05 },
    weight: 15,
    flags: []
  },
  {
    id: 'car_breakdown',
    title: 'Car Trouble',
    description: 'Your car has broken down and needs expensive repairs.',
    emoji: '🚗',
    category: 'random',
    choices: [
      {
        id: 'repair_car',
        text: 'Pay for the repairs',
        effects: { wealth: -2500, happiness: 10 },
        emoji: '🔧',
        consequences: ['Your car is running like new again.']
      },
      {
        id: 'buy_used_car',
        text: 'Buy a different used car',
        effects: { wealth: -8000, happiness: 5 },
        emoji: '🚙',
        consequences: ['You found a reliable used car within your budget.']
      },
      {
        id: 'use_public_transport',
        text: 'Rely on public transportation',
        effects: { wealth: -200, happiness: -15, health: 5 },
        emoji: '🚌',
        consequences: ['Public transport is cheaper but less convenient.']
      },
      {
        id: 'bike_everywhere',
        text: 'Start biking everywhere',
        effects: { wealth: -500, happiness: 5, health: 20 },
        emoji: '🚴',
        consequences: ['Biking improved your fitness but takes more time.']
      }
    ],
    conditions: { minAge: 18, maxAge: 80, probability: 0.15 },
    weight: 10,
    flags: []
  },
  {
    id: 'lottery_ticket_win',
    title: 'Lottery Ticket',
    description: 'You bought a lottery ticket on impulse while getting gas.',
    emoji: '🎟️',
    category: 'random',
    choices: [
      {
        id: 'win_jackpot',
        text: 'Win the jackpot! ($1M)',
        effects: { wealth: 1000000, happiness: 100, relationships: -20 },
        emoji: '💎',
        consequences: ['You won big! But suddenly everyone wants to be your friend.']
      },
      {
        id: 'win_small',
        text: 'Win $5,000',
        effects: { wealth: 5000, happiness: 30 },
        emoji: '💰',
        consequences: ['A nice windfall that brightened your month!']
      },
      {
        id: 'win_tiny',
        text: 'Win $100',
        effects: { wealth: 100, happiness: 10 },
        emoji: '💵',
        consequences: ['Enough for a nice dinner out!']
      },
      {
        id: 'lose',
        text: 'Lose (as expected)',
        effects: { happiness: -2 },
        emoji: '😞',
        consequences: ['Just another losing ticket, but it was fun to dream.']
      }
    ],
    conditions: { minAge: 18, maxAge: 100, probability: 0.1 },
    weight: 5,
    flags: []
  }
];
