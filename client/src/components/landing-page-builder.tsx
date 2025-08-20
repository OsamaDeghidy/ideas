"use client"

import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Monitor,
  Smartphone,
  Tablet,
  Palette,
  Type,
  Image,
  Layout,
  Settings,
  Eye,
  Save,
  Upload,
  Download,
  Copy,
  Edit,
  Trash2,
  Plus,
  Minus,
  Move,
  RotateCcw,
  Check,
  X,
  Globe,
  Link,
  Mail,
  Phone,
  MapPin,
  Building,
  User,
  Calendar,
  Briefcase,
  GraduationCap,
  Clock,
  TrendingUp
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

// أنواع البيانات
interface FormField {
  id: string
  type: 'text' | 'email' | 'tel' | 'select' | 'textarea' | 'date' | 'number'
  label: string
  placeholder: string
  required: boolean
  options?: string[]
  validation?: {
    minLength?: number
    maxLength?: number
    pattern?: string
  }
  icon?: React.ComponentType<any>
}

interface CompanyBranding {
  logo: string
  companyName: string
  primaryColor: string
  secondaryColor: string
  backgroundColor: string
  textColor: string
  fontFamily: string
  customCSS?: string
}

interface LandingPageContent {
  title: string
  subtitle: string
  description: string
  heroImage: string
  features: string[]
  testimonials: {
    name: string
    position: string
    company: string
    content: string
    avatar: string
  }[]
  contactInfo: {
    email: string
    phone: string
    address: string
    website: string
  }
}

interface LandingPage {
  id: string
  companyId: string
  title: string
  slug: string
  branding: CompanyBranding
  content: LandingPageContent
  formFields: FormField[]
  isActive: boolean
  createdAt: Date
  lastModified: Date
  views: number
  submissions: number
  conversionRate: number
}

// حقول النموذج المتاحة
const availableFields: Omit<FormField, 'id'>[] = [
  {
    type: 'text',
    label: 'الاسم الكامل',
    placeholder: 'ادخل اسمك الكامل',
    required: true,
    icon: User
  },
  {
    type: 'email',
    label: 'البريد الإلكتروني',
    placeholder: 'example@company.com',
    required: true,
    icon: Mail
  },
  {
    type: 'tel',
    label: 'رقم الهاتف',
    placeholder: '+966 50 123 4567',
    required: false,
    icon: Phone
  },
  {
    type: 'text',
    label: 'المنصب الوظيفي',
    placeholder: 'مدير، مطور، محاسب...',
    required: true,
    icon: Briefcase
  },
  {
    type: 'select',
    label: 'القسم/الإدارة',
    placeholder: 'اختر القسم',
    required: true,
    options: ['تقنية المعلومات', 'الموارد البشرية', 'المبيعات', 'التسويق', 'المحاسبة', 'العمليات', 'أخرى'],
    icon: Building
  },
  {
    type: 'select',
    label: 'التخصص',
    placeholder: 'اختر التخصص',
    required: false,
    options: ['هندسة حاسوب', 'إدارة أعمال', 'محاسبة', 'تسويق', 'موارد بشرية', 'هندسة صناعية', 'أخرى'],
    icon: GraduationCap
  },
  {
    type: 'select',
    label: 'سنوات الخبرة',
    placeholder: 'اختر سنوات الخبرة',
    required: false,
    options: ['أقل من سنة', '1-3 سنوات', '3-5 سنوات', '5-10 سنوات', 'أكثر من 10 سنوات'],
    icon: Clock
  },
  {
    type: 'text',
    label: 'اسم الشركة',
    placeholder: 'ادخل اسم الشركة',
    required: true,
    icon: Building
  },
  {
    type: 'text',
    label: 'الفرع/الموقع',
    placeholder: 'الرياض، جدة، الدمام...',
    required: false,
    icon: MapPin
  },
  {
    type: 'textarea',
    label: 'نبذة عن خبرتك',
    placeholder: 'اكتب نبذة مختصرة عن خبرتك المهنية...',
    required: false
  }
]

// بيانات تجريبية
const sampleLandingPages: LandingPage[] = [
  {
    id: "lp1",
    companyId: "comp1",
    title: "هاكاثون الابتكار 2024 - شركة التقنية المتقدمة",
    slug: "innovation-hackathon-2024",
    branding: {
      logo: "/logo-placeholder.png",
      companyName: "شركة التقنية المتقدمة",
      primaryColor: "#2563eb",
      secondaryColor: "#3b82f6",
      backgroundColor: "#f8fafc",
      textColor: "#1e293b",
      fontFamily: "Cairo"
    },
    content: {
      title: "هاكاثون الابتكار 2024",
      subtitle: "انضم إلى أكبر تجمع للمبدعين والمبتكرين",
      description: "ثلاثة أيام من الإبداع والابتكار، فرصة ذهبية لتحويل أفكارك إلى واقع وربح جوائز قيمة تصل إلى مليون ريال",
      heroImage: "/hero-placeholder.jpg",
      features: [
        "جوائز نقدية تصل إلى مليون ريال",
        "ورش تدريبية مع خبراء عالميين",
        "فرص استثمارية للمشاريع الواعدة",
        "شبكة علاقات مع رواد الأعمال"
      ],
      testimonials: [
        {
          name: "أحمد محمد",
          position: "مؤسس",
          company: "تطبيق ذكي",
          content: "الهاكاثون غير مسار حياتي المهنية، تمكنت من تحويل فكرتي إلى مشروع ناجح",
          avatar: "/avatar1.jpg"
        }
      ],
      contactInfo: {
        email: "info@techadvanced.com",
        phone: "+966 11 123 4567",
        address: "الرياض، المملكة العربية السعودية",
        website: "www.techadvanced.com"
      }
    },
    formFields: [
      { id: "1", ...availableFields[0] },
      { id: "2", ...availableFields[1] },
      { id: "3", ...availableFields[2] },
      { id: "4", ...availableFields[3] },
      { id: "5", ...availableFields[4] },
      { id: "6", ...availableFields[7] }
    ],
    isActive: true,
    createdAt: new Date("2024-01-15"),
    lastModified: new Date("2024-01-20"),
    views: 1250,
    submissions: 187,
    conversionRate: 14.96
  }
]

export default function LandingPageBuilder() {
  const [selectedPage, setSelectedPage] = useState<LandingPage | null>(null)
  const [editMode, setEditMode] = useState(false)
  const [previewMode, setPreviewMode] = useState(false)
  const [devicePreview, setDevicePreview] = useState<'desktop' | 'tablet' | 'mobile'>('desktop')
  const [activeTab, setActiveTab] = useState<'design' | 'content' | 'form' | 'analytics'>('design')

  // حالات التحرير
  const [branding, setBranding] = useState<CompanyBranding>({
    logo: "",
    companyName: "",
    primaryColor: "#2563eb",
    secondaryColor: "#3b82f6", 
    backgroundColor: "#ffffff",
    textColor: "#1e293b",
    fontFamily: "Cairo"
  })

  const [content, setContent] = useState<LandingPageContent>({
    title: "",
    subtitle: "",
    description: "",
    heroImage: "",
    features: [],
    testimonials: [],
    contactInfo: {
      email: "",
      phone: "",
      address: "",
      website: ""
    }
  })

  const [formFields, setFormFields] = useState<FormField[]>([])

  // دالة إنشاء صفحة جديدة
  const createNewPage = () => {
    setSelectedPage(null)
    setEditMode(true)
    setActiveTab('design')
    setBranding({
      logo: "",
      companyName: "",
      primaryColor: "#2563eb",
      secondaryColor: "#3b82f6",
      backgroundColor: "#ffffff",
      textColor: "#1e293b",
      fontFamily: "Cairo"
    })
    setContent({
      title: "",
      subtitle: "",
      description: "",
      heroImage: "",
      features: [],
      testimonials: [],
      contactInfo: { email: "", phone: "", address: "", website: "" }
    })
    setFormFields([])
  }

  // دالة إضافة حقل نموذج
  const addFormField = (field: Omit<FormField, 'id'>) => {
    const newField: FormField = {
      ...field,
      id: Date.now().toString()
    }
    setFormFields([...formFields, newField])
  }

  // دالة حذف حقل نموذج
  const removeFormField = (fieldId: string) => {
    setFormFields(formFields.filter(f => f.id !== fieldId))
  }

  // دالة إضافة ميزة
  const addFeature = () => {
    setContent({
      ...content,
      features: [...content.features, ""]
    })
  }

  // دالة تحديث ميزة
  const updateFeature = (index: number, value: string) => {
    const newFeatures = [...content.features]
    newFeatures[index] = value
    setContent({ ...content, features: newFeatures })
  }

  // دالة حذف ميزة
  const removeFeature = (index: number) => {
    setContent({
      ...content,
      features: content.features.filter((_, i) => i !== index)
    })
  }

  // معاينة الصفحة
  const PreviewPage = ({ page }: { page: LandingPage }) => (
    <div 
      className="min-h-screen"
      style={{ 
        backgroundColor: page.branding.backgroundColor,
        color: page.branding.textColor,
        fontFamily: page.branding.fontFamily
      }}
    >
      {/* Header */}
      <header className="py-4 px-6 border-b" style={{ borderColor: page.branding.primaryColor + '20' }}>
        <div className="flex items-center justify-between max-w-6xl mx-auto">
          <div className="flex items-center space-x-3 rtl:space-x-reverse">
            <div 
              className="w-12 h-12 rounded-lg flex items-center justify-center text-white font-bold"
              style={{ backgroundColor: page.branding.primaryColor }}
            >
              {page.branding.companyName.charAt(0)}
            </div>
            <span className="text-xl font-bold">{page.branding.companyName}</span>
          </div>
          <nav className="hidden md:flex space-x-6 rtl:space-x-reverse">
            <a href="#about" className="hover:opacity-70">حول الهاكاثون</a>
            <a href="#register" className="hover:opacity-70">التسجيل</a>
            <a href="#contact" className="hover:opacity-70">اتصل بنا</a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h1 
            className="text-5xl md:text-6xl font-bold mb-6"
            style={{ color: page.branding.primaryColor }}
          >
            {page.content.title}
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-80">
            {page.content.subtitle}
          </p>
          <p className="text-lg mb-12 max-w-3xl mx-auto opacity-70">
            {page.content.description}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg"
              style={{ 
                backgroundColor: page.branding.primaryColor,
                borderColor: page.branding.primaryColor
              }}
              className="text-white hover:opacity-90"
            >
              سجل الآن
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              style={{ 
                borderColor: page.branding.primaryColor,
                color: page.branding.primaryColor
              }}
            >
              تعرف أكثر
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      {page.content.features.length > 0 && (
        <section className="py-16 px-6" style={{ backgroundColor: page.branding.primaryColor + '05' }}>
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">لماذا تشارك معنا؟</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {page.content.features.map((feature, index) => (
                <div key={index} className="text-center">
                  <div 
                    className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-white"
                    style={{ backgroundColor: page.branding.secondaryColor }}
                  >
                    <Check className="w-8 h-8" />
                  </div>
                  <p className="font-medium">{feature}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Registration Form */}
      <section id="register" className="py-16 px-6">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">سجل الآن</h2>
          <Card>
            <CardContent className="p-8">
              <form className="space-y-6">
                {page.formFields.map((field) => {
                  const FieldIcon = field.icon
                  return (
                    <div key={field.id}>
                      <label className="block text-sm font-medium mb-2">
                        {field.label}
                        {field.required && <span className="text-red-500 mr-1">*</span>}
                      </label>
                      <div className="relative">
                        {FieldIcon && (
                          <FieldIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        )}
                        {field.type === 'select' ? (
                          <select 
                            className={`w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent ${
                              FieldIcon ? 'pl-12' : ''
                            }`}
                          >
                            <option value="">{field.placeholder}</option>
                            {field.options?.map((option, i) => (
                              <option key={i} value={option}>{option}</option>
                            ))}
                          </select>
                        ) : field.type === 'textarea' ? (
                          <textarea
                            placeholder={field.placeholder}
                            rows={4}
                            className={`w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent ${
                              FieldIcon ? 'pl-12' : ''
                            }`}
                          />
                        ) : (
                          <input
                            type={field.type}
                            placeholder={field.placeholder}
                            className={`w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent ${
                              FieldIcon ? 'pl-12' : ''
                            }`}
                          />
                        )}
                      </div>
                    </div>
                  )
                })}
                
                <Button 
                  type="submit" 
                  className="w-full text-white hover:opacity-90"
                  style={{ backgroundColor: page.branding.primaryColor }}
                  size="lg"
                >
                  تسجيل المشاركة
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 px-6" style={{ backgroundColor: page.branding.primaryColor + '05' }}>
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">تواصل معنا</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <Mail className="w-8 h-8 mx-auto mb-2" style={{ color: page.branding.primaryColor }} />
              <p className="font-medium">البريد الإلكتروني</p>
              <p className="text-sm opacity-70">{page.content.contactInfo.email}</p>
            </div>
            <div>
              <Phone className="w-8 h-8 mx-auto mb-2" style={{ color: page.branding.primaryColor }} />
              <p className="font-medium">الهاتف</p>
              <p className="text-sm opacity-70">{page.content.contactInfo.phone}</p>
            </div>
            <div>
              <MapPin className="w-8 h-8 mx-auto mb-2" style={{ color: page.branding.primaryColor }} />
              <p className="font-medium">العنوان</p>
              <p className="text-sm opacity-70">{page.content.contactInfo.address}</p>
            </div>
            <div>
              <Globe className="w-8 h-8 mx-auto mb-2" style={{ color: page.branding.primaryColor }} />
              <p className="font-medium">الموقع الإلكتروني</p>
              <p className="text-sm opacity-70">{page.content.contactInfo.website}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )

  if (previewMode && selectedPage) {
    return (
      <div className="fixed inset-0 bg-white z-50">
        {/* شريط المعاينة */}
        <div className="bg-gray-800 text-white p-4 flex items-center justify-between">
          <div className="flex items-center space-x-4 rtl:space-x-reverse">
            <h3 className="font-semibold">معاينة: {selectedPage.title}</h3>
            <div className="flex space-x-2 rtl:space-x-reverse">
              <button
                onClick={() => setDevicePreview('desktop')}
                className={`p-2 rounded ${devicePreview === 'desktop' ? 'bg-blue-500' : 'bg-gray-600'}`}
              >
                <Monitor className="w-4 h-4" />
              </button>
              <button
                onClick={() => setDevicePreview('tablet')}
                className={`p-2 rounded ${devicePreview === 'tablet' ? 'bg-blue-500' : 'bg-gray-600'}`}
              >
                <Tablet className="w-4 h-4" />
              </button>
              <button
                onClick={() => setDevicePreview('mobile')}
                className={`p-2 rounded ${devicePreview === 'mobile' ? 'bg-blue-500' : 'bg-gray-600'}`}
              >
                <Smartphone className="w-4 h-4" />
              </button>
            </div>
          </div>
          
          <div className="flex space-x-2 rtl:space-x-reverse">
            <Button variant="outline" size="sm" onClick={() => setPreviewMode(false)}>
              <Edit className="w-4 h-4 mr-1" />
              تحرير
            </Button>
            <Button variant="outline" size="sm" onClick={() => setPreviewMode(false)}>
              <X className="w-4 h-4 mr-1" />
              إغلاق
            </Button>
          </div>
        </div>

        {/* المعاينة */}
        <div className="h-full overflow-auto">
          <div className={`mx-auto transition-all duration-300 ${
            devicePreview === 'desktop' ? 'max-w-none' :
            devicePreview === 'tablet' ? 'max-w-3xl' : 'max-w-sm'
          }`}>
            <PreviewPage page={selectedPage} />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6 p-6">
      {/* عنوان القسم */}
      <div className="text-center">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
          منشئ صفحات الهبوط
        </h2>
        <p className="text-gray-600 mt-2">أنشئ صفحات هبوط مخصصة لشركتك بهوية فريدة</p>
      </div>

      {!editMode ? (
        /* قائمة الصفحات */
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-semibold text-gray-800">صفحات الهبوط</h3>
            <Button 
              onClick={createNewPage}
              className="bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600"
            >
              <Plus className="w-4 h-4 mr-2" />
              إنشاء صفحة جديدة
            </Button>
          </div>

          {/* إحصائيات سريعة */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-blue-600">{sampleLandingPages.length}</div>
                <div className="text-sm text-gray-600">صفحات نشطة</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-green-600">
                  {sampleLandingPages.reduce((sum, p) => sum + p.views, 0)}
                </div>
                <div className="text-sm text-gray-600">إجمالي المشاهدات</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-purple-600">
                  {sampleLandingPages.reduce((sum, p) => sum + p.submissions, 0)}
                </div>
                <div className="text-sm text-gray-600">التسجيلات</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-orange-600">
                  {(sampleLandingPages.reduce((sum, p) => sum + p.conversionRate, 0) / sampleLandingPages.length).toFixed(1)}%
                </div>
                <div className="text-sm text-gray-600">معدل التحويل</div>
              </CardContent>
            </Card>
          </div>

          {/* قائمة الصفحات */}
          <div className="grid gap-6">
            {sampleLandingPages.map((page) => (
              <motion.div
                key={page.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-xl shadow-lg border border-gray-200"
              >
                <Card>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 rtl:space-x-reverse mb-2">
                          <div 
                            className="w-12 h-12 rounded-lg flex items-center justify-center text-white font-bold"
                            style={{ backgroundColor: page.branding.primaryColor }}
                          >
                            {page.branding.companyName.charAt(0)}
                          </div>
                          <div>
                            <CardTitle className="text-lg font-semibold text-gray-800">
                              {page.title}
                            </CardTitle>
                            <p className="text-sm text-gray-600">{page.branding.companyName}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-4 rtl:space-x-reverse mb-3">
                          <Badge variant={page.isActive ? "default" : "secondary"}>
                            {page.isActive ? "نشط" : "غير نشط"}
                          </Badge>
                          
                          <div className="flex items-center space-x-2 rtl:space-x-reverse text-sm text-gray-600">
                            <Eye className="w-4 h-4" />
                            <span>{page.views.toLocaleString()} مشاهدة</span>
                          </div>
                          
                          <div className="flex items-center space-x-2 rtl:space-x-reverse text-sm text-gray-600">
                            <User className="w-4 h-4" />
                            <span>{page.submissions} تسجيل</span>
                          </div>
                          
                          <div className="flex items-center space-x-2 rtl:space-x-reverse text-sm text-gray-600">
                            <TrendingUp className="w-4 h-4" />
                            <span>{page.conversionRate}% تحويل</span>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-2 rtl:space-x-reverse text-sm text-gray-500">
                          <Calendar className="w-4 h-4" />
                          <span>آخر تعديل: {page.lastModified.toLocaleDateString('ar')}</span>
                        </div>
                      </div>
                      
                      <div className="flex space-x-2 rtl:space-x-reverse">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setSelectedPage(page)
                            setPreviewMode(true)
                          }}
                        >
                          <Eye className="w-4 h-4 mr-1" />
                          معاينة
                        </Button>
                        
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setSelectedPage(page)
                            setEditMode(true)
                            setBranding(page.branding)
                            setContent(page.content)
                            setFormFields(page.formFields)
                          }}
                        >
                          <Edit className="w-4 h-4 mr-1" />
                          تحرير
                        </Button>
                        
                        <Button variant="outline" size="sm">
                          <Copy className="w-4 h-4 mr-1" />
                          نسخ
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="flex items-center space-x-2 rtl:space-x-reverse mb-2">
                        <Link className="w-4 h-4 text-blue-500" />
                        <span className="text-sm font-medium text-gray-800">رابط الصفحة:</span>
                      </div>
                      <code className="text-sm text-blue-600 bg-white px-2 py-1 rounded">
                        https://ideas-platform.com/landing/{page.slug}
                      </code>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      ) : (
        /* محرر الصفحة */
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-semibold text-gray-800">
              {selectedPage ? 'تحرير الصفحة' : 'إنشاء صفحة جديدة'}
            </h3>
            <div className="flex space-x-2 rtl:space-x-reverse">
              <Button 
                variant="outline"
                onClick={() => {
                  if (selectedPage) {
                    setSelectedPage(selectedPage)
                    setPreviewMode(true)
                  }
                }}
                disabled={!selectedPage}
              >
                <Eye className="w-4 h-4 mr-1" />
                معاينة
              </Button>
              
              <Button 
                className="bg-green-500 hover:bg-green-600"
                onClick={() => {
                  // حفظ التغييرات
                  alert("تم حفظ الصفحة بنجاح!")
                  setEditMode(false)
                }}
              >
                <Save className="w-4 h-4 mr-1" />
                حفظ
              </Button>
              
              <Button 
                variant="outline"
                onClick={() => setEditMode(false)}
              >
                <X className="w-4 h-4 mr-1" />
                إلغاء
              </Button>
            </div>
          </div>

          {/* تبويبات التحرير */}
          <div className="flex space-x-1 rtl:space-x-reverse bg-white rounded-lg p-1 shadow-sm">
            {[
              { id: 'design', label: 'التصميم', icon: Palette },
              { id: 'content', label: 'المحتوى', icon: Type },
              { id: 'form', label: 'النموذج', icon: Layout },
              { id: 'analytics', label: 'التحليلات', icon: TrendingUp }
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
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* لوحة التحرير */}
            <div className="lg:col-span-2 space-y-6">
              {activeTab === 'design' && (
                <Card>
                  <CardHeader>
                    <CardTitle>هوية الشركة والتصميم</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">اسم الشركة</label>
                      <input
                        type="text"
                        value={branding.companyName}
                        onChange={(e) => setBranding({...branding, companyName: e.target.value})}
                        className="w-full p-3 border border-gray-300 rounded-lg"
                        placeholder="ادخل اسم الشركة"
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">اللون الأساسي</label>
                        <input
                          type="color"
                          value={branding.primaryColor}
                          onChange={(e) => setBranding({...branding, primaryColor: e.target.value})}
                          className="w-full h-10 border border-gray-300 rounded-lg"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium mb-2">اللون الثانوي</label>
                        <input
                          type="color"
                          value={branding.secondaryColor}
                          onChange={(e) => setBranding({...branding, secondaryColor: e.target.value})}
                          className="w-full h-10 border border-gray-300 rounded-lg"
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">لون الخلفية</label>
                        <input
                          type="color"
                          value={branding.backgroundColor}
                          onChange={(e) => setBranding({...branding, backgroundColor: e.target.value})}
                          className="w-full h-10 border border-gray-300 rounded-lg"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium mb-2">لون النص</label>
                        <input
                          type="color"
                          value={branding.textColor}
                          onChange={(e) => setBranding({...branding, textColor: e.target.value})}
                          className="w-full h-10 border border-gray-300 rounded-lg"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2">نوع الخط</label>
                      <select
                        value={branding.fontFamily}
                        onChange={(e) => setBranding({...branding, fontFamily: e.target.value})}
                        className="w-full p-3 border border-gray-300 rounded-lg"
                      >
                        <option value="Cairo">Cairo</option>
                        <option value="Amiri">Amiri</option>
                        <option value="Tajawal">Tajawal</option>
                        <option value="El Messiri">El Messiri</option>
                      </select>
                    </div>
                  </CardContent>
                </Card>
              )}

              {activeTab === 'content' && (
                <Card>
                  <CardHeader>
                    <CardTitle>محتوى الصفحة</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">العنوان الرئيسي</label>
                      <input
                        type="text"
                        value={content.title}
                        onChange={(e) => setContent({...content, title: e.target.value})}
                        className="w-full p-3 border border-gray-300 rounded-lg"
                        placeholder="مثال: هاكاثون الابتكار 2024"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2">العنوان الفرعي</label>
                      <input
                        type="text"
                        value={content.subtitle}
                        onChange={(e) => setContent({...content, subtitle: e.target.value})}
                        className="w-full p-3 border border-gray-300 rounded-lg"
                        placeholder="مثال: انضم إلى أكبر تجمع للمبدعين"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2">الوصف</label>
                      <textarea
                        value={content.description}
                        onChange={(e) => setContent({...content, description: e.target.value})}
                        rows={4}
                        className="w-full p-3 border border-gray-300 rounded-lg"
                        placeholder="اكتب وصفاً جذاباً للحدث..."
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2">المميزات</label>
                      {content.features.map((feature, index) => (
                        <div key={index} className="flex space-x-2 rtl:space-x-reverse mb-2">
                          <input
                            type="text"
                            value={feature}
                            onChange={(e) => updateFeature(index, e.target.value)}
                            className="flex-1 p-2 border border-gray-300 rounded-lg"
                            placeholder="اكتب ميزة..."
                          />
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => removeFeature(index)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      ))}
                      <Button
                        variant="outline"
                        onClick={addFeature}
                        className="w-full"
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        إضافة ميزة
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}

              {activeTab === 'form' && (
                <Card>
                  <CardHeader>
                    <CardTitle>بناء النموذج</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-3">الحقول المضافة:</h4>
                      {formFields.length === 0 ? (
                        <p className="text-gray-500 text-center py-4">لم يتم إضافة أي حقول بعد</p>
                      ) : (
                        <div className="space-y-2">
                          {formFields.map((field, index) => {
                            const FieldIcon = field.icon
                            return (
                              <div key={field.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                <div className="flex items-center space-x-3 rtl:space-x-reverse">
                                  {FieldIcon && <FieldIcon className="w-5 h-5 text-gray-500" />}
                                  <div>
                                    <p className="font-medium">{field.label}</p>
                                    <p className="text-sm text-gray-500">{field.type}</p>
                                  </div>
                                  {field.required && (
                                    <Badge variant="destructive" className="mr-2">مطلوب</Badge>
                                  )}
                                </div>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => removeFormField(field.id)}
                                >
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </div>
                            )
                          })}
                        </div>
                      )}
                    </div>
                    
                    <div>
                      <h4 className="font-medium mb-3">إضافة حقول جديدة:</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {availableFields.map((field, index) => {
                          const FieldIcon = field.icon
                          return (
                            <button
                              key={index}
                              onClick={() => addFormField(field)}
                              className="flex items-center space-x-3 rtl:space-x-reverse p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left"
                            >
                              {FieldIcon && <FieldIcon className="w-5 h-5 text-gray-500" />}
                              <div>
                                <p className="font-medium text-sm">{field.label}</p>
                                <p className="text-xs text-gray-500">{field.type}</p>
                              </div>
                            </button>
                          )
                        })}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {activeTab === 'analytics' && (
                <Card>
                  <CardHeader>
                    <CardTitle>التحليلات والإحصائيات</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600">1,250</div>
                        <div className="text-sm text-gray-600">مشاهدات الصفحة</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-600">187</div>
                        <div className="text-sm text-gray-600">تسجيلات مكتملة</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-purple-600">14.96%</div>
                        <div className="text-sm text-gray-600">معدل التحويل</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-orange-600">3.2 دقيقة</div>
                        <div className="text-sm text-gray-600">متوسط الوقت</div>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <h5 className="font-medium">أكثر الحقول تفاعلاً:</h5>
                      <div className="space-y-2">
                        {['البريد الإلكتروني', 'اسم الشركة', 'المنصب الوظيفي'].map((field, index) => (
                          <div key={index} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                            <span className="text-sm">{field}</span>
                            <span className="text-sm font-medium">{100 - index * 5}%</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* معاينة مباشرة */}
            <div className="lg:col-span-1">
              <Card className="sticky top-4">
                <CardHeader>
                  <CardTitle className="text-sm">معاينة مباشرة</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="border rounded-lg overflow-hidden">
                    <div 
                      className="p-4 text-center"
                      style={{ 
                        backgroundColor: branding.backgroundColor,
                        color: branding.textColor 
                      }}
                    >
                      <div 
                        className="w-8 h-8 rounded mx-auto mb-2 flex items-center justify-center text-white text-sm font-bold"
                        style={{ backgroundColor: branding.primaryColor }}
                      >
                        {branding.companyName.charAt(0) || 'ش'}
                      </div>
                      <h3 
                        className="font-bold text-sm mb-1"
                        style={{ color: branding.primaryColor }}
                      >
                        {content.title || 'عنوان الحدث'}
                      </h3>
                      <p className="text-xs opacity-70 mb-2">
                        {content.subtitle || 'العنوان الفرعي'}
                      </p>
                      <div className="space-y-1">
                        {formFields.slice(0, 3).map((field) => (
                          <div key={field.id} className="text-left">
                            <div className="text-xs text-gray-600 mb-1">{field.label}</div>
                            <div className="h-6 bg-gray-100 rounded text-xs flex items-center px-2">
                              {field.placeholder}
                            </div>
                          </div>
                        ))}
                        {formFields.length > 3 && (
                          <div className="text-xs text-gray-500">+{formFields.length - 3} حقل آخر</div>
                        )}
                      </div>
                      <button 
                        className="w-full mt-2 py-1 rounded text-xs text-white"
                        style={{ backgroundColor: branding.primaryColor }}
                      >
                        تسجيل المشاركة
                      </button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
