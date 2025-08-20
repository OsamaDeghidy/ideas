"use client"

import React, { useState } from "react"
import { motion } from "framer-motion"
import { Dice1, Dice2, Dice3, Dice4, Dice5, Dice6, Sparkles, Zap } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface IdeaDiceProps {
  onChallenge: (challenge: string) => void
  className?: string
}

const challenges = [
  "حسّن هذه الفكرة وأضف 3 اقتراحات جديدة",
  "فكر في التطبيق العملي والموارد المطلوبة",
  "اقترح حلول للمشاكل المحتملة",
  "كيف يمكن تسويق هذه الفكرة؟",
  "ما هي البدائل الممكنة؟",
  "كيف يمكن تطوير هذه الفكرة؟",
  "فكر في التأثير الاجتماعي",
  "ما هي المخاطر والتحديات؟",
  "كيف يمكن قياس النجاح؟",
  "ما هي الخطوات التالية؟",
  "فكر في التكامل مع أنظمة أخرى",
  "كيف يمكن تحسين تجربة المستخدم؟"
]

const diceIcons = [Dice1, Dice2, Dice3, Dice4, Dice5, Dice6]

export default function IdeaDice({ onChallenge, className }: IdeaDiceProps) {
  const [isRolling, setIsRolling] = useState(false)
  const [currentChallenge, setCurrentChallenge] = useState<string>("")
  const [diceValue, setDiceValue] = useState(1)
  const [showResult, setShowResult] = useState(false)

  const rollDice = () => {
    if (isRolling) return

    setIsRolling(true)
    setShowResult(false)
    
    // Animate dice rolling
    const rollInterval = setInterval(() => {
      setDiceValue(Math.floor(Math.random() * 6) + 1)
    }, 100)

    setTimeout(() => {
      clearInterval(rollInterval)
      const randomChallenge = challenges[Math.floor(Math.random() * challenges.length)]
      setCurrentChallenge(randomChallenge)
      setIsRolling(false)
      setShowResult(true)
      onChallenge(randomChallenge)
    }, 2000)
  }

  const DiceIcon = diceIcons[diceValue - 1]

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2 rtl:space-x-reverse">
          <Dice1 className="w-5 h-5 text-purple-500" />
          <span>نرد الأفكار</span>
          <Sparkles className="w-4 h-4 text-yellow-500" />
        </CardTitle>
      </CardHeader>
      <CardContent className="text-center">
        {/* Dice */}
        <motion.div
          animate={isRolling ? { rotate: [0, 360, 720, 1080] } : {}}
          transition={{ duration: 2, ease: "easeInOut" }}
          className="mb-6"
        >
          <div className="w-24 h-24 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mx-auto shadow-lg">
            <DiceIcon className="w-12 h-12 text-white" />
          </div>
        </motion.div>

        {/* Roll Button */}
        <Button
          onClick={rollDice}
          disabled={isRolling}
          size="lg"
          className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 mb-6"
        >
          <Zap className="w-5 h-5 ml-2" />
          {isRolling ? "يدور النرد..." : "دور النرد"}
        </Button>

        {/* Challenge Result */}
        {showResult && currentChallenge && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200"
          >
            <h4 className="font-semibold text-blue-800 mb-2">التحدي الجديد:</h4>
            <p className="text-blue-700">{currentChallenge}</p>
          </motion.div>
        )}

        {/* Instructions */}
        <div className="mt-6 text-sm text-gray-600">
          <p>اضغط على النرد للحصول على تحدي عشوائي</p>
          <p className="mt-1">كل تحدي يضيف نقاط إضافية!</p>
        </div>
      </CardContent>
    </Card>
  )
} 