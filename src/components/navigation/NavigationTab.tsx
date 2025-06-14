
import React from 'react';
import { LucideIcon } from 'lucide-react';

interface NavigationTabProps {
  icon: LucideIcon;
  label: string;
  isActive?: boolean;
  onClick: () => void;
}

export const NavigationTab: React.FC<NavigationTabProps> = ({
  icon: Icon,
  label,
  isActive = false,
  onClick
}) => {
  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center justify-center p-2 rounded-lg transition-all duration-200 ${
        isActive 
          ? 'bg-blue-500 text-white shadow-lg' 
          : 'text-gray-600 hover:bg-gray-100 hover:text-gray-800'
      }`}
    >
      <Icon size={20} className="mb-1" />
      <span className="text-xs font-medium">{label}</span>
    </button>
  );
};
