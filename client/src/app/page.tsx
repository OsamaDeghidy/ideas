"use client"

import React, { useState } from "react"
import { motion } from "framer-motion"
import { 
  Lightbulb, 
  TrendingUp, 
  Users, 
  Award, 
  Sparkles, 
  Filter,
  Search,
  BarChart3,
  Gamepad2,
  Target,
  Map,
  Calendar,
  MessageCircle,
  UserPlus,
  GalleryVertical,
  ClipboardCheck,
  GitBranch,
  FolderArchive,
  Settings,
  Building,
  Video,
  Globe,
  Bell,
  PenTool,
  Bot,
  Trophy
} from "lucide-react"
import IdeaCard, { Idea } from "@/components/idea-card"
import Leaderboard, { LeaderboardUser } from "@/components/leaderboard"
import AddIdeaForm from "@/components/add-idea-form"
import SpinWheel from "@/components/spin-wheel"
import IdeaQuest from "@/components/idea-quest"
import WeeklyChallenges from "@/components/weekly-challenges"
import CommentsSection from "@/components/comments-section"
import Notifications from "@/components/notifications"
import GroupsSystem from "@/components/groups-system"
import HotOrNot from "@/components/hot-or-not"
import IdeaDice from "@/components/idea-dice"
import IdeaBattle from "@/components/idea-battle"
import IdeaPuzzle from "@/components/idea-puzzle"
import IdeaCanvas from "@/components/idea-canvas"
import IdeaGallery from "@/components/idea-gallery"
import ManagersEvaluation from "@/components/managers-evaluation"
import IdeaGames from "@/components/idea-games"
import AdvancedGames from "@/components/advanced-games"
import CollaborativeGames from "@/components/collaborative-games"
import IdeaWorkflow from "@/components/idea-workflow"
import ProjectsSection from "@/components/projects-section"
import IdeasArchive from "@/components/ideas-archive"
import VirtualMeetings from "@/components/virtual-meetings"
import LandingPageBuilder from "@/components/landing-page-builder"
import NotificationCenter from "@/components/notification-center"
import AdminDashboard from "@/components/admin-dashboard"
import MiroIntegration from "@/components/miro-integration"
import AIAssistant from "@/components/ai-assistant"
import AdvancedAnalytics from "@/components/advanced-analytics"
import GamificationSystem from "@/components/gamification-system"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn, generateId } from "@/lib/utils"

// Sample data
const sampleIdeas: Idea[] = [
  {
    id: "1",
    title: "نظام ذكي لإدارة المخزون",
    description: "تطوير نظام ذكي يستخدم الذكاء الاصطناعي للتنبؤ بالطلب وإدارة المخزون بشكل فعال، مما يقلل من التكاليف ويزيد من الكفاءة.",
    author: { name: "أحمد محمد", avatar: "" },
    category: "تحسين العمليات",
    votes: 24,
    comments: 8,
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    status: "discussing",
    tags: ["ذكاء اصطناعي", "مخزون", "كفاءة"]
  },
  {
    id: "2",
    title: "تطبيق جوال للعملاء",
    description: "إنشاء تطبيق جوال متطور يسمح للعملاء بتتبع طلباتهم وإدارة حساباتهم بسهولة، مع واجهة مستخدم حديثة وسهلة الاستخدام.",
    author: { name: "سارة أحمد", avatar: "" },
    category: "تطوير المنتجات",
    votes: 31,
    comments: 12,
    createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000), // 5 hours ago
    status: "evaluating",
    tags: ["تطبيق جوال", "عملاء", "واجهة مستخدم"]
  },
  {
    id: "3",
    title: "برنامج تدريبي تفاعلي",
    description: "إطلاق برنامج تدريبي تفاعلي للموظفين يستخدم تقنيات الواقع المعزز والذكاء الاصطناعي لتحسين تجربة التعلم.",
    author: { name: "محمد علي", avatar: "" },
    category: "الموارد البشرية",
    votes: 18,
    comments: 5,
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
    status: "new",
    tags: ["تدريب", "واقع معزز", "تعلم"]
  },
  {
    id: "4",
    title: "استراتيجية تسويق رقمية",
    description: "تطوير استراتيجية تسويق رقمية شاملة تستهدف العملاء المحتملين عبر منصات التواصل الاجتماعي والمحتوى التفاعلي.",
    author: { name: "فاطمة حسن", avatar: "" },
    category: "التسويق والبيع",
    votes: 27,
    comments: 9,
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
    status: "improving",
    tags: ["تسويق رقمي", "تواصل اجتماعي", "محتوى"]
  }
]

const sampleLeaderboardUsers: LeaderboardUser[] = [
  {
    id: "1",
    name: "أحمد محمد",
    avatar: "",
    points: 1250,
    ideas: 8,
    votes: 45,
    rank: 1,
    badge: "gold"
  },
  {
    id: "2",
    name: "سارة أحمد",
    avatar: "",
    points: 980,
    ideas: 6,
    votes: 32,
    rank: 2,
    badge: "silver"
  },
  {
    id: "3",
    name: "محمد علي",
    avatar: "",
    points: 750,
    ideas: 4,
    votes: 28,
    rank: 3,
    badge: "bronze"
  },
  {
    id: "4",
    name: "فاطمة حسن",
    avatar: "",
    points: 620,
    ideas: 3,
    votes: 19,
    rank: 4,
    badge: "rising"
  }
]

export default function HomePage() {
  const [ideas, setIdeas] = useState<Idea[]>(sampleIdeas)
  const [filter, setFilter] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("ideas")
  const [selectedIdea, setSelectedIdea] = useState<Idea | null>(null)

  const handleAddIdea = (ideaData: {
    title: string
    description: string
    category: string
    tags: string[]
  }) => {
    const newIdea: Idea = {
      id: generateId(),
      ...ideaData,
      author: { name: "أسامة بدندي", avatar: "" },
      votes: 0,
      comments: 0,
      createdAt: new Date(),
      status: "new"
    }
    setIdeas([newIdea, ...ideas])
  }

  const handleVote = (ideaId: string) => {
    setIdeas(ideas.map(idea => 
      idea.id === ideaId 
        ? { ...idea, votes: idea.votes + 1 }
        : idea
    ))
  }

  const handleComment = (ideaId: string) => {
    const idea = ideas.find(i => i.id === ideaId)
    if (idea) {
      setSelectedIdea(idea)
      setActiveTab("comments")
    }
  }

  const handleShare = (ideaId: string) => {
    // Handle share functionality
    console.log("Share idea:", ideaId)
  }

  const _handleSpinResult = (result: { idea: { id: string; title: string; category: string }; challenge: string }) => {
    console.log("Spin result:", result)
  }

  const handleChallengeComplete = (challengeId: string) => {
    console.log("Challenge completed:", challengeId)
  }

  const handleAddComment = (content: string) => {
    console.log("Comment added:", content)
  }

  const handleJoinGroup = (groupId: string) => {
    console.log("Joined group:", groupId)
  }

  const handleLeaveGroup = (groupId: string) => {
    console.log("Left group:", groupId)
  }

  const handleCreateGroup = (groupData: { name: string; description: string }) => {
    console.log("Created group:", groupData)
  }

  const handleHotOrNotVote = (winnerId: string, loserId: string) => {
    console.log("Hot or Not vote:", { winnerId, loserId })
  }

  const handleDiceChallenge = (challenge: string) => {
    console.log("Dice challenge:", challenge)
  }

  const handleBattleVote = (winnerId: string, loserId: string) => {
    console.log("Battle vote:", { winnerId, loserId })
  }

  const handlePuzzleComplete = (time: number) => {
    console.log("Puzzle completed in:", time)
  }

  const handleCanvasSave = (canvasData: string) => {
    console.log("Canvas saved:", canvasData)
  }

  const handleGalleryLike = (itemId: string) => {
    console.log("Gallery item liked:", itemId)
  }

  const handleGalleryShare = (itemId: string) => {
    console.log("Gallery item shared:", itemId)
  }

  const handleGalleryDownload = (itemId: string) => {
    console.log("Gallery item downloaded:", itemId)
  }

  const filteredIdeas = ideas.filter(idea => {
    const matchesFilter = filter === "all" || idea.status === filter
    const matchesSearch = idea.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         idea.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         idea.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    return matchesFilter && matchesSearch
  })

  const stats = {
    totalIdeas: ideas.length,
    totalVotes: ideas.reduce((sum, idea) => sum + idea.votes, 0),
    totalComments: ideas.reduce((sum, idea) => sum + idea.comments, 0),
    activeUsers: sampleLeaderboardUsers.length
  }

  const tabs = [
    { id: "ideas", label: "الأفكار", icon: Lightbulb },
    { id: "evaluation", label: "تقييم المدراء", icon: ClipboardCheck },
    { id: "workflow", label: "سير العمل", icon: GitBranch },
    { id: "projects", label: "المشاريع", icon: Building },
    { id: "archive", label: "الأرشيف", icon: FolderArchive },
    { id: "meetings", label: "الاجتماعات", icon: Video },
    { id: "miro", label: "لوحات Miro", icon: PenTool },
    { id: "ai", label: "المساعد الذكي", icon: Bot },
    { id: "analytics", label: "التحليلات المتقدمة", icon: BarChart3 },
    { id: "gamification", label: "النقاط والإنجازات", icon: Trophy },
    { id: "landing", label: "صفحات الهبوط", icon: Globe },
    { id: "notifications", label: "الإشعارات", icon: Bell },
    { id: "admin", label: "لوحة الإدارة", icon: Settings },
    { id: "groups", label: "المجموعات", icon: UserPlus },
    { id: "games", label: "الألعاب", icon: Gamepad2 },
    { id: "gallery", label: "المعرض", icon: GalleryVertical },
    { id: "challenges", label: "التحديات", icon: Target },
    { id: "quests", label: "الرحلات", icon: Map },
    { id: "comments", label: "التعليقات", icon: MessageCircle }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3 rtl:space-x-reverse">
              <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900">InnoSpark</h1>
            </div>
            <div className="flex items-center space-x-4 rtl:space-x-reverse">
              <Notifications />
              <Button variant="outline" size="sm">
                <BarChart3 className="w-4 h-4 ml-2" />
                الإحصائيات
              </Button>
              <Button variant="sparkle" size="sm">
                <Lightbulb className="w-4 h-4 ml-2" />
                فكرة جديدة
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="gradient-primary text-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm opacity-90">إجمالي الأفكار</p>
                    <p className="text-3xl font-bold">{stats.totalIdeas}</p>
                  </div>
                  <Lightbulb className="w-8 h-8 opacity-80" />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="gradient-secondary text-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm opacity-90">إجمالي التصويتات</p>
                    <p className="text-3xl font-bold">{stats.totalVotes}</p>
                  </div>
                  <TrendingUp className="w-8 h-8 opacity-80" />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="gradient-success text-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm opacity-90">التعليقات</p>
                    <p className="text-3xl font-bold">{stats.totalComments}</p>
                  </div>
                  <Users className="w-8 h-8 opacity-80" />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="gradient-warning text-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm opacity-90">المستخدمين النشطين</p>
                    <p className="text-3xl font-bold">{stats.activeUsers}</p>
                  </div>
                  <Award className="w-8 h-8 opacity-80" />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Tabs */}
        <div className="flex space-x-1 rtl:space-x-reverse mb-6 bg-white rounded-lg p-1 shadow-sm overflow-x-auto">
          {tabs.map((tab) => {
            const IconComponent = tab.icon
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "flex items-center space-x-2 rtl:space-x-reverse px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 whitespace-nowrap",
                  activeTab === tab.id
                    ? "bg-primary text-white shadow-sm"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                )}
              >
                <IconComponent className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            )
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {activeTab === "ideas" && (
              <>
                {/* Add Idea Form */}
                <AddIdeaForm onSubmit={handleAddIdea} />

                {/* Filters and Search */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type="text"
                      placeholder="ابحث في الأفكار..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                  <div className="flex items-center space-x-2 rtl:space-x-reverse">
                    <Filter className="w-4 h-4 text-gray-500" />
                    <select
                      value={filter}
                      onChange={(e) => setFilter(e.target.value)}
                      className="px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    >
                      <option value="all">جميع الأفكار</option>
                      <option value="new">جديد</option>
                      <option value="discussing">قيد النقاش</option>
                      <option value="evaluating">قيد التقييم</option>
                      <option value="improving">قيد التحسين</option>
                      <option value="finalized">مكتمل</option>
                    </select>
                  </div>
                </div>

                {/* Ideas Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredIdeas.map((idea, index) => (
                    <motion.div
                      key={idea.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <IdeaCard
                        idea={idea}
                        onVote={handleVote}
                        onComment={handleComment}
                        onShare={handleShare}
                      />
                    </motion.div>
                  ))}
                </div>

                {filteredIdeas.length === 0 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-12"
                  >
                    <Lightbulb className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      لا توجد أفكار
                    </h3>
                    <p className="text-gray-500">
                      {searchTerm ? "جرب البحث بكلمات مختلفة" : "كن أول من يضيف فكرة جديدة!"}
                    </p>
                  </motion.div>
                )}
              </>
            )}

            {activeTab === "evaluation" && (
              <ManagersEvaluation />
            )}

            {activeTab === "workflow" && (
              <IdeaWorkflow />
            )}

            {activeTab === "projects" && (
              <ProjectsSection />
            )}

            {activeTab === "archive" && (
              <IdeasArchive />
            )}

            {activeTab === "meetings" && (
              <VirtualMeetings />
            )}

            {activeTab === "miro" && (
              <MiroIntegration />
            )}

            {activeTab === "ai" && (
              <AIAssistant />
            )}

            {activeTab === "analytics" && (
              <AdvancedAnalytics />
            )}

            {activeTab === "gamification" && (
              <GamificationSystem />
            )}

            {activeTab === "landing" && (
              <LandingPageBuilder />
            )}

            {activeTab === "notifications" && (
              <NotificationCenter />
            )}

            {activeTab === "admin" && (
              <AdminDashboard />
            )}

            {activeTab === "groups" && (
              <GroupsSystem 
                onJoinGroup={handleJoinGroup}
                onLeaveGroup={handleLeaveGroup}
                onCreateGroup={handleCreateGroup}
              />
            )}

            {activeTab === "games" && (
              <div className="space-y-6">
                <IdeaGames />
                <AdvancedGames />
                <CollaborativeGames />
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <SpinWheel 
                    ideas={ideas.map(idea => ({ id: idea.id, title: idea.title, category: idea.category }))}
                    onSpin={(result) => {
                      console.log("Spin result:", result)
                    }}
                  />
                  <IdeaDice 
                    onChallenge={handleDiceChallenge}
                  />
                </div>
                
                <HotOrNot 
                  ideas={ideas}
                  onVote={handleHotOrNotVote}
                />
                
                <IdeaBattle 
                  ideas={ideas}
                  onVote={handleBattleVote}
                />

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <IdeaPuzzle 
                    onComplete={handlePuzzleComplete}
                  />
                  <IdeaCanvas 
                    onSave={handleCanvasSave}
                  />
                </div>
              </div>
            )}

            {activeTab === "challenges" && (
              <div className="space-y-6">
                <WeeklyChallenges 
                  challenges={[]}
                  onChallengeComplete={handleChallengeComplete} 
                />
              </div>
            )}

            {activeTab === "quests" && (
              <div className="space-y-6">
                {ideas.slice(0, 2).map((idea) => (
                  <IdeaQuest 
                    key={idea.id}
                    idea={idea}
                    onStageComplete={(stage) => console.log("Stage completed:", stage)}
                  />
                ))}
              </div>
            )}

                        {activeTab === "gallery" && (
              <div className="space-y-6">
                <IdeaGallery
                  onLike={handleGalleryLike}
                  onShare={handleGalleryShare}
                  onDownload={handleGalleryDownload}
                />
              </div>
            )}

            {activeTab === "comments" && selectedIdea && (
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2 rtl:space-x-reverse">
                      <MessageCircle className="w-5 h-5 text-blue-500" />
                      <span>التعليقات على: {selectedIdea.title}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CommentsSection
                      ideaId={selectedIdea.id}
                      comments={[]}
                      onAddComment={handleAddComment}
                    />
                  </CardContent>
                </Card>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Leaderboard users={sampleLeaderboardUsers} />
            
            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 rtl:space-x-reverse">
                  <TrendingUp className="w-5 h-5 text-green-500" />
                  <span>أحدث النشاطات</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {ideas.slice(0, 3).map((idea) => (
                    <div key={idea.id} className="flex items-center space-x-3 rtl:space-x-reverse">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">{idea.title}</p>
                        <p className="text-xs text-muted-foreground">
                          بواسطة {idea.author.name}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 rtl:space-x-reverse">
                  <Target className="w-5 h-5 text-purple-500" />
                  <span>إجراءات سريعة</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Button variant="outline" className="w-full justify-start">
                    <Gamepad2 className="w-4 h-4 ml-2" />
                    <span>دور الدولاب</span>
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Calendar className="w-4 h-4 ml-2" />
                    <span>التحديات الأسبوعية</span>
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Map className="w-4 h-4 ml-2" />
                    <span>رحلة فكرة</span>
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <UserPlus className="w-4 h-4 ml-2" />
                    <span>إنشاء مجموعة</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
