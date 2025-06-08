import { Character } from '../types/character';
import { GameState } from '../types/gameState';

interface Achievement {
  id: string;
  title: string;
  description: string;
  category: 'career' | 'financial' | 'social' | 'personal' | 'health' | 'family' | 'education' | 'legacy';
  difficulty: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';
  requirements: any;
  rewards: {
    happiness: number;
    fame: number;
    unlocks?: string[];
  };
  hidden: boolean;
  percentage: number; // How many players have this achievement
}

interface Challenge {
  id: string;
  title: string;
  description: string;
  type: 'speed_run' | 'restriction' | 'scenario' | 'hardcore';
  duration: 'single_life' | 'generational' | 'timed';
  rules: string[];
  rewards: Achievement[];
  active: boolean;
}

interface LifeStatistic {
  totalLifesLived: number;
  longestLife: number;
  richestLife: number;
  happiestLife: number;
  mostFamousLife: number;
  totalMoneyEarned: number;
  totalYearsWorked: number;
  relationshipsFormed: number;
  childrenHad: number;
  deathCauses: Record<string, number>;
  careersPursued: string[];
  countriesLived: string[];
}

export class AchievementEngine {
  private achievements: Achievement[] = [];
  private challenges: Challenge[] = [];
  private unlockedAchievements: Set<string> = new Set();
  private lifeStats: LifeStatistic;

  constructor() {
    this.initializeAchievements();
    this.initializeChallenges();
    this.lifeStats = this.initializeStats();
  }

  private initializeStats(): LifeStatistic {
    return {
      totalLifesLived: 0,
      longestLife: 0,
      richestLife: 0,
      happiestLife: 0,
      mostFamousLife: 0,
      totalMoneyEarned: 0,
      totalYearsWorked: 0,
      relationshipsFormed: 0,
      childrenHad: 0,
      deathCauses: {},
      careersPursued: [],
      countriesLived: []
    };
  }

  private initializeAchievements(): void {
    this.achievements = [
      // Career Achievements
      {
        id: 'first_job',
        title: 'Working Person',
        description: 'Get your first job',
        category: 'career',
        difficulty: 'common',
        requirements: { hasJob: true },
        rewards: { happiness: 5, fame: 1 },
        hidden: false,
        percentage: 89.2
      },
      {
        id: 'six_figure_salary',
        title: 'Six Figure Earner',
        description: 'Earn a salary of $100,000 or more',
        category: 'career',
        difficulty: 'uncommon',
        requirements: { salary: 100000 },
        rewards: { happiness: 15, fame: 5 },
        hidden: false,
        percentage: 23.4
      },
      {
        id: 'ceo_level',
        title: 'Executive Leadership',
        description: 'Reach the highest level in your career',
        category: 'career',
        difficulty: 'rare',
        requirements: { jobLevel: 5 },
        rewards: { happiness: 25, fame: 15 },
        hidden: false,
        percentage: 7.8
      },
      {
        id: 'workaholic',
        title: 'Workaholic',
        description: 'Work for 50 consecutive years',
        category: 'career',
        difficulty: 'epic',
        requirements: { yearsWorked: 50 },
        rewards: { happiness: 20, fame: 10 },
        hidden: false,
        percentage: 2.1
      },

      // Financial Achievements
      {
        id: 'first_thousand',
        title: 'Getting Started',
        description: 'Save your first $1,000',
        category: 'financial',
        difficulty: 'common',
        requirements: { wealth: 1000 },
        rewards: { happiness: 8, fame: 1 },
        hidden: false,
        percentage: 67.3
      },
      {
        id: 'hundred_k_net_worth',
        title: 'Six Figure Net Worth',
        description: 'Achieve a net worth of $100,000',
        category: 'financial',
        difficulty: 'uncommon',
        requirements: { netWorth: 100000 },
        rewards: { happiness: 20, fame: 8 },
        hidden: false,
        percentage: 31.2
      },
      {
        id: 'millionaire',
        title: 'Millionaire',
        description: 'Reach a net worth of $1,000,000',
        category: 'financial',
        difficulty: 'rare',
        requirements: { netWorth: 1000000 },
        rewards: { happiness: 35, fame: 25 },
        hidden: false,
        percentage: 8.9
      },
      {
        id: 'billionaire',
        title: 'Billionaire',
        description: 'Achieve a net worth of $1,000,000,000',
        category: 'financial',
        difficulty: 'legendary',
        requirements: { netWorth: 1000000000 },
        rewards: { happiness: 50, fame: 100, unlocks: ['billionaire_lifestyle'] },
        hidden: false,
        percentage: 0.3
      },

      // Social Achievements
      {
        id: 'popular_person',
        title: 'Social Butterfly',
        description: 'Maintain high relationships with 10+ people',
        category: 'social',
        difficulty: 'uncommon',
        requirements: { highRelationships: 10 },
        rewards: { happiness: 15, fame: 5 },
        hidden: false,
        percentage: 19.7
      },
      {
        id: 'famous_person',
        title: 'Celebrity',
        description: 'Achieve 80+ fame',
        category: 'social',
        difficulty: 'rare',
        requirements: { fame: 80 },
        rewards: { happiness: 25, fame: 20 },
        hidden: false,
        percentage: 4.2
      },

      // Personal Achievements
      {
        id: 'centenarian',
        title: 'Centenarian',
        description: 'Live to be 100 years old',
        category: 'personal',
        difficulty: 'epic',
        requirements: { age: 100 },
        rewards: { happiness: 40, fame: 30 },
        hidden: false,
        percentage: 1.8
      },
      {
        id: 'perfect_life',
        title: 'Perfect Life',
        description: 'Maintain 90+ in all stats for 10 years',
        category: 'personal',
        difficulty: 'legendary',
        requirements: { perfectStats: 10 },
        rewards: { happiness: 50, fame: 50, unlocks: ['perfect_life_mode'] },
        hidden: false,
        percentage: 0.1
      },

      // Health Achievements
      {
        id: 'fitness_enthusiast',
        title: 'Fitness Enthusiast',
        description: 'Maintain 90+ health for 20 years',
        category: 'health',
        difficulty: 'uncommon',
        requirements: { highHealth: 20 },
        rewards: { happiness: 20, fame: 5 },
        hidden: false,
        percentage: 14.6
      },
      {
        id: 'iron_constitution',
        title: 'Iron Constitution',
        description: 'Never get seriously ill',
        category: 'health',
        difficulty: 'rare',
        requirements: { noSeriousIllness: true },
        rewards: { happiness: 25, fame: 10 },
        hidden: false,
        percentage: 6.7
      },

      // Family Achievements
      {
        id: 'family_person',
        title: 'Family Person',
        description: 'Get married and have children',
        category: 'family',
        difficulty: 'common',
        requirements: { married: true, children: 1 },
        rewards: { happiness: 20, fame: 3 },
        hidden: false,
        percentage: 72.4
      },
      {
        id: 'big_family',
        title: 'Big Family',
        description: 'Have 5 or more children',
        category: 'family',
        difficulty: 'uncommon',
        requirements: { children: 5 },
        rewards: { happiness: 25, fame: 8 },
        hidden: false,
        percentage: 12.3
      },
      {
        id: 'family_dynasty',
        title: 'Family Dynasty',
        description: 'See your great-grandchildren',
        category: 'family',
        difficulty: 'epic',
        requirements: { greatGrandchildren: true },
        rewards: { happiness: 40, fame: 20 },
        hidden: false,
        percentage: 3.1
      },

      // Education Achievements
      {
        id: 'high_school_grad',
        title: 'High School Graduate',
        description: 'Graduate from high school',
        category: 'education',
        difficulty: 'common',
        requirements: { education: 'high_school' },
        rewards: { happiness: 10, fame: 2 },
        hidden: false,
        percentage: 85.7
      },
      {
        id: 'college_grad',
        title: 'College Graduate',
        description: 'Graduate from college',
        category: 'education',
        difficulty: 'uncommon',
        requirements: { education: 'bachelor' },
        rewards: { happiness: 20, fame: 8 },
        hidden: false,
        percentage: 41.2
      },
      {
        id: 'phd_holder',
        title: 'Doctor of Philosophy',
        description: 'Earn a PhD',
        category: 'education',
        difficulty: 'rare',
        requirements: { education: 'doctorate' },
        rewards: { happiness: 30, fame: 20 },
        hidden: false,
        percentage: 2.9
      },

      // Hidden/Secret Achievements
      {
        id: 'rags_to_riches',
        title: 'Rags to Riches',
        description: 'Go from poverty to wealth in one lifetime',
        category: 'financial',
        difficulty: 'epic',
        requirements: { startPoor: true, endRich: true },
        rewards: { happiness: 35, fame: 25 },
        hidden: true,
        percentage: 1.4
      },
      {
        id: 'phoenix_rising',
        title: 'Phoenix Rising',
        description: 'Recover from a major life setback to achieve success',
        category: 'personal',
        difficulty: 'rare',
        requirements: { majorSetback: true, laterSuccess: true },
        rewards: { happiness: 30, fame: 15 },
        hidden: true,
        percentage: 5.2
      },
      {
        id: 'time_traveler',
        title: 'Time Traveler',
        description: 'Play lives in multiple historical eras',
        category: 'legacy',
        difficulty: 'epic',
        requirements: { historicalEras: 3 },
        rewards: { happiness: 25, fame: 20, unlocks: ['historical_mode'] },
        hidden: true,
        percentage: 0.8
      }
    ];
  }

  private initializeChallenges(): void {
    this.challenges = [
      {
        id: 'poverty_challenge',
        title: 'Poverty Challenge',
        description: 'Live an entire life without exceeding $50,000 net worth',
        type: 'restriction',
        duration: 'single_life',
        rules: [
          'Never exceed $50,000 net worth',
          'Cannot own luxury items',
          'Must work low-paying jobs only'
        ],
        rewards: [
          {
            id: 'humble_life',
            title: 'Humble Life',
            description: 'Completed the Poverty Challenge',
            category: 'personal',
            difficulty: 'epic',
            requirements: {},
            rewards: { happiness: 40, fame: 15 },
            hidden: false,
            percentage: 2.3
          }
        ],
        active: false
      },
      {
        id: 'speed_run_millionaire',
        title: 'Millionaire Speed Run',
        description: 'Become a millionaire before age 30',
        type: 'speed_run',
        duration: 'single_life',
        rules: [
          'Must reach $1,000,000 net worth',
          'Must achieve this before age 30',
          'No inheritance allowed'
        ],
        rewards: [
          {
            id: 'young_millionaire',
            title: 'Young Millionaire',
            description: 'Became a millionaire before 30',
            category: 'financial',
            difficulty: 'legendary',
            requirements: {},
            rewards: { happiness: 50, fame: 40 },
            hidden: false,
            percentage: 0.7
          }
        ],
        active: false
      },
      {
        id: 'hermit_challenge',
        title: 'Hermit Challenge',
        description: 'Live a life with minimal social interactions',
        type: 'restriction',
        duration: 'single_life',
        rules: [
          'Keep relationships below 30',
          'Never marry',
          'Minimal social activities',
          'Focus on solitary pursuits'
        ],
        rewards: [
          {
            id: 'lone_wolf',
            title: 'Lone Wolf',
            description: 'Completed the Hermit Challenge',
            category: 'social',
            difficulty: 'rare',
            requirements: {},
            rewards: { happiness: 25, fame: 10 },
            hidden: false,
            percentage: 3.8
          }
        ],
        active: false
      },
      {
        id: 'perfect_health',
        title: 'Perfect Health Challenge',
        description: 'Maintain 95+ health throughout entire life',
        type: 'restriction',
        duration: 'single_life',
        rules: [
          'Never let health drop below 95',
          'No smoking or excessive drinking',
          'Regular exercise required',
          'Healthy diet mandatory'
        ],
        rewards: [
          {
            id: 'health_guru',
            title: 'Health Guru',
            description: 'Maintained perfect health for entire life',
            category: 'health',
            difficulty: 'legendary',
            requirements: {},
            rewards: { happiness: 50, fame: 25, unlocks: ['health_expert_mode'] },
            hidden: false,
            percentage: 0.2
          }
        ],
        active: false
      },
      {
        id: 'generational_wealth',
        title: 'Generational Wealth',
        description: 'Build wealth across 3 generations',
        type: 'scenario',
        duration: 'generational',
        rules: [
          'Each generation must be wealthier than the last',
          'Must pass down significant inheritance',
          'Family business preferred',
          'No major financial losses'
        ],
        rewards: [
          {
            id: 'dynasty_builder',
            title: 'Dynasty Builder',
            description: 'Built wealth across multiple generations',
            category: 'legacy',
            difficulty: 'legendary',
            requirements: {},
            rewards: { happiness: 60, fame: 50, unlocks: ['dynasty_mode'] },
            hidden: false,
            percentage: 0.1
          }
        ],
        active: false
      }
    ];
  }

  public checkAchievements(character: Character, gameState: GameState): {
    newAchievements: Achievement[];
    totalProgress: number;
  } {
    const newAchievements: Achievement[] = [];
    
    for (const achievement of this.achievements) {
      if (!this.unlockedAchievements.has(achievement.id)) {
        if (this.isAchievementUnlocked(achievement, character, gameState)) {
          newAchievements.push(achievement);
          this.unlockedAchievements.add(achievement.id);
        }
      }
    }

    const totalProgress = (this.unlockedAchievements.size / this.achievements.length) * 100;

    return { newAchievements, totalProgress };
  }

  private isAchievementUnlocked(achievement: Achievement, character: Character, gameState: GameState): boolean {
    const req = achievement.requirements;

    // Basic requirements
    if (req.age && character.age < req.age) return false;
    if (req.wealth && character.wealth < req.wealth) return false;
    if (req.netWorth && this.calculateNetWorth(character) < req.netWorth) return false;
    if (req.salary && (character.salary || 0) < req.salary) return false;
    if (req.fame && character.fame < req.fame) return false;
    if (req.hasJob && !character.job) return false;
    if (req.jobLevel && (character.jobLevel || 0) < req.jobLevel) return false;
    if (req.education && character.educationLevel !== req.education) return false;
    if (req.married && !character.partnerName) return false;
    if (req.children && character.children.length < req.children) return false;

    // Complex requirements would need additional tracking
    if (req.highRelationships) {
      const highRelCount = character.familyMembers?.filter(m => m.relationshipQuality && m.relationshipQuality > 70).length || 0;
      if (highRelCount < req.highRelationships) return false;
    }

    if (req.perfectStats) {
      // This would require tracking how long stats have been high
      // For now, just check current stats
      if (character.health < 90 || character.happiness < 90 || character.smarts < 90 || character.looks < 90) {
        return false;
      }
    }

    return true;
  }

  private calculateNetWorth(character: Character): number {
    let netWorth = character.wealth;
    
    if (character.assets) {
      netWorth += character.assets.reduce((sum, asset) => sum + asset.value, 0);
    }
    
    if (character.debts) {
      netWorth -= character.debts;
    }
    
    return netWorth;
  }

  public activateChallenge(challengeId: string): boolean {
    const challenge = this.challenges.find(c => c.id === challengeId);
    if (!challenge) return false;

    // Deactivate other challenges
    this.challenges.forEach(c => c.active = false);
    
    challenge.active = true;
    return true;
  }

  public getActiveChallenge(): Challenge | null {
    return this.challenges.find(c => c.active) || null;
  }

  public checkChallengeProgress(character: Character, gameState: GameState): {
    challengeCompleted: boolean;
    challengeFailed: boolean;
    progressUpdate: string;
  } {
    const activeChallenge = this.getActiveChallenge();
    if (!activeChallenge) {
      return { challengeCompleted: false, challengeFailed: false, progressUpdate: '' };
    }

    // Check challenge-specific conditions
    switch (activeChallenge.id) {
      case 'poverty_challenge':
        if (this.calculateNetWorth(character) > 50000) {
          return { challengeCompleted: false, challengeFailed: true, progressUpdate: 'Challenge failed: Net worth exceeded $50,000' };
        }
        if (character.age >= 80) {
          return { challengeCompleted: true, challengeFailed: false, progressUpdate: 'Challenge completed: Lived entire life under $50,000' };
        }
        break;

      case 'speed_run_millionaire':
        if (this.calculateNetWorth(character) >= 1000000) {
          if (character.age < 30) {
            return { challengeCompleted: true, challengeFailed: false, progressUpdate: 'Challenge completed: Became millionaire before 30!' };
          }
        }
        if (character.age >= 30) {
          return { challengeCompleted: false, challengeFailed: true, progressUpdate: 'Challenge failed: Did not reach millionaire status before 30' };
        }
        break;

      case 'hermit_challenge':
        const avgRelationship = character.relationships || 0;
        if (avgRelationship > 30 || character.partnerName) {
          return { challengeCompleted: false, challengeFailed: true, progressUpdate: 'Challenge failed: Formed too many social connections' };
        }
        if (character.age >= 80) {
          return { challengeCompleted: true, challengeFailed: false, progressUpdate: 'Challenge completed: Lived as a hermit' };
        }
        break;

      case 'perfect_health':
        if (character.health < 95) {
          return { challengeCompleted: false, challengeFailed: true, progressUpdate: 'Challenge failed: Health dropped below 95' };
        }
        if (character.age >= 80) {
          return { challengeCompleted: true, challengeFailed: false, progressUpdate: 'Challenge completed: Maintained perfect health' };
        }
        break;
    }

    return { challengeCompleted: false, challengeFailed: false, progressUpdate: `Challenge "${activeChallenge.title}" in progress` };
  }

  public updateLifeStats(character: Character, deathCause?: string): void {
    this.lifeStats.totalLifesLived++;
    this.lifeStats.longestLife = Math.max(this.lifeStats.longestLife, character.age);
    this.lifeStats.richestLife = Math.max(this.lifeStats.richestLife, this.calculateNetWorth(character));
    this.lifeStats.happiestLife = Math.max(this.lifeStats.happiestLife, character.happiness);
    this.lifeStats.mostFamousLife = Math.max(this.lifeStats.mostFamousLife, character.fame);
    
    if (character.salary) {
      this.lifeStats.totalMoneyEarned += character.salary * Math.max(1, character.age - 18);
    }
    
    if (character.job) {
      this.lifeStats.totalYearsWorked += Math.max(0, character.age - 18);
      if (!this.lifeStats.careersPursued.includes(character.job)) {
        this.lifeStats.careersPursued.push(character.job);
      }
    }

    this.lifeStats.relationshipsFormed += character.familyMembers?.length || 0;
    this.lifeStats.childrenHad += character.children.length;

    if (deathCause) {
      this.lifeStats.deathCauses[deathCause] = (this.lifeStats.deathCauses[deathCause] || 0) + 1;
    }

    if (character.currentCountry && !this.lifeStats.countriesLived.includes(character.currentCountry)) {
      this.lifeStats.countriesLived.push(character.currentCountry);
    }
  }

  public getAchievementsByCategory(category: string): Achievement[] {
    return this.achievements.filter(a => a.category === category);
  }

  public getUnlockedAchievements(): Achievement[] {
    return this.achievements.filter(a => this.unlockedAchievements.has(a.id));
  }

  public getAvailableChallenges(): Challenge[] {
    return this.challenges;
  }

  public getLifeStats(): LifeStatistic {
    return { ...this.lifeStats };
  }

  public generateAchievementEvent(newAchievements: Achievement[]): any | null {
    if (newAchievements.length === 0) return null;

    const achievement = newAchievements[0]; // Focus on first achievement
    
    return {
      id: `achievement_${achievement.id}`,
      title: '🏆 Achievement Unlocked!',
      description: `Congratulations! You've unlocked "${achievement.title}": ${achievement.description}`,
      type: 'achievement',
      achievement: achievement,
      choices: [
        {
          id: 'celebrate',
          text: 'Celebrate this milestone!',
          effects: { happiness: achievement.rewards.happiness, fame: achievement.rewards.fame }
        },
        {
          id: 'stay_humble',
          text: 'Stay humble and continue',
          effects: { happiness: Math.floor(achievement.rewards.happiness / 2) }
        }
      ]
    };
  }

  public getProgressTowardsGoals(character: Character): Array<{
    achievement: Achievement;
    progress: number;
    description: string;
  }> {
    const progress: Array<{ achievement: Achievement; progress: number; description: string; }> = [];

    for (const achievement of this.achievements) {
      if (this.unlockedAchievements.has(achievement.id)) continue;

      const progressInfo = this.calculateAchievementProgress(achievement, character);
      if (progressInfo.progress > 0) {
        progress.push({
          achievement,
          progress: progressInfo.progress,
          description: progressInfo.description
        });
      }
    }

    return progress.sort((a, b) => b.progress - a.progress);
  }

  private calculateAchievementProgress(achievement: Achievement, character: Character): {
    progress: number;
    description: string;
  } {
    const req = achievement.requirements;
    let progress = 0;
    let description = '';

    if (req.wealth) {
      progress = Math.min(100, (character.wealth / req.wealth) * 100);
      description = `$${character.wealth.toLocaleString()} / $${req.wealth.toLocaleString()}`;
    } else if (req.netWorth) {
      const netWorth = this.calculateNetWorth(character);
      progress = Math.min(100, (netWorth / req.netWorth) * 100);
      description = `$${netWorth.toLocaleString()} / $${req.netWorth.toLocaleString()}`;
    } else if (req.age) {
      progress = Math.min(100, (character.age / req.age) * 100);
      description = `Age ${character.age} / ${req.age}`;
    } else if (req.salary) {
      const salary = character.salary || 0;
      progress = Math.min(100, (salary / req.salary) * 100);
      description = `$${salary.toLocaleString()} / $${req.salary.toLocaleString()}`;
    } else if (req.children) {
      progress = Math.min(100, (character.children.length / req.children) * 100);
      description = `${character.children.length} / ${req.children} children`;
    }

    return { progress, description };
  }
}

export const achievementEngine = new AchievementEngine();