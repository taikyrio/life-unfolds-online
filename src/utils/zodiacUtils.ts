
import { ZodiacSign } from '../types/game';

const zodiacSigns = [
  { name: 'Aries', emoji: '♈', element: 'fire' as const, traits: ['energetic', 'bold', 'competitive'], luckyNumbers: [1, 8, 17] },
  { name: 'Taurus', emoji: '♉', element: 'earth' as const, traits: ['reliable', 'patient', 'practical'], luckyNumbers: [2, 6, 9] },
  { name: 'Gemini', emoji: '♊', element: 'air' as const, traits: ['curious', 'adaptable', 'witty'], luckyNumbers: [5, 7, 14] },
  { name: 'Cancer', emoji: '♋', element: 'water' as const, traits: ['nurturing', 'intuitive', 'emotional'], luckyNumbers: [2, 7, 11] },
  { name: 'Leo', emoji: '♌', element: 'fire' as const, traits: ['confident', 'generous', 'dramatic'], luckyNumbers: [1, 3, 10] },
  { name: 'Virgo', emoji: '♍', element: 'earth' as const, traits: ['analytical', 'practical', 'loyal'], luckyNumbers: [6, 14, 18] },
  { name: 'Libra', emoji: '♎', element: 'air' as const, traits: ['diplomatic', 'fair-minded', 'social'], luckyNumbers: [4, 6, 13] },
  { name: 'Scorpio', emoji: '♏', element: 'water' as const, traits: ['passionate', 'resourceful', 'brave'], luckyNumbers: [8, 11, 18] },
  { name: 'Sagittarius', emoji: '♐', element: 'fire' as const, traits: ['adventurous', 'philosophical', 'honest'], luckyNumbers: [3, 9, 22] },
  { name: 'Capricorn', emoji: '♑', element: 'earth' as const, traits: ['ambitious', 'disciplined', 'responsible'], luckyNumbers: [6, 8, 26] },
  { name: 'Aquarius', emoji: '♒', element: 'air' as const, traits: ['independent', 'original', 'humanitarian'], luckyNumbers: [4, 7, 11] },
  { name: 'Pisces', emoji: '♓', element: 'water' as const, traits: ['compassionate', 'artistic', 'intuitive'], luckyNumbers: [5, 8, 18] }
];

export const generateZodiacSign = (): ZodiacSign => {
  return zodiacSigns[Math.floor(Math.random() * zodiacSigns.length)];
};

export const getZodiacByMonth = (month: number): ZodiacSign => {
  const zodiacMap = [
    'Capricorn', 'Aquarius', 'Pisces', 'Aries', 'Taurus', 'Gemini',
    'Cancer', 'Leo', 'Virgo', 'Libra', 'Scorpio', 'Sagittarius'
  ];
  
  const zodiacName = zodiacMap[month - 1];
  return zodiacSigns.find(sign => sign.name === zodiacName) || zodiacSigns[0];
};

export const getZodiacSign = (month: number, day: number): ZodiacSign => {
  const dates = [
    { sign: 'Capricorn', start: [12, 22], end: [1, 19] },
    { sign: 'Aquarius', start: [1, 20], end: [2, 18] },
    { sign: 'Pisces', start: [2, 19], end: [3, 20] },
    { sign: 'Aries', start: [3, 21], end: [4, 19] },
    { sign: 'Taurus', start: [4, 20], end: [5, 20] },
    { sign: 'Gemini', start: [5, 21], end: [6, 20] },
    { sign: 'Cancer', start: [6, 21], end: [7, 22] },
    { sign: 'Leo', start: [7, 23], end: [8, 22] },
    { sign: 'Virgo', start: [8, 23], end: [9, 22] },
    { sign: 'Libra', start: [9, 23], end: [10, 22] },
    { sign: 'Scorpio', start: [10, 23], end: [11, 21] },
    { sign: 'Sagittarius', start: [11, 22], end: [12, 21] }
  ];

  for (const zodiac of dates) {
    if (zodiac.sign === 'Capricorn') {
      if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) {
        return zodiacSigns.find(sign => sign.name === zodiac.sign) || zodiacSigns[0];
      }
    } else {
      const [startMonth, startDay] = zodiac.start;
      const [endMonth, endDay] = zodiac.end;
      if (month === startMonth && day >= startDay || month === endMonth && day <= endDay) {
        return zodiacSigns.find(sign => sign.name === zodiac.sign) || zodiacSigns[0];
      }
    }
  }
  
  return zodiacSigns[0];
};

export { ZodiacSign };
