"use client"

import React, { useState } from "react"
import { motion } from "framer-motion"
import { RotateCcw, Sparkles, Target, Zap } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface SpinWheelProps {
  ideas: Array<{
    id: string
    title: string
    category: string
  }>
  onSpin?: (result: { idea: { id: string; title: string; category: string }; challenge: string }) => void
  className?: string
}

const challenges = [
  "حسّن هذه الفكرة",
  "أضف 3 اقتراحات جديدة",
  "فكر في التطبيق العملي",
  "اقترح حلول للمشاكل المحتملة",
  "كيف يمكن تسويق هذه الفكرة؟",
  "ما هي الموارد المطلوبة؟",
  "فكر في البدائل",
  "كيف يمكن تطوير هذه الفكرة؟"
]

export default function SpinWheel({ ideas, onSpin, className }: SpinWheelProps) {
  const [isSpinning, setIsSpinning] = useState(false)
  const [selectedChallenge, setSelectedChallenge] = useState<string>("")
  const [selectedIdea, setSelectedIdea] = useState<{ id: string; title: string; category: string } | null>(null)
  const [rotation, setRotation] = useState(0)

  const handleSpin = () => {
    if (isSpinning) return

    setIsSpinning(true)
    const randomIdea = ideas[Math.floor(Math.random() * ideas.length)]
    const randomChallenge = challenges[Math.floor(Math.random() * challenges.length)]
    const newRotation = rotation + 1440 + Math.random() * 360 // Multiple spins + random

    setRotation(newRotation)
    setSelectedIdea(randomIdea)
    setSelectedChallenge(randomChallenge)

    setTimeout(() => {
      setIsSpinning(false)
      onSpin?.({ idea: randomIdea, challenge: randomChallenge })
    }, 3000)
  }

  const resetWheel = () => {
    setSelectedIdea(null)
    setSelectedChallenge("")
    setRotation(0)
  }

  return (
    <Card className={cn("", className)}>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2 rtl:space-x-reverse">
          <Target className="w-5 h-5 text-purple-500" />
          <span>دولاب الأفكار</span>
          <Sparkles className="w-4 h-4 text-yellow-500 sparkle" />
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Wheel */}
        <div className="flex justify-center">
          <div className="relative w-64 h-64">
            <motion.div
              className="w-full h-full rounded-full border-4 border-primary relative overflow-hidden"
              style={{
                background: "conic-gradient(from 0deg, #667eea, #764ba2, #f093fb, #f5576c, #4facfe, #00f2fe, #fa709a, #fee140, #667eea)"
              }}
              animate={{ rotate: rotation }}
              transition={{ duration: 3, ease: "easeOut" }}
            >
              <div className="absolute inset-2 bg-white rounded-full flex items-center justify-center">
                <div className="text-center">
                  <Zap className="w-8 h-8 text-primary mx-auto mb-2" />
                  <p className="text-sm font-medium text-gray-700">اضغط للدوران</p>
                </div>
              </div>
            </motion.div>
            
            {/* Pointer */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1">
              <div className="w-0 h-0 border-l-4 border-r-4 border-b-8 border-transparent border-b-red-500"></div>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex justify-center space-x-4 rtl:space-x-reverse">
          <Button
            onClick={handleSpin}
            disabled={isSpinning}
            variant="sparkle"
            className="flex items-center space-x-2 rtl:space-x-reverse"
          >
            <RotateCcw className={cn("w-4 h-4", isSpinning && "animate-spin")} />
            <span>{isSpinning ? "يدور..." : "دور الدولاب"}</span>
          </Button>
          
          {selectedIdea && (
            <Button
              onClick={resetWheel}
              variant="outline"
              size="sm"
            >
              إعادة تعيين
            </Button>
          )}
        </div>

        {/* Result */}
        {selectedIdea && !isSpinning && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-lg border border-purple-200"
          >
            <h4 className="font-semibold text-purple-800 mb-2">التحدي المختار:</h4>
            <p className="text-purple-700 mb-3">{selectedChallenge}</p>
            
            <h4 className="font-semibold text-purple-800 mb-2">الفكرة المختارة:</h4>
            <div className="bg-white p-3 rounded border">
              <p className="font-medium text-gray-800">{selectedIdea.title}</p>
              <p className="text-sm text-gray-600 mt-1">التصنيف: {selectedIdea.category}</p>
            </div>
          </motion.div>
        )}

        {/* Instructions */}
        <div className="text-center text-sm text-gray-600">
          <p>اضغط على الزر لاختيار فكرة عشوائية وتحدي جديد!</p>
        </div>
      </CardContent>
    </Card>
  )
} 