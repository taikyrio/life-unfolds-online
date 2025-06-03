
import { Character } from '../types/game';
import { Country } from './countrySystem';

export interface GeographicRegion {
  id: string;
  name: string;
  countries: string[];
  characteristics: {
    climate: 'tropical' | 'temperate' | 'arctic' | 'desert' | 'mediterranean';
    economicLevel: 'developing' | 'emerging' | 'developed' | 'advanced';
    politicalStability: number; // 0-100
    culturalDiversity: number; // 0-100
  };
  regionalEvents: string[];
}

export interface EconomicSystem {
  globalGDP: number;
  inflationRate: number;
  unemployment: number;
  stockMarketIndex: number;
  exchangeRates: { [currency: string]: number };
  economicCycle: 'recession' | 'recovery' | 'expansion' | 'peak';
  majorEconomicEvents: EconomicEvent[];
}

export interface EconomicEvent {
  id: string;
  name: string;
  type: 'boom' | 'crash' | 'recession' | 'recovery' | 'bubble';
  impact: {
    global: boolean;
    affectedCountries: string[];
    duration: number; // months
    severity: 'minor' | 'moderate' | 'major' | 'severe';
  };
  effects: {
    unemployment: number;
    stockMarket: number;
    inflation: number;
    jobMarket: number;
  };
}

export interface NaturalDisaster {
  id: string;
  type: 'earthquake' | 'hurricane' | 'flood' | 'wildfire' | 'tornado' | 'volcano' | 'tsunami';
  location: {
    country: string;
    region: string;
    affectedArea: number; // square km
  };
  severity: 1 | 2 | 3 | 4 | 5; // disaster scale
  duration: number; // days
  casualties: number;
  economicDamage: number; // billions
  effects: DisasterEffects;
}

export interface DisasterEffects {
  populationDisplacement: number;
  infrastructureDamage: number;
  economicImpact: number;
  healthImpact: number;
  environmentalImpact: number;
}

export interface CulturalEvent {
  id: string;
  name: string;
  type: 'festival' | 'holiday' | 'sporting_event' | 'cultural_celebration' | 'religious_event';
  country: string;
  duration: number; // days
  popularity: number; // 0-100
  effects: {
    happiness: number;
    tourism: number;
    economy: number;
    culture: number;
  };
  participation: {
    required: boolean;
    cost: number;
    benefits: any;
  };
}

export interface PoliticalEvent {
  id: string;
  name: string;
  type: 'election' | 'revolution' | 'war' | 'treaty' | 'policy_change' | 'scandal';
  country: string;
  impact: 'local' | 'national' | 'regional' | 'global';
  effects: {
    stability: number;
    economy: number;
    freedom: number;
    safety: number;
  };
  duration: number; // months
}

export interface TechnologicalAdvancement {
  id: string;
  name: string;
  field: 'medical' | 'communication' | 'transportation' | 'energy' | 'space' | 'ai';
  impact: {
    healthCare: number;
    economy: number;
    lifestyle: number;
    jobMarket: number;
  };
  adoptionRate: number; // 0-100
  cost: number;
}

export interface WorldState {
  currentYear: number;
  globalTemperature: number;
  worldPopulation: number;
  technologicalLevel: number;
  environmentalHealth: number;
  globalPeaceIndex: number;
  activeConflicts: string[];
  majorPowers: string[];
  emergingEconomies: string[];
}

export class WorldBuildingManager {
  private static instance: WorldBuildingManager;
  private worldState: WorldState;
  private economicSystem: EconomicSystem;
  private activeEvents: {
    political: PoliticalEvent[];
    economic: EconomicEvent[];
    natural: NaturalDisaster[];
    cultural: CulturalEvent[];
    technological: TechnologicalAdvancement[];
  };

  static getInstance(): WorldBuildingManager {
    if (!WorldBuildingManager.instance) {
      WorldBuildingManager.instance = new WorldBuildingManager();
    }
    return WorldBuildingManager.instance;
  }

  constructor() {
    this.worldState = this.initializeWorldState();
    this.economicSystem = this.initializeEconomicSystem();
    this.activeEvents = {
      political: [],
      economic: [],
      natural: [],
      cultural: [],
      technological: []
    };
  }

  private initializeWorldState(): WorldState {
    return {
      currentYear: 2024,
      globalTemperature: 15.0, // Celsius
      worldPopulation: 8000000000,
      technologicalLevel: 75,
      environmentalHealth: 60,
      globalPeaceIndex: 65,
      activeConflicts: [],
      majorPowers: ['usa', 'china', 'russia', 'germany', 'japan'],
      emergingEconomies: ['india', 'brazil', 'mexico', 'vietnam', 'nigeria']
    };
  }

  private initializeEconomicSystem(): EconomicSystem {
    return {
      globalGDP: 100000000, // billions
      inflationRate: 3.2,
      unemployment: 5.8,
      stockMarketIndex: 3500,
      exchangeRates: {
        'USD': 1.0,
        'EUR': 0.85,
        'GBP': 0.75,
        'JPY': 110,
        'CNY': 7.2
      },
      economicCycle: 'expansion',
      majorEconomicEvents: []
    };
  }

  generateRandomEvent(character: Character): any {
    const eventTypes = ['political', 'economic', 'natural', 'cultural', 'technological'];
    const selectedType = eventTypes[Math.floor(Math.random() * eventTypes.length)];

    switch (selectedType) {
      case 'political':
        return this.generatePoliticalEvent();
      case 'economic':
        return this.generateEconomicEvent();
      case 'natural':
        return this.generateNaturalDisaster();
      case 'cultural':
        return this.generateCulturalEvent();
      case 'technological':
        return this.generateTechnologicalAdvancement();
      default:
        return null;
    }
  }

  private generatePoliticalEvent(): PoliticalEvent {
    const politicalEvents = [
      {
        name: 'Presidential Election',
        type: 'election' as const,
        effects: { stability: 10, economy: 5, freedom: 15, safety: 0 }
      },
      {
        name: 'Economic Policy Reform',
        type: 'policy_change' as const,
        effects: { stability: -5, economy: 20, freedom: -10, safety: 5 }
      },
      {
        name: 'International Trade Agreement',
        type: 'treaty' as const,
        effects: { stability: 15, economy: 25, freedom: 5, safety: 10 }
      },
      {
        name: 'Government Corruption Scandal',
        type: 'scandal' as const,
        effects: { stability: -25, economy: -15, freedom: -20, safety: -10 }
      }
    ];

    const event = politicalEvents[Math.floor(Math.random() * politicalEvents.length)];
    
    return {
      id: `political_${Date.now()}`,
      name: event.name,
      type: event.type,
      country: 'current', // Would be character's current country
      impact: 'national',
      effects: event.effects,
      duration: 3 + Math.floor(Math.random() * 12)
    };
  }

  private generateEconomicEvent(): EconomicEvent {
    const economicEvents = [
      {
        name: 'Stock Market Boom',
        type: 'boom' as const,
        effects: { unemployment: -2, stockMarket: 25, inflation: 1, jobMarket: 15 }
      },
      {
        name: 'Economic Recession',
        type: 'recession' as const,
        effects: { unemployment: 5, stockMarket: -30, inflation: -1, jobMarket: -20 }
      },
      {
        name: 'Tech Bubble Burst',
        type: 'crash' as const,
        effects: { unemployment: 3, stockMarket: -20, inflation: 0, jobMarket: -15 }
      },
      {
        name: 'Real Estate Boom',
        type: 'boom' as const,
        effects: { unemployment: -1, stockMarket: 15, inflation: 2, jobMarket: 10 }
      }
    ];

    const event = economicEvents[Math.floor(Math.random() * economicEvents.length)];
    
    return {
      id: `economic_${Date.now()}`,
      name: event.name,
      type: event.type,
      impact: {
        global: Math.random() > 0.5,
        affectedCountries: ['usa', 'germany', 'japan'], // Would be dynamic
        duration: 6 + Math.floor(Math.random() * 24),
        severity: ['minor', 'moderate', 'major'][Math.floor(Math.random() * 3)] as any
      },
      effects: event.effects
    };
  }

  private generateNaturalDisaster(): NaturalDisaster {
    const disasterTypes = ['earthquake', 'hurricane', 'flood', 'wildfire', 'tornado'] as const;
    const type = disasterTypes[Math.floor(Math.random() * disasterTypes.length)];
    
    return {
      id: `disaster_${Date.now()}`,
      type,
      location: {
        country: 'current',
        region: 'Local area',
        affectedArea: 100 + Math.floor(Math.random() * 10000)
      },
      severity: (1 + Math.floor(Math.random() * 5)) as 1 | 2 | 3 | 4 | 5,
      duration: 1 + Math.floor(Math.random() * 30),
      casualties: Math.floor(Math.random() * 10000),
      economicDamage: Math.floor(Math.random() * 100),
      effects: {
        populationDisplacement: Math.floor(Math.random() * 100000),
        infrastructureDamage: 10 + Math.floor(Math.random() * 90),
        economicImpact: 5 + Math.floor(Math.random() * 50),
        healthImpact: Math.floor(Math.random() * 30),
        environmentalImpact: Math.floor(Math.random() * 40)
      }
    };
  }

  private generateCulturalEvent(): CulturalEvent {
    const culturalEvents = [
      {
        name: 'Music Festival',
        type: 'festival' as const,
        effects: { happiness: 15, tourism: 20, economy: 10, culture: 25 }
      },
      {
        name: 'National Holiday',
        type: 'holiday' as const,
        effects: { happiness: 25, tourism: 5, economy: -5, culture: 30 }
      },
      {
        name: 'World Cup',
        type: 'sporting_event' as const,
        effects: { happiness: 30, tourism: 50, economy: 25, culture: 20 }
      },
      {
        name: 'Cultural Arts Exhibition',
        type: 'cultural_celebration' as const,
        effects: { happiness: 10, tourism: 15, economy: 8, culture: 35 }
      }
    ];

    const event = culturalEvents[Math.floor(Math.random() * culturalEvents.length)];
    
    return {
      id: `cultural_${Date.now()}`,
      name: event.name,
      type: event.type,
      country: 'current',
      duration: 1 + Math.floor(Math.random() * 14),
      popularity: 50 + Math.floor(Math.random() * 50),
      effects: event.effects,
      participation: {
        required: false,
        cost: Math.floor(Math.random() * 100),
        benefits: { happiness: 10, culture: 5 }
      }
    };
  }

  private generateTechnologicalAdvancement(): TechnologicalAdvancement {
    const techAdvances = [
      {
        name: 'New Medical Treatment',
        field: 'medical' as const,
        impact: { healthCare: 25, economy: 10, lifestyle: 15, jobMarket: 5 }
      },
      {
        name: 'Revolutionary Communication Tech',
        field: 'communication' as const,
        impact: { healthCare: 0, economy: 20, lifestyle: 30, jobMarket: 15 }
      },
      {
        name: 'Clean Energy Breakthrough',
        field: 'energy' as const,
        impact: { healthCare: 5, economy: 15, lifestyle: 20, jobMarket: 10 }
      },
      {
        name: 'AI Advancement',
        field: 'ai' as const,
        impact: { healthCare: 10, economy: 25, lifestyle: 25, jobMarket: -10 }
      }
    ];

    const tech = techAdvances[Math.floor(Math.random() * techAdvances.length)];
    
    return {
      id: `tech_${Date.now()}`,
      name: tech.name,
      field: tech.field,
      impact: tech.impact,
      adoptionRate: 10 + Math.floor(Math.random() * 40),
      cost: 50 + Math.floor(Math.random() * 500)
    };
  }

  updateWorldState(character: Character): void {
    // Update world based on time passage and events
    this.worldState.currentYear = Math.floor(character.age / 365) + 2024;
    
    // Environmental changes
    this.worldState.globalTemperature += 0.01; // Climate change
    this.worldState.environmentalHealth -= 0.1;
    
    // Population growth
    this.worldState.worldPopulation += 70000000; // Annual growth
    
    // Technology advancement
    this.worldState.technologicalLevel += 0.5;
    
    // Random world events
    if (Math.random() < 0.1) { // 10% chance per update
      const event = this.generateRandomEvent(character);
      if (event) {
        this.applyWorldEvent(event, character);
      }
    }
  }

  private applyWorldEvent(event: any, character: Character): void {
    // Apply event effects to character and world
    switch (event.type) {
      case 'economic':
        this.economicSystem.stockMarketIndex += event.effects.stockMarket;
        this.economicSystem.unemployment += event.effects.unemployment;
        break;
      case 'political':
        // Affect character's country stability
        break;
      case 'natural':
        // Affect character if in affected area
        if (Math.random() < 0.3) { // 30% chance of being affected
          character.health -= event.effects.healthImpact;
          character.wealth -= event.effects.economicImpact;
        }
        break;
    }
  }

  getWorldState(): WorldState {
    return { ...this.worldState };
  }

  getEconomicSystem(): EconomicSystem {
    return { ...this.economicSystem };
  }

  getActiveEvents() {
    return { ...this.activeEvents };
  }
}

export const worldBuildingManager = WorldBuildingManager.getInstance();

export const geographicRegions: GeographicRegion[] = [
  {
    id: 'north_america',
    name: 'North America',
    countries: ['usa', 'canada', 'mexico'],
    characteristics: {
      climate: 'temperate',
      economicLevel: 'advanced',
      politicalStability: 85,
      culturalDiversity: 90
    },
    regionalEvents: ['nafta_trade', 'border_policy', 'climate_summit']
  },
  {
    id: 'europe',
    name: 'Europe',
    countries: ['germany', 'france', 'uk', 'italy', 'spain', 'norway'],
    characteristics: {
      climate: 'temperate',
      economicLevel: 'advanced',
      politicalStability: 80,
      culturalDiversity: 85
    },
    regionalEvents: ['eu_summit', 'brexit_effects', 'migration_crisis']
  },
  {
    id: 'asia',
    name: 'Asia',
    countries: ['china', 'japan', 'india', 'south_korea', 'vietnam'],
    characteristics: {
      climate: 'varied',
      economicLevel: 'emerging',
      politicalStability: 70,
      culturalDiversity: 95
    },
    regionalEvents: ['trade_war', 'tech_advancement', 'demographic_shift']
  }
];
