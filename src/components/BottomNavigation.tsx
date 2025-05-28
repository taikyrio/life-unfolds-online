
import React from 'react';
import { Button } from '@/components/ui/button';
import { 
  Heart, 
  Briefcase, 
  Trophy, 
  Home, 
  Zap,
  GraduationCap
} from 'lucide-react';

interface BottomNavigationProps {
  activeTab: 'life' | 'activities' | 'careers' | 'relationships' | 'education' | 'assets';
  onTabChange: (tab: 'life' | 'activities' | 'careers' | 'relationships' | 'education' | 'assets') => void;
  onAgeUp: () => void;
}

export const BottomNavigation: React.FC<BottomNavigationProps> = ({
  activeTab,
  onTabChange,
  onAgeUp
}) => {
  const tabs = [
    { id: 'life' as const, label: 'Life', icon: Home },
    { id: 'activities' as const, label: 'Activities', icon: Zap },
    { id: 'careers' as const, label: 'Careers', icon: Briefcase },
    { id: 'relationships' as const, label: 'Love', icon: Heart },
    { id: 'education' as const, label: 'School', icon: GraduationCap },
    { id: 'assets' as const, label: 'Assets', icon: Trophy },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-2">
      <div className="flex justify-around items-center max-w-md mx-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex flex-col items-center space-y-1 p-2 rounded-lg transition-colors ${
                activeTab === tab.id
                  ? 'bg-primary text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Icon size={20} />
              <span className="text-xs font-medium">{tab.label}</span>
            </button>
          );
        })}
      </div>
      
      <div className="flex justify-center mt-3 pb-2">
        <Button
          onClick={onAgeUp}
          className="bg-red-500 hover:bg-red-600 text-white px-8 py-3 rounded-full font-bold text-lg shadow-lg"
        >
          Age +
        </Button>
      </div>
    </div>
  );
};
