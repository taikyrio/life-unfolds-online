import React, { useState } from 'react';
import { Character, GameState, LifeEvent } from '../../types/game';
import { CharacterStats } from '../CharacterStats';
import { EventOverlay } from '../EventOverlay';
import { LifeTab } from '../LifeTab';
import { ActivitiesTab } from '../ActivitiesTab';
import { BottomNavigation } from '../BottomNavigation';
import { PersonalitySkillsPanel } from '../PersonalitySkillsPanel';
import useGameLogic from '../../hooks/useGameLogic';
import { RelationshipsTab } from '../tabs/RelationshipsTab';
import { AssetsTab } from '../tabs/AssetsTab';

interface MobileGameBoardProps {
  gameState: GameState;
  onGameStateChange: (newState: GameState) => void;
  eventHistory?: string[];
  ageHistory?: Record<number, string[]>;
}

export const MobileGameBoard: React.FC<MobileGameBoardProps> = ({
  gameState,
  onGameStateChange,
  eventHistory = [],
  ageHistory = {}
}) => {
  const [activeTab, setActiveTab] = useState<'life' | 'activities' | 'careers' | 'relationships' | 'assets' | 'education'>('life');
  const {
    ageHistory: updatedAgeHistory,
    showEventOverlay,
    setShowEventOverlay,
    ageUp,
    handleChoice,
    handleActivity
  } = useGameLogic({ gameState, onGameStateChange });

  const [showActivitiesMenu, setShowActivitiesMenu] = useState(false);
  const [showRelationshipsMenu, setShowRelationshipsMenu] = useState(false);
  const [showAssetsMenu, setShowAssetsMenu] = useState(false);

  // Add new tab for personality and skills
  const [activeBottomSheet, setActiveBottomSheet] = useState<string | null>(null);

  const handleShowActivityMenu = () => {
    setShowActivitiesMenu(true);
    setActiveBottomSheet('activities');
  };

  const handleShowRelationshipsMenu = () => {
    setShowRelationshipsMenu(true);
    setActiveBottomSheet('relationships');
  };

  const handleShowAssetsMenu = () => {
    setShowAssetsMenu(true);
    setActiveBottomSheet('assets');
  };

  const handleShowPersonalitySkills = () => {
    setActiveBottomSheet('personality-skills');
  };

  return (
    <div className="h-screen bg-[#E5E5E5] flex flex-col overflow-hidden">
      {/* Top Navigation */}
      <div className="bg-white border-b border-gray-200 px-4 py-3">
        <h1 className="text-lg font-bold text-gray-900 text-center">
          {gameState.character.name}, {gameState.character.age}
        </h1>
        <CharacterStats character={gameState.character} />
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        {activeTab === 'life' && (
          <LifeTab
            character={gameState.character}
            eventHistory={eventHistory}
            ageHistory={updatedAgeHistory}
            onAgeUp={ageUp}
          />
        )}
        {activeTab === 'activities' && (
          <ActivitiesTab
            character={gameState.character}
            onActivity={handleActivity}
          />
        )}
      </div>

      {/* Bottom Navigation */}
      <BottomNavigation
        activeTab={activeTab as any}
        onTabChange={() => {}}
        onAgeUp={ageUp}
        character={gameState.character}
        onShowActivityMenu={handleShowActivityMenu}
        onShowRelationshipsMenu={handleShowRelationshipsMenu}
        onShowAssetsMenu={handleShowAssetsMenu}
        onShowPersonalitySkills={handleShowPersonalitySkills}
      />

      {/* Activities Bottom Sheet */}
      {activeBottomSheet === 'activities' && (
        <div className="fixed inset-0 z-50 bg-black/20" onClick={() => setActiveBottomSheet(null)}>
          <div 
            className="absolute bottom-0 left-0 right-0 bg-white rounded-t-xl max-h-[80vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
              <h2 className="text-lg font-bold text-gray-900">Activities</h2>
              <button 
                onClick={() => setActiveBottomSheet(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            <div className="p-4">
              <ActivitiesTab character={gameState.character} onActivity={handleActivity} />
            </div>
          </div>
        </div>
      )}

      {/* Relationships Bottom Sheet */}
      {activeBottomSheet === 'relationships' && (
        <div className="fixed inset-0 z-50 bg-black/20" onClick={() => setActiveBottomSheet(null)}>
          <div 
            className="absolute bottom-0 left-0 right-0 bg-white rounded-t-xl max-h-[80vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
              <h2 className="text-lg font-bold text-gray-900">Relationships</h2>
              <button 
                onClick={() => setActiveBottomSheet(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            <div className="p-4">
              <RelationshipsTab character={gameState.character} />
            </div>
          </div>
        </div>
      )}

      {/* Assets Bottom Sheet */}
      {activeBottomSheet === 'assets' && (
        <div className="fixed inset-0 z-50 bg-black/20" onClick={() => setActiveBottomSheet(null)}>
          <div 
            className="absolute bottom-0 left-0 right-0 bg-white rounded-t-xl max-h-[80vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
              <h2 className="text-lg font-bold text-gray-900">Assets</h2>
              <button 
                onClick={() => setActiveBottomSheet(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            <div className="p-4">
              <AssetsTab character={gameState.character} />
            </div>
          </div>
        </div>
      )}

      {/* Personality & Skills Bottom Sheet */}
      {activeBottomSheet === 'personality-skills' && (
        <div className="fixed inset-0 z-50 bg-black/20" onClick={() => setActiveBottomSheet(null)}>
          <div 
            className="absolute bottom-0 left-0 right-0 bg-white rounded-t-xl max-h-[80vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
              <h2 className="text-lg font-bold text-gray-900">Personality & Skills</h2>
              <button 
                onClick={() => setActiveBottomSheet(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            <div className="p-4">
              <PersonalitySkillsPanel character={gameState.character} />
            </div>
          </div>
        </div>
      )}

      {/* Event Overlay */}
      {showEventOverlay && gameState.currentEvent && (
        <EventOverlay
          event={gameState.currentEvent}
          onChoice={handleChoice}
          onClose={() => setShowEventOverlay(false)}
          characterName={gameState.character.name}
          characterAge={gameState.character.age}
        />
      )}
    </div>
  );
};
