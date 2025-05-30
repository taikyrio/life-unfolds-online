import { Character, FamilyMember, RelationshipAction, InteractionRecord } from '../../types/game';

export class RelationshipActionProcessor {
  processAction(character: Character, target: FamilyMember, action: RelationshipAction): {
    success: boolean;
    message: string;
    effects: any;
  } {
    const effects: any = {};
    let message = "";
    let success = true;

    // Ensure target has relationshipStats
    if (!target.relationshipStats) {
      target.relationshipStats = {
        relationshipLevel: 50,
        trust: 50,
        respect: 50,
        lastInteraction: new Date().toISOString(),
        interactionHistory: []
      };
    }

    // Calculate success chance based on relationship stats and personality
    const successChance = this.calculateSuccessChance(character, target, action);
    const isSuccessful = Math.random() < successChance;

    switch (action.id) {
      case 'compliment':
        if (isSuccessful) {
          const boost = Math.floor(Math.random() * 10) + 5;
          target.relationshipStats.relationshipLevel = Math.min(100, target.relationshipStats.relationshipLevel + boost);
          target.relationshipStats.respect = Math.min(100, target.relationshipStats.respect + 3);
          message = `${target.name} appreciated your compliment!`;
          effects.happiness = 5;
        } else {
          target.relationshipStats.relationshipLevel = Math.max(0, target.relationshipStats.relationshipLevel - 2);
          message = `${target.name} thought your compliment was insincere.`;
          effects.happiness = -2;
        }
        break;

      case 'argue':
        const argumentIntensity = Math.floor(Math.random() * 20) + 10;
        target.relationshipStats.relationshipLevel = Math.max(0, target.relationshipStats.relationshipLevel - argumentIntensity);
        target.relationshipStats.respect = Math.max(0, target.relationshipStats.respect - 5);
        target.currentMood = 'angry';
        message = `You had a heated argument with ${target.name}.`;
        effects.happiness = -10;
        effects.stress = 15;
        break;

      case 'hug':
        if (target.personality.kindness > 50) {
          target.relationshipStats.relationshipLevel = Math.min(100, target.relationshipStats.relationshipLevel + 8);
          target.relationshipStats.trust = Math.min(100, target.relationshipStats.trust + 3);
          message = `${target.name} welcomed your hug warmly.`;
          effects.happiness = 8;
        } else {
          target.relationshipStats.relationshipLevel = Math.max(0, target.relationshipStats.relationshipLevel - 3);
          message = `${target.name} seemed uncomfortable with the hug.`;
          effects.happiness = -2;
        }
        break;

      case 'ask_for_money':
        if (target.relationship === 'father' || target.relationship === 'mother') {
          if (target.relationshipStats.relationshipLevel > 60 && target.relationshipStats.trust > 50) {
            const amount = Math.floor(Math.random() * 200) + 50;
            effects.wealth = amount;
            target.relationshipStats.relationshipLevel = Math.max(0, target.relationshipStats.relationshipLevel - 5);
            message = `${target.name} gave you $${amount}.`;
          } else {
            target.relationshipStats.relationshipLevel = Math.max(0, target.relationshipStats.relationshipLevel - 10);
            message = `${target.name} refused to give you money.`;
            effects.happiness = -5;
          }
        }
        break;

      case 'flirt':
        if (['lover', 'spouse', 'friend', 'acquaintance'].includes(target.relationship)) {
          if (isSuccessful && target.personality.kindness > 40) {
            target.relationshipStats.relationshipLevel = Math.min(100, target.relationshipStats.relationshipLevel + 12);
            if (target.relationshipStats.love) {
              target.relationshipStats.love = Math.min(100, target.relationshipStats.love + 8);
            }
            message = `${target.name} blushed at your flirting!`;
            effects.happiness = 10;
          } else {
            target.relationshipStats.relationshipLevel = Math.max(0, target.relationshipStats.relationshipLevel - 8);
            target.relationshipStats.respect = Math.max(0, target.relationshipStats.respect - 5);
            message = `${target.name} didn't appreciate your flirting.`;
            effects.happiness = -5;
          }
        }
        break;

      case 'break_up':
        if (target.relationship === 'lover') {
          target.relationship = 'ex';
          target.relationshipStats.relationshipLevel = Math.min(30, target.relationshipStats.relationshipLevel);
          target.relationshipStats.trust = Math.max(0, target.relationshipStats.trust - 30);
          if (target.relationshipStats.love) {
            target.relationshipStats.love = Math.max(0, target.relationshipStats.love - 50);
          }
          message = `You broke up with ${target.name}.`;
          effects.happiness = -20;
          effects.relationshipStatus = 'single';
        }
        break;

      case 'propose':
        if (target.relationship === 'lover' && target.relationshipStats.love && target.relationshipStats.love > 70) {
          const acceptanceChance = (target.relationshipStats.love + target.relationshipStats.relationshipLevel) / 200;
          if (Math.random() < acceptanceChance) {
            target.relationship = 'spouse';
            target.relationshipStats.relationshipLevel = Math.min(100, target.relationshipStats.relationshipLevel + 20);
            target.relationshipStats.love = Math.min(100, target.relationshipStats.love + 15);
            message = `${target.name} said yes! You're engaged!`;
            effects.happiness = 30;
            effects.relationshipStatus = 'engaged';
            effects.wealth = -(action.cost || 500);
          } else {
            target.relationshipStats.relationshipLevel = Math.max(0, target.relationshipStats.relationshipLevel - 15);
            target.relationshipStats.love = Math.max(0, target.relationshipStats.love - 20);
            message = `${target.name} turned down your proposal.`;
            effects.happiness = -25;
          }
        }
        break;

      case 'spend_time':
        const timeBonus = Math.floor(Math.random() * 8) + 5;
        target.relationshipStats.relationshipLevel = Math.min(100, target.relationshipStats.relationshipLevel + timeBonus);
        target.relationshipStats.trust = Math.min(100, target.relationshipStats.trust + 2);
        message = `You had a great time with ${target.name}.`;
        effects.happiness = 8;
        break;

      case 'ignore':
        target.relationshipStats.relationshipLevel = Math.max(0, target.relationshipStats.relationshipLevel - 3);
        target.relationshipStats.respect = Math.max(0, target.relationshipStats.respect - 2);
        message = `You ignored ${target.name}.`;
        break;

      case 'insult':
        const insultDamage = Math.floor(Math.random() * 15) + 10;
        target.relationshipStats.relationshipLevel = Math.max(0, target.relationshipStats.relationshipLevel - insultDamage);
        target.relationshipStats.respect = Math.max(0, target.relationshipStats.respect - 10);
        target.currentMood = 'angry';
        message = `You insulted ${target.name}. They're very upset.`;
        effects.happiness = -5;
        break;

      default:
        message = `You ${action.name.toLowerCase()} with ${target.name}.`;
        break;
    }

    // Apply wealth cost
    if (action.cost) {
      effects.wealth = -(action.cost);
    }

    return { success, message, effects };
  }

  private calculateSuccessChance(character: Character, target: FamilyMember, action: RelationshipAction): number {
    let baseChance = 0.7; // 70% base success rate

    // Ensure relationshipStats exists
     if (!target.relationshipStats) {
      target.relationshipStats = {
        relationshipLevel: 50,
        trust: 50,
        respect: 50,
        lastInteraction: new Date().toISOString(),
        interactionHistory: []
      };
    }
    // Adjust based on relationship level
    baseChance += (target.relationshipStats.relationshipLevel - 50) / 100 * 0.3;

    // Adjust based on trust
    baseChance += (target.relationshipStats.trust - 50) / 100 * 0.2;

    // Adjust based on character's looks for certain actions
    if (['flirt', 'compliment'].includes(action.id)) {
      baseChance += (character.looks - 50) / 100 * 0.2;
    }

    // Adjust based on target's mood
    switch (target.currentMood) {
      case 'happy': baseChance += 0.1; break;
      case 'angry': baseChance -= 0.2; break;
      case 'sad': baseChance -= 0.1; break;
      case 'excited': baseChance += 0.15; break;
      case 'stressed': baseChance -= 0.15; break;
    }

    return Math.max(0.1, Math.min(0.95, baseChance));
  }

  recordInteraction(target: FamilyMember, action: RelationshipAction, result: any): void {
    // Ensure relationshipStats exists
    if (!target.relationshipStats) {
      target.relationshipStats = {
        relationshipLevel: 50,
        trust: 50,
        respect: 50,
        lastInteraction: new Date().toISOString(),
        interactionHistory: []
      };
    }

    const interaction: InteractionRecord = {
      id: Date.now().toString(),
      type: action.id,
      outcome: result.success ? 'positive' : 'negative',
      impact: result.impact || 0,
      timestamp: new Date().toISOString(),
      description: result.message
    };

    target.relationshipStats.interactionHistory.push(interaction);
    target.relationshipStats.lastInteraction = interaction.timestamp;

    // Keep only last 50 interactions
    if (target.relationshipStats.interactionHistory.length > 50) {
      target.relationshipStats.interactionHistory = target.relationshipStats.interactionHistory.slice(-50);
    }
  }
}