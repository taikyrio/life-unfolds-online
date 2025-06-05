import { Character } from '../types/game';

export interface EducationLevel {
  id: string;
  name: string;
  description: string;
  minAge: number;
  maxAge?: number;
  duration: number;
  cost: number;
  prerequisites?: string[];
}

export const educationLevels: EducationLevel[] = [
  {
    id: 'elementary',
    name: 'Elementary School',
    description: 'Basic education for children',
    minAge: 6,
    maxAge: 11,
    duration: 6,
    cost: 0
  },
  {
    id: 'middle',
    name: 'Middle School',
    description: 'Education for pre-teens',
    minAge: 12,
    maxAge: 14,
    duration: 3,
    cost: 0,
    prerequisites: ['elementary']
  },
  {
    id: 'high',
    name: 'High School',
    description: 'Secondary education for teenagers',
    minAge: 15,
    maxAge: 18,
    duration: 4,
    cost: 0,
    prerequisites: ['middle']
  },
  {
    id: 'college',
    name: 'Community College',
    description: 'Two-year associate degree',
    minAge: 18,
    duration: 2,
    cost: 10,
    prerequisites: ['high']
  },
  {
    id: 'university',
    name: 'University',
    description: 'Four-year bachelor degree',
    minAge: 18,
    duration: 4,
    cost: 25,
    prerequisites: ['high']
  },
  {
    id: 'graduate',
    name: 'Graduate School',
    description: 'Master\'s degree program',
    minAge: 22,
    duration: 2,
    cost: 35,
    prerequisites: ['university']
  },
  {
    id: 'medical',
    name: 'Medical School',
    description: 'Become a doctor',
    minAge: 22,
    duration: 4,
    cost: 50,
    prerequisites: ['university']
  },
  {
    id: 'law',
    name: 'Law School',
    description: 'Become a lawyer',
    minAge: 22,
    duration: 3,
    cost: 45,
    prerequisites: ['university']
  },
  {
    id: 'phd',
    name: 'PhD Program',
    description: 'Doctoral degree',
    minAge: 24,
    duration: 4,
    cost: 40,
    prerequisites: ['graduate']
  }
];

export const getEligibleDegrees = (character: Character): EducationLevel[] => {
  return educationLevels.filter(level => {
    // Age requirements
    if (character.age < level.minAge) return false;
    if (level.maxAge && character.age > level.maxAge) return false;
    
    // Check if already completed
    if (character.education.completedStages.includes(level.id)) return false;
    
    // Prerequisites
    if (level.prerequisites) {
      for (const prereq of level.prerequisites) {
        if (!character.education.completedStages.includes(prereq)) {
          return false;
        }
      }
    }
    
    // Special requirements
    if (level.id === 'university' && !character.education.completedStages.includes('high_school')) return false;
    if (level.id === 'graduate' && !character.education.completedStages.includes('university')) return false;
    if (level.id === 'medical' && !character.education.completedStages.includes('university')) return false;
    if (level.id === 'law' && !character.education.completedStages.includes('university')) return false;
    if (level.id === 'phd' && !character.education.completedStages.includes('graduate')) return false;
    
    return true;
  });
};

export const getAvailableDegrees = (character: Character): EducationLevel[] => {
  // If already enrolled, no degrees available
  if (character.education.currentStage) return [];
  
  return getEligibleDegrees(character);
};

export const shouldAutoEnrollInSchool = (character: Character): string | null => {
  // Mandatory education stages by age
  if (character.age >= 6 && character.age <= 11 && !character.education.completedStages.includes('elementary')) {
    return 'elementary';
  }
  if (character.age >= 12 && character.age <= 14 && character.education.completedStages.includes('elementary') && !character.education.completedStages.includes('middle_school')) {
    return 'middle_school';
  }
  if (character.age >= 15 && character.age <= 17 && character.education.completedStages.includes('middle_school') && !character.education.completedStages.includes('high_school')) {
    return 'high_school';
  }
  
  return null;
};

export const getClassmates = (character: Character) => {
  if (!character.education.currentStage) return [];
  
  // Generate random classmates based on current education level
  const classmates = [];
  const count = Math.floor(Math.random() * 3) + 2; // 2-4 classmates
  
  for (let i = 0; i < count; i++) {
    const firstName = ['Alex', 'Jordan', 'Taylor', 'Morgan', 'Casey', 'Riley', 'Cameron', 'Quinn', 'Sage', 'River'][Math.floor(Math.random() * 10)];
    const lastName = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez'][Math.floor(Math.random() * 10)];
    
    classmates.push({
      id: Math.random().toString(36).substring(2, 15),
      name: `${firstName} ${lastName}`,
      age: character.age + Math.floor(Math.random() * 3) - 1, // Age within 1 year of character
      relationshipStatus: ['single', 'dating', 'single', 'single'][Math.floor(Math.random() * 4)],
      personality: {
        kindness: Math.floor(Math.random() * 100),
        intelligence: Math.floor(Math.random() * 100),
        humor: Math.floor(Math.random() * 100)
      }
    });
  }
  
  return classmates;
};

export const getEducationInfo = (character: Character) => {
  const currentLevel = character.education.currentStage || 'None';
  const isEnrolled = !!character.education.currentStage;
  const institution = character.education.currentSchool || '';
  const currentYear = character.education.currentYear || 0;
  const gpa = character.education.gpa || 0;
  
  // Get total years for current stage
  const currentStageData = educationLevels.find(level => level.id === character.education.currentStage);
  const totalYears = currentStageData?.duration || 0;
  
  // Get completed education as array
  const completedEducation = [...character.education.completedStages];
  
  return {
    currentLevel,
    isEnrolled,
    institution,
    currentYear,
    totalYears,
    gpa,
    completedEducation
  };
};

export const calculateGPA = (smarts: number, studyHours: number): number => {
  const baseGPA = (smarts / 25); // 0-4 scale
  const studyBonus = studyHours * 0.05;
  return Math.min(4.0, baseGPA + studyBonus);
};

export const getSchoolPerformanceDescription = (gpa: number): string => {
  if (gpa >= 3.7) return 'Excellent student';
  if (gpa >= 3.0) return 'Good student';
  if (gpa >= 2.0) return 'Average student';
  if (gpa >= 1.0) return 'Poor student';
  return 'Failing student';
};

export const getEducationRequirementForJob = (jobId: string): string | null => {
  const jobEducationMap: Record<string, string> = {
    'fast_food': null,
    'retail': null,
    'office_assistant': 'high_school',
    'teacher': 'university',
    'nurse': 'university',
    'engineer': 'university',
    'doctor': 'medical',
    'lawyer': 'law',
    'professor': 'phd'
  };
  
  return jobEducationMap[jobId] || null;
};
