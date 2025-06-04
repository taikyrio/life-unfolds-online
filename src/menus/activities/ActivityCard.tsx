
import React from 'react';
import { ActivityOption } from '../../../types/activities';
import { Character } from '../../../types/game';

interface ActivityCardProps {
  activity: ActivityOption;
  category: string;
  character: Character;
  canUse: boolean;
  requirementText: string;
  onClick: () => void;
}

export const ActivityCard: React.FC<ActivityCardProps> = ({ 
  activity, 
  category, 
  character, 
  canUse, 
  requirementText, 
  onClick 
}) => {
  const isDangerous = category === 'crime' || category === 'cybercrime';
  
  return (
    <button
      className={`activity-depth-card hover-lift group relative overflow-hidden p-6 rounded-3xl transition-all duration-300 ease-out text-left w-full ${
        canUse 
          ? `${
              isDangerous 
                ? 'bg-gradient-to-br from-red-50/90 to-red-100/50 dark:from-red-900/30 dark:to-red-800/20 border-red-200/60 dark:border-red-700/40 hover:from-red-100/90 hover:to-red-200/50 dark:hover:from-red-800/40 dark:hover:to-red-700/30 shadow-lg shadow-red-500/10' 
                : 'hover:from-blue-50/30 hover:to-indigo-50/20 dark:hover:from-blue-900/20 dark:hover:to-indigo-900/10 shadow-lg hover:shadow-xl'
            } active:scale-[0.97]` 
          : 'bg-gray-50/80 dark:bg-gray-900/40 border-gray-200/40 dark:border-gray-800/40 opacity-60 cursor-not-allowed shadow-sm'
      }`}
      onClick={() => canUse && onClick()}
      disabled={!canUse}
    >
      {/* Background effects */}
      {canUse && (
        <>
          <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent dark:from-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-600/0 via-blue-600/5 to-purple-600/0 dark:from-blue-400/0 dark:via-blue-400/5 dark:to-purple-400/0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />
        </>
      )}
      
      {/* Status indicator */}
      <div className="absolute top-4 right-4">
        <div className={`status-dot ${canUse ? 'status-available' : 'status-locked'}`} />
      </div>
      
      {/* Icon container with enhanced styling */}
      <div className={`relative w-16 h-16 rounded-2xl flex items-center justify-center mb-5 transition-all duration-500 ${
        canUse ? 'group-hover:scale-110' : ''
      } ${
        canUse 
          ? isDangerous 
            ? 'bg-gradient-to-br from-red-100/80 to-red-200/60 dark:from-red-800/40 dark:to-red-700/30 shadow-md shadow-red-500/20' 
            : 'bg-gradient-to-br from-blue-100/80 to-indigo-100/60 dark:from-blue-800/40 dark:to-indigo-800/30 shadow-md shadow-blue-500/20'
          : 'bg-gray-100/60 dark:bg-gray-800/40 shadow-sm'
      }`}>
        <span className={`text-2xl transition-all duration-300 ${
          canUse 
            ? 'filter drop-shadow-sm group-hover:scale-110' 
            : 'grayscale opacity-60'
        }`}>
          {activity.emoji}
        </span>
        
        {/* Icon glow effect */}
        {canUse && (
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/30 to-transparent dark:from-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        )}
      </div>
      
      {/* Content */}
      <div className="relative z-10 space-y-3">
        <h3 className={`font-semibold text-base leading-tight transition-colors duration-300 ${
          canUse 
            ? 'text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400' 
            : 'text-gray-500 dark:text-gray-400'
        }`}>
          {activity.title}
        </h3>
        
        <p className={`text-sm leading-relaxed ${
          canUse 
            ? 'text-gray-600 dark:text-gray-300' 
            : 'text-gray-400 dark:text-gray-500'
        }`}>
          {activity.description}
        </p>
        
        {/* Requirements section */}
        {!canUse && requirementText && (
          <div className="mt-4">
            <div className="requirement-badge requirement-badge-error">
              <svg className="w-3 h-3 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.732 15.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
              {requirementText}
            </div>
          </div>
        )}
        
        {/* Available indicator */}
        {canUse && (
          <div className="flex items-center justify-between mt-4">
            <div className="requirement-badge requirement-badge-success">
              <svg className="w-3 h-3 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Available
            </div>
            
            {/* Action hint */}
            <div className="text-xs text-gray-400 dark:text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              Tap to use
            </div>
          </div>
        )}
      </div>
      
      {/* Subtle accent line */}
      {canUse && (
        <div className={`absolute bottom-0 left-6 right-6 h-0.5 rounded-full transition-all duration-300 ${
          isDangerous 
            ? 'bg-gradient-to-r from-red-400/0 via-red-400/50 to-red-400/0' 
            : 'bg-gradient-to-r from-blue-400/0 via-blue-400/50 to-blue-400/0'
        } opacity-0 group-hover:opacity-100`} />
      )}
    </button>
  );
};
