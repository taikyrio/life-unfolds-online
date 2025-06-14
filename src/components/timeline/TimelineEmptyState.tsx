
import React from 'react';

export const TimelineEmptyState: React.FC = () => {
  return (
    <div className="h-full flex flex-col items-center justify-center text-center p-8 bg-gradient-to-b from-blue-50 to-white">
      <div className="text-6xl mb-4">👶</div>
      <h3 className="text-xl font-bold text-gray-800 mb-2">Welcome to Life!</h3>
      <p className="text-gray-600 mb-4">Your story begins now. Every choice matters.</p>
      <div className="bg-blue-100 rounded-lg p-3 text-sm text-blue-800">
        Tap "Age" to start your journey and see your life unfold
      </div>
    </div>
  );
};
