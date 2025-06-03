
export interface EducationRecord {
  levels: string[]; // Changed from being a direct array to having a levels property
  gpa?: number;
  graduationYear?: number;
  currentGPA?: number;
  schoolType?: 'public' | 'private' | 'charter' | 'homeschool';
  schoolName?: string;
  majorField?: string;
  minorField?: string;
  extracurriculars?: string[];
  scholarships?: string[];
  studentLoans?: number;
  academicHonors?: string[];
  suspensions?: number;
  detentions?: number;
  graduationHonors?: 'summa_cum_laude' | 'magna_cum_laude' | 'cum_laude' | 'none';
}

export interface CurrentEducation {
  level: string;
  institution: string;
  year: number;
  gpa: number;
  field?: string;
  isGraduating?: boolean;
  yearsRemaining?: number;
  tuitionCost?: number;
  scholarshipAmount?: number;
  workStudyProgram?: boolean;
  dormLife?: boolean;
  activities?: string[];
  socialClubs?: string[];
  academicClubs?: string[];
  sportsTeams?: string[];
}

export interface EducationPath {
  id: string;
  name: string;
  description: string;
  requiredAge: number;
  duration: number;
  cost: number;
  requirements: {
    previousEducation?: string[];
    minimumGPA?: number;
    minimumSmarts?: number;
    wealth?: number;
  };
  outcomes: {
    smartsBonus: number;
    wealthImpact: number;
    careerOpportunities: string[];
    socialStatus: number;
  };
  events: string[];
}

export interface SchoolActivity {
  id: string;
  name: string;
  description: string;
  emoji: string;
  category: 'academic' | 'sports' | 'arts' | 'social' | 'volunteering';
  timeCommitment: number;
  effects: {
    gpa?: number;
    happiness?: number;
    health?: number;
    relationships?: number;
    smarts?: number;
    looks?: number;
  };
  requirements: {
    minimumGPA?: number;
    minimumAge?: number;
    costs?: number;
  };
}
