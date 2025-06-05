
import { ZodiacSign } from '../types/core';

export const zodiacSigns: ZodiacSign[] = [
  {
    sign: 'Aries',
    name: 'Aries',
    emoji: '♈',
    traits: ['energetic', 'competitive', 'impulsive'],
    luckyNumbers: [1, 8, 17],
    element: 'fire'
  },
  {
    sign: 'Taurus',
    name: 'Taurus',
    emoji: '♉',
    traits: ['reliable', 'patient', 'stubborn'],
    luckyNumbers: [2, 6, 9],
    element: 'earth'
  },
  {
    sign: 'Gemini',
    name: 'Gemini',
    emoji: '♊',
    traits: ['adaptable', 'curious', 'inconsistent'],
    luckyNumbers: [5, 7, 14],
    element: 'air'
  },
  {
    sign: 'Cancer',
    name: 'Cancer',
    emoji: '♋',
    traits: ['nurturing', 'emotional', 'protective'],
    luckyNumbers: [2, 7, 11],
    element: 'water'
  },
  {
    sign: 'Leo',
    name: 'Leo',
    emoji: '♌',
    traits: ['confident', 'generous', 'dramatic'],
    luckyNumbers: [1, 3, 10],
    element: 'fire'
  },
  {
    sign: 'Virgo',
    name: 'Virgo',
    emoji: '♍',
    traits: ['analytical', 'practical', 'perfectionist'],
    luckyNumbers: [6, 14, 18],
    element: 'earth'
  },
  {
    sign: 'Libra',
    name: 'Libra',
    emoji: '♎',
    traits: ['diplomatic', 'charming', 'indecisive'],
    luckyNumbers: [6, 15, 24],
    element: 'air'
  },
  {
    sign: 'Scorpio',
    name: 'Scorpio',
    emoji: '♏',
    traits: ['intense', 'mysterious', 'passionate'],
    luckyNumbers: [4, 13, 27],
    element: 'water'
  },
  {
    sign: 'Sagittarius',
    name: 'Sagittarius',
    emoji: '♐',
    traits: ['adventurous', 'optimistic', 'restless'],
    luckyNumbers: [3, 9, 22],
    element: 'fire'
  },
  {
    sign: 'Capricorn',
    name: 'Capricorn',
    emoji: '♑',
    traits: ['ambitious', 'disciplined', 'pessimistic'],
    luckyNumbers: [8, 10, 26],
    element: 'earth'
  },
  {
    sign: 'Aquarius',
    name: 'Aquarius',
    emoji: '♒',
    traits: ['innovative', 'independent', 'detached'],
    luckyNumbers: [4, 7, 11],
    element: 'air'
  },
  {
    sign: 'Pisces',
    name: 'Pisces',
    emoji: '♓',
    traits: ['intuitive', 'compassionate', 'escapist'],
    luckyNumbers: [7, 12, 29],
    element: 'water'
  }
];

export const getZodiacSign = (month: number, day: number): ZodiacSign => {
  // Simplified zodiac calculation
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
