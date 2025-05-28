
import React from 'react';
import { Activity, Briefcase, Users, Home, Settings, Plus } from 'lucide-react';

interface BottomNavigationProps {
  activeTab: 'life' | 'activities' | 'careers' | 'relationships' | 'assets';
  onTabChange: (tab: 'life' | 'activities' | 'careers' | 'relationships' | 'assets') => void;
}

export const BottomNavigation: React.FC<BottomNavigationProps> = ({ 
  activeTab, 
  onTabChange
}) => {
  const tabs = [
    { id: 'life' as const, label: 'Infant', icon: Home, color: '#FF9800' },
    { id: 'assets' as const, label: 'Assets', icon: Settings, color: '#4CAF50' },
    { id: 'relationships' as const, label: 'Relationships', icon: Users, color: '#E91E63' },
    { id: 'activities' as const, label: 'Activities', icon: Activity, color: '#9C27B0' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50">
      {/* BitLife-style bottom nav */}
      <div className="bg-slate-700 px-2 py-2">
        <div className="flex justify-around items-center max-w-6xl mx-auto">
          {tabs.slice(0, 2).map(({ id, label, icon: Icon, color }) => (
            <button
              key={id}
              onClick={() => onTabChange(id)}
              className={`flex flex-col items-center py-2 px-3 rounded-lg transition-all duration-200 ${
                activeTab === id ? 'bg-slate-600' : ''
              }`}
            >
              <Icon 
                size={22} 
                style={{ color: activeTab === id ? color : '#94A3B8' }}
              />
              <span className={`text-xs mt-1 font-medium ${
                activeTab === id ? 'text-white' : 'text-slate-400'
              }`}>
                {id === 'life' ? (activeTab === 'life' ? 'Infant' : 'Life') : label}
              </span>
            </button>
          ))}

          {/* Center Age Button - BitLife style */}
          <div className="relative -mt-4">
            <button className="w-16 h-16 bg-green-500 rounded-full shadow-lg flex flex-col items-center justify-center text-white font-bold transition-all duration-200 hover:bg-green-600 hover:scale-105 active:scale-95 border-4 border-white">
              <Plus size={18} className="mb-0.5" />
              <span className="text-xs font-bold">Age</span>
            </button>
          </div>

          {tabs.slice(2).map(({ id, label, icon: Icon, color }) => (
            <button
              key={id}
              onClick={() => onTabChange(id)}
              className={`flex flex-col items-center py-2 px-3 rounded-lg transition-all duration-200 ${
                activeTab === id ? 'bg-slate-600' : ''
              }`}
            >
              <Icon 
                size={22} 
                style={{ color: activeTab === id ? color : '#94A3B8' }}
              />
              <span className={`text-xs mt-1 font-medium ${
                activeTab === id ? 'text-white' : 'text-slate-400'
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
