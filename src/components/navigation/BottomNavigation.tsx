
import React, { useState } from 'react';

export function BottomNavigation() {
  const [activeTab, setActiveTab] = useState('life');

  const tabs = [
    { id: 'life', label: 'Life', icon: '👤' },
    { id: 'actions', label: 'Actions', icon: '⚡' },
    { id: 'people', label: 'People', icon: '👥' },
    { id: 'achievements', label: 'Goals', icon: '🏆' },
  ];

  return (
    <div className="bg-ios-secondary border-t border-ios-separator ios-safe-area-bottom">
      <div className="flex">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 py-3 px-2 text-center ios-touch-feedback ${
              activeTab === tab.id ? 'text-ios-blue' : 'text-ios-secondary'
            }`}
          >
            <div className="text-xl mb-1">{tab.icon}</div>
            <div className="ios-caption-2 font-medium">{tab.label}</div>
          </button>
        ))}
      </div>
    </div>
  );
}
