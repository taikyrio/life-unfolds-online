
import { Character } from '../types/character';
import { PersonalityTraits } from '../types/personality';

export type RandomizationMode = 'realistic' | 'balanced' | 'extreme' | 'high';

export const randomizeStats = (
  character: Character,
  options: {
    mode: RandomizationMode;
    preserveAge?: boolean;
    preserveEducation?: boolean;
    preserveWealth?: boolean;
  }
): Character => {
  const randomizedCharacter = { ...character };
  
  if (!options.preserveAge) {
    randomizedCharacter.age = character.age;
  }
  
  // Apply randomization based on mode
  switch (options.mode) {
    case 'realistic':
      randomizedCharacter.happiness = Math.floor(Math.random() * 40) + 30; // 30-70
      randomizedCharacter.health = Math.floor(Math.random() * 20) + 80; // 80-100
      randomizedCharacter.smarts = Math.floor(Math.random() * 60) + 20; // 20-80
      randomizedCharacter.looks = Math.floor(Math.random() * 60) + 20; // 20-80
      break;
    case 'balanced':
      randomizedCharacter.happiness = Math.floor(Math.random() * 40) + 30; // 30-70
      randomizedCharacter.health = Math.floor(Math.random() * 40) + 30; // 30-70
      randomizedCharacter.smarts = Math.floor(Math.random() * 40) + 30; // 30-70
      randomizedCharacter.looks = Math.floor(Math.random() * 40) + 30; // 30-70
      break;
    case 'extreme':
      randomizedCharacter.happiness = Math.floor(Math.random() * 100);
      randomizedCharacter.health = Math.floor(Math.random() * 100);
      randomizedCharacter.smarts = Math.floor(Math.random() * 100);
      randomizedCharacter.looks = Math.floor(Math.random() * 100);
      break;
    case 'high':
      randomizedCharacter.happiness = Math.floor(Math.random() * 40) + 60; // 60-100
      randomizedCharacter.health = Math.floor(Math.random() * 40) + 60; // 60-100
      randomizedCharacter.smarts = Math.floor(Math.random() * 40) + 60; // 60-100
      randomizedCharacter.looks = Math.floor(Math.random() * 40) + 60; // 60-100
      break;
  }
  
  if (!options.preserveWealth) {
    randomizedCharacter.wealth = Math.floor(Math.random() * 20) + 5; // 5-25
  }
  
  return randomizedCharacter;
};

export const generateRandomAppearance = () => {
  const hairColors = ['Black', 'Brown', 'Blonde', 'Red', 'Gray', 'Auburn'];
  const eyeColors = ['Brown', 'Blue', 'Green', 'Hazel', 'Gray'];
  const skinTones = ['Fair', 'Light', 'Medium', 'Olive', 'Dark'];
  
  return {
    hairColor: hairColors[Math.floor(Math.random() * hairColors.length)],
    eyeColor: eyeColors[Math.floor(Math.random() * eyeColors.length)],
    skinTone: skinTones[Math.floor(Math.random() * skinTones.length)],
    health: Math.floor(Math.random() * 40) + 60,
    happiness: Math.floor(Math.random() * 60) + 20,
    smarts: Math.floor(Math.random() * 60) + 20,
    looks: Math.floor(Math.random() * 60) + 20
  };
};

export const generateRandomPersonality = (): PersonalityTraits => {
  return {
    openness: Math.floor(Math.random() * 80) + 10,
    conscientiousness: Math.floor(Math.random() * 80) + 10,
    extraversion: Math.floor(Math.random() * 80) + 10,
    agreeableness: Math.floor(Math.random() * 80) + 10,
    neuroticism: Math.floor(Math.random() * 80) + 10,
    creativity: Math.floor(Math.random() * 80) + 10,
    ambition: Math.floor(Math.random() * 80) + 10,
    empathy: Math.floor(Math.random() * 80) + 10,
    resilience: Math.floor(Math.random() * 80) + 10,
    curiosity: Math.floor(Math.random() * 80) + 10
  };
};
