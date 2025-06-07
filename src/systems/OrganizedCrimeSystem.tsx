import React, { useState, useEffect } from 'react';
import { Character } from '../types/character';
import { CriminalCharacterState, CrimeRank, CrimeOperation, SyndicateEvent, ExtortionTarget } from '../types/organizedCrime';
import { PrisonState } from '../types/prison';
import { MAFIA_HIERARCHY, CRIME_OPERATIONS, SYNDICATE_TYPES, getCrimesForRank, getRandomExtortionTarget } from '../data/mafiaData';
import { MAFIA_EVENTS, getRandomMafiaEvent, getExtortionMethods } from '../data/mafiaEvents';
import { getCrimeToSentenceMapping, PRISON_FACILITIES } from '../data/prisonData';
import { PrisonSystem } from './PrisonSystem';

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

  const getRankColor = (rank: CrimeRank) => {
    const colors = {
      associate: 'bg-gray-500',
      soldier: 'bg-blue-500',
      caporegime: 'bg-purple-500',
      underboss: 'bg-red-500',
      godfather: 'bg-gold-500',
      chairman: 'bg-gold-500',
      padrino: 'bg-gold-500'
    };
    return colors[rank] || 'bg-gray-500';
  };

  // Event Modal Component
  const EventModal = () => {
    if (!currentEvent) return null;

    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <div className="bg-white dark:bg-gray-800 rounded-xl max-w-md w-full p-6 shadow-2xl">
          <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
            Family Business
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            {currentEvent.description}
          </p>
          <div className="space-y-3">
            {currentEvent.choices.map((choice) => {
              const canChoose = !choice.requirements || 
                (choice.requirements.rank ? 
                  MAFIA_HIERARCHY[crimeState.rank].title >= MAFIA_HIERARCHY[choice.requirements.rank].title : true);

              return (
                <button
                  key={choice.id}
                  onClick={() => handleEventChoice(choice.id)}
                  disabled={!canChoose}
                  className={`w-full p-3 rounded-lg text-left transition-colors ${
                    canChoose 
                      ? 'bg-red-100 hover:bg-red-200 dark:bg-red-900/30 dark:hover:bg-red-900/50' 
                      : 'bg-gray-100 dark:bg-gray-700 opacity-50 cursor-not-allowed'
                  }`}
                >
                  <span className="text-gray-800 dark:text-white font-medium">
                    {choice.text}
                  </span>
                  {choice.requirements && (
                    <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      Requires: {choice.requirements.rank && `${choice.requirements.rank} rank`}
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    );
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

        {/* Crime State Display */}
        {crimeState.syndicateId && (
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg mb-6">
            <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Family Status</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-sm text-gray-500 dark:text-gray-400">Rank</div>
                <div className={`inline-block px-3 py-1 rounded-full text-white text-sm font-medium ${getRankColor(crimeState.rank)}`}>
                  {MAFIA_HIERARCHY[crimeState.rank].title}
                </div>
              </div>
              <div>
                <div className="text-sm text-gray-500 dark:text-gray-400">Loyalty</div>
                <div className="text-lg font-bold text-gray-800 dark:text-white">{crimeState.loyalty}%</div>
              </div>
              <div>
                <div className="text-sm text-gray-500 dark:text-gray-400">Reputation</div>
                <div className="text-lg font-bold text-gray-800 dark:text-white">{crimeState.reputation}</div>
              </div>
              <div>
                <div className="text-sm text-gray-500 dark:text-gray-400">Crimes</div>
                <div className="text-lg font-bold text-gray-800 dark:text-white">{crimeState.crimesCommitted}</div>
              </div>
            </div>
            {crimeState.madeStatus && (
              <div className="mt-4 p-3 bg-gold-100 dark:bg-gold-900/30 rounded-lg">
                <span className="text-gold-800 dark:text-gold-200 font-medium">⭐ Made Man/Woman</span>
              </div>
            )}
          </div>
        )}

        {/* Join Syndicate */}
        {!crimeState.syndicateId && (
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg mb-6">
            <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Join a Crime Syndicate</h2>
            {canJoinSyndicate() ? (
              <div className="grid gap-4">
                {Object.values(SYNDICATE_TYPES).map((syndicate) => (
                  <button
                    key={syndicate.id}
                    onClick={() => joinSyndicate(syndicate.id)}
                    className="p-4 bg-red-100 hover:bg-red-200 dark:bg-red-900/30 dark:hover:bg-red-900/50 rounded-lg text-left transition-colors"
                  >
                    <div className="font-bold text-gray-800 dark:text-white">{syndicate.name}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">{syndicate.region}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                      {syndicate.specialRules.join(' • ')}
                    </div>
                  </button>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <div className="text-gray-500 dark:text-gray-400 mb-4">
                  You need to commit at least 5 crimes before joining a syndicate.
                </div>
                <div className="text-lg font-bold text-red-600">
                  {crimeState.crimesCommitted}/5 crimes committed
                </div>
              </div>
            )}
          </div>
        )}

        {/* Available Crimes */}
        {crimeState.syndicateId && (
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg mb-6">
            <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Family Operations</h2>
            <div className="grid gap-3">
              {availableCrimes.map((crime) => (
                <button
                  key={crime.id}
                  onClick={() => commitCrime(crime.id)}
                  className="p-4 bg-red-50 hover:bg-red-100 dark:bg-red-900/20 dark:hover:bg-red-900/40 rounded-lg text-left transition-colors border border-red-200 dark:border-red-800"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="font-bold text-gray-800 dark:text-white">{crime.name}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-300">{crime.description}</div>
                      <div className="flex gap-4 mt-2 text-xs">
                        <span className="text-green-600 dark:text-green-400">
                          💰 ${crime.basePayout.toLocaleString()}
                        </span>
                        <span className="text-yellow-600 dark:text-yellow-400">
                          ⚠️ {crime.riskLevel}% risk
                        </span>
                        <span className="text-blue-600 dark:text-blue-400">
                          ✅ {crime.successRate}% success
                        </span>
                      </div>
                    </div>
                    <div className={`px-2 py-1 rounded text-xs font-medium ${
                      crime.difficulty === 'easy' ? 'bg-green-200 text-green-800' :
                      crime.difficulty === 'medium' ? 'bg-yellow-200 text-yellow-800' :
                      crime.difficulty === 'hard' ? 'bg-orange-200 text-orange-800' :
                      'bg-red-200 text-red-800'
                    }`}>
                      {crime.difficulty}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Extortion */}
        {crimeState.syndicateId && (
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg mb-6">
            <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Extortion</h2>
            <button
              onClick={() => setSelectedTarget(getRandomExtortionTarget())}
              className="w-full p-4 bg-orange-100 hover:bg-orange-200 dark:bg-orange-900/30 dark:hover:bg-orange-900/50 rounded-lg transition-colors"
            >
              <span className="text-orange-800 dark:text-orange-200 font-medium">
                🏪 Find business to extort
              </span>
            </button>
          </div>
        )}

        {/* Extortion Target Modal */}
        {selectedTarget && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-gray-800 rounded-xl max-w-md w-full p-6 shadow-2xl">
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
                Extortion Target
              </h3>
              <div className="mb-6">
                <div className="font-bold text-lg text-gray-800 dark:text-white">{selectedTarget.name}</div>
                <div className="text-gray-600 dark:text-gray-300">{selectedTarget.businessType} • {selectedTarget.location}</div>
                <div className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                  Estimated wealth: ${selectedTarget.wealth.toLocaleString()}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  Compliance: {selectedTarget.compliance}%
                </div>
              </div>
              <div className="space-y-3">
                {getExtortionMethods().map((method) => (
                  <button
                    key={method.id}
                    onClick={() => performExtortion(selectedTarget, method.id)}
                    className="w-full p-3 bg-red-100 hover:bg-red-200 dark:bg-red-900/30 dark:hover:bg-red-900/50 rounded-lg text-left transition-colors"
                  >
                    <div className="font-bold text-gray-800 dark:text-white">{method.name}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">{method.description}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      {method.successRate}% success rate • +{method.notoriety} notoriety
                    </div>
                  </button>
                ))}
                <button
                  onClick={() => setSelectedTarget(null)}
                  className="w-full p-3 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 rounded-lg transition-colors"
                >
                  <span className="text-gray-600 dark:text-gray-300">Cancel</span>
                </button>
              </div>
            </div>
          </div>
        )}

        <EventModal />
      </div>
    </div>
  );
};
