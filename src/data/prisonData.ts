import { PrisonEvent, PrisonJob, PrisonInmate } from '../types/prison';

export const PRISON_FACILITIES = {
  county_jail: {
    id: 'county_jail',
    name: 'County Jail',
    securityLevel: 'minimum' as const,
    description: 'Local facility for minor offenses',
    maxSentence: 2
  },
  state_prison: {
    id: 'state_prison',
    name: 'State Prison',
    securityLevel: 'medium' as const,
    description: 'State facility for serious crimes',
    maxSentence: 20
  },
  federal_prison: {
    id: 'federal_prison',
    name: 'Federal Penitentiary',
    securityLevel: 'maximum' as const,
    description: 'High-security federal facility',
    maxSentence: 50
  }
};

export const PRISON_JOBS: PrisonJob[] = [
  {
    id: 'kitchen',
    name: 'Kitchen Worker',
    description: 'Prepare and serve meals',
    salary: 500,
    requirements: {},
    benefits: ['Extra food portions', 'Kitchen access']
  },
  {
    id: 'laundry',
    name: 'Laundry Worker',
    description: 'Wash and fold prison uniforms',
    salary: 400,
    requirements: {},
    benefits: ['Clean clothes access']
  },
  {
    id: 'library',
    name: 'Library Assistant',
    description: 'Help maintain prison library',
    salary: 300,
    requirements: { education: 'high_school' },
    benefits: ['Book access', 'Quiet work environment']
  },
  {
    id: 'maintenance',
    name: 'Maintenance Worker',
    description: 'General facility maintenance',
    salary: 600,
    requirements: { reputation: 20 },
    benefits: ['Tool access', 'Movement privileges']
  },
  {
    id: 'yard_duty',
    name: 'Yard Monitor',
    description: 'Supervise recreational activities',
    salary: 700,
    requirements: { reputation: 40 },
    benefits: ['Yard access', 'Respect from inmates']
  }
];

export const PRISON_EVENTS: PrisonEvent[] = [
  {
    id: 'cellmate_conflict',
    type: 'fight',
    description: 'Your cellmate is causing problems and threatening other inmates.',
    choices: [
      {
        id: 'stand_up',
        text: 'Stand up to them',
        effects: {
          reputation: 15,
          health: -20,
          disciplinaryActions: 1
        }
      },
      {
        id: 'ignore',
        text: 'Ignore the situation',
        effects: {
          reputation: -10,
          happiness: -5
        }
      },
      {
        id: 'report',
        text: 'Report to guards',
        effects: {
          reputation: -25,
          disciplinaryActions: -1,
          health: 10
        }
      }
    ]
  },
  {
    id: 'gang_recruitment',
    type: 'gang_recruitment',
    description: 'A prison gang is trying to recruit you for protection and status.',
    choices: [
      {
        id: 'join',
        text: 'Join the gang',
        effects: {
          reputation: 30,
          gangAffiliation: 'prison_gang',
          sentence: 2
        }
      },
      {
        id: 'decline',
        text: 'Politely decline',
        effects: {
          reputation: -5,
          health: -10
        }
      },
      {
        id: 'refuse',
        text: 'Refuse aggressively',
        effects: {
          reputation: 10,
          health: -30,
          death: Math.random() < 0.1
        }
      }
    ]
  },
  {
    id: 'contraband_offer',
    type: 'contraband',
    description: 'Another inmate offers to sell you contraband items.',
    choices: [
      {
        id: 'buy',
        text: 'Buy the contraband',
        effects: {
          reputation: 10,
          happiness: 15,
          disciplinaryActions: Math.random() < 0.3 ? 2 : 0
        }
      },
      {
        id: 'refuse',
        text: 'Refuse the offer',
        effects: {
          reputation: 5
        }
      },
      {
        id: 'report_guard',
        text: 'Report to guards',
        effects: {
          reputation: -20,
          disciplinaryActions: -1
        }
      }
    ]
  },
  {
    id: 'escape_plan',
    type: 'escape',
    description: 'A group of inmates has an escape plan and wants you to join.',
    choices: [
      {
        id: 'join_escape',
        text: 'Join the escape attempt',
        effects: {
          escape: Math.random() < 0.2,
          sentence: Math.random() < 0.8 ? 5 : 0,
          death: Math.random() < 0.15
        }
      },
      {
        id: 'decline_escape',
        text: 'Decline to participate',
        effects: {
          reputation: -5
        }
      },
      {
        id: 'report_escape',
        text: 'Report the plan',
        effects: {
          reputation: -30,
          sentence: -1,
          paroleChance: 20
        }
      }
    ]
  },
  {
    id: 'parole_hearing',
    type: 'parole_hearing',
    description: 'You have a parole hearing. How do you present yourself?',
    choices: [
      {
        id: 'remorseful',
        text: 'Show genuine remorse',
        effects: {
          paroleChance: 40
        }
      },
      {
        id: 'defiant',
        text: 'Remain defiant',
        effects: {
          paroleChance: -20,
          reputation: 10
        }
      },
      {
        id: 'neutral',
        text: 'Answer questions neutrally',
        effects: {
          paroleChance: 15
        }
      }
    ]
  }
];

export const generateRandomInmates = (): PrisonInmate[] => {
  const crimes = ['Murder', 'Armed Robbery', 'Drug Trafficking', 'Assault', 'Fraud', 'Burglary'];
  const names = ['Mike', 'Tony', 'Sal', 'Joey', 'Rico', 'Vince', 'Eddie', 'Frank'];
  
  return Array.from({ length: 3 }, (_, i) => ({
    id: `inmate_${i}`,
    name: names[Math.floor(Math.random() * names.length)],
    crime: crimes[Math.floor(Math.random() * crimes.length)],
    sentence: Math.floor(Math.random() * 20) + 1,
    dangerLevel: Math.floor(Math.random() * 100),
    relationship: Math.floor(Math.random() * 200) - 100,
    gangAffiliation: Math.random() < 0.3 ? 'prison_gang' : undefined
  }));
};

export const getCrimeToSentenceMapping = () => ({
  'pickpocket': { min: 0.5, max: 2, facility: 'county_jail' },
  'shoplift': { min: 0.5, max: 1, facility: 'county_jail' },
  'porch_pirate': { min: 0.5, max: 1, facility: 'county_jail' },
  'burglary': { min: 1, max: 5, facility: 'state_prison' },
  'grand_theft_auto': { min: 2, max: 7, facility: 'state_prison' },
  'extortion': { min: 3, max: 10, facility: 'state_prison' },
  'bank_robbery': { min: 10, max: 25, facility: 'federal_prison' },
  'train_robbery': { min: 8, max: 20, facility: 'federal_prison' },
  'murder': { min: 15, max: 50, facility: 'federal_prison' },
  'assault': { min: 1, max: 8, facility: 'state_prison' },
  'arson': { min: 5, max: 15, facility: 'state_prison' },
  'drug_trafficking': { min: 5, max: 20, facility: 'federal_prison' },
  'money_laundering': { min: 3, max: 12, facility: 'federal_prison' },
  'racketeering': { min: 10, max: 30, facility: 'federal_prison' }
});

export const getRandomPrisonEvent = (): PrisonEvent => {
  return PRISON_EVENTS[Math.floor(Math.random() * PRISON_EVENTS.length)];
};