"use client"

import React, { useState } from "react"
import { motion } from "framer-motion"
import { 
  Map, 
  MessageCircle, 
  TrendingUp, 
  CheckCircle,
  Clock,
  Target
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Idea } from "@/components/idea-card"

interface IdeaQuestProps {
  idea: Idea
  onStageComplete: (stage: string) => void
}

const stages = [
  { id: "new", name: "فكرة جديدة", icon: Target, color: "text-blue-500" },
  { id: "discussing", name: "نقاش المجموعة", icon: MessageCircle, color: "text-green-500" },
  { id: "evaluating", name: "التقييم", icon: TrendingUp, color: "text-yellow-500" },
  { id: "improving", name: "التحسين", icon: Clock, color: "text-purple-500" },
  { id: "finalized", name: "الحسم", icon: CheckCircle, color: "text-red-500" }
]

export default function IdeaQuest({ idea, onStageComplete }: IdeaQuestProps) {
  const [currentStage, setCurrentStage] = useState(idea.status)
  const [progress, setProgress] = useState(20) // 20% per stage

  const getCurrentStageIndex = () => {
    return stages.findIndex(stage => stage.id === currentStage)
  }

  const handleStageComplete = () => {
    const currentIndex = getCurrentStageIndex()
    if (currentIndex < stages.length - 1) {
      const nextStage = stages[currentIndex + 1]
      setCurrentStage(nextStage.id as Idea["status"])
      setProgress((currentIndex + 2) * 20)
      onStageComplete(nextStage.id)
    }
  }

  const currentStageData = stages.find(stage => stage.id === currentStage)
  const currentIndex = getCurrentStageIndex()

  return (
    <Card className="overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3 rtl:space-x-reverse">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <Map className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <CardTitle className="text-lg">{idea.title}</CardTitle>
              <p className="text-sm text-gray-600">بواسطة {idea.author.name}</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-blue-600">{progress}%</div>
            <div className="text-xs text-gray-500">مكتمل</div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">تقدم الرحلة</span>
            <span className="text-sm text-gray-500">{currentStageData?.name}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <motion.div
              className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>

        {/* Stages */}
        <div className="space-y-4">
          {stages.map((stage, index) => {
            const isCompleted = index < currentIndex
            const isCurrent = index === currentIndex
            const Icon = stage.icon

            return (
              <motion.div
                key={stage.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`flex items-center space-x-3 rtl:space-x-reverse p-3 rounded-lg border ${
                  isCompleted 
                    ? "bg-green-50 border-green-200" 
                    : isCurrent 
                    ? "bg-blue-50 border-blue-200" 
                    : "bg-gray-50 border-gray-200"
                }`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  isCompleted 
                    ? "bg-green-500 text-white" 
                    : isCurrent 
                    ? "bg-blue-500 text-white" 
                    : "bg-gray-300 text-gray-600"
                }`}>
                  {isCompleted ? (
                    <CheckCircle className="w-4 h-4" />
                  ) : (
                    <Icon className="w-4 h-4" />
                  )}
                </div>
                <div className="flex-1">
                  <div className={`font-medium ${
                    isCompleted 
                      ? "text-green-700" 
                      : isCurrent 
                      ? "text-blue-700" 
                      : "text-gray-600"
                  }`}>
                    {stage.name}
                  </div>
                  <div className="text-xs text-gray-500">
                    {isCompleted 
                      ? "مكتمل" 
                      : isCurrent 
                      ? "قيد التنفيذ" 
                      : "قادم"
                    }
                  </div>
                </div>
                {isCurrent && (
                  <Button 
                    size="sm" 
                    onClick={handleStageComplete}
                    className="bg-blue-500 hover:bg-blue-600"
                  >
                    إكمال المرحلة
                  </Button>
                )}
              </motion.div>
            )
          })}
        </div>

        {/* Current Stage Details */}
        {currentStageData && (
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-2">
              المرحلة الحالية: {currentStageData.name}
            </h4>
            <p className="text-sm text-gray-600">
              {currentStage === "new" && "فكرتك في مرحلة التقييم الأولي"}
              {currentStage === "discussing" && "فريقك يناقش الفكرة ويقدم اقتراحات"}
              {currentStage === "evaluating" && "يتم تقييم الفكرة من حيث الجدوى والتطبيق"}
              {currentStage === "improving" && "الفكرة قيد التحسين والتطوير"}
              {currentStage === "finalized" && "تم الانتهاء من تطوير الفكرة"}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
} 