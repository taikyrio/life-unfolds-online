
import React from 'react';
import { Activity, Briefcase, Users, Home, Settings } from 'lucide-react';

interface BottomNavigationProps {
  activeTab: 'life' | 'activities' | 'careers' | 'relationships' | 'assets';
  onTabChange: (tab: 'life' | 'activities' | 'careers' | 'relationships' | 'assets') => void;
}

export const BottomNavigation: React.FC<BottomNavigationProps> = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'life' as const, label: 'Life', icon: Home },
    { id: 'activities' as const, label: 'Activities', icon: Activity },
    { id: 'careers' as const, label: 'Careers', icon: Briefcase },
    { id: 'relationships' as const, label: 'Relations', icon: Users },
    { id: 'assets' as const, label: 'Assets', icon: Settings },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2 z-50">
      <div className="flex justify-around items-center max-w-6xl mx-auto">
        {tabs.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => onTabChange(id)}
            className={`flex flex-col items-center py-2 px-3 rounded-lg transition-colors ${
              activeTab === id
                ? 'text-primary bg-primary/10'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <Icon size={20} />
            <span className="text-xs mt-1 font-medium">{label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};
