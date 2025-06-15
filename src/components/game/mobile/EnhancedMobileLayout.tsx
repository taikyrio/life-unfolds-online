
import React, { useState } from 'react';
import { Character } from '../../../types/game';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { 
  Plus, 
  Heart, 
  Briefcase, 
  GraduationCap, 
  Home,
  Menu,
  Activity,
  DollarSign,
  Settings
} from 'lucide-react';

interface EnhancedMobileLayoutProps {
  character: Character;
  activeTab: 'life' | 'activities' | 'careers' | 'relationships' | 'assets' | 'education';
  onTabChange: (tab: 'life' | 'activities' | 'careers' | 'relationships' | 'assets' | 'education') => void;
  onAgeUp: () => void;
  onShowActivityMenu: () => void;
  onShowRelationshipsMenu: () => void;
  onShowAssetsMenu: () => void;
  onShowPersonalitySkills: () => void;
  ageHistory: Record<number, string[]>;
  eventHistory?: string[];
}

export const EnhancedMobileLayout: React.FC<EnhancedMobileLayoutProps> = ({
  character,
  activeTab,
  onTabChange,
  onAgeUp,
  onShowActivityMenu,
  onShowRelationshipsMenu,
  onShowAssetsMenu,
  onShowPersonalitySkills,
  ageHistory,
  eventHistory = []
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const stats = [
    { label: 'Health', value: character.health, color: 'from-red-500 to-pink-500', emoji: '❤️' },
    { label: 'Happy', value: character.happiness, color: 'from-yellow-500 to-orange-500', emoji: '😊' },
    { label: 'Smart', value: character.smarts, color: 'from-blue-500 to-indigo-500', emoji: '🧠' },
    { label: 'Looks', value: character.looks, color: 'from-purple-500 to-pink-500', emoji: '✨' },
    { label: 'Money', value: Math.min(character.wealth, 100), color: 'from-green-500 to-emerald-500', emoji: '💰' }
  ];

  const getCalendarYear = (age: number) => {
    const currentYear = new Date().getFullYear();
    return currentYear - character.age + age;
  };

  const formatLifeEvents = () => {
    const events: Array<{ age: number; year: number; events: string[] }> = [];
    
    if (Object.keys(ageHistory).length === 0) {
      events.push({
        age: 0,
        year: getCalendarYear(0),
        events: [`👶 You were born as ${character.name}! Your journey begins...`]
      });
    }

    Object.entries(ageHistory)
      .sort(([ageA], [ageB]) => Number(ageB) - Number(ageA))
      .forEach(([age, ageEvents]) => {
        events.push({
          age: Number(age),
          year: getCalendarYear(Number(age)),
          events: ageEvents.length > 0 ? ageEvents : [`Nothing notable happened at age ${age}.`]
        });
      });

    return events;
  };

  const lifeEvents = formatLifeEvents();

  const navigationItems = [
    { id: 'life', label: 'Life', icon: Home, action: () => onTabChange('life') },
    { id: 'relationships', label: 'Love', icon: Heart, action: onShowRelationshipsMenu },
    { id: 'careers', label: 'Work', icon: Briefcase, action: () => onTabChange('careers') },
    { id: 'education', label: 'School', icon: GraduationCap, action: () => onTabChange('education') }
  ];

  const quickActions = [
    { label: 'Activities', icon: Activity, action: onShowActivityMenu },
    { label: 'Assets', icon: DollarSign, action: onShowAssetsMenu },
    { label: 'Skills', icon: Settings, action: onShowPersonalitySkills }
  ];

  return (
    <div className="h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 text-white overflow-hidden relative">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-purple-500/10" />
      
      {/* Header */}
      <div className="relative z-10 px-4 pt-12 pb-4 bg-gradient-to-b from-black/40 to-transparent backdrop-blur-sm">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold text-white">
              {character.name}
            </h1>
            <p className="text-white/70 text-sm">
              Age {character.age} • Living your best life
            </p>
          </div>
          
          {/* Age Up Button */}
          <Button
            onClick={onAgeUp}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-full w-14 h-14 p-0 shadow-2xl border-2 border-white/20"
          >
            <Plus size={24} strokeWidth={3} />
          </Button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-5 gap-2">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="relative mb-2">
                <div className="w-12 h-12 mx-auto bg-black/30 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/20">
                  <span className="text-lg">{stat.emoji}</span>
                </div>
                <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2">
                  <div className="w-8 h-1.5 bg-black/40 rounded-full overflow-hidden">
                    <div 
                      className={`h-full bg-gradient-to-r ${stat.color} transition-all duration-500 ease-out`}
                      style={{ width: `${stat.value}%` }}
                    />
                  </div>
                </div>
              </div>
              <span className="text-xs font-medium text-white/80">{stat.label}</span>
              <div className="text-xs font-bold text-white">{stat.value}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Life Story */}
      <div className="flex-1 px-4 pb-32 overflow-y-auto">
        <div className="space-y-4">
          {lifeEvents.map((yearData, index) => (
            <div key={`${yearData.age}-${index}`} className="group">
              <div className="bg-black/20 backdrop-blur-xl rounded-2xl border border-white/10 p-4 shadow-xl transition-all duration-300 hover:bg-black/30 hover:scale-[1.02]">
                {/* Year Header */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-bold">{yearData.age}</span>
                    </div>
                    <div>
                      <div className="text-white font-semibold">
                        Age {yearData.age}
                        {yearData.age === character.age && (
                          <span className="ml-2 px-2 py-0.5 bg-gradient-to-r from-green-500 to-teal-500 text-white text-xs rounded-full">
                            Now
                          </span>
                        )}
                      </div>
                      <div className="text-white/60 text-sm">{yearData.year}</div>
                    </div>
                  </div>
                </div>

                {/* Events */}
                <div className="space-y-2">
                  {yearData.events.map((event, eventIndex) => (
                    <div key={eventIndex} className="bg-white/5 rounded-xl p-3 border border-white/5">
                      <p className="text-white/90 text-sm leading-relaxed">{event}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-black/60 backdrop-blur-2xl border-t border-white/20">
        <div className="flex items-center justify-around px-4 py-3 pb-8">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id || 
              (activeTab === 'relationships' && item.id === 'relationships') ||
              (activeTab === 'assets' && item.id === 'assets');
            
            return (
              <button
                key={item.id}
                onClick={item.action}
                className={`flex flex-col items-center space-y-1 p-3 rounded-2xl transition-all duration-300 min-w-[60px] ${
                  isActive 
                    ? 'bg-gradient-to-br from-blue-500/30 to-purple-500/30 border border-white/20 shadow-lg' 
                    : 'hover:bg-white/10'
                }`}
              >
                <div className={`p-2 rounded-xl transition-all duration-300 ${
                  isActive 
                    ? 'bg-gradient-to-br from-blue-500 to-purple-600 shadow-lg' 
                    : 'bg-transparent'
                }`}>
                  <Icon 
                    size={20} 
                    className={`${isActive ? 'text-white' : 'text-white/70'}`}
                    strokeWidth={2.5}
                  />
                </div>
                <span className={`text-xs font-medium ${isActive ? 'text-white' : 'text-white/60'}`}>
                  {item.label}
                </span>
              </button>
            );
          })}
          
          {/* More Menu */}
          <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <SheetTrigger asChild>
              <button className="flex flex-col items-center space-y-1 p-3 rounded-2xl hover:bg-white/10 transition-all duration-300 min-w-[60px]">
                <div className="p-2 rounded-xl">
                  <Menu size={20} className="text-white/70" strokeWidth={2.5} />
                </div>
                <span className="text-xs font-medium text-white/60">More</span>
              </button>
            </SheetTrigger>
            <SheetContent 
              side="bottom" 
              className="bg-black/90 backdrop-blur-2xl border-t border-white/20 text-white"
            >
              <div className="space-y-4 pb-8">
                <div className="text-center">
                  <h3 className="text-lg font-bold text-white mb-2">Quick Actions</h3>
                  <p className="text-white/60 text-sm">{character.name} • Age {character.age}</p>
                </div>
                
                <div className="grid grid-cols-1 gap-3">
                  {quickActions.map((action, index) => {
                    const Icon = action.icon;
                    return (
                      <Button
                        key={index}
                        variant="outline"
                        className="bg-white/10 border-white/20 text-white hover:bg-white/20 h-14 text-left justify-start rounded-xl backdrop-blur-sm"
                        onClick={() => {
                          action.action();
                          setIsMenuOpen(false);
                        }}
                      >
                        <Icon className="mr-3 h-5 w-5" />
                        {action.label}
                      </Button>
                    );
                  })}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
        
        {/* Home indicator */}
        <div className="flex justify-center pb-2">
          <div className="w-32 h-1 bg-white/30 rounded-full" />
        </div>
      </div>
    </div>
  );
};
