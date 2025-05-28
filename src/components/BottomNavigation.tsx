
import React from 'react';
import { Activity, Briefcase, Users, Home, Settings, Plus } from 'lucide-react';

interface BottomNavigationProps {
  activeTab: 'life' | 'activities' | 'careers' | 'relationships' | 'assets';
  onTabChange: (tab: 'life' | 'activities' | 'careers' | 'relationships' | 'assets') => void;
  onAgeUp?: () => void;
}

export const BottomNavigation: React.FC<BottomNavigationProps> = ({ 
  activeTab, 
  onTabChange, 
  onAgeUp 
}) => {
  const tabs = [
    { id: 'life' as const, label: 'Life', icon: Home, color: 'text-blue-500' },
    { id: 'assets' as const, label: 'Assets', icon: Settings, color: 'text-green-500' },
    { id: 'relationships' as const, label: 'Relationships', icon: Users, color: 'text-pink-500' },
    { id: 'activities' as const, label: 'Activities', icon: Activity, color: 'text-purple-500' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50">
      {/* Background with blur effect */}
      <div className="absolute inset-0 bg-white/90 backdrop-blur-xl border-t border-gray-200" />
      
      <div className="relative px-6 py-3">
        <div className="flex justify-around items-center max-w-6xl mx-auto">
          {tabs.slice(0, 2).map(({ id, label, icon: Icon, color }) => (
            <button
              key={id}
              onClick={() => onTabChange(id)}
              className={`flex flex-col items-center py-2 px-4 rounded-xl transition-all duration-200 ${
                activeTab === id
                  ? 'bg-gray-100 scale-105'
                  : 'hover:bg-gray-50'
              }`}
            >
              <Icon 
                size={24} 
                className={activeTab === id ? color : 'text-gray-400'} 
              />
              <span className={`text-xs mt-1 font-medium ${
                activeTab === id ? 'text-gray-800' : 'text-gray-500'
              }`}>
                {label}
              </span>
            </button>
          ))}

          {/* Center Age Button */}
          <button
            onClick={onAgeUp}
            className="relative -mt-6 w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-full shadow-lg flex flex-col items-center justify-center text-white font-bold transition-all duration-200 hover:from-green-500 hover:to-green-700 hover:scale-105 active:scale-95 border-4 border-white"
          >
            <Plus size={20} className="mb-0.5" />
            <span className="text-xs font-semibold">Age</span>
          </button>

          {tabs.slice(2).map(({ id, label, icon: Icon, color }) => (
            <button
              key={id}
              onClick={() => onTabChange(id)}
              className={`flex flex-col items-center py-2 px-4 rounded-xl transition-all duration-200 ${
                activeTab === id
                  ? 'bg-gray-100 scale-105'
                  : 'hover:bg-gray-50'
              }`}
            >
              <Icon 
                size={24} 
                className={activeTab === id ? color : 'text-gray-400'} 
              />
              <span className={`text-xs mt-1 font-medium ${
                activeTab === id ? 'text-gray-800' : 'text-gray-500'
              }`}>
                {label}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
