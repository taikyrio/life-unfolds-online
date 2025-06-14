
import React, { useState } from 'react';
import { Character, GameState, LifeEvent } from '../../types/game';
import { CharacterStats } from '../CharacterStats';
import { EventOverlay } from '../EventOverlay';
import { LifeTab } from '../LifeTab';
import { ActivitiesTab } from '../ActivitiesTab';
import { ResponsiveBottomNav } from '../navigation/ResponsiveBottomNav';
import { PersonalitySkillsPanel } from '../PersonalitySkillsPanel';
import useGameLogic from '../../hooks/useGameLogic';
import { RelationshipsTab } from '../RelationshipsTab';
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
    handleActivity,
    handleCharacterUpdate,
    handleEvent
  } = useGameLogic({ gameState, onGameStateChange });

  // Add new tab for personality and skills
  const [activeBottomSheet, setActiveBottomSheet] = useState<string | null>(null);

  const handleShowActivityMenu = () => {
    setActiveBottomSheet('activities');
  };

  const handleShowRelationshipsMenu = () => {
    setActiveBottomSheet('relationships');
  };

  const handleShowAssetsMenu = () => {
    setActiveBottomSheet('assets');
  };

  const handleShowPersonalitySkills = () => {
    setActiveBottomSheet('personality-skills');
  };

  return (
    <div className="h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex flex-col overflow-hidden">
      {/* Enhanced iOS 16 + Windows 11 Header */}
      <div className="relative bg-slate-900/95 backdrop-blur-xl border-b border-slate-700/50 overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-pink-600/10"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.1),transparent_50%)]"></div>
        
        <div className="relative z-10 p-4 text-center">
          <h1 className="text-xl font-bold text-white mb-2 tracking-tight">
            {gameState.character.name}, {gameState.character.age}
          </h1>
          <CharacterStats character={gameState.character} />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto mobile-scroll">
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

      {/* Enhanced Bottom Navigation */}
      <ResponsiveBottomNav
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onAgeUp={ageUp}
        character={gameState.character}
        onShowActivityMenu={handleShowActivityMenu}
        onShowRelationshipsMenu={handleShowRelationshipsMenu}
        onShowAssetsMenu={handleShowAssetsMenu}
        onShowPersonalitySkills={handleShowPersonalitySkills}
      />

      {/* Activities Bottom Sheet */}
      {activeBottomSheet === 'activities' && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm" onClick={() => setActiveBottomSheet(null)}>
          <div 
            className="absolute bottom-0 left-0 right-0 bg-slate-900/95 backdrop-blur-xl rounded-t-3xl max-h-[85vh] overflow-y-auto border-t border-slate-700/50"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-slate-900/95 backdrop-blur-xl border-b border-slate-700/50 px-6 py-4 flex items-center justify-between rounded-t-3xl">
              <h2 className="text-xl font-bold text-white">Activities</h2>
              <button 
                onClick={() => setActiveBottomSheet(null)}
                className="w-10 h-10 rounded-2xl bg-slate-800/60 border border-slate-700/50 flex items-center justify-center text-slate-300 hover:text-white hover:bg-slate-700/60 transition-all duration-200"
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
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm" onClick={() => setActiveBottomSheet(null)}>
          <div 
            className="absolute bottom-0 left-0 right-0 bg-slate-900/95 backdrop-blur-xl rounded-t-3xl max-h-[85vh] overflow-y-auto border-t border-slate-700/50"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-slate-900/95 backdrop-blur-xl border-b border-slate-700/50 px-6 py-4 flex items-center justify-between rounded-t-3xl">
              <h2 className="text-xl font-bold text-white">Relationships</h2>
              <button 
                onClick={() => setActiveBottomSheet(null)}
                className="w-10 h-10 rounded-2xl bg-slate-800/60 border border-slate-700/50 flex items-center justify-center text-slate-300 hover:text-white hover:bg-slate-700/60 transition-all duration-200"
              >
                ✕
              </button>
            </div>
            <div className="p-4">
              <RelationshipsTab 
                character={gameState.character} 
                onCharacterUpdate={handleCharacterUpdate}
                onEvent={handleEvent}
              />
            </div>
          </div>
        </div>
      )}

      {/* Assets Bottom Sheet */}
      {activeBottomSheet === 'assets' && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm" onClick={() => setActiveBottomSheet(null)}>
          <div 
            className="absolute bottom-0 left-0 right-0 bg-slate-900/95 backdrop-blur-xl rounded-t-3xl max-h-[85vh] overflow-y-auto border-t border-slate-700/50"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-slate-900/95 backdrop-blur-xl border-b border-slate-700/50 px-6 py-4 flex items-center justify-between rounded-t-3xl">
              <h2 className="text-xl font-bold text-white">Assets</h2>
              <button 
                onClick={() => setActiveBottomSheet(null)}
                className="w-10 h-10 rounded-2xl bg-slate-800/60 border border-slate-700/50 flex items-center justify-center text-slate-300 hover:text-white hover:bg-slate-700/60 transition-all duration-200"
              >
                ✕
              </button>
            </div>
            <div className="p-4">
              <AssetsTab character={gameState.character} onCharacterUpdate={handleCharacterUpdate} />
            </div>
          </div>
        </div>
      )}

      {/* Personality & Skills Bottom Sheet */}
      {activeBottomSheet === 'personality-skills' && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm" onClick={() => setActiveBottomSheet(null)}>
          <div 
            className="absolute bottom-0 left-0 right-0 bg-slate-900/95 backdrop-blur-xl rounded-t-3xl max-h-[85vh] overflow-y-auto border-t border-slate-700/50"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-slate-900/95 backdrop-blur-xl border-b border-slate-700/50 px-6 py-4 flex items-center justify-between rounded-t-3xl">
              <h2 className="text-xl font-bold text-white">Personality & Skills</h2>
              <button 
                onClick={() => setActiveBottomSheet(null)}
                className="w-10 h-10 rounded-2xl bg-slate-800/60 border border-slate-700/50 flex items-center justify-center text-slate-300 hover:text-white hover:bg-slate-700/60 transition-all duration-200"
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
