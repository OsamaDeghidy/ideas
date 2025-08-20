"use client"

import React, { useState } from "react"
import { motion } from "framer-motion"
import { Flame, Heart, TrendingUp, Zap } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Idea } from "@/components/idea-card"

interface HotOrNotProps {
  ideas: Idea[]
  onVote: (winnerId: string, loserId: string) => void
  className?: string
}

export default function HotOrNot({ ideas, onVote, className }: HotOrNotProps) {
  const [currentPair, setCurrentPair] = useState<[Idea, Idea] | null>(null)
  const [voted, setVoted] = useState(false)
  const [stats, setStats] = useState({ totalVotes: 0, idea1Votes: 0, idea2Votes: 0 })

  React.useEffect(() => {
    if (ideas.length >= 2) {
      const randomIdeas = getRandomPair(ideas)
      setCurrentPair(randomIdeas)
      setVoted(false)
      setStats({ totalVotes: 0, idea1Votes: 0, idea2Votes: 0 })
    }
  }, [ideas])

  const getRandomPair = (ideas: Idea[]): [Idea, Idea] => {
    const shuffled = [...ideas].sort(() => 0.5 - Math.random())
    return [shuffled[0], shuffled[1]]
  }

  const handleVote = (winner: Idea, loser: Idea) => {
    setVoted(true)
    const newStats = {
      totalVotes: stats.totalVotes + 1,
      idea1Votes: winner.id === currentPair![0].id ? stats.idea1Votes + 1 : stats.idea1Votes,
      idea2Votes: winner.id === currentPair![1].id ? stats.idea2Votes + 1 : stats.idea2Votes
    }
    setStats(newStats)
    onVote(winner.id, loser.id)
  }

  const nextPair = () => {
    if (ideas.length >= 2) {
      const randomIdeas = getRandomPair(ideas)
      setCurrentPair(randomIdeas)
      setVoted(false)
      setStats({ totalVotes: 0, idea1Votes: 0, idea2Votes: 0 })
    }
  }

  if (!currentPair) {
    return (
      <Card className="text-center p-8">
        <CardContent>
          <Flame className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">Hot or Not</h3>
          <p className="text-gray-600">تحتاج على الأقل فكرتين للبدء</p>
        </CardContent>
      </Card>
    )
  }

  const [idea1, idea2] = currentPair

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2 rtl:space-x-reverse">
          <Flame className="w-5 h-5 text-red-500" />
          <span>Hot or Not</span>
          <Zap className="w-4 h-4 text-yellow-500" />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Idea 1 */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            className="relative"
          >
            <Card className="h-full hover:shadow-lg transition-all duration-300 cursor-pointer">
              <CardContent className="p-6">
                <div className="text-center mb-4">
                  <div className="w-16 h-16 bg-gradient-to-r from-red-400 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Flame className="w-8 h-8 text-white" />
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

                <Button
                  onClick={() => handleVote(idea1, idea2)}
                  disabled={voted}
                  className="w-full bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600"
                >
                  <Heart className="w-4 h-4 ml-2" />
                  HOT! 🔥
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          {/* VS */}
          <div className="flex items-center justify-center">
            <div className="text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-white font-bold text-lg">VS</span>
              </div>
              <p className="text-sm text-gray-500">أيه أحسن؟</p>
            </div>
          </div>

          {/* Idea 2 */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            className="relative"
          >
            <Card className="h-full hover:shadow-lg transition-all duration-300 cursor-pointer">
              <CardContent className="p-6">
                <div className="text-center mb-4">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-3">
                    <TrendingUp className="w-8 h-8 text-white" />
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

                <Button
                  onClick={() => handleVote(idea2, idea1)}
                  disabled={voted}
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
                >
                  <TrendingUp className="w-4 h-4 ml-2" />
                  NOT! ❄️
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Results */}
        {voted && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-200"
          >
            <h4 className="font-semibold text-center mb-3">نتائج التصويت</h4>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-red-600">
                  {Math.round((stats.idea1Votes / stats.totalVotes) * 100)}%
                </div>
                <div className="text-sm text-gray-600">{idea1.title}</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">
                  {Math.round((stats.idea2Votes / stats.totalVotes) * 100)}%
                </div>
                <div className="text-sm text-gray-600">{idea2.title}</div>
              </div>
            </div>
            <div className="text-center mt-3">
              <Button onClick={nextPair} variant="outline" size="sm">
                فكرتين جديدتين
              </Button>
            </div>
          </motion.div>
        )}
      </CardContent>
    </Card>
  )
} 