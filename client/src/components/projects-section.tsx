"use client"

import React, { useState } from "react"
import { motion } from "framer-motion"
import { 
  FolderOpen,
  Calendar,
  Users,
  Clock,
  CheckCircle,
  AlertTriangle,
  Play,
  Pause,
  RotateCcw,
  Plus,
  Edit,
  Trash2,
  Eye,
  FileText,
  BarChart3,
  Target,
  DollarSign,
  User,
  Mail,
  Phone,
  MapPin,
  GitBranch
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"

// أنواع البيانات
interface ProjectMember {
  id: string
  name: string
  role: string
  avatar: string
  email: string
  phone: string
}

interface ProjectRequirement {
  id: string
  title: string
  description: string
  priority: 'high' | 'medium' | 'low'
  status: 'pending' | 'in-progress' | 'completed'
  assignee?: ProjectMember
  deadline: Date
}

interface ProjectMilestone {
  id: string
  title: string
  description: string
  date: Date
  status: 'upcoming' | 'current' | 'completed' | 'delayed'
  progress: number
}

interface Project {
  id: string
  title: string
  description: string
  originalIdeaId: string
  status: 'planning' | 'active' | 'paused' | 'completed' | 'cancelled'
  priority: 'high' | 'medium' | 'low'
  startDate: Date
  endDate: Date
  budget: number
  spentBudget: number
  progress: number
  team: ProjectMember[]
  requirements: ProjectRequirement[]
  milestones: ProjectMilestone[]
  createdAt: Date
  lastUpdated: Date
  manager: ProjectMember
}

// بيانات تجريبية
const sampleProjects: Project[] = [
  {
    id: "1",
    title: "تطبيق ذكي لإدارة المهام",
    description: "تطوير تطبيق ذكي يستخدم الذكاء الاصطناعي لتنظيم المهام وتحسين الإنتاجية",
    originalIdeaId: "idea-1",
    status: "active",
    priority: "high",
    startDate: new Date("2024-02-01"),
    endDate: new Date("2024-06-30"),
    budget: 150000,
    spentBudget: 75000,
    progress: 65,
    team: [
      { id: "1", name: "أحمد محمد", role: "مطور Frontend", avatar: "", email: "ahmed@company.com", phone: "+966501234567" },
      { id: "2", name: "سارة أحمد", role: "مطور Backend", avatar: "", email: "sara@company.com", phone: "+966507654321" },
      { id: "3", name: "محمد علي", role: "مصمم UI/UX", avatar: "", email: "mohamed@company.com", phone: "+966509876543" }
    ],
    requirements: [
      {
        id: "req1",
        title: "تصميم واجهة المستخدم",
        description: "تصميم واجهات تفاعلية وسهلة الاستخدام",
        priority: "high",
        status: "completed",
        assignee: { id: "3", name: "محمد علي", role: "مصمم UI/UX", avatar: "", email: "mohamed@company.com", phone: "+966509876543" },
        deadline: new Date("2024-02-15")
      },
      {
        id: "req2", 
        title: "تطوير نظام الذكاء الاصطناعي",
        description: "برمجة خوارزميات الذكاء الاصطناعي للتنبؤ بالمهام",
        priority: "high",
        status: "in-progress",
        assignee: { id: "2", name: "سارة أحمد", role: "مطور Backend", avatar: "", email: "sara@company.com", phone: "+966507654321" },
        deadline: new Date("2024-04-01")
      },
      {
        id: "req3",
        title: "تطوير واجهة الموبايل",
        description: "تطوير تطبيق الجوال لنظامي iOS و Android",
        priority: "medium",
        status: "pending",
        assignee: { id: "1", name: "أحمد محمد", role: "مطور Frontend", avatar: "", email: "ahmed@company.com", phone: "+966501234567" },
        deadline: new Date("2024-05-15")
      }
    ],
    milestones: [
      {
        id: "ms1",
        title: "إطلاق النسخة التجريبية",
        description: "إطلاق نسخة تجريبية للمراجعة الداخلية",
        date: new Date("2024-03-15"),
        status: "completed",
        progress: 100
      },
      {
        id: "ms2",
        title: "اختبار المستخدمين",
        description: "اختبار التطبيق مع مجموعة من المستخدمين",
        date: new Date("2024-04-30"),
        status: "current",
        progress: 40
      },
      {
        id: "ms3",
        title: "الإطلاق النهائي",
        description: "إطلاق التطبيق في متاجر التطبيقات",
        date: new Date("2024-06-30"),
        status: "upcoming",
        progress: 0
      }
    ],
    createdAt: new Date("2024-01-20"),
    lastUpdated: new Date("2024-01-25"),
    manager: { id: "mgr1", name: "خالد السعد", role: "مدير المشروع", avatar: "", email: "khalid@company.com", phone: "+966501111111" }
  },
  {
    id: "2",
    title: "نظام إدارة المخزون الذكي",
    description: "نظام آلي لتتبع المخزون باستخدام تقنية RFID",
    originalIdeaId: "idea-2",
    status: "planning",
    priority: "medium",
    startDate: new Date("2024-03-01"),
    endDate: new Date("2024-08-30"),
    budget: 200000,
    spentBudget: 25000,
    progress: 15,
    team: [
      { id: "4", name: "فاطمة حسن", role: "محلل نظم", avatar: "", email: "fatima@company.com", phone: "+966502222222" },
      { id: "5", name: "عبدالله أحمد", role: "مطور نظم", avatar: "", email: "abdullah@company.com", phone: "+966503333333" }
    ],
    requirements: [
      {
        id: "req4",
        title: "دراسة الجدوى التقنية",
        description: "تحليل المتطلبات التقنية وإمكانية التطبيق",
        priority: "high",
        status: "in-progress",
        assignee: { id: "4", name: "فاطمة حسن", role: "محلل نظم", avatar: "", email: "fatima@company.com", phone: "+966502222222" },
        deadline: new Date("2024-02-28")
      }
    ],
    milestones: [
      {
        id: "ms4",
        title: "إنهاء التخطيط",
        description: "استكمال خطة المشروع والمتطلبات",
        date: new Date("2024-03-01"),
        status: "current",
        progress: 60
      }
    ],
    createdAt: new Date("2024-01-22"),
    lastUpdated: new Date("2024-01-26"),
    manager: { id: "mgr2", name: "نوال الأحمد", role: "مدير المشروع", avatar: "", email: "nowal@company.com", phone: "+966504444444" }
  }
]

export default function ProjectsSection() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [showRequirements, setShowRequirements] = useState(false)
  const [showTeam, setShowTeam] = useState(false)
  const [filter, setFilter] = useState("all")

  // فلترة المشاريع
  const filteredProjects = sampleProjects.filter(project =>
    filter === "all" || project.status === filter
  )

  // دالة تحديد لون الحالة
  const getStatusInfo = (status: string) => {
    switch (status) {
      case 'planning':
        return { label: 'في التخطيط', color: 'text-blue-600', bgColor: 'bg-blue-100', icon: Calendar }
      case 'active':
        return { label: 'نشط', color: 'text-green-600', bgColor: 'bg-green-100', icon: Play }
      case 'paused':
        return { label: 'مؤقف', color: 'text-yellow-600', bgColor: 'bg-yellow-100', icon: Pause }
      case 'completed':
        return { label: 'مكتمل', color: 'text-purple-600', bgColor: 'bg-purple-100', icon: CheckCircle }
      case 'cancelled':
        return { label: 'ملغي', color: 'text-red-600', bgColor: 'bg-red-100', icon: AlertTriangle }
      default:
        return { label: 'غير محدد', color: 'text-gray-600', bgColor: 'bg-gray-100', icon: AlertTriangle }
    }
  }

  // دالة تحديد لون الأولوية
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-500'
      case 'medium': return 'bg-yellow-500'
      case 'low': return 'bg-green-500'
      default: return 'bg-gray-500'
    }
  }

  // إحصائيات المشاريع
  const projectStats = {
    total: sampleProjects.length,
    active: sampleProjects.filter(p => p.status === 'active').length,
    planning: sampleProjects.filter(p => p.status === 'planning').length,
    completed: sampleProjects.filter(p => p.status === 'completed').length,
    totalBudget: sampleProjects.reduce((sum, p) => sum + p.budget, 0),
    spentBudget: sampleProjects.reduce((sum, p) => sum + p.spentBudget, 0)
  }

  return (
    <div className="space-y-6 p-6">
      {/* عنوان القسم */}
      <div className="text-center">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
          قسم المشاريع
        </h2>
        <p className="text-gray-600 mt-2">إدارة ومتابعة المشاريع المطورة من الأفكار المقبولة</p>
      </div>

      {/* الإحصائيات */}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">{projectStats.total}</div>
            <div className="text-sm text-gray-600">إجمالي المشاريع</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">{projectStats.active}</div>
            <div className="text-sm text-gray-600">مشاريع نشطة</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-yellow-600">{projectStats.planning}</div>
            <div className="text-sm text-gray-600">في التخطيط</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-purple-600">{projectStats.completed}</div>
            <div className="text-sm text-gray-600">مكتملة</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-emerald-600">
              {(projectStats.totalBudget / 1000).toFixed(0)}K
            </div>
            <div className="text-sm text-gray-600">الميزانية الكلية</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-orange-600">
              {(projectStats.spentBudget / 1000).toFixed(0)}K
            </div>
            <div className="text-sm text-gray-600">المصروف</div>
          </CardContent>
        </Card>
      </div>

      {/* فلاتر المشاريع */}
      <div className="flex flex-wrap gap-2 justify-center">
        {[
          { id: 'all', label: 'جميع المشاريع', color: 'bg-gray-100 text-gray-800' },
          { id: 'planning', label: 'في التخطيط', color: 'bg-blue-100 text-blue-800' },
          { id: 'active', label: 'نشطة', color: 'bg-green-100 text-green-800' },
          { id: 'paused', label: 'مؤقفة', color: 'bg-yellow-100 text-yellow-800' },
          { id: 'completed', label: 'مكتملة', color: 'bg-purple-100 text-purple-800' }
        ].map((filterOption) => (
          <button
            key={filterOption.id}
            onClick={() => setFilter(filterOption.id)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              filter === filterOption.id 
                ? filterOption.color + ' ring-2 ring-offset-2 ring-blue-500'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {filterOption.label}
          </button>
        ))}
      </div>

      {!selectedProject ? (
        /* قائمة المشاريع */
        <div className="grid gap-6">
          {filteredProjects.map((project) => {
            const statusInfo = getStatusInfo(project.status)
            const StatusIcon = statusInfo.icon

            return (
              <motion.div
                key={project.id}
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
                            {project.title}
                          </CardTitle>
                          <div className={`w-3 h-3 rounded-full ${getPriorityColor(project.priority)}`}></div>
                        </div>
                        
                        <p className="text-gray-600 text-sm mb-3">{project.description}</p>
                        
                        <div className="flex items-center space-x-4 rtl:space-x-reverse mb-3">
                          <div className={`flex items-center space-x-2 rtl:space-x-reverse px-3 py-1 rounded-full ${statusInfo.bgColor}`}>
                            <StatusIcon className={`w-4 h-4 ${statusInfo.color}`} />
                            <span className={`text-sm font-medium ${statusInfo.color}`}>
                              {statusInfo.label}
                            </span>
                          </div>
                          
                          <Badge variant="secondary">
                            <Users className="w-3 h-3 mr-1" />
                            {project.team.length} أعضاء
                          </Badge>
                          
                          <Badge variant="secondary">
                            <DollarSign className="w-3 h-3 mr-1" />
                            {(project.budget / 1000).toFixed(0)}K ر.س
                          </Badge>
                        </div>
                      </div>
                      
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setSelectedProject(project)}
                      >
                        <Eye className="w-4 h-4 mr-1" />
                        عرض التفاصيل
                      </Button>
                    </div>
                  </CardHeader>
                  
                  <CardContent>
                    {/* شريط التقدم */}
                    <div className="mb-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-gray-600">تقدم المشروع</span>
                        <span className="text-sm font-medium text-gray-800">{project.progress}%</span>
                      </div>
                      <Progress value={project.progress} className="h-2" />
                    </div>
                    
                    {/* معلومات سريعة */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div className="flex items-center space-x-2 rtl:space-x-reverse text-gray-600">
                        <Calendar className="w-4 h-4" />
                        <span>
                          {project.startDate.toLocaleDateString('ar')} - {project.endDate.toLocaleDateString('ar')}
                        </span>
                      </div>
                      
                      <div className="flex items-center space-x-2 rtl:space-x-reverse text-gray-600">
                        <User className="w-4 h-4" />
                        <span>{project.manager.name}</span>
                      </div>
                      
                      <div className="flex items-center space-x-2 rtl:space-x-reverse text-gray-600">
                        <Clock className="w-4 h-4" />
                        <span>
                          {Math.ceil((project.endDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))} يوم متبقي
                        </span>
                      </div>
                      
                      <div className="flex items-center space-x-2 rtl:space-x-reverse text-gray-600">
                        <BarChart3 className="w-4 h-4" />
                        <span>{project.requirements.length} متطلب</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </div>
      ) : (
        /* تفاصيل المشروع */
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-xl shadow-lg p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-800">{selectedProject.title}</h3>
            <Button
              variant="outline"
              onClick={() => setSelectedProject(null)}
            >
              العودة للقائمة
            </Button>
          </div>
          
          {/* تبويبات فرعية */}
          <div className="flex space-x-1 rtl:space-x-reverse mb-6 bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => { setShowRequirements(false); setShowTeam(false) }}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
                !showRequirements && !showTeam 
                  ? 'bg-white shadow-sm text-blue-600' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              نظرة عامة
            </button>
            <button
              onClick={() => { setShowRequirements(true); setShowTeam(false) }}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
                showRequirements && !showTeam 
                  ? 'bg-white shadow-sm text-blue-600' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              المتطلبات
            </button>
            <button
              onClick={() => { setShowRequirements(false); setShowTeam(true) }}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
                showTeam && !showRequirements 
                  ? 'bg-white shadow-sm text-blue-600' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              الفريق
            </button>
          </div>
          
          {!showRequirements && !showTeam && (
            /* نظرة عامة */
            <div className="space-y-6">
              {/* معلومات أساسية */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-gray-800 mb-3">معلومات المشروع</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">الحالة:</span>
                      <span className="font-medium">{getStatusInfo(selectedProject.status).label}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">التقدم:</span>
                      <span className="font-medium">{selectedProject.progress}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">مدير المشروع:</span>
                      <span className="font-medium">{selectedProject.manager.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">الفريق:</span>
                      <span className="font-medium">{selectedProject.team.length} أعضاء</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-800 mb-3">الجدول الزمني والميزانية</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">تاريخ البداية:</span>
                      <span className="font-medium">{selectedProject.startDate.toLocaleDateString('ar')}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">تاريخ النهاية:</span>
                      <span className="font-medium">{selectedProject.endDate.toLocaleDateString('ar')}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">الميزانية الكلية:</span>
                      <span className="font-medium">{selectedProject.budget.toLocaleString()} ر.س</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">المصروف:</span>
                      <span className="font-medium">{selectedProject.spentBudget.toLocaleString()} ر.س</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* المراحل الرئيسية */}
              <div>
                <h4 className="font-medium text-gray-800 mb-4">المراحل الرئيسية</h4>
                <div className="space-y-4">
                  {selectedProject.milestones.map((milestone) => (
                    <div key={milestone.id} className="flex items-center space-x-4 rtl:space-x-reverse p-4 bg-gray-50 rounded-lg">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                        milestone.status === 'completed' ? 'bg-green-100 text-green-600' :
                        milestone.status === 'current' ? 'bg-blue-100 text-blue-600' :
                        milestone.status === 'delayed' ? 'bg-red-100 text-red-600' :
                        'bg-gray-100 text-gray-600'
                      }`}>
                        {milestone.status === 'completed' ? <CheckCircle className="w-6 h-6" /> :
                         milestone.status === 'current' ? <Play className="w-6 h-6" /> :
                         milestone.status === 'delayed' ? <AlertTriangle className="w-6 h-6" /> :
                         <Clock className="w-6 h-6" />}
                      </div>
                      
                      <div className="flex-1">
                        <h5 className="font-medium text-gray-800">{milestone.title}</h5>
                        <p className="text-sm text-gray-600">{milestone.description}</p>
                        <div className="flex items-center space-x-4 rtl:space-x-reverse mt-2">
                          <span className="text-xs text-gray-500">
                            {milestone.date.toLocaleDateString('ar')}
                          </span>
                          {milestone.status === 'current' && (
                            <div className="flex items-center space-x-2 rtl:space-x-reverse">
                              <Progress value={milestone.progress} className="h-1 w-20" />
                              <span className="text-xs text-gray-600">{milestone.progress}%</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
          
          {showRequirements && (
            /* المتطلبات */
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-medium text-gray-800">متطلبات المشروع</h4>
                <Button size="sm" className="bg-blue-500 hover:bg-blue-600">
                  <Plus className="w-4 h-4 mr-1" />
                  إضافة متطلب
                </Button>
              </div>
              
              {selectedProject.requirements.map((req) => (
                <div key={req.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 rtl:space-x-reverse mb-2">
                        <h5 className="font-medium text-gray-800">{req.title}</h5>
                        <div className={`w-3 h-3 rounded-full ${getPriorityColor(req.priority)}`}></div>
                        <Badge variant={
                          req.status === 'completed' ? 'default' :
                          req.status === 'in-progress' ? 'secondary' : 'outline'
                        }>
                          {req.status === 'completed' ? 'مكتمل' :
                           req.status === 'in-progress' ? 'قيد التنفيذ' : 'في الانتظار'}
                        </Badge>
                      </div>
                      
                      <p className="text-sm text-gray-600 mb-3">{req.description}</p>
                      
                      <div className="flex items-center space-x-4 rtl:space-x-reverse text-sm text-gray-600">
                        {req.assignee && (
                          <div className="flex items-center space-x-2 rtl:space-x-reverse">
                            <User className="w-4 h-4" />
                            <span>{req.assignee.name}</span>
                          </div>
                        )}
                        <div className="flex items-center space-x-2 rtl:space-x-reverse">
                          <Calendar className="w-4 h-4" />
                          <span>{req.deadline.toLocaleDateString('ar')}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex space-x-2 rtl:space-x-reverse">
                      <Button variant="outline" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          {showTeam && (
            /* الفريق */
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-medium text-gray-800">فريق المشروع</h4>
                <Button size="sm" className="bg-green-500 hover:bg-green-600">
                  <Plus className="w-4 h-4 mr-1" />
                  إضافة عضو
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* مدير المشروع */}
                <div className="border border-gray-200 rounded-lg p-4 bg-blue-50">
                  <div className="flex items-center space-x-3 rtl:space-x-reverse mb-3">
                    <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                      {selectedProject.manager.name.charAt(0)}
                    </div>
                    <div>
                      <h5 className="font-medium text-gray-800">{selectedProject.manager.name}</h5>
                      <p className="text-sm text-blue-600 font-medium">{selectedProject.manager.role}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center space-x-2 rtl:space-x-reverse">
                      <Mail className="w-4 h-4" />
                      <span>{selectedProject.manager.email}</span>
                    </div>
                    <div className="flex items-center space-x-2 rtl:space-x-reverse">
                      <Phone className="w-4 h-4" />
                      <span>{selectedProject.manager.phone}</span>
                    </div>
                  </div>
                </div>
                
                {/* أعضاء الفريق */}
                {selectedProject.team.map((member) => (
                  <div key={member.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center space-x-3 rtl:space-x-reverse mb-3">
                      <div className="w-10 h-10 bg-gray-500 rounded-full flex items-center justify-center text-white font-bold">
                        {member.name.charAt(0)}
                      </div>
                      <div>
                        <h5 className="font-medium text-gray-800">{member.name}</h5>
                        <p className="text-sm text-gray-600">{member.role}</p>
                      </div>
                    </div>
                    
                    <div className="space-y-2 text-sm text-gray-600">
                      <div className="flex items-center space-x-2 rtl:space-x-reverse">
                        <Mail className="w-4 h-4" />
                        <span>{member.email}</span>
                      </div>
                      <div className="flex items-center space-x-2 rtl:space-x-reverse">
                        <Phone className="w-4 h-4" />
                        <span>{member.phone}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      )}
    </div>
  )
}
