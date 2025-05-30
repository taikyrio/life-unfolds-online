
import { FamilyMember, RelationshipStats, PersonalityTraits } from '../types/game';
import { generateRandomName } from './characterUtils';

const jobs = [
  'Teacher', 'Engineer', 'Doctor', 'Nurse', 'Police Officer', 'Firefighter', 'Lawyer', 'Accountant',
  'Chef', 'Mechanic', 'Electrician', 'Plumber', 'Sales Representative', 'Manager', 'Receptionist',
  'Cashier', 'Waiter', 'Security Guard', 'Janitor', 'Delivery Driver', 'Construction Worker'
];

const generateRelationshipStats = (baseLevel: number = 60): RelationshipStats => ({
  relationshipLevel: Math.floor(Math.random() * 40) + baseLevel,
  trust: Math.floor(Math.random() * 40) + baseLevel,
  respect: Math.floor(Math.random() * 40) + baseLevel,
  lastInteraction: new Date().toISOString(),
  interactionHistory: []
});

const generatePersonalityTraits = (): PersonalityTraits => ({
  kindness: Math.floor(Math.random() * 100),
  loyalty: Math.floor(Math.random() * 100),
  intelligence: Math.floor(Math.random() * 100),
  humor: Math.floor(Math.random() * 100),
  ambition: Math.floor(Math.random() * 100),
  stability: Math.floor(Math.random() * 100),
  generosity: Math.floor(Math.random() * 100)
});

export const generateInitialFamily = (): FamilyMember[] => {
  const familyMembers: FamilyMember[] = [];
  
  // Generate father
  const father: FamilyMember = {
    id: Math.random().toString(36).substring(2, 15),
    name: generateRandomName(),
    relationship: 'father',
    age: Math.floor(Math.random() * 15) + 25, // 25-40 years old
    alive: true,
    health: Math.floor(Math.random() * 30) + 70, // 70-100 health
    relationshipQuality: Math.floor(Math.random() * 40) + 60, // 60-100 relationship
    job: jobs[Math.floor(Math.random() * jobs.length)],
    salary: Math.floor(Math.random() * 80000) + 30000, // $30k-$110k
    relationshipStats: generateRelationshipStats(60),
    personality: generatePersonalityTraits(),
    currentMood: 'neutral' as const
  };
  
  // Generate mother
  const mother: FamilyMember = {
    id: Math.random().toString(36).substring(2, 15),
    name: generateRandomName(),
    relationship: 'mother',
    age: Math.floor(Math.random() * 15) + 23, // 23-38 years old
    alive: true,
    health: Math.floor(Math.random() * 30) + 70,
    relationshipQuality: Math.floor(Math.random() * 40) + 60,
    job: jobs[Math.floor(Math.random() * jobs.length)],
    salary: Math.floor(Math.random() * 80000) + 25000,
    relationshipStats: generateRelationshipStats(60),
    personality: generatePersonalityTraits(),
    currentMood: 'neutral' as const
  };
  
  familyMembers.push(father, mother);
  
  // 30% chance of having siblings
  if (Math.random() < 0.3) {
    const sibling: FamilyMember = {
      id: Math.random().toString(36).substring(2, 15),
      name: generateRandomName(),
      relationship: 'sibling',
      age: Math.floor(Math.random() * 10) + 1, // 1-10 years old
      alive: true,
      health: Math.floor(Math.random() * 20) + 80,
      relationshipQuality: Math.floor(Math.random() * 60) + 40,
      relationshipStats: generateRelationshipStats(40),
      personality: generatePersonalityTraits(),
      currentMood: 'neutral' as const
    };
    familyMembers.push(sibling);
  }
  
  // 40% chance of having grandparents
  if (Math.random() < 0.4) {
    const grandparent: FamilyMember = {
      id: Math.random().toString(36).substring(2, 15),
      name: generateRandomName(),
      relationship: 'grandparent',
      age: Math.floor(Math.random() * 20) + 60, // 60-80 years old
      alive: true,
      health: Math.floor(Math.random() * 40) + 30, // 30-70 health (older)
      relationshipQuality: Math.floor(Math.random() * 50) + 50,
      relationshipStats: generateRelationshipStats(50),
      personality: generatePersonalityTraits(),
      currentMood: 'neutral' as const
    };
    familyMembers.push(grandparent);
  }
  
  return familyMembers;
};

export const ageFamilyMembers = (familyMembers: FamilyMember[]): FamilyMember[] => {
  return familyMembers.map(member => {
    const newAge = member.age + 1;
    let healthDecline = 1;
    
    // More health decline for older family members
    if (member.age > 70) healthDecline = 3;
    else if (member.age > 60) healthDecline = 2;
    
    const newHealth = Math.max(0, member.health - healthDecline);
    
    return {
      ...member,
      age: newAge,
      health: newHealth,
      alive: newHealth > 0
    };
  });
};

export const generateNewRelationships = (character: any): FamilyMember[] => {
  // Simple implementation - occasionally add new friends
  if (Math.random() < 0.1 && character.age >= 5) {
    return [{
      id: Math.random().toString(36).substring(2, 15),
      name: generateRandomName(),
      relationship: 'friend',
      age: character.age + Math.floor(Math.random() * 10) - 5,
      alive: true,
      health: Math.floor(Math.random() * 40) + 60,
      relationshipQuality: Math.floor(Math.random() * 30) + 20,
      relationshipStats: generateRelationshipStats(20),
      personality: generatePersonalityTraits(),
      currentMood: 'neutral' as const
    }];
  }
  return [];
};
