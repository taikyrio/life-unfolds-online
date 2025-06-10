
import { FamilyMember } from '../types/relationships';
import { Character } from '../types/character';

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
    alive: true,
    health: Math.floor(Math.random() * 40) + 60,
    relationshipQuality: Math.floor(Math.random() * 40) + 60
  });
  
  return family;
};

export const ageFamilyMembers = (familyMembers: FamilyMember[]): FamilyMember[] => {
  return familyMembers.map(member => ({
    ...member,
    age: (member.age || 0) + 1,
    // Small chance of health decline with age
    health: member.alive && member.age && member.age > 50 && Math.random() < 0.1 
      ? Math.max(0, (member.health || 100) - Math.floor(Math.random() * 5)) 
      : member.health
  }));
};

export const generateNewRelationships = (character: Character): FamilyMember[] => {
  const newRelationships: FamilyMember[] = [];
  
  // Small chance to meet new people based on age and social situations
  if (character.age >= 16 && Math.random() < 0.1) {
    const firstNames = {
      male: ['James', 'John', 'Robert', 'Michael', 'David'],
      female: ['Mary', 'Patricia', 'Jennifer', 'Linda', 'Elizabeth']
    };
    
    const gender = Math.random() > 0.5 ? 'male' : 'female';
    const firstName = firstNames[gender][Math.floor(Math.random() * firstNames[gender].length)];
    const lastName = ['Smith', 'Johnson', 'Williams'][Math.floor(Math.random() * 3)];
    
    newRelationships.push({
      id: `friend_${Date.now()}`,
      name: `${firstName} ${lastName}`,
      age: character.age + Math.floor(Math.random() * 10) - 5,
      relationship: 'friend',
      alive: true,
      relationshipQuality: Math.floor(Math.random() * 30) + 40
    });
  }
  
  return newRelationships;
};
