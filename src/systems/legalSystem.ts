
import { Character, LegalCase, CourtDate, LegalStatus } from '../types/game';

export interface LegalEvent {
  id: string;
  name: string;
  description: string;
  type: 'arrest' | 'lawsuit' | 'traffic_violation' | 'court_summons';
  severity: 'minor' | 'moderate' | 'severe';
  consequences: {
    fine?: number;
    prisonTime?: number;
    probation?: number;
    communityService?: number;
  };
  defenseOptions: DefenseOption[];
}

export interface DefenseOption {
  id: string;
  name: string;
  cost: number;
  successRate: number;
  description: string;
  type: 'self_defense' | 'public_defender' | 'private_lawyer' | 'plea_deal';
}

export const legalEvents: LegalEvent[] = [
  {
    id: 'speeding_ticket',
    name: 'Speeding Ticket',
    description: 'You were caught speeding and received a ticket.',
    type: 'traffic_violation',
    severity: 'minor',
    consequences: { fine: 150 },
    defenseOptions: [
      {
        id: 'pay_fine',
        name: 'Pay the Fine',
        cost: 150,
        successRate: 100,
        description: 'Just pay the fine and move on',
        type: 'self_defense'
      },
      {
        id: 'contest_court',
        name: 'Contest in Court',
        cost: 50,
        successRate: 30,
        description: 'Fight the ticket in court yourself',
        type: 'self_defense'
      },
      {
        id: 'hire_lawyer',
        name: 'Hire Traffic Lawyer',
        cost: 500,
        successRate: 70,
        description: 'Hire a specialist to fight the ticket',
        type: 'private_lawyer'
      }
    ]
  },
  {
    id: 'theft_charge',
    name: 'Theft Charges',
    description: 'You\'ve been accused of stealing something valuable.',
    type: 'arrest',
    severity: 'moderate',
    consequences: { fine: 2000, prisonTime: 6, probation: 12 },
    defenseOptions: [
      {
        id: 'public_defender',
        name: 'Public Defender',
        cost: 0,
        successRate: 40,
        description: 'Use a court-appointed lawyer',
        type: 'public_defender'
      },
      {
        id: 'private_defense',
        name: 'Private Criminal Lawyer',
        cost: 5000,
        successRate: 75,
        description: 'Hire an experienced criminal defense attorney',
        type: 'private_lawyer'
      },
      {
        id: 'plea_bargain',
        name: 'Plea Bargain',
        cost: 0,
        successRate: 80,
        description: 'Plead guilty for reduced sentence',
        type: 'plea_deal'
      }
    ]
  },
  {
    id: 'assault_charge',
    name: 'Assault Charges',
    description: 'You\'ve been charged with assault after a physical altercation.',
    type: 'arrest',
    severity: 'severe',
    consequences: { fine: 5000, prisonTime: 18, probation: 24 },
    defenseOptions: [
      {
        id: 'self_defense_claim',
        name: 'Claim Self-Defense',
        cost: 3000,
        successRate: 50,
        description: 'Argue it was self-defense',
        type: 'private_lawyer'
      },
      {
        id: 'top_lawyer',
        name: 'Elite Defense Attorney',
        cost: 15000,
        successRate: 85,
        description: 'Hire the best criminal defense lawyer',
        type: 'private_lawyer'
      },
      {
        id: 'public_defender_assault',
        name: 'Public Defender',
        cost: 0,
        successRate: 25,
        description: 'Use a court-appointed lawyer',
        type: 'public_defender'
      }
    ]
  }
];

export const generateRandomLegalEvent = (character: Character): LegalEvent | null => {
  // Higher chance if character has criminal record
  const baseChance = character.criminalRecord ? 0.15 : 0.05;
  
  if (Math.random() > baseChance) return null;
  
  // Filter events based on character's age and situation
  const availableEvents = legalEvents.filter(event => {
    if (character.age < 16 && event.type === 'traffic_violation') return false;
    return true;
  });
  
  return availableEvents[Math.floor(Math.random() * availableEvents.length)];
};

export const resolveLegalCase = (
  character: Character,
  legalEvent: LegalEvent,
  defenseChoice: DefenseOption
): { success: boolean; result: string; effects: any } => {
  const success = Math.random() < (defenseChoice.successRate / 100);
  
  const effects = {
    wealth: -defenseChoice.cost,
    happiness: success ? 10 : -20,
    reputation: success ? 5 : -15
  };
  
  let result = '';
  
  if (success) {
    result = `Case dismissed! Your ${defenseChoice.name} strategy worked.`;
    effects.happiness += 15;
  } else {
    result = `Found guilty. You must face the consequences.`;
    
    if (legalEvent.consequences.fine) {
      effects.wealth -= legalEvent.consequences.fine;
      result += ` Fine: $${legalEvent.consequences.fine}k.`;
    }
    
    if (legalEvent.consequences.prisonTime) {
      effects.prisonTime = legalEvent.consequences.prisonTime;
      result += ` Prison: ${legalEvent.consequences.prisonTime} months.`;
    }
    
    if (legalEvent.consequences.probation) {
      effects.probation = legalEvent.consequences.probation;
      result += ` Probation: ${legalEvent.consequences.probation} months.`;
    }
  }
  
  return { success, result, effects };
};

export const initializeLegalStatus = (): LegalStatus => {
  return {
    currentCases: [],
    prisonTime: 0,
    totalArrestsCount: 0,
    onProbation: false,
    probationMonths: 0,
    courtDates: []
  };
};
