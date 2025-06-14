
import React from 'react';

interface NavigationTooltipProps {
  tooltip: string;
}

export const NavigationTooltip: React.FC<NavigationTooltipProps> = ({ tooltip }) => {
  return (
    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-3 px-3 py-2 bg-gray-800/95 backdrop-blur-sm text-white text-xs rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none whitespace-nowrap shadow-xl border border-white/10">
      {tooltip}
      <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-800/95" />
    </div>
  );
};
