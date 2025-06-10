
import { Character, FamilyMember, RelationshipType } from '../types/game';
import { generateRandomName } from '../utils/gameUtils';
import { PersonalityTraits } from '../types/core';

export interface ExtendedFamily {
  grandparents: FamilyMember[];
  auntsUncles: FamilyMember[];
  cousins: FamilyMember[];
  distantRelatives: FamilyMember[];
}

export interface RelationshipDynamics {
  loyaltyLevel: number; // 0-100
  trustLevel: number; // 0-100
  conflictHistory: ConflictRecord[];
  sharedExperiences: SharedExperience[];
  communicationStyle: 'frequent' | 'occasional' | 'rare' | 'estranged';
  emotionalIntelligence: number;
}

export interface ConflictRecord {
  id: string;
  type: 'argument' | 'betrayal' | 'misunderstanding' | 'competition';
  severity: 'minor' | 'moderate' | 'major' | 'severe';
  date: string;
  resolved: boolean;
  impact: number;
}

export interface SharedExperience {
  id: string;
  type: 'vacation' | 'celebration' | 'crisis' | 'achievement' | 'loss';
  description: string;
  date: string;
  bondingValue: number;
}

export interface MarriageProposal {
  id: string;
  fromId: string;
  toId: string;
  proposal: {
    location: string;
    style: 'romantic' | 'casual' | 'elaborate' | 'surprise';
    cost: number;
    ringValue: number;
  };
  acceptance: 'pending' | 'accepted' | 'rejected';
  timestamp: string;
}

export interface WeddingPlanning {
  budget: number;
  guestCount: number;
  venue: string;
  style: 'traditional' | 'modern' | 'destination' | 'elopement';
  preparations: WeddingPreparation[];
  stress: number;
}

export interface WeddingPreparation {
  task: string;
  completed: boolean;
  cost: number;
  stressImpact: number;
}

export interface DivorceProceedings {
  reason: 'incompatibility' | 'infidelity' | 'financial' | 'abuse' | 'growing_apart';
  children: string[];
  custodyArrangement: 'joint' | 'primary' | 'minimal' | 'none';
  assetDivision: number; // percentage kept
  alimony: number; // monthly amount
  duration: number; // months
  courtCosts: number;
}

export interface BestFriendSystem {
  bestFriendId: string | null;
  friendshipLevel: number;
  loyaltyTests: LoyaltyTest[];
  secretsShared: number;
  activitiesTogether: string[];
}

export interface LoyaltyTest {
  id: string;
  scenario: string;
  choice: string;
  loyaltyImpact: number;
  date: string;
}

export class DynamicRelationshipManager {
  private static instance: DynamicRelationshipManager;

  static getInstance(): DynamicRelationshipManager {
    if (!DynamicRelationshipManager.instance) {
      DynamicRelationshipManager.instance = new DynamicRelationshipManager();
    }
    return DynamicRelationshipManager.instance;
  }

  generateExtendedFamily(character: Character): ExtendedFamily {
    const extendedFamily: ExtendedFamily = {
      grandparents: [],
      auntsUncles: [],
      cousins: [],
      distantRelatives: []
    };

    // Generate grandparents
    for (let i = 0; i < 4; i++) {
      const grandparent: FamilyMember = {
        id: `grandparent_${i}`,
        name: generateRandomName(),
        relationship: 'grandparent',
        age: character.age + 45 + Math.floor(Math.random() * 20),
        alive: Math.random() > 0.3,
        health: 30 + Math.floor(Math.random() * 50),
        relationshipStats: {
          relationshipLevel: 60 + Math.floor(Math.random() * 30),
          trust: 70 + Math.floor(Math.random() * 30),
          communication: 60 + Math.floor(Math.random() * 30),
          intimacy: 0,
          conflictResolution: 50 + Math.floor(Math.random() * 30),
          sharedInterests: 40 + Math.floor(Math.random() * 40),
          timeSpentTogether: 10 + Math.floor(Math.random() * 20),
          respect: 80 + Math.floor(Math.random() * 20),
          lastInteraction: new Date().toISOString(),
          interactionHistory: []
        },
        relationshipQuality: 70 + Math.floor(Math.random() * 30),
        personality: {
          kindness: Math.floor(Math.random() * 100),
          loyalty: Math.floor(Math.random() * 100),
          intelligence: Math.floor(Math.random() * 100),
          humor: Math.floor(Math.random() * 100),
          ambition: Math.floor(Math.random() * 100),
          stability: Math.floor(Math.random() * 100),
          generosity: Math.floor(Math.random() * 100),
          openness: Math.floor(Math.random() * 100),
          extraversion: Math.floor(Math.random() * 100),
          creativity: Math.floor(Math.random() * 100),
          analytical: Math.floor(Math.random() * 100),
          adventurous: Math.floor(Math.random() * 100),
          cautious: Math.floor(Math.random() * 100),
          conscientiousness: Math.floor(Math.random() * 100),
          agreeableness: Math.floor(Math.random() * 100),
          neuroticism: Math.floor(Math.random() * 100),
          empathy: Math.floor(Math.random() * 100),
          resilience: Math.floor(Math.random() * 100),
          curiosity: Math.floor(Math.random() * 100)
        } as PersonalityTraits,
        currentMood: 'neutral'
      };
      extendedFamily.grandparents.push(grandparent);
    }

    // Generate aunts and uncles
    const numAuntsUncles = 2 + Math.floor(Math.random() * 6);
    for (let i = 0; i < numAuntsUncles; i++) {
      const auntUncle: FamilyMember = {
        id: `aunt_uncle_${i}`,
        name: generateRandomName(),
        relationship: Math.random() > 0.5 ? 'aunt' : 'uncle',
        age: character.age + 10 + Math.floor(Math.random() * 30),
        alive: Math.random() > 0.1,
        health: 50 + Math.floor(Math.random() * 50),
        job: this.generateRandomJob(),
        salary: 30 + Math.floor(Math.random() * 150),
        relationshipStats: {
          relationshipLevel: 40 + Math.floor(Math.random() * 40),
          trust: 50 + Math.floor(Math.random() * 40),
          communication: 45 + Math.floor(Math.random() * 40),
          intimacy: 0,
          conflictResolution: 40 + Math.floor(Math.random() * 40),
          sharedInterests: 30 + Math.floor(Math.random() * 50),
          timeSpentTogether: 5 + Math.floor(Math.random() * 15),
          respect: 60 + Math.floor(Math.random() * 40),
          lastInteraction: new Date().toISOString(),
          interactionHistory: []
        },
        relationshipQuality: 50 + Math.floor(Math.random() * 40),
        personality: {
          kindness: Math.floor(Math.random() * 100),
          loyalty: Math.floor(Math.random() * 100),
          intelligence: Math.floor(Math.random() * 100),
          humor: Math.floor(Math.random() * 100),
          ambition: Math.floor(Math.random() * 100),
          stability: Math.floor(Math.random() * 100),
          generosity: Math.floor(Math.random() * 100),
          openness: Math.floor(Math.random() * 100),
          extraversion: Math.floor(Math.random() * 100),
          creativity: Math.floor(Math.random() * 100),
          analytical: Math.floor(Math.random() * 100),
          adventurous: Math.floor(Math.random() * 100),
          cautious: Math.floor(Math.random() * 100),
          conscientiousness: Math.floor(Math.random() * 100),
          agreeableness: Math.floor(Math.random() * 100),
          neuroticism: Math.floor(Math.random() * 100),
          empathy: Math.floor(Math.random() * 100),
          resilience: Math.floor(Math.random() * 100),
          curiosity: Math.floor(Math.random() * 100)
        } as PersonalityTraits,
        currentMood: 'neutral'
      };
      extendedFamily.auntsUncles.push(auntUncle);
    }

    // Generate cousins
    const numCousins = 1 + Math.floor(Math.random() * 8);
    for (let i = 0; i < numCousins; i++) {
      const cousin: FamilyMember = {
        id: `cousin_${i}`,
        name: generateRandomName(),
        relationship: 'cousin',
        age: character.age + Math.floor(Math.random() * 20) - 10,
        alive: Math.random() > 0.05,
        health: 60 + Math.floor(Math.random() * 40),
        relationshipStats: {
          relationshipLevel: 30 + Math.floor(Math.random() * 50),
          trust: 40 + Math.floor(Math.random() * 50),
          communication: 35 + Math.floor(Math.random() * 50),
          intimacy: 0,
          conflictResolution: 30 + Math.floor(Math.random() * 50),
          sharedInterests: 25 + Math.floor(Math.random() * 60),
          timeSpentTogether: 5 + Math.floor(Math.random() * 10),
          respect: 50 + Math.floor(Math.random() * 50),
          lastInteraction: new Date().toISOString(),
          interactionHistory: []
        },
        relationshipQuality: 40 + Math.floor(Math.random() * 50),
        personality: {
          kindness: Math.floor(Math.random() * 100),
          loyalty: Math.floor(Math.random() * 100),
          intelligence: Math.floor(Math.random() * 100),
          humor: Math.floor(Math.random() * 100),
          ambition: Math.floor(Math.random() * 100),
          stability: Math.floor(Math.random() * 100),
          generosity: Math.floor(Math.random() * 100),
          openness: Math.floor(Math.random() * 100),
          extraversion: Math.floor(Math.random() * 100),
          creativity: Math.floor(Math.random() * 100),
          analytical: Math.floor(Math.random() * 100),
          adventurous: Math.floor(Math.random() * 100),
          cautious: Math.floor(Math.random() * 100),
          conscientiousness: Math.floor(Math.random() * 100),
          agreeableness: Math.floor(Math.random() * 100),
          neuroticism: Math.floor(Math.random() * 100),
          empathy: Math.floor(Math.random() * 100),
          resilience: Math.floor(Math.random() * 100),
          curiosity: Math.floor(Math.random() * 100)
        } as PersonalityTraits,
        currentMood: 'neutral'
      };
      extendedFamily.cousins.push(cousin);
    }

    return extendedFamily;
  }

  initiateMarriageProposal(character: Character, partnerId: string): MarriageProposal {
    const proposalStyles = [
      { style: 'romantic' as const, cost: 50, description: 'Candlelit dinner proposal' },
      { style: 'elaborate' as const, cost: 200, description: 'Flash mob proposal' },
      { style: 'casual' as const, cost: 10, description: 'Simple home proposal' },
      { style: 'surprise' as const, cost: 100, description: 'Surprise getaway proposal' }
    ];

    const selectedStyle = proposalStyles[Math.floor(Math.random() * proposalStyles.length)];

    return {
      id: `proposal_${Date.now()}`,
      fromId: character.id,
      toId: partnerId,
      proposal: {
        location: 'Beautiful location',
        style: selectedStyle.style,
        cost: selectedStyle.cost,
        ringValue: 20 + Math.floor(Math.random() * 180)
      },
      acceptance: 'pending',
      timestamp: new Date().toISOString()
    };
  }

  planWedding(character: Character, partnerId: string, budget: number): WeddingPlanning {
    const weddingStyles = ['traditional', 'modern', 'destination', 'elopement'] as const;
    const selectedStyle = weddingStyles[Math.floor(Math.random() * weddingStyles.length)];

    const preparations: WeddingPreparation[] = [
      { task: 'Book venue', completed: false, cost: budget * 0.3, stressImpact: 15 },
      { task: 'Choose catering', completed: false, cost: budget * 0.25, stressImpact: 10 },
      { task: 'Send invitations', completed: false, cost: budget * 0.05, stressImpact: 8 },
      { task: 'Wedding dress/suit', completed: false, cost: budget * 0.15, stressImpact: 12 },
      { task: 'Photography', completed: false, cost: budget * 0.1, stressImpact: 5 },
      { task: 'Music/DJ', completed: false, cost: budget * 0.1, stressImpact: 7 },
      { task: 'Flowers', completed: false, cost: budget * 0.05, stressImpact: 3 }
    ];

    return {
      budget,
      guestCount: 50 + Math.floor(Math.random() * 200),
      venue: 'Wedding venue',
      style: selectedStyle,
      preparations,
      stress: 0
    };
  }

  initiateDivorce(character: Character, spouseId: string, reason: DivorceProceedings['reason']): DivorceProceedings {
    const children = character.familyMembers
      .filter(member => member.relationship === 'child')
      .map(child => child.id);

    return {
      reason,
      children,
      custodyArrangement: 'joint',
      assetDivision: 50, // 50-50 split by default
      alimony: 0,
      duration: 6 + Math.floor(Math.random() * 18), // 6-24 months
      courtCosts: 5 + Math.floor(Math.random() * 45) // $5k-$50k
    };
  }

  generateRelationshipDynamics(): RelationshipDynamics {
    return {
      loyaltyLevel: 50 + Math.floor(Math.random() * 50),
      trustLevel: 50 + Math.floor(Math.random() * 50),
      conflictHistory: [],
      sharedExperiences: [],
      communicationStyle: ['frequent', 'occasional', 'rare'][Math.floor(Math.random() * 3)] as any,
      emotionalIntelligence: 30 + Math.floor(Math.random() * 70)
    };
  }

  private generateRandomJob(): string {
    const jobs = [
      'Teacher', 'Engineer', 'Doctor', 'Lawyer', 'Artist', 'Chef',
      'Mechanic', 'Nurse', 'Accountant', 'Designer', 'Writer', 'Salesperson'
    ];
    return jobs[Math.floor(Math.random() * jobs.length)];
  }
}

export const dynamicRelationshipManager = DynamicRelationshipManager.getInstance();
