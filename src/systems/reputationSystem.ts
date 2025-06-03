
import { Character } from '../types/game';

export interface ReputationRecord {
  id: string;
  type: 'positive' | 'negative' | 'neutral';
  category: 'professional' | 'social' | 'criminal' | 'academic' | 'family' | 'public';
  title: string;
  description: string;
  impact: number; // -100 to +100
  date: Date;
  witnesses: number;
  mediaAttention: 'none' | 'local' | 'regional' | 'national' | 'international';
  decayRate: number; // how fast this reputation effect fades
}

export interface SocialCircle {
  id: string;
  name: string;
  type: 'family' | 'friends' | 'professional' | 'academic' | 'hobby' | 'online';
  members: string[];
  reputation: number; // your reputation within this circle
  influence: number; // how much this circle affects your overall reputation
}

export interface PublicProfile {
  fame: number;
  infamy: number;
  socialMediaFollowers: number;
  mediaAppearances: number;
  publicScandals: number;
  achievements: string[];
  endorsements: string[];
}

export interface ReputationModifier {
  source: string;
  type: 'temporary' | 'permanent' | 'decay';
  value: number;
  duration?: number; // days for temporary modifiers
  category: ReputationRecord['category'];
}

export class ReputationManager {
  private static instance: ReputationManager;
  private reputationHistory: ReputationRecord[] = [];
  private socialCircles: Map<string, SocialCircle> = new Map();
  private publicProfile: PublicProfile;
  private activeModifiers: ReputationModifier[] = [];

  static getInstance(): ReputationManager {
    if (!ReputationManager.instance) {
      ReputationManager.instance = new ReputationManager();
    }
    return ReputationManager.instance;
  }

  constructor() {
    this.publicProfile = {
      fame: 0,
      infamy: 0,
      socialMediaFollowers: 0,
      mediaAppearances: 0,
      publicScandals: 0,
      achievements: [],
      endorsements: []
    };
    this.initializeBasicSocialCircles();
  }

  private initializeBasicSocialCircles(): void {
    const basicCircles: SocialCircle[] = [
      {
        id: 'family',
        name: 'Family',
        type: 'family',
        members: [],
        reputation: 50,
        influence: 30
      },
      {
        id: 'friends',
        name: 'Friends',
        type: 'friends',
        members: [],
        reputation: 50,
        influence: 25
      },
      {
        id: 'work',
        name: 'Professional Network',
        type: 'professional',
        members: [],
        reputation: 50,
        influence: 35
      },
      {
        id: 'public',
        name: 'General Public',
        type: 'online',
        members: [],
        reputation: 50,
        influence: 10
      }
    ];

    basicCircles.forEach(circle => {
      this.socialCircles.set(circle.id, circle);
    });
  }

  addReputationEvent(event: Omit<ReputationRecord, 'id' | 'date'>): void {
    const reputationEvent: ReputationRecord = {
      ...event,
      id: `rep_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      date: new Date()
    };

    this.reputationHistory.push(reputationEvent);
    this.processReputationImpact(reputationEvent);
    this.updatePublicProfile(reputationEvent);
  }

  private processReputationImpact(event: ReputationRecord): void {
    // Apply reputation changes to relevant social circles
    const relevantCircles = this.getRelevantSocialCircles(event.category);
    
    relevantCircles.forEach(circle => {
      const impactMultiplier = this.calculateImpactMultiplier(event, circle);
      const reputationChange = event.impact * impactMultiplier;
      
      circle.reputation = Math.max(0, Math.min(100, circle.reputation + reputationChange));
    });

    // Create reputation modifier for ongoing effects
    if (event.impact !== 0) {
      const modifier: ReputationModifier = {
        source: event.title,
        type: event.decayRate > 0 ? 'decay' : 'permanent',
        value: event.impact,
        duration: event.decayRate > 0 ? Math.round(Math.abs(event.impact) / event.decayRate) : undefined,
        category: event.category
      };
      
      this.activeModifiers.push(modifier);
    }
  }

  private getRelevantSocialCircles(category: ReputationRecord['category']): SocialCircle[] {
    const relevantCircleTypes: { [key in ReputationRecord['category']]: string[] } = {
      professional: ['professional', 'friends'],
      social: ['friends', 'family'],
      criminal: ['friends', 'family', 'professional'],
      academic: ['professional', 'friends'],
      family: ['family'],
      public: ['friends', 'professional', 'online']
    };

    const circleTypes = relevantCircleTypes[category] || [];
    return Array.from(this.socialCircles.values()).filter(circle => 
      circleTypes.includes(circle.type)
    );
  }

  private calculateImpactMultiplier(event: ReputationRecord, circle: SocialCircle): number {
    let multiplier = 1;

    // Media attention increases impact
    const mediaMultipliers = {
      'none': 1,
      'local': 1.2,
      'regional': 1.5,
      'national': 2,
      'international': 3
    };
    multiplier *= mediaMultipliers[event.mediaAttention];

    // Number of witnesses affects credibility
    if (event.witnesses > 10) multiplier *= 1.3;
    else if (event.witnesses > 50) multiplier *= 1.6;
    else if (event.witnesses > 100) multiplier *= 2;

    // Circle influence affects how much they care
    multiplier *= (circle.influence / 100) + 0.5;

    return multiplier;
  }

  private updatePublicProfile(event: ReputationRecord): void {
    if (event.type === 'positive') {
      this.publicProfile.fame += Math.max(0, event.impact / 10);
    } else if (event.type === 'negative') {
      this.publicProfile.infamy += Math.max(0, Math.abs(event.impact) / 10);
    }

    // Media attention affects public profile
    if (event.mediaAttention !== 'none') {
      this.publicProfile.mediaAppearances++;
      
      if (event.type === 'negative') {
        this.publicProfile.publicScandals++;
      }
    }

    // Social media effects
    const socialMediaGrowth = this.calculateSocialMediaGrowth(event);
    this.publicProfile.socialMediaFollowers = Math.max(0, 
      this.publicProfile.socialMediaFollowers + socialMediaGrowth);
  }

  private calculateSocialMediaGrowth(event: ReputationRecord): number {
    let growth = 0;
    
    // Base growth from event impact
    growth = event.impact * 10;
    
    // Media attention multiplier
    const mediaMultipliers = {
      'none': 0.1,
      'local': 0.5,
      'regional': 1,
      'national': 2,
      'international': 5
    };
    growth *= mediaMultipliers[event.mediaAttention];

    // Viral potential for controversial events
    if (Math.abs(event.impact) > 50) {
      growth *= 2;
    }

    return Math.round(growth);
  }

  calculateOverallReputation(): number {
    let weightedReputation = 0;
    let totalInfluence = 0;

    for (const circle of this.socialCircles.values()) {
      weightedReputation += circle.reputation * circle.influence;
      totalInfluence += circle.influence;
    }

    if (totalInfluence === 0) return 50;

    const baseReputation = weightedReputation / totalInfluence;
    
    // Apply active modifiers
    let modifierSum = 0;
    this.activeModifiers.forEach(modifier => {
      modifierSum += modifier.value;
    });

    return Math.max(0, Math.min(100, baseReputation + (modifierSum / 10)));
  }

  getReputationInCircle(circleId: string): number {
    const circle = this.socialCircles.get(circleId);
    return circle ? circle.reputation : 50;
  }

  joinSocialCircle(circleData: Partial<SocialCircle>): void {
    const circle: SocialCircle = {
      id: circleData.id || `circle_${Date.now()}`,
      name: circleData.name || 'New Circle',
      type: circleData.type || 'hobby',
      members: circleData.members || [],
      reputation: 50,
      influence: circleData.influence || 10
    };

    this.socialCircles.set(circle.id, circle);
  }

  processTimeDecay(): void {
    // Process reputation decay
    this.activeModifiers = this.activeModifiers.filter(modifier => {
      if (modifier.type === 'decay' && modifier.duration) {
        modifier.duration--;
        modifier.value *= 0.95; // Decay by 5% each day
        return modifier.duration > 0 && Math.abs(modifier.value) > 0.1;
      }
      return modifier.type !== 'temporary';
    });

    // Process historical event decay
    this.reputationHistory.forEach(event => {
      if (event.decayRate > 0) {
        event.impact *= (1 - event.decayRate);
      }
    });

    // Remove events with negligible impact
    this.reputationHistory = this.reputationHistory.filter(event => 
      Math.abs(event.impact) > 0.1
    );
  }

  getReputationSummary(): {
    overall: number;
    byCircle: { [circleId: string]: number };
    publicProfile: PublicProfile;
    recentEvents: ReputationRecord[];
  } {
    const byCircle: { [circleId: string]: number } = {};
    for (const [id, circle] of this.socialCircles) {
      byCircle[id] = circle.reputation;
    }

    return {
      overall: this.calculateOverallReputation(),
      byCircle,
      publicProfile: { ...this.publicProfile },
      recentEvents: this.reputationHistory
        .slice(-10)
        .sort((a, b) => b.date.getTime() - a.date.getTime())
    };
  }

  // Predefined reputation events for common scenarios
  recordJobPromotion(jobTitle: string): void {
    this.addReputationEvent({
      type: 'positive',
      category: 'professional',
      title: 'Job Promotion',
      description: `Promoted to ${jobTitle}`,
      impact: 15,
      witnesses: 20,
      mediaAttention: 'none',
      decayRate: 0
    });
  }

  recordCriminalActivity(crimeType: string, severity: 'minor' | 'major' | 'felony'): void {
    const impacts = { minor: -10, major: -25, felony: -50 };
    const mediaLevels = { minor: 'none', major: 'local', felony: 'regional' } as const;
    
    this.addReputationEvent({
      type: 'negative',
      category: 'criminal',
      title: 'Criminal Activity',
      description: `Involved in ${crimeType}`,
      impact: impacts[severity],
      witnesses: severity === 'felony' ? 100 : 10,
      mediaAttention: mediaLevels[severity],
      decayRate: 0.01
    });
  }

  recordCharityWork(cause: string, impact: number): void {
    this.addReputationEvent({
      type: 'positive',
      category: 'social',
      title: 'Charity Work',
      description: `Volunteered for ${cause}`,
      impact: impact,
      witnesses: 50,
      mediaAttention: impact > 30 ? 'local' : 'none',
      decayRate: 0.005
    });
  }
}

export const reputationManager = ReputationManager.getInstance();
