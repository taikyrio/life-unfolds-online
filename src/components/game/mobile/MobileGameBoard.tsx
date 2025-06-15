
import React, { useState } from 'react';
import { Character, GameState } from '../../../types/game';
import { EnhancedMobileLayout } from './EnhancedMobileLayout';
import { ActivitiesMenu } from '../../menus/ActivitiesMenu';
import { RelationshipsMenu } from '../../menus/RelationshipsMenu';
import { AssetsMenu } from '../../menus/AssetsMenu';
import { EventOverlay } from '../../EventOverlay';

interface MobileGameBoardProps {
  gameState: GameState;
  character: Character;
  ageHistory: Record<number, string[]>;
  showActivitiesMenu: boolean;
  showRelationshipsMenu: boolean;
  showAssetsMenu: boolean;
  showEventOverlay: boolean;
  onAgeUp: () => void;
  onActivity: (activityId: string, activityData?: any) => void;
  onChoice: (choiceId: string) => void;
  onCloseActivitiesMenu: () => void;
  onCloseRelationshipsMenu: () => void;
  onCloseAssetsMenu: () => void;
  onCloseEventOverlay: () => void;
  onActivityComplete: () => void;
  onGameStateChange: (newState: GameState) => void;
}

export const MobileGameBoard: React.FC<MobileGameBoardProps> = ({
  gameState,
  character,
  ageHistory,
  showActivitiesMenu,
  showRelationshipsMenu,
  showAssetsMenu,
  showEventOverlay,
  onAgeUp,
  onActivity,
  onChoice,
  onCloseActivitiesMenu,
  onCloseRelationshipsMenu,
  onCloseAssetsMenu,
  onCloseEventOverlay,
  onActivityComplete,
  onGameStateChange
}) => {
  const [activeTab, setActiveTab] = useState<'life' | 'activities' | 'careers' | 'relationships' | 'assets' | 'education'>('life');

  const handleCharacterUpdate = (updatedCharacter: Character) => {
    onGameStateChange({
      ...gameState,
      character: updatedCharacter
    });
  };

  const handleEvent = (message: string) => {
    // Handle event messages
    console.log('Event:', message);
  };

  return (
    <div className="h-screen overflow-hidden portrait:block landscape:hidden">
      <div className="landscape:flex landscape:items-center landscape:justify-center landscape:h-screen landscape:bg-black">
        <div className="landscape:text-white landscape:text-center landscape:p-8">
          <div className="landscape:text-6xl landscape:mb-4">📱</div>
          <div className="landscape:text-2xl landscape:font-bold landscape:mb-2">Portrait Mode Only</div>
          <div className="landscape:text-lg landscape:opacity-80">Please rotate your device to continue playing</div>
        </div>
      </div>
      
      <div className="portrait:block landscape:hidden">
        <EnhancedMobileLayout
          character={character}
          activeTab={activeTab}
          onTabChange={setActiveTab}
          onAgeUp={onAgeUp}
          onShowActivityMenu={() => setActiveTab('activities')}
          onShowRelationshipsMenu={() => setActiveTab('relationships')}
          onShowAssetsMenu={() => setActiveTab('assets')}
          onShowPersonalitySkills={() => {}}
          ageHistory={ageHistory}
        />

        {/* Activity Menu Modal */}
        {(showActivitiesMenu || activeTab === 'activities') && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm">
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-900 to-slate-800 rounded-t-3xl p-6 max-h-[80vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">Activities</h2>
                <button
                  onClick={() => {
                    onCloseActivitiesMenu();
                    setActiveTab('life');
                  }}
                  className="text-white/70 hover:text-white text-2xl"
                >
                  ×
                </button>
              </div>
              <ActivitiesMenu
                character={character}
                onActivity={onActivity}
                onClose={() => {
                  onCloseActivitiesMenu();
                  setActiveTab('life');
                }}
                isOpen={true}
              />
            </div>
          </div>
        )}

        {/* Relationships Menu Modal */}
        {(showRelationshipsMenu || activeTab === 'relationships') && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm">
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-900 to-slate-800 rounded-t-3xl p-6 max-h-[80vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">Relationships</h2>
                <button
                  onClick={() => {
                    onCloseRelationshipsMenu();
                    setActiveTab('life');
                  }}
                  className="text-white/70 hover:text-white text-2xl"
                >
                  ×
                </button>
              </div>
              <RelationshipsMenu
                character={character}
                onCharacterUpdate={handleCharacterUpdate}
                onEvent={handleEvent}
              />
            </div>
          </div>
        )}

        {/* Assets Menu Modal */}
        {(showAssetsMenu || activeTab === 'assets') && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm">
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-900 to-slate-800 rounded-t-3xl p-6 max-h-[80vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">Assets</h2>
                <button
                  onClick={() => {
                    onCloseAssetsMenu();
                    setActiveTab('life');
                  }}
                  className="text-white/70 hover:text-white text-2xl"
                >
                  ×
                </button>
              </div>
              <AssetsMenu
                character={character}
                onClose={() => {
                  onCloseAssetsMenu();
                  setActiveTab('life');
                }}
                isOpen={true}
              />
            </div>
          </div>
        )}

        {/* Event Overlay */}
        {showEventOverlay && gameState.currentEvent && (
          <EventOverlay
            event={gameState.currentEvent}
            onChoice={onChoice}
            onClose={onCloseEventOverlay}
          />
        )}
      </div>
    </div>
  );
};
