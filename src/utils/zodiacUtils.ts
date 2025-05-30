
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
