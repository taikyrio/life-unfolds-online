
import React from 'react';
import { CrimeOperation } from '../../../types/organizedCrime';

interface CrimesPanelProps {
  availableCrimes: CrimeOperation[];
  onCommitCrime: (crimeId: string) => void;
  hasSyndicate: boolean;
}

export const CrimesPanel: React.FC<CrimesPanelProps> = ({
  availableCrimes,
  onCommitCrime,
  hasSyndicate
}) => {
  if (!hasSyndicate) return null;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg mb-6">
      <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Family Operations</h2>
      <div className="grid gap-3">
        {availableCrimes.map((crime) => (
          <button
            key={crime.id}
            onClick={() => onCommitCrime(crime.id)}
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
  );
};
