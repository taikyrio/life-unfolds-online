import { Character, FamilyMember, LifeEvent, ZodiacSign } from '../types/game';
import { lifeEvents } from '../data/lifeEvents';
import { educationLevels, shouldAutoEnrollInSchool } from './educationUtils';
import { processYearlyFinances } from '../systems/moneySystem';

const firstNames = [
  'Alex', 'Jordan', 'Taylor', 'Morgan', 'Casey', 'Riley', 'Cameron', 'Quinn', 'Sage', 'River',
  'Emma', 'Olivia', 'Ava', 'Isabella', 'Sophia', 'Charlotte', 'Mia', 'Amelia', 'Harper', 'Evelyn',
  'Liam', 'Noah', 'Oliver', 'Elijah', 'James', 'William', 'Benjamin', 'Lucas', 'Henry', 'Alexander',
  'Aria', 'Luna', 'Grace', 'Chloe', 'Penelope', 'Layla', 'Riley', 'Zoey', 'Nora', 'Lily',
  'Mason', 'Ethan', 'Michael', 'Daniel', 'Jacob', 'Logan', 'Jackson', 'Levi', 'Sebastian', 'Mateo',
  'Zoe', 'Elena', 'Claire', 'Maya', 'Leah', 'Madeline', 'Kylie', 'Audrey', 'Anna', 'Sarah'
];

const lastNames = [
  'Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez',
  'Hernandez', 'Lopez', 'Gonzalez', 'Wilson', 'Anderson', 'Thomas', 'Taylor', 'Moore', 'Jackson', 'Martin',
  'Lee', 'Perez', 'Thompson', 'White', 'Harris', 'Sanchez', 'Clark', 'Ramirez', 'Lewis', 'Robinson',
  'Walker', 'Young', 'Allen', 'King', 'Wright', 'Scott', 'Torres', 'Nguyen', 'Hill', 'Flores',
  'Green', 'Adams', 'Nelson', 'Baker', 'Hall', 'Rivera', 'Campbell', 'Mitchell', 'Carter', 'Roberts'
];

const birthplaces = [
  'New York, NY', 'Los Angeles, CA', 'Chicago, IL', 'Houston, TX', 'Phoenix, AZ',
  'Philadelphia, PA', 'San Antonio, TX', 'San Diego, CA', 'Dallas, TX', 'San Jose, CA',
  'Austin, TX', 'Jacksonville, FL', 'Fort Worth, TX', 'Columbus, OH', 'Charlotte, NC',
  'San Francisco, CA', 'Indianapolis, IN', 'Seattle, WA', 'Denver, CO', 'Washington, DC',
  'Boston, MA', 'El Paso, TX', 'Nashville, TN', 'Detroit, MI', 'Oklahoma City, OK',
  'Portland, OR', 'Las Vegas, NV', 'Memphis, TN', 'Louisville, KY', 'Baltimore, MD'
];

const jobs = [
  'Teacher', 'Engineer', 'Doctor', 'Nurse', 'Police Officer', 'Firefighter', 'Lawyer', 'Accountant',
  'Chef', 'Mechanic', 'Electrician', 'Plumber', 'Sales Representative', 'Manager', 'Receptionist',
  'Cashier', 'Waiter', 'Security Guard', 'Janitor', 'Delivery Driver', 'Construction Worker'
];

export const getLifeStage = (age: number): string => {
  if (age < 3) return 'Baby';
  if (age < 6) return 'Toddler';
  if (age < 13) return 'Child';
  if (age < 18) return 'Teen';
  if (age < 30) return 'Young Adult';
  if (age < 50) return 'Adult';
  if (age < 65) return 'Middle-aged';
  return 'Senior';
};

export const getStatEmoji = (stat: string, value: number): string => {
  const getLevel = (val: number) => {
    if (val >= 90) return 'excellent';
    if (val >= 70) return 'good';
    if (val >= 50) return 'average';
    if (val >= 30) return 'poor';
    return 'very_poor';
  };

  const level = getLevel(value);
  
  const emojiMap: Record<string, Record<string, string>> = {
    health: {
      excellent: '💪',
      good: '😊',
      average: '😐',
      poor: '😷',
      very_poor: '🤒'
    },
    happiness: {
      excellent: '😄',
      good: '😊',
      average: '😐',
      poor: '😔',
      very_poor: '😭'
    },
    smarts: {
      excellent: '🧠',
      good: '🤓',
      average: '😐',
      poor: '😕',
      very_poor: '🤪'
    },
    looks: {
      excellent: '😍',
      good: '😊',
      average: '😐',
      poor: '😕',
      very_poor: '😰'
    },
    wealth: {
      excellent: '💰',
      good: '💵',
      average: '💳',
      poor: '🪙',
      very_poor: '📉'
    },
    relationships: {
      excellent: '💕',
      good: '😊',
      average: '😐',
      poor: '😔',
      very_poor: '💔'
    }
  };

  return emojiMap[stat]?.[level] || '😐';
};

export const generateRandomName = (): string => {
  const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
  const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
  return `${firstName} ${lastName}`;
};

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
    relationshipStats: {
      relationshipLevel: Math.floor(Math.random() * 40) + 60,
      trust: Math.floor(Math.random() * 40) + 60,
      respect: Math.floor(Math.random() * 40) + 60,
      lastInteraction: new Date().toISOString(),
      interactionHistory: []
    },
    personality: {
      kindness: Math.floor(Math.random() * 100),
      loyalty: Math.floor(Math.random() * 100),
      intelligence: Math.floor(Math.random() * 100),
      humor: Math.floor(Math.random() * 100),
      ambition: Math.floor(Math.random() * 100),
      stability: Math.floor(Math.random() * 100),
      generosity: Math.floor(Math.random() * 100)
    },
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
    relationshipStats: {
      relationshipLevel: Math.floor(Math.random() * 40) + 60,
      trust: Math.floor(Math.random() * 40) + 60,
      respect: Math.floor(Math.random() * 40) + 60,
      lastInteraction: new Date().toISOString(),
      interactionHistory: []
    },
    personality: {
      kindness: Math.floor(Math.random() * 100),
      loyalty: Math.floor(Math.random() * 100),
      intelligence: Math.floor(Math.random() * 100),
      humor: Math.floor(Math.random() * 100),
      ambition: Math.floor(Math.random() * 100),
      stability: Math.floor(Math.random() * 100),
      generosity: Math.floor(Math.random() * 100)
    },
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
      relationshipStats: {
        relationshipLevel: Math.floor(Math.random() * 60) + 40,
        trust: Math.floor(Math.random() * 60) + 40,
        respect: Math.floor(Math.random() * 60) + 40,
        lastInteraction: new Date().toISOString(),
        interactionHistory: []
      },
      personality: {
        kindness: Math.floor(Math.random() * 100),
        loyalty: Math.floor(Math.random() * 100),
        intelligence: Math.floor(Math.random() * 100),
        humor: Math.floor(Math.random() * 100),
        ambition: Math.floor(Math.random() * 100),
        stability: Math.floor(Math.random() * 100),
        generosity: Math.floor(Math.random() * 100)
      },
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
      relationshipStats: {
        relationshipLevel: Math.floor(Math.random() * 50) + 50,
        trust: Math.floor(Math.random() * 50) + 50,
        respect: Math.floor(Math.random() * 50) + 50,
        lastInteraction: new Date().toISOString(),
        interactionHistory: []
      },
      personality: {
        kindness: Math.floor(Math.random() * 100),
        loyalty: Math.floor(Math.random() * 100),
        intelligence: Math.floor(Math.random() * 100),
        humor: Math.floor(Math.random() * 100),
        ambition: Math.floor(Math.random() * 100),
        stability: Math.floor(Math.random() * 100),
        generosity: Math.floor(Math.random() * 100)
      },
      currentMood: 'neutral' as const
    };
    familyMembers.push(grandparent);
  }
  
  return familyMembers;
};

export const generateRandomStats = () => {
  const zodiacSigns = [
    { name: 'Aries', emoji: '♈', element: 'fire' as const, traits: ['energetic', 'bold', 'competitive'], luckyNumbers: [1, 8, 17] },
    { name: 'Taurus', emoji: '♉', element: 'earth' as const, traits: ['reliable', 'patient', 'practical'], luckyNumbers: [2, 6, 9] },
    { name: 'Gemini', emoji: '♊', element: 'air' as const, traits: ['curious', 'adaptable', 'witty'], luckyNumbers: [5, 7, 14] },
    { name: 'Cancer', emoji: '♋', element: 'water' as const, traits: ['nurturing', 'intuitive', 'emotional'], luckyNumbers: [2, 7, 11] },
    { name: 'Leo', emoji: '♌', element: 'fire' as const, traits: ['confident', 'generous', 'dramatic'], luckyNumbers: [1, 3, 10] },
    { name: 'Virgo', emoji: '♍', element: 'earth' as const, traits: ['analytical', 'practical', 'loyal'], luckyNumbers: [6, 14, 18] },
    { name: 'Libra', emoji: '♎', element: 'air' as const, traits: ['diplomatic', 'fair-minded', 'social'], luckyNumbers: [4, 6, 13] },
    { name: 'Scorpio', emoji: '♏', element: 'water' as const, traits: ['passionate', 'resourceful', 'brave'], luckyNumbers: [8, 11, 18] },
    { name: 'Sagittarius', emoji: '♐', element: 'fire' as const, traits: ['adventurous', 'philosophical', 'honest'], luckyNumbers: [3, 9, 22] },
    { name: 'Capricorn', emoji: '♑', element: 'earth' as const, traits: ['ambitious', 'disciplined', 'responsible'], luckyNumbers: [6, 8, 26] },
    { name: 'Aquarius', emoji: '♒', element: 'air' as const, traits: ['independent', 'original', 'humanitarian'], luckyNumbers: [4, 7, 11] },
    { name: 'Pisces', emoji: '♓', element: 'water' as const, traits: ['compassionate', 'artistic', 'intuitive'], luckyNumbers: [5, 8, 18] }
  ];

  const zodiacSign = zodiacSigns[Math.floor(Math.random() * zodiacSigns.length)];
  const birthplace = birthplaces[Math.floor(Math.random() * birthplaces.length)];
  const birthWeight = 5.5 + Math.random() * 4; // 5.5 to 9.5 lbs
  const premature = Math.random() < 0.1; // 10% chance of being premature
  const birthMonth = Math.floor(Math.random() * 12) + 1;
  const birthDay = Math.floor(Math.random() * 28) + 1;

  // Base stats influenced by zodiac
  let baseStats = {
    health: Math.floor(Math.random() * 40) + 60, // 60-100
    happiness: Math.floor(Math.random() * 40) + 60, // 60-100
    smarts: Math.floor(Math.random() * 40) + 60, // 60-100
    looks: Math.floor(Math.random() * 40) + 60, // 60-100
    wealth: 0,
    relationships: Math.floor(Math.random() * 30) + 20, // 20-50
    salary: 0,
    jobLevel: 0,
    children: [] as string[],
    education: [] as string[],
    assets: [] as { name: string; type: string; value: number }[],
    age: 0,
    year: new Date().getFullYear(),
    zodiacSign,
    birthMonth,
    birthDay,
    pets: [] as { name: string; type: string; age: number; health: number }[],
    birthplace,
    birthWeight,
    premature,
    birthComplications: false,
    criminalRecord: false,
    relationshipStatus: 'single' as const,
    nationality: 'American',
    fame: 0
  };

  // Apply zodiac modifiers
  if (zodiacSign.element === 'fire') {
    baseStats.happiness += 10;
    baseStats.relationships += 5;
  } else if (zodiacSign.element === 'earth') {
    baseStats.health += 10;
    baseStats.smarts += 5;
  } else if (zodiacSign.element === 'air') {
    baseStats.smarts += 10;
    baseStats.relationships += 5;
  } else if (zodiacSign.element === 'water') {
    baseStats.health += 5;
    baseStats.happiness += 10;
  }

  // Cap stats at 100
  baseStats.health = Math.min(100, baseStats.health);
  baseStats.happiness = Math.min(100, baseStats.happiness);
  baseStats.smarts = Math.min(100, baseStats.smarts);
  baseStats.looks = Math.min(100, baseStats.looks);
  baseStats.relationships = Math.min(100, baseStats.relationships);

  return baseStats;
};

export const createCharacter = (): Character => {
  const stats = generateRandomStats();
  const name = generateRandomName();
  const lastName = name.split(' ')[1];
  
  // Generate family members at birth
  const familyMembers = generateInitialFamily();
  
  return {
    id: Math.random().toString(36).substring(2, 15),
    name,
    familyMembers,
    lifeEvents: [],
    achievements: [],
    children: [],
    fame: 0,
    ...stats
  };
};

export const formatSalary = (salary: number): string => {
  if (salary >= 1000) {
    return `$${(salary / 1000).toFixed(0)}K`;
  }
  return `$${salary}`;
};

export const getStatColor = (value: number): string => {
  if (value >= 80) return 'text-green-600';
  if (value >= 60) return 'text-yellow-600';
  if (value >= 40) return 'text-orange-600';
  return 'text-red-600';
};

export const applyStatEffects = (character: Character, effects: any): Character => {
  const updatedCharacter = { ...character };
  
  Object.keys(effects).forEach(key => {
    if (key in updatedCharacter) {
      const currentValue = (updatedCharacter as any)[key];
      const effect = effects[key];
      
      if (typeof currentValue === 'number' && typeof effect === 'number') {
        (updatedCharacter as any)[key] = Math.max(0, Math.min(100, currentValue + effect));
      } else if (effect !== undefined) {
        (updatedCharacter as any)[key] = effect;
      }
    }
  });
  
  return updatedCharacter;
};

export const isGameOver = (character: Character): { gameOver: boolean; reason?: string } => {
  if (character.health <= 0) {
    return { gameOver: true, reason: 'Your health reached zero.' };
  }
  if (character.age >= 120) {
    return { gameOver: true, reason: 'You lived to be 120 years old!' };
  }
  return { gameOver: false };
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

export const generateNewRelationships = (character: Character): FamilyMember[] => {
  // Simple implementation - occasionally add new friends
  if (Math.random() < 0.1 && character.age >= 5) {
    return [{
      id: Math.random().toString(36).substring(2, 15),
      name: generateRandomName(),
      relationship: 'friend',
      age: character.age + Math.floor(Math.random() * 10) - 5,
      alive: true,
      health: Math.floor(Math.random() * 40) + 60,
      relationshipQuality: Math.floor(Math.random() * 30) + 20
    }];
  }
  return [];
};

export const findLove = (character: Character): { success: boolean; partner?: FamilyMember; message: string } => {
  if (character.age < 16) {
    return { success: false, message: "You're too young for serious relationships!" };
  }
  
  if (Math.random() < 0.3) {
    const partner: FamilyMember = {
      id: Math.random().toString(36).substring(2, 15),
      name: generateRandomName(),
      relationship: 'lover',
      age: character.age + Math.floor(Math.random() * 10) - 5,
      alive: true,
      health: Math.floor(Math.random() * 40) + 60,
      relationshipQuality: Math.floor(Math.random() * 30) + 50
    };
    return { success: true, partner, message: `You met ${partner.name} and started dating!` };
  }
  
  return { success: false, message: "You didn't find anyone special this time." };
};

export const intimateActivity = (character: Character, isProtected: boolean): { success: boolean; message: string; pregnant?: boolean } => {
  const partner = character.familyMembers.find(m => m.relationship === 'lover' || m.relationship === 'spouse');
  if (!partner) {
    return { success: false, message: "You need to be in a relationship first!" };
  }
  
  let message = `You had an intimate moment with ${partner.name}.`;
  let pregnant = false;
  
  if (!isProtected && Math.random() < 0.15) {
    pregnant = true;
    message += " You might be pregnant!";
  }
  
  return { success: true, message, pregnant };
};

export const proposeMariage = (character: Character): { success: boolean; accepted?: boolean; message: string } => {
  const partner = character.familyMembers.find(m => m.relationship === 'lover');
  if (!partner) {
    return { success: false, message: "You need to be dating someone first!" };
  }
  
  const acceptanceChance = partner.relationshipQuality / 100;
  const accepted = Math.random() < acceptanceChance;
  
  if (accepted) {
    return { success: true, accepted: true, message: `${partner.name} said yes! You're now engaged!` };
  } else {
    return { success: true, accepted: false, message: `${partner.name} turned down your proposal.` };
  }
};

export const getMarried = (character: Character): { success: boolean; message: string; weddingCost?: number } => {
  if (character.relationshipStatus !== 'engaged') {
    return { success: false, message: "You need to be engaged first!" };
  }
  
  const weddingCost = Math.floor(Math.random() * 100) + 50;
  if (character.wealth < weddingCost) {
    return { success: false, message: "You can't afford a wedding right now!" };
  }
  
  return { success: true, message: "You had a beautiful wedding!", weddingCost };
};

export const giveGift = (character: Character, partnerId: string, giftType: string): { success: boolean; message: string; cost: number; relationshipChange: number } => {
  const costs = { flowers: 25, jewelry: 150, expensive: 500 };
  const cost = costs[giftType as keyof typeof costs] || 25;
  
  if (character.wealth < cost) {
    return { success: false, message: "You can't afford this gift!", cost: 0, relationshipChange: 0 };
  }
  
  const relationshipChange = giftType === 'expensive' ? 20 : giftType === 'jewelry' ? 15 : 10;
  return { success: true, message: `Your partner loved the ${giftType}!`, cost, relationshipChange };
};

export const haveBaby = (character: Character, babyName: string): { success: boolean; message: string; baby?: FamilyMember } => {
  const baby: FamilyMember = {
    id: Math.random().toString(36).substring(2, 15),
    name: babyName,
    relationship: 'child',
    age: 0,
    alive: true,
    health: Math.floor(Math.random() * 20) + 80,
    relationshipQuality: 100
  };
  
  return { success: true, message: `${babyName} was born! Congratulations!`, baby };
};

export const handleEducationActions = (character: Character, action: string, data?: any): Character => {
  const updatedCharacter = { ...character };

  switch (action) {
    case 'enroll':
      const { degreeType } = data;
      const educationLevel = educationLevels.find(l => l.id === degreeType);
      if (educationLevel) {
        updatedCharacter.currentEducation = {
          level: degreeType,
          institution: generateInstitutionName(degreeType),
          currentYear: 1,
          gpa: 3.0 + Math.random() * 1.0, // Random GPA between 3.0-4.0
          classmates: []
        };
        updatedCharacter.wealth -= educationLevel.cost;
      }
      break;

    case 'dropout':
      updatedCharacter.currentEducation = undefined;
      break;

    case 'study_hard':
      if (updatedCharacter.currentEducation) {
        updatedCharacter.currentEducation.gpa = Math.min(4.0, updatedCharacter.currentEducation.gpa + 0.1);
        updatedCharacter.smarts = Math.min(100, updatedCharacter.smarts + 5);
        updatedCharacter.happiness = Math.max(0, updatedCharacter.happiness - 10);
      }
      break;

    case 'interact_classmate':
      const { classmate } = data;
      // Add classmate as a relationship
      const newRelationship: FamilyMember = {
        id: classmate.id,
        name: classmate.name,
        age: classmate.age,
        relationship: 'friend',
        alive: true,
        health: 80,
        relationshipQuality: 25
      };
      updatedCharacter.familyMembers.push(newRelationship);
      updatedCharacter.happiness += 5;
      break;
  }

  return updatedCharacter;
};

const generateInstitutionName = (level: string): string => {
  const schoolTypes: { [key: string]: string[] } = {
    elementary: ['Elementary School', 'Primary School'],
    middle: ['Middle School', 'Junior High'],
    high: ['High School', 'Secondary School'],
    college: ['Community College', 'Technical College'],
    university: ['University', 'State University', 'Institute of Technology'],
    graduate: ['Graduate School', 'University'],
    medical: ['Medical School', 'School of Medicine'],
    law: ['Law School', 'School of Law'],
    phd: ['Graduate School', 'Doctoral Program']
  };

  const cityNames = ['Central', 'North', 'South', 'East', 'West', 'Metro', 'City', 'State'];
  const cityName = cityNames[Math.floor(Math.random() * cityNames.length)];
  const schoolType = schoolTypes[level]?.[Math.floor(Math.random() * schoolTypes[level].length)] || 'School';

  return `${cityName} ${schoolType}`;
};

export const applyForJob = (character: Character, jobId: string): Character => {
  // ... rest of the function remains unchanged
  return character; // Placeholder return
};

// Example function demonstrating auto-enrollment, education progression, relationship aging.
export const ageCharacter = (character: Character): Character => {
  let updatedCharacter = { ...character };

  updatedCharacter.age += 1;

  // Age all family members and handle deaths
  updatedCharacter.familyMembers = ageFamilyMembers(updatedCharacter.familyMembers);

  // Process yearly finances - fix the money system
  updatedCharacter = processYearlyFinances(updatedCharacter);

  // Handle education progression
  if (updatedCharacter.currentEducation) {
    const educationLevel = educationLevels.find(l => l.id === updatedCharacter.currentEducation!.level);
    if (educationLevel) {
      updatedCharacter.currentEducation.currentYear += 1;

      // Check if graduated
      if (updatedCharacter.currentEducation.currentYear > educationLevel.duration) {
        const levelName = educationLevel.name.split(' ')[0];
        updatedCharacter.education.push(levelName);
        updatedCharacter.currentEducation = undefined;
        updatedCharacter.smarts += 10;
      }
    }
  } else {
    // Check for auto-enrollment in mandatory education
    const autoEnrollLevel = shouldAutoEnrollInSchool(updatedCharacter);
    if (autoEnrollLevel) {
      const educationLevel = educationLevels.find(l => l.id === autoEnrollLevel);
      if (educationLevel) {
        updatedCharacter.currentEducation = {
          level: autoEnrollLevel,
          institution: generateInstitutionName(autoEnrollLevel),
          currentYear: 1,
          gpa: 2.5 + Math.random() * 1.5,
          classmates: []
        };
      }
    }
  }

  return updatedCharacter;
};

export const getRandomElement = <T>(array: T[]): T => {
  return array[Math.floor(Math.random() * array.length)];
};
