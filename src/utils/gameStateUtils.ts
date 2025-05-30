
import { Character } from '../types/game';
import { ageFamilyMembers } from './familyUtils';
import { processYearlyFinances } from '../systems/moneySystem';

export const getRandomElement = <T>(array: T[]): T => {
  return array[Math.floor(Math.random() * array.length)];
};

export const ageCharacter = (character: Character): Character => {
  let updatedCharacter = { ...character };

  updatedCharacter.age += 1;

  // Age all family members and handle deaths
  updatedCharacter.familyMembers = ageFamilyMembers(updatedCharacter.familyMembers);

  // Process yearly finances - fix the money system
  updatedCharacter = processYearlyFinances(updatedCharacter);

  return updatedCharacter;
};
