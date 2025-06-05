export interface PrisonState {
  isInPrison: boolean;
  sentence: number; // years
  timeServed: number; // years
  crime: string;
  facility: string;
  securityLevel: 'minimum' | 'medium' | 'maximum';
  gangAffiliation?: string;
  reputation: number;
  cellmates: PrisonInmate[];
  disciplinaryActions: number;
  prisonJob?: string;
  prisonJobSalary: number;
  paroleEligible: boolean;
  paroleDate?: number; // age when eligible
}

export interface PrisonInmate {
  id: string;
  name: string;
  crime: string;
  sentence: number;
  dangerLevel: number;
  gangAffiliation?: string;
  relationship: number; // -100 to 100
}

export interface PrisonEvent {
  id: string;
  type: 'fight' | 'gang_recruitment' | 'contraband' | 'escape' | 'parole_hearing' | 'visitation' | 'work_assignment';
  description: string;
  choices: PrisonEventChoice[];
}

export interface PrisonEventChoice {
  id: string;
  text: string;
  effects: PrisonEventEffects;
}

export interface PrisonEventEffects {
  reputation?: number;
  health?: number;
  happiness?: number;
  sentence?: number; // additional time
  disciplinaryActions?: number;
  gangAffiliation?: string;
  escape?: boolean;
  death?: boolean;
  paroleChance?: number;
}

export interface PrisonJob {
  id: string;
  name: string;
  description: string;
  salary: number; // per year
  requirements: {
    reputation?: number;
    education?: string;
  };
  benefits: string[];
}