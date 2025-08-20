"use client"

import React from "react"
import { motion } from "framer-motion"
import { Trophy, Medal, Award, Crown, TrendingUp, Sparkles } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

export interface LeaderboardUser {
  id: string
  name: string
  avatar: string
  points: number
  ideas: number
  votes: number
  rank: number
  badge: "gold" | "silver" | "bronze" | "rising"
}

interface LeaderboardProps {
  users: LeaderboardUser[]
  title?: string
  className?: string
}

const getBadgeIcon = (badge: string) => {
  switch (badge) {
    case "gold":
      return <Crown className="w-5 h-5 text-yellow-500" />
    case "silver":
      return <Trophy className="w-5 h-5 text-gray-400" />
    case "bronze":
      return <Medal className="w-5 h-5 text-orange-500" />
    case "rising":
      return <TrendingUp className="w-5 h-5 text-green-500" />
    default:
      return <Award className="w-5 h-5 text-blue-500" />
  }
}

const getRankColor = (rank: number) => {
  if (rank === 1) return "bg-gradient-to-r from-yellow-400 to-yellow-600"
  if (rank === 2) return "bg-gradient-to-r from-gray-300 to-gray-500"
  if (rank === 3) return "bg-gradient-to-r from-orange-400 to-orange-600"
  return "bg-gradient-to-r from-blue-400 to-blue-600"
}

export default function Leaderboard({ users, title = "لوحة المتصدرين", className }: LeaderboardProps) {
  return (
    <Card className={cn("", className)}>
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center space-x-2 rtl:space-x-reverse">
          <Trophy className="w-6 h-6 text-yellow-500" />
          <span>{title}</span>
          <Sparkles className="w-5 h-5 text-purple-500 sparkle" />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {users.map((user, index) => (
            <motion.div
              key={user.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className={cn(
                "flex items-center justify-between p-3 rounded-lg transition-all duration-200 hover:shadow-md",
                index < 3 ? "bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200" : "bg-secondary/50"
              )}
            >
              <div className="flex items-center space-x-3 rtl:space-x-reverse">
                <div className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm",
                  getRankColor(user.rank)
                )}>
                  {user.rank}
                </div>
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                  <span className="text-white font-semibold text-sm">
                    {user.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="font-medium text-sm">{user.name}</p>
                  <div className="flex items-center space-x-2 rtl:space-x-reverse text-xs text-muted-foreground">
                    <span>{user.ideas} فكرة</span>
                    <span>•</span>
                    <span>{user.votes} تصويت</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-2 rtl:space-x-reverse">
                <div className="text-right">
                  <p className="font-bold text-lg">{user.points}</p>
                  <p className="text-xs text-muted-foreground">نقطة</p>
                </div>
                {getBadgeIcon(user.badge)}
              </div>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
} 