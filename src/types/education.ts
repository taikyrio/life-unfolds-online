

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
}

export interface CurrentEducation {
  stage: string;
  school: string;
  year: number;
  gpa: number;
}

