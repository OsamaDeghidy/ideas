"use client"

import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Archive,
  Search,
  Tag,
  Lightbulb,
  RefreshCw,
  Share2,
  Heart,
  MessageCircle,
  Sparkles,
  TrendingUp,
  Eye,
  BookOpen,
  Shuffle,
  Play,
  Bookmark,
  Star
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

// أنواع البيانات
interface ArchivedIdea {
  id: string
  title: string
  description: string
  originalAuthor: string
  category: string
  tags: string[]
  archivedAt: Date
  originalDate: Date
  rejectionReason: string
  averageScore: number
  inspirationCount: number // عدد المرات التي ألهمت فيها أفكار جديدة
  views: number
  likes: number
  comments: number
  status: 'archived' | 'inspiring' | 'reference'
  relatedIdeas: string[] // أفكار مرتبطة
}

interface BrainstormingSession {
  id: string
  title: string
  description: string
  facilitator: string
  participants: string[]
  duration: number
  ideasGenerated: number
  archivedIdeasUsed: ArchivedIdea[]
  date: Date
  status: 'planned' | 'active' | 'completed'
  type: 'workshop' | 'meeting' | 'hackathon'
}

// بيانات تجريبية للأفكار المؤرشفة
const archivedIdeas: ArchivedIdea[] = [
  {
    id: "arch1",
    title: "نظام التوصيل بالدرونز",
    description: "استخدام الطائرات المسيرة لتوصيل الطلبات في المناطق الحضرية",
    originalAuthor: "محمد علي",
    category: "اللوجستيات",
    tags: ["طائرات مسيرة", "توصيل", "تكنولوجيا", "مستقبلية"],
    archivedAt: new Date("2024-01-20"),
    originalDate: new Date("2024-01-15"),
    rejectionReason: "تحديات قانونية وتقنية حالياً - قد تكون مناسبة في المستقبل",
    averageScore: 45,
    inspirationCount: 3,
    views: 25,
    likes: 8,
    comments: 12,
    status: "inspiring",
    relatedIdeas: ["arch2", "arch3"]
  },
  {
    id: "arch2",
    title: "منصة الواقع الافتراضي للتسوق",
    description: "تجربة تسوق ثلاثية الأبعاد باستخدام تقنية VR",
    originalAuthor: "سارة أحمد",
    category: "التجارة الإلكترونية",
    tags: ["واقع افتراضي", "تسوق", "تجربة مستخدم", "تقنية"],
    archivedAt: new Date("2024-01-18"),
    originalDate: new Date("2024-01-10"),
    rejectionReason: "تكلفة عالية - تحتاج تطوير تقني كبير",
    averageScore: 62,
    inspirationCount: 5,
    views: 42,
    likes: 15,
    comments: 8,
    status: "reference",
    relatedIdeas: ["arch1", "arch4"]
  },
  {
    id: "arch3",
    title: "نظام ذكي لإدارة الطاقة المنزلية",
    description: "نظام AI لتحسين استهلاك الطاقة في المنازل الذكية",
    originalAuthor: "أحمد محمد",
    category: "الطاقة والاستدامة",
    tags: ["ذكاء اصطناعي", "طاقة", "منازل ذكية", "استدامة"],
    archivedAt: new Date("2024-01-22"),
    originalDate: new Date("2024-01-12"),
    rejectionReason: "يحتاج شراكات خارجية - خارج نطاق عملنا الحالي",
    averageScore: 58,
    inspirationCount: 2,
    views: 31,
    likes: 12,
    comments: 6,
    status: "archived",
    relatedIdeas: ["arch2"]
  },
  {
    id: "arch4",
    title: "تطبيق الترجمة الفورية بالكاميرا",
    description: "ترجمة النصوص فورياً عبر كاميرا الهاتف باستخدام AI",
    originalAuthor: "فاطمة حسن",
    category: "التطبيقات المحمولة",
    tags: ["ترجمة", "ذكاء اصطناعي", "كاميرا", "لغات"],
    archivedAt: new Date("2024-01-25"),
    originalDate: new Date("2024-01-08"),
    rejectionReason: "منافسة شديدة - Google Lens يقدم نفس الخدمة",
    averageScore: 71,
    inspirationCount: 7,
    views: 56,
    likes: 23,
    comments: 14,
    status: "inspiring",
    relatedIdeas: ["arch1", "arch2", "arch3"]
  }
]

// جلسات العصف الذهني
const brainstormingSessions: BrainstormingSession[] = [
  {
    id: "bs1",
    title: "ورشة الابتكار في التجارة الإلكترونية",
    description: "استكشاف أفكار جديدة لتحسين تجربة التسوق الرقمي",
    facilitator: "نوال الأحمد",
    participants: ["أحمد محمد", "سارة علي", "محمد حسن", "فاطمة يوسف"],
    duration: 120,
    ideasGenerated: 15,
    archivedIdeasUsed: [archivedIdeas[1], archivedIdeas[3]],
    date: new Date("2024-02-01"),
    status: "completed",
    type: "workshop"
  },
  {
    id: "bs2",
    title: "هاكاثون الطاقة المتجددة",
    description: "تطوير حلول مبتكرة للطاقة المستدامة",
    facilitator: "خالد السعد",
    participants: ["محمد علي", "سارة أحمد", "أحمد الفهد"],
    duration: 480,
    ideasGenerated: 8,
    archivedIdeasUsed: [archivedIdeas[2]],
    date: new Date("2024-02-15"),
    status: "planned",
    type: "hackathon"
  }
]

export default function IdeasArchive() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [selectedIdea, setSelectedIdea] = useState<ArchivedIdea | null>(null)
  const [showBrainstorming, setShowBrainstorming] = useState(false)
  const [randomIdeas, setRandomIdeas] = useState<ArchivedIdea[]>([])

  // فلترة الأفكار
  const filteredIdeas = archivedIdeas.filter(idea => {
    const matchesSearch = idea.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         idea.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         idea.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesCategory = selectedCategory === "all" || idea.category === selectedCategory
    const matchesStatus = selectedStatus === "all" || idea.status === selectedStatus
    return matchesSearch && matchesCategory && matchesStatus
  })

  // الحصول على فئات فريدة
  const categories = Array.from(new Set(archivedIdeas.map(idea => idea.category)))

  // دالة الحصول على أفكار عشوائية للإلهام
  const getRandomIdeas = () => {
    const shuffled = [...archivedIdeas].sort(() => 0.5 - Math.random())
    setRandomIdeas(shuffled.slice(0, 3))
  }

  // دالة تحديد لون الحالة
  const getStatusInfo = (status: string) => {
    switch (status) {
      case 'inspiring':
        return { label: 'ملهمة', color: 'text-yellow-600', bgColor: 'bg-yellow-100', icon: Sparkles }
      case 'reference':
        return { label: 'مرجعية', color: 'text-blue-600', bgColor: 'bg-blue-100', icon: BookOpen }
      case 'archived':
        return { label: 'مؤرشفة', color: 'text-gray-600', bgColor: 'bg-gray-100', icon: Archive }
      default:
        return { label: 'غير محدد', color: 'text-gray-600', bgColor: 'bg-gray-100', icon: Archive }
    }
  }

  // إحصائيات الأرشيف
  const archiveStats = {
    total: archivedIdeas.length,
    inspiring: archivedIdeas.filter(i => i.status === 'inspiring').length,
    reference: archivedIdeas.filter(i => i.status === 'reference').length,
    totalViews: archivedIdeas.reduce((sum, i) => sum + i.views, 0),
    totalInspiration: archivedIdeas.reduce((sum, i) => sum + i.inspirationCount, 0)
  }

  return (
    <div className="space-y-6 p-6">
      {/* عنوان القسم */}
      <div className="text-center">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-amber-600 bg-clip-text text-transparent">
          أرشيف الأفكار
        </h2>
        <p className="text-gray-600 mt-2">مكتبة الأفكار للاستلهام والعصف الذهني</p>
      </div>

      {/* الإحصائيات */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-purple-600">{archiveStats.total}</div>
            <div className="text-sm text-gray-600">إجمالي الأفكار</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-yellow-600">{archiveStats.inspiring}</div>
            <div className="text-sm text-gray-600">أفكار ملهمة</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">{archiveStats.reference}</div>
            <div className="text-sm text-gray-600">مراجع</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">{archiveStats.totalViews}</div>
            <div className="text-sm text-gray-600">إجمالي المشاهدات</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-orange-600">{archiveStats.totalInspiration}</div>
            <div className="text-sm text-gray-600">مرات الإلهام</div>
          </CardContent>
        </Card>
      </div>

      {/* التبويبات */}
      <div className="flex space-x-1 rtl:space-x-reverse bg-white rounded-lg p-1 shadow-sm">
        <button
          onClick={() => setShowBrainstorming(false)}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
            !showBrainstorming 
              ? 'bg-purple-500 text-white shadow-sm' 
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <Archive className="w-4 h-4 inline mr-2" />
          أرشيف الأفكار
        </button>
        <button
          onClick={() => setShowBrainstorming(true)}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
            showBrainstorming 
              ? 'bg-purple-500 text-white shadow-sm' 
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <Lightbulb className="w-4 h-4 inline mr-2" />
          جلسات العصف الذهني
        </button>
      </div>

      {!showBrainstorming ? (
        /* أرشيف الأفكار */
        <div className="space-y-6">
          {/* أدوات البحث والفلترة */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="ابحث في الأفكار..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
            
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="all">جميع الفئات</option>
              {categories.map((category) => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
            
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="all">جميع الحالات</option>
              <option value="inspiring">ملهمة</option>
              <option value="reference">مرجعية</option>
              <option value="archived">مؤرشفة</option>
            </select>
            
            <Button
              onClick={getRandomIdeas}
              className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600"
            >
              <Shuffle className="w-4 h-4 mr-2" />
              أفكار عشوائية
            </Button>
          </div>

          {/* الأفكار العشوائية للإلهام */}
          {randomIdeas.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl p-6 border border-yellow-200"
            >
              <h3 className="text-lg font-semibold text-yellow-800 mb-4 flex items-center">
                <Sparkles className="w-5 h-5 mr-2" />
                أفكار للإلهام
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {randomIdeas.map((idea) => (
                  <div key={idea.id} className="bg-white rounded-lg p-4 border border-yellow-200">
                    <h4 className="font-medium text-gray-800 mb-2">{idea.title}</h4>
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">{idea.description}</p>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>بواسطة {idea.originalAuthor}</span>
                      <span>{idea.inspirationCount} إلهام</span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* قائمة الأفكار المؤرشفة */}
          <div className="grid gap-6">
            {filteredIdeas.map((idea) => {
              const statusInfo = getStatusInfo(idea.status)
              const StatusIcon = statusInfo.icon

              return (
                <motion.div
                  key={idea.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-xl shadow-lg border border-gray-200"
                >
                  <Card>
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 rtl:space-x-reverse mb-2">
                            <CardTitle className="text-lg font-semibold text-gray-800">
                              {idea.title}
                            </CardTitle>
                            
                            <div className={`flex items-center space-x-2 rtl:space-x-reverse px-3 py-1 rounded-full ${statusInfo.bgColor}`}>
                              <StatusIcon className={`w-4 h-4 ${statusInfo.color}`} />
                              <span className={`text-sm font-medium ${statusInfo.color}`}>
                                {statusInfo.label}
                              </span>
                            </div>
                          </div>
                          
                          <p className="text-gray-600 text-sm mb-3">{idea.description}</p>
                          
                          <div className="flex items-center space-x-4 rtl:space-x-reverse mb-3">
                            <Badge variant="secondary">{idea.category}</Badge>
                            <span className="text-sm text-gray-600">
                              بواسطة {idea.originalAuthor}
                            </span>
                            <span className="text-sm text-gray-600">
                              {idea.archivedAt.toLocaleDateString('ar')}
                            </span>
                          </div>
                          
                          {/* العلامات */}
                          <div className="flex items-center space-x-2 rtl:space-x-reverse mb-3">
                            <Tag className="w-4 h-4 text-gray-500" />
                            <div className="flex flex-wrap gap-1">
                              {idea.tags.map((tag, index) => (
                                <span 
                                  key={index}
                                  className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </div>
                          
                          {/* الإحصائيات */}
                          <div className="flex items-center space-x-6 rtl:space-x-reverse text-sm text-gray-600">
                            <div className="flex items-center space-x-1 rtl:space-x-reverse">
                              <Eye className="w-4 h-4" />
                              <span>{idea.views}</span>
                            </div>
                            <div className="flex items-center space-x-1 rtl:space-x-reverse">
                              <Heart className="w-4 h-4" />
                              <span>{idea.likes}</span>
                            </div>
                            <div className="flex items-center space-x-1 rtl:space-x-reverse">
                              <MessageCircle className="w-4 h-4" />
                              <span>{idea.comments}</span>
                            </div>
                            <div className="flex items-center space-x-1 rtl:space-x-reverse">
                              <Sparkles className="w-4 h-4 text-yellow-500" />
                              <span>{idea.inspirationCount} إلهام</span>
                            </div>
                            <div className="flex items-center space-x-1 rtl:space-x-reverse">
                              <Star className="w-4 h-4 text-orange-500" />
                              <span>{idea.averageScore}%</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex space-x-2 rtl:space-x-reverse">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setSelectedIdea(idea)}
                          >
                            <Eye className="w-4 h-4 mr-1" />
                            عرض
                          </Button>
                          
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-yellow-600 hover:text-yellow-700"
                          >
                            <Lightbulb className="w-4 h-4 mr-1" />
                            استلهم
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    
                    <CardContent>
                      <div className="bg-gray-50 rounded-lg p-3">
                        <h5 className="text-sm font-medium text-gray-800 mb-1">سبب الأرشفة:</h5>
                        <p className="text-sm text-gray-600">{idea.rejectionReason}</p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </div>

          {filteredIdeas.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <Archive className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                لا توجد أفكار مؤرشفة
              </h3>
              <p className="text-gray-500">
                {searchTerm ? "جرب البحث بكلمات مختلفة" : "لا توجد أفكار مؤرشفة بعد"}
              </p>
            </motion.div>
          )}
        </div>
      ) : (
        /* جلسات العصف الذهني */
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-semibold text-gray-800">جلسات العصف الذهني</h3>
            <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
              <Play className="w-4 h-4 mr-2" />
              بدء جلسة جديدة
            </Button>
          </div>
          
          {brainstormingSessions.map((session) => (
            <motion.div
              key={session.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-lg border border-gray-200"
            >
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <CardTitle className="text-lg font-semibold text-gray-800 mb-2">
                        {session.title}
                      </CardTitle>
                      <p className="text-gray-600 text-sm mb-3">{session.description}</p>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <span className="text-gray-500">الميسر:</span>
                          <div className="font-medium">{session.facilitator}</div>
                        </div>
                        <div>
                          <span className="text-gray-500">المشاركون:</span>
                          <div className="font-medium">{session.participants.length} شخص</div>
                        </div>
                        <div>
                          <span className="text-gray-500">المدة:</span>
                          <div className="font-medium">{session.duration} دقيقة</div>
                        </div>
                        <div>
                          <span className="text-gray-500">الأفكار المولدة:</span>
                          <div className="font-medium text-green-600">{session.ideasGenerated}</div>
                        </div>
                      </div>
                    </div>
                    
                    <Badge 
                      variant={session.status === 'completed' ? 'default' : 
                              session.status === 'active' ? 'secondary' : 'outline'}
                    >
                      {session.status === 'completed' ? 'مكتملة' :
                       session.status === 'active' ? 'نشطة' : 'مخططة'}
                    </Badge>
                  </div>
                </CardHeader>
                
                <CardContent>
                  {session.archivedIdeasUsed.length > 0 && (
                    <div>
                      <h5 className="text-sm font-medium text-gray-800 mb-2">
                        الأفكار المؤرشفة المستخدمة:
                      </h5>
                      <div className="flex flex-wrap gap-2">
                        {session.archivedIdeasUsed.map((idea) => (
                          <span 
                            key={idea.id}
                            className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm"
                          >
                            {idea.title}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}

      {/* مودال تفاصيل الفكرة */}
      <AnimatePresence>
        {selectedIdea && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedIdea(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-6">
                  <h3 className="text-xl font-bold text-gray-800">{selectedIdea.title}</h3>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSelectedIdea(null)}
                  >
                    إغلاق
                  </Button>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-gray-800 mb-2">وصف الفكرة</h4>
                    <p className="text-gray-600">{selectedIdea.description}</p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-medium text-gray-800 mb-2">معلومات أساسية</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>الكاتب: {selectedIdea.originalAuthor}</li>
                        <li>الفئة: {selectedIdea.category}</li>
                        <li>تاريخ الإنشاء: {selectedIdea.originalDate.toLocaleDateString('ar')}</li>
                        <li>تاريخ الأرشفة: {selectedIdea.archivedAt.toLocaleDateString('ar')}</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-gray-800 mb-2">إحصائيات</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>نقاط التقييم: {selectedIdea.averageScore}%</li>
                        <li>المشاهدات: {selectedIdea.views}</li>
                        <li>الإعجابات: {selectedIdea.likes}</li>
                        <li>مرات الإلهام: {selectedIdea.inspirationCount}</li>
                      </ul>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-gray-800 mb-2">سبب الأرشفة</h4>
                    <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                      {selectedIdea.rejectionReason}
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-gray-800 mb-2">العلامات</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedIdea.tags.map((tag, index) => (
                        <span 
                          key={index}
                          className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex justify-center space-x-4 rtl:space-x-reverse pt-4 border-t">
                    <Button className="bg-yellow-500 hover:bg-yellow-600">
                      <Lightbulb className="w-4 h-4 mr-2" />
                      استخدم للإلهام
                    </Button>
                    
                    <Button variant="outline">
                      <Bookmark className="w-4 h-4 mr-2" />
                      إضافة للمفضلة
                    </Button>
                    
                    <Button variant="outline">
                      <Share2 className="w-4 h-4 mr-2" />
                      مشاركة
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
