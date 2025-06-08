import { Character } from '../types/character';

interface CareerPath {
  id: string;
  title: string;
  industry: string;
  levels: CareerLevel[];
  requirements: {
    education: string;
    minSmarts: number;
    skills?: string[];
  };
  description: string;
}

interface CareerLevel {
  level: number;
  title: string;
  salary: number;
  requirements: {
    experience: number;
    performance: number;
    skills?: string[];
  };
  promotionChance: number;
}

interface Skill {
  id: string;
  name: string;
  level: number;
  experience: number;
  category: string;
}

interface Performance {
  rating: number;
  reviews: string[];
  achievements: string[];
  warnings: number;
}

export class RealisticCareerSystem {
  private careerPaths: CareerPath[] = [];
  private skills: Map<string, Skill> = new Map();
  private performance: Performance = { rating: 50, reviews: [], achievements: [], warnings: 0 };

  constructor() {
    this.initializeCareerPaths();
  }

  private initializeCareerPaths() {
    this.careerPaths = [
      {
        id: 'software_engineering',
        title: 'Software Engineering',
        industry: 'Technology',
        requirements: { education: 'bachelor', minSmarts: 70 },
        description: 'Build software applications and systems',
        levels: [
          {
            level: 1,
            title: 'Junior Developer',
            salary: 65000,
            requirements: { experience: 0, performance: 40 },
            promotionChance: 0.7
          },
          {
            level: 2,
            title: 'Software Developer',
            salary: 85000,
            requirements: { experience: 2, performance: 60 },
            promotionChance: 0.6
          },
          {
            level: 3,
            title: 'Senior Developer',
            salary: 110000,
            requirements: { experience: 5, performance: 75 },
            promotionChance: 0.4
          },
          {
            level: 4,
            title: 'Lead Developer',
            salary: 140000,
            requirements: { experience: 8, performance: 85 },
            promotionChance: 0.3
          },
          {
            level: 5,
            title: 'Engineering Manager',
            salary: 180000,
            requirements: { experience: 12, performance: 90 },
            promotionChance: 0.2
          }
        ]
      },
      {
        id: 'healthcare_nursing',
        title: 'Nursing',
        industry: 'Healthcare',
        requirements: { education: 'associate', minSmarts: 60 },
        description: 'Provide patient care and medical support',
        levels: [
          {
            level: 1,
            title: 'Licensed Practical Nurse',
            salary: 45000,
            requirements: { experience: 0, performance: 50 },
            promotionChance: 0.8
          },
          {
            level: 2,
            title: 'Registered Nurse',
            salary: 70000,
            requirements: { experience: 2, performance: 65 },
            promotionChance: 0.6
          },
          {
            level: 3,
            title: 'Charge Nurse',
            salary: 85000,
            requirements: { experience: 5, performance: 80 },
            promotionChance: 0.4
          },
          {
            level: 4,
            title: 'Nurse Manager',
            salary: 105000,
            requirements: { experience: 8, performance: 85 },
            promotionChance: 0.3
          },
          {
            level: 5,
            title: 'Director of Nursing',
            salary: 130000,
            requirements: { experience: 15, performance: 90 },
            promotionChance: 0.2
          }
        ]
      },
      {
        id: 'business_sales',
        title: 'Sales',
        industry: 'Business',
        requirements: { education: 'high_school', minSmarts: 40 },
        description: 'Sell products and services to customers',
        levels: [
          {
            level: 1,
            title: 'Sales Associate',
            salary: 35000,
            requirements: { experience: 0, performance: 40 },
            promotionChance: 0.8
          },
          {
            level: 2,
            title: 'Sales Representative',
            salary: 50000,
            requirements: { experience: 1, performance: 60 },
            promotionChance: 0.7
          },
          {
            level: 3,
            title: 'Senior Sales Rep',
            salary: 70000,
            requirements: { experience: 3, performance: 75 },
            promotionChance: 0.5
          },
          {
            level: 4,
            title: 'Sales Manager',
            salary: 95000,
            requirements: { experience: 6, performance: 80 },
            promotionChance: 0.4
          },
          {
            level: 5,
            title: 'Regional Sales Director',
            salary: 150000,
            requirements: { experience: 10, performance: 85 },
            promotionChance: 0.3
          }
        ]
      },
      {
        id: 'education_teaching',
        title: 'Teaching',
        industry: 'Education',
        requirements: { education: 'bachelor', minSmarts: 65 },
        description: 'Educate and inspire students',
        levels: [
          {
            level: 1,
            title: 'Substitute Teacher',
            salary: 28000,
            requirements: { experience: 0, performance: 50 },
            promotionChance: 0.9
          },
          {
            level: 2,
            title: 'Elementary Teacher',
            salary: 42000,
            requirements: { experience: 1, performance: 65 },
            promotionChance: 0.6
          },
          {
            level: 3,
            title: 'High School Teacher',
            salary: 55000,
            requirements: { experience: 3, performance: 75 },
            promotionChance: 0.4
          },
          {
            level: 4,
            title: 'Department Head',
            salary: 70000,
            requirements: { experience: 8, performance: 80 },
            promotionChance: 0.3
          },
          {
            level: 5,
            title: 'Principal',
            salary: 95000,
            requirements: { experience: 15, performance: 85 },
            promotionChance: 0.25
          }
        ]
      }
    ];
  }

  public getAvailableCareers(character: Character): CareerPath[] {
    return this.careerPaths.filter(career => {
      return character.smarts >= career.requirements.minSmarts &&
             this.hasEducationRequirement(character, career.requirements.education);
    });
  }

  private hasEducationRequirement(character: Character, requirement: string): boolean {
    const educationLevels = {
      'none': 0,
      'high_school': 1,
      'associate': 2,
      'bachelor': 3,
      'master': 4,
      'doctorate': 5
    };

    const characterLevel = educationLevels[character.educationLevel as keyof typeof educationLevels] || 0;
    const requiredLevel = educationLevels[requirement as keyof typeof educationLevels] || 0;

    return characterLevel >= requiredLevel;
  }

  public processWorkYear(character: Character): {
    character: Character;
    events: string[];
    promotionOffered?: boolean;
  } {
    const events: string[] = [];
    let updatedCharacter = { ...character };

    if (!character.job || !character.jobLevel) {
      return { character: updatedCharacter, events };
    }

    // Calculate performance based on character attributes and random factors
    const basePerformance = this.calculatePerformance(character);
    const performanceVariation = (Math.random() - 0.5) * 20; // ±10 points
    const finalPerformance = Math.max(0, Math.min(100, basePerformance + performanceVariation));

    // Update job performance
    updatedCharacter.jobPerformance = {
      ...character.jobPerformance,
      performance: finalPerformance,
      experience: (character.jobPerformance?.experience || 0) + 1
    };

    // Generate performance-based events
    if (finalPerformance >= 90) {
      events.push(`Outstanding work performance! You received recognition from management.`);
      updatedCharacter.happiness = Math.min(100, updatedCharacter.happiness + 10);
      updatedCharacter.fame = Math.min(100, updatedCharacter.fame + 2);
    } else if (finalPerformance >= 75) {
      events.push(`Good job performance this year. You're meeting expectations well.`);
      updatedCharacter.happiness = Math.min(100, updatedCharacter.happiness + 5);
    } else if (finalPerformance < 40) {
      events.push(`Poor performance this year. You received a warning from your supervisor.`);
      updatedCharacter.happiness = Math.max(0, updatedCharacter.happiness - 10);
      this.performance.warnings += 1;
    }

    // Check for promotion eligibility
    const career = this.careerPaths.find(c => c.id === character.jobId);
    if (career && character.jobLevel < career.levels.length) {
      const currentLevel = career.levels[character.jobLevel - 1];
      const nextLevel = career.levels[character.jobLevel];
      
      if (this.isEligibleForPromotion(updatedCharacter, nextLevel)) {
        const promotionChance = this.calculatePromotionChance(updatedCharacter, nextLevel);
        
        if (Math.random() < promotionChance) {
          return {
            character: updatedCharacter,
            events,
            promotionOffered: true
          };
        }
      }
    }

    // Salary adjustments based on performance and market conditions
    const salaryIncrease = this.calculateSalaryIncrease(finalPerformance);
    if (salaryIncrease > 0) {
      updatedCharacter.salary = Math.round((updatedCharacter.salary || 0) * (1 + salaryIncrease));
      events.push(`You received a ${(salaryIncrease * 100).toFixed(1)}% salary increase!`);
    }

    return { character: updatedCharacter, events };
  }

  private calculatePerformance(character: Character): number {
    let performance = 50; // Base performance

    // Attribute bonuses
    performance += (character.smarts - 50) * 0.3;
    performance += (character.health - 50) * 0.2;
    performance += (character.happiness - 50) * 0.25;

    // Experience bonus
    const experience = character.jobPerformance?.experience || 0;
    performance += Math.min(experience * 2, 20); // Max 20 points from experience

    // Relationship bonus (good relationships can help at work)
    performance += (character.relationships - 50) * 0.1;

    return Math.max(0, Math.min(100, performance));
  }

  private isEligibleForPromotion(character: Character, nextLevel: CareerLevel): boolean {
    const experience = character.jobPerformance?.experience || 0;
    const performance = character.jobPerformance?.performance || 0;

    return experience >= nextLevel.requirements.experience &&
           performance >= nextLevel.requirements.performance;
  }

  private calculatePromotionChance(character: Character, nextLevel: CareerLevel): number {
    let chance = nextLevel.promotionChance;

    // Performance bonus
    const performance = character.jobPerformance?.performance || 0;
    if (performance > nextLevel.requirements.performance) {
      chance += (performance - nextLevel.requirements.performance) * 0.01;
    }

    // Experience bonus
    const experience = character.jobPerformance?.experience || 0;
    if (experience > nextLevel.requirements.experience) {
      chance += (experience - nextLevel.requirements.experience) * 0.05;
    }

    // Networking bonus (good relationships help)
    if (character.relationships > 70) {
      chance += 0.1;
    }

    return Math.min(0.95, chance); // Cap at 95%
  }

  private calculateSalaryIncrease(performance: number): number {
    if (performance >= 90) return 0.08; // 8% increase
    if (performance >= 80) return 0.05; // 5% increase
    if (performance >= 70) return 0.03; // 3% increase
    if (performance >= 60) return 0.02; // 2% increase
    return 0; // No increase
  }

  public acceptPromotion(character: Character): Character {
    const career = this.careerPaths.find(c => c.id === character.jobId);
    if (!career || !character.jobLevel) return character;

    const nextLevel = career.levels[character.jobLevel];
    if (!nextLevel) return character;

    return {
      ...character,
      jobLevel: character.jobLevel + 1,
      job: nextLevel.title,
      salary: nextLevel.salary,
      happiness: Math.min(100, character.happiness + 15),
      fame: Math.min(100, character.fame + 5)
    };
  }

  public generateWorkEvents(character: Character): any[] {
    const events: any[] = [];

    // Industry-specific events
    const career = this.careerPaths.find(c => c.id === character.jobId);
    if (!career) return events;

    switch (career.industry) {
      case 'Technology':
        events.push(...this.getTechEvents(character));
        break;
      case 'Healthcare':
        events.push(...this.getHealthcareEvents(character));
        break;
      case 'Business':
        events.push(...this.getBusinessEvents(character));
        break;
      case 'Education':
        events.push(...this.getEducationEvents(character));
        break;
    }

    return events;
  }

  private getTechEvents(character: Character): any[] {
    return [
      {
        id: 'tech_conference',
        title: 'Tech Conference',
        description: 'Your company is sending you to a major technology conference.',
        choices: [
          {
            id: 'network_actively',
            text: 'Network with other professionals',
            effects: { relationships: 10, fame: 5, smarts: 5 }
          },
          {
            id: 'focus_learning',
            text: 'Focus on learning new technologies',
            effects: { smarts: 15, happiness: 5 }
          }
        ]
      },
      {
        id: 'code_review',
        title: 'Critical Code Review',
        description: 'A senior developer is reviewing your code and found some issues.',
        choices: [
          {
            id: 'accept_feedback',
            text: 'Accept feedback gracefully',
            effects: { smarts: 8, relationships: 5 }
          },
          {
            id: 'defend_code',
            text: 'Defend your coding decisions',
            effects: { relationships: -5, happiness: 3 }
          }
        ]
      }
    ];
  }

  private getHealthcareEvents(character: Character): any[] {
    return [
      {
        id: 'medical_emergency',
        title: 'Medical Emergency',
        description: 'A patient is having a medical emergency and needs immediate care.',
        choices: [
          {
            id: 'quick_response',
            text: 'Respond quickly and decisively',
            effects: { happiness: 10, relationships: 8, fame: 3 }
          },
          {
            id: 'call_doctor',
            text: 'Call for the doctor immediately',
            effects: { relationships: 5, happiness: 3 }
          }
        ]
      }
    ];
  }

  private getBusinessEvents(character: Character): any[] {
    return [
      {
        id: 'big_sale_opportunity',
        title: 'Major Sales Opportunity',
        description: 'You have a chance to close a very large deal with an important client.',
        choices: [
          {
            id: 'aggressive_pitch',
            text: 'Make an aggressive sales pitch',
            effects: { wealth: 20, happiness: 15, fame: 5 }
          },
          {
            id: 'conservative_approach',
            text: 'Take a conservative approach',
            effects: { wealth: 8, relationships: 10 }
          }
        ]
      }
    ];
  }

  private getEducationEvents(character: Character): any[] {
    return [
      {
        id: 'difficult_student',
        title: 'Challenging Student',
        description: 'You have a student who is disrupting class and struggling academically.',
        choices: [
          {
            id: 'extra_help',
            text: 'Offer extra help after school',
            effects: { happiness: 12, relationships: 15 }
          },
          {
            id: 'strict_discipline',
            text: 'Implement strict discipline',
            effects: { relationships: -5, happiness: 5 }
          }
        ]
      }
    ];
  }
}

export const careerSystem = new RealisticCareerSystem();