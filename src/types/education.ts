
export interface EducationRecord {
  currentStage: string | null;
  currentSchool: string | null;
  currentYear: number;
  gpa: number;
  completedStages: string[];
  achievements: string[];
  testScores: number[];
  disciplinaryActions: number;
  dropouts: number;
  levels: string[];
  grades: number[];
  major?: string;
  clubs?: string[];
  clique?: string;
  popularity?: number;
}

export interface CurrentEducation {
  stage: string;
  school: string;
  year: number;
  gpa: number;
  level: string;
  currentYear: number;
  institution: string;
}
