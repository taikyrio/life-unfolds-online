import { Character } from '../types/character';
import { LifeEvent } from '../types/core';

interface ConsequenceChain {
  id: string;
  triggerEventId: string;
  triggerChoice: string;
  delay: number; // ages to wait
  consequenceEvent: LifeEvent;
  probability: number;
}

interface PersonalityEventModifier {
  personalityTrait: string;
  eventCategories: string[];
  probabilityMultiplier: number;
}

export class EnhancedLifeEventSystem {
  private consequenceChains: ConsequenceChain[] = [];
  private personalityModifiers: PersonalityEventModifier[] = [];
  private triggeredConsequences: Map<string, number> = new Map();

  constructor() {
    this.initializeConsequenceChains();
    this.initializePersonalityModifiers();
  }

  private initializeConsequenceChains() {
    this.consequenceChains = [
      {
        id: 'bullying_consequence',
        triggerEventId: 'school_bullying',
        triggerChoice: 'fight_back',
        delay: 2,
        probability: 0.7,
        consequenceEvent: {
          id: 'principal_meeting',
          title: 'Principal Meeting',
          description: 'Your past aggressive behavior has caught up with you. The principal wants to discuss your conduct.',
          age: 0,
          choices: [
            {
              id: 'apologize',
              text: 'Apologize sincerely',
              effects: { happiness: 5, relationships: 10 },
              consequences: []
            },
            {
              id: 'defend',
              text: 'Defend your actions',
              effects: { happiness: -5, relationships: -5 },
              consequences: ['detention']
            }
          ]
        }
      },
      {
        id: 'study_hard_consequence',
        triggerEventId: 'exam_preparation',
        triggerChoice: 'study_intensively',
        delay: 1,
        probability: 0.8,
        consequenceEvent: {
          id: 'academic_recognition',
          title: 'Academic Excellence',
          description: 'Your dedication to studying has paid off! You\'ve been recognized for academic achievement.',
          age: 0,
          choices: [
            {
              id: 'accept_honor',
              text: 'Accept the honor proudly',
              effects: { happiness: 15, smarts: 5, fame: 2 },
              consequences: []
            },
            {
              id: 'stay_humble',
              text: 'Stay humble about it',
              effects: { happiness: 10, relationships: 5 },
              consequences: []
            }
          ]
        }
      },
      {
        id: 'relationship_neglect',
        triggerEventId: 'family_dinner',
        triggerChoice: 'skip_dinner',
        delay: 3,
        probability: 0.6,
        consequenceEvent: {
          id: 'family_distance',
          title: 'Growing Distance',
          description: 'Your family has noticed you\'ve been distant. They seem hurt by your behavior.',
          age: 0,
          choices: [
            {
              id: 'reconcile',
              text: 'Make an effort to reconnect',
              effects: { relationships: 15, happiness: 10 },
              consequences: []
            },
            {
              id: 'continue_distance',
              text: 'Keep your distance',
              effects: { relationships: -10, happiness: -5 },
              consequences: ['family_conflict']
            }
          ]
        }
      }
    ];
  }

  private initializePersonalityModifiers() {
    this.personalityModifiers = [
      {
        personalityTrait: 'shy',
        eventCategories: ['social', 'party', 'dating'],
        probabilityMultiplier: 0.3
      },
      {
        personalityTrait: 'outgoing',
        eventCategories: ['social', 'leadership', 'performance'],
        probabilityMultiplier: 1.8
      },
      {
        personalityTrait: 'creative',
        eventCategories: ['artistic', 'innovation', 'self_expression'],
        probabilityMultiplier: 2.0
      },
      {
        personalityTrait: 'analytical',
        eventCategories: ['academic', 'problem_solving', 'strategy'],
        probabilityMultiplier: 1.5
      },
      {
        personalityTrait: 'adventurous',
        eventCategories: ['risk_taking', 'travel', 'extreme_sports'],
        probabilityMultiplier: 2.2
      },
      {
        personalityTrait: 'cautious',
        eventCategories: ['risk_taking', 'impulsive'],
        probabilityMultiplier: 0.2
      }
    ];
  }

  public processConsequences(character: Character, choiceHistory: any[]): LifeEvent[] {
    const pendingEvents: LifeEvent[] = [];

    for (const chain of this.consequenceChains) {
      const triggerChoice = choiceHistory.find(
        choice => choice.eventId === chain.triggerEventId && 
                 choice.choiceId === chain.triggerChoice &&
                 character.age - choice.age >= chain.delay
      );

      if (triggerChoice && !this.triggeredConsequences.has(chain.id)) {
        if (Math.random() < chain.probability) {
          const consequenceEvent = { ...chain.consequenceEvent };
          consequenceEvent.age = character.age;
          pendingEvents.push(consequenceEvent);
          this.triggeredConsequences.set(chain.id, character.age);
        }
      }
    }

    return pendingEvents;
  }

  public getPersonalityModifiedProbability(baseEvent: LifeEvent, character: Character): number {
    let probability = 1.0;

    // Get character's dominant personality traits
    const traits = this.extractPersonalityTraits(character);

    for (const trait of traits) {
      const modifier = this.personalityModifiers.find(m => m.personalityTrait === trait);
      if (modifier && baseEvent.category && modifier.eventCategories.includes(baseEvent.category)) {
        probability *= modifier.probabilityMultiplier;
      }
    }

    return Math.min(probability, 3.0); // Cap at 3x probability
  }

  private extractPersonalityTraits(character: Character): string[] {
    const traits: string[] = [];
    
    if (character.personalityTraits) {
      if (character.personalityTraits.extraversion < 30) traits.push('shy');
      if (character.personalityTraits.extraversion > 70) traits.push('outgoing');
      if (character.personalityTraits.creativity > 60) traits.push('creative');
      if (character.personalityTraits.analytical > 60) traits.push('analytical');
      if (character.personalityTraits.adventurous > 65) traits.push('adventurous');
      if (character.personalityTraits.cautious > 65) traits.push('cautious');
    }

    return traits;
  }

  public generateAgeAppropriateEvents(character: Character): LifeEvent[] {
    const age = character.age;
    const events: LifeEvent[] = [];

    // Early childhood (0-5)
    if (age <= 5) {
      events.push(...this.getEarlyChildhoodEvents());
    }
    // School age (6-18)
    else if (age <= 18) {
      events.push(...this.getSchoolAgeEvents(age));
    }
    // Young adult (19-30)
    else if (age <= 30) {
      events.push(...this.getYoungAdultEvents());
    }
    // Adult (31-60)
    else if (age <= 60) {
      events.push(...this.getAdultEvents());
    }
    // Senior (60+)
    else {
      events.push(...this.getSeniorEvents());
    }

    return events.filter(event => this.isEventAppropriate(event, character));
  }

  private getEarlyChildhoodEvents(): LifeEvent[] {
    return [
      {
        id: 'first_words',
        title: 'First Words',
        description: 'You spoke your first word today!',
        age: 1,
        category: 'milestone',
        choices: [
          {
            id: 'mama',
            text: 'Say "Mama"',
            effects: { happiness: 5, relationships: 10 },
            consequences: []
          },
          {
            id: 'dada',
            text: 'Say "Dada"',
            effects: { happiness: 5, relationships: 10 },
            consequences: []
          }
        ]
      },
      {
        id: 'playground_friend',
        title: 'Playground Friend',
        description: 'You met a potential friend at the playground.',
        age: 4,
        category: 'social',
        choices: [
          {
            id: 'play_together',
            text: 'Play together',
            effects: { happiness: 10, relationships: 15 },
            consequences: []
          },
          {
            id: 'stay_shy',
            text: 'Stay close to parent',
            effects: { happiness: 2, relationships: 5 },
            consequences: []
          }
        ]
      }
    ];
  }

  private getSchoolAgeEvents(age: number): LifeEvent[] {
    const events: LifeEvent[] = [
      {
        id: 'school_project',
        title: 'Group Project',
        description: 'You have been assigned a group project at school.',
        age: age,
        category: 'academic',
        choices: [
          {
            id: 'take_lead',
            text: 'Take the leadership role',
            effects: { smarts: 8, relationships: 5, happiness: 10 },
            consequences: []
          },
          {
            id: 'contribute_equally',
            text: 'Contribute your fair share',
            effects: { smarts: 5, relationships: 10 },
            consequences: []
          },
          {
            id: 'do_minimum',
            text: 'Do the bare minimum',
            effects: { happiness: 5, relationships: -10 },
            consequences: ['poor_reputation']
          }
        ]
      }
    ];

    if (age >= 13) {
      events.push({
        id: 'first_crush',
        title: 'First Crush',
        description: 'You have developed feelings for someone at school.',
        age: age,
        category: 'dating',
        choices: [
          {
            id: 'confess_feelings',
            text: 'Tell them how you feel',
            effects: { happiness: 15, relationships: 10 },
            consequences: []
          },
          {
            id: 'stay_silent',
            text: 'Keep it to yourself',
            effects: { happiness: -5 },
            consequences: []
          },
          {
            id: 'ask_friend_help',
            text: 'Ask a friend for advice',
            effects: { relationships: 5, happiness: 5 },
            consequences: []
          }
        ]
      });
    }

    return events;
  }

  private getYoungAdultEvents(): LifeEvent[] {
    return [
      {
        id: 'college_party',
        title: 'College Party',
        description: 'You\'ve been invited to a big college party.',
        age: 20,
        category: 'social',
        choices: [
          {
            id: 'party_hard',
            text: 'Party all night',
            effects: { happiness: 20, health: -10, relationships: 15 },
            consequences: ['hangover']
          },
          {
            id: 'moderate_fun',
            text: 'Have fun but stay responsible',
            effects: { happiness: 10, relationships: 10 },
            consequences: []
          },
          {
            id: 'skip_party',
            text: 'Skip the party to study',
            effects: { smarts: 10, happiness: -5 },
            consequences: []
          }
        ]
      },
      {
        id: 'job_interview',
        title: 'First Job Interview',
        description: 'You have your first real job interview.',
        age: 22,
        category: 'career',
        choices: [
          {
            id: 'confident',
            text: 'Be confident and assertive',
            effects: { happiness: 10, wealth: 5 },
            consequences: ['job_offer']
          },
          {
            id: 'nervous',
            text: 'Be honest about nervousness',
            effects: { happiness: 5, relationships: 5 },
            consequences: []
          },
          {
            id: 'overconfident',
            text: 'Be overly confident',
            effects: { happiness: -5, wealth: -2 },
            consequences: ['rejection']
          }
        ]
      }
    ];
  }

  private getAdultEvents(): LifeEvent[] {
    return [
      {
        id: 'career_crossroads',
        title: 'Career Crossroads',
        description: 'You have an opportunity to change career paths.',
        age: 35,
        category: 'career',
        choices: [
          {
            id: 'take_risk',
            text: 'Take the leap',
            effects: { happiness: 15, wealth: -10 },
            consequences: ['career_change']
          },
          {
            id: 'stay_safe',
            text: 'Stay in current position',
            effects: { wealth: 5, happiness: -5 },
            consequences: []
          }
        ]
      },
      {
        id: 'midlife_reflection',
        title: 'Midlife Reflection',
        description: 'You find yourself reflecting on your life choices.',
        age: 45,
        category: 'personal_growth',
        choices: [
          {
            id: 'make_changes',
            text: 'Make significant life changes',
            effects: { happiness: 20, relationships: 10 },
            consequences: []
          },
          {
            id: 'accept_life',
            text: 'Accept your life as it is',
            effects: { happiness: 5 },
            consequences: []
          }
        ]
      }
    ];
  }

  private getSeniorEvents(): LifeEvent[] {
    return [
      {
        id: 'grandchildren',
        title: 'Grandchildren Visit',
        description: 'Your grandchildren are visiting for the holidays.',
        age: 65,
        category: 'family',
        choices: [
          {
            id: 'spoil_them',
            text: 'Spoil them with gifts',
            effects: { happiness: 20, relationships: 15, wealth: -5 },
            consequences: []
          },
          {
            id: 'teach_wisdom',
            text: 'Share life wisdom',
            effects: { happiness: 15, relationships: 20 },
            consequences: []
          }
        ]
      },
      {
        id: 'retirement_planning',
        title: 'Retirement Planning',
        description: 'It\'s time to plan for your retirement.',
        age: 62,
        category: 'financial',
        choices: [
          {
            id: 'downsize',
            text: 'Downsize your lifestyle',
            effects: { wealth: 15, happiness: -5 },
            consequences: []
          },
          {
            id: 'stay_active',
            text: 'Stay active and working',
            effects: { health: 5, wealth: 10 },
            consequences: []
          }
        ]
      }
    ];
  }

  private isEventAppropriate(event: LifeEvent, character: Character): boolean {
    // Check age appropriateness
    if (Math.abs(event.age - character.age) > 3) return false;

    // Check relationship requirements
    if (event.requirements?.hasPartner && !character.partnerName) return false;
    if (event.requirements?.hasChildren && character.children.length === 0) return false;

    // Check education requirements
    if (event.requirements?.minEducation && 
        (!character.educationLevel || character.educationLevel < event.requirements.minEducation)) {
      return false;
    }

    return true;
  }
}

export const enhancedLifeEventSystem = new EnhancedLifeEventSystem();