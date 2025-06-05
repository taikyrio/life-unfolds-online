
export interface UniversityMajor {
  id: string;
  name: string;
  category: string;
  difficulty: number;
  smartsBonus: number;
  availableGraduateSchools: string[];
}

export const universityMajors: UniversityMajor[] = [
  // STEM Majors
  {
    id: 'biology',
    name: 'Biology',
    category: 'STEM',
    difficulty: 8,
    smartsBonus: 15,
    availableGraduateSchools: ['graduate_school', 'medical_school', 'dental_school', 'pharmacy_school', 'veterinary_school']
  },
  {
    id: 'chemistry',
    name: 'Chemistry',
    category: 'STEM',
    difficulty: 9,
    smartsBonus: 18,
    availableGraduateSchools: ['graduate_school', 'medical_school', 'dental_school', 'pharmacy_school', 'veterinary_school']
  },
  {
    id: 'physics',
    name: 'Physics',
    category: 'STEM',
    difficulty: 10,
    smartsBonus: 20,
    availableGraduateSchools: ['graduate_school', 'medical_school', 'dental_school', 'pharmacy_school', 'veterinary_school']
  },
  {
    id: 'mathematics',
    name: 'Mathematics',
    category: 'STEM',
    difficulty: 9,
    smartsBonus: 17,
    availableGraduateSchools: ['graduate_school', 'business_school']
  },
  {
    id: 'computer_science',
    name: 'Computer Science',
    category: 'STEM',
    difficulty: 8,
    smartsBonus: 16,
    availableGraduateSchools: ['graduate_school']
  },

  // Business Majors
  {
    id: 'accounting',
    name: 'Accounting',
    category: 'Business',
    difficulty: 6,
    smartsBonus: 12,
    availableGraduateSchools: ['graduate_school', 'business_school']
  },
  {
    id: 'economics',
    name: 'Economics',
    category: 'Business',
    difficulty: 7,
    smartsBonus: 14,
    availableGraduateSchools: ['graduate_school', 'business_school']
  },
  {
    id: 'finance',
    name: 'Finance',
    category: 'Business',
    difficulty: 6,
    smartsBonus: 13,
    availableGraduateSchools: ['graduate_school', 'business_school', 'law_school']
  },
  {
    id: 'marketing',
    name: 'Marketing',
    category: 'Business',
    difficulty: 5,
    smartsBonus: 10,
    availableGraduateSchools: ['graduate_school', 'business_school']
  },
  {
    id: 'information_systems',
    name: 'Information Systems',
    category: 'Business',
    difficulty: 6,
    smartsBonus: 12,
    availableGraduateSchools: ['graduate_school', 'business_school']
  },

  // Liberal Arts
  {
    id: 'english',
    name: 'English',
    category: 'Liberal Arts',
    difficulty: 5,
    smartsBonus: 11,
    availableGraduateSchools: ['graduate_school', 'business_school', 'law_school']
  },
  {
    id: 'philosophy',
    name: 'Philosophy',
    category: 'Liberal Arts',
    difficulty: 7,
    smartsBonus: 13,
    availableGraduateSchools: ['graduate_school', 'law_school']
  },
  {
    id: 'political_science',
    name: 'Political Science',
    category: 'Liberal Arts',
    difficulty: 6,
    smartsBonus: 12,
    availableGraduateSchools: ['graduate_school', 'law_school']
  },
  {
    id: 'psychology',
    name: 'Psychology',
    category: 'Liberal Arts',
    difficulty: 6,
    smartsBonus: 12,
    availableGraduateSchools: ['graduate_school', 'medical_school']
  },
  {
    id: 'criminal_justice',
    name: 'Criminal Justice',
    category: 'Liberal Arts',
    difficulty: 5,
    smartsBonus: 10,
    availableGraduateSchools: ['graduate_school', 'law_school']
  },

  // Health Sciences
  {
    id: 'nursing',
    name: 'Nursing',
    category: 'Health Sciences',
    difficulty: 7,
    smartsBonus: 13,
    availableGraduateSchools: ['graduate_school', 'medical_school', 'dental_school', 'pharmacy_school', 'veterinary_school', 'nursing_school']
  },

  // Arts (Limited graduate options)
  {
    id: 'art_history',
    name: 'Art History',
    category: 'Arts',
    difficulty: 4,
    smartsBonus: 8,
    availableGraduateSchools: []
  },
  {
    id: 'dance',
    name: 'Dance',
    category: 'Arts',
    difficulty: 5,
    smartsBonus: 7,
    availableGraduateSchools: []
  },
  {
    id: 'graphic_design',
    name: 'Graphic Design',
    category: 'Arts',
    difficulty: 5,
    smartsBonus: 8,
    availableGraduateSchools: []
  },
  {
    id: 'communications',
    name: 'Communications',
    category: 'Arts',
    difficulty: 4,
    smartsBonus: 7,
    availableGraduateSchools: []
  },
  {
    id: 'religious_studies',
    name: 'Religious Studies',
    category: 'Arts',
    difficulty: 5,
    smartsBonus: 9,
    availableGraduateSchools: []
  },
  {
    id: 'architecture',
    name: 'Architecture',
    category: 'Arts',
    difficulty: 8,
    smartsBonus: 14,
    availableGraduateSchools: []
  }
];

export const getMajorById = (id: string): UniversityMajor | undefined => {
  return universityMajors.find(major => major.id === id);
};

export const getMajorsByCategory = (category: string): UniversityMajor[] => {
  return universityMajors.filter(major => major.category === category);
};
