
import React from 'react';
import { Plus } from 'lucide-react';

interface CenterAgeButtonProps {
  onAgeUp: () => void;
}

export const CenterAgeButton: React.FC<CenterAgeButtonProps> = ({ onAgeUp }) => {
  return (
    <button
      onClick={onAgeUp}
      className="flex flex-col items-center text-white transition-all duration-300 ease-out hover:scale-110 active:scale-95 p-3 rounded-2xl group"
    >
      <div className="relative bg-gradient-to-br from-green-400 to-emerald-600 p-4 rounded-2xl shadow-2xl shadow-green-500/40 group-hover:shadow-green-500/60 transition-all duration-300 border border-white/20 group-hover:border-white/30">
        {/* Windows 11 highlight */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-2xl" />
        <Plus size={22} className="text-white drop-shadow-lg relative z-10" strokeWidth={2.5} />
        
        {/* Pulse ring effect */}
        <div className="absolute inset-0 rounded-2xl bg-green-400/20 scale-100 group-active:scale-110 transition-transform duration-150" />
      </div>
      <span className="text-xs font-semibold mt-1 tracking-wide">Age</span>
    </button>
  );
};
