
import React from 'react';

interface BottomSheetContainerProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export const BottomSheetContainer: React.FC<BottomSheetContainerProps> = ({
  isOpen,
  onClose,
  title,
  children
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm" onClick={onClose}>
      <div 
        className="absolute bottom-0 left-0 right-0 bg-slate-900/95 backdrop-blur-xl rounded-t-3xl max-h-[85vh] overflow-y-auto border-t border-slate-700/50"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-slate-900/95 backdrop-blur-xl border-b border-slate-700/50 px-6 py-4 flex items-center justify-between rounded-t-3xl">
          <h2 className="text-xl font-bold text-white">{title}</h2>
          <button 
            onClick={onClose}
            className="w-10 h-10 rounded-2xl bg-slate-800/60 border border-slate-700/50 flex items-center justify-center text-slate-300 hover:text-white hover:bg-slate-700/60 transition-all duration-200"
          >
            ✕
          </button>
        </div>
        <div className="p-4">
          {children}
        </div>
      </div>
    </div>
  );
};
