
import { FamilyBackground } from '../types/personality';
import { FamilyMember } from '../types/relationships';

export const generateFamilyBackground = (): FamilyBackground => {
  const backgrounds = [
    'wealthy', 'middle_class', 'working_class', 'poor', 'single_parent', 
    'large_family', 'military', 'academic', 'artistic', 'immigrant'
  ];
  
  return {
    type: backgrounds[Math.floor(Math.random() * backgrounds.length)],
    description: 'A loving family that shaped your early years.',
    traits: {
      familyIncome: Math.floor(Math.random() * 100),
      parentEducation: Math.floor(Math.random() * 100),
      familyStability: Math.floor(Math.random() * 100),
      parentalSupport: Math.floor(Math.random() * 100),
      familySize: Math.floor(Math.random() * 8) + 2
    }
  };
};

export const applyFamilyBackground = (character: any, background: FamilyBackground): void => {
  // Apply background effects to character stats
  switch (background.type) {
    case 'wealthy':
      character.wealth += 50;
      character.happiness += 10;
      break;
    case 'poor':
      character.wealth -= 30;
      character.smarts += 5; // resilience from hardship
      break;
    case 'academic':
      character.smarts += 20;
      break;
    case 'artistic':
      character.looks += 10;
      character.happiness += 10;
      break;
  }
};

export const generateFamilyName = (familyMembers: FamilyMember[]): string => {
  const lastNames = [
    'Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 
    'Davis', 'Rodriguez', 'Martinez', 'Hernandez', 'Lopez', 'Gonzalez'
  ];
  return lastNames[Math.floor(Math.random() * lastNames.length)];
};
