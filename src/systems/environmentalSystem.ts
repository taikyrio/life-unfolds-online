
import { Character } from '../types/game';

export interface EnvironmentalEvent {
  id: string;
  name: string;
  description: string;
  type: 'natural_disaster' | 'climate_change' | 'pollution' | 'conservation';
  severity: 'minor' | 'moderate' | 'severe' | 'catastrophic';
  probability: number;
  affectedRegions: string[];
  effects: {
    health?: number;
    wealth?: number;
    happiness?: number;
    reputation?: number;
  };
  responses: EnvironmentalResponse[];
}

export interface EnvironmentalResponse {
  id: string;
  name: string;
  description: string;
  cost: number;
  effectiveness: number;
  effects: {
    health?: number;
    wealth?: number;
    happiness?: number;
    reputation?: number;
  };
}

export const environmentalEvents: EnvironmentalEvent[] = [
  {
    id: 'hurricane',
    name: 'Hurricane Warning',
    description: 'A major hurricane is approaching your area.',
    type: 'natural_disaster',
    severity: 'severe',
    probability: 0.05,
    affectedRegions: ['usa', 'caribbean'],
    effects: { health: -20, wealth: -50, happiness: -30 },
    responses: [
      {
        id: 'evacuate',
        name: 'Evacuate to Safety',
        description: 'Leave the area until the hurricane passes',
        cost: 20,
        effectiveness: 90,
        effects: { health: 15, happiness: -10 }
      },
      {
        id: 'shelter_in_place',
        name: 'Shelter in Place',
        description: 'Stay home and ride out the storm',
        cost: 5,
        effectiveness: 30,
        effects: { health: -10, happiness: -20 }
      },
      {
        id: 'help_others',
        name: 'Help Others Evacuate',
        description: 'Assist neighbors and community members',
        cost: 15,
        effectiveness: 60,
        effects: { reputation: 20, happiness: 10 }
      }
    ]
  },
  {
    id: 'heatwave',
    name: 'Extreme Heatwave',
    description: 'Record-breaking temperatures are affecting your region.',
    type: 'climate_change',
    severity: 'moderate',
    probability: 0.15,
    affectedRegions: ['global'],
    effects: { health: -10, happiness: -15 },
    responses: [
      {
        id: 'ac_upgrade',
        name: 'Upgrade Air Conditioning',
        description: 'Install better cooling systems',
        cost: 30,
        effectiveness: 80,
        effects: { health: 10, wealth: -30 }
      },
      {
        id: 'stay_hydrated',
        name: 'Stay Hydrated and Cool',
        description: 'Take basic precautions',
        cost: 5,
        effectiveness: 50,
        effects: { health: 5 }
      }
    ]
  },
  {
    id: 'forest_fire',
    name: 'Wildfire Threat',
    description: 'Wildfires are burning near your area.',
    type: 'natural_disaster',
    severity: 'severe',
    probability: 0.08,
    affectedRegions: ['usa', 'australia'],
    effects: { health: -25, wealth: -40, happiness: -25 },
    responses: [
      {
        id: 'firefighter_volunteer',
        name: 'Volunteer as Firefighter',
        description: 'Help fight the fires',
        cost: 0,
        effectiveness: 40,
        effects: { reputation: 30, health: -15 }
      },
      {
        id: 'relocate_temporary',
        name: 'Temporary Relocation',
        description: 'Move away until fires are contained',
        cost: 25,
        effectiveness: 85,
        effects: { health: 20, happiness: -10 }
      }
    ]
  }
];

export const generateEnvironmentalEvent = (
  character: Character,
  currentCountry: string
): EnvironmentalEvent | null => {
  const availableEvents = environmentalEvents.filter(event => 
    event.affectedRegions.includes(currentCountry) || 
    event.affectedRegions.includes('global')
  );
  
  for (const event of availableEvents) {
    if (Math.random() < event.probability) {
      return event;
    }
  }
  
  return null;
};

export const respondToEnvironmentalEvent = (
  character: Character,
  event: EnvironmentalEvent,
  response: EnvironmentalResponse
): { success: boolean; message: string; effects: any } => {
  if (character.wealth < response.cost) {
    return {
      success: false,
      message: `You can't afford this response. Cost: $${response.cost}k`,
      effects: {}
    };
  }
  
  const success = Math.random() < (response.effectiveness / 100);
  const effects = {
    wealth: -response.cost,
    ...response.effects
  };
  
  if (!success) {
    effects.health = (effects.health || 0) - 5;
    effects.happiness = (effects.happiness || 0) - 10;
  }
  
  return {
    success,
    message: success ? 
      `Your response to ${event.name} was effective!` : 
      `Your response to ${event.name} had limited success.`,
    effects
  };
};
