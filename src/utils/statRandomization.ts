
import { Character } from '../types/character';

export const randomizeStats = (
  character: Character,
  options: {
    mode: string;
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
    case 'random':
      randomizedCharacter.happiness = Math.floor(Math.random() * 100);
      randomizedCharacter.health = Math.floor(Math.random() * 100);
      randomizedCharacter.smarts = Math.floor(Math.random() * 100);
      randomizedCharacter.looks = Math.floor(Math.random() * 100);
      break;
    case 'blessed':
      randomizedCharacter.happiness = Math.floor(Math.random() * 20) + 80; // 80-100
      randomizedCharacter.health = Math.floor(Math.random() * 10) + 90; // 90-100
      randomizedCharacter.smarts = Math.floor(Math.random() * 20) + 80; // 80-100
      randomizedCharacter.looks = Math.floor(Math.random() * 20) + 80; // 80-100
      break;
  }
  
  if (!options.preserveWealth) {
    randomizedCharacter.wealth = Math.floor(Math.random() * 20) + 5; // 5-25
  }
  
  return randomizedCharacter;
};
