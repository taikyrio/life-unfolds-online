
import { FamilyMember } from '../types/relationships';

export const generateInitialFamily = (): FamilyMember[] => {
  const family: FamilyMember[] = [];

  // Generate mother
  const mother: FamilyMember = {
    id: 'mother',
    name: generateRandomName() + ' Jones',
    relationship: 'mother',
    age: 25 + Math.floor(Math.random() * 20),
    alive: true,
    health: 60 + Math.floor(Math.random() * 40),
    relationshipStats: {
      relationshipLevel: 50 + Math.floor(Math.random() * 40),
      trust: 50 + Math.floor(Math.random() * 40),
      respect: 60 + Math.floor(Math.random() * 30),
      communication: 50 + Math.floor(Math.random() * 40),
      intimacy: 0,
      conflictResolution: 50 + Math.floor(Math.random() * 40),
      sharedInterests: 30 + Math.floor(Math.random() * 50),
      timeSpentTogether: 0,
      lastInteraction: new Date().toISOString(),
      interactionHistory: []
    },
    relationshipQuality: 50 + Math.floor(Math.random() * 40),
    personality: {
      kindness: Math.floor(Math.random() * 100),
      loyalty: Math.floor(Math.random() * 100),
      intelligence: Math.floor(Math.random() * 100),
      humor: Math.floor(Math.random() * 100),
      ambition: Math.floor(Math.random() * 100),
      stability: Math.floor(Math.random() * 100),
      generosity: Math.floor(Math.random() * 100)
    },
    currentMood: 'neutral'
  };

  // Generate father
  const father: FamilyMember = {
    id: 'father',
    name: generateRandomName() + ' Jones',
    relationship: 'father',
    age: 25 + Math.floor(Math.random() * 25),
    alive: true,
    health: 60 + Math.floor(Math.random() * 40),
    relationshipStats: {
      relationshipLevel: 50 + Math.floor(Math.random() * 50),
      trust: 50 + Math.floor(Math.random() * 40),
      respect: 50 + Math.floor(Math.random() * 40),
      communication: 40 + Math.floor(Math.random() * 50),
      intimacy: 0,
      conflictResolution: 40 + Math.floor(Math.random() * 40),
      sharedInterests: 40 + Math.floor(Math.random() * 50),
      timeSpentTogether: 0,
      lastInteraction: new Date().toISOString(),
      interactionHistory: []
    },
    relationshipQuality: 50 + Math.floor(Math.random() * 50),
    personality: {
      kindness: Math.floor(Math.random() * 100),
      loyalty: Math.floor(Math.random() * 100),
      intelligence: Math.floor(Math.random() * 100),
      humor: Math.floor(Math.random() * 100),
      ambition: Math.floor(Math.random() * 100),
      stability: Math.floor(Math.random() * 100),
      generosity: Math.floor(Math.random() * 100)
    },
    currentMood: 'neutral'
  };

  family.push(mother, father);

  console.log('Generated family members:', family);
  return family;
};

export const ageFamilyMembers = (familyMembers: FamilyMember[]): FamilyMember[] => {
  return familyMembers.map(member => ({
    ...member,
    age: member.age + 1,
    health: Math.max(0, member.health - (member.age > 60 ? 2 : 0))
  }));
};

export const generateNewRelationships = (character: any): FamilyMember[] => {
  const newRelationships: FamilyMember[] = [];
  
  // Chance to meet new people based on age and circumstances
  if (character.age >= 16 && Math.random() < 0.1) {
    const relationshipTypes = ['friend', 'acquaintance', 'colleague'];
    const randomType = relationshipTypes[Math.floor(Math.random() * relationshipTypes.length)];
    
    newRelationships.push({
      id: `new_${Date.now()}`,
      name: generateRandomName(),
      relationship: randomType,
      age: character.age + Math.floor(Math.random() * 10 - 5),
      alive: true,
      health: 80 + Math.floor(Math.random() * 20),
      relationshipStats: {
        relationshipLevel: 30 + Math.floor(Math.random() * 40),
        trust: 40 + Math.floor(Math.random() * 30),
        respect: 40 + Math.floor(Math.random() * 30),
        communication: 30 + Math.floor(Math.random() * 40),
        intimacy: 0,
        conflictResolution: 40 + Math.floor(Math.random() * 30),
        sharedInterests: 20 + Math.floor(Math.random() * 60),
        timeSpentTogether: 0,
        lastInteraction: new Date().toISOString(),
        interactionHistory: []
      },
      relationshipQuality: 40 + Math.floor(Math.random() * 30),
      personality: {
        kindness: Math.floor(Math.random() * 100),
        loyalty: Math.floor(Math.random() * 100),
        intelligence: Math.floor(Math.random() * 100),
        humor: Math.floor(Math.random() * 100),
        ambition: Math.floor(Math.random() * 100),
        stability: Math.floor(Math.random() * 100),
        generosity: Math.floor(Math.random() * 100)
      },
      currentMood: 'neutral'
    });
  }
  
  return newRelationships;
};

const generateRandomName = (): string => {
  const firstNames = [
    'Alexander', 'Sophia', 'William', 'Emma', 'James', 'Olivia', 'Benjamin', 'Isabella',
    'Lucas', 'Charlotte', 'Henry', 'Amelia', 'Owen', 'Mia', 'Theodore', 'Harper',
    'Samuel', 'Evelyn', 'David', 'Abigail', 'Joseph', 'Emily', 'Carter', 'Elizabeth',
    'Wyatt', 'Avery', 'John', 'Sofia', 'Jack', 'Ella', 'Luke', 'Madison', 'Jayden',
    'Scarlett', 'Christopher', 'Victoria', 'Joshua', 'Aria', 'Andrew', 'Grace',
    'Gabriel', 'Chloe', 'Samuel', 'Camila', 'Anthony', 'Penelope', 'Caleb', 'Riley'
  ];
  
  return firstNames[Math.floor(Math.random() * firstNames.length)];
};
