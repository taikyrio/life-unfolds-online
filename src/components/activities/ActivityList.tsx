
import React from 'react';
import { Character } from '../../types/game';
import { Activity } from './ActivityData';
import { ActivityItem } from './ActivityItem';

interface ActivityListProps {
  activities: Activity[];
  character: Character;
  onActivitySelect: (activity: Activity) => void;
}

export const ActivityList: React.FC<ActivityListProps> = ({
  activities,
  character,
  onActivitySelect
}) => {
  return (
    <div className="flex-1 p-6 overflow-y-auto">
      <div className="grid grid-cols-1 gap-4">
        {activities.map((activity) => (
          <ActivityItem
            key={activity.id}
            activity={activity}
            character={character}
            onSelect={onActivitySelect}
          />
        ))}
      </div>
    </div>
  );
};
