import { Character, FamilyMember, LifeEvent, Relationship } from '../types/game';
import { lifeEvents } from '../data/lifeEvents';
import { educationLevels, shouldAutoEnrollInSchool } from './educationUtils';

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

export const generateRandomStats = () => {
  const zodiacSigns = [
    { name: 'Aries', emoji: '♈', element: 'fire', traits: ['energetic', 'bold', 'competitive'] },
    { name: 'Taurus', emoji: '♉', element: 'earth', traits: ['reliable', 'patient', 'practical'] },
    { name: 'Gemini', emoji: '♊', element: 'air', traits: ['curious', 'adaptable', 'witty'] },
    { name: 'Cancer', emoji: '♋', element: 'water', traits: ['nurturing', 'intuitive', 'emotional'] },
    { name: 'Leo', emoji: '♌', element: 'fire', traits: ['confident', 'generous', 'dramatic'] },
    { name: 'Virgo', emoji: '♍', element: 'earth', traits: ['analytical', 'practical', 'loyal'] },
    { name: 'Libra', emoji: '♎', element: 'air', traits: ['diplomatic', 'fair-minded', 'social'] },
    { name: 'Scorpio', emoji: '♏', element: 'water', traits: ['passionate', 'resourceful', 'brave'] },
    { name: 'Sagittarius', emoji: '♐', element: 'fire', traits: ['adventurous', 'philosophical', 'honest'] },
    { name: 'Capricorn', emoji: '♑', element: 'earth', traits: ['ambitious', 'disciplined', 'responsible'] },
    { name: 'Aquarius', emoji: '♒', element: 'air', traits: ['independent', 'original', 'humanitarian'] },
    { name: 'Pisces', emoji: '♓', element: 'water', traits: ['compassionate', 'artistic', 'intuitive'] }
  ];

  const zodiacSign = zodiacSigns[Math.floor(Math.random() * zodiacSigns.length)];
  const birthplace = birthplaces[Math.floor(Math.random() * birthplaces.length)];
  const birthWeight = 5.5 + Math.random() * 4; // 5.5 to 9.5 lbs
  const premature = Math.random() < 0.1; // 10% chance of being premature

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
    familyMembers: [],
    children: [],
    education: [],
    assets: [],
    age: 0,
    year: new Date().getFullYear(),
    zodiacSign,
    birthplace,
    birthWeight,
    premature,
    criminalRecord: false,
    relationshipStatus: 'single' as 'single' | 'dating' | 'engaged' | 'married' | 'divorced'
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
  Object.keys(baseStats).forEach(key => {
    if (typeof baseStats[key as keyof typeof baseStats] === 'number' && key !== 'age' && key !== 'year' && key !== 'birthWeight') {
      baseStats[key as keyof typeof baseStats] = Math.min(100, baseStats[key as keyof typeof baseStats] as number);
    }
  });

  return baseStats;
};

export const createCharacter = (): Character => {
  const stats = generateRandomStats();
  return {
    id: Math.random().toString(36).substring(2, 15),
    name: generateRandomName(),
    ...stats
  };
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
          major: degreeType === 'university' || degreeType === 'graduate' ? generateMajor() : undefined
        };
        updatedCharacter.money -= educationLevel.cost;
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
      const newRelationship = {
        id: classmate.id,
        name: classmate.name,
        age: classmate.age,
        relationship: 'classmate',
        relationshipLevel: 25,
        isAlive: true
      };
      updatedCharacter.relationships.push(newRelationship);
      updatedCharacter.happiness += 5;
      break;
  }

  return updatedCharacter;
};

const generateInstitutionName = (level: string): string => {
  const schoolTypes = {
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

const generateMajor = (): string => {
  const majors = [
    'Computer Science', 'Business Administration', 'Psychology', 'Biology', 'English Literature',
    'Engineering', 'Mathematics', 'History', 'Chemistry', 'Economics', 'Political Science',
    'Art', 'Music', 'Philosophy', 'Sociology', 'Physics', 'Communications', 'Education'
  ];
  return majors[Math.floor(Math.random() * majors.length)];
};

export const applyForJob = (character: Character, jobId: string): Character => {
  // ... rest of the function remains unchanged
  return character; // Placeholder return
};

// Example function demonstrating auto-enrollment, education progression, relationship aging.
export const ageCharacter = (character: Character): Character => {
  const updatedCharacter = { ...character };

  updatedCharacter.age += 1;

  // Age all relationships
  updatedCharacter.relationships = updatedCharacter.relationships.map(rel => ({
    ...rel,
    age: rel.age + 1
  }));

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
          gpa: 2.5 + Math.random() * 1.5
        };
      }
    }
  }

  return updatedCharacter;
};

export const getRandomElement = <T>(array: T[]): T => {
  return array[Math.floor(Math.random() * array.length)];
};
