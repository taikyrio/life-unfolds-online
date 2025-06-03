
export interface EducationRecord {
  currentStage: string | null;
  currentSchool: string | null;
  currentYear: number;
  gpa: number;
  grades: any[];
  completedStages: string[];
  major: string | null;
  testScores: number[];
  disciplinaryActions: number;
  achievements: string[];
  dropouts: number;
}

export interface CurrentEducation {
  level: string;
  institution: string;
  currentYear: number;
  gpa: number;
  classmates: string[];
}
