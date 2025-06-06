
export interface EducationStage {
  id: string;
  name: string;
  minAge: number;
  maxAge: number;
  duration: number;
  cost: number;
  schools?: School[];
  autoEnroll?: boolean;
}

export interface School {
  id: string;
  name: string;
  cost: number;
  type: string;
  quality: number;
  reputation: string;
  requirements?: {
    minGPA?: number;
    minSmarts?: number;
    minWealth?: number;
  };
}

export interface EducationEvent {
  id: string;
  title: string;
  description: string;
  stage: string;
  probability: number;
  conditions?: {
    minGPA?: number;
    maxGPA?: number;
  };
}

export const educationStages: EducationStage[] = [
  {
    id: 'elementary',
    name: 'Elementary School',
    minAge: 5,
    maxAge: 11,
    duration: 6,
    cost: 0,
    autoEnroll: true,
    schools: [
      { id: 'public_elementary', name: 'Public Elementary', cost: 0, type: 'Public', quality: 6, reputation: 'Average' },
      { id: 'private_elementary', name: 'Private Elementary', cost: 5, type: 'Private', quality: 8, reputation: 'Good' }
    ]
  },
  {
    id: 'middle',
    name: 'Middle School',
    minAge: 11,
    maxAge: 14,
    duration: 3,
    cost: 0,
    autoEnroll: true,
    schools: [
      { id: 'public_middle', name: 'Public Middle School', cost: 0, type: 'Public', quality: 6, reputation: 'Average' },
      { id: 'private_middle', name: 'Private Middle School', cost: 8, type: 'Private', quality: 8, reputation: 'Good' }
    ]
  },
  {
    id: 'high',
    name: 'High School',
    minAge: 14,
    maxAge: 18,
    duration: 4,
    cost: 0,
    autoEnroll: true,
    schools: [
      { id: 'public_high', name: 'Public High School', cost: 0, type: 'Public', quality: 6, reputation: 'Average' },
      { id: 'private_high', name: 'Private High School', cost: 12, type: 'Private', quality: 8, reputation: 'Good' }
    ]
  },
  {
    id: 'college',
    name: 'College',
    minAge: 18,
    maxAge: 25,
    duration: 4,
    cost: 50000,
    schools: [
      { id: 'community_college', name: 'Community College', cost: 20, type: 'Public', quality: 5, reputation: 'Below Average' },
      { id: 'state_university', name: 'State University', cost: 40, type: 'Public', quality: 7, reputation: 'Good' },
      { id: 'private_university', name: 'Private University', cost: 80, type: 'Private', quality: 9, reputation: 'Excellent' }
    ]
  }
];

export const universityMajors = [
  'Computer Science',
  'Business Administration',
  'Psychology',
  'Engineering',
  'Medicine',
  'Law',
  'Education',
  'Art',
  'Music',
  'Literature'
];

export const educationEvents: EducationEvent[] = [
  {
    id: 'honor_roll',
    title: 'Made Honor Roll',
    description: 'Your excellent grades earned you a spot on the honor roll!',
    stage: 'all',
    probability: 0.3,
    conditions: { minGPA: 3.5 }
  },
  {
    id: 'detention',
    title: 'Got Detention',
    description: 'Your behavior landed you in detention.',
    stage: 'all',
    probability: 0.2,
    conditions: { maxGPA: 2.5 }
  }
];

export const getAvailableSchools = (stageId: string, character: any): School[] => {
  const stage = educationStages.find(s => s.id === stageId);
  return stage?.schools || [];
};

export const calculateGPA = (character: any): number => {
  return 2.0 + (character.smarts / 50);
};

export const getGradeFromGPA = (gpa: number): string => {
  if (gpa >= 3.7) return 'A';
  if (gpa >= 3.0) return 'B';
  if (gpa >= 2.0) return 'C';
  if (gpa >= 1.0) return 'D';
  return 'F';
};
