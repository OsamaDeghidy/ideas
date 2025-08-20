"use client"

import React, { useState } from "react"
import { motion } from "framer-motion"
import { 
  Calendar, 
  Sparkles, 
  Trophy, 
  Target, 
  Clock,
  Users,
  TrendingUp,
  Award,
  Star,
  CheckCircle
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface Challenge {
  id: string
  title: string
  description: string
  category: string
  reward: number
  participants: number
  deadline: Date
  isCompleted: boolean
  progress: number
}

interface WeeklyChallengesProps {
  challenges: Challenge[]
  onChallengeComplete?: (challengeId: string) => void
  className?: string
}

const sampleChallenges: Challenge[] = [
  {
    id: "1",
    title: "أفضل فكرة لتحسين خدمة العملاء",
    description: "اقترح أفكار مبتكرة لتحسين تجربة العملاء ورضاهم",
    category: "خدمة العملاء",
    reward: 500,
    participants: 24,
    deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
    isCompleted: false,
    progress: 0
  },
  {
    id: "2",
    title: "أغرب فكرة عملية",
    description: "فكرة تبدو غريبة لكنها عملية وقابلة للتنفيذ",
    category: "الابتكار",
    reward: 300,
    participants: 18,
    deadline: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // 5 days
    isCompleted: false,
    progress: 0
  },
  {
    id: "3",
    title: "حل مشكلة توفير الطاقة",
    description: "اقترح حلول مبتكرة لتوفير الطاقة في الشركة",
    category: "الاستدامة",
    reward: 400,
    participants: 31,
    deadline: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000), // 10 days
    isCompleted: false,
    progress: 0
  }
]

export default function WeeklyChallenges({ 
  challenges = sampleChallenges, 
  onChallengeComplete, 
  className 
}: WeeklyChallengesProps) {
  const [localChallenges, setLocalChallenges] = useState<Challenge[]>(challenges)

  const handleParticipate = (challengeId: string) => {
    setLocalChallenges(prev => 
      prev.map(challenge => 
        challenge.id === challengeId 
          ? { ...challenge, participants: challenge.participants + 1 }
          : challenge
      )
    )
  }

  const handleComplete = (challengeId: string) => {
    setLocalChallenges(prev => 
      prev.map(challenge => 
        challenge.id === challengeId 
          ? { ...challenge, isCompleted: true, progress: 100 }
          : challenge
      )
    )
    onChallengeComplete?.(challengeId)
  }

  const formatTimeLeft = (deadline: Date) => {
    const now = new Date()
    const diff = deadline.getTime() - now.getTime()
    const days = Math.floor(diff / (1000 * 60 * 60 * 24))
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    
    if (days > 0) return `${days} يوم`
    if (hours > 0) return `${hours} ساعة`
    return "ينتهي قريباً"
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "خدمة العملاء":
        return <Users className="w-4 h-4" />
      case "الابتكار":
        return <Sparkles className="w-4 h-4" />
      case "الاستدامة":
        return <TrendingUp className="w-4 h-4" />
      default:
        return <Target className="w-4 h-4" />
    }
  }

  return (
    <Card className={cn("", className)}>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2 rtl:space-x-reverse">
          <Calendar className="w-5 h-5 text-orange-500" />
          <span>التحديات الأسبوعية</span>
          <Trophy className="w-4 h-4 text-yellow-500" />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {localChallenges.map((challenge, index) => (
            <motion.div
              key={challenge.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={cn(
                "p-4 rounded-lg border transition-all duration-200",
                challenge.isCompleted 
                  ? "bg-green-50 border-green-200" 
                  : "bg-white border-gray-200 hover:border-orange-300"
              )}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 rtl:space-x-reverse mb-2">
                    {getCategoryIcon(challenge.category)}
                    <span className="text-sm text-gray-600">{challenge.category}</span>
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-1">{challenge.title}</h4>
                  <p className="text-sm text-gray-600">{challenge.description}</p>
                </div>
                
                <div className="flex items-center space-x-2 rtl:space-x-reverse">
                  <div className="text-center">
                    <div className="flex items-center space-x-1 rtl:space-x-reverse">
                      <Star className="w-4 h-4 text-yellow-500" />
                      <span className="font-bold text-yellow-600">{challenge.reward}</span>
                    </div>
                    <span className="text-xs text-gray-500">نقطة</span>
                  </div>
                </div>
              </div>

              {/* Progress Bar */}
              {!challenge.isCompleted && (
                <div className="mb-3">
                  <div className="flex justify-between text-xs text-gray-500 mb-1">
                    <span>التقدم</span>
                    <span>{challenge.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <motion.div
                      className="bg-gradient-to-r from-orange-500 to-red-500 h-2 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${challenge.progress}%` }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                </div>
              )}

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4 rtl:space-x-reverse text-sm text-gray-500">
                  <div className="flex items-center space-x-1 rtl:space-x-reverse">
                    <Users className="w-4 h-4" />
                    <span>{challenge.participants} مشارك</span>
                  </div>
                  <div className="flex items-center space-x-1 rtl:space-x-reverse">
                    <Clock className="w-4 h-4" />
                    <span>{formatTimeLeft(challenge.deadline)}</span>
                  </div>
                </div>

                <div className="flex items-center space-x-2 rtl:space-x-reverse">
                  {challenge.isCompleted ? (
                    <div className="flex items-center space-x-1 rtl:space-x-reverse text-green-600">
                      <Award className="w-4 h-4" />
                      <span className="text-sm font-medium">مكتمل</span>
                    </div>
                  ) : (
                    <>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleParticipate(challenge.id)}
                        className="flex items-center space-x-1 rtl:space-x-reverse"
                      >
                        <Users className="w-4 h-4" />
                        <span>مشاركة</span>
                      </Button>
                      <Button
                        size="sm"
                        onClick={() => handleComplete(challenge.id)}
                        className="flex items-center space-x-1 rtl:space-x-reverse"
                      >
                        <CheckCircle className="w-4 h-4" />
                        <span>إكمال</span>
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Summary */}
        <div className="mt-6 bg-gradient-to-r from-orange-50 to-red-50 p-4 rounded-lg border border-orange-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-orange-700">إجمالي التحديات</p>
              <p className="text-2xl font-bold text-orange-800">{localChallenges.length}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-orange-700">المكتملة</p>
              <p className="font-medium text-orange-800">
                {localChallenges.filter(c => c.isCompleted).length}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
} 