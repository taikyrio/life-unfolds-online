export interface SchoolClub {
  id: string;
  name: string;
  category: 'academic' | 'sports' | 'arts' | 'social' | 'service';
  stages: string[];
  timeCommitment: number;
  effects: {
    smarts?: number;
    popularity?: number;
    happiness?: number;
    health?: number;
  };
  requirements?: {
    minGPA?: number;
    minSmarts?: number;
    minPopularity?: number;
    tryoutRequired?: boolean;
  };
}

export const schoolClubs: SchoolClub[] = [
  {
    id: 'chess_club',
    name: 'Chess Club',
    category: 'academic',
    stages: ['elementary', 'middle_school', 'high_school'],
    timeCommitment: 3,
    effects: { smarts: 10, popularity: -5 },
    requirements: { minSmarts: 40 }
  },
  {
    id: 'debate_team',
    name: 'Debate Team',
    category: 'academic',
    stages: ['middle_school', 'high_school'],
    timeCommitment: 5,
    effects: { smarts: 15, popularity: 5 },
    requirements: { minGPA: 3.0, tryoutRequired: true }
  },
  {
    id: 'football_team',
    name: 'Football Team',
    category: 'sports',
    stages: ['high_school'],
    timeCommitment: 15,
    effects: { popularity: 20, health: 10, happiness: 10 },
    requirements: { tryoutRequired: true }
  },
  {
    id: 'basketball_team',
    name: 'Basketball Team',
    category: 'sports',
    stages: ['middle_school', 'high_school'],
    timeCommitment: 12,
    effects: { popularity: 15, health: 8, happiness: 8 },
    requirements: { tryoutRequired: true }
  },
  {
    id: 'drama_club',
    name: 'Drama Club',
    category: 'arts',
    stages: ['elementary', 'middle_school', 'high_school'],
    timeCommitment: 8,
    effects: { popularity: 10, happiness: 15 }
  },
  {
    id: 'band',
    name: 'School Band',
    category: 'arts',
    stages: ['elementary', 'middle_school', 'high_school'],
    timeCommitment: 6,
    effects: { smarts: 5, happiness: 10 }
  },
  {
    id: 'student_council',
    name: 'Student Council',
    category: 'social',
    stages: ['middle_school', 'high_school'],
    timeCommitment: 4,
    effects: { popularity: 15, smarts: 5 },
    requirements: { minPopularity: 60, minGPA: 3.2 }
  },
  {
    id: 'volunteer_club',
    name: 'Volunteer Club',
    category: 'service',
    stages: ['middle_school', 'high_school'],
    timeCommitment: 4,
    effects: { happiness: 20, popularity: 5 }
  },
  {
    id: 'science_club',
    name: 'Science Club',
    category: 'academic',
    stages: ['elementary', 'middle_school', 'high_school'],
    timeCommitment: 4,
    effects: { smarts: 12, happiness: 5 },
    requirements: { minSmarts: 50 }
  },
  {
    id: 'art_club',
    name: 'Art Club',
    category: 'arts',
    stages: ['elementary', 'middle_school', 'high_school'],
    timeCommitment: 3,
    effects: { happiness: 12, smarts: 3 }
  }
];

export const getClubById = (id: string): SchoolClub | undefined => {
  return schoolClubs.find(club => club.id === id);
};

export const getClubsForStage = (stage: string): SchoolClub[] => {
  return schoolClubs.filter(club => club.stages.includes(stage));
};