
import React, { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Progress } from '../ui/progress';
import { Badge } from '../ui/badge';
import { 
  MiniGame, 
  MiniGameSession, 
  MiniGameResult, 
  miniGameManager 
} from '../../systems/miniGameSystem';
import { Character } from '../../types/game';
import { Clock, Target, Star, Trophy, Zap } from 'lucide-react';

interface MiniGamePlayerProps {
  character: Character;
  gameId: string;
  onComplete: (result: MiniGameResult) => void;
  onClose: () => void;
}

export const MiniGamePlayer: React.FC<MiniGamePlayerProps> = ({
  character,
  gameId,
  onComplete,
  onClose
}) => {
  const [game, setGame] = useState<MiniGame | null>(null);
  const [session, setSession] = useState<MiniGameSession | null>(null);
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [currentChallenge, setCurrentChallenge] = useState<any>(null);

  // Piano Game State
  const [pianoKeys, setPianoKeys] = useState<{ [key: string]: boolean }>({});
  const [fallingNotes, setFallingNotes] = useState<Array<{ id: string; key: string; position: number }>>([]);

  // Memory Game State
  const [memorySequence, setMemorySequence] = useState<number[]>([]);
  const [playerSequence, setPlayerSequence] = useState<number[]>([]);
  const [showingSequence, setShowingSequence] = useState(false);

  // Math Game State
  const [mathProblem, setMathProblem] = useState<{ question: string; answer: number } | null>(null);
  const [mathAnswer, setMathAnswer] = useState('');

  useEffect(() => {
    const gameData = miniGameManager.getMiniGameById(gameId);
    if (gameData) {
      setGame(gameData);
      setTimeLeft(gameData.duration);
    }
  }, [gameId]);

  const startGame = () => {
    if (!game) return;
    
    const newSession = miniGameManager.startMiniGame(gameId, character.id);
    setSession(newSession);
    setGameStarted(true);
    
    // Initialize game-specific state
    switch (game.gameType) {
      case 'timing':
        initializePianoGame();
        break;
      case 'memory':
        initializeMemoryGame();
        break;
      case 'puzzle':
        initializeMathGame();
        break;
    }
  };

  const initializePianoGame = () => {
    // Start piano game with falling notes
    const noteInterval = setInterval(() => {
      if (timeLeft > 0) {
        const keys = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
        const randomKey = keys[Math.floor(Math.random() * keys.length)];
        const newNote = {
          id: `note_${Date.now()}`,
          key: randomKey,
          position: 0
        };
        setFallingNotes(prev => [...prev, newNote]);
      }
    }, 1000);

    return () => clearInterval(noteInterval);
  };

  const initializeMemoryGame = () => {
    // Generate first sequence
    const sequence = [Math.floor(Math.random() * 4)];
    setMemorySequence(sequence);
    setShowingSequence(true);
    
    setTimeout(() => {
      setShowingSequence(false);
    }, sequence.length * 1000);
  };

  const initializeMathGame = () => {
    generateMathProblem();
  };

  const generateMathProblem = () => {
    const operations = ['+', '-', '*'];
    const operation = operations[Math.floor(Math.random() * operations.length)];
    let a = Math.floor(Math.random() * 50) + 1;
    let b = Math.floor(Math.random() * 50) + 1;
    let answer = 0;

    switch (operation) {
      case '+':
        answer = a + b;
        break;
      case '-':
        if (a < b) [a, b] = [b, a]; // Ensure positive result
        answer = a - b;
        break;
      case '*':
        a = Math.floor(Math.random() * 12) + 1;
        b = Math.floor(Math.random() * 12) + 1;
        answer = a * b;
        break;
    }

    setMathProblem({
      question: `${a} ${operation} ${b} = ?`,
      answer
    });
  };

  const handlePianoKey = (key: string) => {
    // Check if there's a falling note for this key
    const hitNote = fallingNotes.find(note => 
      note.key === key && note.position >= 80 && note.position <= 100
    );
    
    if (hitNote) {
      miniGameManager.updateScore(character.id, 10);
      setFallingNotes(prev => prev.filter(note => note.id !== hitNote.id));
      setPianoKeys(prev => ({ ...prev, [key]: true }));
      
      setTimeout(() => {
        setPianoKeys(prev => ({ ...prev, [key]: false }));
      }, 200);
    }
  };

  const handleMemoryInput = (index: number) => {
    if (showingSequence) return;
    
    const newPlayerSequence = [...playerSequence, index];
    setPlayerSequence(newPlayerSequence);
    
    // Check if sequence matches so far
    if (newPlayerSequence[newPlayerSequence.length - 1] !== memorySequence[newPlayerSequence.length - 1]) {
      // Wrong sequence
      miniGameManager.updateScore(character.id, -5);
      setPlayerSequence([]);
      return;
    }
    
    // Check if sequence is complete
    if (newPlayerSequence.length === memorySequence.length) {
      miniGameManager.updateScore(character.id, memorySequence.length * 5);
      // Generate next sequence
      const nextSequence = [...memorySequence, Math.floor(Math.random() * 4)];
      setMemorySequence(nextSequence);
      setPlayerSequence([]);
      setShowingSequence(true);
      
      setTimeout(() => {
        setShowingSequence(false);
      }, nextSequence.length * 1000);
    }
  };

  const handleMathSubmit = () => {
    if (!mathProblem) return;
    
    const playerAnswer = parseInt(mathAnswer);
    if (playerAnswer === mathProblem.answer) {
      miniGameManager.updateScore(character.id, 15);
      generateMathProblem();
      setMathAnswer('');
    } else {
      miniGameManager.updateScore(character.id, -3);
    }
  };

  // Timer effect
  useEffect(() => {
    if (gameStarted && timeLeft > 0) {
      const timer = setTimeout(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (gameStarted && timeLeft === 0) {
      endGame();
    }
  }, [gameStarted, timeLeft]);

  // Update falling notes position
  useEffect(() => {
    if (game?.gameType === 'timing' && gameStarted) {
      const interval = setInterval(() => {
        setFallingNotes(prev => 
          prev.map(note => ({ ...note, position: note.position + 2 }))
              .filter(note => note.position < 100)
        );
      }, 50);
      return () => clearInterval(interval);
    }
  }, [game, gameStarted]);

  const endGame = () => {
    if (!session) return;
    
    const result = miniGameManager.completeMiniGame(character.id);
    if (result) {
      onComplete(result);
    }
  };

  const renderGameContent = () => {
    if (!game || !gameStarted) return null;

    switch (game.gameType) {
      case 'timing':
        return (
          <div className="space-y-4">
            <div className="text-center text-sm text-gray-600">
              Press the keys when notes reach the bottom line!
            </div>
            
            {/* Piano Keys */}
            <div className="relative h-64 bg-gray-100 rounded-lg overflow-hidden">
              {/* Falling Notes */}
              {fallingNotes.map(note => (
                <div
                  key={note.id}
                  className="absolute w-8 h-4 bg-blue-500 rounded"
                  style={{
                    left: `${['C', 'D', 'E', 'F', 'G', 'A', 'B'].indexOf(note.key) * 14.28}%`,
                    top: `${note.position}%`,
                    transform: 'translateX(-50%)'
                  }}
                />
              ))}
              
              {/* Target Line */}
              <div className="absolute bottom-12 w-full h-1 bg-red-500" />
              
              {/* Piano Keys */}
              <div className="absolute bottom-0 w-full h-12 flex">
                {['C', 'D', 'E', 'F', 'G', 'A', 'B'].map(key => (
                  <button
                    key={key}
                    className={`flex-1 border border-gray-300 text-xs font-semibold transition-colors ${
                      pianoKeys[key] ? 'bg-blue-300' : 'bg-white hover:bg-gray-50'
                    }`}
                    onMouseDown={() => handlePianoKey(key)}
                  >
                    {key}
                  </button>
                ))}
              </div>
            </div>
          </div>
        );

      case 'memory':
        return (
          <div className="space-y-4">
            <div className="text-center text-sm text-gray-600">
              {showingSequence ? 'Watch the sequence...' : 'Repeat the sequence!'}
            </div>
            
            <div className="grid grid-cols-2 gap-4 max-w-xs mx-auto">
              {[0, 1, 2, 3].map(index => (
                <button
                  key={index}
                  className={`w-20 h-20 rounded-lg font-bold text-white transition-all ${
                    showingSequence && memorySequence[playerSequence.length] === index
                      ? 'bg-yellow-400 scale-110'
                      : index === 0 ? 'bg-red-500 hover:bg-red-600'
                      : index === 1 ? 'bg-blue-500 hover:bg-blue-600'
                      : index === 2 ? 'bg-green-500 hover:bg-green-600'
                      : 'bg-purple-500 hover:bg-purple-600'
                  }`}
                  onClick={() => handleMemoryInput(index)}
                  disabled={showingSequence}
                >
                  {index + 1}
                </button>
              ))}
            </div>
            
            <div className="text-center text-sm">
              Sequence Length: {memorySequence.length}
            </div>
          </div>
        );

      case 'puzzle':
        return (
          <div className="space-y-4">
            <div className="text-center text-sm text-gray-600">
              Solve the math problems as quickly as possible!
            </div>
            
            {mathProblem && (
              <div className="text-center space-y-4">
                <div className="text-3xl font-bold">
                  {mathProblem.question}
                </div>
                
                <div className="flex justify-center gap-2">
                  <input
                    type="number"
                    value={mathAnswer}
                    onChange={(e) => setMathAnswer(e.target.value)}
                    className="w-24 p-2 text-center border rounded"
                    placeholder="?"
                    onKeyPress={(e) => e.key === 'Enter' && handleMathSubmit()}
                  />
                  <Button onClick={handleMathSubmit}>Submit</Button>
                </div>
              </div>
            )}
          </div>
        );

      default:
        return <div>Game type not implemented</div>;
    }
  };

  if (!game) {
    return <div>Loading game...</div>;
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="flex items-center gap-2">
            <Zap className="h-5 w-5" />
            {game.name}
          </span>
          <Button variant="outline" size="sm" onClick={onClose}>
            Close
          </Button>
        </CardTitle>
        <div className="text-sm text-gray-600">{game.description}</div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {!gameStarted ? (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <strong>Difficulty:</strong> {game.difficulty}
              </div>
              <div>
                <strong>Duration:</strong> {game.duration}s
              </div>
              <div>
                <strong>Category:</strong> {game.category}
              </div>
              <div>
                <strong>Type:</strong> {game.gameType}
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="font-medium">Instructions:</div>
              <div className="text-sm text-gray-600">{game.instructions}</div>
            </div>
            
            <div className="space-y-2">
              <div className="font-medium">Potential Rewards:</div>
              <div className="flex flex-wrap gap-1">
                {game.rewards.stats && Object.entries(game.rewards.stats).map(([stat, value]) => (
                  <Badge key={stat} variant="outline">
                    {stat}: +{value}
                  </Badge>
                ))}
                {game.rewards.money && (
                  <Badge variant="outline">Money: +${game.rewards.money}</Badge>
                )}
                {game.rewards.experience && (
                  <Badge variant="outline">XP: +{game.rewards.experience}</Badge>
                )}
              </div>
            </div>
            
            <Button onClick={startGame} className="w-full">
              <Target className="h-4 w-4 mr-2" />
              Start Game
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span className="text-sm">Time: {timeLeft}s</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="h-4 w-4" />
                <span className="text-sm">Score: {session?.score || 0}</span>
              </div>
            </div>
            
            <Progress value={(1 - timeLeft / game.duration) * 100} className="h-2" />
            
            {renderGameContent()}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default MiniGamePlayer;
