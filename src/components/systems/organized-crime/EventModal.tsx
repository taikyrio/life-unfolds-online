
import React from 'react';
import { SyndicateEvent, CriminalCharacterState } from '../../../types/organizedCrime';
import { MAFIA_HIERARCHY } from '../../../data/mafiaData';

interface EventModalProps {
  currentEvent: SyndicateEvent | null;
  crimeState: CriminalCharacterState;
  onHandleEventChoice: (choiceId: string) => void;
}

export const EventModal: React.FC<EventModalProps> = ({
  currentEvent,
  crimeState,
  onHandleEventChoice
}) => {
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
                onClick={() => onHandleEventChoice(choice.id)}
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
