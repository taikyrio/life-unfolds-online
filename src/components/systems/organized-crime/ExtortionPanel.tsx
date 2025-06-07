
import React from 'react';
import { ExtortionTarget } from '../../../types/organizedCrime';
import { getExtortionMethods } from '../../../data/mafiaEvents';

interface ExtortionPanelProps {
  hasSyndicate: boolean;
  selectedTarget: ExtortionTarget | null;
  onSelectTarget: (target: ExtortionTarget) => void;
  onPerformExtortion: (target: ExtortionTarget, method: string) => void;
  onCloseTarget: () => void;
}

export const ExtortionPanel: React.FC<ExtortionPanelProps> = ({
  hasSyndicate,
  selectedTarget,
  onSelectTarget,
  onPerformExtortion,
  onCloseTarget
}) => {
  if (!hasSyndicate) return null;

  return (
    <>
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg mb-6">
        <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Extortion</h2>
        <button
          onClick={() => {
            const target = {
              id: 'random_target',
              name: 'Random Business',
              businessType: 'restaurant',
              wealth: 50000,
              compliance: 30,
              hasProtection: false,
              location: 'Downtown'
            };
            onSelectTarget(target);
          }}
          className="w-full p-4 bg-orange-100 hover:bg-orange-200 dark:bg-orange-900/30 dark:hover:bg-orange-900/50 rounded-lg transition-colors"
        >
          <span className="text-orange-800 dark:text-orange-200 font-medium">
            🏪 Find business to extort
          </span>
        </button>
      </div>

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
                  onClick={() => onPerformExtortion(selectedTarget, method.id)}
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
                onClick={onCloseTarget}
                className="w-full p-3 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 rounded-lg transition-colors"
              >
                <span className="text-gray-600 dark:text-gray-300">Cancel</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
