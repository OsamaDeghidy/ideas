"use client"

import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  CheckCircle, 
  XCircle, 
  Clock,
  RotateCcw,
  Archive,
  TrendingUp,
  Users,
  Star,
  MessageSquare,
  AlertTriangle,
  Eye,
  ThumbsUp,
  ThumbsDown
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"

// أنواع البيانات
interface WorkflowIdea {
  id: string
  title: string
  description: string
  submittedBy: string
  submittedAt: Date
  category: string
  status: 'pending' | 'approved' | 'rejected' | 'under-review' | 'archived'
  averageScore: number
  evaluationsCount: number
  comments: string[]
  nextAction: string
  daysInCurrentStatus: number
  priority: 'high' | 'medium' | 'low'
}

// بيانات تجريبية
const workflowIdeas: WorkflowIdea[] = [
  {
    id: "1",
    title: "تطبيق ذكي لإدارة المهام",
    description: "تطبيق يستخدم الذكاء الاصطناعي لتنظيم المهام وتحسين الإنتاجية",
    submittedBy: "أحمد محمد",
    submittedAt: new Date("2024-01-15"),
    category: "تطوير التطبيقات",
    status: "approved",
    averageScore: 92,
    evaluationsCount: 5,
    comments: ["فكرة ممتازة", "قابلة للتطبيق", "مفيدة للشركة"],
    nextAction: "نقل إلى قسم المشاريع",
    daysInCurrentStatus: 2,
    priority: "high"
  },
  {
    id: "2",
    title: "نظام إدارة المخزون الذكي", 
    description: "نظام آلي لتتبع المخزون باستخدام تقنية RFID",
    submittedBy: "فاطمة أحمد",
    submittedAt: new Date("2024-01-18"),
    category: "اللوجستيات",
    status: "under-review",
    averageScore: 78,
    evaluationsCount: 3,
    comments: ["تحتاج مراجعة التكلفة", "فكرة جيدة لكن معقدة"],
    nextAction: "إعادة تقييم",
    daysInCurrentStatus: 5,
    priority: "medium"
  },
  {
    id: "3",
    title: "نظام التوصيل بالدرونز",
    description: "استخدام الطائرات المسيرة لتوصيل الطلبات",
    submittedBy: "محمد علي",
    submittedAt: new Date("2024-01-20"),
    category: "اللوجستيات",
    status: "rejected",
    averageScore: 45,
    evaluationsCount: 4,
    comments: ["غير قابل للتطبيق حالياً", "تكلفة عالية", "قيود قانونية"],
    nextAction: "نقل إلى الأرشيف",
    daysInCurrentStatus: 1,
    priority: "low"
  },
  {
    id: "4", 
    title: "منصة التدريب الافتراضي",
    description: "منصة تدريب باستخدام الواقع الافتراضي للموظفين الجدد",
    submittedBy: "سارة خالد",
    submittedAt: new Date("2024-01-22"),
    category: "الموارد البشرية",
    status: "pending",
    averageScore: 0,
    evaluationsCount: 0,
    comments: [],
    nextAction: "في انتظار التقييم",
    daysInCurrentStatus: 3,
    priority: "medium"
  }
]

export default function IdeaWorkflow() {
  const [selectedStatus, setSelectedStatus] = useState<string>("all")
  const [selectedIdea, setSelectedIdea] = useState<WorkflowIdea | null>(null)

  // دالة فلترة الأفكار حسب الحالة
  const filteredIdeas = workflowIdeas.filter(idea => 
    selectedStatus === "all" || idea.status === selectedStatus
  )

  // دالة تحديد لون الحالة
  const getStatusInfo = (status: string, _score: number) => {
    switch (status) {
      case 'approved':
        return { 
          label: 'مقبولة', 
          color: 'text-green-600', 
          bgColor: 'bg-green-100', 
          icon: CheckCircle,
          description: 'تم قبول الفكرة وستنتقل إلى قسم المشاريع'
        }
      case 'rejected':
        return { 
          label: 'مرفوضة', 
          color: 'text-red-600', 
          bgColor: 'bg-red-100', 
          icon: XCircle,
          description: 'تم رفض الفكرة وستنتقل إلى الأرشيف'
        }
      case 'under-review':
        return { 
          label: 'إعادة تقييم', 
          color: 'text-yellow-600', 
          bgColor: 'bg-yellow-100', 
          icon: RotateCcw,
          description: 'الفكرة تحتاج إعادة تقييم لتحسينها'
        }
      case 'pending':
        return { 
          label: 'في الانتظار', 
          color: 'text-blue-600', 
          bgColor: 'bg-blue-100', 
          icon: Clock,
          description: 'في انتظار تقييم المدراء'
        }
      case 'archived':
        return { 
          label: 'مؤرشفة', 
          color: 'text-gray-600', 
          bgColor: 'bg-gray-100', 
          icon: Archive,
          description: 'تم أرشفة الفكرة للرجوع إليها لاحقاً'
        }
      default:
        return { 
          label: 'غير محدد', 
          color: 'text-gray-600', 
          bgColor: 'bg-gray-100', 
          icon: AlertTriangle,
          description: ''
        }
    }
  }

  // دالة محاكاة تنفيذ الإجراء
  const executeAction = async (idea: WorkflowIdea, action: string) => {
    // محاكاة معالجة
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    switch (action) {
      case 'approve':
        idea.status = 'approved'
        idea.nextAction = 'نقل إلى قسم المشاريع'
        break
      case 'reject':
        idea.status = 'rejected'
        idea.nextAction = 'نقل إلى الأرشيف'
        break
      case 'review':
        idea.status = 'under-review'
        idea.nextAction = 'إعادة تقييم'
        break
      case 'archive':
        idea.status = 'archived'
        idea.nextAction = 'مؤرشفة'
        break
    }
    
    alert(`تم تنفيذ الإجراء: ${action}`)
  }

  // إحصائيات سريعة
  const stats = {
    total: workflowIdeas.length,
    pending: workflowIdeas.filter(i => i.status === 'pending').length,
    approved: workflowIdeas.filter(i => i.status === 'approved').length,
    rejected: workflowIdeas.filter(i => i.status === 'rejected').length,
    underReview: workflowIdeas.filter(i => i.status === 'under-review').length
  }

  return (
    <div className="space-y-6 p-6">
      {/* عنوان القسم */}
      <div className="text-center">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          تدفق عمل الأفكار
        </h2>
        <p className="text-gray-600 mt-2">متابعة حالة الأفكار في جميع مراحل التقييم</p>
      </div>

      {/* الإحصائيات السريعة */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <Card className="text-center">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-blue-600">{stats.total}</div>
            <div className="text-sm text-gray-600">إجمالي الأفكار</div>
          </CardContent>
        </Card>
        
        <Card className="text-center">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-yellow-600">{stats.pending}</div>
            <div className="text-sm text-gray-600">في الانتظار</div>
          </CardContent>
        </Card>
        
        <Card className="text-center">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-green-600">{stats.approved}</div>
            <div className="text-sm text-gray-600">مقبولة</div>
          </CardContent>
        </Card>
        
        <Card className="text-center">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-orange-600">{stats.underReview}</div>
            <div className="text-sm text-gray-600">إعادة تقييم</div>
          </CardContent>
        </Card>
        
        <Card className="text-center">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-red-600">{stats.rejected}</div>
            <div className="text-sm text-gray-600">مرفوضة</div>
          </CardContent>
        </Card>
      </div>

      {/* فلاتر الحالة */}
      <div className="flex flex-wrap gap-2 justify-center">
        {[
          { id: 'all', label: 'جميع الأفكار', color: 'bg-gray-100 text-gray-800' },
          { id: 'pending', label: 'في الانتظار', color: 'bg-blue-100 text-blue-800' },
          { id: 'approved', label: 'مقبولة', color: 'bg-green-100 text-green-800' },
          { id: 'under-review', label: 'إعادة تقييم', color: 'bg-yellow-100 text-yellow-800' },
          { id: 'rejected', label: 'مرفوضة', color: 'bg-red-100 text-red-800' }
        ].map((filter) => (
          <button
            key={filter.id}
            onClick={() => setSelectedStatus(filter.id)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              selectedStatus === filter.id 
                ? filter.color + ' ring-2 ring-offset-2 ring-blue-500'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {filter.label}
          </button>
        ))}
      </div>

      {/* قائمة الأفكار */}
      <div className="grid gap-4">
        <AnimatePresence>
          {filteredIdeas.map((idea) => {
            const statusInfo = getStatusInfo(idea.status, idea.averageScore)
            const StatusIcon = statusInfo.icon

            return (
              <motion.div
                key={idea.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
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
                          
                          {/* أيقونة الأولوية */}
                          {idea.priority === 'high' && (
                            <span className="w-3 h-3 bg-red-500 rounded-full"></span>
                          )}
                          {idea.priority === 'medium' && (
                            <span className="w-3 h-3 bg-yellow-500 rounded-full"></span>
                          )}
                          {idea.priority === 'low' && (
                            <span className="w-3 h-3 bg-green-500 rounded-full"></span>
                          )}
                        </div>
                        
                        <p className="text-gray-600 text-sm mb-2">
                          مقدم من: {idea.submittedBy} • {idea.submittedAt.toLocaleDateString('ar')}
                        </p>
                        
                        <div className="flex items-center space-x-4 rtl:space-x-reverse mb-3">
                          <Badge variant="secondary">{idea.category}</Badge>
                          
                          <div className={`flex items-center space-x-2 rtl:space-x-reverse px-3 py-1 rounded-full ${statusInfo.bgColor}`}>
                            <StatusIcon className={`w-4 h-4 ${statusInfo.color}`} />
                            <span className={`text-sm font-medium ${statusInfo.color}`}>
                              {statusInfo.label}
                            </span>
                          </div>
                        </div>
                        
                        {/* معلومات التقييم */}
                        <div className="flex items-center space-x-4 rtl:space-x-reverse text-sm text-gray-600">
                          <div className="flex items-center space-x-1 rtl:space-x-reverse">
                            <Star className="w-4 h-4 text-yellow-500" />
                            <span>{idea.averageScore > 0 ? `${idea.averageScore}%` : 'لم يتم التقييم'}</span>
                          </div>
                          
                          <div className="flex items-center space-x-1 rtl:space-x-reverse">
                            <Users className="w-4 h-4 text-blue-500" />
                            <span>{idea.evaluationsCount} تقييم</span>
                          </div>
                          
                          <div className="flex items-center space-x-1 rtl:space-x-reverse">
                            <Clock className="w-4 h-4 text-gray-500" />
                            <span>{idea.daysInCurrentStatus} أيام</span>
                          </div>
                        </div>
                      </div>
                      
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setSelectedIdea(idea)}
                        className="mr-2"
                      >
                        <Eye className="w-4 h-4 mr-1" />
                        عرض التفاصيل
                      </Button>
                    </div>
                  </CardHeader>
                  
                  <CardContent>
                    <p className="text-gray-700 mb-4">{idea.description}</p>
                    
                    {/* شريط التقدم */}
                    {idea.averageScore > 0 && (
                      <div className="mb-4">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm text-gray-600">درجة التقييم</span>
                          <span className="text-sm font-medium text-gray-800">{idea.averageScore}%</span>
                        </div>
                        <Progress 
                          value={idea.averageScore} 
                          className="h-2"
                        />
                      </div>
                    )}
                    
                    {/* الإجراء التالي */}
                    <div className="bg-gray-50 rounded-lg p-3">
                      <div className="flex items-center space-x-2 rtl:space-x-reverse">
                        <TrendingUp className="w-4 h-4 text-blue-500" />
                        <span className="text-sm font-medium text-gray-800">الإجراء التالي:</span>
                        <span className="text-sm text-blue-600">{idea.nextAction}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </AnimatePresence>
      </div>

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
                        <li>مقدم من: {selectedIdea.submittedBy}</li>
                        <li>التاريخ: {selectedIdea.submittedAt.toLocaleDateString('ar')}</li>
                        <li>الفئة: {selectedIdea.category}</li>
                        <li>الأولوية: {selectedIdea.priority}</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-gray-800 mb-2">حالة التقييم</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>المتوسط: {selectedIdea.averageScore > 0 ? `${selectedIdea.averageScore}%` : 'لم يتم التقييم'}</li>
                        <li>عدد التقييمات: {selectedIdea.evaluationsCount}</li>
                        <li>في الحالة الحالية: {selectedIdea.daysInCurrentStatus} أيام</li>
                      </ul>
                    </div>
                  </div>
                  
                  {selectedIdea.comments.length > 0 && (
                    <div>
                      <h4 className="font-medium text-gray-800 mb-2">تعليقات المقيمين</h4>
                      <ul className="space-y-2">
                        {selectedIdea.comments.map((comment, index) => (
                          <li key={index} className="flex items-start space-x-2 rtl:space-x-reverse">
                            <MessageSquare className="w-4 h-4 text-blue-500 mt-0.5" />
                            <span className="text-sm text-gray-600">{comment}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  {/* أزرار الإجراءات */}
                  <div className="flex justify-center space-x-4 rtl:space-x-reverse pt-4 border-t">
                    {selectedIdea.status === 'pending' && (
                      <>
                        <Button
                          onClick={() => executeAction(selectedIdea, 'approve')}
                          className="bg-green-500 hover:bg-green-600"
                        >
                          <ThumbsUp className="w-4 h-4 mr-2" />
                          قبول
                        </Button>
                        <Button
                          onClick={() => executeAction(selectedIdea, 'review')}
                          className="bg-yellow-500 hover:bg-yellow-600"
                        >
                          <RotateCcw className="w-4 h-4 mr-2" />
                          إعادة تقييم
                        </Button>
                        <Button
                          onClick={() => executeAction(selectedIdea, 'reject')}
                          variant="destructive"
                        >
                          <ThumbsDown className="w-4 h-4 mr-2" />
                          رفض
                        </Button>
                      </>
                    )}
                    
                    {selectedIdea.status === 'rejected' && (
                      <Button
                        onClick={() => executeAction(selectedIdea, 'archive')}
                        className="bg-gray-500 hover:bg-gray-600"
                      >
                        <Archive className="w-4 h-4 mr-2" />
                        أرشفة
                      </Button>
                    )}
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
