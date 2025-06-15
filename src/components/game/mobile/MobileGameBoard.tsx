
import React, { useState } from 'react';
import { Character, GameState } from '../../../types/game';
import { EnhancedMobileLayout } from './EnhancedMobileLayout';
import { ActivityMenu } from '../../activities/ActivityMenu';
import { RelationshipsMenu } from '../../relationships/RelationshipsMenu';
import { AssetsMenu } from '../../assets/AssetsMenu';
import { EventOverlay } from '../../events/EventOverlay';

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

  return (
    <div className="h-screen overflow-hidden">
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
            <ActivityMenu
              character={character}
              onActivity={onActivity}
              onClose={() => {
                onCloseActivitiesMenu();
                setActiveTab('life');
              }}
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
              onClose={() => {
                onCloseRelationshipsMenu();
                setActiveTab('life');
              }}
              onGameStateChange={onGameStateChange}
              gameState={gameState}
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
  );
};
