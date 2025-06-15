
import React from 'react';
import { Character } from '../../../../types/game';
import { ActivitiesMenu } from '../../../menus/ActivitiesMenu';

interface ActionsPageProps {
  character: Character;
  onActivity: (activityType: string, activityId: string | object) => void;
  onClose: () => void;
  onActivityComplete?: () => void;
}

export const ActionsPage: React.FC<ActionsPageProps> = ({
  character,
  onActivity,
  onClose,
  onActivityComplete
}) => {
  return (
    <div className="h-full bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 text-white overflow-hidden">
      {/* Header */}
      <div className="px-4 pt-12 pb-4 bg-gradient-to-b from-black/40 to-transparent backdrop-blur-sm">
        <div>
          <h1 className="text-2xl font-bold text-white">Actions</h1>
          <p className="text-white/70 text-sm">Choose what to do</p>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        <ActivitiesMenu
          character={character}
          onActivity={onActivity}
          onClose={onClose}
          onActivityComplete={onActivityComplete}
          isOpen={true}
        />
      </div>
    </div>
  );
};
