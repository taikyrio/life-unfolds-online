
import { Character } from '../types/game';

const nationalities = ['American', 'British', 'Canadian', 'Australian', 'German', 'French', 'Japanese', 'Brazilian'];
const birthplaces = ['New York', 'London', 'Toronto', 'Sydney', 'Berlin', 'Paris', 'Tokyo', 'São Paulo'];

export const generateRandomName = (): string => {
  const names = [
    'Alex', 'Jordan', 'Casey', 'Riley', 'Morgan', 'Avery', 'Quinn', 'Taylor',
    'Sam', 'Blake', 'Cameron', 'Devon', 'Finley', 'Harper', 'Hayden', 'Jamie',
    'Charlie', 'Sage', 'River', 'Phoenix', 'Rowan', 'Emery', 'Reese', 'Drew'
  ];
  return names[Math.floor(Math.random() * names.length)];
};

export const generateRandomStats = (): Omit<Character, 'name' | 'age' | 'year'> => {
  const nationalityIndex = Math.floor(Math.random() * nationalities.length);
  
  return {
    health: Math.floor(Math.random() * 30) + 70, // 70-100
    happiness: Math.floor(Math.random() * 30) + 70, // 70-100
    smarts: Math.floor(Math.random() * 30) + 70, // 70-100
    looks: Math.floor(Math.random() * 30) + 70, // 70-100
    wealth: Math.floor(Math.random() * 100) + 50, // 50-150
    relationships: Math.floor(Math.random() * 30) + 70, // 70-100
    
    // Career & Education
    jobLevel: 0,
    salary: 0,
    education: 'Elementary School',
    
    // Relationships
    relationshipStatus: 'single',
    children: [],
    
    // Life Status
    criminalRecord: false,
    fame: 0,
    nationality: nationalities[nationalityIndex],
    birthplace: birthplaces[nationalityIndex],
  };
};

export const clampStat = (value: number, min: number = 0, max: number = 100): number => {
  return Math.max(min, Math.min(max, value));
};

export const applyStatEffects = (character: Character, effects: any): Character => {
  let updatedCharacter = { ...character };
  
  // Apply basic stat changes
  if (effects.health !== undefined) updatedCharacter.health = clampStat(character.health + effects.health);
  if (effects.happiness !== undefined) updatedCharacter.happiness = clampStat(character.happiness + effects.happiness);
  if (effects.smarts !== undefined) updatedCharacter.smarts = clampStat(character.smarts + effects.smarts);
  if (effects.looks !== undefined) updatedCharacter.looks = clampStat(character.looks + effects.looks);
  if (effects.wealth !== undefined) updatedCharacter.wealth = Math.max(0, character.wealth + effects.wealth);
  if (effects.relationships !== undefined) updatedCharacter.relationships = clampStat(character.relationships + effects.relationships);
  if (effects.fame !== undefined) updatedCharacter.fame = clampStat(character.fame + effects.fame, 0, 100);
  
  // Apply career changes
  if (effects.salary !== undefined) updatedCharacter.salary = Math.max(0, character.salary + effects.salary);
  if (effects.job !== undefined) updatedCharacter.job = effects.job;
  if (effects.jobLevel !== undefined) updatedCharacter.jobLevel = character.jobLevel + effects.jobLevel;
  if (effects.education !== undefined) updatedCharacter.education = effects.education;
  
  // Apply relationship changes
  if (effects.relationshipStatus !== undefined) updatedCharacter.relationshipStatus = effects.relationshipStatus;
  if (effects.partnerName !== undefined) updatedCharacter.partnerName = effects.partnerName;
  if (effects.children !== undefined) updatedCharacter.children = [...character.children, ...effects.children];
  
  // Apply legal status changes
  if (effects.criminalRecord !== undefined) updatedCharacter.criminalRecord = effects.criminalRecord;
  
  return updatedCharacter;
};

export const getStatColor = (value: number): string => {
  if (value >= 80) return 'text-green-600';
  if (value >= 60) return 'text-yellow-600';
  if (value >= 40) return 'text-orange-600';
  return 'text-red-600';
};

export const getStatEmoji = (stat: string, value: number): string => {
  const emojis = {
    health: value >= 80 ? '💪' : value >= 60 ? '😊' : value >= 40 ? '😐' : '🤒',
    happiness: value >= 80 ? '😄' : value >= 60 ? '😊' : value >= 40 ? '😐' : '😢',
    smarts: value >= 80 ? '🧠' : value >= 60 ? '🤓' : value >= 40 ? '😐' : '🤪',
    looks: value >= 80 ? '😍' : value >= 60 ? '😊' : value >= 40 ? '😐' : '😵',
    wealth: value >= 200 ? '💰' : value >= 100 ? '💵' : value >= 50 ? '💳' : '🪙',
    relationships: value >= 80 ? '❤️' : value >= 60 ? '💛' : value >= 40 ? '🤝' : '💔',
    fame: value >= 80 ? '🌟' : value >= 60 ? '📺' : value >= 40 ? '📱' : '👤',
  };
  return emojis[stat as keyof typeof emojis] || '📊';
};

export const isGameOver = (character: Character): { gameOver: boolean; reason?: string } => {
  if (character.health <= 0) {
    return { gameOver: true, reason: 'Your health reached zero. You have passed away.' };
  }
  if (character.age >= 100) {
    return { gameOver: true, reason: 'You lived to be 100! What an incredible life journey!' };
  }
  return { gameOver: false };
};

export const getLifeStage = (age: number): string => {
  if (age < 2) return 'Baby';
  if (age < 13) return 'Child';
  if (age < 18) return 'Teenager';
  if (age < 65) return 'Adult';
  return 'Senior';
};

export const formatSalary = (salary: number): string => {
  if (salary === 0) return 'Unemployed';
  return `$${salary}k/year`;
};
