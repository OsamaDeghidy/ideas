"use client"

import React, { useState } from "react"
import { motion } from "framer-motion"
import { Heart, MessageCircle, Share2, Star, Sparkles } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { cn, formatRelativeTime } from "@/lib/utils"

export interface Idea {
  id: string
  title: string
  description: string
  author: {
    name: string
    avatar: string
  }
  category: string
  votes: number
  comments: number
  createdAt: Date
  status: "new" | "discussing" | "evaluating" | "improving" | "finalized"
  tags: string[]
}

interface IdeaCardProps {
  idea: Idea
  onVote?: (ideaId: string) => void
  onComment?: (ideaId: string) => void
  onShare?: (ideaId: string) => void
  className?: string
}

const statusColors = {
  new: "bg-blue-100 text-blue-800",
  discussing: "bg-yellow-100 text-yellow-800",
  evaluating: "bg-purple-100 text-purple-800",
  improving: "bg-orange-100 text-orange-800",
  finalized: "bg-green-100 text-green-800",
}

const statusLabels = {
  new: "جديد",
  discussing: "قيد النقاش",
  evaluating: "قيد التقييم",
  improving: "قيد التحسين",
  finalized: "مكتمل",
}

export default function IdeaCard({ idea, onVote, onComment, onShare, className }: IdeaCardProps) {
  const [isVoted, setIsVoted] = useState(false)
  const [isLiked, setIsLiked] = useState(false)

  const handleVote = () => {
    setIsVoted(!isVoted)
    onVote?.(idea.id)
  }

  const handleLike = () => {
    setIsLiked(!isLiked)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
    >
      <Card className={cn("group hover:shadow-lg transition-all duration-300", className)}>
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-3 rtl:space-x-reverse">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                <span className="text-white font-semibold text-sm">
                  {idea.author.name.charAt(0)}
                </span>
              </div>
              <div>
                <p className="font-medium text-sm">{idea.author.name}</p>
                <p className="text-xs text-muted-foreground">
                  {formatRelativeTime(idea.createdAt)}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              <span className={cn(
                "px-2 py-1 rounded-full text-xs font-medium",
                statusColors[idea.status]
              )}>
                {statusLabels[idea.status]}
              </span>
              <Sparkles className="w-4 h-4 text-yellow-500 sparkle" />
            </div>
          </div>
        </CardHeader>

        <CardContent className="pb-4">
          <CardTitle className="text-lg mb-2 group-hover:text-primary transition-colors">
            {idea.title}
          </CardTitle>
          <CardDescription className="text-sm leading-relaxed">
            {idea.description}
          </CardDescription>
          
          <div className="flex flex-wrap gap-2 mt-4">
            {idea.tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 bg-secondary text-secondary-foreground rounded-full text-xs"
              >
                #{tag}
              </span>
            ))}
          </div>
        </CardContent>

        <CardFooter className="pt-0">
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center space-x-4 rtl:space-x-reverse">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleVote}
                className={cn(
                  "flex items-center space-x-1 rtl:space-x-reverse",
                  isVoted && "text-red-500"
                )}
              >
                <Star className={cn("w-4 h-4", isVoted && "fill-current")} />
                <span className="text-sm">{idea.votes + (isVoted ? 1 : 0)}</span>
              </Button>

              <Button
                variant="ghost"
                size="sm"
                onClick={() => onComment?.(idea.id)}
                className="flex items-center space-x-1 rtl:space-x-reverse"
              >
                <MessageCircle className="w-4 h-4" />
                <span className="text-sm">{idea.comments}</span>
              </Button>

              <Button
                variant="ghost"
                size="sm"
                onClick={handleLike}
                className={cn(
                  "flex items-center space-x-1 rtl:space-x-reverse",
                  isLiked && "text-red-500"
                )}
              >
                <Heart className={cn("w-4 h-4", isLiked && "fill-current")} />
              </Button>
            </div>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => onShare?.(idea.id)}
              className="flex items-center space-x-1 rtl:space-x-reverse"
            >
              <Share2 className="w-4 h-4" />
            </Button>
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  )
} 