import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Users, 
  Target, 
  Zap, 
  Brain, 
  Lightbulb, 
  Star, 
  Trophy, 
  Clock,
  MessageCircle,
  Send,
  UserPlus,
  Sparkles,
  ArrowRight,
  RotateCcw,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Eye,
  EyeOff,
  Timer,
  CheckCircle,
  XCircle,
  AlertCircle,
  Heart,
  ThumbsUp,
  Share2
} from "lucide-react";

interface TeamMember {
  id: string;
  name: string;
  avatar: string;
  role: 'leader' | 'member' | 'observer';
  points: number;
  isOnline: boolean;
}

interface CollaborativeGame {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  minPlayers: number;
  maxPlayers: number;
  duration: number;
  points: number;
  category: 'brainstorming' | 'problem-solving' | 'creativity' | 'strategy';
  type: 'real-time' | 'turn-based' | 'continuous';
}

interface GameSession {
  id: string;
  game: CollaborativeGame;
  players: TeamMember[];
  status: 'waiting' | 'playing' | 'completed';
  startTime: Date;
  endTime?: Date;
  sharedIdeas: string[];
  votes: Record<string, number>;
}

const collaborativeGames: CollaborativeGame[] = [
  {
    id: 'idea-chain',
    name: 'سلسلة الأفكار',
    description: 'ابنِ على أفكار الآخرين لإنشاء حلول متكاملة',
    icon: <Users className="w-6 h-6" />,
    minPlayers: 3,
    maxPlayers: 8,
    duration: 10,
    points: 100,
    category: 'brainstorming',
    type: 'turn-based'
  },
  {
    id: 'innovation-challenge',
    name: 'تحدي الابتكار',
    description: 'تنافس مع فريقك لحل مشكلة معقدة',
    icon: <Target className="w-6 h-6" />,
    minPlayers: 4,
    maxPlayers: 12,
    duration: 15,
    points: 150,
    category: 'problem-solving',
    type: 'real-time'
  },
  {
    id: 'creative-synthesis',
    name: 'التوليف الإبداعي',
    description: 'اجمع بين أفكار مختلفة لإنشاء شيء جديد',
    icon: <Sparkles className="w-6 h-6" />,
    minPlayers: 2,
    maxPlayers: 6,
    duration: 8,
    points: 80,
    category: 'creativity',
    type: 'continuous'
  },
  {
    id: 'strategy-workshop',
    name: 'ورشة الاستراتيجية',
    description: 'طور استراتيجيات مبتكرة مع فريقك',
    icon: <Brain className="w-6 h-6" />,
    minPlayers: 5,
    maxPlayers: 15,
    duration: 20,
    points: 200,
    category: 'strategy',
    type: 'real-time'
  }
];

const sampleTeamMembers: TeamMember[] = [
  {
    id: '1',
    name: 'أحمد محمد',
    avatar: '👨‍💼',
    role: 'leader',
    points: 250,
    isOnline: true
  },
  {
    id: '2',
    name: 'فاطمة علي',
    avatar: '👩‍💻',
    role: 'member',
    points: 180,
    isOnline: true
  },
  {
    id: '3',
    name: 'محمد حسن',
    avatar: '👨‍🎨',
    role: 'member',
    points: 120,
    isOnline: false
  },
  {
    id: '4',
    name: 'سارة أحمد',
    avatar: '👩‍🔬',
    role: 'member',
    points: 95,
    isOnline: true
  }
];

export default function CollaborativeGames() {
  const [selectedGame, setSelectedGame] = useState<CollaborativeGame | null>(null);
  const [currentSession, setCurrentSession] = useState<GameSession | null>(null);
  const [currentPhase, setCurrentPhase] = useState<'lobby' | 'waiting' | 'playing' | 'results'>('lobby');
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>(sampleTeamMembers);
  const [newIdea, setNewIdea] = useState('');
  const [sharedIdeas, setSharedIdeas] = useState<string[]>([]);
  const [currentTurn, setCurrentTurn] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [chatMessages, setChatMessages] = useState<Array<{id: string, user: string, message: string, timestamp: Date}>>([]);
  const [newMessage, setNewMessage] = useState('');
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (currentPhase === 'playing' && timeLeft > 0) {
      timer = setTimeout(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && currentPhase === 'playing') {
      endGame();
    }
    return () => clearTimeout(timer);
  }, [currentPhase, timeLeft]);

  const startGame = (game: CollaborativeGame) => {
    setSelectedGame(game);
    setCurrentSession({
      id: `session-${Date.now()}`,
      game,
      players: teamMembers,
      status: 'waiting',
      startTime: new Date(),
      sharedIdeas: [],
      votes: {}
    });
    setCurrentPhase('waiting');
    setTimeLeft(game.duration * 60);
    setSharedIdeas([]);
    setCurrentTurn(0);
    setChatMessages([]);
  };

  const joinGame = () => {
    if (currentSession) {
      setCurrentSession(prev => prev ? { ...prev, status: 'playing' } : null);
      setCurrentPhase('playing');
    }
  };

  const endGame = () => {
    if (currentSession) {
      setCurrentSession(prev => prev ? { ...prev, status: 'completed', endTime: new Date() } : null);
      setCurrentPhase('results');
    }
  };

  const addIdea = () => {
    if (newIdea.trim() && currentPhase === 'playing') {
      setSharedIdeas(prev => [...prev, newIdea.trim()]);
      setNewIdea('');
      
      // Add to chat
      setChatMessages(prev => [...prev, {
        id: `msg-${Date.now()}`,
        user: 'أنت',
        message: `أضاف فكرة: ${newIdea.trim()}`,
        timestamp: new Date()
      }]);
    }
  };

  const sendMessage = () => {
    if (newMessage.trim()) {
      setChatMessages(prev => [...prev, {
        id: `msg-${Date.now()}`,
        user: 'أنت',
        message: newMessage.trim(),
        timestamp: new Date()
      }]);
      setNewMessage('');
    }
  };

  const voteForIdea = (ideaIndex: number) => {
    if (currentSession) {
      const ideaId = `idea-${ideaIndex}`;
      setCurrentSession(prev => prev ? {
        ...prev,
        votes: {
          ...prev.votes,
          [ideaId]: (prev.votes[ideaId] || 0) + 1
        }
      } : null);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'brainstorming': return 'bg-blue-100 text-blue-800';
      case 'problem-solving': return 'bg-purple-100 text-purple-800';
      case 'creativity': return 'bg-pink-100 text-pink-800';
      case 'strategy': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (currentPhase === 'lobby') {
    return (
      <div className="max-w-6xl mx-auto p-6">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            🎮 الألعاب التعاونية
          </h1>
          <p className="text-lg text-gray-600">
            العب مع فريقك وطور أفكاراً مبتكرة من خلال التعاون الجماعي
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {collaborativeGames.map((game) => (
            <motion.div
              key={game.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white rounded-xl shadow-lg p-6 border border-gray-200 hover:shadow-xl transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3 rtl:space-x-reverse">
                  <div className="p-2 bg-gradient-to-r from-green-100 to-blue-100 rounded-lg text-green-600">
                    {game.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">{game.name}</h3>
                </div>
              </div>

              <p className="text-gray-600 mb-4">{game.description}</p>

              <div className="flex items-center justify-between mb-4">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(game.category)}`}>
                  {game.category === 'brainstorming' ? 'عصف ذهني' : 
                   game.category === 'problem-solving' ? 'حل مشكلات' :
                   game.category === 'creativity' ? 'إبداع' : 'استراتيجية'}
                </span>
                <span className="text-sm text-gray-500">
                  {game.minPlayers}-{game.maxPlayers} لاعبين
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
                className="w-full bg-gradient-to-r from-green-600 to-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:from-green-700 hover:to-blue-700 transition-all duration-300 flex items-center justify-center space-x-2 rtl:space-x-reverse"
              >
                <Play className="w-4 h-4" />
                <span>ابدأ اللعبة</span>
              </button>
            </motion.div>
          ))}
        </div>

        {/* Team Members */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">أعضاء الفريق</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {teamMembers.map((member) => (
              <div key={member.id} className="bg-white rounded-lg p-4 border border-gray-200">
                <div className="flex items-center space-x-3 rtl:space-x-reverse mb-3">
                  <div className="text-2xl">{member.avatar}</div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{member.name}</h3>
                    <p className="text-sm text-gray-500">{member.role === 'leader' ? 'قائد' : 'عضو'}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">{member.points} نقطة</span>
                  <div className={`w-2 h-2 rounded-full ${member.isOnline ? 'bg-green-500' : 'bg-gray-400'}`}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (currentPhase === 'waiting' && currentSession) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">في انتظار اللاعبين...</h1>
            <p className="text-gray-600">{currentSession.game.name}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">اللاعبون المتصلون ({currentSession.players.length})</h3>
              <div className="space-y-3">
                {currentSession.players.map((player) => (
                  <div key={player.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3 rtl:space-x-reverse">
                      <div className="text-xl">{player.avatar}</div>
                      <div>
                        <p className="font-medium text-gray-900">{player.name}</p>
                        <p className="text-sm text-gray-500">{player.role === 'leader' ? 'قائد' : 'عضو'}</p>
                      </div>
                    </div>
                    <div className={`w-3 h-3 rounded-full ${player.isOnline ? 'bg-green-500' : 'bg-gray-400'}`}></div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">معلومات اللعبة</h3>
              <div className="space-y-3">
                <div className="p-3 bg-blue-50 rounded-lg">
                  <p className="text-sm text-gray-600">اللاعبون المطلوبون</p>
                  <p className="font-semibold text-gray-900">{currentSession.game.minPlayers}-{currentSession.game.maxPlayers}</p>
                </div>
                <div className="p-3 bg-green-50 rounded-lg">
                  <p className="text-sm text-gray-600">مدة اللعبة</p>
                  <p className="font-semibold text-gray-900">{currentSession.game.duration} دقيقة</p>
                </div>
                <div className="p-3 bg-purple-50 rounded-lg">
                  <p className="text-sm text-gray-600">النقاط المتوقعة</p>
                  <p className="font-semibold text-gray-900">{currentSession.game.points} نقطة</p>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center">
            <button
              onClick={joinGame}
              disabled={currentSession.players.length < currentSession.game.minPlayers}
              className="px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {currentSession.players.length >= currentSession.game.minPlayers ? 'ابدأ اللعبة' : `انتظر ${currentSession.game.minPlayers - currentSession.players.length} لاعبين آخرين`}
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (currentPhase === 'playing' && currentSession) {
    return (
      <div className="max-w-6xl mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Game Area */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">{currentSession.game.name}</h1>
                  <p className="text-gray-600">الوقت المتبقي: {formatTime(timeLeft)}</p>
                </div>
                <div className="flex items-center space-x-4 rtl:space-x-reverse">
                  <button
                    onClick={() => setIsMuted(!isMuted)}
                    className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
                  >
                    {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                  </button>
                  <div className="text-center">
                    <div className="text-xl font-bold text-blue-600">{sharedIdeas.length}</div>
                    <div className="text-sm text-gray-500">أفكار مشتركة</div>
                  </div>
                </div>
              </div>

              {/* Idea Input */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">أضف فكرة جديدة:</h3>
                <div className="flex space-x-3 rtl:space-x-reverse">
                  <input
                    type="text"
                    value={newIdea}
                    onChange={(e) => setNewIdea(e.target.value)}
                    placeholder="اكتب فكرتك هنا..."
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        addIdea();
                      }
                    }}
                  />
                  <button
                    onClick={addIdea}
                    className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    إضافة
                  </button>
                </div>
              </div>

              {/* Shared Ideas */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">الأفكار المشتركة:</h3>
                <div className="space-y-3 max-h-60 overflow-y-auto">
                  {sharedIdeas.map((idea, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-gray-50 rounded-lg p-4 border border-gray-200"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-gray-800">{idea}</span>
                        <div className="flex items-center space-x-2 rtl:space-x-reverse">
                          <button
                            onClick={() => voteForIdea(index)}
                            className="p-1 text-gray-500 hover:text-red-500 transition-colors"
                          >
                            <Heart className="w-4 h-4" />
                          </button>
                          <span className="text-sm text-gray-500">
                            {currentSession.votes[`idea-${index}`] || 0}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              <button
                onClick={endGame}
                className="w-full px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                إنهاء اللعبة
              </button>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Team Members */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">الفريق</h3>
              <div className="space-y-3">
                {currentSession.players.map((player) => (
                  <div key={player.id} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-2 rtl:space-x-reverse">
                      <div className="text-lg">{player.avatar}</div>
                      <div>
                        <p className="font-medium text-gray-900 text-sm">{player.name}</p>
                        <p className="text-xs text-gray-500">{player.points} نقطة</p>
                      </div>
                    </div>
                    <div className={`w-2 h-2 rounded-full ${player.isOnline ? 'bg-green-500' : 'bg-gray-400'}`}></div>
                  </div>
                ))}
              </div>
            </div>

            {/* Chat */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">المحادثة</h3>
              <div className="space-y-3 mb-4 max-h-40 overflow-y-auto">
                {chatMessages.map((msg) => (
                  <div key={msg.id} className="text-sm">
                    <span className="font-medium text-blue-600">{msg.user}:</span>
                    <span className="text-gray-700 mr-2">{msg.message}</span>
                  </div>
                ))}
              </div>
              <div className="flex space-x-2 rtl:space-x-reverse">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="اكتب رسالة..."
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      sendMessage();
                    }
                  }}
                />
                <button
                  onClick={sendMessage}
                  className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (currentPhase === 'results' && currentSession) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="w-20 h-20 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4"
            >
              <Trophy className="w-10 h-10 text-white" />
            </motion.div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">انتهت اللعبة!</h1>
            <p className="text-lg text-gray-600">نتيجة {currentSession.game.name}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-3xl font-bold text-blue-600 mb-2">{sharedIdeas.length}</div>
              <div className="text-gray-600">الأفكار المشتركة</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-3xl font-bold text-green-600 mb-2">{currentSession.players.length}</div>
              <div className="text-gray-600">عدد المشاركين</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-3xl font-bold text-purple-600 mb-2">{currentSession.game.points}</div>
              <div className="text-gray-600">النقاط المكتسبة</div>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">أفضل الأفكار:</h2>
            <div className="space-y-3">
              {sharedIdeas
                .map((idea, index) => ({
                  idea,
                  votes: currentSession.votes[`idea-${index}`] || 0,
                  index
                }))
                .sort((a, b) => b.votes - a.votes)
                .slice(0, 5)
                .map((item, rank) => (
                  <div key={item.index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3 rtl:space-x-reverse">
                      <span className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-medium">
                        {rank + 1}
                      </span>
                      <span className="text-gray-800">{item.idea}</span>
                    </div>
                    <div className="flex items-center space-x-2 rtl:space-x-reverse">
                      <Heart className="w-4 h-4 text-red-500" />
                      <span className="text-sm text-gray-600">{item.votes}</span>
                    </div>
                  </div>
                ))}
            </div>
          </div>

          <div className="flex justify-center space-x-4 rtl:space-x-reverse">
            <button
              onClick={() => setCurrentPhase('lobby')}
              className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2 rtl:space-x-reverse"
            >
              <RotateCcw className="w-4 h-4" />
              <span>لعبة جديدة</span>
            </button>
            <button
              onClick={() => setCurrentPhase('lobby')}
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

