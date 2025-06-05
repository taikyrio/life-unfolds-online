import { SyndicateEvent, CrimeRank } from '../types/organizedCrime';

export const MAFIA_EVENTS: Record<string, SyndicateEvent> = {
  boss_murder_order: {
    id: 'boss_murder_order',
    type: 'boss_order',
    description: 'The boss wants you to eliminate someone who has been causing problems for the family.',
    choices: [
      {
        id: 'do_it_yourself',
        text: 'Handle it personally',
        requirements: { rank: 'soldier' },
        effects: {
          loyalty: 15,
          reputation: 10,
          suspicion: 5,
          arrest: Math.random() < 0.15
        }
      },
      {
        id: 'delegate',
        text: 'Have someone else do it',
        requirements: { rank: 'caporegime', members: 1 },
        effects: {
          loyalty: 5,
          reputation: 5,
          wealth: -10000
        }
      },
      {
        id: 'make_excuse',
        text: 'Make an excuse',
        effects: {
          loyalty: -10,
          suspicion: 10,
          health: Math.random() < 0.3 ? -20 : 0
        }
      },
      {
        id: 'refuse',
        text: 'Refuse outright',
        effects: {
          loyalty: -25,
          health: Math.random() < 0.6 ? -50 : 0,
          death: Math.random() < 0.2
        }
      }
    ],
    consequences: []
  },

  rat_suspicion: {
    id: 'rat_suspicion',
    type: 'rat_suspicion',
    description: 'There are whispers that someone in the family might be talking to the police. You notice suspicious behavior from some members.',
    choices: [
      {
        id: 'accuse_member',
        text: 'Accuse a specific member',
        effects: {
          loyalty: Math.random() < 0.3 ? 20 : -15,
          reputation: Math.random() < 0.3 ? 15 : -10,
          death: Math.random() < 0.7 ? false : true
        }
      },
      {
        id: 'investigate',
        text: 'Investigate quietly',
        effects: {
          suspicion: -5,
          loyalty: 5
        }
      },
      {
        id: 'stay_silent',
        text: 'Keep quiet and observe',
        effects: {
          suspicion: 10
        }
      }
    ],
    consequences: []
  },

  rival_encounter: {
    id: 'rival_encounter',
    type: 'rival_encounter',
    description: 'You encounter a member of a rival family on your territory. They seem to be casing one of your operations.',
    choices: [
      {
        id: 'attack',
        text: 'Attack them immediately',
        effects: {
          reputation: 10,
          suspicion: 15,
          arrest: Math.random() < 0.4,
          death: Math.random() < 0.1
        }
      },
      {
        id: 'reason',
        text: 'Try to reason with them',
        effects: {
          loyalty: Math.random() < 0.2 ? 5 : -5,
          reputation: Math.random() < 0.3 ? 5 : -10
        }
      },
      {
        id: 'beg',
        text: 'Beg for forgiveness',
        effects: {
          loyalty: -20,
          reputation: -15,
          health: -10
        }
      },
      {
        id: 'run',
        text: 'Run away',
        effects: {
          loyalty: -15,
          reputation: -20,
          happiness: -10
        }
      }
    ],
    consequences: []
  },

  family_death: {
    id: 'family_death',
    type: 'family_death',
    description: 'A rival family has killed one of your blood relatives in retaliation for your activities.',
    choices: [
      {
        id: 'seek_revenge',
        text: 'Plan immediate revenge',
        effects: {
          loyalty: 10,
          reputation: 15,
          happiness: -30,
          suspicion: 20
        }
      },
      {
        id: 'mourn_quietly',
        text: 'Mourn and let the family handle it',
        effects: {
          happiness: -20,
          loyalty: 5
        }
      },
      {
        id: 'leave_family',
        text: 'Consider leaving the family',
        effects: {
          loyalty: -50,
          death: Math.random() < 0.4
        }
      }
    ],
    consequences: [
      {
        familyDeath: 'random'
      }
    ]
  },

  promotion_to_soldier: {
    id: 'promotion_to_soldier',
    type: 'promotion',
    description: 'You are being considered for promotion to Soldier. To become a made man, you must take the oath and complete a final task.',
    choices: [
      {
        id: 'accept_task',
        text: 'Accept the murder assignment',
        requirements: { rank: 'associate' },
        effects: {
          promotion: true,
          loyalty: 20,
          reputation: 25,
          arrest: Math.random() < 0.25
        }
      },
      {
        id: 'decline',
        text: 'Decline the promotion',
        effects: {
          loyalty: -10,
          reputation: -5
        }
      }
    ],
    consequences: []
  },

  police_raid: {
    id: 'police_raid',
    type: 'police_raid',
    description: 'The police are raiding family operations. Someone must have been talking to the authorities.',
    choices: [
      {
        id: 'destroy_evidence',
        text: 'Destroy evidence quickly',
        effects: {
          loyalty: 10,
          arrest: Math.random() < 0.3
        }
      },
      {
        id: 'cooperate',
        text: 'Cooperate with police',
        effects: {
          loyalty: -50,
          arrest: false,
          death: Math.random() < 0.8
        }
      },
      {
        id: 'flee',
        text: 'Try to escape',
        effects: {
          arrest: Math.random() < 0.6,
          suspicion: 20
        }
      }
    ],
    consequences: []
  },

  territory_dispute: {
    id: 'territory_dispute',
    type: 'territory_dispute',
    description: 'Another crew is trying to muscle in on your territory. How do you respond?',
    choices: [
      {
        id: 'negotiate',
        text: 'Negotiate boundaries',
        requirements: { rank: 'caporegime' },
        effects: {
          loyalty: 5,
          reputation: 5,
          wealth: -5000
        }
      },
      {
        id: 'fight_back',
        text: 'Fight for your territory',
        effects: {
          reputation: 15,
          suspicion: 25,
          health: Math.random() < 0.3 ? -30 : 0
        }
      },
      {
        id: 'give_up',
        text: 'Give up the territory',
        effects: {
          loyalty: -20,
          reputation: -25,
          wealth: -20000
        }
      }
    ],
    consequences: []
  },

  become_informant: {
    id: 'become_informant',
    type: 'boss_order',
    description: 'You have been arrested. The police are offering you a deal to become an informant in exchange for immunity.',
    choices: [
      {
        id: 'accept_deal',
        text: 'Become an informant',
        effects: {
          loyalty: 0, // Special handling - becomes informant
          arrest: false
        }
      },
      {
        id: 'refuse_deal',
        text: 'Refuse and go to prison',
        effects: {
          loyalty: 15,
          arrest: true
        }
      }
    ],
    consequences: []
  },

  witness_protection: {
    id: 'witness_protection',
    type: 'boss_order',
    description: 'You have successfully gathered enough evidence as an informant. The FBI is offering witness protection.',
    choices: [
      {
        id: 'accept_protection',
        text: 'Enter witness protection',
        effects: {
          // Special handling - enters witness protection
        }
      },
      {
        id: 'take_chances',
        text: 'Take your chances on your own',
        effects: {
          death: Math.random() < 0.6,
          wealth: 100000
        }
      }
    ],
    consequences: []
  }
};

export const getRandomMafiaEvent = (rank: CrimeRank, loyalty: number, isInformant: boolean = false): SyndicateEvent | null => {
  const availableEvents = Object.values(MAFIA_EVENTS);
  
  // Filter events based on rank and situation
  let eligibleEvents = availableEvents.filter(event => {
    // Special events for informants
    if (isInformant && event.id === 'witness_protection') return true;
    if (isInformant) return false;
    
    // Events that require specific ranks
    if (event.id === 'promotion_to_soldier' && rank === 'associate') return true;
    if (event.id === 'promotion_to_soldier' && rank !== 'associate') return false;
    
    // Boss events more likely for higher ranks
    if (event.type === 'boss_order' && rank === 'associate') return Math.random() < 0.3;
    
    return true;
  });
  
  if (eligibleEvents.length === 0) return null;
  
  // Weight events based on loyalty and rank
  if (loyalty < 50) {
    eligibleEvents = eligibleEvents.filter(e => e.type !== 'promotion');
  }
  
  return eligibleEvents[Math.floor(Math.random() * eligibleEvents.length)];
};

export const getMurderTargets = () => [
  'Rival family member',
  'Police informant',
  'Uncooperative business owner',
  'Former family member who betrayed the code',
  'Witness to family crimes'
];

export const getExtortionMethods = () => [
  {
    id: 'scare',
    name: 'Scare them',
    description: 'Intimidate without violence',
    successRate: 60,
    notoriety: 5
  },
  {
    id: 'shake_down',
    name: 'Shake them down',
    description: 'Use physical intimidation',
    successRate: 75,
    notoriety: 15
  },
  {
    id: 'whack',
    name: 'Whack them out',
    description: 'Use lethal force',
    successRate: 90,
    notoriety: 40
  }
];