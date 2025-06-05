export interface SchoolClique {
  id: string;
  name: string;
  description: string;
  stages: string[];
  effects: {
    popularity?: number;
    happiness?: number;
    smarts?: number;
  };
  requirements?: {
    minPopularity?: number;
    minSmarts?: number;
    gender?: 'male' | 'female';
    clubMembership?: string[];
  };
}

export const schoolCliques: SchoolClique[] = [
  {
    id: 'popular_kids',
    name: 'Popular Kids',
    description: 'The cool crowd that everyone wants to be friends with',
    stages: ['middle_school', 'high_school'],
    effects: { popularity: 25, happiness: 10 },
    requirements: { minPopularity: 70 }
  },
  {
    id: 'nerds',
    name: 'Nerds',
    description: 'Smart kids who focus on academics',
    stages: ['elementary', 'middle_school', 'high_school'],
    effects: { smarts: 15, popularity: -10, happiness: 5 },
    requirements: { minSmarts: 60 }
  },
  {
    id: 'jocks',
    name: 'Jocks',
    description: 'Athletic students who dominate sports',
    stages: ['middle_school', 'high_school'],
    effects: { popularity: 20, happiness: 15 },
    requirements: { clubMembership: ['football_team', 'basketball_team'] }
  },
  {
    id: 'goths',
    name: 'Goths',
    description: 'Alternative kids with unique style',
    stages: ['high_school'],
    effects: { happiness: 5, popularity: -5 }
  },
  {
    id: 'mean_girls',
    name: 'Mean Girls',
    description: 'Popular but often cruel social group',
    stages: ['middle_school', 'high_school'],
    effects: { popularity: 20, happiness: -5 },
    requirements: { minPopularity: 65, gender: 'female' }
  },
  {
    id: 'theater_kids',
    name: 'Theater Kids',
    description: 'Dramatic and creative students',
    stages: ['middle_school', 'high_school'],
    effects: { happiness: 20, popularity: 5 },
    requirements: { clubMembership: ['drama_club'] }
  },
  {
    id: 'band_geeks',
    name: 'Band Geeks',
    description: 'Music-loving students',
    stages: ['middle_school', 'high_school'],
    effects: { happiness: 15, smarts: 5 },
    requirements: { clubMembership: ['band'] }
  },
  {
    id: 'student_leaders',
    name: 'Student Leaders',
    description: 'Responsible students who lead by example',
    stages: ['middle_school', 'high_school'],
    effects: { popularity: 15, smarts: 10 },
    requirements: { minPopularity: 50, clubMembership: ['student_council'] }
  }
];

export const getCliqueById = (id: string): SchoolClique | undefined => {
  return schoolCliques.find(clique => clique.id === id);
};

export const getCliquesForStage = (stage: string): SchoolClique[] => {
  return schoolCliques.filter(clique => clique.stages.includes(stage));
};