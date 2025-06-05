import { FamilyMember } from '../types/relationships';

export const generateInitialFamily = (playerLastName?: string): FamilyMember[] => {
  const family: FamilyMember[] = [];

  // Generate last name for the family
  const lastNames = [
    'Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis',
    'Rodriguez', 'Martinez', 'Hernandez', 'Lopez', 'Gonzalez', 'Wilson', 'Anderson', 'Thomas'
  ];

  const familyLastName = playerLastName || lastNames[Math.floor(Math.random() * lastNames.length)];

  // Generate mother
  const motherNames = [
    'Sarah', 'Jennifer', 'Lisa', 'Michelle', 'Angela', 'Melissa', 'Brenda', 'Amy',
    'Anna', 'Rebecca', 'Virginia', 'Kathleen', 'Pamela', 'Martha', 'Debra', 'Rachel'
  ];

  // Generate father
  const fatherNames = [
    'Michael', 'Christopher', 'Matthew', 'Joshua', 'David', 'James', 'Daniel', 'Robert',
    'John', 'Joseph', 'Andrew', 'Ryan', 'Brandon', 'Jason', 'Justin', 'William'
  ];
    // Generate sibling
  const siblingNames = [
    'Alex', 'Jordan', 'Taylor', 'Morgan', 'Casey', 'Riley'
  ];

  const generateRandomName = () => {
    const names = ['Alex', 'Jordan', 'Taylor', 'Morgan', 'Casey', 'Riley', 'Emma', 'Liam', 'Olivia', 'Noah'];
    return names[Math.floor(Math.random() * names.length)];
  };

  const mother: FamilyMember = {
    id: 'mother',
    name: `${motherNames[Math.floor(Math.random() * motherNames.length)]} ${familyLastName}`,
    relationship: 'mother',
    age: Math.floor(Math.random() * 20) + 30,
    alive: true,
    health: Math.floor(Math.random() * 30) + 70,
    relationshipStats: {
      relationshipLevel: Math.floor(Math.random() * 30) + 60,
      trust: Math.floor(Math.random() * 30) + 60,
      communication: Math.floor(Math.random() * 30) + 50,
      intimacy: 0,
      conflictResolution: Math.floor(Math.random() * 30) + 50,
      sharedInterests: Math.floor(Math.random() * 30) + 40,
      timeSpentTogether: 0,
      lastInteraction: new Date().toISOString(),
      interactionHistory: [],
      respect: Math.floor(Math.random() * 30) + 60
    },
    relationshipQuality: Math.floor(Math.random() * 30) + 60,
    personality: {
      kindness: Math.floor(Math.random() * 40) + 50,
      loyalty: Math.floor(Math.random() * 40) + 60,
      intelligence: Math.floor(Math.random() * 40) + 40,
      humor: Math.floor(Math.random() * 40) + 40,
      ambition: Math.floor(Math.random() * 40) + 40,
      stability: Math.floor(Math.random() * 40) + 50,
      generosity: Math.floor(Math.random() * 40) + 50
    },
    currentMood: 'neutral'
  };

  const father: FamilyMember = {
    id: 'father',
    name: `${fatherNames[Math.floor(Math.random() * fatherNames.length)]} ${familyLastName}`,
    relationship: 'father',
    age: Math.floor(Math.random() * 20) + 32,
    alive: true,
    health: Math.floor(Math.random() * 30) + 70,
    relationshipStats: {
      relationshipLevel: Math.floor(Math.random() * 30) + 60,
      trust: Math.floor(Math.random() * 30) + 60,
      communication: Math.floor(Math.random() * 30) + 50,
      intimacy: 0,
      conflictResolution: Math.floor(Math.random() * 30) + 50,
      sharedInterests: Math.floor(Math.random() * 30) + 40,
      timeSpentTogether: 0,
      lastInteraction: new Date().toISOString(),
      interactionHistory: [],
      respect: Math.floor(Math.random() * 30) + 60
    },
    relationshipQuality: Math.floor(Math.random() * 30) + 60,
    personality: {
      kindness: Math.floor(Math.random() * 40) + 50,
      loyalty: Math.floor(Math.random() * 40) + 60,
      intelligence: Math.floor(Math.random() * 40) + 40,
      humor: Math.floor(Math.random() * 40) + 40,
      ambition: Math.floor(Math.random() * 40) + 40,
      stability: Math.floor(Math.random() * 40) + 50,
      generosity: Math.floor(Math.random() * 40) + 50
    },
    currentMood: 'neutral'
  };

  family.push(mother, father);

  // Randomly add siblings
  const siblingCount = Math.random() < 0.7 ? Math.floor(Math.random() * 3) : 0;
  for (let i = 0; i < siblingCount; i++) {
    const sibling: FamilyMember = {
      id: `sibling_${i}`,
      name: `${siblingNames[Math.floor(Math.random() * siblingNames.length)]} ${familyLastName}`,
      relationship: 'sibling',
      age: Math.floor(Math.random() * 20) + 5,
      alive: true,
      health: Math.floor(Math.random() * 30) + 80,
      relationshipStats: {
        relationshipLevel: Math.floor(Math.random() * 40) + 40,
        trust: Math.floor(Math.random() * 40) + 40,
        communication: Math.floor(Math.random() * 40) + 30,
        intimacy: 0,
        conflictResolution: Math.floor(Math.random() * 40) + 30,
        sharedInterests: Math.floor(Math.random() * 40) + 50,
        timeSpentTogether: 0,
        lastInteraction: new Date().toISOString(),
        interactionHistory: [],
        respect: Math.floor(Math.random() * 40) + 40
      },

      personality: {
        kindness: Math.floor(Math.random() * 60) + 20,
        loyalty: Math.floor(Math.random() * 60) + 20,
        intelligence: Math.floor(Math.random() * 60) + 20,
        humor: Math.floor(Math.random() * 60) + 20,
        ambition: Math.floor(Math.random() * 60) + 20,
        stability: Math.floor(Math.random() * 60) + 20,
        generosity: Math.floor(Math.random() * 60) + 20
      },
      currentMood: 'neutral'
    };
    family.push(sibling);
  }

  return family;
};

export const ageFamilyMembers = (familyMembers: FamilyMember[]): FamilyMember[] => {
  return familyMembers.map(member => ({
    ...member,
    age: (member.age || 0) + 1
  }));
};

export const generateNewRelationships = (character: any): FamilyMember[] => {
  // Occasionally generate new family members (births, etc.)
  if (Math.random() < 0.05) { // 5% chance
    return [{
      id: Date.now().toString(),
      name: 'New Family Member',
      relationship: 'friend',
      age: 0,
      alive: true,
      health: 100,
      relationshipStats: {
        relationshipLevel: 50,
        trust: 50,
        communication: 50,
        intimacy: 0,
        conflictResolution: 50,
        sharedInterests: 50,
        timeSpentTogether: 0,
        lastInteraction: new Date().toISOString(),
        interactionHistory: [],
        respect: 50
      },

      personality: {
        kindness: 50,
        loyalty: 50,
        intelligence: 50,
        humor: 50,
        ambition: 50,
        stability: 50,
        generosity: 50
      },
      currentMood: 'neutral' as const
    }];
  }
  return [];
};