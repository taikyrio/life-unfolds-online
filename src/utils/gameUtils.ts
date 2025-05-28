import { Character, FamilyMember, ZodiacSign } from '../types/game';
import { getZodiacSign, getZodiacEffects } from '../services/zodiacService';

const nationalities = ['American', 'British', 'Canadian', 'Australian', 'German', 'French', 'Japanese', 'Brazilian'];
const birthplaces = ['New York', 'London', 'Toronto', 'Sydney', 'Berlin', 'Paris', 'Tokyo', 'São Paulo'];

const firstNames = [
  'Alex', 'Jordan', 'Casey', 'Riley', 'Morgan', 'Avery', 'Quinn', 'Taylor',
  'Sam', 'Blake', 'Cameron', 'Devon', 'Finley', 'Harper', 'Hayden', 'Jamie',
  'Charlie', 'Sage', 'River', 'Phoenix', 'Rowan', 'Emery', 'Reese', 'Drew',
  'Mason', 'Emma', 'Liam', 'Olivia', 'Noah', 'Ava', 'William', 'Sophia',
  'James', 'Isabella', 'Benjamin', 'Charlotte', 'Lucas', 'Amelia', 'Henry'
];

const lastNames = [
  'Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis',
  'Rodriguez', 'Martinez', 'Hernandez', 'Lopez', 'Gonzalez', 'Wilson', 'Anderson',
  'Thomas', 'Taylor', 'Moore', 'Jackson', 'Martin', 'Lee', 'Perez', 'Thompson'
];

export const generateRandomName = (): string => {
  const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
  const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
  return `${firstName} ${lastName}`;
};

export const generateFamilyMember = (relationship: string, baseAge: number): FamilyMember => {
  let age;
  switch (relationship) {
    case 'father':
    case 'mother':
      age = baseAge + Math.floor(Math.random() * 20) + 20;
      break;
    case 'sibling':
      age = baseAge + Math.floor(Math.random() * 10) - 5;
      if (age < 0) age = Math.abs(age);
      break;
    case 'grandparent':
      age = baseAge + Math.floor(Math.random() * 30) + 45;
      break;
    default:
      age = baseAge;
  }

  return {
    id: Math.random().toString(36).substr(2, 9),
    name: generateRandomName(),
    relationship: relationship as any,
    age: Math.max(1, age),
    alive: Math.random() > (relationship === 'grandparent' ? 0.3 : 0.1),
    health: Math.floor(Math.random() * 40) + 60,
    relationshipQuality: Math.floor(Math.random() * 30) + 70
  };
};

export const generateRandomStats = (): Omit<Character, 'name' | 'age' | 'year'> => {
  const nationalityIndex = Math.floor(Math.random() * nationalities.length);
  const birthMonth = Math.floor(Math.random() * 12) + 1;
  const birthDay = Math.floor(Math.random() * 28) + 1;
  const zodiacSign = getZodiacSign(birthMonth, birthDay);
  const zodiacEffects = getZodiacEffects(zodiacSign);
  
  // Generate family members
  const familyMembers: FamilyMember[] = [
    generateFamilyMember('father', 0),
    generateFamilyMember('mother', 0),
  ];
  
  // 70% chance of having siblings
  if (Math.random() > 0.3) {
    const siblingCount = Math.floor(Math.random() * 3) + 1;
    for (let i = 0; i < siblingCount; i++) {
      familyMembers.push(generateFamilyMember('sibling', 0));
    }
  }
  
  // 80% chance of having at least one grandparent
  if (Math.random() > 0.2) {
    const grandparentCount = Math.floor(Math.random() * 4) + 1;
    for (let i = 0; i < grandparentCount; i++) {
      familyMembers.push(generateFamilyMember('grandparent', 0));
    }
  }

  const baseStats = {
    health: Math.floor(Math.random() * 30) + 70,
    happiness: Math.floor(Math.random() * 30) + 70,
    smarts: Math.floor(Math.random() * 30) + 70,
    looks: Math.floor(Math.random() * 30) + 70,
    wealth: Math.floor(Math.random() * 100) + 50,
    relationships: Math.floor(Math.random() * 30) + 70,
  };

  return {
    ...baseStats,
    health: clampStat(baseStats.health + (zodiacEffects.health || 0)),
    happiness: clampStat(baseStats.happiness + (zodiacEffects.happiness || 0)),
    smarts: clampStat(baseStats.smarts + (zodiacEffects.smarts || 0)),
    relationships: clampStat(baseStats.relationships + (zodiacEffects.relationships || 0)),
    wealth: Math.max(0, baseStats.wealth + (zodiacEffects.wealth || 0)),
    
    // Enhanced character info
    zodiacSign,
    birthMonth,
    birthDay,
    familyMembers,
    pets: [],
    
    // Career & Education
    jobLevel: 0,
    salary: 0,
    education: 'None',
    
    // Relationships
    relationshipStatus: 'single',
    children: [],
    
    // Life Status
    criminalRecord: false,
    fame: 0,
    nationality: nationalities[nationalityIndex],
    birthplace: birthplaces[nationalityIndex],
    
    // Birth circumstances
    birthWeight: Math.random() * 3 + 5.5, // 5.5-8.5 pounds
    birthComplications: Math.random() < 0.1, // 10% chance
    premature: Math.random() < 0.08, // 8% chance
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
  
  // Apply family member effects
  if (effects.familyMemberHealth || effects.familyMemberRelationship) {
    updatedCharacter.familyMembers = character.familyMembers.map(member => {
      let updatedMember = { ...member };
      
      if (effects.familyMemberHealth && effects.familyMemberHealth.id === member.id) {
        updatedMember.health = clampStat(member.health + effects.familyMemberHealth.change);
      }
      
      if (effects.familyMemberRelationship && effects.familyMemberRelationship.id === member.id) {
        updatedMember.relationshipQuality = clampStat(member.relationshipQuality + effects.familyMemberRelationship.change);
      }
      
      return updatedMember;
    });
  }
  
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

export const getMonthName = (month: number): string => {
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  return months[month - 1] || 'Unknown';
};
