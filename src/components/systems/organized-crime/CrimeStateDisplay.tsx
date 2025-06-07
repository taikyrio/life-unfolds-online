
import React from 'react';
import { CriminalCharacterState, CrimeRank } from '../../../types/organizedCrime';
import { MAFIA_HIERARCHY } from '../../../data/mafiaData';

interface CrimeStateDisplayProps {
  crimeState: CriminalCharacterState;
}

export const CrimeStateDisplay: React.FC<CrimeStateDisplayProps> = ({ crimeState }) => {
  const getRankColor = (rank: CrimeRank) => {
    const colors = {
      associate: 'bg-gray-500',
      soldier: 'bg-blue-500',
      caporegime: 'bg-purple-500',
      underboss: 'bg-red-500',
      godfather: 'bg-yellow-500',
      chairman: 'bg-yellow-500',
      padrino: 'bg-yellow-500'
    };
    return colors[rank] || 'bg-gray-500';
  };

  if (!crimeState.syndicateId) return null;

  return (
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
        <div className="mt-4 p-3 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg">
          <span className="text-yellow-800 dark:text-yellow-200 font-medium">⭐ Made Man/Woman</span>
        </div>
      )}
    </div>
  );
};
