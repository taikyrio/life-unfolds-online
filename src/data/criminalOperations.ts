

export interface CrimeOperation {
  id: string;
  name: string;
  description: string;
  minLevel: number;
  reward: number;
  risk: number;
}

export const crimeOperations: Record<string, CrimeOperation> = {
  pickpocket: {
    id: 'pickpocket',
    name: 'Pickpocket',
    description: 'Steal from unsuspecting victims',
    minLevel: 1,
    reward: 100,
    risk: 20
  },
  burglary: {
    id: 'burglary',
    name: 'Burglary',
    description: 'Break into homes',
    minLevel: 3,
    reward: 500,
    risk: 40
  }
};

export const cybercrimes: Record<string, CrimeOperation> = {
  hacking: {
    id: 'hacking',
    name: 'Hacking',
    description: 'Hack into computer systems',
    minLevel: 5,
    reward: 1000,
    risk: 30
  }
};

