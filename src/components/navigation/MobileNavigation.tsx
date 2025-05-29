
import React, { useState } from 'react';
import { 
  Home, 
  Heart, 
  Briefcase, 
  GraduationCap, 
  DollarSign, 
  Menu,
  X,
  Plus
} from 'lucide-react';
import { Character } from '../../types/game';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

interface MobileNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  character: Character;
  onAgeUp: () => void;
  onShowActivityMenu: () => void;
  onShowRelationshipsMenu: () => void;
  onShowAssetsMenu: () => void;
}

export const MobileNavigation: React.FC<MobileNavigationProps> = ({
  activeTab,
  onTabChange,
  character,
  onAgeUp,
  onShowActivityMenu,
  onShowRelationshipsMenu,
  onShowAssetsMenu
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const mainTabs = [
    { id: 'life', label: 'Life', icon: Home, action: () => onTabChange('life') },
    { id: 'relationships', label: 'Love', icon: Heart, action: onShowRelationshipsMenu },
    { id: 'careers', label: 'Career', icon: Briefcase, action: () => onTabChange('careers') },
    { id: 'education', label: 'School', icon: GraduationCap, action: () => onTabChange('education') }
  ];

  const secondaryActions = [
    { label: 'Activities', action: onShowActivityMenu },
    { label: 'Assets', action: onShowAssetsMenu },
    { label: 'Age Up', action: onAgeUp }
  ];

  return (
    <>
      {/* Bottom Navigation Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50 safe-area-pb">
        <div className="flex items-center justify-around px-2 py-3">
          {mainTabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            
            return (
              <button
                key={tab.id}
                onClick={tab.action}
                className={`flex flex-col items-center space-y-1 px-3 py-2 rounded-lg transition-colors ${
                  isActive 
                    ? 'bg-blue-100 text-blue-600' 
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                <Icon size={20} />
                <span className="text-xs font-medium">{tab.label}</span>
              </button>
            );
          })}
          
          {/* Menu Button */}
          <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <SheetTrigger asChild>
              <button className="flex flex-col items-center space-y-1 px-3 py-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100">
                <Menu size={20} />
                <span className="text-xs font-medium">More</span>
              </button>
            </SheetTrigger>
            <SheetContent side="bottom" className="h-auto">
              <div className="space-y-4 pb-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">Quick Actions</h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <X size={16} />
                  </Button>
                </div>
                
                <div className="grid grid-cols-1 gap-3">
                  {secondaryActions.map((action, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      className="justify-start h-12"
                      onClick={() => {
                        action.action();
                        setIsMenuOpen(false);
                      }}
                    >
                      {action.label === 'Age Up' && <Plus className="mr-2 h-4 w-4" />}
                      {action.label}
                    </Button>
                  ))}
                </div>
                
                <div className="text-center text-sm text-gray-500 pt-4 border-t">
                  {character.name} • Age {character.age}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
      
      {/* Floating Age Up Button (Alternative) */}
      <button
        onClick={onAgeUp}
        className="fixed bottom-20 right-4 bg-blue-600 hover:bg-blue-700 text-white rounded-full p-3 shadow-lg z-40 transition-transform hover:scale-105"
        aria-label="Age Up"
      >
        <Plus size={20} />
      </button>
    </>
  );
};
