"use client"

import React, { useState } from "react"
import { motion } from "framer-motion"
import { Sword, Shield, Trophy, Users, TrendingUp, Zap, Clock } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Idea } from "@/components/idea-card"

interface IdeaBattleProps {
  ideas: Idea[]
  onVote: (winnerId: string, loserId: string) => void
  className?: string
}

interface Battle {
  id: string
  idea1: Idea
  idea2: Idea
  votes1: number
  votes2: number
  totalVotes: number
  isActive: boolean
  endTime: Date
}

export default function IdeaBattle({ ideas, onVote, className }: IdeaBattleProps) {
  const [currentBattle, setCurrentBattle] = useState<Battle | null>(null)
  const [userVote, setUserVote] = useState<string | null>(null)
  const [battleHistory, setBattleHistory] = useState<Battle[]>([])

  React.useEffect(() => {
    if (ideas.length >= 2 && !currentBattle) {
      startNewBattle()
    }
  }, [ideas])

  const startNewBattle = () => {
    const shuffled = [...ideas].sort(() => 0.5 - Math.random())
    const battle: Battle = {
      id: `battle-${Date.now()}`,
      idea1: shuffled[0],
      idea2: shuffled[1],
      votes1: Math.floor(Math.random() * 20) + 10,
      votes2: Math.floor(Math.random() * 20) + 10,
      totalVotes: 0,
      isActive: true,
      endTime: new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 hours
    }
    battle.totalVotes = battle.votes1 + battle.votes2
    setCurrentBattle(battle)
    setUserVote(null)
  }

  const handleVote = (votedFor: string) => {
    if (!currentBattle || userVote) return

    setUserVote(votedFor)
    const updatedBattle = { ...currentBattle }
    
    if (votedFor === currentBattle.idea1.id) {
      updatedBattle.votes1++
    } else {
      updatedBattle.votes2++
    }
    updatedBattle.totalVotes++
    
    setCurrentBattle(updatedBattle)
    onVote(votedFor, votedFor === currentBattle.idea1.id ? currentBattle.idea2.id : currentBattle.idea1.id)
  }

  const endBattle = () => {
    if (!currentBattle) return
    
    const winner = currentBattle.votes1 > currentBattle.votes2 ? currentBattle.idea1 : currentBattle.idea2
    const loser = currentBattle.votes1 > currentBattle.votes2 ? currentBattle.idea2 : currentBattle.idea1
    
    setBattleHistory(prev => [...prev, { ...currentBattle, isActive: false }])
    setCurrentBattle(null)
    setUserVote(null)
  }

  const formatTimeLeft = (endTime: Date) => {
    const now = new Date()
    const diff = endTime.getTime() - now.getTime()
    const hours = Math.floor(diff / (1000 * 60 * 60))
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
    
    if (hours > 0) return `${hours} ساعة ${minutes} دقيقة`
    return `${minutes} دقيقة`
  }

  if (!currentBattle) {
    return (
      <Card className="text-center p-8">
        <CardContent>
          <Sword className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">معركة الأفكار</h3>
          <p className="text-gray-600">تحتاج على الأقل فكرتين للبدء</p>
          {battleHistory.length > 0 && (
            <Button onClick={startNewBattle} className="mt-4">
              معركة جديدة
            </Button>
          )}
        </CardContent>
      </Card>
    )
  }

  const { idea1, idea2, votes1, votes2, totalVotes, endTime } = currentBattle
  const percentage1 = totalVotes > 0 ? (votes1 / totalVotes) * 100 : 0
  const percentage2 = totalVotes > 0 ? (votes2 / totalVotes) * 100 : 0

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2 rtl:space-x-reverse">
          <Sword className="w-5 h-5 text-red-500" />
          <span>معركة الأفكار</span>
          <Trophy className="w-4 h-4 text-yellow-500" />
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* Battle Timer */}
        <div className="text-center mb-6">
          <div className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-4 py-2 rounded-lg inline-block">
            <Clock className="w-4 h-4 inline ml-2" />
            ينتهي في: {formatTimeLeft(endTime)}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Idea 1 */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            className="relative"
          >
            <Card className={`h-full transition-all duration-300 ${
              userVote === idea1.id ? 'ring-2 ring-green-500 shadow-lg' : ''
            }`}>
              <CardContent className="p-6">
                <div className="text-center mb-4">
                  <div className="w-16 h-16 bg-gradient-to-r from-red-400 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Shield className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{idea1.title}</h3>
                  <p className="text-sm text-gray-600 mb-4">{idea1.description}</p>
                </div>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center justify-between text-sm">
                    <span>بواسطة {idea1.author.name}</span>
                    <span className="text-gray-500">{idea1.votes} تصويت</span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {idea1.tags.slice(0, 2).map((tag, index) => (
                      <span key={index} className="px-2 py-1 bg-red-100 text-red-700 text-xs rounded-full">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="flex justify-between text-xs text-gray-500 mb-1">
                    <span>التصويت</span>
                    <span>{Math.round(percentage1)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <motion.div
                      className="bg-gradient-to-r from-red-500 to-pink-500 h-2 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${percentage1}%` }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                </div>

                <Button
                  onClick={() => handleVote(idea1.id)}
                  disabled={!!userVote}
                  className="w-full bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600"
                >
                  <Shield className="w-4 h-4 ml-2" />
                  صوت لهذا! 🛡️
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          {/* VS */}
          <div className="flex items-center justify-center">
            <div className="text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-2">
                <Sword className="w-6 h-6 text-white" />
              </div>
              <p className="text-sm text-gray-500">VS</p>
              <div className="text-xs text-gray-400 mt-1">
                <Users className="w-4 h-4 inline ml-1" />
                {totalVotes} تصويت
              </div>
            </div>
          </div>

          {/* Idea 2 */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            className="relative"
          >
            <Card className={`h-full transition-all duration-300 ${
              userVote === idea2.id ? 'ring-2 ring-green-500 shadow-lg' : ''
            }`}>
              <CardContent className="p-6">
                <div className="text-center mb-4">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Sword className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{idea2.title}</h3>
                  <p className="text-sm text-gray-600 mb-4">{idea2.description}</p>
                </div>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center justify-between text-sm">
                    <span>بواسطة {idea2.author.name}</span>
                    <span className="text-gray-500">{idea2.votes} تصويت</span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {idea2.tags.slice(0, 2).map((tag, index) => (
                      <span key={index} className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="flex justify-between text-xs text-gray-500 mb-1">
                    <span>التصويت</span>
                    <span>{Math.round(percentage2)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <motion.div
                      className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${percentage2}%` }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                </div>

                <Button
                  onClick={() => handleVote(idea2.id)}
                  disabled={!!userVote}
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
                >
                  <Sword className="w-4 h-4 ml-2" />
                  صوت لهذا! ⚔️
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Battle Stats */}
        <div className="mt-6 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-200">
          <h4 className="font-semibold text-center mb-3">إحصائيات المعركة</h4>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-red-600">{votes1}</div>
              <div className="text-sm text-gray-600">تصويت</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-purple-600">{totalVotes}</div>
              <div className="text-sm text-gray-600">إجمالي</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-600">{votes2}</div>
              <div className="text-sm text-gray-600">تصويت</div>
            </div>
          </div>
        </div>

        {userVote && (
          <div className="text-center mt-4">
            <Button onClick={endBattle} variant="outline" size="sm">
              إنهاء المعركة
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
} 