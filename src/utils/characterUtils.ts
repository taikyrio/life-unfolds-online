import { Character } from '../types/character';
import { PersonalityTraits } from '../types/character';
import { FamilyMember } from '../types/relationships';
import { generateInitialFamily } from './familyUtils';

export const generateRandomPersonality = (): PersonalityTraits => {
  return {
    kindness: Math.floor(Math.random() * 100),
    intelligence: Math.floor(Math.random() * 100),
    humor: Math.floor(Math.random() * 100),
    ambition: Math.floor(Math.random() * 100),
    honesty: Math.floor(Math.random() * 100),
    empathy: Math.floor(Math.random() * 100),
    creativity: Math.floor(Math.random() * 100),
    confidence: Math.floor(Math.random() * 100),
    patience: Math.floor(Math.random() * 100),
    loyalty: Math.floor(Math.random() * 100),
    analytical: Math.floor(Math.random() * 100),
    adventurous: Math.floor(Math.random() * 100),
    cautious: Math.floor(Math.random() * 100)
  };
};

export const getCharacterDescription = (character: Character): string => {
  const age = character.age;
  const name = character.name;
  const familyName = character.familyMembers?.length > 0 
    ? character.familyMembers[0].name.split(' ').pop() || 'Unknown'
    : 'Unknown';
  
  return `${name} ${familyName}, age ${age}`;
};

export const getLifeStage = (age: number): string => {
  if (age < 2) return 'Baby';
  if (age < 6) return 'Toddler';
  if (age < 13) return 'Child';
  if (age < 18) return 'Teenager';
  if (age < 25) return 'Young Adult';
  if (age < 40) return 'Adult';
  if (age < 60) return 'Middle-aged';
  return 'Senior';
};

export const calculateLifeSatisfaction = (character: Character): number => {
  const weights = {
    health: 0.25,
    happiness: 0.25,
    wealth: 0.15,
    relationships: 0.20,
    smarts: 0.10,
    looks: 0.05
  };

  return Math.round(
    character.health * weights.health +
    character.happiness * weights.happiness +
    Math.min(character.wealth, 100) * weights.wealth +
    character.relationships * weights.relationships +
    character.smarts * weights.smarts +
    character.looks * weights.looks
  );
};

export const getCharacterSummary = (character: Character): string => {
  const satisfaction = calculateLifeSatisfaction(character);
  const stage = getLifeStage(character.age);
  
  let summary = `A ${character.age}-year-old ${character.gender} in the ${stage.toLowerCase()} stage of life.`;
  
  if (satisfaction >= 80) {
    summary += ' Living an exceptional life with high satisfaction.';
  } else if (satisfaction >= 60) {
    summary += ' Generally content with life.';
  } else if (satisfaction >= 40) {
    summary += ' Facing some challenges but managing okay.';
  } else {
    summary += ' Struggling with significant life challenges.';
  }
  
  return summary;
};

export const generateRandomName = (): string => {
  const firstNames = {
    male: ['James', 'John', 'Robert', 'Michael', 'David', 'William', 'Richard', 'Joseph', 'Thomas', 'Christopher'],
    female: ['Mary', 'Patricia', 'Jennifer', 'Linda', 'Elizabeth', 'Barbara', 'Susan', 'Jessica', 'Sarah', 'Karen']
  };
  
  const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez'];
  
  const gender = Math.random() > 0.5 ? 'male' : 'female';
  const firstName = firstNames[gender][Math.floor(Math.random() * firstNames[gender].length)];
  const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
  
  return `${firstName} ${lastName}`;
};

export const createCharacter = (name: string, birthMonth: number, birthDay: number): Character => {
  const initialFamily = generateInitialFamily();
  
  return {
    id: 'player',
    name,
    gender: Math.random() > 0.5 ? 'male' : 'female',
    age: 0,
    health: 100,
    happiness: Math.floor(Math.random() * 40) + 30,
    smarts: Math.floor(Math.random() * 60) + 20,
    looks: Math.floor(Math.random() * 60) + 20,
    wealth: 0,
    relationships: 50,
    birthMonth,
    birthDay,
    birthYear: new Date().getFullYear(),
    achievements: [],
    assets: [],
    children: [],
    fame: 0,
    familyMembers: initialFamily,
    lifeEvents: []
  };
};

export const getRandomizedNewCharacter = (
  options: { name: string; id: string }, 
  mode: 'realistic' | 'balanced' | 'extreme' | 'high'
): Character => {
  const character = createCharacter(options.name, Math.floor(Math.random() * 12) + 1, Math.floor(Math.random() * 28) + 1);
  
  // Apply randomization based on mode
  switch (mode) {
    case 'realistic':
      character.happiness = Math.floor(Math.random() * 40) + 30;
      character.health = Math.floor(Math.random() * 20) + 80;
      character.smarts = Math.floor(Math.random() * 60) + 20;
      character.looks = Math.floor(Math.random() * 60) + 20;
      break;
    case 'balanced':
      character.happiness = Math.floor(Math.random() * 40) + 30;
      character.health = Math.floor(Math.random() * 40) + 30;
      character.smarts = Math.floor(Math.random() * 40) + 30;
      character.looks = Math.floor(Math.random() * 40) + 30;
      break;
    case 'extreme':
      character.happiness = Math.floor(Math.random() * 100);
      character.health = Math.floor(Math.random() * 100);
      character.smarts = Math.floor(Math.random() * 100);
      character.looks = Math.floor(Math.random() * 100);
      break;
    case 'high':
      character.happiness = Math.floor(Math.random() * 40) + 60;
      character.health = Math.floor(Math.random() * 40) + 60;
      character.smarts = Math.floor(Math.random() * 40) + 60;
      character.looks = Math.floor(Math.random() * 40) + 60;
      break;
  }
  
  character.wealth = Math.floor(Math.random() * 20) + 5;
  
  // Family members are already generated by createCharacter function
  return character;
};
