export interface EducationStage {
  id: string;
  name: string;
  minAge: number;
  maxAge: number;
  duration: number;
  isMandatory: boolean;
  cost: number;
  dropoutAge?: number;
  schools: School[];
  requirements?: {
    minGPA?: number;
    completedStages?: string[];
    majorRequired?: boolean;
  };
}

export interface School {
  id: string;
  name: string;
  type: 'public' | 'private' | 'community' | 'university';
  cost: number;
  quality: number;
  reputation: string;
  acceptanceRate: number;
  requirements?: {
    minGPA?: number;
    minSmarts?: number;
    minWealth?: number;
  };
}

export const educationStages: EducationStage[] = [
  {
    id: 'elementary',
    name: 'Elementary School',
    minAge: 4,
    maxAge: 10,
    duration: 7,
    isMandatory: true,
    cost: 0,
    schools: [
      {
        id: 'public_elementary',
        name: 'Public Elementary School',
        type: 'public',
        cost: 0,
        quality: 6,
        reputation: 'Average',
        acceptanceRate: 100
      },
      {
        id: 'private_elementary',
        name: 'Private Elementary School',
        type: 'private',
        cost: 15,
        quality: 8,
        reputation: 'Good',
        acceptanceRate: 80,
        requirements: { minWealth: 100 }
      }
    ]
  },
  {
    id: 'middle_school',
    name: 'Middle School',
    minAge: 11,
    maxAge: 13,
    duration: 3,
    isMandatory: true,
    cost: 0,
    requirements: { completedStages: ['elementary'] },
    schools: [
      {
        id: 'public_middle',
        name: 'Public Middle School',
        type: 'public',
        cost: 0,
        quality: 6,
        reputation: 'Average',
        acceptanceRate: 100
      },
      {
        id: 'private_middle',
        name: 'Private Middle School',
        type: 'private',
        cost: 20,
        quality: 8,
        reputation: 'Good',
        acceptanceRate: 75,
        requirements: { minWealth: 150 }
      }
    ]
  },
  {
    id: 'high_school',
    name: 'High School',
    minAge: 14,
    maxAge: 18,
    duration: 4,
    isMandatory: true,
    dropoutAge: 16,
    cost: 0,
    requirements: { completedStages: ['middle_school'] },
    schools: [
      {
        id: 'public_high',
        name: 'Public High School',
        type: 'public',
        cost: 0,
        quality: 6,
        reputation: 'Average',
        acceptanceRate: 100
      },
      {
        id: 'private_high',
        name: 'Private High School',
        type: 'private',
        cost: 30,
        quality: 9,
        reputation: 'Excellent',
        acceptanceRate: 70,
        requirements: { minWealth: 200, minGPA: 3.0 }
      }
    ]
  },
  {
    id: 'community_college',
    name: 'Community College',
    minAge: 18,
    maxAge: 99,
    duration: 2,
    isMandatory: false,
    cost: 5,
    requirements: { completedStages: ['high_school'] },
    schools: [
      {
        id: 'community_college',
        name: 'Community College',
        type: 'community',
        cost: 5,
        quality: 5,
        reputation: 'Accessible',
        acceptanceRate: 100
      }
    ]
  },
  {
    id: 'university',
    name: 'University',
    minAge: 18,
    maxAge: 99,
    duration: 4,
    isMandatory: false,
    cost: 40,
    requirements: { completedStages: ['high_school'], minGPA: 2.5, majorRequired: true },
    schools: [
      {
        id: 'state_university',
        name: 'State University',
        type: 'university',
        cost: 40,
        quality: 7,
        reputation: 'Good',
        acceptanceRate: 70,
        requirements: { minGPA: 2.5, minSmarts: 50 }
      },
      {
        id: 'private_university',
        name: 'Private University',
        type: 'university',
        cost: 80,
        quality: 9,
        reputation: 'Prestigious',
        acceptanceRate: 30,
        requirements: { minGPA: 3.5, minSmarts: 70, minWealth: 300 }
      },
      {
        id: 'ivy_league',
        name: 'Ivy League University',
        type: 'university',
        cost: 120,
        quality: 10,
        reputation: 'Elite',
        acceptanceRate: 10,
        requirements: { minGPA: 3.8, minSmarts: 85, minWealth: 500 }
      }
    ]
  }
];