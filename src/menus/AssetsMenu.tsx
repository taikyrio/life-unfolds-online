
import React from 'react';
import { Character } from '../../types/game';
import { X } from 'lucide-react';

interface AssetsMenuProps {
  isOpen: boolean;
  onClose: () => void;
  character: Character;
}

export const AssetsMenu: React.FC<AssetsMenuProps> = ({
  isOpen,
  onClose,
  character
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-end justify-center z-50">
      <div className="bg-white rounded-t-2xl w-full max-w-md max-h-[70vh] overflow-y-auto animate-slide-in-from-bottom">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-bold">Assets</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
            <X size={20} />
          </button>
        </div>
        
        <div className="p-4">
          <div className="text-center py-8">
            <div className="text-2xl mb-2">💰</div>
            <div className="text-lg font-semibold">Net Worth: ${character.wealth}k</div>
          </div>
          
          {character.assets && character.assets.length > 0 ? (
            <div className="space-y-3">
              <h3 className="text-lg font-semibold">Your Assets</h3>
              {character.assets.map((asset, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <div className="font-medium">{asset.name}</div>
                    <div className="text-sm text-gray-600 capitalize">{asset.type}</div>
                  </div>
                  <div className="text-sm font-semibold">
                    ${asset.value}k
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-500 py-4">
              No assets yet. Work hard and save money!
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
