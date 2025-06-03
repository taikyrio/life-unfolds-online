
import { Career, CareerLevel } from '../../types/career';

export const careerPaths: Career[] = [
  {
    id: 'medicine',
    name: 'Medical Career',
    category: 'healthcare',
    description: 'Save lives and help people heal',
    requirements: {
      education: 'Medical School',
      minStats: { smarts: 80, health: 60 }
    },
    levels: [
      {
        level: 1,
        title: 'Medical Student',
        salary: 0,
        description: 'Learning the fundamentals of medicine'
      },
      {
        level: 2,
        title: 'Intern',
        salary: 45,
        description: 'First year of residency training',
        promotionRequirements: { yearsExperience: 1, performance: 70 }
      },
      {
        level: 3,
        title: 'Resident',
        salary: 55,
        description: 'Specialized medical training',
        promotionRequirements: { yearsExperience: 3, performance: 75 }
      },
      {
        level: 4,
        title: 'Junior Doctor',
        salary: 120,
        description: 'Practicing physician',
        promotionRequirements: { yearsExperience: 2, performance: 80 }
      },
      {
        level: 5,
        title: 'Senior Doctor',
        salary: 200,
        description: 'Experienced physician with specialization',
        promotionRequirements: { yearsExperience: 5, performance: 85 }
      },
      {
        level: 6,
        title: 'Department Head',
        salary: 350,
        description: 'Leading a medical department',
        promotionRequirements: { yearsExperience: 8, performance: 90, minStats: { relationships: 70 } }
      },
      {
        level: 7,
        title: 'Chief of Surgery',
        salary: 500,
        description: 'Top surgical position in the hospital',
        promotionRequirements: { yearsExperience: 12, performance: 95, minStats: { smarts: 90 } }
      }
    ],
    benefits: ['Health Insurance', 'Respect', 'Job Security', 'High Income Potential']
  },
  {
    id: 'technology',
    name: 'Software Engineering',
    category: 'technology',
    description: 'Build the digital future',
    requirements: {
      education: 'Computer Science',
      minStats: { smarts: 70 }
    },
    levels: [
      {
        level: 1,
        title: 'Junior Developer',
        salary: 65,
        description: 'Learning to code professionally'
      },
      {
        level: 2,
        title: 'Software Developer',
        salary: 85,
        description: 'Building software applications',
        promotionRequirements: { yearsExperience: 2, performance: 75 }
      },
      {
        level: 3,
        title: 'Senior Developer',
        salary: 120,
        description: 'Leading development projects',
        promotionRequirements: { yearsExperience: 3, performance: 80 }
      },
      {
        level: 4,
        title: 'Tech Lead',
        salary: 150,
        description: 'Technical leadership role',
        promotionRequirements: { yearsExperience: 2, performance: 85, minStats: { relationships: 60 } }
      },
      {
        level: 5,
        title: 'Engineering Manager',
        salary: 180,
        description: 'Managing engineering teams',
        promotionRequirements: { yearsExperience: 3, performance: 85, minStats: { relationships: 70 } }
      },
      {
        level: 6,
        title: 'Director of Engineering',
        salary: 250,
        description: 'Strategic technical leadership',
        promotionRequirements: { yearsExperience: 5, performance: 90, minStats: { relationships: 75 } }
      },
      {
        level: 7,
        title: 'CTO',
        salary: 400,
        description: 'Chief Technology Officer',
        promotionRequirements: { yearsExperience: 8, performance: 95, minStats: { smarts: 85, relationships: 80 } }
      }
    ],
    benefits: ['Remote Work', 'Stock Options', 'High Growth', 'Innovation']
  },
  {
    id: 'business',
    name: 'Corporate Business',
    category: 'business',
    description: 'Climb the corporate ladder',
    requirements: {
      education: 'Business School',
      minStats: { smarts: 60 }
    },
    levels: [
      {
        level: 1,
        title: 'Business Analyst',
        salary: 55,
        description: 'Analyzing business processes'
      },
      {
        level: 2,
        title: 'Associate',
        salary: 70,
        description: 'Supporting business operations',
        promotionRequirements: { yearsExperience: 2, performance: 70 }
      },
      {
        level: 3,
        title: 'Manager',
        salary: 95,
        description: 'Managing teams and projects',
        promotionRequirements: { yearsExperience: 3, performance: 75, minStats: { relationships: 65 } }
      },
      {
        level: 4,
        title: 'Senior Manager',
        salary: 125,
        description: 'Senior leadership role',
        promotionRequirements: { yearsExperience: 3, performance: 80, minStats: { relationships: 70 } }
      },
      {
        level: 5,
        title: 'Director',
        salary: 160,
        description: 'Strategic business leadership',
        promotionRequirements: { yearsExperience: 4, performance: 85, minStats: { relationships: 75 } }
      },
      {
        level: 6,
        title: 'Vice President',
        salary: 220,
        description: 'Executive leadership position',
        promotionRequirements: { yearsExperience: 5, performance: 90, minStats: { relationships: 80 } }
      },
      {
        level: 7,
        title: 'CEO',
        salary: 500,
        description: 'Chief Executive Officer',
        promotionRequirements: { yearsExperience: 10, performance: 95, minStats: { smarts: 80, relationships: 85 } }
      }
    ],
    benefits: ['Networking Opportunities', 'Leadership Experience', 'High Earning Potential', 'Global Travel']
  }
];

export const getCareerById = (id: string): Career | undefined => {
  return careerPaths.find(career => career.id === id);
};

export const getCareersInCategory = (category: string): Career[] => {
  return careerPaths.filter(career => career.category === category);
};
