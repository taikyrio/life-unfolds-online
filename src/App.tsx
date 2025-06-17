
import React from 'react';
import { GameProvider } from './contexts/GameContext';
import { MobileGameApp } from './components/MobileGameApp';
import './styles/ios-native.css';

function App() {
  return (
    <GameProvider>
      <div className="min-h-screen bg-ios-background">
        <MobileGameApp />
      </div>
    </GameProvider>
  );
}

export default App;
