
import { ZodiacSign, ZodiacSignData } from '../types/core';

const zodiacData: ZodiacSignData[] = [
  {
    sign: 'Aries',
    name: 'Aries',
    emoji: '♈',
    traits: ['Bold', 'Energetic', 'Competitive'],
    luckyNumbers: [1, 8, 17],
    element: 'Fire'
  },
  {
    sign: 'Taurus',
    name: 'Taurus',
    emoji: '♉',
    traits: ['Reliable', 'Patient', 'Practical'],
    luckyNumbers: [2, 6, 9],
    element: 'Earth'
  },
  {
    sign: 'Gemini',
    name: 'Gemini',
    emoji: '♊',
    traits: ['Curious', 'Adaptable', 'Witty'],
    luckyNumbers: [5, 7, 14],
    element: 'Air'
  },
  {
    sign: 'Cancer',
    name: 'Cancer',
    emoji: '♋',
    traits: ['Emotional', 'Nurturing', 'Intuitive'],
    luckyNumbers: [2, 7, 11],
    element: 'Water'
  },
  {
    sign: 'Leo',
    name: 'Leo',
    emoji: '♌',
    traits: ['Confident', 'Generous', 'Creative'],
    luckyNumbers: [1, 3, 10],
    element: 'Fire'
  },
  {
    sign: 'Virgo',
    name: 'Virgo',
    emoji: '♍',
    traits: ['Analytical', 'Practical', 'Organized'],
    luckyNumbers: [3, 6, 27],
    element: 'Earth'
  },
  {
    sign: 'Libra',
    name: 'Libra',
    emoji: '♎',
    traits: ['Diplomatic', 'Fair', 'Social'],
    luckyNumbers: [4, 6, 13],
    element: 'Air'
  },
  {
    sign: 'Scorpio',
    name: 'Scorpio',
    emoji: '♏',
    traits: ['Intense', 'Passionate', 'Mysterious'],
    luckyNumbers: [8, 11, 18],
    element: 'Water'
  },
  {
    sign: 'Sagittarius',
    name: 'Sagittarius',
    emoji: '♐',
    traits: ['Adventurous', 'Optimistic', 'Philosophical'],
    luckyNumbers: [3, 9, 22],
    element: 'Fire'
  },
  {
    sign: 'Capricorn',
    name: 'Capricorn',
    emoji: '♑',
    traits: ['Ambitious', 'Disciplined', 'Practical'],
    luckyNumbers: [6, 8, 26],
    element: 'Earth'
  },
  {
    sign: 'Aquarius',
    name: 'Aquarius',
    emoji: '♒',
    traits: ['Independent', 'Innovative', 'Humanitarian'],
    luckyNumbers: [4, 7, 11],
    element: 'Air'
  },
  {
    sign: 'Pisces',
    name: 'Pisces',
    emoji: '♓',
    traits: ['Compassionate', 'Artistic', 'Intuitive'],
    luckyNumbers: [3, 9, 12],
    element: 'Water'
  }
];

export const getZodiacSign = (month: number, day: number): ZodiacSign => {
  // Simplified zodiac calculation
  if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return 'Aries';
  if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) return 'Taurus';
  if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) return 'Gemini';
  if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) return 'Cancer';
  if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return 'Leo';
  if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) return 'Virgo';
  if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) return 'Libra';
  if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) return 'Scorpio';
  if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) return 'Sagittarius';
  if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) return 'Capricorn';
  if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) return 'Aquarius';
  return 'Pisces';
};

export const getZodiacData = (sign: ZodiacSign): ZodiacSignData => {
  return zodiacData.find(data => data.sign === sign) || zodiacData[0];
};

export const getAllZodiacSigns = (): ZodiacSignData[] => {
  return zodiacData;
};
