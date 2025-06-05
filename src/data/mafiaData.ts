import { CrimeSyndicate, SyndicateHierarchy, CrimeOperation, ExtortionTarget, CrimeRank } from '../types/organizedCrime';

export const MAFIA_HIERARCHY: SyndicateHierarchy = {
  associate: {
    title: 'Associate',
    minLoyalty: 0,
    responsibilities: ['Basic crimes', 'Prove loyalty', 'Follow orders'],
    privileges: ['Family protection', 'Small territory access'],
    promotionRequirements: {
      timeInRank: 2,
      crimesCompleted: 5,
      earnings: 50000,
      loyalty: 60,
    }
  },
  soldier: {
    title: 'Soldier (Made Man)',
    minLoyalty: 60,
    responsibilities: ['Execute orders', 'Manage territory', 'Collect debts', 'Take the oath'],
    privileges: ['Cannot be killed without permission', 'Territory control', 'Commission crimes'],
    promotionRequirements: {
      timeInRank: 3,
      crimesCompleted: 15,
      earnings: 150000,
      loyalty: 75,
      specialTasks: ['murder_assignment']
    }
  },
  caporegime: {
    title: 'Caporegime (Captain)',
    minLoyalty: 75,
    responsibilities: ['Lead soldiers', 'Manage operations', 'Report to underboss'],
    privileges: ['Command soldiers', 'Large territory', 'High earnings'],
    promotionRequirements: {
      timeInRank: 5,
      crimesCompleted: 30,
      earnings: 500000,
      loyalty: 85,
    }
  },
  underboss: {
    title: 'Underboss',
    minLoyalty: 85,
    responsibilities: ['Second in command', 'Oversee operations', 'Advise boss'],
    privileges: ['Family second', 'Major decisions', 'High respect'],
    promotionRequirements: {
      timeInRank: 7,
      crimesCompleted: 50,
      earnings: 1000000,
      loyalty: 95,
    }
  },
  godfather: {
    title: 'Godfather (Boss)',
    minLoyalty: 95,
    responsibilities: ['Lead family', 'Make final decisions', 'Protect family honor'],
    privileges: ['Ultimate authority', 'No contributions required', 'Maximum respect'],
    promotionRequirements: {
      timeInRank: 0,
      crimesCompleted: 0,
      earnings: 0,
      loyalty: 100,
    }
  },
  chairman: {
    title: 'Chairman',
    minLoyalty: 95,
    responsibilities: ['Lead organization', 'Strategic decisions', 'Territory expansion'],
    privileges: ['Ultimate authority', 'International operations', 'Maximum earnings'],
    promotionRequirements: {
      timeInRank: 0,
      crimesCompleted: 0,
      earnings: 0,
      loyalty: 100,
    }
  },
  padrino: {
    title: 'Padrino/Padrina',
    minLoyalty: 95,
    responsibilities: ['Family leadership', 'Honor protection', 'Territory control'],
    privileges: ['Supreme authority', 'Cultural respect', 'Legacy building'],
    promotionRequirements: {
      timeInRank: 0,
      crimesCompleted: 0,
      earnings: 0,
      loyalty: 100,
    }
  }
};

export const CRIME_OPERATIONS: Record<string, CrimeOperation> = {
  bank_robbery: {
    id: 'bank_robbery',
    type: 'bank_robbery',
    name: 'Bank Robbery',
    description: 'Rob a bank for substantial cash',
    difficulty: 'extreme',
    requiredRank: 'soldier',
    minimumMembers: 3,
    basePayout: 250000,
    riskLevel: 95,
    notorietyGain: 40,
    successRate: 25,
    timeRequired: 8
  },
  burglary: {
    id: 'burglary',
    type: 'burglary',
    name: 'Burglary',
    description: 'Break into homes and businesses',
    difficulty: 'easy',
    requiredRank: 'associate',
    minimumMembers: 1,
    basePayout: 5000,
    riskLevel: 30,
    notorietyGain: 5,
    successRate: 70,
    timeRequired: 2
  },
  extortion: {
    id: 'extortion',
    type: 'extortion',
    name: 'Extortion',
    description: 'Force businesses to pay protection money',
    difficulty: 'medium',
    requiredRank: 'associate',
    minimumMembers: 1,
    basePayout: 15000,
    riskLevel: 40,
    notorietyGain: 15,
    successRate: 60,
    timeRequired: 4
  },
  grand_theft_auto: {
    id: 'grand_theft_auto',
    type: 'grand_theft_auto',
    name: 'Grand Theft Auto',
    description: 'Steal valuable vehicles',
    difficulty: 'medium',
    requiredRank: 'associate',
    minimumMembers: 1,
    basePayout: 25000,
    riskLevel: 50,
    notorietyGain: 20,
    successRate: 55,
    timeRequired: 3
  },
  train_robbery: {
    id: 'train_robbery',
    type: 'train_robbery',
    name: 'Train Robbery',
    description: 'Rob cargo trains for valuable goods',
    difficulty: 'hard',
    requiredRank: 'soldier',
    minimumMembers: 4,
    basePayout: 150000,
    riskLevel: 80,
    notorietyGain: 35,
    successRate: 35,
    timeRequired: 6
  },
  pickpocket: {
    id: 'pickpocket',
    type: 'pickpocket',
    name: 'Pickpocket',
    description: 'Steal from individuals on the street',
    difficulty: 'easy',
    requiredRank: 'associate',
    minimumMembers: 1,
    basePayout: 500,
    riskLevel: 20,
    notorietyGain: 2,
    successRate: 80,
    timeRequired: 1
  },
  porch_pirate: {
    id: 'porch_pirate',
    type: 'porch_pirate',
    name: 'Porch Pirate',
    description: 'Steal packages from doorsteps',
    difficulty: 'easy',
    requiredRank: 'associate',
    minimumMembers: 1,
    basePayout: 800,
    riskLevel: 15,
    notorietyGain: 3,
    successRate: 85,
    timeRequired: 1
  },
  shoplift: {
    id: 'shoplift',
    type: 'shoplift',
    name: 'Shoplift',
    description: 'Steal goods from retail stores',
    difficulty: 'easy',
    requiredRank: 'associate',
    minimumMembers: 1,
    basePayout: 300,
    riskLevel: 25,
    notorietyGain: 3,
    successRate: 75,
    timeRequired: 1
  },
  money_laundering: {
    id: 'money_laundering',
    type: 'money_laundering',
    name: 'Money Laundering',
    description: 'Clean dirty money through legitimate businesses',
    difficulty: 'hard',
    requiredRank: 'caporegime',
    minimumMembers: 2,
    basePayout: 100000,
    riskLevel: 60,
    notorietyGain: 10,
    successRate: 70,
    timeRequired: 24
  },
  racketeering: {
    id: 'racketeering',
    type: 'racketeering',
    name: 'Racketeering',
    description: 'Run illegal business operations',
    difficulty: 'hard',
    requiredRank: 'caporegime',
    minimumMembers: 3,
    basePayout: 200000,
    riskLevel: 65,
    notorietyGain: 25,
    successRate: 50,
    timeRequired: 168
  }
};

export const SYNDICATE_TYPES = {
  sicilian_mafia: {
    id: 'sicilian_mafia',
    name: 'Sicilian Mafia',
    type: 'sicilian_mafia' as const,
    region: 'Sicily, Italy',
    specialRules: ['Most notorious', 'Honor code', 'Family loyalty above all'],
    leaderTitle: 'Padrino',
    achievement: 'Made in Sicily'
  },
  italian_mafia: {
    id: 'italian_mafia',
    name: 'Italian-American Mafia',
    type: 'mafia' as const,
    region: 'United States',
    specialRules: ['Omerta code', 'Family structure', 'Territory control'],
    leaderTitle: 'Godfather',
    achievement: 'Family Business'
  },
  yakuza: {
    id: 'yakuza',
    name: 'Yakuza',
    type: 'yakuza' as const,
    region: 'Japan',
    specialRules: ['Honor and loyalty', 'Ritual traditions', 'Business operations'],
    leaderTitle: 'Chairman',
    achievement: 'Way of the Yakuza'
  },
  triad: {
    id: 'triad',
    name: 'Triad',
    type: 'triad' as const,
    region: 'China/Hong Kong',
    specialRules: ['Secret society', 'Brotherhood loyalty', 'Ancient traditions'],
    leaderTitle: 'Dragon Head',
    achievement: 'Dragon Rising'
  },
  irish_mob: {
    id: 'irish_mob',
    name: 'Irish Mob',
    type: 'irish_mob' as const,
    region: 'Ireland/Boston',
    specialRules: ['Family loyalty', 'Territorial wars', 'Political connections'],
    leaderTitle: 'Boss',
    achievement: 'Fighting Irish'
  },
  latin_mafia: {
    id: 'latin_mafia',
    name: 'Latin Mafia',
    type: 'latin_mafia' as const,
    region: 'Latin America',
    specialRules: ['Family honor', 'Drug trade', 'Territory expansion'],
    leaderTitle: 'Padrino/Padrina',
    achievement: 'El Jefe'
  }
};

export const EXTORTION_TARGETS: ExtortionTarget[] = [
  {
    id: 'restaurant_1',
    name: "Tony's Pizzeria",
    businessType: 'restaurant',
    wealth: 50000,
    compliance: 30,
    hasProtection: false,
    location: 'Little Italy'
  },
  {
    id: 'shop_1',
    name: 'Corner Convenience Store',
    businessType: 'retail',
    wealth: 25000,
    compliance: 60,
    hasProtection: false,
    location: 'Downtown'
  },
  {
    id: 'club_1',
    name: 'The Blue Note',
    businessType: 'nightclub',
    wealth: 150000,
    compliance: 10,
    hasProtection: true,
    location: 'Entertainment District'
  },
  {
    id: 'garage_1',
    name: 'Pete\'s Auto Repair',
    businessType: 'automotive',
    wealth: 75000,
    compliance: 45,
    hasProtection: false,
    location: 'Industrial Zone'
  },
  {
    id: 'market_1',
    name: 'Fresh Market',
    businessType: 'grocery',
    wealth: 80000,
    compliance: 70,
    hasProtection: false,
    location: 'Residential Area'
  }
];

export const getRandomExtortionTarget = (): ExtortionTarget => {
  const availableTargets = EXTORTION_TARGETS.filter(target => !target.hasProtection);
  return availableTargets[Math.floor(Math.random() * availableTargets.length)] || EXTORTION_TARGETS[0];
};

export const getCrimesForRank = (rank: CrimeRank): CrimeOperation[] => {
  const rankOrder: CrimeRank[] = ['associate', 'soldier', 'caporegime', 'underboss', 'godfather', 'chairman', 'padrino'];
  const currentRankIndex = rankOrder.indexOf(rank);
  
  return Object.values(CRIME_OPERATIONS).filter(crime => {
    const requiredRankIndex = rankOrder.indexOf(crime.requiredRank);
    return requiredRankIndex <= currentRankIndex;
  });
};