
import { FamilyMember } from '../types/relationships';

export const generateInitialFamily = (): FamilyMember[] => {
  const firstNames = {
    male: ['James', 'John', 'Robert', 'Michael', 'David', 'William', 'Richard', 'Joseph', 'Thomas', 'Christopher'],
    female: ['Mary', 'Patricia', 'Jennifer', 'Linda', 'Elizabeth', 'Barbara', 'Susan', 'Jessica', 'Sarah', 'Karen']
  };
  
  const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez'];
  
  const familyLastName = lastNames[Math.floor(Math.random() * lastNames.length)];
  
  const family: FamilyMember[] = [];
  
  // Generate mother
  const motherFirstName = firstNames.female[Math.floor(Math.random() * firstNames.female.length)];
  family.push({
    id: 'mother',
    name: `${motherFirstName} ${familyLastName}`,
    age: Math.floor(Math.random() * 15) + 25, // 25-40
    relationship: 'mother',
    gender: 'female',
    alive: true,
    health: Math.floor(Math.random() * 40) + 60,
    relationshipQuality: Math.floor(Math.random() * 40) + 60
  });
  
  // Generate father
  const fatherFirstName = firstNames.male[Math.floor(Math.random() * firstNames.male.length)];
  family.push({
    id: 'father',
    name: `${fatherFirstName} ${familyLastName}`,
    age: Math.floor(Math.random() * 15) + 27, // 27-42
    relationship: 'father',
    gender: 'male',
    alive: true,
    health: Math.floor(Math.random() * 40) + 60,
    relationshipQuality: Math.floor(Math.random() * 40) + 60
  });
  
  return family;
};
