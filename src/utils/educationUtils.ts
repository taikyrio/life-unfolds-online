
import { Character } from '../types/game';

export interface EducationLevel {
  id: string;
  name: string;
  description: string;
  duration: number;
  minAge: number;
  maxAge: number;
  cost: number;
  prerequisites?: string[];
}

export interface Classmate {
  id: string;
  name: string;
  age: number;
  relationshipStatus: string;
  personality: string;
}

export const educationLevels: EducationLevel[] = [
  {
    id: 'elementary',
    name: 'Elementary School',
    description: 'Basic education covering fundamental subjects',
    duration: 6,
    minAge: 5,
    maxAge: 12,
    cost: 0
  },
  {
    id: 'middle',
    name: 'Middle School',
    description: 'Intermediate education preparing for high school',
    duration: 3,
    minAge: 11,
    maxAge: 15,
    cost: 0,
    prerequisites: ['elementary']
  },
  {
    id: 'high',
    name: 'High School',
    description: 'Secondary education with college preparation',
    duration: 4,
    minAge: 14,
    maxAge: 19,
    cost: 0,
    prerequisites: ['middle']
  },
  {
    id: 'college',
    name: 'College (Associate Degree)',
    description: 'Two-year college program for specialized skills',
    duration: 2,
    minAge: 17,
    maxAge: 25,
    cost: 15,
    prerequisites: ['high']
  },
  {
    id: 'university',
    name: 'University (Bachelor Degree)',
    description: 'Four-year university program for comprehensive education',
    duration: 4,
    minAge: 17,
    maxAge: 30,
    cost: 25,
    prerequisites: ['high']
  },
  {
    id: 'graduate',
    name: 'Graduate School (Master Degree)',
    description: 'Advanced degree in specialized field',
    duration: 2,
    minAge: 21,
    maxAge: 35,
    cost: 35,
    prerequisites: ['university']
  },
  {
    id: 'medical',
    name: 'Medical School',
    description: 'Professional medical education',
    duration: 4,
    minAge: 21,
    maxAge: 35,
    cost: 50,
    prerequisites: ['university']
  },
  {
    id: 'law',
    name: 'Law School',
    description: 'Professional legal education',
    duration: 3,
    minAge: 21,
    maxAge: 35,
    cost: 45,
    prerequisites: ['university']
  },
  {
    id: 'phd',
    name: 'PhD Program',
    description: 'Doctoral degree for research and academia',
    duration: 5,
    minAge: 23,
    maxAge: 40,
    cost: 40,
    prerequisites: ['graduate']
  }
];

// Expanded name lists
const firstNames = [
  // Male names
  'James', 'Robert', 'John', 'Michael', 'David', 'William', 'Richard', 'Charles', 'Joseph', 'Thomas',
  'Christopher', 'Daniel', 'Paul', 'Mark', 'Donald', 'Steven', 'Matthew', 'Anthony', 'Joshua', 'Kenneth',
  'Kevin', 'Brian', 'George', 'Timothy', 'Ronald', 'Jason', 'Edward', 'Jeffrey', 'Ryan', 'Jacob',
  'Gary', 'Nicholas', 'Eric', 'Jonathan', 'Stephen', 'Larry', 'Justin', 'Scott', 'Brandon', 'Benjamin',
  'Samuel', 'Gregory', 'Alexander', 'Patrick', 'Frank', 'Raymond', 'Jack', 'Dennis', 'Jerry', 'Tyler',
  // Female names
  'Mary', 'Patricia', 'Jennifer', 'Linda', 'Elizabeth', 'Barbara', 'Susan', 'Jessica', 'Sarah', 'Karen',
  'Nancy', 'Lisa', 'Betty', 'Helen', 'Sandra', 'Donna', 'Carol', 'Ruth', 'Sharon', 'Michelle',
  'Laura', 'Sarah', 'Kimberly', 'Deborah', 'Dorothy', 'Lisa', 'Nancy', 'Karen', 'Betty', 'Helen',
  'Sandra', 'Donna', 'Carol', 'Ruth', 'Sharon', 'Michelle', 'Laura', 'Emily', 'Kimberly', 'Deborah',
  'Amy', 'Angela', 'Ashley', 'Brenda', 'Emma', 'Olivia', 'Cynthia', 'Marie', 'Janet', 'Catherine',
  // Modern/Unisex names
  'Alex', 'Jordan', 'Taylor', 'Casey', 'Morgan', 'Riley', 'Avery', 'Quinn', 'Sage', 'River',
  'Phoenix', 'Skylar', 'Cameron', 'Dakota', 'Jamie', 'Jesse', 'Rowan', 'Blake', 'Drew', 'Emery'
];

const lastNames = [
  'Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez',
  'Hernandez', 'Lopez', 'Gonzalez', 'Wilson', 'Anderson', 'Thomas', 'Taylor', 'Moore', 'Jackson', 'Martin',
  'Lee', 'Perez', 'Thompson', 'White', 'Harris', 'Sanchez', 'Clark', 'Ramirez', 'Lewis', 'Robinson',
  'Walker', 'Young', 'Allen', 'King', 'Wright', 'Scott', 'Torres', 'Nguyen', 'Hill', 'Flores',
  'Green', 'Adams', 'Nelson', 'Baker', 'Hall', 'Rivera', 'Campbell', 'Mitchell', 'Carter', 'Roberts',
  'Gomez', 'Phillips', 'Evans', 'Turner', 'Diaz', 'Parker', 'Cruz', 'Edwards', 'Collins', 'Reyes',
  'Stewart', 'Morris', 'Morales', 'Murphy', 'Cook', 'Rogers', 'Gutierrez', 'Ortiz', 'Morgan', 'Cooper',
  'Peterson', 'Bailey', 'Reed', 'Kelly', 'Howard', 'Ramos', 'Kim', 'Cox', 'Ward', 'Richardson',
  'Watson', 'Brooks', 'Chavez', 'Wood', 'James', 'Bennett', 'Gray', 'Mendoza', 'Ruiz', 'Hughes',
  'Price', 'Alvarez', 'Castillo', 'Sanders', 'Patel', 'Myers', 'Long', 'Ross', 'Foster', 'Jimenez'
];

export const generateRandomName = (): string => {
  const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
  const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
  return `${firstName} ${lastName}`;
};

export const getEducationInfo = (character: Character) => {
  const currentEducation = character.currentEducation;
  
  if (!currentEducation) {
    // Determine appropriate level based on age
    let appropriateLevel = 'none';
    if (character.age >= 5 && character.age <= 12 && !character.education.includes('Elementary')) {
      appropriateLevel = 'elementary';
    } else if (character.age >= 11 && character.age <= 15 && character.education.includes('Elementary') && !character.education.includes('Middle')) {
      appropriateLevel = 'middle';
    } else if (character.age >= 14 && character.age <= 19 && character.education.includes('Middle') && !character.education.includes('High')) {
      appropriateLevel = 'high';
    }
    
    return {
      currentLevel: getHighestEducation(character.education),
      isEnrolled: false,
      institution: null,
      currentYear: 0,
      totalYears: 0,
      gpa: 0,
      appropriateLevel
    };
  }

  const level = educationLevels.find(l => l.id === currentEducation.level);
  return {
    currentLevel: level?.name || 'Unknown',
    isEnrolled: true,
    institution: currentEducation.institution,
    currentYear: currentEducation.currentYear,
    totalYears: level?.duration || 0,
    gpa: currentEducation.gpa,
    appropriateLevel: null
  };
};

export const getAvailableDegrees = (character: Character): EducationLevel[] => {
  return educationLevels.filter(level => {
    // Check age requirements
    if (character.age < level.minAge || character.age > level.maxAge) {
      return false;
    }

    // Check prerequisites
    if (level.prerequisites) {
      for (const prereq of level.prerequisites) {
        const prereqLevel = educationLevels.find(l => l.id === prereq);
        if (!prereqLevel || !character.education.includes(prereqLevel.name.split(' ')[0])) {
          return false;
        }
      }
    }

    // Check if already completed
    const levelName = level.name.split(' ')[0];
    if (character.education.includes(levelName)) {
      return false;
    }

    // Check if currently enrolled in this level
    if (character.currentEducation?.level === level.id) {
      return false;
    }

    return true;
  });
};

export const getClassmates = (character: Character): Classmate[] => {
  if (!character.currentEducation) return [];
  
  // Generate random classmates based on education level and year
  const numClassmates = Math.floor(Math.random() * 8) + 12; // 12-20 classmates
  const classmates: Classmate[] = [];
  
  for (let i = 0; i < numClassmates; i++) {
    const ageVariation = Math.floor(Math.random() * 3) - 1; // -1, 0, or 1 year difference
    const classmateAge = Math.max(character.age + ageVariation, character.age - 2);
    
    classmates.push({
      id: `classmate_${i}`,
      name: generateRandomName(),
      age: classmateAge,
      relationshipStatus: getRandomRelationshipStatus(),
      personality: getRandomPersonality()
    });
  }
  
  return classmates;
};

export const getHighestEducation = (education: string[]): string => {
  const levels = ['PhD', 'Medical', 'Law', 'Graduate', 'University', 'College', 'High', 'Middle', 'Elementary'];
  
  for (const level of levels) {
    if (education.some(ed => ed.includes(level))) {
      return level + ' School Graduate';
    }
  }
  
  return 'No formal education';
};

const getRandomRelationshipStatus = (): string => {
  const statuses = ['Stranger', 'Acquaintance', 'Friend', 'Close Friend', 'Best Friend'];
  return statuses[Math.floor(Math.random() * statuses.length)];
};

const getRandomPersonality = (): string => {
  const personalities = ['Friendly', 'Shy', 'Outgoing', 'Smart', 'Funny', 'Serious', 'Creative', 'Athletic'];
  return personalities[Math.floor(Math.random() * personalities.length)];
};

export const shouldAutoEnrollInSchool = (character: Character): string | null => {
  // Auto-enroll children in appropriate school levels
  if (character.age >= 5 && character.age <= 12 && !character.education.includes('Elementary') && !character.currentEducation) {
    return 'elementary';
  }
  if (character.age >= 11 && character.age <= 15 && character.education.includes('Elementary') && !character.education.includes('Middle') && !character.currentEducation) {
    return 'middle';
  }
  if (character.age >= 14 && character.age <= 18 && character.education.includes('Middle') && !character.education.includes('High') && !character.currentEducation) {
    return 'high';
  }
  return null;
};

export const enrollInEducation = (character: Character, levelId: string): { success: boolean; message: string; updatedCharacter?: Character } => {
  const level = educationLevels.find(l => l.id === levelId);
  if (!level) {
    return { success: false, message: 'Invalid education level.' };
  }

  // Check wealth requirement
  if (character.wealth < level.cost * 10) {
    return { success: false, message: `You can't afford ${level.name}. You need $${level.cost * 10}k.` };
  }

  const institutions = getInstitutionsForLevel(levelId);
  const institution = institutions[Math.floor(Math.random() * institutions.length)];

  const updatedCharacter = {
    ...character,
    currentEducation: {
      level: levelId,
      institution,
      currentYear: 1,
      gpa: 3.0 + (character.smarts / 100),
      classmates: []
    },
    wealth: character.wealth - (level.cost * 10)
  };

  return {
    success: true,
    message: `Enrolled in ${level.name} at ${institution}!`,
    updatedCharacter
  };
};

export const progressEducation = (character: Character): { success: boolean; message: string; graduated: boolean; updatedCharacter?: Character } => {
  if (!character.currentEducation) {
    return { success: false, message: 'Not currently enrolled in education.', graduated: false };
  }

  const level = educationLevels.find(l => l.id === character.currentEducation.level);
  if (!level) {
    return { success: false, message: 'Invalid education level.', graduated: false };
  }

  // Calculate GPA change based on smarts and random factors
  const gpaChange = (Math.random() - 0.5) * 0.5 + (character.smarts / 200);
  const newGpa = Math.max(0, Math.min(4.0, character.currentEducation.gpa + gpaChange));

  // Check if graduating
  if (character.currentEducation.currentYear >= level.duration) {
    const graduatedEducation = [...character.education, level.name.split(' ')[0]];
    
    return {
      success: true,
      message: `Graduated from ${level.name} with a ${newGpa.toFixed(2)} GPA!`,
      graduated: true,
      updatedCharacter: {
        ...character,
        education: graduatedEducation,
        currentEducation: undefined,
        smarts: Math.min(100, character.smarts + 10)
      }
    };
  }

  // Progress to next year
  return {
    success: true,
    message: `Completed year ${character.currentEducation.currentYear} of ${level.name}. GPA: ${newGpa.toFixed(2)}`,
    graduated: false,
    updatedCharacter: {
      ...character,
      currentEducation: {
        ...character.currentEducation,
        currentYear: character.currentEducation.currentYear + 1,
        gpa: newGpa
      }
    }
  };
};

const getInstitutionsForLevel = (levelId: string): string[] => {
  const institutions: { [key: string]: string[] } = {
    elementary: ['Sunshine Elementary', 'Oak Grove Elementary', 'Riverside Elementary', 'Lincoln Elementary'],
    middle: ['Washington Middle School', 'Roosevelt Middle School', 'Jefferson Middle School', 'Madison Middle School'],
    high: ['Central High School', 'North High School', 'South High School', 'East High School', 'West High School'],
    college: ['City Community College', 'Metro Community College', 'Valley Community College', 'Harbor Community College'],
    university: ['State University', 'Tech University', 'Liberal Arts University', 'Research University', 'Metropolitan University'],
    graduate: ['Graduate School of Sciences', 'Graduate School of Arts', 'Graduate School of Business', 'Graduate School of Engineering'],
    medical: ['Medical School of Excellence', 'University Medical School', 'State Medical College', 'Premier Medical Academy'],
    law: ['School of Law', 'University Law School', 'State Law College', 'Metropolitan Law Institute'],
    phd: ['Doctoral Academy', 'Research Institute', 'PhD Center of Excellence', 'Advanced Studies Institute']
  };
  
  return institutions[levelId] || ['Generic Institution'];
};
