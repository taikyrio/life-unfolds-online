
import React, { useState, useEffect } from 'react';
import { Character } from '../types/character';
import { CriminalCharacterState, CrimeRank, CrimeOperation, SyndicateEvent, ExtortionTarget } from '../types/organizedCrime';
import { PrisonState } from '../types/prison';
import { MAFIA_HIERARCHY, CRIME_OPERATIONS, SYNDICATE_TYPES, getCrimesForRank, getRandomExtortionTarget } from '../data/mafiaData';
import { MAFIA_EVENTS, getRandomMafiaEvent, getExtortionMethods } from '../data/mafiaEvents';
import { getCrimeToSentenceMapping, PRISON_FACILITIES } from '../data/prisonData';
import { PrisonSystem } from './PrisonSystem';
import { CrimeStateDisplay } from '../components/systems/organized-crime/CrimeStateDisplay';
import { SyndicateSelector } from '../components/systems/organized-crime/SyndicateSelector';
import { CrimesPanel } from '../components/systems/organized-crime/CrimesPanel';
import { ExtortionPanel } from '../components/systems/organized-crime/ExtortionPanel';
import { EventModal } from '../components/systems/organized-crime/EventModal';

interface OrganizedCrimeSystemProps {
  character: Character;
  onCharacterUpdate: (character: Character) => void;
  onEvent: (message: string) => void;
  onReturnToLife?: () => void;
}

export const OrganizedCrimeSystem: React.FC<OrganizedCrimeSystemProps> = ({
  character,
  onCharacterUpdate,
  onEvent,
  onReturnToLife
}) => {
  const [crimeState, setCrimeState] = useState<CriminalCharacterState>(() => {
    // Initialize crime state if not exists
    const existingState = character.customStats?.crimeState as CriminalCharacterState;
    return existingState || {
      rank: 'associate' as CrimeRank,
      madeStatus: false,
      loyalty: 50,
      reputation: 0,
      crimesCommitted: 0,
      totalEarnings: 0,
      suspicionLevel: 0,
      isInformant: false,
      protectionLevel: 0,
      territoryControlled: [],
      enemyFamilies: []
    };
  });

  const [currentEvent, setCurrentEvent] = useState<SyndicateEvent | null>(null);
  const [availableCrimes, setAvailableCrimes] = useState<CrimeOperation[]>([]);
  const [selectedTarget, setSelectedTarget] = useState<ExtortionTarget | null>(null);

  // Check if character is in prison
  const prisonState = character.customStats?.prisonState as PrisonState;
  const isInPrison = prisonState?.isInPrison || false;

  useEffect(() => {
    // Update available crimes based on rank
    setAvailableCrimes(getCrimesForRank(crimeState.rank));

    // Random chance for syndicate events
    if (Math.random() < 0.15 && !currentEvent) {
      const event = getRandomMafiaEvent(crimeState.rank, crimeState.loyalty, crimeState.isInformant);
      if (event) {
        setCurrentEvent(event);
      }
    }
  }, [crimeState.rank, crimeState.loyalty, crimeState.isInformant, currentEvent]);

  const canJoinSyndicate = () => {
    return !crimeState.syndicateId && crimeState.crimesCommitted >= 5 && character.age >= 18;
  };

  const joinSyndicate = (syndicateType: string) => {
    const syndicate = SYNDICATE_TYPES[syndicateType as keyof typeof SYNDICATE_TYPES];
    if (!syndicate || !canJoinSyndicate()) return;

    const newCrimeState = {
      ...crimeState,
      syndicateId: syndicate.id,
      rank: 'associate' as CrimeRank,
      loyalty: 50,
      reputation: 10
    };

    updateCharacterWithCrimeState(newCrimeState);
    logLifeEvent(`Joined the ${syndicate.name} as an Associate`);
  };

  const commitCrime = (crimeId: string) => {
    // Age restriction check
    if (character.age < 18) {
      onEvent('You must be 18 or older to commit serious crimes.');
      return;
    }

    const crimeOperation = availableCrimes.find(c => c.id === crimeId);
    if (!crimeOperation) return;

    const success = Math.random() > (crimeOperation.failureChance / 100);
    const arrested = Math.random() < (crimeOperation.arrestChance / 100);

    let message = '';
    let earnings = 0;

    if (success && !arrested) {
      earnings = crimeOperation.basePayout * (0.7 + Math.random() * 0.6);
      const familyCut = Math.floor(earnings * 0.4);
      const playerCut = earnings - familyCut;

      message = `Successfully committed ${crimeOperation.name.toLowerCase()} and earned $${playerCut.toLocaleString()}`;

      const newCrimeState = {
        ...crimeState,
        crimesCommitted: crimeState.crimesCommitted + 1,
        totalEarnings: crimeState.totalEarnings + playerCut,
        reputation: Math.min(100, crimeState.reputation + (crimeOperation.notorietyGain / 2)),
        loyalty: Math.min(100, crimeState.loyalty + 2),
        suspicionLevel: Math.min(100, crimeState.suspicionLevel + crimeOperation.notorietyGain)
      };

      // Also update criminal career stats if they exist
      const updatedCharacter = {
        ...character,
        wealth: character.wealth + playerCut,
        customStats: {
          ...character.customStats,
          crimeState: newCrimeState,
          // Update notoriety for criminal career tracking
          notoriety: Math.min(100, (character.customStats?.notoriety || 0) + (crimeOperation.notorietyGain / 2))
        }
      };

      updateCharacterWithCrimeState(newCrimeState);
      onCharacterUpdate(updatedCharacter);
      logLifeEvent(message);

      // Return to life after successful crime
      setTimeout(() => {
        if (onReturnToLife) onReturnToLife();
      }, 2000);
    } else if (arrested) {
      // Send to prison
      sendToPrison(crimeOperation.type);
      return;
    } else {
      message = `Failed attempt at ${crimeOperation.name.toLowerCase()} - escaped but gained nothing`;
      const newCrimeState = {
        ...crimeState,
        suspicionLevel: Math.min(100, crimeState.suspicionLevel + (crimeOperation.notorietyGain / 2)),
        loyalty: Math.max(0, crimeState.loyalty - 1)
      };
      updateCharacterWithCrimeState(newCrimeState);
      logLifeEvent(message);

      // Return to life after failed crime
      setTimeout(() => {
        if (onReturnToLife) onReturnToLife();
      }, 2000);
    }

    checkForPromotion();
  };

  const sendToPrison = (crimeType: string) => {
    const sentenceMapping = getCrimeToSentenceMapping();
    const crimeData = sentenceMapping[crimeType as keyof typeof sentenceMapping];

    if (!crimeData) return;

    const sentence = Math.floor(Math.random() * (crimeData.max - crimeData.min + 1)) + crimeData.min;
    const facility = PRISON_FACILITIES[crimeData.facility as keyof typeof PRISON_FACILITIES];

    const newPrisonState: PrisonState = {
      isInPrison: true,
      sentence: sentence,
      timeServed: 0,
      crime: crimeType.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase()),
      facility: facility.name,
      securityLevel: facility.securityLevel,
      reputation: 0,
      cellmates: [],
      disciplinaryActions: 0,
      prisonJobSalary: 0,
      paroleEligible: false
    };

    const updatedCharacter = {
      ...character,
      customStats: {
        ...character.customStats,
        prisonState: newPrisonState
      }
    };

    onCharacterUpdate(updatedCharacter);
    logLifeEvent(`Arrested for ${newPrisonState.crime} and sentenced to ${sentence} years in ${facility.name}`);
  };

  const logLifeEvent = (message: string) => {
    const updatedCharacter = {
      ...character,
      lifeEvents: [...character.lifeEvents, message]
    };
    onCharacterUpdate(updatedCharacter);

    if (onReturnToLife) {
      setTimeout(() => {
        onReturnToLife();
      }, 2000);
    }
  };

  const performExtortion = (target: ExtortionTarget, method: string) => {
    const methods = getExtortionMethods();
    const selectedMethod = methods.find(m => m.id === method);
    if (!selectedMethod) return;

    const success = Math.random() < (selectedMethod.successRate / 100);
    const baseAmount = Math.floor(target.wealth * 0.1 * (target.compliance / 100));

    if (success) {
      const earnings = baseAmount * (1 + Math.random() * 0.5);
      const familyCut = Math.floor(earnings * 0.3);
      const playerCut = earnings - familyCut;

      const newCrimeState = {
        ...crimeState,
        totalEarnings: crimeState.totalEarnings + playerCut,
        reputation: Math.min(100, crimeState.reputation + 5),
        suspicionLevel: Math.min(100, crimeState.suspicionLevel + selectedMethod.notoriety)
      };

      updateCharacterWithCrimeState(newCrimeState);
      updateCharacter({ wealth: character.wealth + playerCut });
      logLifeEvent(`Successfully extorted ${target.name} for $${earnings.toLocaleString()}`);
    } else {
      logLifeEvent(`Failed extortion attempt on ${target.name}`);
      const newCrimeState = {
        ...crimeState,
        suspicionLevel: Math.min(100, crimeState.suspicionLevel + 10)
      };
      updateCharacterWithCrimeState(newCrimeState);
    }

    setSelectedTarget(null);
  };

  const checkForPromotion = () => {
    const currentRankInfo = MAFIA_HIERARCHY[crimeState.rank];
    const requirements = currentRankInfo.promotionRequirements;

    if (crimeState.crimesCommitted >= requirements.crimesCompleted &&
        crimeState.totalEarnings >= requirements.earnings &&
        crimeState.loyalty >= requirements.loyalty) {

      // Special case for soldier promotion
      if (crimeState.rank === 'associate' && !crimeState.madeStatus) {
        setCurrentEvent(MAFIA_EVENTS.promotion_to_soldier);
        return;
      }

      // Regular promotion
      const rankOrder: CrimeRank[] = ['associate', 'soldier', 'caporegime', 'underboss', 'godfather'];
      const currentIndex = rankOrder.indexOf(crimeState.rank);

      if (currentIndex < rankOrder.length - 1) {
        const newRank = rankOrder[currentIndex + 1];
        const newCrimeState = {
          ...crimeState,
          rank: newRank,
          reputation: Math.min(100, crimeState.reputation + 20)
        };

        updateCharacterWithCrimeState(newCrimeState);
        logLifeEvent(`Promoted to ${MAFIA_HIERARCHY[newRank].title} in the crime family`);
      }
    }
  };

  const handleEventChoice = (choiceId: string) => {
    if (!currentEvent) return;

    const choice = currentEvent.choices.find(c => c.id === choiceId);
    if (!choice) return;

    let newCrimeState = { ...crimeState };
    let newCharacter = { ...character };
    let message = '';

    // Apply choice effects
    if (choice.effects.loyalty !== undefined) {
      newCrimeState.loyalty = Math.max(0, Math.min(100, newCrimeState.loyalty + choice.effects.loyalty));
    }
    if (choice.effects.reputation !== undefined) {
      newCrimeState.reputation = Math.max(0, Math.min(100, newCrimeState.reputation + choice.effects.reputation));
    }
    if (choice.effects.suspicion !== undefined) {
      newCrimeState.suspicionLevel = Math.max(0, Math.min(100, newCrimeState.suspicionLevel + choice.effects.suspicion));
    }
    if (choice.effects.wealth !== undefined) {
      newCharacter.wealth = Math.max(0, newCharacter.wealth + choice.effects.wealth);
    }
    if (choice.effects.health !== undefined) {
      newCharacter.health = Math.max(0, Math.min(100, newCharacter.health + choice.effects.health));
    }
    if (choice.effects.happiness !== undefined) {
      newCharacter.happiness = Math.max(0, Math.min(100, newCharacter.happiness + choice.effects.happiness));
    }

    // Special handling for specific events
    if (currentEvent.id === 'promotion_to_soldier' && choiceId === 'accept_task') {
      newCrimeState.rank = 'soldier';
      newCrimeState.madeStatus = true;
      message = 'Completed murder assignment and became a made man/woman';
    } else if (currentEvent.id === 'become_informant' && choiceId === 'accept_deal') {
      newCrimeState.isInformant = true;
      newCrimeState.informantProgress = {
        evidenceCollected: 0,
        evidenceRequired: 5,
        timeRemaining: 5,
        discoveryRisk: 0,
        policeContact: 'FBI Agent Johnson'
      };
      message = 'Became an FBI informant against the crime family';
    }

    // Handle death
    if (choice.effects.death) {
      logLifeEvent('Killed by the crime family for betrayal');
      newCharacter.health = 0;
      onCharacterUpdate(newCharacter);
      return;
    }

    updateCharacterWithCrimeState(newCrimeState);
    onCharacterUpdate(newCharacter);
    setCurrentEvent(null);

    if (message) {
      logLifeEvent(message);
    }
  };

  const updateCharacterWithCrimeState = (newCrimeState: CriminalCharacterState) => {
    setCrimeState(newCrimeState);
    const updatedCharacter = {
      ...character,
      customStats: {
        ...character.customStats,
        crimeState: newCrimeState
      }
    };
    onCharacterUpdate(updatedCharacter);
  };

  const updateCharacter = (updates: Partial<Character>) => {
    onCharacterUpdate({ ...character, ...updates });
  };

  // If in prison, show prison system
  if (isInPrison) {
    return (
      <PrisonSystem
        character={character}
        onCharacterUpdate={onCharacterUpdate}
        onEvent={onEvent}
        onReturnToLife={onReturnToLife || (() => {})}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-gray-50 to-black-100 pb-24">
      <div className="px-4 py-6 max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-red-600 to-black-700 rounded-3xl mb-4 shadow-lg">
            <span className="text-2xl">👤</span>
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-red-800 to-black-700 bg-clip-text text-transparent mb-2">
            Organized Crime
          </h1>
          <p className="text-gray-600 text-lg">Family business and honor</p>
        </div>

        <CrimeStateDisplay crimeState={crimeState} />

        <SyndicateSelector
          crimeState={crimeState}
          canJoinSyndicate={canJoinSyndicate()}
          onJoinSyndicate={joinSyndicate}
        />

        <CrimesPanel
          availableCrimes={availableCrimes}
          onCommitCrime={commitCrime}
          hasSyndicate={!!crimeState.syndicateId}
        />

        <ExtortionPanel
          hasSyndicate={!!crimeState.syndicateId}
          selectedTarget={selectedTarget}
          onSelectTarget={setSelectedTarget}
          onPerformExtortion={performExtortion}
          onCloseTarget={() => setSelectedTarget(null)}
        />

        <EventModal
          currentEvent={currentEvent}
          crimeState={crimeState}
          onHandleEventChoice={handleEventChoice}
        />
      </div>
    </div>
  );
};
