"use client"

import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  BarChart3,
  TrendingUp,
  Users,
  Lightbulb,
  Calendar,
  Award,
  Settings,
  Shield,
  Database,
  FileText,
  Mail,
  Phone,
  Globe,
  Activity,
  Clock,
  CheckCircle,
  AlertCircle,
  XCircle,
  Plus,
  Edit,
  Trash2,
  Eye,
  Download,
  Upload,
  RefreshCw,
  Search,
  Filter,
  MoreVertical,
  Building,
  Star,
  Target,
  Zap,
  Briefcase,
  UserCheck,
  MessageSquare,
  Video,
  Archive,
  Bell,
  PieChart,
  LineChart,
  Map,
  Layers,
  Lock,
  Unlock,
  Save,
  Share,
  Copy
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

// أنواع البيانات
interface SystemStats {
  totalUsers: number
  activeUsers: number
  totalIdeas: number
  ideasThisMonth: number
  projectsActive: number
  projectsCompleted: number
  meetingsToday: number
  notificationsSent: number
  avgResponseTime: number
  systemUptime: number
  storageUsed: number
  totalStorage: number
}

interface UserActivity {
  id: string
  userId: string
  userName: string
  action: string
  timestamp: Date
  details: string
  type: 'create' | 'update' | 'delete' | 'login' | 'logout'
  ipAddress: string
  device: string
}

interface SystemHealth {
  component: string
  status: 'healthy' | 'warning' | 'critical'
  lastCheck: Date
  responseTime: number
  uptime: number
  description: string
}

interface Company {
  id: string
  name: string
  logo: string
  domain: string
  industry: string
  employeeCount: number
  activeUsers: number
  subscription: 'free' | 'basic' | 'premium' | 'enterprise'
  joinedAt: Date
  lastActivity: Date
  features: string[]
  settings: {
    allowPublicIdeas: boolean
    requireApproval: boolean
    enableMeetings: boolean
    enableNotifications: boolean
  }
}

interface AdminUser {
  id: string
  name: string
  email: string
  role: 'super_admin' | 'admin' | 'moderator'
  lastLogin: Date
  permissions: string[]
  isActive: boolean
}

// بيانات تجريبية
const systemStats: SystemStats = {
  totalUsers: 2847,
  activeUsers: 1203,
  totalIdeas: 15672,
  ideasThisMonth: 342,
  projectsActive: 89,
  projectsCompleted: 156,
  meetingsToday: 23,
  notificationsSent: 1847,
  avgResponseTime: 120,
  systemUptime: 99.8,
  storageUsed: 157,
  totalStorage: 500
}

const recentActivities: UserActivity[] = [
  {
    id: "1",
    userId: "u123",
    userName: "أحمد محمد",
    action: "إنشاء فكرة جديدة",
    timestamp: new Date(Date.now() - 10 * 60 * 1000),
    details: "تطبيق للتوصيل السريع",
    type: "create",
    ipAddress: "192.168.1.100",
    device: "Chrome Desktop"
  },
  {
    id: "2",
    userId: "u456",
    userName: "سارة أحمد",
    action: "تقييم فكرة",
    timestamp: new Date(Date.now() - 25 * 60 * 1000),
    details: "تقييم فكرة الذكاء الاصطناعي",
    type: "update",
    ipAddress: "10.0.0.50",
    device: "Mobile Safari"
  },
  {
    id: "3",
    userId: "u789",
    userName: "محمد علي",
    action: "انضمام لاجتماع",
    timestamp: new Date(Date.now() - 45 * 60 * 1000),
    details: "اجتماع العصف الذهني الأسبوعي",
    type: "update",
    ipAddress: "172.16.0.20",
    device: "Firefox Desktop"
  }
]

const systemHealth: SystemHealth[] = [
  {
    component: "قاعدة البيانات",
    status: "healthy",
    lastCheck: new Date(Date.now() - 2 * 60 * 1000),
    responseTime: 45,
    uptime: 99.9,
    description: "تعمل بكفاءة عالية"
  },
  {
    component: "خادم التطبيق",
    status: "healthy",
    lastCheck: new Date(Date.now() - 1 * 60 * 1000),
    responseTime: 120,
    uptime: 99.8,
    description: "الأداء ممتاز"
  },
  {
    component: "نظام الإشعارات",
    status: "warning",
    lastCheck: new Date(Date.now() - 5 * 60 * 1000),
    responseTime: 340,
    uptime: 98.5,
    description: "بطء في الاستجابة - قيد المراقبة"
  },
  {
    component: "خدمة الاجتماعات",
    status: "healthy",
    lastCheck: new Date(Date.now() - 30 * 1000),
    responseTime: 85,
    uptime: 99.7,
    description: "جميع الخدمات تعمل بسلاسة"
  }
]

const companies: Company[] = [
  {
    id: "comp1",
    name: "شركة التقنية المتقدمة",
    logo: "/logo1.png",
    domain: "techadvanced.com",
    industry: "تقنية المعلومات",
    employeeCount: 250,
    activeUsers: 189,
    subscription: "enterprise",
    joinedAt: new Date("2024-01-15"),
    lastActivity: new Date(Date.now() - 30 * 60 * 1000),
    features: ["meetings", "projects", "notifications", "landing_pages"],
    settings: {
      allowPublicIdeas: true,
      requireApproval: true,
      enableMeetings: true,
      enableNotifications: true
    }
  },
  {
    id: "comp2",
    name: "مجموعة الابتكار للاستثمار",
    logo: "/logo2.png",
    domain: "innovation-invest.com",
    industry: "الاستثمار",
    employeeCount: 120,
    activeUsers: 85,
    subscription: "premium",
    joinedAt: new Date("2024-02-01"),
    lastActivity: new Date(Date.now() - 2 * 60 * 60 * 1000),
    features: ["meetings", "projects", "notifications"],
    settings: {
      allowPublicIdeas: false,
      requireApproval: true,
      enableMeetings: true,
      enableNotifications: true
    }
  }
]

const adminUsers: AdminUser[] = [
  {
    id: "admin1",
    name: "خالد الأحمد",
    email: "khaled@admin.com",
    role: "super_admin",
    lastLogin: new Date(Date.now() - 30 * 60 * 1000),
    permissions: ["all"],
    isActive: true
  },
  {
    id: "admin2",
    name: "نوال السعد",
    email: "nowal@admin.com",
    role: "admin",
    lastLogin: new Date(Date.now() - 2 * 60 * 60 * 1000),
    permissions: ["users", "companies", "content"],
    isActive: true
  }
]

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<'overview' | 'users' | 'companies' | 'system' | 'analytics' | 'settings'>('overview')
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null)
  const [showUserDetails, setShowUserDetails] = useState(false)

  // دالة تحديد لون الحالة
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy': return 'text-green-600 bg-green-100'
      case 'warning': return 'text-yellow-600 bg-yellow-100'
      case 'critical': return 'text-red-600 bg-red-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  // دالة تحديد لون الاشتراك
  const getSubscriptionColor = (subscription: string) => {
    switch (subscription) {
      case 'enterprise': return 'text-purple-600 bg-purple-100'
      case 'premium': return 'text-blue-600 bg-blue-100'
      case 'basic': return 'text-green-600 bg-green-100'
      case 'free': return 'text-gray-600 bg-gray-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  return (
    <div className="space-y-6 p-6">
      {/* عنوان لوحة التحكم */}
      <div className="text-center">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
          لوحة تحكم الإدارة
        </h2>
        <p className="text-gray-600 mt-2">مراقبة وإدارة شاملة لجميع أنظمة المنصة</p>
      </div>

      {/* أزرار الإجراءات السريعة */}
      <div className="flex justify-center space-x-4 rtl:space-x-reverse">
        <Button className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600">
          <RefreshCw className="w-4 h-4 mr-2" />
          تحديث البيانات
        </Button>
        
        <Button variant="outline">
          <Download className="w-4 h-4 mr-2" />
          تصدير التقارير
        </Button>
        
        <Button variant="outline">
          <Settings className="w-4 h-4 mr-2" />
          إعدادات النظام
        </Button>
      </div>

      {/* التبويبات */}
      <div className="flex space-x-1 rtl:space-x-reverse bg-white rounded-lg p-1 shadow-sm">
        {[
          { id: 'overview', label: 'نظرة عامة', icon: BarChart3 },
          { id: 'users', label: 'المستخدمون', icon: Users },
          { id: 'companies', label: 'الشركات', icon: Building },
          { id: 'system', label: 'النظام', icon: Activity },
          { id: 'analytics', label: 'التحليلات', icon: TrendingUp },
          { id: 'settings', label: 'الإعدادات', icon: Settings }
        ].map((tab) => {
          const TabIcon = tab.icon
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all flex items-center justify-center space-x-2 rtl:space-x-reverse ${
                activeTab === tab.id 
                  ? 'bg-indigo-500 text-white shadow-sm' 
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
        <div className="space-y-6">
          {/* الإحصائيات الرئيسية */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">إجمالي المستخدمين</p>
                    <p className="text-2xl font-bold text-blue-600">{systemStats.totalUsers.toLocaleString()}</p>
                    <p className="text-xs text-green-600">+12% هذا الشهر</p>
                  </div>
                  <Users className="w-8 h-8 text-blue-500" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">الأفكار المرسلة</p>
                    <p className="text-2xl font-bold text-green-600">{systemStats.totalIdeas.toLocaleString()}</p>
                    <p className="text-xs text-green-600">+{systemStats.ideasThisMonth} هذا الشهر</p>
                  </div>
                  <Lightbulb className="w-8 h-8 text-green-500" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">المشاريع النشطة</p>
                    <p className="text-2xl font-bold text-purple-600">{systemStats.projectsActive}</p>
                    <p className="text-xs text-gray-600">{systemStats.projectsCompleted} مكتمل</p>
                  </div>
                  <Briefcase className="w-8 h-8 text-purple-500" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">وقت الاستجابة</p>
                    <p className="text-2xl font-bold text-orange-600">{systemStats.avgResponseTime}ms</p>
                    <p className="text-xs text-green-600">أداء ممتاز</p>
                  </div>
                  <Zap className="w-8 h-8 text-orange-500" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* حالة النظام */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>حالة النظام</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {systemHealth.map((component, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3 rtl:space-x-reverse">
                        <div className={`w-3 h-3 rounded-full ${
                          component.status === 'healthy' ? 'bg-green-500' :
                          component.status === 'warning' ? 'bg-yellow-500' : 'bg-red-500'
                        }`}></div>
                        <div>
                          <p className="font-medium text-sm">{component.component}</p>
                          <p className="text-xs text-gray-600">{component.description}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium">{component.responseTime}ms</p>
                        <p className="text-xs text-gray-600">{component.uptime}% uptime</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>النشاط الأخير</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentActivities.map((activity) => (
                    <div key={activity.id} className="flex items-start space-x-3 rtl:space-x-reverse p-2 hover:bg-gray-50 rounded">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-blue-600 text-xs font-bold">
                          {activity.userName.charAt(0)}
                        </span>
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">{activity.userName}</p>
                        <p className="text-xs text-gray-600">{activity.action}</p>
                        <p className="text-xs text-gray-500">
                          {activity.timestamp.toLocaleTimeString('ar')} - {activity.device}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* مخططات الأداء */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>استخدام التخزين</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between text-sm">
                    <span>المستخدم</span>
                    <span>{systemStats.storageUsed} GB من {systemStats.totalStorage} GB</span>
                  </div>
                  <Progress 
                    value={(systemStats.storageUsed / systemStats.totalStorage) * 100} 
                    className="w-full"
                  />
                  <p className="text-xs text-gray-600">
                    {((systemStats.storageUsed / systemStats.totalStorage) * 100).toFixed(1)}% مستخدم
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>المستخدمون النشطون</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between text-sm">
                    <span>نشط الآن</span>
                    <span>{systemStats.activeUsers} من {systemStats.totalUsers}</span>
                  </div>
                  <Progress 
                    value={(systemStats.activeUsers / systemStats.totalUsers) * 100} 
                    className="w-full"
                  />
                  <p className="text-xs text-gray-600">
                    {((systemStats.activeUsers / systemStats.totalUsers) * 100).toFixed(1)}% نشط
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>مدة تشغيل النظام</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between text-sm">
                    <span>الأداء</span>
                    <span>{systemStats.systemUptime}%</span>
                  </div>
                  <Progress 
                    value={systemStats.systemUptime} 
                    className="w-full"
                  />
                  <p className="text-xs text-green-600">أداء ممتاز</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {activeTab === 'users' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-semibold text-gray-800">إدارة المستخدمين</h3>
            <div className="flex space-x-2 rtl:space-x-reverse">
              <Button variant="outline">
                <Search className="w-4 h-4 mr-2" />
                البحث
              </Button>
              <Button variant="outline">
                <Filter className="w-4 h-4 mr-2" />
                فلترة
              </Button>
              <Button className="bg-green-500 hover:bg-green-600">
                <Plus className="w-4 h-4 mr-2" />
                إضافة مستخدم
              </Button>
            </div>
          </div>

          {/* إحصائيات المستخدمين */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-blue-600">{systemStats.totalUsers}</div>
                <div className="text-sm text-gray-600">إجمالي المستخدمين</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-green-600">{systemStats.activeUsers}</div>
                <div className="text-sm text-gray-600">نشط اليوم</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-purple-600">156</div>
                <div className="text-sm text-gray-600">مستخدم جديد هذا الشهر</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-orange-600">94.2%</div>
                <div className="text-sm text-gray-600">معدل الاحتفاظ</div>
              </CardContent>
            </Card>
          </div>

          {/* قائمة المدراء */}
          <Card>
            <CardHeader>
              <CardTitle>مدراء النظام</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {adminUsers.map((admin) => (
                  <div key={admin.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-4 rtl:space-x-reverse">
                      <div className="w-12 h-12 bg-indigo-500 rounded-full flex items-center justify-center text-white font-bold">
                        {admin.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-semibold">{admin.name}</p>
                        <p className="text-sm text-gray-600">{admin.email}</p>
                        <p className="text-xs text-gray-500">
                          آخر دخول: {admin.lastLogin.toLocaleString('ar')}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3 rtl:space-x-reverse">
                      <Badge className={admin.role === 'super_admin' ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'}>
                        {admin.role === 'super_admin' ? 'مدير عام' : 
                         admin.role === 'admin' ? 'مدير' : 'مشرف'}
                      </Badge>
                      
                      <div className={`w-3 h-3 rounded-full ${admin.isActive ? 'bg-green-500' : 'bg-red-500'}`}></div>
                      
                      <Button variant="outline" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {activeTab === 'companies' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-semibold text-gray-800">إدارة الشركات</h3>
            <Button className="bg-blue-500 hover:bg-blue-600">
              <Plus className="w-4 h-4 mr-2" />
              إضافة شركة
            </Button>
          </div>

          {/* إحصائيات الشركات */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-blue-600">{companies.length}</div>
                <div className="text-sm text-gray-600">شركات مسجلة</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-green-600">
                  {companies.reduce((sum, c) => sum + c.employeeCount, 0)}
                </div>
                <div className="text-sm text-gray-600">إجمالي الموظفين</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-purple-600">
                  {companies.filter(c => c.subscription === 'enterprise').length}
                </div>
                <div className="text-sm text-gray-600">اشتراك مؤسسي</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-orange-600">
                  {companies.reduce((sum, c) => sum + c.activeUsers, 0)}
                </div>
                <div className="text-sm text-gray-600">مستخدمين نشطين</div>
              </CardContent>
            </Card>
          </div>

          {/* قائمة الشركات */}
          <div className="grid gap-4">
            {companies.map((company) => (
              <motion.div
                key={company.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-xl shadow-lg border border-gray-200"
              >
                <Card>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div className="flex items-center space-x-4 rtl:space-x-reverse">
                        <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center text-white font-bold text-xl">
                          {company.name.charAt(0)}
                        </div>
                        <div>
                          <CardTitle className="text-lg">{company.name}</CardTitle>
                          <p className="text-sm text-gray-600">{company.domain}</p>
                          <p className="text-sm text-gray-500">{company.industry}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2 rtl:space-x-reverse">
                        <Badge className={getSubscriptionColor(company.subscription)}>
                          {company.subscription === 'enterprise' ? 'مؤسسي' :
                           company.subscription === 'premium' ? 'متميز' :
                           company.subscription === 'basic' ? 'أساسي' : 'مجاني'}
                        </Badge>
                        
                        <Button variant="outline" size="sm">
                          <Eye className="w-4 h-4 mr-1" />
                          عرض
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                      <div>
                        <p className="text-sm text-gray-600">الموظفين</p>
                        <p className="font-semibold">{company.employeeCount}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">النشطين</p>
                        <p className="font-semibold text-green-600">{company.activeUsers}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">تاريخ الانضمام</p>
                        <p className="font-semibold">{company.joinedAt.toLocaleDateString('ar')}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">آخر نشاط</p>
                        <p className="font-semibold">{company.lastActivity.toLocaleDateString('ar')}</p>
                      </div>
                    </div>
                    
                    <div>
                      <p className="text-sm text-gray-600 mb-2">الميزات المفعلة:</p>
                      <div className="flex flex-wrap gap-2">
                        {company.features.map((feature, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {feature === 'meetings' ? 'الاجتماعات' :
                             feature === 'projects' ? 'المشاريع' :
                             feature === 'notifications' ? 'الإشعارات' :
                             feature === 'landing_pages' ? 'صفحات الهبوط' : feature}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'system' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-semibold text-gray-800">مراقبة النظام</h3>
            <Button className="bg-indigo-500 hover:bg-indigo-600">
              <RefreshCw className="w-4 h-4 mr-2" />
              تحديث الحالة
            </Button>
          </div>

          {/* مراقبة النظام التفصيلية */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">استخدام المعالج</p>
                    <p className="text-2xl font-bold text-blue-600">23%</p>
                    <p className="text-xs text-green-600">طبيعي</p>
                  </div>
                  <Activity className="w-8 h-8 text-blue-500" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">استخدام الذاكرة</p>
                    <p className="text-2xl font-bold text-green-600">67%</p>
                    <p className="text-xs text-green-600">جيد</p>
                  </div>
                  <Database className="w-8 h-8 text-green-500" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">حركة الشبكة</p>
                    <p className="text-2xl font-bold text-purple-600">145 MB/s</p>
                    <p className="text-xs text-green-600">مستقر</p>
                  </div>
                  <Globe className="w-8 h-8 text-purple-500" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">قاعدة البيانات</p>
                    <p className="text-2xl font-bold text-orange-600">45ms</p>
                    <p className="text-xs text-green-600">سريع</p>
                  </div>
                  <Database className="w-8 h-8 text-orange-500" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* تفاصيل صحة النظام */}
          <Card>
            <CardHeader>
              <CardTitle>تفاصيل صحة النظام</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {systemHealth.map((component, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3 rtl:space-x-reverse">
                        <div className={`w-4 h-4 rounded-full ${
                          component.status === 'healthy' ? 'bg-green-500' :
                          component.status === 'warning' ? 'bg-yellow-500' : 'bg-red-500'
                        }`}></div>
                        <h4 className="font-semibold">{component.component}</h4>
                        <Badge className={getStatusColor(component.status)}>
                          {component.status === 'healthy' ? 'سليم' :
                           component.status === 'warning' ? 'تحذير' : 'خطر'}
                        </Badge>
                      </div>
                      
                      <span className="text-sm text-gray-500">
                        آخر فحص: {component.lastCheck.toLocaleTimeString('ar')}
                      </span>
                    </div>
                    
                    <p className="text-sm text-gray-600 mb-3">{component.description}</p>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-xs text-gray-500">زمن الاستجابة</p>
                        <p className="font-semibold">{component.responseTime}ms</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">وقت التشغيل</p>
                        <p className="font-semibold">{component.uptime}%</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* سجل النشاطات */}
          <Card>
            <CardHeader>
              <CardTitle>سجل أنشطة النظام</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { time: '10:30 ص', action: 'إعادة تشغيل خدمة الإشعارات', status: 'success' },
                  { time: '09:15 ص', action: 'نسخ احتياطي لقاعدة البيانات', status: 'success' },
                  { time: '08:45 ص', action: 'تحديث أمني للنظام', status: 'success' },
                  { time: '07:30 ص', action: 'فحص صحة النظام اليومي', status: 'success' }
                ].map((log, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3 rtl:space-x-reverse">
                      <div className={`w-2 h-2 rounded-full ${
                        log.status === 'success' ? 'bg-green-500' : 'bg-red-500'
                      }`}></div>
                      <span className="text-sm">{log.action}</span>
                    </div>
                    <span className="text-xs text-gray-500">{log.time}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {activeTab === 'analytics' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-semibold text-gray-800">التحليلات والتقارير</h3>
            <div className="flex space-x-2 rtl:space-x-reverse">
              <Button variant="outline">
                <Calendar className="w-4 h-4 mr-2" />
                اختر التاريخ
              </Button>
              <Button className="bg-blue-500 hover:bg-blue-600">
                <Download className="w-4 h-4 mr-2" />
                تصدير التقرير
              </Button>
            </div>
          </div>

          {/* مؤشرات الأداء الرئيسية */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">الأفكار الجديدة</p>
                    <p className="text-2xl font-bold text-blue-600">342</p>
                    <p className="text-xs text-green-600">+23% من الشهر الماضي</p>
                  </div>
                  <TrendingUp className="w-8 h-8 text-blue-500" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">معدل القبول</p>
                    <p className="text-2xl font-bold text-green-600">68%</p>
                    <p className="text-xs text-green-600">+5% تحسن</p>
                  </div>
                  <CheckCircle className="w-8 h-8 text-green-500" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">الاجتماعات</p>
                    <p className="text-2xl font-bold text-purple-600">156</p>
                    <p className="text-xs text-green-600">+12% هذا الشهر</p>
                  </div>
                  <Video className="w-8 h-8 text-purple-500" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">رضا المستخدمين</p>
                    <p className="text-2xl font-bold text-orange-600">4.7/5</p>
                    <p className="text-xs text-green-600">تقييم ممتاز</p>
                  </div>
                  <Star className="w-8 h-8 text-orange-500" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* تحليلات تفصيلية */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>الأفكار حسب الفئة</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { category: 'تقنية المعلومات', count: 145, percentage: 42 },
                    { category: 'التسويق والمبيعات', count: 89, percentage: 26 },
                    { category: 'العمليات', count: 67, percentage: 19 },
                    { category: 'الموارد البشرية', count: 45, percentage: 13 }
                  ].map((item, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">{item.category}</span>
                      <div className="flex items-center space-x-3 rtl:space-x-reverse">
                        <div className="w-24 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-500 h-2 rounded-full"
                            style={{ width: `${item.percentage}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium w-8">{item.count}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>نمو المستخدمين</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center">
                    <p className="text-3xl font-bold text-blue-600">2,847</p>
                    <p className="text-sm text-gray-600">إجمالي المستخدمين</p>
                  </div>
                  
                  <div className="space-y-3">
                    {[
                      { month: 'يناير', users: 1200 },
                      { month: 'فبراير', users: 1650 },
                      { month: 'مارس', users: 2100 },
                      { month: 'أبريل', users: 2847 }
                    ].map((item, index) => (
                      <div key={index} className="flex justify-between items-center">
                        <span className="text-sm">{item.month}</span>
                        <span className="font-medium">{item.users}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {activeTab === 'settings' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-semibold text-gray-800">إعدادات النظام</h3>
            <Button className="bg-green-500 hover:bg-green-600">
              <Save className="w-4 h-4 mr-2" />
              حفظ التغييرات
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* إعدادات عامة */}
            <Card>
              <CardHeader>
                <CardTitle>الإعدادات العامة</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">اسم المنصة</label>
                  <input
                    type="text"
                    defaultValue="منصة الابتكار"
                    className="w-full p-3 border border-gray-300 rounded-lg"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">وصف المنصة</label>
                  <textarea
                    defaultValue="منصة شاملة لإدارة الابتكار والأفكار في المؤسسات"
                    rows={3}
                    className="w-full p-3 border border-gray-300 rounded-lg"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">المنطقة الزمنية</label>
                  <select className="w-full p-3 border border-gray-300 rounded-lg">
                    <option>Asia/Riyadh</option>
                    <option>Asia/Dubai</option>
                    <option>Asia/Kuwait</option>
                  </select>
                </div>
              </CardContent>
            </Card>

            {/* إعدادات الأمان */}
            <Card>
              <CardHeader>
                <CardTitle>إعدادات الأمان</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">المصادقة الثنائية</p>
                    <p className="text-sm text-gray-600">تطلب رمز إضافي عند تسجيل الدخول</p>
                  </div>
                  <Button variant="outline" size="sm">
                    تفعيل
                  </Button>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">تشفير البيانات</p>
                    <p className="text-sm text-gray-600">تشفير جميع البيانات الحساسة</p>
                  </div>
                  <Badge className="bg-green-100 text-green-800">مفعل</Badge>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">سجل النشاطات</p>
                    <p className="text-sm text-gray-600">تسجيل جميع العمليات المهمة</p>
                  </div>
                  <Badge className="bg-green-100 text-green-800">مفعل</Badge>
                </div>
              </CardContent>
            </Card>

            {/* إعدادات النسخ الاحتياطي */}
            <Card>
              <CardHeader>
                <CardTitle>النسخ الاحتياطي</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">تكرار النسخ الاحتياطي</label>
                  <select className="w-full p-3 border border-gray-300 rounded-lg">
                    <option>يومياً</option>
                    <option>أسبوعياً</option>
                    <option>شهرياً</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">مكان التخزين</label>
                  <select className="w-full p-3 border border-gray-300 rounded-lg">
                    <option>التخزين السحابي</option>
                    <option>الخادم المحلي</option>
                    <option>كلاهما</option>
                  </select>
                </div>
                
                <Button className="w-full bg-blue-500 hover:bg-blue-600">
                  <Download className="w-4 h-4 mr-2" />
                  إنشاء نسخة احتياطية الآن
                </Button>
              </CardContent>
            </Card>

            {/* إعدادات الإشعارات */}
            <Card>
              <CardHeader>
                <CardTitle>إعدادات الإشعارات</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">إشعارات البريد الإلكتروني</p>
                    <p className="text-sm text-gray-600">إرسال إشعارات عبر البريد</p>
                  </div>
                  <Button variant="outline" size="sm">
                    تعديل
                  </Button>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">الرسائل النصية</p>
                    <p className="text-sm text-gray-600">إرسال رسائل SMS</p>
                  </div>
                  <Button variant="outline" size="sm">
                    تعديل
                  </Button>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">الإشعارات الفورية</p>
                    <p className="text-sm text-gray-600">إشعارات داخل التطبيق</p>
                  </div>
                  <Badge className="bg-green-100 text-green-800">مفعل</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  )
}
