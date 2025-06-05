
export interface EducationStage {
  id: string;
  name: string;
  minAge: number;
  maxAge: number;
  duration: number;
  prerequisites?: string[];
}

export interface School {
  id: string;
  name: string;
  type: 'public' | 'private' | 'university';
  cost: number;
  requirements?: {
    minGPA?: number;
    minWealth?: number;
    testScore?: number;
  };
}

export interface EducationEvent {
  id: string;
  title: string;
  description: string;
  stage: string | 'all';
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
    minAge: 6,
    maxAge: 11,
    duration: 6
  },
  {
    id: 'middle',
    name: 'Middle School',
    minAge: 12,
    maxAge: 14,
    duration: 3,
    prerequisites: ['elementary']
  },
  {
    id: 'high',
    name: 'High School',
    minAge: 15,
    maxAge: 18,
    duration: 4,
    prerequisites: ['middle']
  },
  {
    id: 'university',
    name: 'University',
    minAge: 18,
    maxAge: 25,
    duration: 4,
    prerequisites: ['high']
  },
  {
    id: 'graduate',
    name: 'Graduate School',
    minAge: 22,
    maxAge: 30,
    duration: 2,
    prerequisites: ['university']
  }
];

export const getAvailableSchools = (stageId: string, character: any): School[] => {
  const schools: Record<string, School[]> = {
    elementary: [
      { id: 'public_elementary', name: 'Public Elementary', type: 'public', cost: 0 },
      { id: 'private_elementary', name: 'Private Elementary', type: 'private', cost: 50 }
    ],
    middle: [
      { id: 'public_middle', name: 'Public Middle School', type: 'public', cost: 0 },
      { id: 'private_middle', name: 'Private Middle School', type: 'private', cost: 75 }
    ],
    high: [
      { id: 'public_high', name: 'Public High School', type: 'public', cost: 0 },
      { id: 'private_high', name: 'Private High School', type: 'private', cost: 100 }
    ],
    university: [
      { id: 'state_university', name: 'State University', type: 'university', cost: 200 },
      { id: 'private_university', name: 'Private University', type: 'university', cost: 500 }
    ],
    graduate: [
      { id: 'graduate_school', name: 'Graduate School', type: 'university', cost: 300 }
    ]
  };
  
  return schools[stageId] || [];
};

export const calculateGPA = (character: any): number => {
  return Math.min(4.0, Math.max(0, 2.0 + (character.smarts / 50)));
};

export const universityMajors = [
  'Computer Science',
  'Business',
  'Engineering',
  'Medicine',
  'Law',
  'Art',
  'Psychology',
  'Biology',
  'Chemistry',
  'Mathematics'
];

export const educationEvents: EducationEvent[] = [
  {
    id: 'academic_achievement',
    title: 'Academic Achievement',
    description: 'You received recognition for your excellent grades!',
    stage: 'all',
    probability: 0.1,
    conditions: { minGPA: 3.5 }
  },
  {
    id: 'struggling_grades',
    title: 'Struggling with Grades',
    description: 'Your grades are slipping and you need to focus more.',
    stage: 'all',
    probability: 0.15,
    conditions: { maxGPA: 2.0 }
  }
];
