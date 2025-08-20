"use client"

import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Trophy,
  Star,
  Award,
  Crown,
  Target,
  Zap,
  Gift,
  TrendingUp,
  Users,
  Flame,
  Diamond,
  ThumbsUp,
  MessageCircle,
  Lightbulb,
  CheckCircle,
  Plus,
  ChevronRight,
  ArrowUp,
  BarChart3,
  Coins
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

// أنواع البيانات
interface Achievement {
  id: string
  title: string
  description: string
  icon: React.ComponentType<any>
  category: 'ideas' | 'collaboration' | 'leadership' | 'innovation' | 'consistency'
  rarity: 'common' | 'rare' | 'epic' | 'legendary'
  points: number
  unlockedAt?: Date
  isUnlocked: boolean
  progress: number
  requirement: number
  rewards: Reward[]
}

interface Reward {
  type: 'points' | 'badge' | 'privilege' | 'gift'
  value: string | number
  description: string
}

interface Level {
  level: number
  title: string
  minPoints: number
  maxPoints: number
  icon: React.ComponentType<any>
  color: string
  privileges: string[]
  nextLevelRequirement: number
}

interface LeaderboardEntry {
  rank: number
  userId: string
  name: string
  avatar: string
  department: string
  points: number
  level: Level
  weeklyPoints: number
  monthlyPoints: number
  streak: number
  badges: string[]
  isCurrentUser?: boolean
}

interface DailyChallenge {
  id: string
  title: string
  description: string
  icon: React.ComponentType<any>
  difficulty: 'easy' | 'medium' | 'hard'
  points: number
  deadline: Date
  isCompleted: boolean
  progress: number
  requirement: number
  category: string
}

// المستويات
const levels: Level[] = [
  {
    level: 1,
    title: "مبتدئ الأفكار",
    minPoints: 0,
    maxPoints: 99,
    icon: Lightbulb,
    color: "gray",
    privileges: ["إضافة الأفكار", "التصويت"],
    nextLevelRequirement: 100
  },
  {
    level: 2,
    title: "مطور الأفكار", 
    minPoints: 100,
    maxPoints: 299,
    icon: Star,
    color: "blue",
    privileges: ["إضافة الأفكار", "التصويت", "التعليق"],
    nextLevelRequirement: 300
  },
  {
    level: 3,
    title: "خبير الابتكار",
    minPoints: 300,
    maxPoints: 599,
    icon: Award,
    color: "green",
    privileges: ["إضافة الأفكار", "التصويت", "التعليق", "إنشاء المجموعات"],
    nextLevelRequirement: 600
  },
  {
    level: 4,
    title: "رائد الإبداع",
    minPoints: 600,
    maxPoints: 999,
    icon: Crown,
    color: "purple",
    privileges: ["جميع المميزات", "تقييم الأفكار", "إدارة التحديات"],
    nextLevelRequirement: 1000
  },
  {
    level: 5,
    title: "أسطورة الابتكار",
    minPoints: 1000,
    maxPoints: 9999,
    icon: Diamond,
    color: "yellow",
    privileges: ["جميع المميزات", "إرشاد الآخرين", "اقتراح التطويرات"],
    nextLevelRequirement: 0
  }
]

// الإنجازات
const achievements: Achievement[] = [
  {
    id: "first_idea",
    title: "أول خطوة",
    description: "قدم فكرتك الأولى",
    icon: Lightbulb,
    category: "ideas",
    rarity: "common",
    points: 10,
    isUnlocked: true,
    progress: 1,
    requirement: 1,
    unlockedAt: new Date("2024-01-15"),
    rewards: [
      { type: "points", value: 10, description: "10 نقاط إضافية" },
      { type: "badge", value: "مبتدئ", description: "شارة المبتدئ" }
    ]
  },
  {
    id: "idea_master",
    title: "سيد الأفكار",
    description: "قدم 50 فكرة",
    icon: Crown,
    category: "ideas",
    rarity: "epic",
    points: 500,
    isUnlocked: true,
    progress: 50,
    requirement: 50,
    unlockedAt: new Date("2024-01-20"),
    rewards: [
      { type: "points", value: 500, description: "500 نقطة إضافية" },
      { type: "badge", value: "سيد الأفكار", description: "لقب خاص" },
      { type: "privilege", value: "تقييم_الأفكار", description: "إمكانية تقييم أفكار الآخرين" }
    ]
  },
  {
    id: "team_player",
    title: "روح الفريق",
    description: "تعاون مع 20 شخص مختلف",
    icon: Users,
    category: "collaboration",
    rarity: "rare",
    points: 200,
    isUnlocked: false,
    progress: 12,
    requirement: 20,
    rewards: [
      { type: "points", value: 200, description: "200 نقطة" },
      { type: "privilege", value: "إنشاء_مجموعات", description: "إنشاء مجموعات عمل" }
    ]
  },
  {
    id: "streak_master",
    title: "المثابر",
    description: "حافظ على نشاط لمدة 30 يوم متتالي",
    icon: Flame,
    category: "consistency",
    rarity: "legendary",
    points: 1000,
    isUnlocked: false,
    progress: 15,
    requirement: 30,
    rewards: [
      { type: "points", value: 1000, description: "1000 نقطة!" },
      { type: "badge", value: "المثابر الذهبي", description: "شارة ذهبية نادرة" },
      { type: "gift", value: "قسيمة_شراء", description: "قسيمة شراء بقيمة 500 ريال" }
    ]
  },
  {
    id: "innovation_genius",
    title: "عبقري الابتكار", 
    description: "احصل على متوسط تقييم 9+ في 10 أفكار",
    icon: Diamond,
    category: "innovation",
    rarity: "legendary",
    points: 2000,
    isUnlocked: false,
    progress: 3,
    requirement: 10,
    rewards: [
      { type: "points", value: 2000, description: "2000 نقطة!" },
      { type: "badge", value: "عبقري الابتكار", description: "لقب نادر جداً" },
      { type: "privilege", value: "مرشد_رسمي", description: "لقب مرشد رسمي للمنصة" }
    ]
  }
]

// التحديات اليومية
const dailyChallenges: DailyChallenge[] = [
  {
    id: "daily_idea",
    title: "فكرة اليوم",
    description: "اقترح فكرة جديدة اليوم",
    icon: Lightbulb,
    difficulty: "easy",
    points: 20,
    deadline: new Date(Date.now() + 24 * 60 * 60 * 1000),
    isCompleted: false,
    progress: 0,
    requirement: 1,
    category: "أفكار"
  },
  {
    id: "social_voter",
    title: "صوت اجتماعي",
    description: "صوت على 5 أفكار لزملائك",
    icon: ThumbsUp,
    difficulty: "easy",
    points: 15,
    deadline: new Date(Date.now() + 24 * 60 * 60 * 1000),
    isCompleted: true,
    progress: 5,
    requirement: 5,
    category: "تفاعل"
  },
  {
    id: "comment_guru",
    title: "خبير التعليقات",
    description: "اكتب 3 تعليقات بناءة",
    icon: MessageCircle,
    difficulty: "medium",
    points: 30,
    deadline: new Date(Date.now() + 24 * 60 * 60 * 1000),
    isCompleted: false,
    progress: 1,
    requirement: 3,
    category: "تفاعل"
  }
]

// لوحة الصدارة
const leaderboard: LeaderboardEntry[] = [
  {
    rank: 1,
    userId: "1",
    name: "أحمد محمد",
    avatar: "/avatar1.jpg",
    department: "تقنية المعلومات",
    points: 2847,
    level: levels[4],
    weeklyPoints: 245,
    monthlyPoints: 892,
    streak: 28,
    badges: ["سيد الأفكار", "المثابر", "روح الفريق"],
    isCurrentUser: true
  },
  {
    rank: 2,
    userId: "2", 
    name: "سارة أحمد",
    avatar: "/avatar2.jpg",
    department: "التسويق",
    points: 2156,
    level: levels[3],
    weeklyPoints: 189,
    monthlyPoints: 734,
    streak: 15,
    badges: ["خبيرة التعاون", "مبدعة الأسبوع"]
  },
  {
    rank: 3,
    userId: "3",
    name: "محمد علي",
    avatar: "/avatar3.jpg", 
    department: "المبيعات",
    points: 1934,
    level: levels[3],
    weeklyPoints: 156,
    monthlyPoints: 623,
    streak: 12,
    badges: ["محفز الفريق", "نجم المبيعات"]
  }
]

export default function GamificationSystem() {
  const [activeTab, setActiveTab] = useState<'overview' | 'achievements' | 'leaderboard' | 'challenges'>('overview')
  const [selectedAchievement, setSelectedAchievement] = useState<Achievement | null>(null)
  const [userPoints, _setUserPoints] = useState(2847)
  const [userLevel, _setUserLevel] = useState(levels[4])
  const [userStreak, _setUserStreak] = useState(28)

  // دالة تحديد لون الندرة
  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'text-gray-600 bg-gray-100'
      case 'rare': return 'text-blue-600 bg-blue-100'
      case 'epic': return 'text-purple-600 bg-purple-100'
      case 'legendary': return 'text-yellow-600 bg-yellow-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  // دالة تحديد لون الصعوبة
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'text-green-600 bg-green-100'
      case 'medium': return 'text-yellow-600 bg-yellow-100'
      case 'hard': return 'text-red-600 bg-red-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  return (
    <div className="space-y-6 p-6">
      {/* عنوان القسم */}
      <div className="text-center">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">
          نظام التحفيز والإنجازات
        </h2>
        <p className="text-gray-600 mt-2">اربح النقاط واحصل على الإنجازات وتنافس مع زملائك</p>
      </div>

      {/* بطاقة ملف المستخدم */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl shadow-lg text-white p-6"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-6 rtl:space-x-reverse">
            <div className="relative">
              <div className="w-20 h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                <userLevel.icon className="w-10 h-10 text-white" />
              </div>
              <div className="absolute -top-2 -right-2 bg-red-500 rounded-full px-2 py-1 text-xs font-bold">
                {userLevel.level}
              </div>
            </div>
            
            <div>
              <h3 className="text-2xl font-bold">أحمد محمد</h3>
              <p className="text-lg opacity-90">{userLevel.title}</p>
              <div className="flex items-center space-x-4 rtl:space-x-reverse mt-2">
                <div className="flex items-center space-x-2 rtl:space-x-reverse">
                  <Coins className="w-5 h-5" />
                  <span className="font-medium">{userPoints.toLocaleString()} نقطة</span>
                </div>
                <div className="flex items-center space-x-2 rtl:space-x-reverse">
                  <Flame className="w-5 h-5" />
                  <span className="font-medium">{userStreak} يوم متتالي</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="text-right">
            <div className="text-3xl font-bold">#{leaderboard[0].rank}</div>
            <div className="text-lg opacity-90">في المقدمة</div>
            <div className="mt-2">
              <Progress 
                value={((userPoints - userLevel.minPoints) / (userLevel.maxPoints - userLevel.minPoints)) * 100} 
                className="w-32"
              />
              <div className="text-sm opacity-75 mt-1">
                {userLevel.level < 5 ? `${userLevel.nextLevelRequirement - userPoints} نقطة للمستوى التالي` : 'المستوى الأقصى'}
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* التبويبات */}
      <div className="flex space-x-1 rtl:space-x-reverse bg-white rounded-lg p-1 shadow-sm">
        {[
          { id: 'overview', label: 'نظرة عامة', icon: BarChart3 },
          { id: 'achievements', label: 'الإنجازات', icon: Trophy },
          { id: 'leaderboard', label: 'لوحة الصدارة', icon: Crown },
          { id: 'challenges', label: 'التحديات اليومية', icon: Target }
        ].map((tab) => {
          const TabIcon = tab.icon
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all flex items-center justify-center space-x-2 rtl:space-x-reverse ${
                activeTab === tab.id 
                  ? 'bg-yellow-500 text-white shadow-sm' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <TabIcon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          )
        })}
      </div>

      {/* محتوى التبويبات */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* إحصائيات سريعة */}
          <div className="lg:col-span-2 space-y-6">
            {/* إحصائيات النقاط */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold text-yellow-600">{userPoints.toLocaleString()}</div>
                  <div className="text-sm text-gray-600">إجمالي النقاط</div>
                  <div className="flex items-center justify-center mt-2 text-green-600">
                    <ArrowUp className="w-4 h-4 mr-1" />
                    <span className="text-xs">+245 هذا الأسبوع</span>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold text-blue-600">{achievements.filter(a => a.isUnlocked).length}</div>
                  <div className="text-sm text-gray-600">إنجازات مكتملة</div>
                  <div className="text-xs text-gray-500 mt-2">
                    من أصل {achievements.length} إنجاز
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold text-red-600">{userStreak}</div>
                  <div className="text-sm text-gray-600">أيام متتالية</div>
                  <div className="flex items-center justify-center mt-2">
                    <Flame className="w-4 h-4 text-red-500 mr-1" />
                    <span className="text-xs text-red-600">سلسلة نشطة!</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* آخر الإنجازات */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 rtl:space-x-reverse">
                  <Award className="w-5 h-5 text-yellow-500" />
                  <span>آخر الإنجازات</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {achievements.filter(a => a.isUnlocked).slice(0, 3).map((achievement) => {
                    const AchievementIcon = achievement.icon
                    return (
                      <div key={achievement.id} className="flex items-center space-x-3 rtl:space-x-reverse p-3 bg-yellow-50 rounded-lg">
                        <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                          <AchievementIcon className="w-6 h-6 text-yellow-600" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-800">{achievement.title}</h4>
                          <p className="text-sm text-gray-600">{achievement.description}</p>
                          {achievement.unlockedAt && (
                            <p className="text-xs text-gray-500">
                              حققت في {achievement.unlockedAt.toLocaleDateString('ar')}
                            </p>
                          )}
                        </div>
                        <Badge className={getRarityColor(achievement.rarity)}>
                          +{achievement.points}
                        </Badge>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* التحديات السريعة */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 rtl:space-x-reverse">
                  <Target className="w-5 h-5 text-blue-500" />
                  <span>تحديات اليوم</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {dailyChallenges.slice(0, 2).map((challenge) => {
                    const ChallengeIcon = challenge.icon
                    return (
                      <div key={challenge.id} className="border border-gray-200 rounded-lg p-3">
                        <div className="flex items-center space-x-3 rtl:space-x-reverse mb-2">
                          <ChallengeIcon className="w-5 h-5 text-blue-500" />
                          <div className="flex-1">
                            <h5 className="font-medium text-sm">{challenge.title}</h5>
                            <p className="text-xs text-gray-600">{challenge.description}</p>
                          </div>
                          <Badge className={getDifficultyColor(challenge.difficulty)}>
                            +{challenge.points}
                          </Badge>
                        </div>
                        
                        <div className="space-y-1">
                          <div className="flex justify-between text-xs">
                            <span>التقدم</span>
                            <span>{challenge.progress}/{challenge.requirement}</span>
                          </div>
                          <Progress 
                            value={(challenge.progress / challenge.requirement) * 100} 
                            className="h-2"
                          />
                        </div>
                        
                        {challenge.isCompleted && (
                          <div className="flex items-center justify-center mt-2 text-green-600">
                            <CheckCircle className="w-4 h-4 mr-1" />
                            <span className="text-xs">مكتمل!</span>
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
                
                <Button 
                  className="w-full mt-4"
                  onClick={() => setActiveTab('challenges')}
                >
                  عرض جميع التحديات
                </Button>
              </CardContent>
            </Card>

            {/* ترتيب سريع */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 rtl:space-x-reverse">
                  <Crown className="w-5 h-5 text-purple-500" />
                  <span>ترتيبك</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-4xl font-bold text-purple-600 mb-2">#{leaderboard[0].rank}</div>
                  <div className="text-sm text-gray-600 mb-4">من أصل {leaderboard.length + 50} مشارك</div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>هذا الأسبوع</span>
                      <span className="font-medium">+245 نقطة</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>هذا الشهر</span>
                      <span className="font-medium">+892 نقطة</span>
                    </div>
                  </div>
                </div>
                
                <Button 
                  className="w-full mt-4"
                  onClick={() => setActiveTab('leaderboard')}
                >
                  عرض لوحة الصدارة
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {activeTab === 'achievements' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-semibold text-gray-800">الإنجازات</h3>
            <div className="text-sm text-gray-600">
              {achievements.filter(a => a.isUnlocked).length} من {achievements.length} مكتمل
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {achievements.map((achievement) => {
              const AchievementIcon = achievement.icon
              return (
                <motion.div
                  key={achievement.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`bg-white rounded-xl shadow-lg border border-gray-200 hover:shadow-xl transition-all cursor-pointer ${
                    !achievement.isUnlocked ? 'opacity-60' : ''
                  }`}
                  onClick={() => setSelectedAchievement(achievement)}
                >
                  <Card>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3 rtl:space-x-reverse">
                          <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                            achievement.isUnlocked 
                              ? 'bg-yellow-100 text-yellow-600' 
                              : 'bg-gray-100 text-gray-400'
                          }`}>
                            <AchievementIcon className="w-6 h-6" />
                          </div>
                          <div>
                            <CardTitle className="text-base">{achievement.title}</CardTitle>
                            <Badge className={getRarityColor(achievement.rarity)}>
                              {achievement.rarity === 'common' ? 'شائع' :
                               achievement.rarity === 'rare' ? 'نادر' :
                               achievement.rarity === 'epic' ? 'ملحمي' : 'أسطوري'}
                            </Badge>
                          </div>
                        </div>
                        
                        <div className="text-right">
                          <div className="text-lg font-bold text-yellow-600">
                            +{achievement.points}
                          </div>
                          {achievement.isUnlocked && <CheckCircle className="w-5 h-5 text-green-600 mx-auto mt-1" />}
                        </div>
                      </div>
                    </CardHeader>
                    
                    <CardContent>
                      <p className="text-sm text-gray-600 mb-3">{achievement.description}</p>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between text-xs">
                          <span>التقدم</span>
                          <span>{achievement.progress}/{achievement.requirement}</span>
                        </div>
                        <Progress 
                          value={(achievement.progress / achievement.requirement) * 100} 
                          className="h-2"
                        />
                      </div>
                      
                      {achievement.unlockedAt && (
                        <div className="mt-3 text-xs text-green-600">
                          حققت في {achievement.unlockedAt.toLocaleDateString('ar')}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        </div>
      )}

      {activeTab === 'leaderboard' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-semibold text-gray-800">لوحة الصدارة</h3>
            <div className="flex space-x-2 rtl:space-x-reverse">
              <Button variant="outline" size="sm">الأسبوع</Button>
              <Button variant="outline" size="sm">الشهر</Button>
              <Button size="sm">الإجمالي</Button>
            </div>
          </div>

          <div className="space-y-3">
            {leaderboard.map((entry, index) => {
              const LevelIcon = entry.level.icon
              return (
                <motion.div
                  key={entry.userId}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`bg-white rounded-xl shadow-lg border border-gray-200 p-4 ${
                    entry.isCurrentUser ? 'ring-2 ring-yellow-500 bg-yellow-50' : ''
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 rtl:space-x-reverse">
                      <div className="relative">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg ${
                          entry.rank === 1 ? 'bg-gradient-to-r from-yellow-400 to-yellow-600' :
                          entry.rank === 2 ? 'bg-gradient-to-r from-gray-300 to-gray-500' :
                          entry.rank === 3 ? 'bg-gradient-to-r from-orange-400 to-orange-600' :
                          'bg-gradient-to-r from-blue-400 to-blue-600'
                        }`}>
                          {entry.rank}
                        </div>
                        {entry.rank <= 3 && (
                          <Crown className="absolute -top-2 -right-2 w-6 h-6 text-yellow-500" />
                        )}
                      </div>
                      
                      <div className="flex items-center space-x-3 rtl:space-x-reverse">
                        <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center text-white font-bold">
                          {entry.name.charAt(0)}
                        </div>
                        
                        <div>
                          <h4 className="font-medium text-gray-800 flex items-center space-x-2 rtl:space-x-reverse">
                            <span>{entry.name}</span>
                            {entry.isCurrentUser && <Badge variant="secondary">أنت</Badge>}
                          </h4>
                          <p className="text-sm text-gray-600">{entry.department}</p>
                          <div className="flex items-center space-x-2 rtl:space-x-reverse mt-1">
                            <LevelIcon className={`w-4 h-4 text-${entry.level.color}-500`} />
                            <span className="text-xs text-gray-500">{entry.level.title}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className="text-xl font-bold text-yellow-600">
                        {entry.points.toLocaleString()}
                      </div>
                      <div className="text-sm text-gray-600">نقطة</div>
                      
                      <div className="flex items-center space-x-2 rtl:space-x-reverse mt-2 text-xs">
                        <div className="flex items-center space-x-1 rtl:space-x-reverse">
                          <Flame className="w-3 h-3 text-red-500" />
                          <span>{entry.streak}</span>
                        </div>
                        
                        <div className="flex items-center space-x-1 rtl:space-x-reverse">
                          <TrendingUp className="w-3 h-3 text-green-500" />
                          <span>+{entry.weeklyPoints}</span>
                        </div>
                      </div>
                      
                      {entry.badges.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-2">
                          {entry.badges.slice(0, 2).map((badge, i) => (
                            <Badge key={i} variant="secondary" className="text-xs">
                              {badge}
                            </Badge>
                          ))}
                          {entry.badges.length > 2 && (
                            <Badge variant="secondary" className="text-xs">
                              +{entry.badges.length - 2}
                            </Badge>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      )}

      {activeTab === 'challenges' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-semibold text-gray-800">التحديات اليومية</h3>
            <div className="text-sm text-gray-600">
              ينتهي في: {Math.ceil((dailyChallenges[0].deadline.getTime() - Date.now()) / (1000 * 60 * 60))} ساعة
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {dailyChallenges.map((challenge) => {
              const ChallengeIcon = challenge.icon
              return (
                <motion.div
                  key={challenge.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`bg-white rounded-xl shadow-lg border border-gray-200 hover:shadow-xl transition-all ${
                    challenge.isCompleted ? 'ring-2 ring-green-500 bg-green-50' : ''
                  }`}
                >
                  <Card>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3 rtl:space-x-reverse">
                          <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                            challenge.isCompleted 
                              ? 'bg-green-100 text-green-600' 
                              : 'bg-blue-100 text-blue-600'
                          }`}>
                            {challenge.isCompleted ? (
                              <CheckCircle className="w-6 h-6" />
                            ) : (
                              <ChallengeIcon className="w-6 h-6" />
                            )}
                          </div>
                          
                          <div>
                            <CardTitle className="text-base">{challenge.title}</CardTitle>
                            <Badge className={getDifficultyColor(challenge.difficulty)}>
                              {challenge.difficulty === 'easy' ? 'سهل' :
                               challenge.difficulty === 'medium' ? 'متوسط' : 'صعب'}
                            </Badge>
                          </div>
                        </div>
                        
                        <div className="text-right">
                          <div className="text-lg font-bold text-blue-600">
                            +{challenge.points}
                          </div>
                          <div className="text-xs text-gray-500">{challenge.category}</div>
                        </div>
                      </div>
                    </CardHeader>
                    
                    <CardContent>
                      <p className="text-sm text-gray-600 mb-4">{challenge.description}</p>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between text-xs">
                          <span>التقدم</span>
                          <span>{challenge.progress}/{challenge.requirement}</span>
                        </div>
                        <Progress 
                          value={(challenge.progress / challenge.requirement) * 100} 
                          className="h-2"
                        />
                      </div>
                      
                      <div className="mt-4 flex justify-between items-center">
                        <div className="text-xs text-gray-500">
                          ينتهي في: {Math.ceil((challenge.deadline.getTime() - Date.now()) / (1000 * 60 * 60))}س
                        </div>
                        
                        {challenge.isCompleted ? (
                          <Badge className="bg-green-100 text-green-800">
                            مكتمل!
                          </Badge>
                        ) : (
                          <Button size="sm" variant="outline">
                            ابدأ الآن
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        </div>
      )}

      {/* مودال تفاصيل الإنجاز */}
      <AnimatePresence>
        {selectedAchievement && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedAchievement(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-xl shadow-xl max-w-md w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                <div className="text-center mb-6">
                  <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 ${
                    selectedAchievement.isUnlocked 
                      ? 'bg-yellow-100 text-yellow-600' 
                      : 'bg-gray-100 text-gray-400'
                  }`}>
                    <selectedAchievement.icon className="w-10 h-10" />
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    {selectedAchievement.title}
                  </h3>
                  
                  <Badge className={getRarityColor(selectedAchievement.rarity)}>
                    {selectedAchievement.rarity === 'common' ? 'شائع' :
                     selectedAchievement.rarity === 'rare' ? 'نادر' :
                     selectedAchievement.rarity === 'epic' ? 'ملحمي' : 'أسطوري'}
                  </Badge>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-gray-800 mb-2">الوصف</h4>
                    <p className="text-gray-600">{selectedAchievement.description}</p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-gray-800 mb-2">التقدم</h4>
                    <div className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>{selectedAchievement.progress}/{selectedAchievement.requirement}</span>
                        <span>{Math.round((selectedAchievement.progress / selectedAchievement.requirement) * 100)}%</span>
                      </div>
                      <Progress 
                        value={(selectedAchievement.progress / selectedAchievement.requirement) * 100} 
                        className="h-3"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-gray-800 mb-2">المكافآت</h4>
                    <div className="space-y-2">
                      {selectedAchievement.rewards.map((reward, index) => (
                        <div key={index} className="flex items-center space-x-3 rtl:space-x-reverse text-sm">
                          <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                            <Gift className="w-3 h-3 text-blue-600" />
                          </div>
                          <span>{reward.description}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {selectedAchievement.unlockedAt && (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                      <div className="flex items-center space-x-2 rtl:space-x-reverse text-green-800">
                        <CheckCircle className="w-5 h-5" />
                        <span className="font-medium">تم الإنجاز!</span>
                      </div>
                      <p className="text-sm text-green-600 mt-1">
                        حققت في {selectedAchievement.unlockedAt.toLocaleDateString('ar')}
                      </p>
                    </div>
                  )}
                </div>
                
                <div className="flex justify-center mt-6">
                  <Button onClick={() => setSelectedAchievement(null)}>
                    إغلاق
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
