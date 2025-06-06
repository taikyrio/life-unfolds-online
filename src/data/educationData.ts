

export interface EducationStage {
  id: string;
  name: string;
  minAge: number;
  maxAge: number;
  duration: number;
  cost: number;
}

export const educationStages: EducationStage[] = [
  {
    id: 'elementary',
    name: 'Elementary School',
    minAge: 5,
    maxAge: 11,
    duration: 6,
    cost: 0
  },
  {
    id: 'middle',
    name: 'Middle School',
    minAge: 11,
    maxAge: 14,
    duration: 3,
    cost: 0
  },
  {
    id: 'high',
    name: 'High School',
    minAge: 14,
    maxAge: 18,
    duration: 4,
    cost: 0
  },
  {
    id: 'college',
    name: 'College',
    minAge: 18,
    maxAge: 25,
    duration: 4,
    cost: 50000
  }
];

