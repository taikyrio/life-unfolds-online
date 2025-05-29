
export interface School {
  id: string;
  name: string;
  type: 'public' | 'private' | 'boarding';
  quality: number; // 1-10 scale
  cost: number; // yearly cost
  reputation: string;
  requirements?: {
    minGPA?: number;
    minWealth?: number;
    testScore?: number;
  };
}

export interface EducationStage {
  id: string;
  name: string;
  minAge: number;
  maxAge: number;
  duration: number;
  mandatory: boolean;
  autoEnroll: boolean;
  schools: School[];
  subjects: string[];
  activities: string[];
}

export interface EducationEvent {
  id: string;
  title: string;
  description: string;
  stage: string;
  choices: {
    id: string;
    text: string;
    effects: {
      gpa?: number;
      happiness?: number;
      smarts?: number;
      relationships?: number;
      wealth?: number;
      reputation?: number;
    };
    consequences?: string[];
  }[];
  probability: number;
  conditions?: {
    minGPA?: number;
    maxGPA?: number;
    stage?: string;
  };
}

export const educationStages: EducationStage[] = [
  {
    id: 'preschool',
    name: 'Preschool',
    minAge: 3,
    maxAge: 5,
    duration: 2,
    mandatory: false,
    autoEnroll: true,
    subjects: ['Basic Skills', 'Social Development'],
    activities: ['Story Time', 'Art & Crafts', 'Playground'],
    schools: [
      {
        id: 'public_preschool',
        name: 'Community Preschool',
        type: 'public',
        quality: 5,
        cost: 0,
        reputation: 'Average'
      },
      {
        id: 'private_preschool',
        name: 'Little Scholars Academy',
        type: 'private',
        quality: 8,
        cost: 5,
        reputation: 'Excellent',
        requirements: { minWealth: 50 }
      }
    ]
  },
  {
    id: 'elementary',
    name: 'Elementary School',
    minAge: 6,
    maxAge: 11,
    duration: 6,
    mandatory: true,
    autoEnroll: true,
    subjects: ['Reading', 'Math', 'Science', 'Social Studies', 'Art', 'PE'],
    activities: ['School Play', 'Science Fair', 'Math Olympics', 'Art Contest'],
    schools: [
      {
        id: 'public_elementary',
        name: 'Lincoln Elementary',
        type: 'public',
        quality: 6,
        cost: 0,
        reputation: 'Good'
      },
      {
        id: 'private_elementary',
        name: 'St. Mary\'s Academy',
        type: 'private',
        quality: 9,
        cost: 8,
        reputation: 'Outstanding',
        requirements: { minWealth: 80 }
      }
    ]
  },
  {
    id: 'middle',
    name: 'Middle School',
    minAge: 12,
    maxAge: 14,
    duration: 3,
    mandatory: true,
    autoEnroll: true,
    subjects: ['English', 'Math', 'Science', 'History', 'Foreign Language', 'Electives'],
    activities: ['Student Council', 'Drama Club', 'Band', 'Sports Teams'],
    schools: [
      {
        id: 'public_middle',
        name: 'Washington Middle School',
        type: 'public',
        quality: 6,
        cost: 0,
        reputation: 'Good'
      },
      {
        id: 'private_middle',
        name: 'Prestigious Prep Academy',
        type: 'private',
        quality: 9,
        cost: 12,
        reputation: 'Elite',
        requirements: { minWealth: 120, minGPA: 3.5 }
      }
    ]
  },
  {
    id: 'high',
    name: 'High School',
    minAge: 15,
    maxAge: 18,
    duration: 4,
    mandatory: false, // Becomes optional after 16
    autoEnroll: true, // Auto-enroll until 16
    subjects: ['English', 'Math', 'Science', 'History', 'Foreign Language', 'AP Courses'],
    activities: ['Prom Committee', 'Debate Team', 'Yearbook', 'Varsity Sports'],
    schools: [
      {
        id: 'public_high',
        name: 'Central High School',
        type: 'public',
        quality: 7,
        cost: 0,
        reputation: 'Good'
      },
      {
        id: 'private_high',
        name: 'Elite Preparatory School',
        type: 'private',
        quality: 10,
        cost: 20,
        reputation: 'World-Class',
        requirements: { minWealth: 200, minGPA: 3.7 }
      },
      {
        id: 'boarding_high',
        name: 'Riverside Boarding School',
        type: 'boarding',
        quality: 9,
        cost: 35,
        reputation: 'Prestigious',
        requirements: { minWealth: 300, minGPA: 3.5 }
      }
    ]
  },
  {
    id: 'university',
    name: 'University',
    minAge: 18,
    maxAge: 25,
    duration: 4,
    mandatory: false,
    autoEnroll: false,
    subjects: ['Major Courses', 'General Education', 'Electives'],
    activities: ['Greek Life', 'Research Projects', 'Internships', 'Study Abroad'],
    schools: [
      {
        id: 'community_college',
        name: 'Metro Community College',
        type: 'public',
        quality: 5,
        cost: 15,
        reputation: 'Basic'
      },
      {
        id: 'state_university',
        name: 'State University',
        type: 'public',
        quality: 7,
        cost: 25,
        reputation: 'Respected'
      },
      {
        id: 'private_university',
        name: 'Ivy League University',
        type: 'private',
        quality: 10,
        cost: 60,
        reputation: 'World-Renowned',
        requirements: { minGPA: 3.8, testScore: 1400 }
      }
    ]
  },
  {
    id: 'graduate',
    name: 'Graduate School',
    minAge: 22,
    maxAge: 35,
    duration: 2,
    mandatory: false,
    autoEnroll: false,
    subjects: ['Advanced Research', 'Thesis', 'Specialized Courses'],
    activities: ['Teaching Assistant', 'Research Assistant', 'Conferences'],
    schools: [
      {
        id: 'state_grad',
        name: 'State Graduate School',
        type: 'public',
        quality: 7,
        cost: 30,
        reputation: 'Good'
      },
      {
        id: 'elite_grad',
        name: 'Elite Graduate Institute',
        type: 'private',
        quality: 10,
        cost: 80,
        reputation: 'World-Class',
        requirements: { minGPA: 3.7 }
      }
    ]
  }
];

export const educationEvents: EducationEvent[] = [
  {
    id: 'difficult_test',
    title: 'Difficult Test Coming Up',
    description: 'You have a major test tomorrow that could significantly impact your grade.',
    stage: 'all',
    probability: 0.3,
    choices: [
      {
        id: 'study_hard',
        text: 'Study all night',
        effects: { gpa: 0.2, smarts: 5, happiness: -10 },
        consequences: ['You aced the test but feel exhausted!']
      },
      {
        id: 'study_normal',
        text: 'Study for a few hours',
        effects: { gpa: 0.1, smarts: 3, happiness: -5 },
        consequences: ['You did well on the test.']
      },
      {
        id: 'skip_study',
        text: 'Don\'t study at all',
        effects: { gpa: -0.3, happiness: 10 },
        consequences: ['You failed the test miserably.']
      },
      {
        id: 'cheat',
        text: 'Try to cheat',
        effects: { gpa: 0.3, smarts: -5 },
        consequences: ['You got away with it this time, but felt guilty.']
      }
    ]
  },
  {
    id: 'teacher_conflict',
    title: 'Conflict with Teacher',
    description: 'Your teacher is being unfair and picking on you in class.',
    stage: 'all',
    probability: 0.2,
    choices: [
      {
        id: 'talk_respectfully',
        text: 'Talk to them respectfully after class',
        effects: { relationships: 10, gpa: 0.1 },
        consequences: ['Your teacher appreciated your maturity and the situation improved.']
      },
      {
        id: 'argue_back',
        text: 'Argue back in class',
        effects: { gpa: -0.2, relationships: -15, reputation: -5 },
        consequences: ['You got sent to the principal\'s office.']
      },
      {
        id: 'tell_parents',
        text: 'Tell your parents',
        effects: { relationships: 5, gpa: 0.05 },
        consequences: ['Your parents talked to the school and things got better.']
      }
    ]
  },
  {
    id: 'scholarship_opportunity',
    title: 'Scholarship Opportunity',
    description: 'You\'ve been offered a chance to apply for a prestigious scholarship.',
    stage: 'high',
    probability: 0.15,
    conditions: { minGPA: 3.5 },
    choices: [
      {
        id: 'apply_scholarship',
        text: 'Apply for the scholarship',
        effects: { wealth: 50, smarts: 5, reputation: 10 },
        consequences: ['You won the scholarship! Your future is looking bright.']
      },
      {
        id: 'skip_scholarship',
        text: 'Don\'t apply',
        effects: { happiness: 5 },
        consequences: ['You missed out on a great opportunity.']
      }
    ]
  },
  {
    id: 'prom_invitation',
    title: 'Prom Invitation',
    description: 'Someone asked you to prom! How do you respond?',
    stage: 'high',
    probability: 0.4,
    choices: [
      {
        id: 'accept_prom',
        text: 'Accept and go to prom',
        effects: { happiness: 20, relationships: 15, wealth: -100 },
        consequences: ['You had an amazing time at prom!']
      },
      {
        id: 'decline_prom',
        text: 'Politely decline',
        effects: { happiness: -5, relationships: -5 },
        consequences: ['You stayed home and missed out on the fun.']
      },
      {
        id: 'ask_someone_else',
        text: 'Ask someone else instead',
        effects: { relationships: 10, wealth: -100 },
        consequences: ['You went to prom with your preferred date.']
      }
    ]
  },
  {
    id: 'college_party',
    title: 'College Party',
    description: 'There\'s a huge party tonight, but you have finals tomorrow.',
    stage: 'university',
    probability: 0.5,
    choices: [
      {
        id: 'study_finals',
        text: 'Stay in and study',
        effects: { gpa: 0.3, smarts: 10, happiness: -10 },
        consequences: ['You aced your finals!']
      },
      {
        id: 'party_responsibly',
        text: 'Go for a little while',
        effects: { happiness: 10, relationships: 10, gpa: -0.1 },
        consequences: ['You had fun but were a bit tired for the exam.']
      },
      {
        id: 'party_hard',
        text: 'Party all night',
        effects: { happiness: 25, relationships: 20, gpa: -0.4, smarts: -5 },
        consequences: ['You had an epic night but bombed your finals.']
      }
    ]
  }
];

export const universityMajors = [
  'Computer Science', 'Business', 'Engineering', 'Psychology', 'Biology',
  'English Literature', 'Mathematics', 'History', 'Political Science',
  'Art', 'Music', 'Philosophy', 'Chemistry', 'Physics', 'Economics'
];

export const getAvailableSchools = (stage: string, character: any) => {
  const educationStage = educationStages.find(s => s.id === stage);
  if (!educationStage) return [];

  return educationStage.schools.filter(school => {
    if (!school.requirements) return true;
    
    const { minGPA, minWealth, testScore } = school.requirements;
    
    if (minGPA && character.gpa < minGPA) return false;
    if (minWealth && character.wealth < minWealth) return false;
    if (testScore && (!character.testScores || Math.max(...character.testScores) < testScore)) return false;
    
    return true;
  });
};

export const calculateGPA = (grades: number[]) => {
  if (grades.length === 0) return 0;
  return grades.reduce((sum, grade) => sum + grade, 0) / grades.length;
};

export const getGradeFromGPA = (gpa: number): string => {
  if (gpa >= 3.7) return 'A';
  if (gpa >= 3.3) return 'B+';
  if (gpa >= 3.0) return 'B';
  if (gpa >= 2.7) return 'C+';
  if (gpa >= 2.3) return 'C';
  if (gpa >= 2.0) return 'D';
  return 'F';
};
