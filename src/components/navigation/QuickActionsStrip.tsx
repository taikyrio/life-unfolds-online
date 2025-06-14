
import React from 'react';
import { LucideIcon } from 'lucide-react';

interface QuickAction {
  id: string;
  label: string;
  icon: LucideIcon;
  priority: 'high' | 'medium' | 'low';
  onClick: () => void;
}

interface QuickActionsStripProps {
  actions: QuickAction[];
}

export const QuickActionsStrip: React.FC<QuickActionsStripProps> = ({ actions }) => {
  if (actions.length === 0) return null;

  const getPriorityStyle = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-gradient-to-r from-red-500/20 to-orange-500/20 border-red-500/30 text-red-100';
      case 'medium':
        return 'bg-gradient-to-r from-yellow-500/20 to-amber-500/20 border-yellow-500/30 text-yellow-100';
      default:
        return 'bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border-blue-500/30 text-blue-100';
    }
  };

  return (
    <div className="fixed bottom-32 left-4 right-4 z-40">
      <div className="flex justify-center gap-2">
        {actions.map((action) => {
          const Icon = action.icon;
          return (
            <button
              key={action.id}
              onClick={action.onClick}
              className={`flex items-center gap-2 px-4 py-2 rounded-2xl backdrop-blur-xl border transition-all duration-300 hover:scale-105 active:scale-95 ${getPriorityStyle(action.priority)}`}
            >
              <Icon size={16} strokeWidth={2} />
              <span className="text-sm font-medium">{action.label}</span>
              
              {action.priority === 'high' && (
                <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
