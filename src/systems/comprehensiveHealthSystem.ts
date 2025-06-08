import { Character } from '../types/character';

interface HealthCondition {
  id: string;
  name: string;
  severity: 'mild' | 'moderate' | 'severe';
  chronic: boolean;
  symptoms: string[];
  treatments: Treatment[];
  impact: {
    happiness: number;
    activity: number;
    lifeExpectancy: number;
  };
}

interface Treatment {
  id: string;
  name: string;
  type: 'medication' | 'therapy' | 'surgery' | 'lifestyle';
  cost: number;
  effectiveness: number;
  sideEffects?: string[];
}

interface MentalHealthState {
  depression: number;
  anxiety: number;
  stress: number;
  selfEsteem: number;
  resilience: number;
}

interface LifestyleFactor {
  exercise: number; // 0-100
  diet: number; // 0-100
  sleep: number; // 0-100
  smoking: boolean;
  drinking: number; // 0-100
  socialConnection: number; // 0-100
}

interface HealthEvent {
  id: string;
  title: string;
  description: string;
  type: 'illness' | 'injury' | 'mental_health' | 'checkup' | 'emergency';
  severity: 'minor' | 'moderate' | 'serious' | 'critical';
  probability: number;
  ageRange: [number, number];
  lifestyle_triggers?: string[];
}

export class ComprehensiveHealthSystem {
  private healthConditions: HealthCondition[] = [];
  private mentalHealthEvents: HealthEvent[] = [];
  private physicalHealthEvents: HealthEvent[] = [];
  private lifestyleImpacts: Record<string, number> = {};

  constructor() {
    this.initializeHealthConditions();
    this.initializeHealthEvents();
  }

  private initializeHealthConditions(): void {
    this.healthConditions = [
      {
        id: 'common_cold',
        name: 'Common Cold',
        severity: 'mild',
        chronic: false,
        symptoms: ['runny nose', 'cough', 'fatigue'],
        treatments: [
          { id: 'rest', name: 'Rest and fluids', type: 'lifestyle', cost: 0, effectiveness: 70 },
          { id: 'otc_meds', name: 'Over-the-counter medication', type: 'medication', cost: 20, effectiveness: 80 }
        ],
        impact: { happiness: -5, activity: -10, lifeExpectancy: 0 }
      },
      {
        id: 'diabetes_t2',
        name: 'Type 2 Diabetes',
        severity: 'moderate',
        chronic: true,
        symptoms: ['increased thirst', 'frequent urination', 'fatigue'],
        treatments: [
          { id: 'metformin', name: 'Metformin', type: 'medication', cost: 100, effectiveness: 85 },
          { id: 'diet_exercise', name: 'Diet and Exercise', type: 'lifestyle', cost: 0, effectiveness: 75 },
          { id: 'insulin', name: 'Insulin Therapy', type: 'medication', cost: 300, effectiveness: 95 }
        ],
        impact: { happiness: -15, activity: -20, lifeExpectancy: -5 }
      },
      {
        id: 'depression',
        name: 'Clinical Depression',
        severity: 'moderate',
        chronic: true,
        symptoms: ['persistent sadness', 'loss of interest', 'fatigue'],
        treatments: [
          { id: 'therapy', name: 'Cognitive Behavioral Therapy', type: 'therapy', cost: 150, effectiveness: 80 },
          { id: 'antidepressants', name: 'Antidepressant Medication', type: 'medication', cost: 80, effectiveness: 75 },
          { id: 'exercise_therapy', name: 'Exercise Therapy', type: 'lifestyle', cost: 50, effectiveness: 65 }
        ],
        impact: { happiness: -30, activity: -25, lifeExpectancy: -2 }
      },
      {
        id: 'hypertension',
        name: 'High Blood Pressure',
        severity: 'moderate',
        chronic: true,
        symptoms: ['headaches', 'dizziness', 'chest pain'],
        treatments: [
          { id: 'ace_inhibitors', name: 'ACE Inhibitors', type: 'medication', cost: 120, effectiveness: 85 },
          { id: 'lifestyle_changes', name: 'Diet and Exercise', type: 'lifestyle', cost: 0, effectiveness: 70 },
          { id: 'stress_management', name: 'Stress Management', type: 'therapy', cost: 100, effectiveness: 60 }
        ],
        impact: { happiness: -10, activity: -15, lifeExpectancy: -3 }
      }
    ];
  }

  private initializeHealthEvents(): void {
    this.physicalHealthEvents = [
      {
        id: 'flu_outbreak',
        title: 'Flu Season',
        description: 'A flu virus is spreading in your area.',
        type: 'illness',
        severity: 'moderate',
        probability: 0.3,
        ageRange: [5, 100],
        lifestyle_triggers: ['poor_diet', 'low_exercise', 'high_stress']
      },
      {
        id: 'sports_injury',
        title: 'Sports Injury',
        description: 'You injured yourself while playing sports.',
        type: 'injury',
        severity: 'minor',
        probability: 0.15,
        ageRange: [12, 45],
        lifestyle_triggers: ['high_exercise']
      },
      {
        id: 'back_pain',
        title: 'Back Pain',
        description: 'You developed chronic back pain from poor posture.',
        type: 'illness',
        severity: 'moderate',
        probability: 0.25,
        ageRange: [25, 65],
        lifestyle_triggers: ['sedentary_lifestyle', 'poor_posture']
      },
      {
        id: 'heart_attack',
        title: 'Heart Attack',
        description: 'You experienced a heart attack.',
        type: 'emergency',
        severity: 'critical',
        probability: 0.05,
        ageRange: [40, 100],
        lifestyle_triggers: ['smoking', 'poor_diet', 'high_stress', 'sedentary_lifestyle']
      }
    ];

    this.mentalHealthEvents = [
      {
        id: 'work_burnout',
        title: 'Work Burnout',
        description: 'Chronic workplace stress has led to burnout.',
        type: 'mental_health',
        severity: 'moderate',
        probability: 0.2,
        ageRange: [22, 65],
        lifestyle_triggers: ['high_stress', 'poor_work_life_balance']
      },
      {
        id: 'social_anxiety',
        title: 'Social Anxiety',
        description: 'You develop anxiety in social situations.',
        type: 'mental_health',
        severity: 'minor',
        probability: 0.15,
        ageRange: [13, 40],
        lifestyle_triggers: ['social_isolation', 'low_self_esteem']
      },
      {
        id: 'panic_disorder',
        title: 'Panic Disorder',
        description: 'You experience recurring panic attacks.',
        type: 'mental_health',
        severity: 'moderate',
        probability: 0.08,
        ageRange: [18, 60],
        lifestyle_triggers: ['high_stress', 'caffeine_excess']
      }
    ];
  }

  public processAnnualHealthCheck(character: Character): {
    character: Character;
    events: string[];
    healthScore: number;
    recommendations: string[];
  } {
    const events: string[] = [];
    const recommendations: string[] = [];
    let updatedCharacter = { ...character };

    // Calculate lifestyle factors
    const lifestyle = this.calculateLifestyleFactors(character);
    
    // Calculate overall health score
    const healthScore = this.calculateHealthScore(character, lifestyle);
    
    // Age-related health decline
    const ageDecline = this.calculateAgeDecline(character.age);
    updatedCharacter.health = Math.max(0, updatedCharacter.health - ageDecline);
    
    if (ageDecline > 0) {
      events.push(`Natural aging reduced health by ${ageDecline} points.`);
    }

    // Lifestyle impact on health
    const lifestyleImpact = this.calculateLifestyleImpact(lifestyle);
    updatedCharacter.health = Math.max(0, Math.min(100, updatedCharacter.health + lifestyleImpact));
    
    if (lifestyleImpact > 0) {
      events.push(`Healthy lifestyle improved health by ${lifestyleImpact} points.`);
    } else if (lifestyleImpact < 0) {
      events.push(`Poor lifestyle choices reduced health by ${Math.abs(lifestyleImpact)} points.`);
    }

    // Generate health recommendations
    recommendations.push(...this.generateHealthRecommendations(character, lifestyle));

    // Check for new health conditions
    const newConditions = this.checkForNewConditions(character, lifestyle);
    for (const condition of newConditions) {
      events.push(`Diagnosed with: ${condition.name}`);
      updatedCharacter.health -= condition.impact.happiness;
      updatedCharacter.happiness += condition.impact.happiness;
    }

    // Mental health processing
    const mentalHealthUpdate = this.processMentalHealth(character, lifestyle);
    updatedCharacter.happiness = Math.max(0, Math.min(100, mentalHealthUpdate.happiness));
    events.push(...mentalHealthUpdate.events);

    return {
      character: updatedCharacter,
      events,
      healthScore,
      recommendations
    };
  }

  private calculateLifestyleFactors(character: Character): LifestyleFactor {
    // This would be enhanced with actual lifestyle tracking
    // For now, infer from character stats and activities
    
    const baselineLifestyle: LifestyleFactor = {
      exercise: 50,
      diet: 50,
      sleep: 50,
      smoking: false,
      drinking: 30,
      socialConnection: character.relationships || 50
    };

    // Adjust based on character attributes
    if (character.wealth > 50000) {
      baselineLifestyle.diet += 20; // Better food access
      baselineLifestyle.exercise += 10; // Gym memberships
    }

    if (character.smarts > 70) {
      baselineLifestyle.diet += 15; // Better health knowledge
      baselineLifestyle.smoking = Math.random() < 0.1; // Lower smoking rate
    }

    if (character.age > 50) {
      baselineLifestyle.exercise -= 15; // Natural decline
      baselineLifestyle.sleep -= 10; // Sleep quality decreases
    }

    return baselineLifestyle;
  }

  private calculateHealthScore(character: Character, lifestyle: LifestyleFactor): number {
    let score = character.health;

    // Lifestyle bonuses/penalties
    score += (lifestyle.exercise - 50) * 0.3;
    score += (lifestyle.diet - 50) * 0.3;
    score += (lifestyle.sleep - 50) * 0.2;
    score += (lifestyle.socialConnection - 50) * 0.15;
    
    // Negative lifestyle factors
    if (lifestyle.smoking) score -= 20;
    score -= (lifestyle.drinking - 50) * 0.2;

    // Age adjustment
    if (character.age > 65) score -= (character.age - 65) * 0.5;

    return Math.max(0, Math.min(100, score));
  }

  private calculateAgeDecline(age: number): number {
    if (age < 30) return 0;
    if (age < 50) return Math.random() < 0.3 ? 1 : 0;
    if (age < 70) return Math.random() < 0.5 ? Math.floor(Math.random() * 2) + 1 : 0;
    return Math.random() < 0.7 ? Math.floor(Math.random() * 3) + 1 : 0;
  }

  private calculateLifestyleImpact(lifestyle: LifestyleFactor): number {
    let impact = 0;

    // Positive impacts
    if (lifestyle.exercise > 70) impact += 3;
    if (lifestyle.diet > 70) impact += 3;
    if (lifestyle.sleep > 70) impact += 2;
    if (lifestyle.socialConnection > 70) impact += 2;

    // Negative impacts
    if (lifestyle.smoking) impact -= 5;
    if (lifestyle.drinking > 70) impact -= 3;
    if (lifestyle.exercise < 30) impact -= 2;
    if (lifestyle.diet < 30) impact -= 3;

    return impact;
  }

  private generateHealthRecommendations(character: Character, lifestyle: LifestyleFactor): string[] {
    const recommendations: string[] = [];

    if (lifestyle.exercise < 50) {
      recommendations.push("Increase physical activity - aim for 150 minutes of moderate exercise per week");
    }

    if (lifestyle.diet < 50) {
      recommendations.push("Improve diet - eat more fruits, vegetables, and whole grains");
    }

    if (lifestyle.sleep < 50) {
      recommendations.push("Prioritize sleep - aim for 7-9 hours of quality sleep per night");
    }

    if (lifestyle.smoking) {
      recommendations.push("Consider quitting smoking - consult with a healthcare provider about cessation programs");
    }

    if (lifestyle.drinking > 70) {
      recommendations.push("Reduce alcohol consumption - limit to moderate levels");
    }

    if (character.age > 40 && Math.random() < 0.5) {
      recommendations.push("Schedule regular health screenings appropriate for your age");
    }

    if (lifestyle.socialConnection < 40) {
      recommendations.push("Strengthen social connections - maintain relationships with family and friends");
    }

    return recommendations;
  }

  private checkForNewConditions(character: Character, lifestyle: LifestyleFactor): HealthCondition[] {
    const newConditions: HealthCondition[] = [];

    // Age-based condition risks
    if (character.age > 45 && Math.random() < 0.05) {
      if (lifestyle.diet < 40 || lifestyle.exercise < 40) {
        newConditions.push(this.healthConditions.find(c => c.id === 'diabetes_t2')!);
      }
    }

    if (character.age > 40 && Math.random() < 0.08) {
      if (lifestyle.smoking || lifestyle.diet < 30 || character.happiness < 40) {
        newConditions.push(this.healthConditions.find(c => c.id === 'hypertension')!);
      }
    }

    // Mental health conditions
    if (character.happiness < 30 && Math.random() < 0.15) {
      newConditions.push(this.healthConditions.find(c => c.id === 'depression')!);
    }

    return newConditions;
  }

  private processMentalHealth(character: Character, lifestyle: LifestyleFactor): {
    happiness: number;
    events: string[];
  } {
    const events: string[] = [];
    let happiness = character.happiness;

    // Stress factors
    let stressLevel = 0;
    
    if (character.wealth < 20000) stressLevel += 20; // Financial stress
    if (character.job && character.salary && character.salary < 40000) stressLevel += 15; // Work stress
    if (lifestyle.socialConnection < 30) stressLevel += 25; // Social isolation
    if (character.health < 50) stressLevel += 20; // Health anxiety

    // Positive mental health factors
    if (lifestyle.exercise > 60) {
      happiness += 5;
      events.push("Regular exercise improved your mood and mental health.");
    }

    if (lifestyle.socialConnection > 70) {
      happiness += 8;
      events.push("Strong social connections boosted your mental wellbeing.");
    }

    if (character.wealth > 100000) {
      happiness += 3;
      events.push("Financial security contributed to peace of mind.");
    }

    // Stress impact
    if (stressLevel > 50) {
      happiness -= Math.floor(stressLevel / 10);
      events.push(`High stress levels (${stressLevel}/100) negatively impacted your mental health.`);
    }

    // Age-related mental health changes
    if (character.age > 65 && Math.random() < 0.3) {
      happiness -= 5;
      events.push("Aging and life transitions affected your emotional wellbeing.");
    }

    return {
      happiness: Math.max(0, Math.min(100, happiness)),
      events
    };
  }

  public generateHealthEvent(character: Character): any | null {
    const allEvents = [...this.physicalHealthEvents, ...this.mentalHealthEvents];
    const eligibleEvents = allEvents.filter(event => 
      character.age >= event.ageRange[0] && 
      character.age <= event.ageRange[1]
    );

    if (eligibleEvents.length === 0) return null;

    // Weight by probability and lifestyle factors
    const weightedEvents = eligibleEvents.map(event => ({
      event,
      weight: this.calculateEventProbability(event, character)
    }));

    // Select event based on weighted probability
    const totalWeight = weightedEvents.reduce((sum, item) => sum + item.weight, 0);
    if (totalWeight === 0) return null;

    const random = Math.random() * totalWeight;
    let currentWeight = 0;

    for (const item of weightedEvents) {
      currentWeight += item.weight;
      if (random <= currentWeight) {
        return this.createHealthEvent(item.event, character);
      }
    }

    return null;
  }

  private calculateEventProbability(event: HealthEvent, character: Character): number {
    let probability = event.probability;

    // Lifestyle modifiers
    const lifestyle = this.calculateLifestyleFactors(character);
    
    if (event.lifestyle_triggers) {
      for (const trigger of event.lifestyle_triggers) {
        switch (trigger) {
          case 'poor_diet':
            if (lifestyle.diet < 40) probability *= 2;
            break;
          case 'low_exercise':
            if (lifestyle.exercise < 40) probability *= 1.8;
            break;
          case 'high_stress':
            if (character.happiness < 40) probability *= 2.2;
            break;
          case 'smoking':
            if (lifestyle.smoking) probability *= 3;
            break;
          case 'social_isolation':
            if (lifestyle.socialConnection < 30) probability *= 2;
            break;
        }
      }
    }

    // Age modifiers
    if (event.ageRange[1] - character.age < 10) {
      probability *= 1.5; // Higher risk near upper age limit
    }

    return probability;
  }

  private createHealthEvent(event: HealthEvent, character: Character): any {
    const choices = this.generateHealthEventChoices(event);

    return {
      id: event.id,
      title: event.title,
      description: event.description,
      type: 'health_event',
      severity: event.severity,
      choices
    };
  }

  private generateHealthEventChoices(event: HealthEvent): any[] {
    const baseChoices = [
      {
        id: 'seek_treatment',
        text: 'Seek immediate medical treatment',
        effects: { health: 10, wealth: -500, happiness: 5 }
      },
      {
        id: 'home_remedy',
        text: 'Try home remedies first',
        effects: { health: 3, wealth: -50, happiness: 2 }
      },
      {
        id: 'ignore',
        text: 'Ignore it and hope it goes away',
        effects: { health: -5, happiness: -3 }
      }
    ];

    // Customize choices based on event type and severity
    if (event.severity === 'critical') {
      return [
        {
          id: 'emergency_room',
          text: 'Rush to emergency room',
          effects: { health: 20, wealth: -2000, happiness: -10 }
        },
        {
          id: 'call_ambulance',
          text: 'Call an ambulance',
          effects: { health: 25, wealth: -3000, happiness: -5 }
        }
      ];
    }

    if (event.type === 'mental_health') {
      return [
        {
          id: 'therapy',
          text: 'Start therapy sessions',
          effects: { happiness: 15, wealth: -200, relationships: 5 }
        },
        {
          id: 'medication',
          text: 'Consider medication',
          effects: { happiness: 10, health: 5, wealth: -100 }
        },
        {
          id: 'self_help',
          text: 'Try self-help strategies',
          effects: { happiness: 5, smarts: 3 }
        }
      ];
    }

    return baseChoices;
  }
}

export const healthSystem = new ComprehensiveHealthSystem();