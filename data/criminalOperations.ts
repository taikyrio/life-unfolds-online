
import { CrimeOperation, CybercrimeOperation } from '../types/activities';

export const crimeOperations: Record<string, CrimeOperation> = {
  pickpocket: { name: 'Pickpocket', minReward: 1, maxReward: 5, arrestChance: 15, notorietyGain: 2 },
  burglary: { name: 'Burglary', minReward: 10, maxReward: 50, arrestChance: 25, notorietyGain: 5 },
  bank_robbery: { name: 'Bank Robbery', minReward: 100, maxReward: 500, arrestChance: 60, notorietyGain: 20 },
  extortion: { name: 'Extortion', minReward: 20, maxReward: 100, arrestChance: 30, notorietyGain: 8 }
};

export const cybercrimes: Record<string, CybercrimeOperation> = {
  hack_bank: { name: 'Bank Hacking' },
  identity_theft: { name: 'Identity Theft' },
  ransomware: { name: 'Ransomware Attack' },
  corporate_espionage: { name: 'Corporate Espionage' }
};
