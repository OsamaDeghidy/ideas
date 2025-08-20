import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Gamepad2, 
  Target, 
  Zap, 
  Brain, 
  Lightbulb, 
  Star, 
  Trophy, 
  Clock,
  Users,
  Sparkles,
  ArrowRight,
  RotateCcw,
  Play,
  Pause,
  Volume2,
  VolumeX
} from "lucide-react";

interface Game {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  difficulty: 'easy' | 'medium' | 'hard';
  duration: number; // in minutes
  points: number;
  category: 'brainstorming' | 'problem-solving' | 'creativity' | 'collaboration';
}

interface GameResult {
  gameId: string;
  score: number;
  timeSpent: number;
  completed: boolean;
  ideas: string[];
}

const games: Game[] = [
  {
    id: 'idea-association',
    name: 'ربط الأفكار',
    description: 'اربط بين أفكار مختلفة لإنشاء حلول مبتكرة',
    icon: <Brain className="w-6 h-6" />,
    difficulty: 'medium',
    duration: 5,
    points: 50,
    category: 'brainstorming'
  },
  {
    id: 'reverse-thinking',
    name: 'التفكير العكسي',
    description: 'ابدأ من النتيجة المطلوبة واعمل للخلف',
    icon: <RotateCcw className="w-6 h-6" />,
    difficulty: 'hard',
    duration: 7,
    points: 75,
    category: 'problem-solving'
  },
  {
    id: 'random-constraints',
    name: 'قيود عشوائية',
    description: 'أضف قيوداً عشوائية لتطوير أفكار إبداعية',
    icon: <Zap className="w-6 h-6" />,
    difficulty: 'easy',
    duration: 3,
    points: 30,
    category: 'creativity'
  },
  {
    id: 'idea-evolution',
    name: 'تطور الأفكار',
    description: 'طور فكرة بسيطة إلى حل متكامل',
    icon: <Target className="w-6 h-6" />,
    difficulty: 'medium',
    duration: 6,
    points: 60,
    category: 'problem-solving'
  },
  {
    id: 'collaborative-story',
    name: 'قصة تعاونية',
    description: 'ابنِ قصة مع فريقك حول حل مشكلة',
    icon: <Users className="w-6 h-6" />,
    difficulty: 'easy',
    duration: 4,
    points: 40,
    category: 'collaboration'
  },
  {
    id: 'idea-mashup',
    name: 'دمج الأفكار',
    description: 'اجمع بين فكرتين مختلفتين لإنشاء شيء جديد',
    icon: <Sparkles className="w-6 h-6" />,
    difficulty: 'medium',
    duration: 5,
    points: 55,
    category: 'creativity'
  }
];

const ideaPrompts = [
  'تحسين تجربة العملاء',
  'تقليل التكاليف',
  'زيادة الإنتاجية',
  'حل مشكلة بيئية',
  'تحسين التعليم',
  'تطوير التكنولوجيا',
  'تحسين الصحة',
  'حل مشكلة اجتماعية'
];

const constraints = [
  'بميزانية محدودة',
  'في وقت قصير',
  'باستخدام التكنولوجيا الحالية',
  'بدون إنترنت',
  'بمشاركة الأطفال',
  'باستخدام مواد معاد تدويرها',
  'في مكان صغير',
  'بدون كهرباء'
];

export default function IdeaGames() {
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [currentPrompt, setCurrentPrompt] = useState('');
  const [currentConstraint, setCurrentConstraint] = useState('');
  const [userIdeas, setUserIdeas] = useState<string[]>([]);
  const [gameResults, setGameResults] = useState<GameResult[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentPhase, setCurrentPhase] = useState<'intro' | 'playing' | 'results'>('intro');

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlaying && timeLeft > 0) {
      timer = setTimeout(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isPlaying) {
      endGame();
    }
    return () => clearTimeout(timer);
  }, [isPlaying, timeLeft]);

  const startGame = (game: Game) => {
    setSelectedGame(game);
    setTimeLeft(game.duration * 60);
    setIsPlaying(true);
    setCurrentPhase('playing');
    setUserIdeas([]);
    setShowResults(false);
    
    // Set random prompt and constraint
    setCurrentPrompt(ideaPrompts[Math.floor(Math.random() * ideaPrompts.length)]);
    setCurrentConstraint(constraints[Math.floor(Math.random() * constraints.length)]);
  };

  const endGame = () => {
    setIsPlaying(false);
    setCurrentPhase('results');
    
    if (selectedGame) {
      const result: GameResult = {
        gameId: selectedGame.id,
        score: calculateScore(),
        timeSpent: selectedGame.duration * 60 - timeLeft,
        completed: true,
        ideas: userIdeas
      };
      setGameResults(prev => [...prev, result]);
    }
  };

  const calculateScore = () => {
    if (!selectedGame) return 0;
    const baseScore = selectedGame.points;
    const ideaBonus = userIdeas.length * 10;
    const timeBonus = Math.floor((selectedGame.duration * 60 - timeLeft) / 60) * 5;
    return baseScore + ideaBonus + timeBonus;
  };

  const addIdea = (idea: string) => {
    if (idea.trim() && isPlaying) {
      setUserIdeas(prev => [...prev, idea.trim()]);
    }
  };

  const resetGame = () => {
    setSelectedGame(null);
    setIsPlaying(false);
    setTimeLeft(0);
    setCurrentPrompt('');
    setCurrentConstraint('');
    setUserIdeas([]);
    setShowResults(false);
    setCurrentPhase('intro');
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'text-green-600 bg-green-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'hard': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'brainstorming': return 'bg-blue-100 text-blue-800';
      case 'problem-solving': return 'bg-purple-100 text-purple-800';
      case 'creativity': return 'bg-pink-100 text-pink-800';
      case 'collaboration': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (currentPhase === 'intro') {
    return (
      <div className="max-w-6xl mx-auto p-6">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            🎮 ألعاب الأفكار التفاعلية
          </h1>
          <p className="text-lg text-gray-600">
            اختبر قدراتك الإبداعية وحسّن مهارات حل المشكلات من خلال ألعاب تفاعلية ممتعة
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {games.map((game) => (
            <motion.div
              key={game.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white rounded-xl shadow-lg p-6 border border-gray-200 hover:shadow-xl transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3 rtl:space-x-reverse">
                  <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
                    {game.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">{game.name}</h3>
                </div>
              </div>

              <p className="text-gray-600 mb-4">{game.description}</p>

              <div className="flex items-center justify-between mb-4">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(game.difficulty)}`}>
                  {game.difficulty === 'easy' ? 'سهل' : game.difficulty === 'medium' ? 'متوسط' : 'صعب'}
                </span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(game.category)}`}>
                  {game.category === 'brainstorming' ? 'عصف ذهني' : 
                   game.category === 'problem-solving' ? 'حل مشكلات' :
                   game.category === 'creativity' ? 'إبداع' : 'تعاون'}
                </span>
              </div>

              <div className="flex items-center justify-between mb-4 text-sm text-gray-500">
                <span className="flex items-center">
                  <Clock className="w-4 h-4 mr-1" />
                  {game.duration} دقيقة
                </span>
                <span className="flex items-center">
                  <Trophy className="w-4 h-4 mr-1" />
                  {game.points} نقطة
                </span>
              </div>

              <button
                onClick={() => startGame(game)}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-300 flex items-center justify-center space-x-2 rtl:space-x-reverse"
              >
                <Play className="w-4 h-4" />
                <span>ابدأ اللعبة</span>
              </button>
            </motion.div>
          ))}
        </div>

        {gameResults.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">نتائج الألعاب السابقة</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {gameResults.slice(-6).map((result, index) => {
                const game = games.find(g => g.id === result.gameId);
                return (
                  <div key={index} className="bg-white rounded-lg p-4 border border-gray-200">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-gray-900">{game?.name}</h3>
                      <span className="text-sm text-gray-500">{formatTime(result.timeSpent)}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-blue-600">{result.score} نقطة</span>
                      <span className="text-sm text-gray-500">{result.ideas.length} فكرة</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    );
  }

  if (currentPhase === 'playing' && selectedGame) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-white rounded-xl shadow-lg p-6">
          {/* Game Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4 rtl:space-x-reverse">
              <div className="p-3 bg-blue-100 rounded-lg text-blue-600">
                {selectedGame.icon}
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{selectedGame.name}</h1>
                <p className="text-gray-600">{selectedGame.description}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4 rtl:space-x-reverse">
              <button
                onClick={() => setIsMuted(!isMuted)}
                className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
              >
                {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
              </button>
              <div className="text-center">
                <div className="text-2xl font-bold text-red-600">{formatTime(timeLeft)}</div>
                <div className="text-sm text-gray-500">الوقت المتبقي</div>
              </div>
            </div>
          </div>

          {/* Game Challenge */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6 mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">التحدي الحالي:</h2>
            <div className="space-y-3">
              <div className="bg-white rounded-lg p-4 border-l-4 border-blue-500">
                <h3 className="font-medium text-gray-900 mb-2">المشكلة:</h3>
                <p className="text-gray-700">{currentPrompt}</p>
              </div>
              <div className="bg-white rounded-lg p-4 border-l-4 border-purple-500">
                <h3 className="font-medium text-gray-900 mb-2">القيود:</h3>
                <p className="text-gray-700">{currentConstraint}</p>
              </div>
            </div>
          </div>

          {/* Idea Input */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">أضف أفكارك:</h3>
            <div className="flex space-x-3 rtl:space-x-reverse">
              <input
                type="text"
                placeholder="اكتب فكرتك هنا..."
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    addIdea(e.currentTarget.value);
                    e.currentTarget.value = '';
                  }
                }}
              />
              <button
                onClick={() => {
                  const input = document.querySelector('input[type="text"]') as HTMLInputElement;
                  if (input) {
                    addIdea(input.value);
                    input.value = '';
                  }
                }}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                إضافة
              </button>
            </div>
          </div>

          {/* Ideas List */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              أفكارك ({userIdeas.length}):
            </h3>
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {userIdeas.map((idea, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-gray-50 rounded-lg p-3 border border-gray-200"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-gray-800">{idea}</span>
                    <span className="text-sm text-gray-500">#{index + 1}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Game Controls */}
          <div className="flex justify-between items-center">
            <button
              onClick={resetGame}
              className="px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
            >
              إلغاء اللعبة
            </button>
            <button
              onClick={endGame}
              className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              إنهاء اللعبة
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (currentPhase === 'results' && selectedGame) {
    const result = gameResults[gameResults.length - 1];
    const score = result?.score || 0;
    
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="w-20 h-20 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4"
            >
              <Trophy className="w-10 h-10 text-white" />
            </motion.div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">انتهت اللعبة!</h1>
            <p className="text-lg text-gray-600">نتيجة {selectedGame.name}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-3xl font-bold text-blue-600 mb-2">{score}</div>
              <div className="text-gray-600">النقاط الإجمالية</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-3xl font-bold text-green-600 mb-2">{userIdeas.length}</div>
              <div className="text-gray-600">عدد الأفكار</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-3xl font-bold text-purple-600 mb-2">{formatTime(result?.timeSpent || 0)}</div>
              <div className="text-gray-600">الوقت المستغرق</div>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">الأفكار التي أنشأتها:</h2>
            <div className="space-y-3">
              {userIdeas.map((idea, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-800">{idea}</span>
                    <div className="flex items-center space-x-2 rtl:space-x-reverse">
                      <Star className="w-4 h-4 text-yellow-500" />
                      <span className="text-sm text-gray-500">+10 نقاط</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-center space-x-4 rtl:space-x-reverse">
            <button
              onClick={() => startGame(selectedGame)}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2 rtl:space-x-reverse"
            >
              <RotateCcw className="w-4 h-4" />
              <span>لعب مرة أخرى</span>
            </button>
            <button
              onClick={resetGame}
              className="px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
            >
              العودة للقائمة
            </button>
          </div>
        </div>
      </div>
    );
  }

  return null;
}

