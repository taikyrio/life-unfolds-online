
import { ZodiacSign } from '../types/game';

export const zodiacSigns: ZodiacSign[] = [
  {
    name: 'Aries',
    emoji: '♈',
    traits: ['Energetic', 'Confident', 'Impulsive'],
    luckyNumbers: [1, 8, 17],
    element: 'fire'
  },
  {
    name: 'Taurus',
    emoji: '♉',
    traits: ['Reliable', 'Patient', 'Stubborn'],
    luckyNumbers: [2, 6, 9],
    element: 'earth'
  },
  {
    name: 'Gemini',
    emoji: '♊',
    traits: ['Adaptable', 'Curious', 'Inconsistent'],
    luckyNumbers: [5, 7, 14],
    element: 'air'
  },
  {
    name: 'Cancer',
    emoji: '♋',
    traits: ['Emotional', 'Protective', 'Moody'],
    luckyNumbers: [2, 7, 11],
    element: 'water'
  },
  {
    name: 'Leo',
    emoji: '♌',
    traits: ['Generous', 'Warm-hearted', 'Arrogant'],
    luckyNumbers: [1, 3, 10],
    element: 'fire'
  },
  {
    name: 'Virgo',
    emoji: '♍',
    traits: ['Analytical', 'Practical', 'Worrying'],
    luckyNumbers: [3, 15, 20],
    element: 'earth'
  },
  {
    name: 'Libra',
    emoji: '♎',
    traits: ['Diplomatic', 'Fair-minded', 'Indecisive'],
    luckyNumbers: [4, 6, 13],
    element: 'air'
  },
  {
    name: 'Scorpio',
    emoji: '♏',
    traits: ['Brave', 'Passionate', 'Jealous'],
    luckyNumbers: [8, 11, 18],
    element: 'water'
  },
  {
    name: 'Sagittarius',
    emoji: '♐',
    traits: ['Optimistic', 'Freedom-loving', 'Impatient'],
    luckyNumbers: [3, 9, 22],
    element: 'fire'
  },
  {
    name: 'Capricorn',
    emoji: '♑',
    traits: ['Responsible', 'Disciplined', 'Pessimistic'],
    luckyNumbers: [6, 8, 26],
    element: 'earth'
  },
  {
    name: 'Aquarius',
    emoji: '♒',
    traits: ['Progressive', 'Independent', 'Aloof'],
    luckyNumbers: [4, 7, 11],
    element: 'air'
  },
  {
    name: 'Pisces',
    emoji: '♓',
    traits: ['Compassionate', 'Artistic', 'Overly trusting'],
    luckyNumbers: [3, 9, 12],
    element: 'water'
  }
];

export const getZodiacSign = (month: number, day: number): ZodiacSign => {
  if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return zodiacSigns[0]; // Aries
  if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) return zodiacSigns[1]; // Taurus
  if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) return zodiacSigns[2]; // Gemini
  if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) return zodiacSigns[3]; // Cancer
  if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return zodiacSigns[4]; // Leo
  if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) return zodiacSigns[5]; // Virgo
  if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) return zodiacSigns[6]; // Libra
  if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) return zodiacSigns[7]; // Scorpio
  if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) return zodiacSigns[8]; // Sagittarius
  if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) return zodiacSigns[9]; // Capricorn
  if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) return zodiacSigns[10]; // Aquarius
  return zodiacSigns[11]; // Pisces
};

export const getZodiacEffects = (zodiacSign: ZodiacSign): any => {
  const effects: any = {};
  
  switch (zodiacSign.element) {
    case 'fire':
      effects.happiness = 5;
      effects.relationships = 3;
      break;
    case 'earth':
      effects.smarts = 5;
      effects.wealth = 50;
      break;
    case 'air':
      effects.smarts = 3;
      effects.relationships = 5;
      break;
    case 'water':
      effects.health = 3;
      effects.happiness = 3;
      break;
  }
  
  return effects;
};
