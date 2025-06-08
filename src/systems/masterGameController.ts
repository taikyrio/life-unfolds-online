import { Character } from '../types/character';
import { GameState } from '../types/gameState';
import { careerSystem } from './realisticCareerSystem';
import { financialEngine } from './financialRealismEngine';
import { healthSystem } from './comprehensiveHealthSystem';

interface YearlyReport {
  age: number;
  events: string[];
  careerEvents: string[];
  financialSummary: {
    income: number;
    expenses: number;
    netWorth: number;
    taxesPaid: number;
  };
  healthSummary: {
    score: number;
    recommendations: string[];
    newConditions: string[];
  };
  relationshipChanges: string[];
  majorMilestones: string[];
}

interface LifeGoal {
  id: string;
  title: string;
  description: string;
  category: 'career' | 'financial' | 'personal' | 'family' | 'health';
  requirements: any;
  reward: {
    happiness: number;
    fame: number;
    achievement: string;
  };
  completed: boolean;
}

export class MasterGameController {
  private activeGoals: LifeGoal[] = [];
  private completedGoals: LifeGoal[] = [];
  private lifePhase: 'childhood' | 'adolescence' | 'young_adult' | 'adult' | 'middle_age' | 'senior' = 'childhood';

  constructor() {
    this.initializeLifeGoals();
  }

  private initializeLifeGoals(): void {
    this.activeGoals = [
      {
        id: 'graduate_high_school',
        title: 'Graduate High School',
        description: 'Complete your high school education',
        category: 'personal',
        requirements: { age: 18, education: 'high_school' },
        reward: { happiness: 15, fame: 2, achievement: 'High School Graduate' },
        completed: false
      },
      {
        id: 'get_first_job',
        title: 'Get Your First Job',
        description: 'Land your first professional job',
        category: 'career',
        requirements: { job: true, salary: 25000 },
        reward: { happiness: 20, fame: 3, achievement: 'Career Started' },
        completed: false
      },
      {
        id: 'buy_first_house',
        title: 'Buy Your First House',
        description: 'Purchase your first home',
        category: 'financial',
        requirements: { netWorth: 50000, assets: 'real_estate' },
        reward: { happiness: 25, fame: 5, achievement: 'Homeowner' },
        completed: false
      },
      {
        id: 'reach_100k_net_worth',
        title: 'Reach $100K Net Worth',
        description: 'Accumulate a net worth of $100,000',
        category: 'financial',
        requirements: { netWorth: 100000 },
        reward: { happiness: 20, fame: 8, achievement: 'Six Figure Net Worth' },
        completed: false
      },
      {
        id: 'get_married',
        title: 'Get Married',
        description: 'Find someone special and get married',
        category: 'family',
        requirements: { relationship: 'spouse' },
        reward: { happiness: 30, fame: 3, achievement: 'Married' },
        completed: false
      },
      {
        id: 'have_children',
        title: 'Start a Family',
        description: 'Have your first child',
        category: 'family',
        requirements: { children: 1 },
        reward: { happiness: 25, fame: 2, achievement: 'Parent' },
        completed: false
      },
      {
        id: 'millionaire',
        title: 'Become a Millionaire',
        description: 'Achieve a net worth of $1,000,000',
        category: 'financial',
        requirements: { netWorth: 1000000 },
        reward: { happiness: 40, fame: 20, achievement: 'Millionaire' },
        completed: false
      },
      {
        id: 'retire_comfortably',
        title: 'Retire Comfortably',
        description: 'Retire with sufficient savings',
        category: 'financial',
        requirements: { age: 65, netWorth: 500000 },
        reward: { happiness: 35, fame: 10, achievement: 'Comfortable Retirement' },
        completed: false
      }
    ];
  }

  public processAnnualUpdate(gameState: GameState): {
    gameState: GameState;
    yearlyReport: YearlyReport;
    newEvents: any[];
  } {
    let updatedGameState = { ...gameState };
    const character = updatedGameState.character;
    const events: string[] = [];
    const newEvents: any[] = [];

    // Update life phase
    this.updateLifePhase(character);

    // Process career advancement
    const careerResults = careerSystem.processWorkYear(character);
    updatedGameState.character = careerResults.character;
    events.push(...careerResults.events);

    if (careerResults.promotionOffered) {
      newEvents.push(this.createPromotionEvent(character));
    }

    // Generate career-specific events
    const careerEvents = careerSystem.generateWorkEvents(character);
    newEvents.push(...careerEvents);

    // Process financial systems
    const financialResults = financialEngine.processYearlyFinances(updatedGameState.character);
    updatedGameState.character = financialResults.character;

    // Process health systems
    const healthResults = healthSystem.processAnnualHealthCheck(updatedGameState.character);
    updatedGameState.character = healthResults.character;

    // Generate health events
    const healthEvent = healthSystem.generateHealthEvent(updatedGameState.character);
    if (healthEvent) {
      newEvents.push(healthEvent);
    }

    // Check for goal completions
    const goalResults = this.checkGoalCompletions(updatedGameState.character);
    events.push(...goalResults.events);
    updatedGameState.character.happiness += goalResults.happinessBonus;
    updatedGameState.character.fame += goalResults.fameBonus;

    // Generate life phase appropriate events
    const phaseEvents = this.generateLifePhaseEvents(character);
    newEvents.push(...phaseEvents);

    // Create yearly report
    const yearlyReport: YearlyReport = {
      age: character.age,
      events,
      careerEvents: careerResults.events,
      financialSummary: {
        income: character.salary || 0,
        expenses: 0, // This would be calculated by financial system
        netWorth: financialResults.netWorth,
        taxesPaid: financialResults.taxesPaid
      },
      healthSummary: {
        score: healthResults.healthScore,
        recommendations: healthResults.recommendations,
        newConditions: [] // This would be filled by health system
      },
      relationshipChanges: [],
      majorMilestones: goalResults.newAchievements
    };

    return {
      gameState: updatedGameState,
      yearlyReport,
      newEvents
    };
  }

  private updateLifePhase(character: Character): void {
    const age = character.age;
    
    if (age < 13) {
      this.lifePhase = 'childhood';
    } else if (age < 18) {
      this.lifePhase = 'adolescence';
    } else if (age < 30) {
      this.lifePhase = 'young_adult';
    } else if (age < 50) {
      this.lifePhase = 'adult';
    } else if (age < 65) {
      this.lifePhase = 'middle_age';
    } else {
      this.lifePhase = 'senior';
    }
  }

  private createPromotionEvent(character: Character): any {
    return {
      id: 'promotion_offer',
      title: 'Promotion Opportunity',
      description: `You've been offered a promotion! Your hard work has paid off and management wants to advance your career.`,
      type: 'career_milestone',
      choices: [
        {
          id: 'accept_promotion',
          text: 'Accept the promotion',
          effects: { happiness: 15, fame: 5, wealth: 10000 }
        },
        {
          id: 'negotiate_terms',
          text: 'Negotiate better terms',
          effects: { happiness: 10, fame: 3, wealth: 15000 }
        },
        {
          id: 'decline_promotion',
          text: 'Decline the promotion',
          effects: { happiness: -5, relationships: -10 }
        }
      ]
    };
  }

  private checkGoalCompletions(character: Character): {
    events: string[];
    happinessBonus: number;
    fameBonus: number;
    newAchievements: string[];
  } {
    const events: string[] = [];
    const newAchievements: string[] = [];
    let happinessBonus = 0;
    let fameBonus = 0;

    for (const goal of this.activeGoals) {
      if (!goal.completed && this.isGoalCompleted(goal, character)) {
        goal.completed = true;
        this.completedGoals.push(goal);
        
        events.push(`🎉 Life Goal Completed: ${goal.title}!`);
        newAchievements.push(goal.reward.achievement);
        happinessBonus += goal.reward.happiness;
        fameBonus += goal.reward.fame;

        if (!character.achievements.includes(goal.reward.achievement)) {
          character.achievements.push(goal.reward.achievement);
        }
      }
    }

    // Remove completed goals from active list
    this.activeGoals = this.activeGoals.filter(goal => !goal.completed);

    return { events, happinessBonus, fameBonus, newAchievements };
  }

  private isGoalCompleted(goal: LifeGoal, character: Character): boolean {
    const req = goal.requirements;

    if (req.age && character.age < req.age) return false;
    if (req.education && character.educationLevel !== req.education) return false;
    if (req.job && !character.job) return false;
    if (req.salary && (character.salary || 0) < req.salary) return false;
    if (req.netWorth && character.wealth < req.netWorth) return false;
    if (req.children && character.children.length < req.children) return false;

    return true;
  }

  private generateLifePhaseEvents(character: Character): any[] {
    const events: any[] = [];

    switch (this.lifePhase) {
      case 'childhood':
        events.push(...this.getChildhoodEvents(character));
        break;
      case 'adolescence':
        events.push(...this.getAdolescenceEvents(character));
        break;
      case 'young_adult':
        events.push(...this.getYoungAdultEvents(character));
        break;
      case 'adult':
        events.push(...this.getAdultEvents(character));
        break;
      case 'middle_age':
        events.push(...this.getMiddleAgeEvents(character));
        break;
      case 'senior':
        events.push(...this.getSeniorEvents(character));
        break;
    }

    return events.filter(() => Math.random() < 0.3); // 30% chance for phase events
  }

  private getChildhoodEvents(character: Character): any[] {
    return [
      {
        id: 'learn_to_ride_bike',
        title: 'Learning to Ride a Bike',
        description: 'Your parents are teaching you how to ride a bicycle.',
        choices: [
          { id: 'practice_hard', text: 'Practice every day', effects: { happiness: 10, health: 5 } },
          { id: 'take_it_slow', text: 'Take it slow and steady', effects: { happiness: 5, health: 3 } }
        ]
      },
      {
        id: 'school_talent_show',
        title: 'School Talent Show',
        description: 'Your school is hosting a talent show. Do you want to participate?',
        choices: [
          { id: 'perform', text: 'Perform in the show', effects: { happiness: 15, fame: 3, relationships: 10 } },
          { id: 'watch', text: 'Just watch from the audience', effects: { happiness: 5 } }
        ]
      }
    ];
  }

  private getAdolescenceEvents(character: Character): any[] {
    return [
      {
        id: 'high_school_prom',
        title: 'High School Prom',
        description: 'Prom season is here! How do you want to approach this milestone?',
        choices: [
          { id: 'ask_crush', text: 'Ask your crush to prom', effects: { happiness: 20, relationships: 15 } },
          { id: 'go_with_friends', text: 'Go with a group of friends', effects: { happiness: 15, relationships: 10 } },
          { id: 'skip_prom', text: 'Skip prom entirely', effects: { happiness: -5, wealth: 200 } }
        ]
      },
      {
        id: 'part_time_job',
        title: 'First Part-Time Job',
        description: 'You have the opportunity to get your first part-time job.',
        choices: [
          { id: 'take_job', text: 'Take the job', effects: { wealth: 2000, happiness: 10, smarts: 5 } },
          { id: 'focus_studies', text: 'Focus on studies instead', effects: { smarts: 15, happiness: 5 } }
        ]
      }
    ];
  }

  private getYoungAdultEvents(character: Character): any[] {
    return [
      {
        id: 'college_graduation',
        title: 'College Graduation',
        description: 'You\'re graduating from college! Time to celebrate this major achievement.',
        choices: [
          { id: 'big_celebration', text: 'Throw a big graduation party', effects: { happiness: 25, relationships: 20, wealth: -500 } },
          { id: 'family_dinner', text: 'Have a quiet family dinner', effects: { happiness: 15, relationships: 15 } }
        ]
      },
      {
        id: 'first_apartment',
        title: 'First Apartment',
        description: 'Time to move out and get your first apartment!',
        choices: [
          { id: 'nice_apartment', text: 'Get a nice apartment', effects: { happiness: 20, wealth: -15000 } },
          { id: 'budget_apartment', text: 'Find a budget-friendly place', effects: { happiness: 10, wealth: -8000 } },
          { id: 'stay_home', text: 'Stay with parents longer', effects: { happiness: -5, wealth: 5000 } }
        ]
      }
    ];
  }

  private getAdultEvents(character: Character): any[] {
    return [
      {
        id: 'career_advancement',
        title: 'Career Crossroads',
        description: 'You have the opportunity to make a significant career change.',
        choices: [
          { id: 'take_risk', text: 'Take the career risk', effects: { happiness: 15, wealth: -5000 } },
          { id: 'play_safe', text: 'Stay in your current role', effects: { happiness: 5, wealth: 5000 } }
        ]
      },
      {
        id: 'home_purchase',
        title: 'Buying a Home',
        description: 'You\'re ready to buy your first home!',
        choices: [
          { id: 'buy_house', text: 'Purchase the house', effects: { happiness: 30, wealth: -50000 } },
          { id: 'keep_renting', text: 'Continue renting', effects: { wealth: 10000 } }
        ]
      }
    ];
  }

  private getMiddleAgeEvents(character: Character): any[] {
    return [
      {
        id: 'midlife_reflection',
        title: 'Midlife Reflection',
        description: 'You find yourself reflecting on your life achievements and future goals.',
        choices: [
          { id: 'make_changes', text: 'Make significant life changes', effects: { happiness: 20, relationships: 10 } },
          { id: 'stay_course', text: 'Stay the course', effects: { happiness: 5, wealth: 10000 } }
        ]
      },
      {
        id: 'empty_nest',
        title: 'Empty Nest',
        description: 'Your children have moved out. How do you adjust to this new phase?',
        choices: [
          { id: 'new_hobbies', text: 'Pursue new hobbies', effects: { happiness: 20, health: 10 } },
          { id: 'travel_more', text: 'Travel more frequently', effects: { happiness: 25, wealth: -10000 } }
        ]
      }
    ];
  }

  private getSeniorEvents(character: Character): any[] {
    return [
      {
        id: 'retirement_planning',
        title: 'Retirement Planning',
        description: 'It\'s time to seriously plan for retirement.',
        choices: [
          { id: 'retire_early', text: 'Retire early', effects: { happiness: 25, wealth: -20000 } },
          { id: 'work_longer', text: 'Work a few more years', effects: { wealth: 30000, health: -5 } }
        ]
      },
      {
        id: 'grandchildren',
        title: 'Grandchildren Visit',
        description: 'Your grandchildren are visiting for the summer!',
        choices: [
          { id: 'spoil_them', text: 'Spoil them with activities', effects: { happiness: 30, relationships: 25, wealth: -2000 } },
          { id: 'teach_them', text: 'Teach them life skills', effects: { happiness: 20, relationships: 20 } }
        ]
      }
    ];
  }

  public getActiveGoals(): LifeGoal[] {
    return this.activeGoals;
  }

  public getCompletedGoals(): LifeGoal[] {
    return this.completedGoals;
  }

  public getCurrentLifePhase(): string {
    return this.lifePhase;
  }

  public getLifePhaseMilestones(phase: string): string[] {
    const milestones = {
      childhood: ['Learn to walk', 'Start school', 'Make first friend'],
      adolescence: ['Graduate middle school', 'Get first crush', 'Learn to drive'],
      young_adult: ['Graduate high school', 'Start college', 'First job'],
      adult: ['Career establishment', 'Marriage', 'Home ownership'],
      middle_age: ['Peak earning years', 'Children leave home', 'Career leadership'],
      senior: ['Retirement', 'Grandparenthood', 'Legacy building']
    };

    return milestones[phase as keyof typeof milestones] || [];
  }
}

export const masterController = new MasterGameController();