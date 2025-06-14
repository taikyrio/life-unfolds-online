
import React from 'react';
import { LucideIcon } from 'lucide-react';

interface QuickAction {
  id: string;
  label: string;
  icon: LucideIcon;
  priority: 'high' | 'medium' | 'low';
  onClick: () => void;
}

interface ContextualQuickActionsProps {
  actions: QuickAction[];
}

export const ContextualQuickActions: React.FC<ContextualQuickActionsProps> = ({ actions }) => {
  if (actions.length === 0) return null;

  const getPriorityConfig = (priority: string) => {
    switch (priority) {
      case 'high':
        return {
          bg: 'bg-slate-800/90',
          border: 'border-red-500/40',
          text: 'text-red-100',
          shadow: 'shadow-red-500/20'
        };
      case 'medium':
        return {
          bg: 'bg-slate-800/90',
          border: 'border-amber-500/40',
          text: 'text-amber-100',
          shadow: 'shadow-amber-500/20'
        };
      default:
        return {
          bg: 'bg-slate-800/90',
          border: 'border-blue-500/40',
          text: 'text-blue-100',
          shadow: 'shadow-blue-500/20'
        };
    }
  };

  return (
    <div className="fixed bottom-28 left-4 right-4 z-40">
      <div className="flex justify-center gap-2">
        {actions.slice(0, 3).map((action) => {
          const Icon = action.icon;
          const config = getPriorityConfig(action.priority);
          
          return (
            <button
              key={action.id}
              onClick={action.onClick}
              className={`flex items-center gap-2 px-3 py-2 rounded-xl backdrop-blur-xl border transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg ${config.bg} ${config.border} ${config.text} ${config.shadow}`}
            >
              <Icon size={14} strokeWidth={2} />
              <span className="text-sm font-medium">{action.label}</span>
              
              {action.priority === 'high' && (
                <div className="w-1.5 h-1.5 bg-red-400 rounded-full animate-pulse" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
