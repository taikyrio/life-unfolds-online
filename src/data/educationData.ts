
export interface EducationStage {
  id: string;
  name: string;
  minAge: number;
  maxAge: number;
  duration: number;
  prerequisites?: string[];
  autoEnroll?: boolean;
  schools?: School[];
}

export interface School {
  id: string;
  name: string;
  type: 'public' | 'private' | 'university';
  cost: number;
  quality: number;
  reputation: string;
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

export const getGradeFromGPA = (gpa: number): string => {
  if (gpa >= 3.7) return 'A';
  if (gpa >= 3.3) return 'A-';
  if (gpa >= 3.0) return 'B+';
  if (gpa >= 2.7) return 'B';
  if (gpa >= 2.3) return 'B-';
  if (gpa >= 2.0) return 'C+';
  if (gpa >= 1.7) return 'C';
  if (gpa >= 1.3) return 'C-';
  if (gpa >= 1.0) return 'D';
  return 'F';
};

export const educationStages: EducationStage[] = [
  {
    id: 'elementary',
    name: 'Elementary School',
    minAge: 6,
    maxAge: 11,
    duration: 6,
    autoEnroll: true,
    schools: [
      { 
        id: 'public_elementary', 
        name: 'Public Elementary', 
        type: 'public', 
        cost: 0, 
        quality: 6,
        reputation: 'Average'
      },
      { 
        id: 'private_elementary', 
        name: 'Private Elementary', 
        type: 'private', 
        cost: 50,
        quality: 8,
        reputation: 'Good'
      }
    ]
  },
  {
    id: 'middle_school',
    name: 'Middle School',
    minAge: 12,
    maxAge: 14,
    duration: 3,
    prerequisites: ['elementary'],
    autoEnroll: true,
    schools: [
      { 
        id: 'public_middle_school', 
        name: 'Public Middle School', 
        type: 'public', 
        cost: 0,
        quality: 6,
        reputation: 'Average'
      },
      { 
        id: 'private_middle_school', 
        name: 'Private Middle School', 
        type: 'private', 
        cost: 75,
        quality: 8,
        reputation: 'Good'
      }
    ]
  },
  {
    id: 'high_school',
    name: 'High School',
    minAge: 15,
    maxAge: 18,
    duration: 4,
    prerequisites: ['middle_school'],
    autoEnroll: true,
    schools: [
      { 
        id: 'public_high_school', 
        name: 'Public High School', 
        type: 'public', 
        cost: 0,
        quality: 6,
        reputation: 'Average'
      },
      { 
        id: 'private_high_school', 
        name: 'Private High School', 
        type: 'private', 
        cost: 100,
        quality: 9,
        reputation: 'Excellent'
      }
    ]
  },
  {
    id: 'university',
    name: 'University',
    minAge: 18,
    maxAge: 25,
    duration: 4,
    prerequisites: ['high_school'],
    schools: [
      { 
        id: 'state_university', 
        name: 'State University', 
        type: 'university', 
        cost: 200,
        quality: 7,
        reputation: 'Good'
      },
      { 
        id: 'private_university', 
        name: 'Private University', 
        type: 'university', 
        cost: 500,
        quality: 9,
        reputation: 'Prestigious'
      }
    ]
  },
  {
    id: 'graduate',
    name: 'Graduate School',
    minAge: 22,
    maxAge: 30,
    duration: 2,
    prerequisites: ['university'],
    schools: [
      { 
        id: 'graduate_school', 
        name: 'Graduate School', 
        type: 'university', 
        cost: 300,
        quality: 8,
        reputation: 'Excellent'
      }
    ]
  }
];

export const getAvailableSchools = (stageId: string, character: any): School[] => {
  const stage = educationStages.find(s => s.id === stageId);
  return stage?.schools || [];
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
