
import React from 'react';
import { CriminalCharacterState } from '../../../types/organizedCrime';
import { SYNDICATE_TYPES } from '../../../data/mafiaData';

interface SyndicateSelectorProps {
  crimeState: CriminalCharacterState;
  canJoinSyndicate: boolean;
  onJoinSyndicate: (syndicateType: string) => void;
}

export const SyndicateSelector: React.FC<SyndicateSelectorProps> = ({
  crimeState,
  canJoinSyndicate,
  onJoinSyndicate
}) => {
  if (crimeState.syndicateId) return null;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg mb-6">
      <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Join a Crime Syndicate</h2>
      {canJoinSyndicate ? (
        <div className="grid gap-4">
          {Object.values(SYNDICATE_TYPES).map((syndicate) => (
            <button
              key={syndicate.id}
              onClick={() => onJoinSyndicate(syndicate.id)}
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
  );
};
