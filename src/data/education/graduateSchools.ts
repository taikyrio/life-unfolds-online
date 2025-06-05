
export interface GraduateSchool {
  id: string;
  name: string;
  type: 'graduate' | 'business' | 'law' | 'medical' | 'dental' | 'pharmacy' | 'veterinary' | 'nursing';
  duration: number;
  cost: number;
  acceptanceRate: number;
  careerTitle?: string;
  requirements: {
    minGPA: number;
    minSmarts: number;
    requiredMajors: string[];
  };
  benefits: {
    smartsBoost: number;
    salaryMultiplier: number;
    prestigeBonus: number;
  };
}

export const graduateSchools: GraduateSchool[] = [
  {
    id: 'graduate_school',
    name: 'Graduate School',
    type: 'graduate',
    duration: 2,
    cost: 50,
    acceptanceRate: 60,
    requirements: {
      minGPA: 3.0,
      minSmarts: 60,
      requiredMajors: ['biology', 'chemistry', 'physics', 'mathematics', 'psychology', 'english', 'history', 'philosophy', 'political_science', 'economics', 'sociology', 'anthropology']
    },
    benefits: {
      smartsBoost: 15,
      salaryMultiplier: 1.3,
      prestigeBonus: 10
    }
  },
  {
    id: 'business_school',
    name: 'Business School',
    type: 'business',
    duration: 2,
    cost: 80,
    acceptanceRate: 40,
    careerTitle: 'Business Executive',
    requirements: {
      minGPA: 3.2,
      minSmarts: 65,
      requiredMajors: ['accounting', 'economics', 'english', 'finance', 'information_systems', 'marketing', 'mathematics']
    },
    benefits: {
      smartsBoost: 20,
      salaryMultiplier: 1.8,
      prestigeBonus: 25
    }
  },
  {
    id: 'law_school',
    name: 'Law School',
    type: 'law',
    duration: 4,
    cost: 100,
    acceptanceRate: 30,
    careerTitle: 'Lawyer',
    requirements: {
      minGPA: 3.4,
      minSmarts: 70,
      requiredMajors: ['criminal_justice', 'english', 'finance', 'philosophy', 'political_science']
    },
    benefits: {
      smartsBoost: 25,
      salaryMultiplier: 2.2,
      prestigeBonus: 35
    }
  },
  {
    id: 'medical_school',
    name: 'Medical School',
    type: 'medical',
    duration: 7,
    cost: 150,
    acceptanceRate: 15,
    careerTitle: 'Doctor',
    requirements: {
      minGPA: 3.7,
      minSmarts: 80,
      requiredMajors: ['biology', 'chemistry', 'physics', 'nursing', 'psychology']
    },
    benefits: {
      smartsBoost: 30,
      salaryMultiplier: 3.0,
      prestigeBonus: 50
    }
  },
  {
    id: 'dental_school',
    name: 'Dental School',
    type: 'dental',
    duration: 4,
    cost: 120,
    acceptanceRate: 25,
    careerTitle: 'Dentist',
    requirements: {
      minGPA: 3.5,
      minSmarts: 75,
      requiredMajors: ['biology', 'chemistry', 'physics', 'nursing']
    },
    benefits: {
      smartsBoost: 25,
      salaryMultiplier: 2.5,
      prestigeBonus: 40
    }
  },
  {
    id: 'pharmacy_school',
    name: 'Pharmacy School',
    type: 'pharmacy',
    duration: 4,
    cost: 90,
    acceptanceRate: 50,
    careerTitle: 'Pharmacist',
    requirements: {
      minGPA: 3.0,
      minSmarts: 65,
      requiredMajors: ['biology', 'chemistry', 'physics']
    },
    benefits: {
      smartsBoost: 20,
      salaryMultiplier: 2.0,
      prestigeBonus: 30
    }
  },
  {
    id: 'veterinary_school',
    name: 'Veterinary School',
    type: 'veterinary',
    duration: 4,
    cost: 110,
    acceptanceRate: 20,
    careerTitle: 'Veterinarian',
    requirements: {
      minGPA: 3.6,
      minSmarts: 75,
      requiredMajors: ['biology', 'chemistry', 'physics']
    },
    benefits: {
      smartsBoost: 25,
      salaryMultiplier: 2.3,
      prestigeBonus: 35
    }
  },
  {
    id: 'nursing_school',
    name: 'Nursing School',
    type: 'nursing',
    duration: 2,
    cost: 40,
    acceptanceRate: 70,
    careerTitle: 'Nurse',
    requirements: {
      minGPA: 2.8,
      minSmarts: 55,
      requiredMajors: ['nursing']
    },
    benefits: {
      smartsBoost: 15,
      salaryMultiplier: 1.5,
      prestigeBonus: 20
    }
  }
];

export const getGraduateSchoolById = (id: string): GraduateSchool | undefined => {
  return graduateSchools.find(school => school.id === id);
};

export const getAvailableGraduateSchools = (majorId: string): GraduateSchool[] => {
  return graduateSchools.filter(school => 
    school.requirements.requiredMajors.includes(majorId)
  );
};
