
export interface CareerLevel {
  id: string;
  title: string;
  salary: number;
  requirements: {
    experience?: number;
    age?: number;
    stats?: Record<string, number>;
  };
  promotionChance: number;
}

export interface Career {
  id: string;
  name: string;
  category: string;
  description: string;
  requirements: {
    education?: string;
    age?: number;
    stats?: Record<string, number>;
  };
  levels: CareerLevel[];
  benefits?: {
    health?: number;
    happiness?: number;
    relationships?: number;
  };
}

export const careerPaths: Career[] = [
  {
    id: 'fast_food',
    name: 'Fast Food Worker',
    category: 'Entry Level',
    description: 'Entry-level position in food service',
    requirements: { age: 16 },
    levels: [
      {
        id: 'crew_member',
        title: 'Crew Member',
        salary: 22000,
        requirements: { age: 16 },
        promotionChance: 0.3
      },
      {
        id: 'shift_leader',
        title: 'Shift Leader',
        salary: 26000,
        requirements: { experience: 1, stats: { smarts: 40 } },
        promotionChance: 0.25
      },
      {
        id: 'assistant_manager',
        title: 'Assistant Manager',
        salary: 32000,
        requirements: { experience: 3, stats: { smarts: 60, relationships: 50 } },
        promotionChance: 0.2
      },
      {
        id: 'store_manager',
        title: 'Store Manager',
        salary: 45000,
        requirements: { experience: 5, stats: { smarts: 70, relationships: 60 } },
        promotionChance: 0.15
      }
    ]
  },
  {
    id: 'retail',
    name: 'Retail Associate',
    category: 'Entry Level',
    description: 'Customer service and sales position',
    requirements: { age: 16 },
    levels: [
      {
        id: 'sales_associate',
        title: 'Sales Associate',
        salary: 24000,
        requirements: { age: 16 },
        promotionChance: 0.3
      },
      {
        id: 'senior_associate',
        title: 'Senior Associate',
        salary: 28000,
        requirements: { experience: 1, stats: { relationships: 45 } },
        promotionChance: 0.25
      },
      {
        id: 'department_supervisor',
        title: 'Department Supervisor',
        salary: 35000,
        requirements: { experience: 3, stats: { smarts: 55, relationships: 55 } },
        promotionChance: 0.2
      },
      {
        id: 'store_manager',
        title: 'Store Manager',
        salary: 52000,
        requirements: { experience: 5, stats: { smarts: 70, relationships: 65 } },
        promotionChance: 0.15
      }
    ]
  },
  {
    id: 'teacher',
    name: 'Teacher',
    category: 'Education',
    description: 'Educate and inspire the next generation',
    requirements: { education: 'Bachelor\'s Degree', age: 22 },
    levels: [
      {
        id: 'substitute_teacher',
        title: 'Substitute Teacher',
        salary: 32000,
        requirements: { age: 22, stats: { smarts: 70 } },
        promotionChance: 0.4
      },
      {
        id: 'classroom_teacher',
        title: 'Classroom Teacher',
        salary: 45000,
        requirements: { experience: 1, stats: { smarts: 75, relationships: 60 } },
        promotionChance: 0.25
      },
      {
        id: 'senior_teacher',
        title: 'Senior Teacher',
        salary: 55000,
        requirements: { experience: 5, stats: { smarts: 80, relationships: 70 } },
        promotionChance: 0.2
      },
      {
        id: 'department_head',
        title: 'Department Head',
        salary: 68000,
        requirements: { experience: 8, stats: { smarts: 85, relationships: 75 } },
        promotionChance: 0.15
      },
      {
        id: 'principal',
        title: 'Principal',
        salary: 85000,
        requirements: { experience: 12, stats: { smarts: 90, relationships: 80 } },
        promotionChance: 0.1
      }
    ]
  },
  {
    id: 'engineer',
    name: 'Engineer',
    category: 'Technology',
    description: 'Design and build solutions to complex problems',
    requirements: { education: 'Bachelor\'s Degree', age: 22 },
    levels: [
      {
        id: 'junior_engineer',
        title: 'Junior Engineer',
        salary: 65000,
        requirements: { age: 22, stats: { smarts: 80 } },
        promotionChance: 0.35
      },
      {
        id: 'engineer',
        title: 'Engineer',
        salary: 85000,
        requirements: { experience: 2, stats: { smarts: 85 } },
        promotionChance: 0.3
      },
      {
        id: 'senior_engineer',
        title: 'Senior Engineer',
        salary: 110000,
        requirements: { experience: 5, stats: { smarts: 90 } },
        promotionChance: 0.25
      },
      {
        id: 'lead_engineer',
        title: 'Lead Engineer',
        salary: 140000,
        requirements: { experience: 8, stats: { smarts: 92, relationships: 70 } },
        promotionChance: 0.2
      },
      {
        id: 'engineering_manager',
        title: 'Engineering Manager',
        salary: 180000,
        requirements: { experience: 12, stats: { smarts: 95, relationships: 80 } },
        promotionChance: 0.15
      }
    ]
  },
  {
    id: 'doctor',
    name: 'Doctor',
    category: 'Healthcare',
    description: 'Heal and care for patients',
    requirements: { education: 'Medical Degree', age: 26 },
    levels: [
      {
        id: 'resident',
        title: 'Medical Resident',
        salary: 55000,
        requirements: { age: 26, stats: { smarts: 90, health: 70 } },
        promotionChance: 0.8
      },
      {
        id: 'attending_physician',
        title: 'Attending Physician',
        salary: 220000,
        requirements: { experience: 3, stats: { smarts: 92, relationships: 70 } },
        promotionChance: 0.3
      },
      {
        id: 'senior_physician',
        title: 'Senior Physician',
        salary: 280000,
        requirements: { experience: 8, stats: { smarts: 95, relationships: 75 } },
        promotionChance: 0.2
      },
      {
        id: 'department_chief',
        title: 'Department Chief',
        salary: 350000,
        requirements: { experience: 15, stats: { smarts: 97, relationships: 85 } },
        promotionChance: 0.1
      }
    ]
  },
  {
    id: 'lawyer',
    name: 'Lawyer',
    category: 'Legal',
    description: 'Advocate for justice and defend clients',
    requirements: { education: 'Law Degree', age: 25 },
    levels: [
      {
        id: 'junior_associate',
        title: 'Junior Associate',
        salary: 85000,
        requirements: { age: 25, stats: { smarts: 85, relationships: 60 } },
        promotionChance: 0.4
      },
      {
        id: 'associate',
        title: 'Associate',
        salary: 150000,
        requirements: { experience: 3, stats: { smarts: 88, relationships: 70 } },
        promotionChance: 0.3
      },
      {
        id: 'senior_associate',
        title: 'Senior Associate',
        salary: 220000,
        requirements: { experience: 6, stats: { smarts: 92, relationships: 75 } },
        promotionChance: 0.2
      },
      {
        id: 'partner',
        title: 'Partner',
        salary: 400000,
        requirements: { experience: 12, stats: { smarts: 95, relationships: 85 } },
        promotionChance: 0.1
      }
    ]
  },
  {
    id: 'actor',
    name: 'Actor',
    category: 'Entertainment',
    description: 'Bring characters to life on stage and screen',
    requirements: { age: 18 },
    levels: [
      {
        id: 'background_extra',
        title: 'Background Extra',
        salary: 18000,
        requirements: { age: 18, stats: { looks: 50 } },
        promotionChance: 0.2
      },
      {
        id: 'small_roles',
        title: 'Small Role Actor',
        salary: 35000,
        requirements: { experience: 2, stats: { looks: 60, happiness: 50 } },
        promotionChance: 0.15
      },
      {
        id: 'supporting_actor',
        title: 'Supporting Actor',
        salary: 75000,
        requirements: { experience: 5, stats: { looks: 70, happiness: 60, fame: 30 } },
        promotionChance: 0.1
      },
      {
        id: 'lead_actor',
        title: 'Lead Actor',
        salary: 200000,
        requirements: { experience: 8, stats: { looks: 80, happiness: 70, fame: 60 } },
        promotionChance: 0.05
      },
      {
        id: 'movie_star',
        title: 'Movie Star',
        salary: 2000000,
        requirements: { experience: 12, stats: { looks: 90, happiness: 75, fame: 85 } },
        promotionChance: 0.02
      }
    ]
  },
  {
    id: 'entrepreneur',
    name: 'Entrepreneur',
    category: 'Business',
    description: 'Build your own business empire',
    requirements: { age: 18 },
    levels: [
      {
        id: 'startup_founder',
        title: 'Startup Founder',
        salary: 25000,
        requirements: { age: 18, stats: { smarts: 60, relationships: 50 } },
        promotionChance: 0.3
      },
      {
        id: 'small_business_owner',
        title: 'Small Business Owner',
        salary: 55000,
        requirements: { experience: 3, stats: { smarts: 70, relationships: 60 } },
        promotionChance: 0.25
      },
      {
        id: 'successful_entrepreneur',
        title: 'Successful Entrepreneur',
        salary: 150000,
        requirements: { experience: 6, stats: { smarts: 80, relationships: 70 } },
        promotionChance: 0.2
      },
      {
        id: 'business_mogul',
        title: 'Business Mogul',
        salary: 500000,
        requirements: { experience: 10, stats: { smarts: 90, relationships: 80 } },
        promotionChance: 0.1
      },
      {
        id: 'billionaire_ceo',
        title: 'Billionaire CEO',
        salary: 5000000,
        requirements: { experience: 15, stats: { smarts: 95, relationships: 85 } },
        promotionChance: 0.05
      }
    ]
  }
];

export const getCareerById = (careerId: string): Career | undefined => {
  return careerPaths.find(career => career.id === careerId);
};

export const getCareersByCategory = (category: string): Career[] => {
  return careerPaths.filter(career => career.category === category);
};

export const getAllCareerCategories = (): string[] => {
  return [...new Set(careerPaths.map(career => career.category))];
};
