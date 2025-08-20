import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  Puzzle, 
  Target, 
  Zap, 
  Brain, 
  Lightbulb, 
  Star, 
  Trophy, 
  Clock,
  Users,
  RotateCcw,
  Play,
  Volume2,
  VolumeX,
  Eye,
  EyeOff,
  CheckCircle,
  XCircle
} from "lucide-react";

interface AdvancedGame {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  difficulty: 'easy' | 'medium' | 'hard' | 'expert';
  duration: number;
  points: number;
  category: 'logic' | 'creativity' | 'strategy' | 'memory' | 'speed';
  type: 'puzzle' | 'challenge' | 'simulation' | 'quiz';
}

interface GameState {
  currentLevel: number;
  score: number;
  timeLeft: number;
  hints: number;
  mistakes: number;
  completed: boolean;
}

const advancedGames: AdvancedGame[] = [
  {
    id: 'idea-patterns',
    name: 'أنماط الأفكار',
    description: 'اكتشف الأنماط المخفية في الأفكار المبتكرة',
    icon: <Puzzle className="w-6 h-6" />,
    difficulty: 'medium',
    duration: 8,
    points: 80,
    category: 'logic',
    type: 'puzzle'
  },
  {
    id: 'innovation-simulator',
    name: 'محاكي الابتكار',
    description: 'اختبر قدرتك على تطوير منتجات مبتكرة في بيئة افتراضية',
    icon: <Target className="w-6 h-6" />,
    difficulty: 'hard',
    duration: 12,
    points: 120,
    category: 'strategy',
    type: 'simulation'
  },
  {
    id: 'creative-memory',
    name: 'الذاكرة الإبداعية',
    description: 'احفظ وتذكر الأفكار الإبداعية في وقت محدد',
    icon: <Brain className="w-6 h-6" />,
    difficulty: 'medium',
    duration: 6,
    points: 70,
    category: 'memory',
    type: 'challenge'
  },
  {
    id: 'speed-ideation',
    name: 'توليد الأفكار السريع',
    description: 'أنشئ أكبر عدد من الأفكار في أقل وقت ممكن',
    icon: <Zap className="w-6 h-6" />,
    difficulty: 'easy',
    duration: 3,
    points: 50,
    category: 'speed',
    type: 'challenge'
  },
  {
    id: 'innovation-quiz',
    name: 'اختبار الابتكار',
    description: 'اختبر معرفتك بمبادئ الابتكار والإبداع',
    icon: <Lightbulb className="w-6 h-6" />,
    difficulty: 'expert',
    duration: 10,
    points: 100,
    category: 'logic',
    type: 'quiz'
  },
  {
    id: 'collaborative-puzzle',
    name: 'لغز تعاوني',
    description: 'حل الألغاز مع فريق افتراضي لتحقيق هدف مشترك',
    icon: <Users className="w-6 h-6" />,
    difficulty: 'hard',
    duration: 15,
    points: 150,
    category: 'strategy',
    type: 'puzzle'
  }
];

const quizQuestions = [
  {
    question: "ما هو أول خطوة في عملية التصميم التفكيري؟",
    options: ["التنفيذ", "التعاطف", "الاختبار", "التطوير"],
    correct: 1
  },
  {
    question: "أي من التالي ليس من مبادئ التفكير الإبداعي؟",
    options: ["التأجيل في الحكم", "البحث عن البدائل", "التسرع في الحلول", "التفكير الجانبي"],
    correct: 2
  },
  {
    question: "ما هو الهدف من تقنية العصف الذهني؟",
    options: ["انتقاد الأفكار", "توليد أكبر عدد من الأفكار", "اختيار أفضل فكرة", "تنفيذ الأفكار"],
    correct: 1
  },
  {
    question: "أي من التالي يساعد في تطوير الأفكار الإبداعية؟",
    options: ["الخوف من الفشل", "التفكير خارج الصندوق", "التقيد بالقواعد", "تجنب المخاطر"],
    correct: 1
  },
  {
    question: "ما هو دور القيود في الابتكار؟",
    options: ["إعاقة الإبداع", "تحفيز الحلول المبتكرة", "تضييق الخيارات", "إبطاء العملية"],
    correct: 1
  }
];

const patternSequences = [
  {
    sequence: ["فكرة بسيطة", "تحسين", "تكامل", "ابتكار"],
    answer: "تطور الأفكار"
  },
  {
    sequence: ["مشكلة", "تحليل", "حل", "تنفيذ"],
    answer: "حل المشكلات"
  },
  {
    sequence: ["ملاحظة", "تساؤل", "فرضية", "تجربة"],
    answer: "المنهج العلمي"
  }
];

export default function AdvancedGames() {
  const [selectedGame, setSelectedGame] = useState<AdvancedGame | null>(null);
  const [gameState, setGameState] = useState<GameState>({
    currentLevel: 1,
    score: 0,
    timeLeft: 0,
    hints: 3,
    mistakes: 0,
    completed: false
  });
  const [currentPhase, setCurrentPhase] = useState<'intro' | 'playing' | 'results'>('intro');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [_userAnswers, setUserAnswers] = useState<number[]>([]);
  const [patternAnswer, setPatternAnswer] = useState('');
  const [speedIdeas, setSpeedIdeas] = useState<string[]>([]);
  const [memoryItems, setMemoryItems] = useState<string[]>([]);
  const [showMemoryItems, setShowMemoryItems] = useState(true);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (currentPhase === 'playing' && gameState.timeLeft > 0) {
      timer = setTimeout(() => {
        setGameState(prev => ({ ...prev, timeLeft: prev.timeLeft - 1 }));
      }, 1000);
    } else if (gameState.timeLeft === 0 && currentPhase === 'playing') {
      endGame();
    }
    return () => clearTimeout(timer);
  }, [currentPhase, gameState.timeLeft]);

  const startGame = (game: AdvancedGame) => {
    setSelectedGame(game);
    setGameState({
      currentLevel: 1,
      score: 0,
      timeLeft: game.duration * 60,
      hints: 3,
      mistakes: 0,
      completed: false
    });
    setCurrentPhase('playing');
    setCurrentQuestion(0);
    setUserAnswers([]);
    setPatternAnswer('');
    setSpeedIdeas([]);
    setMemoryItems([]);
    setShowMemoryItems(true);

    // Initialize game-specific data
    if (game.id === 'creative-memory') {
      setMemoryItems([
        'تطبيق ذكي للتعلم',
        'نظام نقل مستدام',
        'حلول طاقة متجددة',
        'تكنولوجيا صحة مبتكرة',
        'منصة تعليم تفاعلية',
        'أدوات إنتاجية ذكية'
      ]);
    }
  };

  const endGame = () => {
    setCurrentPhase('results');
    setGameState(prev => ({ ...prev, completed: true }));
  };

  const handleQuizAnswer = (answerIndex: number) => {
    if (selectedGame?.id === 'innovation-quiz') {
      setUserAnswers(prev => [...prev, answerIndex]);
      const isCorrect = answerIndex === quizQuestions[currentQuestion].correct;
      
      setGameState(prev => ({
        ...prev,
        score: prev.score + (isCorrect ? 20 : 0),
        mistakes: prev.mistakes + (isCorrect ? 0 : 1)
      }));

      if (currentQuestion < quizQuestions.length - 1) {
        setCurrentQuestion(prev => prev + 1);
      } else {
        endGame();
      }
    }
  };

  const handlePatternSubmit = () => {
    if (selectedGame?.id === 'idea-patterns') {
      const currentPattern = patternSequences[gameState.currentLevel - 1];
      const isCorrect = patternAnswer.toLowerCase().includes(currentPattern.answer.toLowerCase());
      
      setGameState(prev => ({
        ...prev,
        score: prev.score + (isCorrect ? 40 : 0),
        mistakes: prev.mistakes + (isCorrect ? 0 : 1),
        currentLevel: prev.currentLevel + 1
      }));

      if (gameState.currentLevel < patternSequences.length) {
        setPatternAnswer('');
      } else {
        endGame();
      }
    }
  };

  const addSpeedIdea = (idea: string) => {
    if (selectedGame?.id === 'speed-ideation' && idea.trim()) {
      setSpeedIdeas(prev => [...prev, idea.trim()]);
      setGameState(prev => ({ ...prev, score: prev.score + 10 }));
    }
  };

  const useHint = () => {
    if (gameState.hints > 0) {
      setGameState(prev => ({ ...prev, hints: prev.hints - 1 }));
    }
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
      case 'expert': return 'text-purple-600 bg-purple-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'logic': return 'bg-blue-100 text-blue-800';
      case 'creativity': return 'bg-pink-100 text-pink-800';
      case 'strategy': return 'bg-purple-100 text-purple-800';
      case 'memory': return 'bg-green-100 text-green-800';
      case 'speed': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (currentPhase === 'intro') {
    return (
      <div className="max-w-6xl mx-auto p-6">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            🧩 الألعاب المتقدمة
          </h1>
          <p className="text-lg text-gray-600">
            اختبر قدراتك في ألعاب متقدمة تتطلب تفكيراً عميقاً ومهارات متخصصة
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {advancedGames.map((game) => (
            <motion.div
              key={game.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white rounded-xl shadow-lg p-6 border border-gray-200 hover:shadow-xl transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3 rtl:space-x-reverse">
                  <div className="p-2 bg-gradient-to-r from-purple-100 to-pink-100 rounded-lg text-purple-600">
                    {game.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">{game.name}</h3>
                </div>
              </div>

              <p className="text-gray-600 mb-4">{game.description}</p>

              <div className="flex items-center justify-between mb-4">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(game.difficulty)}`}>
                  {game.difficulty === 'easy' ? 'سهل' : 
                   game.difficulty === 'medium' ? 'متوسط' : 
                   game.difficulty === 'hard' ? 'صعب' : 'خبير'}
                </span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(game.category)}`}>
                  {game.category === 'logic' ? 'منطق' : 
                   game.category === 'creativity' ? 'إبداع' :
                   game.category === 'strategy' ? 'استراتيجية' :
                   game.category === 'memory' ? 'ذاكرة' : 'سرعة'}
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
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 px-4 rounded-lg font-medium hover:from-purple-700 hover:to-pink-700 transition-all duration-300 flex items-center justify-center space-x-2 rtl:space-x-reverse"
              >
                <Play className="w-4 h-4" />
                <span>ابدأ اللعبة</span>
              </button>
            </motion.div>
          ))}
        </div>
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
              <div className="p-3 bg-gradient-to-r from-purple-100 to-pink-100 rounded-lg text-purple-600">
                {selectedGame.icon}
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{selectedGame.name}</h1>
                <p className="text-gray-600">المستوى {gameState.currentLevel}</p>
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
                <div className="text-2xl font-bold text-red-600">{formatTime(gameState.timeLeft)}</div>
                <div className="text-sm text-gray-500">الوقت المتبقي</div>
              </div>
            </div>
          </div>

          {/* Game Stats */}
          <div className="grid grid-cols-4 gap-4 mb-6">
            <div className="text-center p-3 bg-blue-50 rounded-lg">
              <div className="text-xl font-bold text-blue-600">{gameState.score}</div>
              <div className="text-sm text-gray-600">النقاط</div>
            </div>
            <div className="text-center p-3 bg-green-50 rounded-lg">
              <div className="text-xl font-bold text-green-600">{gameState.hints}</div>
              <div className="text-sm text-gray-600">تلميحات</div>
            </div>
            <div className="text-center p-3 bg-red-50 rounded-lg">
              <div className="text-xl font-bold text-red-600">{gameState.mistakes}</div>
              <div className="text-sm text-gray-600">أخطاء</div>
            </div>
            <div className="text-center p-3 bg-purple-50 rounded-lg">
              <div className="text-xl font-bold text-purple-600">{gameState.currentLevel}</div>
              <div className="text-sm text-gray-600">المستوى</div>
            </div>
          </div>

          {/* Game Content */}
          <div className="mb-6">
            {selectedGame.id === 'innovation-quiz' && (
              <div className="space-y-6">
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">
                    السؤال {currentQuestion + 1} من {quizQuestions.length}
                  </h2>
                  <p className="text-lg text-gray-800 mb-6">
                    {quizQuestions[currentQuestion].question}
                  </p>
                  <div className="space-y-3">
                    {quizQuestions[currentQuestion].options.map((option, index) => (
                      <button
                        key={index}
                        onClick={() => handleQuizAnswer(index)}
                        className="w-full p-4 text-right bg-white rounded-lg border border-gray-200 hover:bg-blue-50 hover:border-blue-300 transition-all duration-200"
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {selectedGame.id === 'idea-patterns' && (
              <div className="space-y-6">
                <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">
                    اكتشف النمط
                  </h2>
                  <div className="bg-white rounded-lg p-4 mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-500">التسلسل:</span>
                      <span className="text-sm text-gray-500">المستوى {gameState.currentLevel}</span>
                    </div>
                    <div className="space-y-2">
                      {patternSequences[gameState.currentLevel - 1].sequence.map((item, index) => (
                        <div key={index} className="flex items-center space-x-3 rtl:space-x-reverse">
                          <span className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-medium">
                            {index + 1}
                          </span>
                          <span className="text-gray-800">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-3">
                    <input
                      type="text"
                      value={patternAnswer}
                      onChange={(e) => setPatternAnswer(e.target.value)}
                      placeholder="اكتب النمط الذي اكتشفته..."
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                    <button
                      onClick={handlePatternSubmit}
                      className="w-full px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                    >
                      تحقق من الإجابة
                    </button>
                  </div>
                </div>
              </div>
            )}

            {selectedGame.id === 'speed-ideation' && (
              <div className="space-y-6">
                <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-lg p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">
                    أنشئ أكبر عدد من الأفكار!
                  </h2>
                  <div className="flex space-x-3 rtl:space-x-reverse mb-4">
                    <input
                      type="text"
                      placeholder="اكتب فكرة سريعة..."
                      className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          addSpeedIdea(e.currentTarget.value);
                          e.currentTarget.value = '';
                        }
                      }}
                    />
                    <button
                      onClick={() => {
                        const input = document.querySelector('input[type="text"]') as HTMLInputElement;
                        if (input) {
                          addSpeedIdea(input.value);
                          input.value = '';
                        }
                      }}
                      className="px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
                    >
                      إضافة
                    </button>
                  </div>
                  <div className="bg-white rounded-lg p-4 max-h-60 overflow-y-auto">
                    <h3 className="font-medium text-gray-900 mb-3">الأفكار ({speedIdeas.length}):</h3>
                    <div className="space-y-2">
                      {speedIdeas.map((idea, index) => (
                        <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                          <span className="text-gray-800">{idea}</span>
                          <span className="text-sm text-green-600">+10 نقاط</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {selectedGame.id === 'creative-memory' && (
              <div className="space-y-6">
                <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">
                    احفظ هذه الأفكار!
                  </h2>
                  {showMemoryItems ? (
                    <div className="space-y-3">
                      {memoryItems.map((item, index) => (
                        <div key={index} className="bg-white rounded-lg p-4 border border-gray-200">
                          <div className="flex items-center justify-between">
                            <span className="text-gray-800">{item}</span>
                            <span className="text-sm text-gray-500">#{index + 1}</span>
                          </div>
                        </div>
                      ))}
                      <button
                        onClick={() => setShowMemoryItems(false)}
                        className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        جاهز للحفظ!
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <p className="text-gray-600">اكتب الأفكار التي تذكرتها:</p>
                      <div className="space-y-3">
                        {memoryItems.map((_, index) => (
                          <input
                            key={index}
                            type="text"
                            placeholder={`الفكرة رقم ${index + 1}...`}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        ))}
                      </div>
                      <button
                        onClick={endGame}
                        className="w-full px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                      >
                        تحقق من الإجابات
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Game Controls */}
          <div className="flex justify-between items-center">
            <button
              onClick={useHint}
              disabled={gameState.hints === 0}
              className="px-6 py-3 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              استخدم تلميح ({gameState.hints})
            </button>
            <button
              onClick={endGame}
              className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              إنهاء اللعبة
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (currentPhase === 'results' && selectedGame) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="w-20 h-20 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4"
            >
              <Trophy className="w-10 h-10 text-white" />
            </motion.div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">انتهت اللعبة!</h1>
            <p className="text-lg text-gray-600">نتيجة {selectedGame.name}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-3xl font-bold text-blue-600 mb-2">{gameState.score}</div>
              <div className="text-gray-600">النقاط الإجمالية</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-3xl font-bold text-green-600 mb-2">{gameState.currentLevel}</div>
              <div className="text-gray-600">المستوى المكتمل</div>
            </div>
            <div className="text-center p-4 bg-yellow-50 rounded-lg">
              <div className="text-3xl font-bold text-yellow-600 mb-2">{gameState.hints}</div>
              <div className="text-gray-600">التلميحات المتبقية</div>
            </div>
            <div className="text-center p-4 bg-red-50 rounded-lg">
              <div className="text-3xl font-bold text-red-600 mb-2">{gameState.mistakes}</div>
              <div className="text-gray-600">عدد الأخطاء</div>
            </div>
          </div>

          <div className="flex justify-center space-x-4 rtl:space-x-reverse">
            <button
              onClick={() => startGame(selectedGame)}
              className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center space-x-2 rtl:space-x-reverse"
            >
              <RotateCcw className="w-4 h-4" />
              <span>لعب مرة أخرى</span>
            </button>
            <button
              onClick={() => setCurrentPhase('intro')}
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

