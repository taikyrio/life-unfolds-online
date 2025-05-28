
import { Character } from '../types/game';
import { generateRandomName } from './gameUtils';

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
