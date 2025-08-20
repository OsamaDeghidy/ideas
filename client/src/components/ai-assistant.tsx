"use client"

import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Bot,
  Zap,
  TrendingUp,
  Lightbulb,
  MessageCircle,
  Send,
  Mic,
  MicOff,
  Volume2,
  VolumeOff,
  ThumbsUp,
  ThumbsDown,
  Copy,
  Share,
  Bookmark,
  RefreshCw,
  Wand2,
  ArrowRight,
  CheckCircle,
  X
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

// أنواع البيانات
interface AIMessage {
  id: string
  type: 'user' | 'ai'
  content: string
  timestamp: Date
  suggestions?: string[]
  relatedIdeas?: string[]
  confidence?: number
  category?: string
}

interface AISuggestion {
  id: string
  title: string
  description: string
  type: 'improvement' | 'similar' | 'implementation' | 'research'
  confidence: number
  reasons: string[]
  estimatedTime: string
  difficulty: 'easy' | 'medium' | 'hard'
}

interface AIAnalysis {
  sentiment: 'positive' | 'neutral' | 'negative'
  keywords: string[]
  category: string
  feasibility: number
  innovation: number
  marketPotential: number
  technicalComplexity: number
  recommendations: string[]
}

// بيانات تجريبية
const sampleConversation: AIMessage[] = [
  {
    id: "1",
    type: "ai",
    content: "مرحباً! أنا مساعدك الذكي للابتكار 🤖. كيف يمكنني مساعدتك اليوم؟",
    timestamp: new Date(Date.now() - 60000),
    suggestions: ["تحليل فكرة", "اقتراح تحسينات", "البحث عن أفكار مشابهة", "تقييم الجدوى"]
  },
  {
    id: "2", 
    type: "user",
    content: "أريد تطوير تطبيق للتوصيل باستخدام الدرونز",
    timestamp: new Date(Date.now() - 30000)
  },
  {
    id: "3",
    type: "ai", 
    content: "فكرة ممتازة! 🚁 بعد تحليل فكرتك، إليك تقييمي:\n\n✅ **نقاط القوة:**\n- توجه مستقبلي واعد\n- حل لمشكلة الازدحام\n- تقليل وقت التوصيل\n\n⚠️ **التحديات:**\n- القوانين والتراخيص\n- التكلفة العالية\n- الأمان والخصوصية\n\n💡 **اقتراحاتي:**\n1. ابدأ بمناطق محددة\n2. شراكة مع السلطات\n3. نموذج أولي للاختبار",
    timestamp: new Date(),
    suggestions: ["خطة تنفيذ مفصلة", "دراسة السوق", "التحديات التقنية", "خطة الاستثمار"],
    confidence: 85,
    category: "logistics"
  }
]

const aiSuggestions: AISuggestion[] = [
  {
    id: "s1",
    title: "تطوير نموذج أولي",
    description: "بناء نموذج أولي صغير للاختبار في منطقة محدودة",
    type: "implementation",
    confidence: 90,
    reasons: ["تقليل المخاطر", "اختبار الفكرة", "جذب المستثمرين"],
    estimatedTime: "3-6 أشهر",
    difficulty: "medium"
  },
  {
    id: "s2", 
    title: "دراسة القوانين المحلية",
    description: "بحث شامل للقوانين واللوائح الخاصة بالطيران المدني",
    type: "research",
    confidence: 95,
    reasons: ["ضرورة قانونية", "تجنب المشاكل", "الحصول على التراخيص"],
    estimatedTime: "1-2 شهر",
    difficulty: "easy"
  },
  {
    id: "s3",
    title: "شراكة مع شركة طيران",
    description: "التعاون مع شركة طيران محلية للخبرة التقنية",
    type: "improvement", 
    confidence: 75,
    reasons: ["الخبرة التقنية", "الشبكة الموجودة", "تقليل التكاليف"],
    estimatedTime: "2-4 أشهر",
    difficulty: "hard"
  }
]

export default function AIAssistant() {
  const [messages, setMessages] = useState<AIMessage[]>(sampleConversation)
  const [inputText, setInputText] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const [_showSuggestions, _setShowSuggestions] = useState(true)
  const [selectedSuggestion, setSelectedSuggestion] = useState<AISuggestion | null>(null)

  // دالة إرسال رسالة
  const sendMessage = async () => {
    if (!inputText.trim()) return

    // إضافة رسالة المستخدم
    const userMessage: AIMessage = {
      id: Date.now().toString(),
      type: "user",
      content: inputText,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputText("")
    setIsTyping(true)

    // محاكاة استجابة AI
    setTimeout(() => {
      const aiResponse: AIMessage = {
        id: (Date.now() + 1).toString(),
        type: "ai",
        content: generateAIResponse(inputText),
        timestamp: new Date(),
        suggestions: generateSuggestions(inputText),
        confidence: Math.floor(Math.random() * 20 + 80)
      }
      
      setMessages(prev => [...prev, aiResponse])
      setIsTyping(false)
    }, 2000)
  }

  // دالة توليد رد AI
  const generateAIResponse = (input: string) => {
    const responses = [
      `ممتاز! فكرة "${input}" لها إمكانيات رائعة. دعني أحللها لك وأقدم اقتراحات للتطوير.`,
      `تحليل فكرتك "${input}" يُظهر نقاط قوة مهمة. إليك خطة للمضي قدماً...`,
      `بناءً على تحليل البيانات، فكرة "${input}" تُصنف كفكرة واعدة. إليك توصياتي...`
    ]
    return responses[Math.floor(Math.random() * responses.length)]
  }

  // دالة توليد اقتراحات
  const generateSuggestions = (input: string) => {
    return ["تحليل الجدوى", "خطة التنفيذ", "دراسة المنافسين", "خطة التسويق"]
  }

  // دالة بدء التسجيل الصوتي
  const startListening = () => {
    setIsListening(true)
    // محاكاة التسجيل الصوتي
    setTimeout(() => {
      setIsListening(false)
      setInputText("تم تحويل الصوت إلى نص...")
    }, 3000)
  }

  // دالة تحديد لون الثقة
  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 80) return "text-green-600 bg-green-100"
    if (confidence >= 60) return "text-yellow-600 bg-yellow-100"
    return "text-red-600 bg-red-100"
  }

  // دالة تحديد لون صعوبة المهمة
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return "text-green-600 bg-green-100"
      case 'medium': return "text-yellow-600 bg-yellow-100"
      case 'hard': return "text-red-600 bg-red-100"
      default: return "text-gray-600 bg-gray-100"
    }
  }

  return (
    <div className="space-y-6 p-6">
      {/* عنوان القسم */}
      <div className="text-center">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
          المساعد الذكي للابتكار
        </h2>
        <p className="text-gray-600 mt-2">ذكاء اصطناعي متطور لتحليل الأفكار وتقديم الاقتراحات</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* منطقة المحادثة */}
        <div className="lg:col-span-2">
          <Card className="h-[600px] flex flex-col">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3 rtl:space-x-reverse">
                  <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                    <Bot className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <CardTitle>مساعد الابتكار الذكي</CardTitle>
                    <p className="text-sm text-gray-600">متصل ومستعد للمساعدة</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2 rtl:space-x-reverse">
                  <Badge className="bg-green-100 text-green-800">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                    متصل
                  </Badge>
                  
                  <Button variant="outline" size="sm">
                    <RefreshCw className="w-4 h-4 mr-1" />
                    مسح المحادثة
                  </Button>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="flex-1 flex flex-col">
              {/* منطقة الرسائل */}
              <div className="flex-1 overflow-y-auto space-y-4 mb-4">
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-[80%] rounded-lg p-4 ${
                      message.type === 'user' 
                        ? 'bg-blue-500 text-white' 
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      <div className="flex items-start space-x-2 rtl:space-x-reverse">
                        {message.type === 'ai' && (
                          <Bot className="w-5 h-5 text-purple-500 mt-1 flex-shrink-0" />
                        )}
                        <div className="flex-1">
                          <p className="text-sm leading-relaxed whitespace-pre-line">
                            {message.content}
                          </p>
                          
                          {message.confidence && (
                            <div className="mt-2 flex items-center space-x-2 rtl:space-x-reverse">
                              <Badge className={getConfidenceColor(message.confidence)}>
                                ثقة {message.confidence}%
                              </Badge>
                            </div>
                          )}
                          
                          {message.suggestions && (
                            <div className="mt-3 space-y-2">
                              <p className="text-xs opacity-75">اقتراحات للمتابعة:</p>
                              <div className="flex flex-wrap gap-2">
                                {message.suggestions.map((suggestion, index) => (
                                  <button
                                    key={index}
                                    onClick={() => setInputText(suggestion)}
                                    className="text-xs bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full px-3 py-1 transition-colors"
                                  >
                                    {suggestion}
                                  </button>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between mt-2 text-xs opacity-75">
                        <span>{message.timestamp.toLocaleTimeString('ar')}</span>
                        {message.type === 'ai' && (
                          <div className="flex space-x-1 rtl:space-x-reverse">
                            <button className="p-1 hover:bg-white hover:bg-opacity-20 rounded">
                              <ThumbsUp className="w-3 h-3" />
                            </button>
                            <button className="p-1 hover:bg-white hover:bg-opacity-20 rounded">
                              <ThumbsDown className="w-3 h-3" />
                            </button>
                            <button className="p-1 hover:bg-white hover:bg-opacity-20 rounded">
                              <Copy className="w-3 h-3" />
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
                
                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex justify-start"
                  >
                    <div className="bg-gray-100 rounded-lg p-4 flex items-center space-x-2 rtl:space-x-reverse">
                      <Bot className="w-5 h-5 text-purple-500" />
                      <div className="flex space-x-1 rtl:space-x-reverse">
                        <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
              
              {/* منطقة الإدخال */}
              <div className="flex space-x-2 rtl:space-x-reverse">
                <div className="flex-1 relative">
                  <input
                    type="text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                    placeholder="اسأل المساعد الذكي أو اطلب تحليل فكرة..."
                    className="w-full p-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                  
                  <button
                    onClick={startListening}
                    className={`absolute right-3 top-1/2 transform -translate-y-1/2 p-1 rounded-full transition-colors ${
                      isListening ? 'bg-red-500 text-white' : 'text-gray-400 hover:text-purple-500'
                    }`}
                  >
                    {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                  </button>
                </div>
                
                <Button 
                  onClick={sendMessage}
                  disabled={!inputText.trim() || isTyping}
                  className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
                >
                  <Send className="w-4 h-4 mr-2" />
                  إرسال
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* اللوحة الجانبية */}
        <div className="space-y-6">
          {/* الاقتراحات الذكية */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 rtl:space-x-reverse">
                <Wand2 className="w-5 h-5 text-purple-500" />
                <span>اقتراحات ذكية</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {aiSuggestions.map((suggestion) => (
                  <motion.div
                    key={suggestion.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="border border-gray-200 rounded-lg p-3 hover:shadow-md transition-shadow cursor-pointer"
                    onClick={() => setSelectedSuggestion(suggestion)}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-medium text-sm">{suggestion.title}</h4>
                      <Badge className={getDifficultyColor(suggestion.difficulty)}>
                        {suggestion.difficulty === 'easy' ? 'سهل' :
                         suggestion.difficulty === 'medium' ? 'متوسط' : 'صعب'}
                      </Badge>
                    </div>
                    
                    <p className="text-xs text-gray-600 mb-2">{suggestion.description}</p>
                    
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-500">{suggestion.estimatedTime}</span>
                      <Badge className={getConfidenceColor(suggestion.confidence)}>
                        {suggestion.confidence}%
                      </Badge>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* إحصائيات AI */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 rtl:space-x-reverse">
                <TrendingUp className="w-5 h-5 text-blue-500" />
                <span>إحصائيات الذكاء الاصطناعي</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">الأفكار المحللة</span>
                  <span className="font-bold text-blue-600">247</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">دقة التوقعات</span>
                  <span className="font-bold text-green-600">94.2%</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">اقتراحات مقبولة</span>
                  <span className="font-bold text-purple-600">189</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">وقت الاستجابة</span>
                  <span className="font-bold text-orange-600">0.8s</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* اختصارات سريعة */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 rtl:space-x-reverse">
                <Zap className="w-5 h-5 text-yellow-500" />
                <span>اختصارات سريعة</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {[
                  "تحليل فكرة جديدة",
                  "اقتراح تحسينات",
                  "دراسة الجدوى",
                  "خطة التنفيذ",
                  "تحليل المنافسين"
                ].map((shortcut, index) => (
                  <button
                    key={index}
                    onClick={() => setInputText(shortcut)}
                    className="w-full text-left text-sm p-2 hover:bg-gray-50 rounded-lg transition-colors flex items-center space-x-2 rtl:space-x-reverse"
                  >
                    <ArrowRight className="w-3 h-3 text-gray-400" />
                    <span>{shortcut}</span>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* مودال تفاصيل الاقتراح */}
      <AnimatePresence>
        {selectedSuggestion && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedSuggestion(null)}
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
                  <h3 className="text-xl font-bold text-gray-800">{selectedSuggestion.title}</h3>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSelectedSuggestion(null)}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-gray-800 mb-2">الوصف</h4>
                    <p className="text-gray-600">{selectedSuggestion.description}</p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-medium text-gray-800 mb-2">مستوى الثقة</h4>
                      <Badge className={getConfidenceColor(selectedSuggestion.confidence)}>
                        {selectedSuggestion.confidence}%
                      </Badge>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-gray-800 mb-2">مستوى الصعوبة</h4>
                      <Badge className={getDifficultyColor(selectedSuggestion.difficulty)}>
                        {selectedSuggestion.difficulty === 'easy' ? 'سهل' :
                         selectedSuggestion.difficulty === 'medium' ? 'متوسط' : 'صعب'}
                      </Badge>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-gray-800 mb-2">الوقت المقدر</h4>
                    <p className="text-gray-600">{selectedSuggestion.estimatedTime}</p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-gray-800 mb-2">الأسباب</h4>
                    <ul className="space-y-1">
                      {selectedSuggestion.reasons.map((reason, index) => (
                        <li key={index} className="flex items-center space-x-2 rtl:space-x-reverse text-sm text-gray-600">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          <span>{reason}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="flex justify-center space-x-4 rtl:space-x-reverse pt-4 border-t">
                    <Button className="bg-purple-500 hover:bg-purple-600">
                      <CheckCircle className="w-4 h-4 mr-2" />
                      تطبيق الاقتراح
                    </Button>
                    
                    <Button variant="outline">
                      <Bookmark className="w-4 h-4 mr-2" />
                      حفظ للمراجعة
                    </Button>
                    
                    <Button variant="outline">
                      <Share className="w-4 h-4 mr-2" />
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
