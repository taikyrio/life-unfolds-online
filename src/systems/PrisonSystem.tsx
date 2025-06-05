import React, { useState, useEffect } from 'react';
import { Character } from '../types/character';
import { PrisonState, PrisonEvent } from '../types/prison';
import { PRISON_JOBS, PRISON_EVENTS, generateRandomInmates, getRandomPrisonEvent } from '../data/prisonData';

interface PrisonSystemProps {
  character: Character;
  onCharacterUpdate: (character: Character) => void;
  onEvent: (message: string) => void;
  onReturnToLife: () => void;
}

export const PrisonSystem: React.FC<PrisonSystemProps> = ({
  character,
  onCharacterUpdate,
  onEvent,
  onReturnToLife
}) => {
  const [prisonState, setPrisonState] = useState<PrisonState>(() => {
    const existingState = character.customStats?.prisonState as PrisonState;
    
    // Only initialize prison state if character is actually supposed to be in prison
    if (existingState && existingState.isInPrison) {
      return existingState;
    }
    
    // Default prison state for when system is accessed inappropriately
    return {
      isInPrison: true,
      sentence: 5,
      timeServed: 0,
      crime: 'Unknown',
      facility: 'State Prison',
      securityLevel: 'medium',
      reputation: 0,
      cellmates: generateRandomInmates(),
      disciplinaryActions: 0,
      prisonJobSalary: 0,
      paroleEligible: false
    };
  });

  const [currentEvent, setCurrentEvent] = useState<PrisonEvent | null>(null);

  useEffect(() => {
    // Random chance for prison events
    if (Math.random() < 0.2 && !currentEvent) {
      setCurrentEvent(getRandomPrisonEvent());
    }

    // Check parole eligibility
    if (prisonState.timeServed >= prisonState.sentence * 0.5 && !prisonState.paroleEligible) {
      setPrisonState(prev => ({ ...prev, paroleEligible: true }));
      onEvent("You are now eligible for parole.");
    }
  }, [prisonState.timeServed, currentEvent]);

  const handleEventChoice = (choiceId: string) => {
    if (!currentEvent) return;

    const choice = currentEvent.choices.find(c => c.id === choiceId);
    if (!choice) return;

    let newPrisonState = { ...prisonState };
    let newCharacter = { ...character };
    let message = '';

    // Apply choice effects
    if (choice.effects.reputation !== undefined) {
      newPrisonState.reputation = Math.max(-100, Math.min(100, newPrisonState.reputation + choice.effects.reputation));
    }
    if (choice.effects.health !== undefined) {
      newCharacter.health = Math.max(0, Math.min(100, newCharacter.health + choice.effects.health));
    }
    if (choice.effects.happiness !== undefined) {
      newCharacter.happiness = Math.max(0, Math.min(100, newCharacter.happiness + choice.effects.happiness));
    }
    if (choice.effects.sentence !== undefined) {
      newPrisonState.sentence = Math.max(0, newPrisonState.sentence + choice.effects.sentence);
      if (choice.effects.sentence > 0) {
        message = `Your sentence has been extended by ${choice.effects.sentence} years.`;
      } else if (choice.effects.sentence < 0) {
        message = `Your sentence has been reduced by ${Math.abs(choice.effects.sentence)} years.`;
      }
    }
    if (choice.effects.disciplinaryActions !== undefined) {
      newPrisonState.disciplinaryActions = Math.max(0, newPrisonState.disciplinaryActions + choice.effects.disciplinaryActions);
    }
    if (choice.effects.gangAffiliation) {
      newPrisonState.gangAffiliation = choice.effects.gangAffiliation;
      message = 'You have joined a prison gang.';
    }

    // Handle death
    if (choice.effects.death) {
      onEvent('You were killed in prison.');
      newCharacter.health = 0;
      updateCharacterWithPrisonState(newCharacter, newPrisonState);
      return;
    }

    // Handle escape
    if (choice.effects.escape) {
      onEvent('You successfully escaped from prison! You are now a fugitive.');
      newPrisonState.isInPrison = false;
      newCharacter.customStats = {
        ...newCharacter.customStats,
        fugitiveStatus: true
      };
      updateCharacterWithPrisonState(newCharacter, newPrisonState);
      onReturnToLife();
      return;
    }

    updateCharacterWithPrisonState(newCharacter, newPrisonState);
    setCurrentEvent(null);
    
    if (message) {
      onEvent(message);
    }
  };

  const serveTime = () => {
    const newPrisonState = {
      ...prisonState,
      timeServed: prisonState.timeServed + 1
    };

    let newCharacter = { ...character, age: character.age + 1 };

    // Add prison job salary
    if (prisonState.prisonJob) {
      newCharacter.wealth = newCharacter.wealth + prisonState.prisonJobSalary;
    }

    // Check if sentence is complete
    if (newPrisonState.timeServed >= newPrisonState.sentence) {
      newPrisonState.isInPrison = false;
      const releaseMessage = `You have completed your ${newPrisonState.sentence}-year sentence and are now free!`;
      
      // Add to life events instead of just showing notification
      newCharacter.lifeEvents = [...newCharacter.lifeEvents, releaseMessage];
      
      updateCharacterWithPrisonState(newCharacter, newPrisonState);
      onEvent(releaseMessage);
      
      setTimeout(() => {
        onReturnToLife();
      }, 2000);
      return;
    }

    // Prison effects on character
    newCharacter.happiness = Math.max(0, newCharacter.happiness - 5);
    if (Math.random() < 0.1) {
      newCharacter.health = Math.max(0, newCharacter.health - 10);
    }

    const yearMessage = `Served year ${newPrisonState.timeServed} of ${newPrisonState.sentence} in ${prisonState.facility}.`;
    
    // Add to life events
    newCharacter.lifeEvents = [...newCharacter.lifeEvents, yearMessage];

    updateCharacterWithPrisonState(newCharacter, newPrisonState);
    onEvent(yearMessage);
    
    // Return to life after serving time
    setTimeout(() => {
      onReturnToLife();
    }, 2000);
  };

  const applyForParole = () => {
    if (!prisonState.paroleEligible) return;

    const baseChance = 30;
    const reputationBonus = Math.max(0, prisonState.reputation) * 0.5;
    const disciplinaryPenalty = prisonState.disciplinaryActions * 10;
    const totalChance = Math.max(5, baseChance + reputationBonus - disciplinaryPenalty);

    if (Math.random() * 100 < totalChance) {
      const newPrisonState = { ...prisonState, isInPrison: false };
      const paroleMessage = 'Parole granted! You are now free.';
      
      const updatedCharacter = {
        ...character,
        lifeEvents: [...character.lifeEvents, paroleMessage]
      };
      
      updateCharacterWithPrisonState(updatedCharacter, newPrisonState);
      onEvent(paroleMessage);
      
      setTimeout(() => {
        onReturnToLife();
      }, 2000);
    } else {
      const deniedMessage = 'Parole denied. You must continue serving your sentence.';
      
      const updatedCharacter = {
        ...character,
        lifeEvents: [...character.lifeEvents, deniedMessage]
      };
      
      onCharacterUpdate(updatedCharacter);
      onEvent(deniedMessage);
      
      setTimeout(() => {
        onReturnToLife();
      }, 2000);
    }
  };

  const takePrisonJob = (jobId: string) => {
    const job = PRISON_JOBS.find(j => j.id === jobId);
    if (!job) return;

    const meetsRequirements = 
      (!job.requirements.reputation || prisonState.reputation >= job.requirements.reputation) &&
      (!job.requirements.education || character.education?.completedStages?.includes(job.requirements.education));

    if (!meetsRequirements) {
      const message = 'You do not meet the requirements for this job.';
      onEvent(message);
      
      setTimeout(() => {
        onReturnToLife();
      }, 1500);
      return;
    }

    const newPrisonState = {
      ...prisonState,
      prisonJob: job.name,
      prisonJobSalary: job.salary
    };

    const jobMessage = `You are now working as a ${job.name} earning $${job.salary} per year.`;
    
    const updatedCharacter = {
      ...character,
      lifeEvents: [...character.lifeEvents, jobMessage]
    };

    updateCharacterWithPrisonState(updatedCharacter, newPrisonState);
    onEvent(jobMessage);
    
    setTimeout(() => {
      onReturnToLife();
    }, 2000);
  };

  const updateCharacterWithPrisonState = (newCharacter: Character, newPrisonState: PrisonState) => {
    setPrisonState(newPrisonState);
    const updatedCharacter = {
      ...newCharacter,
      customStats: {
        ...newCharacter.customStats,
        prisonState: newPrisonState
      }
    };
    onCharacterUpdate(updatedCharacter);
  };

  // Event Modal Component
  const EventModal = () => {
    if (!currentEvent) return null;

    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <div className="bg-white dark:bg-gray-800 rounded-xl max-w-md w-full p-6 shadow-2xl">
          <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
            Prison Event
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            {currentEvent.description}
          </p>
          <div className="space-y-3">
            {currentEvent.choices.map((choice) => (
              <button
                key={choice.id}
                onClick={() => handleEventChoice(choice.id)}
                className="w-full p-3 bg-orange-100 hover:bg-orange-200 dark:bg-orange-900/30 dark:hover:bg-orange-900/50 rounded-lg text-left transition-colors"
              >
                <span className="text-gray-800 dark:text-white font-medium">
                  {choice.text}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-gray-50 to-red-100 pb-24">
      <div className="px-4 py-6 max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-orange-600 to-red-700 rounded-3xl mb-4 shadow-lg">
            <span className="text-2xl">🔒</span>
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-800 to-red-700 bg-clip-text text-transparent mb-2">
            Prison Life
          </h1>
          <p className="text-gray-600 text-lg">{prisonState.facility}</p>
        </div>

        {/* Prison Status */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg mb-6">
          <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Sentence Status</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-sm text-gray-500 dark:text-gray-400">Time Served</div>
              <div className="text-lg font-bold text-gray-800 dark:text-white">
                {prisonState.timeServed} / {prisonState.sentence} years
              </div>
            </div>
            <div>
              <div className="text-sm text-gray-500 dark:text-gray-400">Crime</div>
              <div className="text-lg font-bold text-gray-800 dark:text-white">{prisonState.crime}</div>
            </div>
            <div>
              <div className="text-sm text-gray-500 dark:text-gray-400">Reputation</div>
              <div className="text-lg font-bold text-gray-800 dark:text-white">{prisonState.reputation}</div>
            </div>
            <div>
              <div className="text-sm text-gray-500 dark:text-gray-400">Disciplinary Actions</div>
              <div className="text-lg font-bold text-gray-800 dark:text-white">{prisonState.disciplinaryActions}</div>
            </div>
          </div>
          
          {prisonState.gangAffiliation && (
            <div className="mt-4 p-3 bg-red-100 dark:bg-red-900/30 rounded-lg">
              <span className="text-red-800 dark:text-red-200 font-medium">Gang Member: {prisonState.gangAffiliation}</span>
            </div>
          )}
        </div>

        {/* Prison Actions */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg mb-6">
          <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Actions</h2>
          <div className="space-y-3">
            <button
              onClick={serveTime}
              className="w-full p-4 bg-orange-100 hover:bg-orange-200 dark:bg-orange-900/30 dark:hover:bg-orange-900/50 rounded-lg transition-colors"
            >
              <span className="text-orange-800 dark:text-orange-200 font-medium">
                ⏱️ Serve Time (Age Up)
              </span>
            </button>
            
            {prisonState.paroleEligible && (
              <button
                onClick={applyForParole}
                className="w-full p-4 bg-green-100 hover:bg-green-200 dark:bg-green-900/30 dark:hover:bg-green-900/50 rounded-lg transition-colors"
              >
                <span className="text-green-800 dark:text-green-200 font-medium">
                  🆓 Apply for Parole
                </span>
              </button>
            )}
          </div>
        </div>

        {/* Prison Jobs */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg mb-6">
          <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Prison Jobs</h2>
          {prisonState.prisonJob ? (
            <div className="p-4 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
              <div className="font-bold text-blue-800 dark:text-blue-200">Current Job: {prisonState.prisonJob}</div>
              <div className="text-sm text-blue-600 dark:text-blue-300">Salary: ${prisonState.prisonJobSalary}/year</div>
            </div>
          ) : (
            <div className="space-y-3">
              {PRISON_JOBS.map((job) => {
                const meetsRequirements = 
                  (!job.requirements.reputation || prisonState.reputation >= job.requirements.reputation) &&
                  (!job.requirements.education || character.education?.completedStages?.includes(job.requirements.education));

                return (
                  <button
                    key={job.id}
                    onClick={() => takePrisonJob(job.id)}
                    disabled={!meetsRequirements}
                    className={`w-full p-4 rounded-lg text-left transition-colors ${
                      meetsRequirements 
                        ? 'bg-blue-100 hover:bg-blue-200 dark:bg-blue-900/30 dark:hover:bg-blue-900/50' 
                        : 'bg-gray-100 dark:bg-gray-700 opacity-50 cursor-not-allowed'
                    }`}
                  >
                    <div className="font-bold text-gray-800 dark:text-white">{job.name}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">{job.description}</div>
                    <div className="text-sm text-green-600 dark:text-green-400 mt-1">
                      Salary: ${job.salary}/year
                    </div>
                    {!meetsRequirements && (
                      <div className="text-xs text-red-500 mt-1">
                        Requirements not met
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Cellmates */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
          <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Cellmates</h2>
          <div className="space-y-3">
            {prisonState.cellmates.map((inmate) => (
              <div key={inmate.id} className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="font-bold text-gray-800 dark:text-white">{inmate.name}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">Crime: {inmate.crime}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">Sentence: {inmate.sentence} years</div>
                  </div>
                  <div className="text-right">
                    <div className={`text-sm font-medium ${
                      inmate.relationship > 0 ? 'text-green-600' : 
                      inmate.relationship < 0 ? 'text-red-600' : 'text-gray-600'
                    }`}>
                      Relationship: {inmate.relationship}
                    </div>
                    <div className="text-xs text-gray-500">
                      Danger: {inmate.dangerLevel}/100
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <EventModal />
      </div>
    </div>
  );
};