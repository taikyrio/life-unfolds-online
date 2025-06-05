
export interface EducationRecord {
  currentStage?: string | null;
  currentSchool?: string | null;
  currentYear?: number;
  totalYears?: number;
  gpa?: number;
  completedStages?: string[];
  achievements?: string[];
  major?: string;
  testScores?: number[];
  disciplinaryActions?: number;
  dropouts?: number;
  
  // Social aspects
  clubs?: string[];
  clique?: string | null;
  popularity?: number;
  
  // Greek life (university only)
  fraternity?: string | null;
  sorority?: string | null;
  
  // Financial
  scholarships?: string[];
  studentLoans?: number;
  tuitionPaid?: number;
  
  // Backwards compatibility
  levels?: string[];
  grades?: any[];
  currentGPA?: number;
  schoolType?: string;
  schoolName?: string;
}

export interface ClassmateInteraction {
  id: string;
  name: string;
  relationshipLevel: number;
  lastInteraction?: string;
  personality: {
    kindness: number;
    intelligence: number;
    humor: number;
    popularity: number;
  };
}

export interface DisciplinaryAction {
  id: string;
  type: 'warning' | 'detention' | 'suspension' | 'expulsion';
  reason: string;
  date: number;
  severity: number;
}

export interface AcademicEvent {
  id: string;
  type: 'bullying' | 'achievement' | 'social' | 'academic' | 'disciplinary';
  description: string;
  choices?: {
    text: string;
    outcome: {
      popularity?: number;
      happiness?: number;
      smarts?: number;
      disciplinary?: boolean;
    };
  }[];
}

export interface GreekLifeOrganization {
  id: string;
  name: string;
  type: 'fraternity' | 'sorority';
  prestige: number;
  cost: number;
  requirements: {
    minPopularity?: number;
    minWealth?: number;
    minGPA?: number;
  };
}
