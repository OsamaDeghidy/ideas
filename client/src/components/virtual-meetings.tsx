"use client"

import React, { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Video,
  VideoOff,
  Mic,
  MicOff,
  Monitor,
  MonitorOff,
  Phone,
  PhoneOff,
  Users,
  Calendar,
  Clock,
  Play,
  Pause,
  Square,
  Camera,
  Settings,
  MessageSquare,
  Hand,
  MoreVertical,
  Grid3X3,
  Maximize,
  Volume2,
  VolumeOff,
  Share,
  Download,
  Gamepad2,
  Lightbulb,
  PenTool,
  Zap,
  Target,
  Puzzle,
  Plus,
  ExternalLink,
  Eye,
  BarChart3
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

// أنواع البيانات
interface Participant {
  id: string
  name: string
  email: string
  avatar: string
  isHost: boolean
  isMuted: boolean
  isVideoOn: boolean
  isHandRaised: boolean
  joinedAt: Date
  status: 'connected' | 'connecting' | 'disconnected'
  role: 'host' | 'co-host' | 'participant' | 'viewer'
  permissions: {
    canShareScreen: boolean
    canRecord: boolean
    canManageParticipants: boolean
    canStartGames: boolean
  }
}

interface Meeting {
  id: string
  title: string
  description: string
  type: 'brainstorming' | 'review' | 'planning' | 'presentation' | 'workshop' | 'hackathon'
  host: Participant
  participants: Participant[]
  scheduledAt: Date
  duration: number
  status: 'scheduled' | 'active' | 'ended' | 'cancelled'
  roomId: string
  recordingStatus: 'not-started' | 'recording' | 'paused' | 'stopped'
  recordingUrl?: string
  sharedScreenBy?: string
  miroBoards: MiroBoard[]
  gamesActive: boolean
  currentGame?: BrainstormingGame
  settings: {
    allowScreenShare: boolean
    allowRecording: boolean
    allowChat: boolean
    allowHandRaise: boolean
    autoRecord: boolean
    waitingRoom: boolean
    maxParticipants: number
  }
  analytics: {
    totalParticipants: number
    averageDuration: number
    gamesPlayed: number
    ideasGenerated: number
  }
}

interface MiroBoard {
  id: string
  title: string
  url: string
  thumbnail: string
  sharedBy: string
  sharedAt: Date
  type: 'brainstorming' | 'mindmap' | 'prototype' | 'userstory' | 'kanban' | 'timeline'
  permissions: 'view' | 'edit' | 'admin'
  isActive: boolean
  lastActivity: Date
  collaborators: string[]
  elements: {
    stickyNotes: number
    shapes: number
    images: number
    connectors: number
  }
}

interface BrainstormingGame {
  id: string
  name: string
  description: string
  icon: React.ComponentType<any>
  duration: number
  participants: string[]
  status: 'preparing' | 'active' | 'completed'
  results?: any
}

// ألعاب العصف الذهني للاجتماعات
const meetingGames: BrainstormingGame[] = [
  {
    id: "rapid-ideas",
    name: "الأفكار السريعة",
    description: "توليد أكبر عدد من الأفكار في 5 دقائق",
    icon: Zap,
    duration: 300,
    participants: [],
    status: "preparing"
  },
  {
    id: "puzzle-solve",
    name: "حل الألغاز الجماعي",
    description: "حل تحدي إبداعي كفريق واحد",
    icon: Puzzle,
    duration: 600,
    participants: [],
    status: "preparing"
  },
  {
    id: "random-connect",
    name: "الربط العشوائي",
    description: "ربط مفاهيم غير مترابطة لإنتاج أفكار جديدة",
    icon: Target,
    duration: 480,
    participants: [],
    status: "preparing"
  },
  {
    id: "story-build",
    name: "بناء القصة",
    description: "إنشاء قصة تعاونية تحمل فكرة مبتكرة",
    icon: PenTool,
    duration: 720,
    participants: [],
    status: "preparing"
  },
  {
    id: "mind-map",
    name: "الخريطة الذهنية التعاونية",
    description: "رسم خريطة ذهنية جماعية في الوقت الفعلي",
    icon: Lightbulb,
    duration: 900,
    participants: [],
    status: "preparing"
  }
]

// بيانات تجريبية
const sampleMeetings: Meeting[] = [
  {
    id: "meeting1",
    title: "ورشة العصف الذهني - منتجات مبتكرة",
    description: "جلسة عصف ذهني لتطوير أفكار منتجات جديدة للشركة",
    type: "brainstorming",
    host: {
      id: "host1",
      name: "نوال الأحمد",
      email: "nowal@company.com",
      avatar: "",
      isHost: true,
      isMuted: false,
      isVideoOn: true,
      isHandRaised: false,
      joinedAt: new Date(),
      status: "connected",
      role: "host",
      permissions: {
        canShareScreen: true,
        canRecord: true,
        canManageParticipants: true,
        canStartGames: true
      }
    },
    participants: [
      {
        id: "p1",
        name: "أحمد محمد",
        email: "ahmed@company.com",
        avatar: "",
        isHost: false,
        isMuted: false,
        isVideoOn: true,
        isHandRaised: true,
        joinedAt: new Date(Date.now() - 5 * 60 * 1000),
        status: "connected",
        role: "co-host",
        permissions: {
          canShareScreen: true,
          canRecord: false,
          canManageParticipants: false,
          canStartGames: true
        }
      },
      {
        id: "p2",
        name: "سارة علي",
        email: "sara@company.com",
        avatar: "",
        isHost: false,
        isMuted: true,
        isVideoOn: false,
        isHandRaised: false,
        joinedAt: new Date(Date.now() - 3 * 60 * 1000),
        status: "connected",
        role: "participant",
        permissions: {
          canShareScreen: false,
          canRecord: false,
          canManageParticipants: false,
          canStartGames: false
        }
      },
      {
        id: "p3",
        name: "محمد حسن",
        email: "mohamed@company.com",
        avatar: "",
        isHost: false,
        isMuted: false,
        isVideoOn: true,
        isHandRaised: false,
        joinedAt: new Date(Date.now() - 7 * 60 * 1000),
        status: "connecting",
        role: "participant",
        permissions: {
          canShareScreen: false,
          canRecord: false,
          canManageParticipants: false,
          canStartGames: false
        }
      }
    ],
    scheduledAt: new Date(),
    duration: 120,
    status: "active",
    roomId: "room-123",
    recordingStatus: "recording",
    sharedScreenBy: "p1",
    miroBoards: [
      {
        id: "miro1",
        title: "خريطة الأفكار الرئيسية",
        url: "https://miro.com/app/board/abc123",
        thumbnail: "/miro-thumb1.png",
        sharedBy: "نوال الأحمد",
        sharedAt: new Date(Date.now() - 10 * 60 * 1000),
        type: "mindmap",
        permissions: "edit",
        isActive: true,
        lastActivity: new Date(),
        collaborators: ["نوال الأحمد", "أحمد محمد"],
        elements: {
          stickyNotes: 15,
          shapes: 8,
          images: 3,
          connectors: 12
        }
      },
      {
        id: "miro2",
        title: "نموذج المنتج الأولي",
        url: "https://miro.com/app/board/def456",
        thumbnail: "/miro-thumb2.png",
        sharedBy: "أحمد محمد",
        sharedAt: new Date(Date.now() - 5 * 60 * 1000),
        type: "prototype",
        permissions: "view",
        isActive: false,
        lastActivity: new Date(Date.now() - 30 * 60 * 1000),
        collaborators: ["أحمد محمد"],
        elements: {
          stickyNotes: 8,
          shapes: 12,
          images: 5,
          connectors: 6
        }
      }
    ],
    gamesActive: true,
    currentGame: meetingGames[0],
    settings: {
      allowScreenShare: true,
      allowRecording: true,
      allowChat: true,
      allowHandRaise: true,
      autoRecord: false,
      waitingRoom: true,
      maxParticipants: 50
    },
    analytics: {
      totalParticipants: 4,
      averageDuration: 45,
      gamesPlayed: 2,
      ideasGenerated: 12
    }
  }
]

export default function VirtualMeetings() {
  const [selectedMeeting, setSelectedMeeting] = useState<Meeting | null>(null)
  const [inMeeting, setInMeeting] = useState(false)
  const [showGames, setShowGames] = useState(false)
  const [activeGame, setActiveGame] = useState<BrainstormingGame | null>(null)
  
  // حالات التحكم في الاجتماع
  const [isMuted, setIsMuted] = useState(false)
  const [isVideoOn, setIsVideoOn] = useState(true)
  const [isScreenSharing, setIsScreenSharing] = useState(false)
  const [isRecording, setIsRecording] = useState(false)
  const [showParticipants, setShowParticipants] = useState(true)
  const [showChat, setShowChat] = useState(false)
  const [showMiroPanel, setShowMiroPanel] = useState(false)
  const [showAnalytics, setShowAnalytics] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [waitingRoom, setWaitingRoom] = useState(false)
  const [breakoutRooms, setBreakoutRooms] = useState(false)
  
  const videoRef = useRef<HTMLVideoElement>(null)
  const [meetingTime, setMeetingTime] = useState(0)
  const [chatMessages, setChatMessages] = useState<Array<{
    id: string
    sender: string
    message: string
    timestamp: Date
    type: 'text' | 'file' | 'reaction'
  }>>([])

  // محاكاة عداد وقت الاجتماع
  useEffect(() => {
    let interval: NodeJS.Timeout
    if (inMeeting) {
      interval = setInterval(() => {
        setMeetingTime(prev => prev + 1)
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [inMeeting])

  // تنسيق الوقت
  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600)
    const mins = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  // دالة بدء الاجتماع
  const startMeeting = (meeting: Meeting) => {
    setSelectedMeeting(meeting)
    setInMeeting(true)
    setMeetingTime(0)
  }

  // دالة إنهاء الاجتماع
  const endMeeting = () => {
    setInMeeting(false)
    setSelectedMeeting(null)
    setActiveGame(null)
    setShowGames(false)
  }

  // دالة بدء لعبة
  const startGame = (game: BrainstormingGame) => {
    setActiveGame({...game, status: 'active', participants: selectedMeeting?.participants.map(p => p.id) || []})
    setShowGames(true)
  }

  if (inMeeting && selectedMeeting) {
    return (
      <div className="fixed inset-0 bg-gray-900 flex flex-col">
        {/* شريط أدوات الاجتماع العلوي */}
        <div className="bg-gray-800 text-white p-4 flex items-center justify-between">
          <div className="flex items-center space-x-4 rtl:space-x-reverse">
            <h2 className="text-lg font-semibold">{selectedMeeting.title}</h2>
            <Badge variant="secondary" className="bg-red-500 text-white">
              <div className="w-2 h-2 bg-white rounded-full mr-2 animate-pulse"></div>
              مباشر
            </Badge>
            <span className="text-sm text-gray-300">{formatTime(meetingTime)}</span>
          </div>
          
          <div className="flex items-center space-x-4 rtl:space-x-reverse">
            <span className="text-sm text-gray-300">
              {selectedMeeting.participants.length + 1} مشارك
            </span>
            
            {selectedMeeting.recordingStatus === 'recording' && (
              <Badge variant="destructive">
                جاري التسجيل
              </Badge>
            )}
          </div>
        </div>

        <div className="flex-1 flex">
          {/* منطقة الفيديو الرئيسية */}
          <div className="flex-1 bg-black relative">
            {/* فيديو المتحدث الرئيسي */}
            <div className="w-full h-full flex items-center justify-center">
              <div className="bg-gray-700 rounded-lg w-full h-full max-w-4xl max-h-96 flex items-center justify-center">
                <div className="text-center text-white">
                  <div className="w-24 h-24 bg-blue-500 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                    {selectedMeeting.host.name.charAt(0)}
                  </div>
                  <p className="text-lg">{selectedMeeting.host.name}</p>
                  <p className="text-sm text-gray-300">المتحدث الرئيسي</p>
                </div>
              </div>
            </div>

            {/* فيديوهات المشاركين الصغيرة */}
            <div className="absolute bottom-4 right-4 flex space-x-2 rtl:space-x-reverse">
              {selectedMeeting.participants.slice(0, 4).map((participant) => (
                <div key={participant.id} className="relative">
                  <div className="w-32 h-24 bg-gray-600 rounded-lg flex items-center justify-center">
                    {participant.isVideoOn ? (
                      <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                        {participant.name.charAt(0)}
                      </div>
                    ) : (
                      <VideoOff className="w-6 h-6 text-gray-400" />
                    )}
                  </div>
                  
                  {participant.isMuted && (
                    <div className="absolute bottom-1 left-1 bg-red-500 rounded-full p-1">
                      <MicOff className="w-3 h-3 text-white" />
                    </div>
                  )}
                  
                  {participant.isHandRaised && (
                    <div className="absolute top-1 right-1 bg-yellow-500 rounded-full p-1">
                      <Hand className="w-3 h-3 text-white" />
                    </div>
                  )}
                  
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent rounded-b-lg p-1">
                    <p className="text-white text-xs truncate">{participant.name}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* مشاركة الشاشة */}
            {isScreenSharing && (
              <div className="absolute top-4 left-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm">
                جاري مشاركة الشاشة
              </div>
            )}

            {/* اللعبة النشطة */}
            {activeGame && (
              <div className="absolute top-16 left-4 right-4 bg-white rounded-lg p-4 shadow-lg">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3 rtl:space-x-reverse">
                    <activeGame.icon className="w-6 h-6 text-purple-500" />
                    <h3 className="text-lg font-semibold">{activeGame.name}</h3>
                    <Badge variant="secondary">نشط</Badge>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setActiveGame(null)}
                  >
                    إيقاف
                  </Button>
                </div>
                <p className="text-gray-600 mb-3">{activeGame.description}</p>
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                  <p className="text-sm text-yellow-800">
                    اللعبة نشطة الآن! شارك مع الفريق لتحقيق أفضل النتائج.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* اللوحة الجانبية */}
          <div className="w-80 bg-white border-l border-gray-200 flex flex-col">
            {/* تبويبات اللوحة الجانبية */}
            <div className="border-b border-gray-200 flex">
              <button
                onClick={() => {
                  setShowParticipants(true)
                  setShowChat(false)
                  setShowMiroPanel(false)
                  setShowAnalytics(false)
                }}
                className={`flex-1 p-3 text-sm font-medium ${
                  showParticipants ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'
                }`}
              >
                <Users className="w-4 h-4 inline mr-2" />
                المشاركون
              </button>
              <button
                onClick={() => {
                  setShowParticipants(false)
                  setShowChat(true)
                  setShowMiroPanel(false)
                  setShowAnalytics(false)
                }}
                className={`flex-1 p-3 text-sm font-medium ${
                  showChat ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'
                }`}
              >
                <MessageSquare className="w-4 h-4 inline mr-2" />
                الدردشة
              </button>
              <button
                onClick={() => {
                  setShowParticipants(false)
                  setShowChat(false)
                  setShowMiroPanel(true)
                  setShowAnalytics(false)
                }}
                className={`flex-1 p-3 text-sm font-medium ${
                  showMiroPanel ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'
                }`}
              >
                <PenTool className="w-4 h-4 inline mr-2" />
                Miro
              </button>
              <button
                onClick={() => {
                  setShowParticipants(false)
                  setShowChat(false)
                  setShowMiroPanel(false)
                  setShowAnalytics(true)
                }}
                className={`flex-1 p-3 text-sm font-medium ${
                  showAnalytics ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'
                }`}
              >
                <BarChart3 className="w-4 h-4 inline mr-2" />
                التحليلات
              </button>
            </div>

            {/* محتوى اللوحة الجانبية */}
            <div className="flex-1 overflow-y-auto p-4">
              {showParticipants ? (
                /* قائمة المشاركين */
                <div className="space-y-3">
                  {/* المضيف */}
                  <div className="flex items-center space-x-3 rtl:space-x-reverse p-2 bg-blue-50 rounded-lg">
                    <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                      {selectedMeeting.host.name.charAt(0)}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-800">{selectedMeeting.host.name}</p>
                      <p className="text-sm text-blue-600">مضيف الاجتماع</p>
                    </div>
                    <div className="flex space-x-1 rtl:space-x-reverse">
                      {!selectedMeeting.host.isMuted ? (
                        <Mic className="w-4 h-4 text-green-500" />
                      ) : (
                        <MicOff className="w-4 h-4 text-red-500" />
                      )}
                      {selectedMeeting.host.isVideoOn ? (
                        <Video className="w-4 h-4 text-green-500" />
                      ) : (
                        <VideoOff className="w-4 h-4 text-red-500" />
                      )}
                    </div>
                  </div>

                  {/* المشاركون */}
                  {selectedMeeting.participants.map((participant) => (
                    <div key={participant.id} className="flex items-center space-x-3 rtl:space-x-reverse p-2 hover:bg-gray-50 rounded-lg">
                      <div className="relative">
                        <div className="w-10 h-10 bg-gray-500 rounded-full flex items-center justify-center text-white font-bold">
                          {participant.name.charAt(0)}
                        </div>
                        <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${
                          participant.status === 'connected' ? 'bg-green-500' :
                          participant.status === 'connecting' ? 'bg-yellow-500' : 'bg-red-500'
                        }`}></div>
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-gray-800">{participant.name}</p>
                        <p className="text-sm text-gray-500">
                          انضم منذ {Math.floor((Date.now() - participant.joinedAt.getTime()) / (1000 * 60))} دقيقة
                        </p>
                      </div>
                      <div className="flex space-x-1 rtl:space-x-reverse">
                        {participant.isHandRaised && (
                          <Hand className="w-4 h-4 text-yellow-500" />
                        )}
                        {!participant.isMuted ? (
                          <Mic className="w-4 h-4 text-green-500" />
                        ) : (
                          <MicOff className="w-4 h-4 text-red-500" />
                        )}
                        {participant.isVideoOn ? (
                          <Video className="w-4 h-4 text-green-500" />
                        ) : (
                          <VideoOff className="w-4 h-4 text-red-500" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : showChat ? (
                /* منطقة الدردشة */
                <div className="h-full flex flex-col">
                  <div className="flex-1 bg-gray-50 rounded-lg p-3 mb-3 overflow-y-auto">
                    {chatMessages.length > 0 ? (
                      <div className="space-y-2">
                        {chatMessages.map((msg) => (
                          <div key={msg.id} className="flex space-x-2 rtl:space-x-reverse">
                            <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs">
                              {msg.sender.charAt(0)}
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center space-x-2 rtl:space-x-reverse">
                                <span className="text-sm font-medium">{msg.sender}</span>
                                <span className="text-xs text-gray-500">
                                  {msg.timestamp.toLocaleTimeString('ar')}
                                </span>
                              </div>
                              <p className="text-sm text-gray-700">{msg.message}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-center text-gray-500 text-sm">لا توجد رسائل بعد</p>
                    )}
                  </div>
                  <div className="flex space-x-2 rtl:space-x-reverse">
                    <input
                      type="text"
                      placeholder="اكتب رسالة..."
                      className="flex-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <Button size="sm">إرسال</Button>
                  </div>
                </div>
              ) : showMiroPanel ? (
                /* لوحة Miro */
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium text-gray-800">لوحات Miro</h4>
                    <Button size="sm" variant="outline">
                      <Plus className="w-3 h-3 mr-1" />
                      لوحة جديدة
                    </Button>
                  </div>
                  
                  {selectedMeeting.miroBoards.map((board) => (
                    <div key={board.id} className="border border-gray-200 rounded-lg p-3 hover:bg-gray-50">
                      <div className="flex items-center space-x-3 rtl:space-x-reverse mb-2">
                        <div className="w-8 h-8 bg-blue-100 rounded flex items-center justify-center">
                          <PenTool className="w-4 h-4 text-blue-500" />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-sm">{board.title}</p>
                          <p className="text-xs text-gray-500">{board.type}</p>
                        </div>
                        <Badge variant={board.isActive ? "default" : "secondary"}>
                          {board.isActive ? "نشط" : "غير نشط"}
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-2 text-xs text-gray-600 mb-3">
                        <div>الملاحظات: {board.elements.stickyNotes}</div>
                        <div>الأشكال: {board.elements.shapes}</div>
                        <div>الصور: {board.elements.images}</div>
                        <div>الروابط: {board.elements.connectors}</div>
                      </div>
                      
                      <div className="flex space-x-2 rtl:space-x-reverse">
                        <Button size="sm" variant="outline" className="flex-1">
                          <ExternalLink className="w-3 h-3 mr-1" />
                          فتح
                        </Button>
                        <Button size="sm" variant="outline">
                          <Eye className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : showAnalytics ? (
                /* التحليلات */
                <div className="space-y-4">
                  <h4 className="font-medium text-gray-800">تحليلات الاجتماع</h4>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-blue-50 rounded-lg p-3">
                      <div className="text-2xl font-bold text-blue-600">
                        {selectedMeeting.analytics.totalParticipants}
                      </div>
                      <div className="text-xs text-blue-600">المشاركون</div>
                    </div>
                    
                    <div className="bg-green-50 rounded-lg p-3">
                      <div className="text-2xl font-bold text-green-600">
                        {selectedMeeting.analytics.averageDuration} د
                      </div>
                      <div className="text-xs text-green-600">متوسط المدة</div>
                    </div>
                    
                    <div className="bg-purple-50 rounded-lg p-3">
                      <div className="text-2xl font-bold text-purple-600">
                        {selectedMeeting.analytics.gamesPlayed}
                      </div>
                      <div className="text-xs text-purple-600">الألعاب</div>
                    </div>
                    
                    <div className="bg-orange-50 rounded-lg p-3">
                      <div className="text-2xl font-bold text-orange-600">
                        {selectedMeeting.analytics.ideasGenerated}
                      </div>
                      <div className="text-xs text-orange-600">الأفكار</div>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-3">
                    <h5 className="font-medium text-gray-800 mb-2">نشاط المشاركين</h5>
                    <div className="space-y-2">
                      {selectedMeeting.participants.map((p) => (
                        <div key={p.id} className="flex items-center justify-between">
                          <span className="text-sm">{p.name}</span>
                          <div className="flex items-center space-x-2 rtl:space-x-reverse">
                            {p.isHandRaised && <Hand className="w-3 h-3 text-yellow-500" />}
                            {!p.isMuted && <Mic className="w-3 h-3 text-green-500" />}
                            {p.isVideoOn && <Video className="w-3 h-3 text-green-500" />}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : null}
            </div>

            {/* ألعاب العصف الذهني */}
            <div className="border-t border-gray-200 p-4">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-medium text-gray-800">ألعاب العصف الذهني</h4>
                <Gamepad2 className="w-5 h-5 text-purple-500" />
              </div>
              
              <div className="grid grid-cols-2 gap-2">
                {meetingGames.slice(0, 4).map((game) => {
                  const GameIcon = game.icon
                  return (
                    <button
                      key={game.id}
                      onClick={() => startGame(game)}
                      className="p-2 bg-gray-50 hover:bg-gray-100 rounded-lg text-center transition-colors"
                    >
                      <GameIcon className="w-6 h-6 text-purple-500 mx-auto mb-1" />
                      <p className="text-xs font-medium text-gray-800">{game.name}</p>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* لوحات Miro */}
            {selectedMeeting.miroBoards.length > 0 && (
              <div className="border-t border-gray-200 p-4">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-medium text-gray-800">لوحات Miro المشتركة</h4>
                  <Button size="sm" variant="outline">
                    <Plus className="w-3 h-3 mr-1" />
                    إضافة
                  </Button>
                </div>
                {selectedMeeting.miroBoards.map((board) => (
                  <div key={board.id} className="flex items-center space-x-3 rtl:space-x-reverse p-2 hover:bg-gray-50 rounded-lg cursor-pointer border border-gray-200 mb-2">
                    <div className="w-10 h-8 bg-blue-100 rounded flex items-center justify-center">
                      <PenTool className="w-4 h-4 text-blue-500" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-800">{board.title}</p>
                      <p className="text-xs text-gray-500">مشارك بواسطة {board.sharedBy}</p>
                      <p className="text-xs text-blue-600">انقر للفتح في تبويب جديد</p>
                    </div>
                    <div className="flex space-x-1 rtl:space-x-reverse">
                      <Button size="sm" variant="outline" className="p-1">
                        <ExternalLink className="w-3 h-3" />
                      </Button>
                      <Button size="sm" variant="outline" className="p-1">
                        <Eye className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                ))}
                
                <div className="mt-3 p-2 bg-green-50 rounded-lg border border-green-200">
                  <p className="text-xs text-green-700 font-medium mb-1">💡 نصيحة:</p>
                  <p className="text-xs text-green-600">
                    استخدم لوحات Miro للعصف الذهني المرئي والتعاون في الوقت الفعلي مع جميع المشاركين
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* شريط التحكم السفلي */}
        <div className="bg-gray-800 p-4 flex items-center justify-center space-x-4 rtl:space-x-reverse">
          {/* مايكروفون */}
          <Button
            variant={isMuted ? "destructive" : "secondary"}
            size="lg"
            className="rounded-full w-12 h-12"
            onClick={() => setIsMuted(!isMuted)}
          >
            {isMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
          </Button>

          {/* كاميرا */}
          <Button
            variant={!isVideoOn ? "destructive" : "secondary"}
            size="lg"
            className="rounded-full w-12 h-12"
            onClick={() => setIsVideoOn(!isVideoOn)}
          >
            {isVideoOn ? <Video className="w-5 h-5" /> : <VideoOff className="w-5 h-5" />}
          </Button>

          {/* مشاركة الشاشة */}
          <Button
            variant={isScreenSharing ? "default" : "secondary"}
            size="lg"
            className="rounded-full w-12 h-12"
            onClick={() => setIsScreenSharing(!isScreenSharing)}
          >
            {isScreenSharing ? <MonitorOff className="w-5 h-5" /> : <Monitor className="w-5 h-5" />}
          </Button>

          {/* تسجيل */}
          <Button
            variant={isRecording ? "destructive" : "secondary"}
            size="lg"
            className="rounded-full w-12 h-12"
            onClick={() => setIsRecording(!isRecording)}
          >
            {isRecording ? <Square className="w-5 h-5" /> : <Play className="w-5 h-5" />}
          </Button>

          {/* إنهاء الاجتماع */}
          <Button
            variant="destructive"
            size="lg"
            className="rounded-full w-12 h-12"
            onClick={endMeeting}
          >
            <PhoneOff className="w-5 h-5" />
          </Button>

          {/* إعدادات */}
          <Button
            variant="secondary"
            size="lg"
            className="rounded-full w-12 h-12"
          >
            <Settings className="w-5 h-5" />
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6 p-6">
      {/* عنوان القسم */}
      <div className="text-center">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          الاجتماعات الافتراضية
        </h2>
        <p className="text-gray-600 mt-2">اجتماعات تفاعلية مع ألعاب العصف الذهني ومشاركة Miro</p>
      </div>

      {/* أزرار الإجراءات */}
      <div className="flex justify-center space-x-4 rtl:space-x-reverse">
        <Button className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600">
          <Video className="w-4 h-4 mr-2" />
          بدء اجتماع فوري
        </Button>
        
        <Button variant="outline">
          <Calendar className="w-4 h-4 mr-2" />
          جدولة اجتماع
        </Button>
        
        <Button variant="outline">
          <Users className="w-4 h-4 mr-2" />
          انضمام لاجتماع
        </Button>
      </div>

      {/* الاجتماعات المجدولة */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-gray-800">الاجتماعات المجدولة</h3>
        
        {sampleMeetings.map((meeting) => (
          <motion.div
            key={meeting.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-lg border border-gray-200"
          >
            <Card>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <CardTitle className="text-lg font-semibold text-gray-800 mb-2">
                      {meeting.title}
                    </CardTitle>
                    <p className="text-gray-600 text-sm mb-3">{meeting.description}</p>
                    
                    <div className="flex items-center space-x-4 rtl:space-x-reverse mb-3">
                      <Badge variant="secondary">{
                        meeting.type === 'brainstorming' ? 'عصف ذهني' :
                        meeting.type === 'review' ? 'مراجعة' :
                        meeting.type === 'planning' ? 'تخطيط' : 'عرض تقديمي'
                      }</Badge>
                      
                      <div className="flex items-center space-x-2 rtl:space-x-reverse text-sm text-gray-600">
                        <Calendar className="w-4 h-4" />
                        <span>{meeting.scheduledAt.toLocaleDateString('ar')}</span>
                      </div>
                      
                      <div className="flex items-center space-x-2 rtl:space-x-reverse text-sm text-gray-600">
                        <Clock className="w-4 h-4" />
                        <span>{meeting.duration} دقيقة</span>
                      </div>
                      
                      <div className="flex items-center space-x-2 rtl:space-x-reverse text-sm text-gray-600">
                        <Users className="w-4 h-4" />
                        <span>{meeting.participants.length + 1} مشارك</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3 rtl:space-x-reverse">
                      <span className="text-sm text-gray-600">المضيف:</span>
                      <div className="flex items-center space-x-2 rtl:space-x-reverse">
                        <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                          {meeting.host.name.charAt(0)}
                        </div>
                        <span className="text-sm font-medium text-gray-800">{meeting.host.name}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2 rtl:space-x-reverse">
                    <Button
                      onClick={() => startMeeting(meeting)}
                      className="bg-green-500 hover:bg-green-600"
                    >
                      <Play className="w-4 h-4 mr-1" />
                      انضمام
                    </Button>
                    
                    <Button variant="outline">
                      <MoreVertical className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent>
                {/* المشاركون */}
                <div className="flex items-center space-x-3 rtl:space-x-reverse mb-4">
                  <span className="text-sm text-gray-600">المشاركون:</span>
                  <div className="flex -space-x-2 rtl:space-x-reverse">
                    {meeting.participants.slice(0, 5).map((participant) => (
                      <div
                        key={participant.id}
                        className="w-8 h-8 bg-gray-400 rounded-full border-2 border-white flex items-center justify-center text-white text-xs font-bold"
                        title={participant.name}
                      >
                        {participant.name.charAt(0)}
                      </div>
                    ))}
                    {meeting.participants.length > 5 && (
                      <div className="w-8 h-8 bg-gray-300 rounded-full border-2 border-white flex items-center justify-center text-gray-600 text-xs">
                        +{meeting.participants.length - 5}
                      </div>
                    )}
                  </div>
                </div>
                
                {/* الميزات */}
                <div className="flex items-center space-x-4 rtl:space-x-reverse text-sm text-gray-600">
                  {meeting.gamesActive && (
                    <div className="flex items-center space-x-1 rtl:space-x-reverse">
                      <Gamepad2 className="w-4 h-4 text-purple-500" />
                      <span>ألعاب تفاعلية</span>
                    </div>
                  )}
                  
                  {meeting.miroBoards.length > 0 && (
                    <div className="flex items-center space-x-1 rtl:space-x-reverse">
                      <PenTool className="w-4 h-4 text-blue-500" />
                      <span>{meeting.miroBoards.length} لوحة Miro</span>
                    </div>
                  )}
                  
                  {meeting.recordingStatus !== 'not-started' && (
                    <div className="flex items-center space-x-1 rtl:space-x-reverse">
                      <Camera className="w-4 h-4 text-red-500" />
                      <span>قابل للتسجيل</span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* الاجتماعات المسجلة */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-gray-800">الاجتماعات المسجلة</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-base">اجتماع العصف الذهني #{i}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex justify-between">
                    <span>التاريخ:</span>
                    <span>{new Date(Date.now() - i * 24 * 60 * 60 * 1000).toLocaleDateString('ar')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>المدة:</span>
                    <span>45 دقيقة</span>
                  </div>
                  <div className="flex justify-between">
                    <span>المشاركون:</span>
                    <span>8 أشخاص</span>
                  </div>
                </div>
                
                <div className="flex space-x-2 rtl:space-x-reverse mt-4">
                  <Button size="sm" variant="outline" className="flex-1">
                    <Play className="w-4 h-4 mr-1" />
                    تشغيل
                  </Button>
                  <Button size="sm" variant="outline">
                    <Download className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="outline">
                    <Share className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
