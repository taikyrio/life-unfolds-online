
import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Play, RotateCcw } from "lucide-react";

const Index = () => {
  const [, setLocation] = useLocation();
  const [hasExistingGame, setHasExistingGame] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('gameState');
    setHasExistingGame(!!saved);
  }, []);

  const startNewGame = () => {
    // Clear any existing game state
    localStorage.removeItem('gameState');
    setLocation('/game/life');
  };

  const continueGame = () => {
    setLocation('/game/life');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 text-white flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-black/20 backdrop-blur-xl border-white/10 text-white">
        <CardHeader className="text-center pb-6">
          <div className="text-6xl mb-4">🎭</div>
          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Life Unfolds
          </CardTitle>
          <p className="text-white/70 mt-2">
            Live your virtual life, make choices, and see how your story unfolds
          </p>
        </CardHeader>
        
        <CardContent className="space-y-4">
          {hasExistingGame ? (
            <>
              <Button 
                onClick={continueGame}
                className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white py-3 text-lg"
              >
                <Play className="mr-2 h-5 w-5" />
                Continue Game
              </Button>
              
              <Button 
                onClick={startNewGame}
                variant="outline"
                className="w-full border-white/20 bg-white/5 hover:bg-white/10 text-white py-3"
              >
                <RotateCcw className="mr-2 h-4 w-4" />
                Start New Game
              </Button>
            </>
          ) : (
            <Button 
              onClick={startNewGame}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 text-lg"
            >
              <Play className="mr-2 h-5 w-5" />
              Start New Life
            </Button>
          )}
          
          <div className="text-center text-sm text-white/50 pt-4">
            <p>Your choices shape your virtual destiny</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Index;
