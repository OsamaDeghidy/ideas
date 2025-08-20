"use client"

import React, { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  PenTool,
  Plus,
  ExternalLink,
  Eye,
  Users,
  Clock,
  Download,
  Share,
  Settings,
  Trash2,
  Edit,
  Copy,
  Lock,
  Unlock,
  Star,
  MessageSquare,
  BarChart3,
  Target,
  Lightbulb,
  Zap,
  Calendar,
  Filter,
  Search,
  Grid3X3,
  List,
  Maximize,
  Minimize,
  RefreshCw,
  Save,
  Upload,
  FolderOpen,
  FileText,
  Image,
  Video,
  Link,
  Tag,
  Bookmark,
  Heart,
  ThumbsUp,
  MessageCircle,
  Bell,
  MoreVertical
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

// أنواع البيانات
interface MiroBoard {
  id: string
  title: string
  description: string
  url: string
  thumbnail: string
  type: 'brainstorming' | 'mindmap' | 'prototype' | 'userstory' | 'kanban' | 'timeline' | 'wireframe' | 'flowchart'
  permissions: 'view' | 'edit' | 'admin'
  isActive: boolean
  isPublic: boolean
  isFavorited: boolean
  createdAt: Date
  lastActivity: Date
  createdBy: string
  collaborators: MiroCollaborator[]
  elements: MiroElements
  tags: string[]
  settings: MiroBoardSettings
  analytics: MiroBoardAnalytics
}

interface MiroCollaborator {
  id: string
  name: string
  email: string
  avatar: string
  role: 'owner' | 'editor' | 'viewer'
  joinedAt: Date
  lastSeen: Date
  isOnline: boolean
  permissions: {
    canEdit: boolean
    canShare: boolean
    canDelete: boolean
    canManageUsers: boolean
  }
}

interface MiroElements {
  stickyNotes: number
  shapes: number
  images: number
  connectors: number
  text: number
  frames: number
  documents: number
  videos: number
  totalElements: number
}

interface MiroBoardSettings {
  allowComments: boolean
  allowReactions: boolean
  allowExport: boolean
  allowSharing: boolean
  autoSave: boolean
  versionControl: boolean
  backupEnabled: boolean
}

interface MiroBoardAnalytics {
  views: number
  edits: number
  shares: number
  comments: number
  reactions: number
  timeSpent: number // in minutes
  uniqueVisitors: number
  lastWeekActivity: number
}

interface MiroTemplate {
  id: string
  name: string
  description: string
  category: string
  thumbnail: string
  type: 'brainstorming' | 'mindmap' | 'prototype' | 'userstory' | 'kanban' | 'timeline' | 'wireframe' | 'flowchart'
  elements: MiroElements
  tags: string[]
  isPopular: boolean
  usageCount: number
}

// قوالب Miro
const miroTemplates: MiroTemplate[] = [
  {
    id: "brainstorming-template",
    name: "قالب العصف الذهني",
    description: "قالب مثالي لجلسات العصف الذهني وتوليد الأفكار",
    category: "العصف الذهني",
    thumbnail: "/templates/brainstorming.jpg",
    type: "brainstorming",
    elements: {
      stickyNotes: 20,
      shapes: 5,
      images: 0,
      connectors: 15,
      text: 10,
      frames: 3,
      documents: 0,
      videos: 0,
      totalElements: 53
    },
    tags: ["عصف ذهني", "أفكار", "إبداع"],
    isPopular: true,
    usageCount: 1250
  },
  {
    id: "mindmap-template",
    name: "قالب الخريطة الذهنية",
    description: "تنظيم الأفكار والمفاهيم في خريطة ذهنية واضحة",
    category: "التنظيم",
    thumbnail: "/templates/mindmap.jpg",
    type: "mindmap",
    elements: {
      stickyNotes: 15,
      shapes: 8,
      images: 2,
      connectors: 20,
      text: 8,
      frames: 2,
      documents: 0,
      videos: 0,
      totalElements: 55
    },
    tags: ["خريطة ذهنية", "تنظيم", "مفاهيم"],
    isPopular: true,
    usageCount: 890
  },
  {
    id: "user-story-template",
    name: "قالب قصص المستخدم",
    description: "تطوير قصص المستخدم ومتطلبات المنتج",
    category: "تطوير المنتج",
    thumbnail: "/templates/user-story.jpg",
    type: "userstory",
    elements: {
      stickyNotes: 12,
      shapes: 10,
      images: 3,
      connectors: 8,
      text: 15,
      frames: 4,
      documents: 2,
      videos: 0,
      totalElements: 54
    },
    tags: ["قصص المستخدم", "متطلبات", "منتج"],
    isPopular: false,
    usageCount: 340
  },
  {
    id: "kanban-template",
    name: "قالب كانبان",
    description: "إدارة المهام والمشاريع بطريقة كانبان",
    category: "إدارة المشاريع",
    thumbnail: "/templates/kanban.jpg",
    type: "kanban",
    elements: {
      stickyNotes: 25,
      shapes: 12,
      images: 1,
      connectors: 5,
      text: 8,
      frames: 5,
      documents: 0,
      videos: 0,
      totalElements: 56
    },
    tags: ["كانبان", "مهام", "مشاريع"],
    isPopular: true,
    usageCount: 670
  }
]

// بيانات تجريبية للوحات
const sampleMiroBoards: MiroBoard[] = [
  {
    id: "board1",
    title: "خريطة الأفكار الرئيسية",
    description: "خريطة شاملة لأفكار المنتجات الجديدة",
    url: "https://miro.com/app/board/abc123",
    thumbnail: "/boards/board1.jpg",
    type: "mindmap",
    permissions: "edit",
    isActive: true,
    isPublic: false,
    isFavorited: true,
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    lastActivity: new Date(),
    createdBy: "نوال الأحمد",
    collaborators: [
      {
        id: "user1",
        name: "نوال الأحمد",
        email: "nowal@company.com",
        avatar: "",
        role: "owner",
        joinedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
        lastSeen: new Date(),
        isOnline: true,
        permissions: {
          canEdit: true,
          canShare: true,
          canDelete: true,
          canManageUsers: true
        }
      },
      {
        id: "user2",
        name: "أحمد محمد",
        email: "ahmed@company.com",
        avatar: "",
        role: "editor",
        joinedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
        lastSeen: new Date(Date.now() - 30 * 60 * 1000),
        isOnline: false,
        permissions: {
          canEdit: true,
          canShare: false,
          canDelete: false,
          canManageUsers: false
        }
      }
    ],
    elements: {
      stickyNotes: 15,
      shapes: 8,
      images: 3,
      connectors: 12,
      text: 10,
      frames: 4,
      documents: 2,
      videos: 0,
      totalElements: 54
    },
    tags: ["أفكار", "منتجات", "تطوير"],
    settings: {
      allowComments: true,
      allowReactions: true,
      allowExport: true,
      allowSharing: true,
      autoSave: true,
      versionControl: true,
      backupEnabled: true
    },
    analytics: {
      views: 45,
      edits: 23,
      shares: 8,
      comments: 12,
      reactions: 15,
      timeSpent: 180,
      uniqueVisitors: 6,
      lastWeekActivity: 15
    }
  },
  {
    id: "board2",
    title: "نموذج المنتج الأولي",
    description: "تصميم واجهات المستخدم للمنتج الجديد",
    url: "https://miro.com/app/board/def456",
    thumbnail: "/boards/board2.jpg",
    type: "prototype",
    permissions: "view",
    isActive: false,
    isPublic: true,
    isFavorited: false,
    createdAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000),
    lastActivity: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    createdBy: "أحمد محمد",
    collaborators: [
      {
        id: "user2",
        name: "أحمد محمد",
        email: "ahmed@company.com",
        avatar: "",
        role: "owner",
        joinedAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000),
        lastSeen: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
        isOnline: false,
        permissions: {
          canEdit: true,
          canShare: true,
          canDelete: true,
          canManageUsers: true
        }
      }
    ],
    elements: {
      stickyNotes: 8,
      shapes: 12,
      images: 5,
      connectors: 6,
      text: 15,
      frames: 3,
      documents: 1,
      videos: 0,
      totalElements: 50
    },
    tags: ["تصميم", "واجهة", "نموذج"],
    settings: {
      allowComments: true,
      allowReactions: false,
      allowExport: true,
      allowSharing: true,
      autoSave: true,
      versionControl: false,
      backupEnabled: true
    },
    analytics: {
      views: 28,
      edits: 15,
      shares: 5,
      comments: 8,
      reactions: 0,
      timeSpent: 120,
      uniqueVisitors: 4,
      lastWeekActivity: 8
    }
  }
]

export default function MiroIntegration() {
  const [boards, setBoards] = useState<MiroBoard[]>(sampleMiroBoards)
  const [templates, setTemplates] = useState<MiroTemplate[]>(miroTemplates)
  const [selectedBoard, setSelectedBoard] = useState<MiroBoard | null>(null)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [filterType, setFilterType] = useState<string>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [showTemplates, setShowTemplates] = useState(false)
  const [sortBy, setSortBy] = useState<'recent' | 'name' | 'activity'>('recent')

  // تصفية اللوحات
  const filteredBoards = boards.filter(board => {
    const matchesType = filterType === 'all' || board.type === filterType
    const matchesSearch = board.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         board.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesType && matchesSearch
  })

  // ترتيب اللوحات
  const sortedBoards = [...filteredBoards].sort((a, b) => {
    switch (sortBy) {
      case 'recent':
        return b.lastActivity.getTime() - a.lastActivity.getTime()
      case 'name':
        return a.title.localeCompare(b.title, 'ar')
      case 'activity':
        return b.analytics.lastWeekActivity - a.analytics.lastWeekActivity
      default:
        return 0
    }
  })

  // دالة إنشاء لوحة جديدة
  const createNewBoard = (template?: MiroTemplate) => {
    const newBoard: MiroBoard = {
      id: `board-${Date.now()}`,
      title: template ? `نسخة من ${template.name}` : "لوحة جديدة",
      description: template ? template.description : "لوحة تعاونية جديدة",
      url: `https://miro.com/app/board/new-${Date.now()}`,
      thumbnail: template ? template.thumbnail : "/boards/new-board.jpg",
      type: template ? template.type as any : "brainstorming",
      permissions: "edit",
      isActive: true,
      isPublic: false,
      isFavorited: false,
      createdAt: new Date(),
      lastActivity: new Date(),
      createdBy: "نوال الأحمد",
      collaborators: [],
      elements: template ? template.elements : {
        stickyNotes: 0,
        shapes: 0,
        images: 0,
        connectors: 0,
        text: 0,
        frames: 0,
        documents: 0,
        videos: 0,
        totalElements: 0
      },
      tags: template ? template.tags : [],
      settings: {
        allowComments: true,
        allowReactions: true,
        allowExport: true,
        allowSharing: true,
        autoSave: true,
        versionControl: true,
        backupEnabled: true
      },
      analytics: {
        views: 0,
        edits: 0,
        shares: 0,
        comments: 0,
        reactions: 0,
        timeSpent: 0,
        uniqueVisitors: 0,
        lastWeekActivity: 0
      }
    }
    
    setBoards([newBoard, ...boards])
    setShowCreateModal(false)
    setShowTemplates(false)
  }

  // دالة حذف لوحة
  const deleteBoard = (boardId: string) => {
    setBoards(boards.filter(board => board.id !== boardId))
  }

  // دالة تبديل المفضلة
  const toggleFavorite = (boardId: string) => {
    setBoards(boards.map(board => 
      board.id === boardId 
        ? { ...board, isFavorited: !board.isFavorited }
        : board
    ))
  }

  return (
    <div className="space-y-6 p-6">
      {/* عنوان القسم */}
      <div className="text-center">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          تكامل Miro
        </h2>
        <p className="text-gray-600 mt-2">لوحات تعاونية متقدمة للعصف الذهني والتصميم</p>
      </div>

      {/* أزرار الإجراءات */}
      <div className="flex justify-center space-x-4 rtl:space-x-reverse">
        <Button 
          className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
          onClick={() => setShowCreateModal(true)}
        >
          <Plus className="w-4 h-4 mr-2" />
          لوحة جديدة
        </Button>
        
        <Button variant="outline" onClick={() => setShowTemplates(true)}>
          <FileText className="w-4 h-4 mr-2" />
          القوالب
        </Button>
        
        <Button variant="outline">
          <Upload className="w-4 h-4 mr-2" />
          استيراد
        </Button>
      </div>

      {/* أدوات البحث والتصفية */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-4">
        <div className="flex flex-col md:flex-row gap-4">
          {/* البحث */}
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="البحث في اللوحات..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* التصفية */}
          <div className="flex space-x-2 rtl:space-x-reverse">
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">جميع الأنواع</option>
              <option value="brainstorming">العصف الذهني</option>
              <option value="mindmap">الخريطة الذهنية</option>
              <option value="prototype">النموذج الأولي</option>
              <option value="userstory">قصص المستخدم</option>
              <option value="kanban">كانبان</option>
              <option value="timeline">الجدول الزمني</option>
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="recent">الأحدث</option>
              <option value="name">الاسم</option>
              <option value="activity">النشاط</option>
            </select>

            <Button
              variant="outline"
              onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
            >
              {viewMode === 'grid' ? <List className="w-4 h-4" /> : <Grid3X3 className="w-4 h-4" />}
            </Button>
          </div>
        </div>
      </div>

      {/* عرض اللوحات */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-semibold text-gray-800">
            لوحاتي ({sortedBoards.length})
          </h3>
          <div className="flex items-center space-x-2 rtl:space-x-reverse text-sm text-gray-600">
            <span>عرض:</span>
            <span className="font-medium">{sortedBoards.length}</span>
            <span>من</span>
            <span className="font-medium">{boards.length}</span>
          </div>
        </div>

        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {sortedBoards.map((board) => (
              <motion.div
                key={board.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-xl shadow-lg border border-gray-200 hover:shadow-xl transition-shadow"
              >
                <Card>
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <CardTitle className="text-lg font-semibold text-gray-800 mb-2">
                          {board.title}
                        </CardTitle>
                        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                          {board.description}
                        </p>
                        
                        <div className="flex items-center space-x-3 rtl:space-x-reverse mb-3">
                          <Badge variant="secondary">{
                            board.type === 'brainstorming' ? 'عصف ذهني' :
                            board.type === 'mindmap' ? 'خريطة ذهنية' :
                            board.type === 'prototype' ? 'نموذج أولي' :
                            board.type === 'userstory' ? 'قصص المستخدم' :
                            board.type === 'kanban' ? 'كانبان' :
                            board.type === 'timeline' ? 'جدول زمني' : 'أخرى'
                          }</Badge>
                          
                          {board.isActive && (
                            <Badge variant="default" className="bg-green-500">
                              نشط
                            </Badge>
                          )}
                          
                          {board.isFavorited && (
                            <Star className="w-4 h-4 text-yellow-500 fill-current" />
                          )}
                        </div>
                      </div>
                      
                      <div className="flex space-x-1 rtl:space-x-reverse">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleFavorite(board.id)}
                        >
                          <Star className={`w-4 h-4 ${board.isFavorited ? 'text-yellow-500 fill-current' : 'text-gray-400'}`} />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent>
                    {/* صورة مصغرة */}
                    <div className="w-full h-32 bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg mb-3 flex items-center justify-center">
                      <PenTool className="w-8 h-8 text-blue-500" />
                    </div>
                    
                    {/* إحصائيات سريعة */}
                    <div className="grid grid-cols-2 gap-2 text-xs text-gray-600 mb-3">
                      <div className="flex items-center space-x-1 rtl:space-x-reverse">
                        <Users className="w-3 h-3" />
                        <span>{board.collaborators.length} مشارك</span>
                      </div>
                      <div className="flex items-center space-x-1 rtl:space-x-reverse">
                        <Clock className="w-3 h-3" />
                        <span>{Math.floor((Date.now() - board.lastActivity.getTime()) / (1000 * 60 * 60))} ساعة</span>
                      </div>
                      <div className="flex items-center space-x-1 rtl:space-x-reverse">
                        <BarChart3 className="w-3 h-3" />
                        <span>{board.elements.totalElements} عنصر</span>
                      </div>
                      <div className="flex items-center space-x-1 rtl:space-x-reverse">
                        <MessageCircle className="w-3 h-3" />
                        <span>{board.analytics.comments} تعليق</span>
                      </div>
                    </div>
                    
                    {/* أزرار الإجراءات */}
                    <div className="flex space-x-2 rtl:space-x-reverse">
                      <Button size="sm" className="flex-1">
                        <ExternalLink className="w-3 h-3 mr-1" />
                        فتح
                      </Button>
                      <Button size="sm" variant="outline">
                        <Share className="w-3 h-3" />
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => deleteBoard(board.id)}
                      >
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="space-y-3">
            {sortedBoards.map((board) => (
              <motion.div
                key={board.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white rounded-lg shadow border border-gray-200 p-4"
              >
                <div className="flex items-center space-x-4 rtl:space-x-reverse">
                  {/* صورة مصغرة */}
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg flex items-center justify-center">
                    <PenTool className="w-6 h-6 text-blue-500" />
                  </div>
                  
                  {/* معلومات اللوحة */}
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 rtl:space-x-reverse mb-1">
                      <h4 className="font-semibold text-gray-800">{board.title}</h4>
                      {board.isFavorited && (
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      )}
                      {board.isActive && (
                        <Badge variant="default" className="bg-green-500 text-xs">
                          نشط
                        </Badge>
                      )}
                    </div>
                    
                    <p className="text-sm text-gray-600 mb-2">{board.description}</p>
                    
                    <div className="flex items-center space-x-4 rtl:space-x-reverse text-xs text-gray-500">
                      <span>أنشئت بواسطة {board.createdBy}</span>
                      <span>•</span>
                      <span>{board.collaborators.length} مشارك</span>
                      <span>•</span>
                      <span>{board.elements.totalElements} عنصر</span>
                      <span>•</span>
                      <span>آخر نشاط منذ {Math.floor((Date.now() - board.lastActivity.getTime()) / (1000 * 60 * 60))} ساعة</span>
                    </div>
                  </div>
                  
                  {/* أزرار الإجراءات */}
                  <div className="flex space-x-2 rtl:space-x-reverse">
                    <Button size="sm">
                      <ExternalLink className="w-3 h-3 mr-1" />
                      فتح
                    </Button>
                    <Button size="sm" variant="outline">
                      <Share className="w-3 h-3" />
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => toggleFavorite(board.id)}
                    >
                      <Star className={`w-3 h-3 ${board.isFavorited ? 'text-yellow-500 fill-current' : 'text-gray-400'}`} />
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => deleteBoard(board.id)}
                    >
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* قوالب Miro */}
      <AnimatePresence>
        {showTemplates && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            onClick={() => setShowTemplates(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-xl shadow-2xl p-6 max-w-4xl w-full mx-4 max-h-[80vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-gray-800">قوالب Miro</h3>
                <Button variant="outline" onClick={() => setShowTemplates(false)}>
                  إغلاق
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {templates.map((template) => (
                  <Card key={template.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                    <CardHeader>
                      <div className="w-full h-32 bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg mb-3 flex items-center justify-center">
                        <PenTool className="w-8 h-8 text-blue-500" />
                      </div>
                      
                      <CardTitle className="text-lg font-semibold text-gray-800 mb-2">
                        {template.name}
                      </CardTitle>
                      <p className="text-gray-600 text-sm mb-3">{template.description}</p>
                      
                      <div className="flex items-center space-x-2 rtl:space-x-reverse mb-3">
                        <Badge variant="secondary">{template.category}</Badge>
                        {template.isPopular && (
                          <Badge variant="default" className="bg-orange-500">
                            شائع
                          </Badge>
                        )}
                      </div>
                      
                      <div className="grid grid-cols-2 gap-2 text-xs text-gray-600 mb-4">
                        <div>الملاحظات: {template.elements.stickyNotes}</div>
                        <div>الأشكال: {template.elements.shapes}</div>
                        <div>الصور: {template.elements.images}</div>
                        <div>الروابط: {template.elements.connectors}</div>
                      </div>
                    </CardHeader>
                    
                    <CardContent>
                      <Button 
                        className="w-full"
                        onClick={() => createNewBoard(template)}
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        استخدام القالب
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* نافذة إنشاء لوحة جديدة */}
      <AnimatePresence>
        {showCreateModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            onClick={() => setShowCreateModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-xl shadow-2xl p-6 max-w-md w-full mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-xl font-bold text-gray-800 mb-4">إنشاء لوحة جديدة</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    اسم اللوحة
                  </label>
                  <input
                    type="text"
                    placeholder="أدخل اسم اللوحة..."
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    الوصف
                  </label>
                  <textarea
                    placeholder="وصف اللوحة..."
                    rows={3}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    النوع
                  </label>
                  <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option value="brainstorming">العصف الذهني</option>
                    <option value="mindmap">الخريطة الذهنية</option>
                    <option value="prototype">النموذج الأولي</option>
                    <option value="userstory">قصص المستخدم</option>
                    <option value="kanban">كانبان</option>
                    <option value="timeline">الجدول الزمني</option>
                  </select>
                </div>
              </div>
              
              <div className="flex space-x-3 rtl:space-x-reverse mt-6">
                <Button 
                  className="flex-1"
                  onClick={() => createNewBoard()}
                >
                  إنشاء
                </Button>
                <Button 
                  variant="outline" 
                  className="flex-1"
                  onClick={() => setShowCreateModal(false)}
                >
                  إلغاء
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
