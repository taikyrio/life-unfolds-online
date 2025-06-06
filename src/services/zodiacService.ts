
import { ZodiacSign, ZodiacSignData } from '../types/core';

const zodiacData: ZodiacSignData[] = [
  {
    name: 'Aries',
    emoji: '♈',
    element: 'Fire',
    dates: 'Mar 21 - Apr 19',
    traits: ['Bold', 'Energetic', 'Competitive'],
    compatibility: ['Leo', 'Sagittarius'],
    luckyNumbers: [1, 8, 17],
    luckyColors: ['Red', 'Orange']
  },
  {
    name: 'Taurus',
    emoji: '♉',
    element: 'Earth',
    dates: 'Apr 20 - May 20',
    traits: ['Reliable', 'Patient', 'Practical'],
    compatibility: ['Virgo', 'Capricorn'],
    luckyNumbers: [2, 6, 9],
    luckyColors: ['Green', 'Pink']
  },
  {
    name: 'Gemini',
    emoji: '♊',
    element: 'Air',
    dates: 'May 21 - Jun 20',
    traits: ['Curious', 'Adaptable', 'Witty'],
    compatibility: ['Libra', 'Aquarius'],
    luckyNumbers: [5, 7, 14],
    luckyColors: ['Yellow', 'Silver']
  },
  {
    name: 'Cancer',
    emoji: '♋',
    element: 'Water',
    dates: 'Jun 21 - Jul 22',
    traits: ['Emotional', 'Nurturing', 'Intuitive'],
    compatibility: ['Scorpio', 'Pisces'],
    luckyNumbers: [2, 7, 11],
    luckyColors: ['White', 'Silver']
  },
  {
    name: 'Leo',
    emoji: '♌',
    element: 'Fire',
    dates: 'Jul 23 - Aug 22',
    traits: ['Confident', 'Generous', 'Creative'],
    compatibility: ['Aries', 'Sagittarius'],
    luckyNumbers: [1, 3, 10],
    luckyColors: ['Gold', 'Orange']
  },
  {
    name: 'Virgo',
    emoji: '♍',
    element: 'Earth',
    dates: 'Aug 23 - Sep 22',
    traits: ['Analytical', 'Practical', 'Organized'],
    compatibility: ['Taurus', 'Capricorn'],
    luckyNumbers: [3, 6, 27],
    luckyColors: ['Navy', 'Gray']
  },
  {
    name: 'Libra',
    emoji: '♎',
    element: 'Air',
    dates: 'Sep 23 - Oct 22',
    traits: ['Diplomatic', 'Fair', 'Social'],
    compatibility: ['Gemini', 'Aquarius'],
    luckyNumbers: [4, 6, 13],
    luckyColors: ['Blue', 'Pastel']
  },
  {
    name: 'Scorpio',
    emoji: '♏',
    element: 'Water',
    dates: 'Oct 23 - Nov 21',
    traits: ['Intense', 'Passionate', 'Mysterious'],
    compatibility: ['Cancer', 'Pisces'],
    luckyNumbers: [8, 11, 18],
    luckyColors: ['Deep Red', 'Black']
  },
  {
    name: 'Sagittarius',
    emoji: '♐',
    element: 'Fire',
    dates: 'Nov 22 - Dec 21',
    traits: ['Adventurous', 'Optimistic', 'Philosophical'],
    compatibility: ['Aries', 'Leo'],
    luckyNumbers: [3, 9, 22],
    luckyColors: ['Purple', 'Turquoise']
  },
  {
    name: 'Capricorn',
    emoji: '♑',
    element: 'Earth',
    dates: 'Dec 22 - Jan 19',
    traits: ['Ambitious', 'Disciplined', 'Practical'],
    compatibility: ['Taurus', 'Virgo'],
    luckyNumbers: [6, 8, 26],
    luckyColors: ['Brown', 'Black']
  },
  {
    name: 'Aquarius',
    emoji: '♒',
    element: 'Air',
    dates: 'Jan 20 - Feb 18',
    traits: ['Independent', 'Innovative', 'Humanitarian'],
    compatibility: ['Gemini', 'Libra'],
    luckyNumbers: [4, 7, 11],
    luckyColors: ['Blue', 'Silver']
  },
  {
    name: 'Pisces',
    emoji: '♓',
    element: 'Water',
    dates: 'Feb 19 - Mar 20',
    traits: ['Compassionate', 'Artistic', 'Intuitive'],
    compatibility: ['Cancer', 'Scorpio'],
    luckyNumbers: [3, 9, 12],
    luckyColors: ['Sea Green', 'Lavender']
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
  return zodiacData.find(data => data.name === sign) || zodiacData[0];
};

export const getAllZodiacSigns = (): ZodiacSignData[] => {
  return zodiacData;
};
