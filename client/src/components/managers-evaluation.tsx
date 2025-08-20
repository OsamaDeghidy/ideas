"use client"

import React, { useState } from "react"
import { motion } from "framer-motion"
import { 
  Star, 
  CheckCircle, 
  RotateCcw, 
  TrendingUp,
  Users,
  Target,
  Lightbulb,
  MessageSquare,
  DollarSign,
  Clock
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
// import { Progress } from "@/components/ui/progress"

// أنواع البيانات
interface EvaluationCriteria {
  id: string
  name: string
  description: string
  weight: number
  icon: React.ComponentType<any>
}

interface IdeaEvaluation {
  ideaId: string
  managerId: string
  managerName: string
  scores: { [criteriaId: string]: number }
  comments: string
  submittedAt: Date
}

interface IdeaWithEvaluations {
  id: string
  title: string
  description: string
  submittedBy: string
  submittedAt: Date
  category: string
  status: 'pending' | 'approved' | 'rejected' | 'under-review'
  evaluations: IdeaEvaluation[]
  averageScore?: number
}

// معايير التقييم
const evaluationCriteria: EvaluationCriteria[] = [
  {
    id: "innovation",
    name: "الابتكار والإبداع",
    description: "مدى جدة وإبداعية الفكرة",
    weight: 25,
    icon: Lightbulb
  },
  {
    id: "feasibility", 
    name: "إمكانية التطبيق",
    description: "مدى إمكانية تنفيذ الفكرة عملياً",
    weight: 20,
    icon: Target
  },
  {
    id: "impact",
    name: "التأثير والفائدة",
    description: "مستوى التأثير المتوقع على الشركة",
    weight: 20,
    icon: TrendingUp
  },
  {
    id: "cost",
    name: "التكلفة والميزانية",
    description: "مناسبة التكلفة المتوقعة",
    weight: 15,
    icon: DollarSign
  },
  {
    id: "timeline",
    name: "الجدول الزمني",
    description: "واقعية الإطار الزمني للتنفيذ",
    weight: 10,
    icon: Clock
  },
  {
    id: "team",
    name: "الفريق المطلوب",
    description: "توفر الموارد البشرية المناسبة",
    weight: 10,
    icon: Users
  }
]

// بيانات تجريبية للأفكار المطلوب تقييمها
const pendingIdeas: IdeaWithEvaluations[] = [
  {
    id: "1",
    title: "تطبيق ذكي لإدارة المهام",
    description: "تطبيق يستخدم الذكاء الاصطناعي لتنظيم المهام وتحسين الإنتاجية",
    submittedBy: "أحمد محمد",
    submittedAt: new Date("2024-01-15"),
    category: "تطوير التطبيقات",
    status: "pending",
    evaluations: []
  },
  {
    id: "2", 
    title: "نظام إدارة المخزون الذكي",
    description: "نظام آلي لتتبع المخزون باستخدام تقنية RFID",
    submittedBy: "فاطمة أحمد",
    submittedAt: new Date("2024-01-18"),
    category: "اللوجستيات",
    status: "pending",
    evaluations: []
  },
  {
    id: "3",
    title: "منصة التدريب الافتراضي",
    description: "منصة تدريب باستخدام الواقع الافتراضي للموظفين الجدد",
    submittedBy: "محمد علي",
    submittedAt: new Date("2024-01-20"),
    category: "الموارد البشرية",
    status: "under-review",
    evaluations: [
      {
        ideaId: "3",
        managerId: "mgr1",
        managerName: "سارة خالد",
        scores: { innovation: 9, feasibility: 7, impact: 8, cost: 6, timeline: 7, team: 8 },
        comments: "فكرة ممتازة ولكن تحتاج استثمار كبير في البداية",
        submittedAt: new Date("2024-01-21")
      }
    ],
    averageScore: 75
  }
]

export default function ManagersEvaluation() {
  const [selectedIdea, setSelectedIdea] = useState<IdeaWithEvaluations | null>(null)
  const [currentScores, setCurrentScores] = useState<{ [key: string]: number }>({})
  const [comments, setComments] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  // دالة حساب متوسط الدرجات
  const calculateAverageScore = (idea: IdeaWithEvaluations): number => {
    if (idea.evaluations.length === 0) return 0
    
    let totalWeightedScore = 0
    let totalWeight = 0
    
    idea.evaluations.forEach(evaluation => {
      evaluationCriteria.forEach(criteria => {
        const score = evaluation.scores[criteria.id] || 0
        totalWeightedScore += score * criteria.weight
        totalWeight += criteria.weight
      })
    })
    
    return totalWeight > 0 ? Math.round((totalWeightedScore / totalWeight) / idea.evaluations.length) : 0
  }

  // دالة تحديد حالة الفكرة بناءً على المتوسط
  const getIdeaStatus = (averageScore: number) => {
    if (averageScore >= 85) return { status: 'approved', label: 'مقبولة', color: 'text-green-500', bgColor: 'bg-green-100' }
    if (averageScore >= 75) return { status: 'under-review', label: 'إعادة تقييم', color: 'text-yellow-500', bgColor: 'bg-yellow-100' }
    if (averageScore >= 65) return { status: 'under-review', label: 'تحت المراجعة', color: 'text-blue-500', bgColor: 'bg-blue-100' }
    return { status: 'rejected', label: 'مؤرشفة', color: 'text-red-500', bgColor: 'bg-red-100' }
  }

  // دالة تقديم التقييم
  const handleSubmitEvaluation = async () => {
    if (!selectedIdea) return
    
    setIsSubmitting(true)
    
    // محاكاة إرسال البيانات
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // إضافة التقييم الجديد
    const newEvaluation: IdeaEvaluation = {
      ideaId: selectedIdea.id,
      managerId: "current-manager",
      managerName: "المدير الحالي",
      scores: currentScores,
      comments,
      submittedAt: new Date()
    }
    
    // تحديث الفكرة
    selectedIdea.evaluations.push(newEvaluation)
    selectedIdea.averageScore = calculateAverageScore(selectedIdea)
    
    // إعادة تعيين النموذج
    setCurrentScores({})
    setComments("")
    setSelectedIdea(null)
    setIsSubmitting(false)
    
    alert("تم تقديم التقييم بنجاح!")
  }

  return (
    <div className="space-y-6 p-6">
      {/* عنوان القسم */}
      <div className="text-center">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          نظام تقييم المدراء
        </h2>
        <p className="text-gray-600 mt-2">قم بتقييم الأفكار المقدمة حسب المعايير المحددة</p>
      </div>

      {!selectedIdea ? (
        /* قائمة الأفكار المطلوب تقييمها */
        <div className="grid gap-6">
          <h3 className="text-xl font-semibold text-gray-800">الأفكار المطلوب تقييمها</h3>
          
          {pendingIdeas.map((idea) => {
            const status = idea.averageScore ? getIdeaStatus(idea.averageScore) : null
            
            return (
              <motion.div
                key={idea.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden"
              >
                <Card>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <CardTitle className="text-lg font-semibold text-gray-800">
                          {idea.title}
                        </CardTitle>
                        <p className="text-gray-600 text-sm mt-1">
                          مقدم من: {idea.submittedBy} • {idea.submittedAt.toLocaleDateString('ar')}
                        </p>
                        <span className="inline-block bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs mt-2">
                          {idea.category}
                        </span>
                      </div>
                      
                      {status && (
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${status.bgColor} ${status.color}`}>
                          {status.label}
                        </span>
                      )}
                    </div>
                  </CardHeader>
                  
                  <CardContent>
                    <p className="text-gray-700 mb-4">{idea.description}</p>
                    
                    {/* معلومات التقييم */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 rtl:space-x-reverse">
                        <span className="text-sm text-gray-600">
                          التقييمات: {idea.evaluations.length}
                        </span>
                        
                        {idea.averageScore && (
                          <div className="flex items-center space-x-2 rtl:space-x-reverse">
                            <Star className="w-4 h-4 text-yellow-500" />
                            <span className="text-sm font-medium">
                              {idea.averageScore}%
                            </span>
                          </div>
                        )}
                      </div>
                      
                      <Button
                        onClick={() => setSelectedIdea(idea)}
                        className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
                      >
                        {idea.evaluations.some(e => e.managerId === "current-manager") ? "عرض التقييم" : "تقييم الفكرة"}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </div>
      ) : (
        /* نموذج التقييم */
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-xl shadow-lg p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-gray-800">
              تقييم الفكرة: {selectedIdea.title}
            </h3>
            <Button
              variant="outline"
              onClick={() => setSelectedIdea(null)}
            >
              العودة للقائمة
            </Button>
          </div>
          
          <div className="grid gap-6">
            {/* معايير التقييم */}
            <div className="space-y-4">
              <h4 className="text-lg font-medium text-gray-800">معايير التقييم</h4>
              
              {evaluationCriteria.map((criteria) => {
                const IconComponent = criteria.icon
                const currentScore = currentScores[criteria.id] || 0
                
                return (
                  <div key={criteria.id} className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center space-x-3 rtl:space-x-reverse mb-3">
                      <IconComponent className="w-5 h-5 text-blue-500" />
                      <div className="flex-1">
                        <h5 className="font-medium text-gray-800">{criteria.name}</h5>
                        <p className="text-sm text-gray-600">{criteria.description}</p>
                        <span className="text-xs text-blue-600">وزن المعيار: {criteria.weight}%</span>
                      </div>
                    </div>
                    
                    {/* شريط تقييم النجوم */}
                    <div className="flex items-center space-x-2 rtl:space-x-reverse">
                      <span className="text-sm text-gray-600">الدرجة:</span>
                      <div className="flex space-x-1 rtl:space-x-reverse">
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((score) => (
                          <button
                            key={score}
                            onClick={() => setCurrentScores(prev => ({ ...prev, [criteria.id]: score }))}
                            className={`w-8 h-8 rounded-full text-xs font-medium border-2 transition-all ${
                              currentScore >= score
                                ? 'bg-gradient-to-r from-yellow-400 to-orange-400 border-yellow-400 text-white'
                                : 'bg-white border-gray-300 text-gray-600 hover:border-yellow-400'
                            }`}
                          >
                            {score}
                          </button>
                        ))}
                      </div>
                      <span className="text-sm font-medium text-blue-600">
                        {currentScore}/10
                      </span>
                    </div>
                  </div>
                )
              })}
            </div>
            
            {/* التعليقات */}
            <div className="space-y-3">
              <h4 className="text-lg font-medium text-gray-800">تعليقات إضافية</h4>
              <textarea
                value={comments}
                onChange={(e) => setComments(e.target.value)}
                placeholder="أضف تعليقاتك وملاحظاتك حول الفكرة..."
                className="w-full h-32 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            {/* أزرار الإجراء */}
            <div className="flex justify-center space-x-4 rtl:space-x-reverse pt-4">
              <Button
                onClick={handleSubmitEvaluation}
                disabled={isSubmitting || Object.keys(currentScores).length !== evaluationCriteria.length}
                className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 px-8"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
                    جاري الحفظ...
                  </>
                ) : (
                  <>
                    <CheckCircle className="w-4 h-4 mr-2" />
                    تقديم التقييم
                  </>
                )}
              </Button>
              
              <Button
                variant="outline"
                onClick={() => {
                  setCurrentScores({})
                  setComments("")
                }}
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                إعادة تعيين
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  )
}
