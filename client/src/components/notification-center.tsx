"use client"

import React, { useState } from "react"
import { motion } from "framer-motion"
import { 
  Bell,
  Mail,
  MessageSquare,
  Phone,
  Clock,
  Check,
  X,
  Archive,
  Send,
  Users,
  Settings,
  Edit,
  Eye,
  Trash2,
  CheckCircle,
  Star,
  Flag,
  Smartphone,
  Globe,
  Zap,
  Target,
  BarChart3,
  Plus,
  AlertCircle,
  Info
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

// أنواع البيانات
interface Notification {
  id: string
  type: 'email' | 'sms' | 'push' | 'in-app' | 'both'
  category: 'meeting' | 'idea' | 'project' | 'general' | 'urgent'
  title: string
  message: string
  recipients: Recipient[]
  scheduledAt?: Date
  sentAt?: Date
  status: 'draft' | 'scheduled' | 'sent' | 'failed'
  priority: 'low' | 'medium' | 'high' | 'urgent'
  template?: string
  attachments?: string[]
  deliveryStats?: {
    sent: number
    delivered: number
    opened: number
    clicked: number
    failed: number
  }
}

interface Recipient {
  id: string
  name: string
  email: string
  phone: string
  department: string
  position: string
  status: 'pending' | 'sent' | 'delivered' | 'opened' | 'failed'
}

interface NotificationTemplate {
  id: string
  name: string
  type: 'email' | 'sms' | 'both'
  category: string
  subject: string
  content: string
  variables: string[]
  isActive: boolean
  usageCount: number
}

// القوالب المعدة مسبقاً
const notificationTemplates: NotificationTemplate[] = [
  {
    id: "temp1",
    name: "دعوة اجتماع",
    type: "email",
    category: "meeting",
    subject: "دعوة لحضور {{meetingTitle}}",
    content: `
      مرحباً {{recipientName}}،
      
      أنت مدعو لحضور اجتماع {{meetingTitle}} المقرر في {{meetingDate}} الساعة {{meetingTime}}.
      
      تفاصيل الاجتماع:
      - الموضوع: {{meetingTitle}}
      - التاريخ: {{meetingDate}}
      - الوقت: {{meetingTime}}
      - المدة: {{duration}} دقيقة
      - رابط الانضمام: {{meetingLink}}
      
      نتطلع لمشاركتك.
      
      مع التحية،
      فريق منصة الابتكار
    `,
    variables: ["recipientName", "meetingTitle", "meetingDate", "meetingTime", "duration", "meetingLink"],
    isActive: true,
    usageCount: 45
  },
  {
    id: "temp2",
    name: "تحديث حالة الفكرة",
    type: "both",
    category: "idea",
    subject: "تحديث حول فكرتك: {{ideaTitle}}",
    content: `
      عزيزي {{recipientName}}،
      
      نود إعلامك بأن فكرتك "{{ideaTitle}}" قد {{statusUpdate}}.
      
      {{#if approved}}
      مبروك! تم قبول فكرتك وستنتقل الآن إلى مرحلة التطوير.
      {{/if}}
      
      {{#if needsReview}}
      فكرتك تحتاج إلى مراجعة إضافية. سنتواصل معك قريباً.
      {{/if}}
      
      شكراً لمساهمتك في الابتكار.
    `,
    variables: ["recipientName", "ideaTitle", "statusUpdate"],
    isActive: true,
    usageCount: 78
  },
  {
    id: "temp3",
    name: "إشعار هاكاثون",
    type: "both",
    category: "general",
    subject: "🚀 هاكاثون {{eventName}} - سجل الآن!",
    content: `
      {{recipientName}}،
      
      لا تفوت فرصة المشاركة في {{eventName}}!
      
      📅 التاريخ: {{eventDate}}
      ⏰ الوقت: {{eventTime}}
      📍 المكان: {{eventLocation}}
      🏆 الجوائز: {{prizes}}
      
      سجل الآن: {{registrationLink}}
      
      آخر موعد للتسجيل: {{deadline}}
    `,
    variables: ["recipientName", "eventName", "eventDate", "eventTime", "eventLocation", "prizes", "registrationLink", "deadline"],
    isActive: true,
    usageCount: 123
  }
]

// بيانات تجريبية للإشعارات
const sampleNotifications: Notification[] = [
  {
    id: "notif1",
    type: "email",
    category: "meeting",
    title: "دعوة اجتماع العصف الذهني",
    message: "اجتماع عصف ذهني غداً الساعة 2 ظهراً",
    recipients: [
      {
        id: "1",
        name: "أحمد محمد",
        email: "ahmed@company.com",
        phone: "+966501234567",
        department: "IT",
        position: "مطور",
        status: "delivered"
      },
      {
        id: "2", 
        name: "سارة أحمد",
        email: "sara@company.com",
        phone: "+966507654321",
        department: "Marketing",
        position: "مدير تسويق",
        status: "opened"
      }
    ],
    sentAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
    status: "sent",
    priority: "high",
    template: "temp1",
    deliveryStats: {
      sent: 25,
      delivered: 23,
      opened: 18,
      clicked: 12,
      failed: 2
    }
  },
  {
    id: "notif2",
    type: "both",
    category: "idea",
    title: "تحديث حالة الأفكار",
    message: "تم تقييم 5 أفكار جديدة هذا الأسبوع",
    recipients: [],
    scheduledAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
    status: "scheduled",
    priority: "medium",
    template: "temp2"
  }
]

// بيانات المستلمين
const availableRecipients: Recipient[] = [
  {
    id: "1",
    name: "أحمد محمد",
    email: "ahmed@company.com", 
    phone: "+966501234567",
    department: "تقنية المعلومات",
    position: "مطور أول",
    status: "pending"
  },
  {
    id: "2",
    name: "سارة أحمد",
    email: "sara@company.com",
    phone: "+966507654321", 
    department: "التسويق",
    position: "مدير تسويق",
    status: "pending"
  },
  {
    id: "3",
    name: "محمد علي",
    email: "mohamed@company.com",
    phone: "+966509876543",
    department: "الموارد البشرية",
    position: "أخصائي موارد بشرية",
    status: "pending"
  },
  {
    id: "4",
    name: "فاطمة حسن",
    email: "fatima@company.com",
    phone: "+966502345678",
    department: "المبيعات",
    position: "مندوب مبيعات",
    status: "pending"
  }
]

export default function NotificationCenter() {
  const [activeTab, setActiveTab] = useState<'notifications' | 'templates' | 'compose' | 'analytics'>('notifications')
  const [_selectedNotification, setSelectedNotification] = useState<Notification | null>(null)
  const [_showCompose, setShowCompose] = useState(false)
  const [filter, setFilter] = useState("all")

  // حالات إنشاء إشعار جديد
  const [newNotification, setNewNotification] = useState<Partial<Notification>>({
    type: 'email',
    category: 'general',
    title: '',
    message: '',
    recipients: [],
    priority: 'medium',
    status: 'draft'
  })

  const [selectedRecipients, setSelectedRecipients] = useState<Recipient[]>([])
  const [selectedTemplate, setSelectedTemplate] = useState<NotificationTemplate | null>(null)

  // دالة فلترة الإشعارات
  const filteredNotifications = sampleNotifications.filter(notif => 
    filter === "all" || notif.status === filter || notif.category === filter
  )

  // دالة تحديد لون الحالة
  const getStatusInfo = (status: string) => {
    switch (status) {
      case 'sent':
        return { label: 'مرسل', color: 'text-green-600', bgColor: 'bg-green-100', icon: CheckCircle }
      case 'scheduled':
        return { label: 'مجدول', color: 'text-blue-600', bgColor: 'bg-blue-100', icon: Clock }
      case 'draft':
        return { label: 'مسودة', color: 'text-gray-600', bgColor: 'bg-gray-100', icon: Edit }
      case 'failed':
        return { label: 'فشل', color: 'text-red-600', bgColor: 'bg-red-100', icon: AlertCircle }
      default:
        return { label: 'غير محدد', color: 'text-gray-600', bgColor: 'bg-gray-100', icon: Info }
    }
  }

  // دالة تحديد لون الأولوية
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'text-red-600 bg-red-100'
      case 'high': return 'text-orange-600 bg-orange-100'
      case 'medium': return 'text-yellow-600 bg-yellow-100'
      case 'low': return 'text-green-600 bg-green-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  // دالة إضافة مستلم
  const addRecipient = (recipient: Recipient) => {
    if (!selectedRecipients.find(r => r.id === recipient.id)) {
      setSelectedRecipients([...selectedRecipients, recipient])
    }
  }

  // دالة حذف مستلم
  const removeRecipient = (recipientId: string) => {
    setSelectedRecipients(selectedRecipients.filter(r => r.id !== recipientId))
  }

  // دالة إرسال الإشعار
  const sendNotification = () => {
    // محاكاة إرسال
    alert("تم إرسال الإشعار بنجاح!")
    setShowCompose(false)
    setNewNotification({
      type: 'email',
      category: 'general',
      title: '',
      message: '',
      recipients: [],
      priority: 'medium',
      status: 'draft'
    })
    setSelectedRecipients([])
    setSelectedTemplate(null)
  }

  return (
    <div className="space-y-6 p-6">
      {/* عنوان القسم */}
      <div className="text-center">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          مركز الإشعارات
        </h2>
        <p className="text-gray-600 mt-2">إدارة وإرسال الإشعارات للموظفين عبر قنوات متعددة</p>
      </div>

      {/* أزرار الإجراءات السريعة */}
      <div className="flex justify-center space-x-4 rtl:space-x-reverse">
        <Button 
          onClick={() => setShowCompose(true)}
          className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
        >
          <Send className="w-4 h-4 mr-2" />
          إنشاء إشعار جديد
        </Button>
        
        <Button variant="outline">
          <Users className="w-4 h-4 mr-2" />
          إدارة المستلمين
        </Button>
        
        <Button variant="outline">
          <Settings className="w-4 h-4 mr-2" />
          إعدادات الإشعارات
        </Button>
      </div>

      {/* التبويبات */}
      <div className="flex space-x-1 rtl:space-x-reverse bg-white rounded-lg p-1 shadow-sm">
        {[
          { id: 'notifications', label: 'الإشعارات', icon: Bell },
          { id: 'templates', label: 'القوالب', icon: Edit },
          { id: 'compose', label: 'إنشاء جديد', icon: Send },
          { id: 'analytics', label: 'التحليلات', icon: BarChart3 }
        ].map((tab) => {
          const TabIcon = tab.icon
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all flex items-center justify-center space-x-2 rtl:space-x-reverse ${
                activeTab === tab.id 
                  ? 'bg-blue-500 text-white shadow-sm' 
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
      {activeTab === 'notifications' && (
        <div className="space-y-6">
          {/* فلاتر */}
          <div className="flex flex-wrap gap-2 justify-center">
            {[
              { id: 'all', label: 'جميع الإشعارات' },
              { id: 'sent', label: 'مرسلة' },
              { id: 'scheduled', label: 'مجدولة' },
              { id: 'draft', label: 'مسودات' },
              { id: 'meeting', label: 'اجتماعات' },
              { id: 'idea', label: 'أفكار' }
            ].map((filterOption) => (
              <button
                key={filterOption.id}
                onClick={() => setFilter(filterOption.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  filter === filterOption.id 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {filterOption.label}
              </button>
            ))}
          </div>

          {/* قائمة الإشعارات */}
          <div className="grid gap-4">
            {filteredNotifications.map((notification) => {
              const statusInfo = getStatusInfo(notification.status)
              const StatusIcon = statusInfo.icon

              return (
                <motion.div
                  key={notification.id}
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
                              {notification.title}
                            </CardTitle>
                            
                            <div className={`flex items-center space-x-2 rtl:space-x-reverse px-3 py-1 rounded-full ${statusInfo.bgColor}`}>
                              <StatusIcon className={`w-4 h-4 ${statusInfo.color}`} />
                              <span className={`text-sm font-medium ${statusInfo.color}`}>
                                {statusInfo.label}
                              </span>
                            </div>
                            
                            <Badge className={getPriorityColor(notification.priority)}>
                              {notification.priority === 'urgent' ? 'عاجل' :
                               notification.priority === 'high' ? 'مهم' :
                               notification.priority === 'medium' ? 'متوسط' : 'منخفض'}
                            </Badge>
                          </div>
                          
                          <p className="text-gray-600 text-sm mb-3">{notification.message}</p>
                          
                          <div className="flex items-center space-x-4 rtl:space-x-reverse mb-3">
                            <div className="flex items-center space-x-2 rtl:space-x-reverse text-sm text-gray-600">
                              {notification.type === 'email' && <Mail className="w-4 h-4" />}
                              {notification.type === 'sms' && <Smartphone className="w-4 h-4" />}
                              {notification.type === 'both' && <Globe className="w-4 h-4" />}
                              <span>{
                                notification.type === 'email' ? 'بريد إلكتروني' :
                                notification.type === 'sms' ? 'رسالة نصية' :
                                notification.type === 'both' ? 'متعدد القنوات' : 'داخل التطبيق'
                              }</span>
                            </div>
                            
                            <div className="flex items-center space-x-2 rtl:space-x-reverse text-sm text-gray-600">
                              <Users className="w-4 h-4" />
                              <span>{notification.recipients.length} مستلم</span>
                            </div>
                            
                            {notification.sentAt && (
                              <div className="flex items-center space-x-2 rtl:space-x-reverse text-sm text-gray-600">
                                <Clock className="w-4 h-4" />
                                <span>{notification.sentAt.toLocaleDateString('ar')}</span>
                              </div>
                            )}
                          </div>
                          
                          {/* إحصائيات التسليم */}
                          {notification.deliveryStats && (
                            <div className="bg-gray-50 rounded-lg p-3">
                              <div className="grid grid-cols-5 gap-4 text-center">
                                <div>
                                  <div className="text-lg font-bold text-blue-600">{notification.deliveryStats.sent}</div>
                                  <div className="text-xs text-gray-600">مرسل</div>
                                </div>
                                <div>
                                  <div className="text-lg font-bold text-green-600">{notification.deliveryStats.delivered}</div>
                                  <div className="text-xs text-gray-600">وصل</div>
                                </div>
                                <div>
                                  <div className="text-lg font-bold text-purple-600">{notification.deliveryStats.opened}</div>
                                  <div className="text-xs text-gray-600">فُتح</div>
                                </div>
                                <div>
                                  <div className="text-lg font-bold text-orange-600">{notification.deliveryStats.clicked}</div>
                                  <div className="text-xs text-gray-600">نُقر</div>
                                </div>
                                <div>
                                  <div className="text-lg font-bold text-red-600">{notification.deliveryStats.failed}</div>
                                  <div className="text-xs text-gray-600">فشل</div>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                        
                        <div className="flex space-x-2 rtl:space-x-reverse">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setSelectedNotification(notification)}
                          >
                            <Eye className="w-4 h-4 mr-1" />
                            عرض
                          </Button>
                          
                          {notification.status === 'draft' && (
                            <Button
                              variant="outline"
                              size="sm"
                            >
                              <Edit className="w-4 h-4 mr-1" />
                              تحرير
                            </Button>
                          )}
                          
                          <Button
                            variant="outline"
                            size="sm"
                          >
                            <Archive className="w-4 h-4 mr-1" />
                            أرشفة
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        </div>
      )}

      {activeTab === 'templates' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-semibold text-gray-800">قوالب الإشعارات</h3>
            <Button className="bg-green-500 hover:bg-green-600">
              <Plus className="w-4 h-4 mr-2" />
              إنشاء قالب جديد
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {notificationTemplates.map((template) => (
              <Card key={template.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-base">{template.name}</CardTitle>
                    <Badge variant={template.isActive ? "default" : "secondary"}>
                      {template.isActive ? "نشط" : "غير نشط"}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">النوع:</span>
                      <span>{template.type === 'email' ? 'بريد' : template.type === 'sms' ? 'SMS' : 'متعدد'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">الفئة:</span>
                      <span>{template.category}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">الاستخدام:</span>
                      <span>{template.usageCount} مرة</span>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 rounded p-2 mt-3">
                    <p className="text-xs text-gray-600 line-clamp-3">{template.content}</p>
                  </div>
                  
                  <div className="flex space-x-2 rtl:space-x-reverse mt-4">
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="flex-1"
                      onClick={() => {
                        setSelectedTemplate(template)
                        setActiveTab('compose')
                      }}
                    >
                      استخدم
                    </Button>
                    <Button size="sm" variant="outline">
                      <Edit className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'compose' && (
        <div className="max-w-4xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>إنشاء إشعار جديد</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* معلومات أساسية */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">نوع الإشعار</label>
                  <select
                    value={newNotification.type}
                    onChange={(e) => setNewNotification({...newNotification, type: e.target.value as any})}
                    className="w-full p-3 border border-gray-300 rounded-lg"
                  >
                    <option value="email">بريد إلكتروني</option>
                    <option value="sms">رسالة نصية</option>
                    <option value="both">متعدد القنوات</option>
                    <option value="push">إشعار فوري</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">الفئة</label>
                  <select
                    value={newNotification.category}
                    onChange={(e) => setNewNotification({...newNotification, category: e.target.value as any})}
                    className="w-full p-3 border border-gray-300 rounded-lg"
                  >
                    <option value="general">عام</option>
                    <option value="meeting">اجتماع</option>
                    <option value="idea">فكرة</option>
                    <option value="project">مشروع</option>
                    <option value="urgent">عاجل</option>
                  </select>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">الأولوية</label>
                  <select
                    value={newNotification.priority}
                    onChange={(e) => setNewNotification({...newNotification, priority: e.target.value as any})}
                    className="w-full p-3 border border-gray-300 rounded-lg"
                  >
                    <option value="low">منخفضة</option>
                    <option value="medium">متوسطة</option>
                    <option value="high">عالية</option>
                    <option value="urgent">عاجلة</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">القالب</label>
                  <select
                    value={selectedTemplate?.id || ''}
                    onChange={(e) => {
                      const template = notificationTemplates.find(t => t.id === e.target.value)
                      setSelectedTemplate(template || null)
                      if (template) {
                        setNewNotification({
                          ...newNotification,
                          title: template.subject,
                          message: template.content,
                          type: template.type === 'both' ? 'both' : template.type
                        })
                      }
                    }}
                    className="w-full p-3 border border-gray-300 rounded-lg"
                  >
                    <option value="">اختر قالب (اختياري)</option>
                    {notificationTemplates.map((template) => (
                      <option key={template.id} value={template.id}>{template.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* المحتوى */}
              <div>
                <label className="block text-sm font-medium mb-2">العنوان</label>
                <input
                  type="text"
                  value={newNotification.title}
                  onChange={(e) => setNewNotification({...newNotification, title: e.target.value})}
                  placeholder="عنوان الإشعار"
                  className="w-full p-3 border border-gray-300 rounded-lg"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">المحتوى</label>
                <textarea
                  value={newNotification.message}
                  onChange={(e) => setNewNotification({...newNotification, message: e.target.value})}
                  placeholder="اكتب محتوى الإشعار..."
                  rows={6}
                  className="w-full p-3 border border-gray-300 rounded-lg"
                />
              </div>

              {/* المستلمون */}
              <div>
                <label className="block text-sm font-medium mb-2">المستلمون</label>
                <div className="space-y-4">
                  <div className="flex space-x-2 rtl:space-x-reverse">
                    <Button 
                      variant="outline"
                      onClick={() => setSelectedRecipients(availableRecipients)}
                    >
                      تحديد الكل
                    </Button>
                    <Button 
                      variant="outline"
                      onClick={() => setSelectedRecipients([])}
                    >
                      إلغاء التحديد
                    </Button>
                  </div>
                  
                  {/* المستلمون المحددون */}
                  {selectedRecipients.length > 0 && (
                    <div className="bg-blue-50 rounded-lg p-4">
                      <h5 className="font-medium text-blue-800 mb-2">المحددون ({selectedRecipients.length}):</h5>
                      <div className="flex flex-wrap gap-2">
                        {selectedRecipients.map((recipient) => (
                          <span 
                            key={recipient.id}
                            className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm flex items-center space-x-2 rtl:space-x-reverse"
                          >
                            <span>{recipient.name}</span>
                            <button
                              onClick={() => removeRecipient(recipient.id)}
                              className="text-blue-600 hover:text-blue-800"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {/* قائمة المستلمين المتاحين */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 max-h-60 overflow-y-auto">
                    {availableRecipients.map((recipient) => (
                      <div 
                        key={recipient.id}
                        className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                          selectedRecipients.find(r => r.id === recipient.id)
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                        onClick={() => {
                          if (selectedRecipients.find(r => r.id === recipient.id)) {
                            removeRecipient(recipient.id)
                          } else {
                            addRecipient(recipient)
                          }
                        }}
                      >
                        <div className="flex items-center space-x-3 rtl:space-x-reverse">
                          <div className="w-8 h-8 bg-gray-400 rounded-full flex items-center justify-center text-white text-sm font-bold">
                            {recipient.name.charAt(0)}
                          </div>
                          <div className="flex-1">
                            <p className="font-medium text-sm">{recipient.name}</p>
                            <p className="text-xs text-gray-500">{recipient.department} - {recipient.position}</p>
                          </div>
                          {selectedRecipients.find(r => r.id === recipient.id) && (
                            <Check className="w-5 h-5 text-blue-500" />
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* أزرار الإجراء */}
              <div className="flex justify-center space-x-4 rtl:space-x-reverse pt-4 border-t">
                <Button 
                  onClick={sendNotification}
                  disabled={!newNotification.title || !newNotification.message || selectedRecipients.length === 0}
                  className="bg-blue-500 hover:bg-blue-600"
                >
                  <Send className="w-4 h-4 mr-2" />
                  إرسال الآن
                </Button>
                
                <Button variant="outline">
                  <Clock className="w-4 h-4 mr-2" />
                  جدولة الإرسال
                </Button>
                
                <Button variant="outline">
                  <Archive className="w-4 h-4 mr-2" />
                  حفظ كمسودة
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {activeTab === 'analytics' && (
        <div className="space-y-6">
          <h3 className="text-xl font-semibold text-gray-800">تحليلات الإشعارات</h3>
          
          {/* إحصائيات عامة */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-blue-600">156</div>
                <div className="text-sm text-gray-600">إجمالي الإشعارات</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-green-600">94.2%</div>
                <div className="text-sm text-gray-600">معدل التسليم</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-purple-600">67.8%</div>
                <div className="text-sm text-gray-600">معدل الفتح</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-orange-600">23.4%</div>
                <div className="text-sm text-gray-600">معدل النقر</div>
              </CardContent>
            </Card>
          </div>

          {/* تحليلات تفصيلية */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>الإشعارات حسب النوع</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { type: 'البريد الإلكتروني', count: 89, percentage: 57 },
                    { type: 'الرسائل النصية', count: 43, percentage: 28 },
                    { type: 'الإشعارات الفورية', count: 24, percentage: 15 }
                  ].map((item, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">{item.type}</span>
                      <div className="flex items-center space-x-3 rtl:space-x-reverse">
                        <div className="w-20 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-500 h-2 rounded-full"
                            style={{ width: `${item.percentage}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium">{item.count}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>أفضل الأوقات للإرسال</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { time: '9:00 صباحاً', rate: '89%' },
                    { time: '2:00 ظهراً', rate: '76%' },
                    { time: '11:00 صباحاً', rate: '71%' },
                    { time: '4:00 مساءً', rate: '68%' }
                  ].map((item, index) => (
                    <div key={index} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                      <span className="text-sm">{item.time}</span>
                      <span className="text-sm font-medium text-green-600">{item.rate}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  )
}
