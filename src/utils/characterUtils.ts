
import { Character } from '../types/character';
import { FamilyMember } from '../types/relationships';

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
