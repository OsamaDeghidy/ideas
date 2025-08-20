"use client"

import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  BarChart3,
  LineChart,
  PieChart,
  TrendingUp,
  TrendingDown,
  Calendar,
  Download,
  Filter,
  RefreshCw,
  Eye,
  Users,
  Lightbulb,
  Award,
  Clock,
  Target,
  Zap,
  Star,
  Activity,
  DollarSign,
  Percent,
  ArrowUp,
  ArrowDown,
  Minus,
  FileText,
  Share,
  Settings,
  ChevronRight,
  ChevronDown,
  AlertCircle,
  CheckCircle,
  Info,
  ExternalLink
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

// أنواع البيانات
interface AnalyticsMetric {
  id: string
  title: string
  value: number
  previousValue: number
  change: number
  changeType: 'increase' | 'decrease' | 'neutral'
  unit: string
  icon: React.ComponentType<any>
  color: string
  description: string
}

interface ChartData {
  label: string
  value: number
  color?: string
  percentage?: number
}

interface TimeSeriesData {
  date: string
  ideas: number
  accepted: number
  projects: number
  users: number
}

interface DepartmentAnalytics {
  department: string
  ideasSubmitted: number
  acceptanceRate: number
  avgScore: number
  topContributor: string
  projectsCompleted: number
  color: string
}

interface UserContribution {
  id: string
  name: string
  department: string
  ideasCount: number
  acceptedIdeas: number
  avgScore: number
  ranking: number
  trend: 'up' | 'down' | 'stable'
  avatar: string
}

// بيانات تجريبية
const analyticsMetrics: AnalyticsMetric[] = [
  {
    id: "total_ideas",
    title: "إجمالي الأفكار",
    value: 1247,
    previousValue: 1089,
    change: 14.5,
    changeType: "increase",
    unit: "فكرة",
    icon: Lightbulb,
    color: "blue",
    description: "العدد الإجمالي للأفكار المقدمة"
  },
  {
    id: "acceptance_rate",
    title: "معدل القبول",
    value: 68.3,
    previousValue: 65.1,
    change: 3.2,
    changeType: "increase", 
    unit: "%",
    icon: CheckCircle,
    color: "green",
    description: "نسبة الأفكار المقبولة من الإجمالي"
  },
  {
    id: "active_projects",
    title: "المشاريع النشطة",
    value: 89,
    previousValue: 94,
    change: -5.3,
    changeType: "decrease",
    unit: "مشروع",
    icon: Target,
    color: "purple",
    description: "عدد المشاريع قيد التنفيذ"
  },
  {
    id: "avg_response_time",
    title: "متوسط وقت الاستجابة",
    value: 2.4,
    previousValue: 3.1,
    change: -22.6,
    changeType: "increase",
    unit: "يوم",
    icon: Clock,
    color: "orange",
    description: "الوقت المتوسط لتقييم الأفكار"
  },
  {
    id: "user_engagement",
    title: "مشاركة المستخدمين",
    value: 87.6,
    previousValue: 82.3,
    change: 6.4,
    changeType: "increase",
    unit: "%",
    icon: Users,
    color: "indigo",
    description: "نسبة المستخدمين النشطين"
  },
  {
    id: "innovation_score",
    title: "مؤشر الابتكار",
    value: 8.7,
    previousValue: 8.2,
    change: 6.1,
    changeType: "increase",
    unit: "/10",
    icon: Star,
    color: "yellow",
    description: "المتوسط العام لدرجات الابتكار"
  }
]

const timeSeriesData: TimeSeriesData[] = [
  { date: "يناير", ideas: 89, accepted: 58, projects: 12, users: 156 },
  { date: "فبراير", ideas: 124, accepted: 79, projects: 18, users: 189 },
  { date: "مارس", ideas: 167, accepted: 101, projects: 25, users: 234 },
  { date: "أبريل", ideas: 198, accepted: 134, projects: 31, users: 267 },
  { date: "مايو", ideas: 234, accepted: 158, projects: 38, users: 298 },
  { date: "يونيو", ideas: 289, accepted: 197, projects: 45, users: 345 }
]

const departmentAnalytics: DepartmentAnalytics[] = [
  {
    department: "تقنية المعلومات",
    ideasSubmitted: 347,
    acceptanceRate: 74.2,
    avgScore: 8.4,
    topContributor: "أحمد محمد",
    projectsCompleted: 23,
    color: "blue"
  },
  {
    department: "التسويق",
    ideasSubmitted: 289,
    acceptanceRate: 68.5,
    avgScore: 7.9,
    topContributor: "سارة أحمد",
    projectsCompleted: 18,
    color: "green"
  },
  {
    department: "المبيعات",
    ideasSubmitted: 234,
    acceptanceRate: 71.8,
    avgScore: 8.1,
    topContributor: "محمد علي",
    projectsCompleted: 15,
    color: "purple"
  },
  {
    department: "الموارد البشرية",
    ideasSubmitted: 178,
    acceptanceRate: 65.4,
    avgScore: 7.6,
    topContributor: "فاطمة حسن",
    projectsCompleted: 12,
    color: "orange"
  },
  {
    department: "العمليات",
    ideasSubmitted: 199,
    acceptanceRate: 69.3,
    avgScore: 8.0,
    topContributor: "خالد السعد",
    projectsCompleted: 14,
    color: "red"
  }
]

const topContributors: UserContribution[] = [
  {
    id: "1",
    name: "أحمد محمد",
    department: "تقنية المعلومات",
    ideasCount: 45,
    acceptedIdeas: 34,
    avgScore: 8.7,
    ranking: 1,
    trend: "up",
    avatar: "/avatar1.jpg"
  },
  {
    id: "2", 
    name: "سارة أحمد",
    department: "التسويق",
    ideasCount: 38,
    acceptedIdeas: 28,
    avgScore: 8.4,
    ranking: 2,
    trend: "stable",
    avatar: "/avatar2.jpg"
  },
  {
    id: "3",
    name: "محمد علي", 
    department: "المبيعات",
    ideasCount: 42,
    acceptedIdeas: 29,
    avgScore: 8.2,
    ranking: 3,
    trend: "up",
    avatar: "/avatar3.jpg"
  },
  {
    id: "4",
    name: "فاطمة حسن",
    department: "الموارد البشرية", 
    ideasCount: 31,
    acceptedIdeas: 22,
    avgScore: 8.0,
    ranking: 4,
    trend: "down",
    avatar: "/avatar4.jpg"
  },
  {
    id: "5",
    name: "خالد السعد",
    department: "العمليات",
    ideasCount: 29,
    acceptedIdeas: 21,
    avgScore: 7.9,
    ranking: 5,
    trend: "up",
    avatar: "/avatar5.jpg"
  }
]

export default function AdvancedAnalytics() {
  const [selectedTimeRange, setSelectedTimeRange] = useState("6months")
  const [selectedDepartment, setSelectedDepartment] = useState("all")
  const [expandedMetric, setExpandedMetric] = useState<string | null>(null)
  const [viewMode, setViewMode] = useState<'overview' | 'detailed' | 'comparison'>('overview')

  // دالة تحديد لون التغيير
  const getChangeColor = (changeType: string) => {
    switch (changeType) {
      case 'increase': return 'text-green-600'
      case 'decrease': return 'text-red-600'
      default: return 'text-gray-600'
    }
  }

  // دالة تحديد أيقونة التغيير
  const getChangeIcon = (changeType: string) => {
    switch (changeType) {
      case 'increase': return ArrowUp
      case 'decrease': return ArrowDown
      default: return Minus
    }
  }

  // دالة تحديد لون التوجه
  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'up': return 'text-green-600'
      case 'down': return 'text-red-600'
      default: return 'text-gray-600'
    }
  }

  // دالة تصدير التقرير
  const exportReport = (format: 'pdf' | 'excel' | 'csv') => {
    // محاكاة تصدير التقرير
    alert(`جاري تصدير التقرير بصيغة ${format.toUpperCase()}...`)
  }

  return (
    <div className="space-y-6 p-6">
      {/* عنوان القسم */}
      <div className="text-center">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
          التحليلات والتقارير المتقدمة
        </h2>
        <p className="text-gray-600 mt-2">رؤى شاملة وتحليلات ذكية لأداء منصة الابتكار</p>
      </div>

      {/* أدوات التحكم */}
      <div className="flex flex-wrap gap-4 justify-between items-center bg-white rounded-lg p-4 shadow-sm">
        <div className="flex flex-wrap gap-2">
          <select
            value={selectedTimeRange}
            onChange={(e) => setSelectedTimeRange(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
          >
            <option value="1month">الشهر الماضي</option>
            <option value="3months">آخر 3 أشهر</option>
            <option value="6months">آخر 6 أشهر</option>
            <option value="1year">السنة الماضية</option>
          </select>
          
          <select
            value={selectedDepartment}
            onChange={(e) => setSelectedDepartment(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
          >
            <option value="all">جميع الأقسام</option>
            <option value="it">تقنية المعلومات</option>
            <option value="marketing">التسويق</option>
            <option value="sales">المبيعات</option>
            <option value="hr">الموارد البشرية</option>
            <option value="operations">العمليات</option>
          </select>
          
          <Button variant="outline" size="sm">
            <Filter className="w-4 h-4 mr-2" />
            مرشحات متقدمة
          </Button>
        </div>
        
        <div className="flex space-x-2 rtl:space-x-reverse">
          <Button variant="outline" size="sm">
            <RefreshCw className="w-4 h-4 mr-2" />
            تحديث
          </Button>
          
          <div className="relative group">
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              تصدير
            </Button>
            <div className="absolute right-0 top-full mt-1 bg-white rounded-lg shadow-lg border border-gray-200 p-2 space-y-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10">
              <button 
                onClick={() => exportReport('pdf')}
                className="w-full text-left px-3 py-2 hover:bg-gray-50 rounded text-sm"
              >
                PDF تقرير
              </button>
              <button 
                onClick={() => exportReport('excel')}
                className="w-full text-left px-3 py-2 hover:bg-gray-50 rounded text-sm"
              >
                Excel ملف
              </button>
              <button 
                onClick={() => exportReport('csv')}
                className="w-full text-left px-3 py-2 hover:bg-gray-50 rounded text-sm"
              >
                CSV بيانات
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* المؤشرات الرئيسية */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {analyticsMetrics.map((metric) => {
          const IconComponent = metric.icon
          const ChangeIcon = getChangeIcon(metric.changeType)
          const isExpanded = expandedMetric === metric.id
          
          return (
            <motion.div
              key={metric.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`bg-white rounded-xl shadow-lg border border-gray-200 transition-all duration-300 ${
                isExpanded ? 'lg:col-span-2' : ''
              }`}
            >
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3 rtl:space-x-reverse">
                      <div className={`w-12 h-12 rounded-lg bg-${metric.color}-100 flex items-center justify-center`}>
                        <IconComponent className={`w-6 h-6 text-${metric.color}-600`} />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{metric.title}</CardTitle>
                        <p className="text-sm text-gray-600">{metric.description}</p>
                      </div>
                    </div>
                    
                    <button
                      onClick={() => setExpandedMetric(isExpanded ? null : metric.id)}
                      className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                    </button>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-baseline space-x-2 rtl:space-x-reverse">
                      <span className="text-3xl font-bold text-gray-900">
                        {metric.value.toLocaleString()}
                      </span>
                      <span className="text-lg text-gray-600">{metric.unit}</span>
                    </div>
                    
                    <div className={`flex items-center space-x-1 rtl:space-x-reverse ${getChangeColor(metric.changeType)}`}>
                      <ChangeIcon className="w-4 h-4" />
                      <span className="text-sm font-medium">
                        {Math.abs(metric.change)}%
                      </span>
                    </div>
                  </div>
                  
                  <div className="text-sm text-gray-600">
                    مقارنة بالفترة السابقة: {metric.previousValue.toLocaleString()} {metric.unit}
                  </div>
                  
                  {isExpanded && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="mt-4 pt-4 border-t border-gray-200"
                    >
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <h5 className="font-medium text-gray-800 mb-2">الاتجاه الشهري</h5>
                          <div className="space-y-2">
                            {timeSeriesData.slice(-3).map((data, index) => (
                              <div key={index} className="flex justify-between items-center text-sm">
                                <span className="text-gray-600">{data.date}</span>
                                <span className="font-medium">
                                  {metric.id === 'total_ideas' ? data.ideas :
                                   metric.id === 'active_projects' ? data.projects :
                                   metric.id === 'user_engagement' ? data.users : data.accepted}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        <div>
                          <h5 className="font-medium text-gray-800 mb-2">توقعات الشهر القادم</h5>
                          <div className="text-2xl font-bold text-blue-600">
                            {Math.round(metric.value * (1 + metric.change / 100)).toLocaleString()}
                          </div>
                          <div className="text-sm text-gray-600">
                            بناءً على الاتجاه الحالي
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          )
        })}
      </div>

      {/* تحليلات الأقسام */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 rtl:space-x-reverse">
            <BarChart3 className="w-5 h-5 text-indigo-500" />
            <span>أداء الأقسام</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* جدول الأقسام */}
            <div>
              <h4 className="font-medium text-gray-800 mb-4">إحصائيات مفصلة</h4>
              <div className="space-y-3">
                {departmentAnalytics.map((dept, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="border border-gray-200 rounded-lg p-4"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <h5 className="font-medium text-gray-800">{dept.department}</h5>
                      <Badge className={`bg-${dept.color}-100 text-${dept.color}-800`}>
                        {dept.acceptanceRate}% قبول
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <p className="text-gray-600">الأفكار</p>
                        <p className="font-medium">{dept.ideasSubmitted}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">المتوسط</p>
                        <p className="font-medium">{dept.avgScore}/10</p>
                      </div>
                      <div>
                        <p className="text-gray-600">المشاريع</p>
                        <p className="font-medium">{dept.projectsCompleted}</p>
                      </div>
                    </div>
                    
                    <div className="mt-3 pt-3 border-t border-gray-200">
                      <p className="text-sm text-gray-600">
                        أفضل مساهم: <span className="font-medium text-gray-800">{dept.topContributor}</span>
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
            
            {/* الرسم البياني */}
            <div>
              <h4 className="font-medium text-gray-800 mb-4">مقارنة الأداء</h4>
              <div className="space-y-4">
                {departmentAnalytics.map((dept, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">{dept.department}</span>
                      <span className="text-sm text-gray-600">{dept.ideasSubmitted} فكرة</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`bg-${dept.color}-500 h-2 rounded-full transition-all duration-1000`}
                        style={{ width: `${(dept.ideasSubmitted / Math.max(...departmentAnalytics.map(d => d.ideasSubmitted))) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* أفضل المساهمين */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 rtl:space-x-reverse">
            <Award className="w-5 h-5 text-yellow-500" />
            <span>أفضل المساهمين</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {topContributors.map((contributor, index) => (
              <motion.div
                key={contributor.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:shadow-md transition-shadow"
              >
                <div className="flex items-center space-x-4 rtl:space-x-reverse">
                  <div className="relative">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                      {contributor.name.charAt(0)}
                    </div>
                    <div className="absolute -top-1 -right-1 w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                      {contributor.ranking}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-gray-800">{contributor.name}</h4>
                    <p className="text-sm text-gray-600">{contributor.department}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-6 rtl:space-x-reverse">
                  <div className="text-center">
                    <p className="text-lg font-bold text-blue-600">{contributor.ideasCount}</p>
                    <p className="text-xs text-gray-600">فكرة</p>
                  </div>
                  
                  <div className="text-center">
                    <p className="text-lg font-bold text-green-600">{contributor.acceptedIdeas}</p>
                    <p className="text-xs text-gray-600">مقبولة</p>
                  </div>
                  
                  <div className="text-center">
                    <p className="text-lg font-bold text-purple-600">{contributor.avgScore}</p>
                    <p className="text-xs text-gray-600">متوسط</p>
                  </div>
                  
                  <div className={`text-center ${getTrendColor(contributor.trend)}`}>
                    {contributor.trend === 'up' && <TrendingUp className="w-5 h-5 mx-auto" />}
                    {contributor.trend === 'down' && <TrendingDown className="w-5 h-5 mx-auto" />}
                    {contributor.trend === 'stable' && <Minus className="w-5 h-5 mx-auto" />}
                    <p className="text-xs">
                      {contributor.trend === 'up' ? 'صاعد' : 
                       contributor.trend === 'down' ? 'نازل' : 'مستقر'}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* التوقعات والتوصيات */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 rtl:space-x-reverse">
              <TrendingUp className="w-5 h-5 text-green-500" />
              <span>التوقعات</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-3 rtl:space-x-reverse p-3 bg-green-50 rounded-lg">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <div>
                  <p className="font-medium text-green-800">نمو متوقع في الأفكار</p>
                  <p className="text-sm text-green-600">زيادة 18% في الشهر القادم</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 rtl:space-x-reverse p-3 bg-blue-50 rounded-lg">
                <Info className="w-5 h-5 text-blue-600" />
                <div>
                  <p className="font-medium text-blue-800">تحسن في معدل القبول</p>
                  <p className="text-sm text-blue-600">توقع وصول إلى 72% بنهاية الربع</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 rtl:space-x-reverse p-3 bg-yellow-50 rounded-lg">
                <AlertCircle className="w-5 h-5 text-yellow-600" />
                <div>
                  <p className="font-medium text-yellow-800">انتباه لقسم العمليات</p>
                  <p className="text-sm text-yellow-600">انخفاض في المشاركة يحتاج تدخل</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 rtl:space-x-reverse">
              <Zap className="w-5 h-5 text-purple-500" />
              <span>التوصيات</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-3 border border-purple-200 rounded-lg">
                <h5 className="font-medium text-purple-800 mb-1">زيادة التحفيز</h5>
                <p className="text-sm text-purple-600">إضافة نظام نقاط ومكافآت لتحفيز المشاركة</p>
              </div>
              
              <div className="p-3 border border-blue-200 rounded-lg">
                <h5 className="font-medium text-blue-800 mb-1">تدريب الأقسام</h5>
                <p className="text-sm text-blue-600">ورش عمل للأقسام ذات الأداء المنخفض</p>
              </div>
              
              <div className="p-3 border border-green-200 rounded-lg">
                <h5 className="font-medium text-green-800 mb-1">تحسين العملية</h5>
                <p className="text-sm text-green-600">أتمتة المزيد من خطوات التقييم</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
