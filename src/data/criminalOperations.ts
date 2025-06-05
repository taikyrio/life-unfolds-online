
import { CrimeOperation, CybercrimeOperation } from '../types/activities';

export const crimeOperations: Record<string, CrimeOperation> = {
  pickpocket: { name: 'Pickpocket', reward: 3, arrestChance: 15, notorietyGain: 2 },
  burglary: { name: 'Burglary', reward: 30, arrestChance: 25, notorietyGain: 5 },
  bank_robbery: { name: 'Bank Robbery', reward: 300, arrestChance: 60, notorietyGain: 20 },
  extortion: { name: 'Extortion', reward: 60, arrestChance: 30, notorietyGain: 8 }
};

export const cybercrimes: Record<string, CybercrimeOperation> = {
  hack_bank: { 
    id: 'hack_bank',
    name: 'Bank Hacking',
    description: 'Hack into bank systems',
    difficulty: 8,
    risk: 7,
    reward: 500
  },
  identity_theft: { 
    id: 'identity_theft',
    name: 'Identity Theft',
    description: 'Steal personal information',
    difficulty: 5,
    risk: 4,
    reward: 100
  },
  ransomware: { 
    id: 'ransomware',
    name: 'Ransomware Attack',
    description: 'Deploy ransomware',
    difficulty: 9,
    risk: 9,
    reward: 1000
  },
  corporate_espionage: { 
    id: 'corporate_espionage',
    name: 'Corporate Espionage',
    description: 'Steal company secrets',
    difficulty: 7,
    risk: 6,
    reward: 300
  }
};
