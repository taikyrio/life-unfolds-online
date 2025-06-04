
import React from 'react';
import { ActivityCategory } from '../../../types/activities';

interface ActivityCategoryCardProps {
  category: ActivityCategory;
  onClick: () => void;
}

export const ActivityCategoryCard: React.FC<ActivityCategoryCardProps> = ({ 
  category, 
  onClick 
}) => {
  const isDangerous = category.id === 'crime' || category.id === 'cybercrime';
  
  return (
    <button
      onClick={onClick}
      className={`activity-depth-card hover-lift group relative overflow-hidden p-6 rounded-3xl transition-all duration-300 ease-out text-left w-full ${
        isDangerous 
          ? 'bg-gradient-to-br from-red-50/90 to-red-100/50 dark:from-red-900/30 dark:to-red-800/20 border-red-200/60 dark:border-red-700/40 hover:from-red-100/90 hover:to-red-200/50 dark:hover:from-red-800/40 dark:hover:to-red-700/30' 
          : 'hover:from-blue-50/30 hover:to-indigo-50/20 dark:hover:from-blue-900/20 dark:hover:to-indigo-900/10'
      }`}
    >
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent dark:from-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Icon container with enhanced styling */}
      <div className={`relative w-20 h-20 rounded-3xl flex items-center justify-center mb-5 transition-all duration-500 group-hover:scale-110 ${
        isDangerous 
          ? 'bg-gradient-to-br from-red-100/80 to-red-200/60 dark:from-red-800/40 dark:to-red-700/30 shadow-lg shadow-red-500/20' 
          : 'bg-gradient-to-br from-gray-100/80 to-gray-200/60 dark:from-gray-700/80 dark:to-gray-600/60 shadow-lg shadow-gray-500/10'
      }`}>
        <span className="text-3xl filter drop-shadow-sm transition-transform duration-300 group-hover:scale-110">
          {category.emoji}
        </span>
        
        {/* Subtle glow effect */}
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/40 to-transparent dark:from-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      
      {/* Content with improved typography */}
      <div className="relative z-10">
        <h3 className="font-semibold text-gray-900 dark:text-white text-lg mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300 tracking-tight">
          {category.title}
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed mb-3">
          {category.activities.length} {category.activities.length === 1 ? 'activity' : 'activities'} available
        </p>
        
        {/* Activity count badge */}
        <div className="inline-flex items-center px-3 py-1.5 rounded-full bg-gray-100/80 dark:bg-gray-700/60 text-xs font-medium text-gray-600 dark:text-gray-300 border border-gray-200/50 dark:border-gray-600/50">
          {category.activities.length} {category.activities.length === 1 ? 'option' : 'options'}
        </div>
      </div>
      
      {/* Arrow indicator with animation */}
      <div className="absolute top-6 right-6 text-gray-400 dark:text-gray-500 group-hover:text-blue-500 dark:group-hover:text-blue-400 group-hover:translate-x-1 transition-all duration-300">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="m9 18 6-6-6-6"/>
        </svg>
      </div>
      
      {/* Status indicator */}
      <div className="absolute top-4 left-4">
        <div className="status-dot status-available animate-pulse" />
      </div>
    </button>
  );
};
