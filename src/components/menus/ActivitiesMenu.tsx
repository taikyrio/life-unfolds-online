
import React from 'react';
import { Character } from '../../types/game';
import { X } from 'lucide-react';

interface ActivitiesMenuProps {
  isOpen: boolean;
  onClose: () => void;
  character: Character;
  onActivity: (activityType: string, activityId: string) => void;
}

export const ActivitiesMenu: React.FC<ActivitiesMenuProps> = ({
  isOpen,
  onClose,
  character,
  onActivity
}) => {
  if (!isOpen) return null;

  const activities = [
    { id: 'gym', title: '🏋️ Go to Gym', category: 'health & fitness' },
    { id: 'study_harder', title: '📚 Study Harder', category: 'school activities' },
    { id: 'hang_friends', title: '👥 Hang with Friends', category: 'social life' },
    { id: 'meditation', title: '🧘 Meditate', category: 'health & fitness' },
    { id: 'doctor', title: '👨‍⚕️ Visit Doctor', category: 'health & fitness' },
    { id: 'party', title: '🎉 Go to Party', category: 'social life' },
    { id: 'volunteer', title: '🤝 Volunteer', category: 'social life' },
    { id: 'hobby', title: '🎨 Learn Hobby', category: 'social life' }
  ];

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-end justify-center z-50">
      <div className="bg-white rounded-t-2xl w-full max-w-md max-h-[70vh] overflow-y-auto animate-slide-in-from-bottom">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-bold">Activities</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
            <X size={20} />
          </button>
        </div>
        
        <div className="p-4 space-y-2">
          {activities.map((activity) => (
            <button
              key={activity.id}
              onClick={() => {
                onActivity(activity.category, activity.id);
                onClose();
              }}
              className="w-full text-left p-3 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div className="text-base font-medium">{activity.title}</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
