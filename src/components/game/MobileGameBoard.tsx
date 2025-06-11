
import React, { useState } from 'react';
import { Character, GameState } from '../../types/game';
import { TabContent } from '../ui/TabContent';
import { GameModals } from '../ui/GameModals';

interface MobileGameBoardProps {
  gameState: GameState;
  character: Character;
  ageHistory: Record<number, string[]>;
  showActivitiesMenu: boolean;
  showRelationshipsMenu: boolean;
  showAssetsMenu: boolean;
  showActivityModal: boolean;
  showEventOverlay: boolean;
  selectedActivity: any;
  onAgeUp: () => void;
  onChoice: (choiceId: string) => void;
  onActivity: (activityId: string, activityData?: any) => void;
  onGameStateChange: (newState: GameState) => void;
  onCharacterUpdate: (character: Character) => void;
  onEvent: (message: string) => void;
  onCareerAction: (action: string, data?: any) => void;
  onEducationAction: (action: string, data?: any) => void;
  onHealthAction: (action: string, data?: any) => void;
  onLifestyleAction: (action: string, data?: any) => void;
  onRelationshipAction: (action: string, data?: any) => void;
  onCloseActivitiesMenu: () => void;
  onCloseRelationshipsMenu: () => void;
  onCloseAssetsMenu: () => void;
  onCloseActivityModal: () => void;
  onCloseEventOverlay: () => void;
  onActivityComplete: () => void;
}

export const MobileGameBoard: React.FC<MobileGameBoardProps> = ({
  gameState,
  character,
  ageHistory,
  showActivitiesMenu,
  showRelationshipsMenu,
  showAssetsMenu,
  showActivityModal,
  showEventOverlay,
  selectedActivity,
  onAgeUp,
  onChoice,
  onActivity,
  onGameStateChange,
  onCharacterUpdate,
  onEvent,
  onCareerAction,
  onEducationAction,
  onHealthAction,
  onLifestyleAction,
  onRelationshipAction,
  onCloseActivitiesMenu,
  onCloseRelationshipsMenu,
  onCloseAssetsMenu,
  onCloseActivityModal,
  onCloseEventOverlay,
  onActivityComplete
}) => {
  const [activeTab, setActiveTab] = useState<'life' | 'activities' | 'careers' | 'relationships' | 'assets' | 'education' | 'health' | 'lifestyle' | 'money'>('life');

  return (
    <div className="h-screen w-full bg-gray-50 flex flex-col overflow-hidden">
      {/* InstLife-style Top Bar */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="flex items-center justify-center p-2">
          <div className="flex bg-gray-100 rounded-lg p-1">
            {[
              { id: 'life', icon: '🏠', label: 'Life' },
              { id: 'activities', icon: '🎯', label: 'Activities' },
              { id: 'careers', icon: '💼', label: 'Career' },
              { id: 'relationships', icon: '❤️', label: 'Love' },
              { id: 'education', icon: '🎓', label: 'School' },
              { id: 'money', icon: '💰', label: 'Money' },
              { id: 'assets', icon: '🏠', label: 'Assets' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-3 py-2 rounded-md transition-all duration-200 ${
                  activeTab === tab.id 
                    ? 'bg-white text-gray-900 shadow-sm font-medium' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <div className="flex flex-col items-center">
                  <span className="text-lg">{tab.icon}</span>
                  <span className="text-xs mt-1">{tab.label}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-hidden">
        <TabContent
          activeTab={activeTab}
          character={character}
          gameState={gameState}
          eventHistory={gameState.eventHistory}
          ageHistory={ageHistory}
          onAgeUp={onAgeUp}
          onChoice={onChoice}
          onActivity={onActivity}
          onGameStateChange={onGameStateChange}
          onCharacterUpdate={onCharacterUpdate}
          onEvent={onEvent}
          onCareerAction={onCareerAction}
          onEducationAction={onEducationAction}
          onHealthAction={onHealthAction}
          onLifestyleAction={onLifestyleAction}
        />
      </div>

      {/* InstLife-style Bottom Action Bar */}
      <div className="bg-white border-t border-gray-200 shadow-lg">
        <div className="flex items-center justify-center p-4">
          <button
            onClick={onAgeUp}
            className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-xl font-semibold transition-colors duration-200 flex items-center gap-2 shadow-md"
          >
            <span className="text-xl">🎂</span>
            <span>Age Up!</span>
          </button>
        </div>
      </div>

      <GameModals
        gameState={gameState}
        showActivitiesMenu={showActivitiesMenu}
        showRelationshipsMenu={showRelationshipsMenu}
        showAssetsMenu={showAssetsMenu}
        showActivityModal={showActivityModal}
        showEventOverlay={showEventOverlay}
        selectedActivity={selectedActivity}
        onCloseActivitiesMenu={onCloseActivitiesMenu}
        onActivityComplete={onActivityComplete}
        onCloseRelationshipsMenu={onCloseRelationshipsMenu}
        onCloseAssetsMenu={onCloseAssetsMenu}
        onCloseActivityModal={onCloseActivityModal}
        onCloseEventOverlay={onCloseEventOverlay}
        onActivity={onActivity}
        onRelationshipAction={onRelationshipAction}
        onChoice={onChoice}
        onGameStateChange={onGameStateChange}
      />
    </div>
  );
};
