"use client"

import React, { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  MessageCircle, 
  Reply, 
  Send, 
  Sparkles,
  ThumbsUp,
  ThumbsDown
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { cn, formatRelativeTime, generateId } from "@/lib/utils"

interface Comment {
  id: string
  content: string
  author: {
    name: string
    avatar: string
  }
  createdAt: Date
  likes: number
  dislikes: number
  replies: Comment[]
  isLiked?: boolean
  isDisliked?: boolean
}

interface CommentsSectionProps {
  ideaId: string
  comments: Comment[]
  onAddComment?: (content: string) => void
  onLikeComment?: (commentId: string) => void
  onDislikeComment?: (commentId: string) => void
  onReplyToComment?: (commentId: string, content: string) => void
  className?: string
}

const sampleComments: Comment[] = [
  {
    id: "1",
    content: "فكرة ممتازة! أعتقد أن هذا سيساعد كثيراً في تحسين الكفاءة",
    author: { name: "أحمد محمد", avatar: "" },
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
    likes: 5,
    dislikes: 0,
    replies: []
  },
  {
    id: "2",
    content: "كيف يمكن تطبيق هذه الفكرة عملياً؟",
    author: { name: "سارة أحمد", avatar: "" },
    createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000),
    likes: 3,
    dislikes: 1,
    replies: [
      {
        id: "2-1",
        content: "يمكن البدء بتجربة محدودة في قسم واحد",
        author: { name: "محمد علي", avatar: "" },
        createdAt: new Date(Date.now() - 1 * 60 * 60 * 1000),
        likes: 2,
        dislikes: 0,
        replies: []
      }
    ]
  },
  {
    id: "3",
    content: "أقترح إضافة ميزة إضافية للتحليل المتقدم",
    author: { name: "فاطمة حسن", avatar: "" },
    createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000),
    likes: 7,
    dislikes: 0,
    replies: []
  }
]

export default function CommentsSection({ 
  comments = sampleComments, 
  onAddComment, 
  onLikeComment, 
  onDislikeComment, 
  onReplyToComment,
  className 
}: CommentsSectionProps) {
  const [localComments, setLocalComments] = useState<Comment[]>(comments)
  const [newComment, setNewComment] = useState("")
  const [replyingTo, setReplyingTo] = useState<string | null>(null)
  const [replyContent, setReplyContent] = useState("")
  const [isClient, setIsClient] = useState(false)

  // Handle client-side rendering
  useEffect(() => {
    setIsClient(true)
  }, [])

  const handleAddComment = () => {
    if (!newComment.trim()) return

    const comment: Comment = {
      id: generateId(),
      content: newComment.trim(),
      author: { name: "أسامة بدندي", avatar: "" },
      createdAt: new Date(),
      likes: 0,
      dislikes: 0,
      replies: []
    }

    setLocalComments([comment, ...localComments])
    setNewComment("")
    onAddComment?.(newComment.trim())
  }

  const handleLikeComment = (commentId: string) => {
    setLocalComments(prev => 
      prev.map(comment => {
        if (comment.id === commentId) {
          const isLiked = comment.isLiked
          return {
            ...comment,
            likes: isLiked ? comment.likes - 1 : comment.likes + 1,
            isLiked: !isLiked,
            isDisliked: false
          }
        }
        return comment
      })
    )
    onLikeComment?.(commentId)
  }

  const handleDislikeComment = (commentId: string) => {
    setLocalComments(prev => 
      prev.map(comment => {
        if (comment.id === commentId) {
          const isDisliked = comment.isDisliked
          return {
            ...comment,
            dislikes: isDisliked ? comment.dislikes - 1 : comment.dislikes + 1,
            isDisliked: !isDisliked,
            isLiked: false
          }
        }
        return comment
      })
    )
    onDislikeComment?.(commentId)
  }

  const handleReply = (commentId: string) => {
    if (!replyContent.trim()) return

    const reply: Comment = {
      id: generateId(),
      content: replyContent.trim(),
      author: { name: "أسامة بدندي", avatar: "" },
      createdAt: new Date(),
      likes: 0,
      dislikes: 0,
      replies: []
    }

    setLocalComments(prev => 
      prev.map(comment => {
        if (comment.id === commentId) {
          return {
            ...comment,
            replies: [...comment.replies, reply]
          }
        }
        return comment
      })
    )

    setReplyContent("")
    setReplyingTo(null)
    onReplyToComment?.(commentId, replyContent.trim())
  }

  const renderComment = (comment: Comment, isReply = false) => (
    <motion.div
      key={comment.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className={cn(
        "p-4 rounded-lg border transition-all duration-200",
        isReply ? "bg-gray-50 border-gray-200 mr-4" : "bg-white border-gray-200"
      )}
    >
      <div className="flex items-start space-x-3 rtl:space-x-reverse">
        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
          <span className="text-white font-semibold text-xs">
            {comment.author.name.charAt(0)}
          </span>
        </div>
        
        <div className="flex-1">
          <div className="flex items-center space-x-2 rtl:space-x-reverse mb-1">
            <span className="font-medium text-sm">{comment.author.name}</span>
            <span className="text-xs text-gray-500">
              {formatRelativeTime(comment.createdAt)}
            </span>
          </div>
          
          <p className="text-sm text-gray-700 mb-3">{comment.content}</p>
          
          <div className="flex items-center space-x-4 rtl:space-x-reverse">
            <button
              onClick={() => handleLikeComment(comment.id)}
              className={cn(
                "flex items-center space-x-1 rtl:space-x-reverse text-xs text-gray-500 hover:text-blue-500 transition-colors",
                comment.isLiked && "text-blue-500"
              )}
            >
              <ThumbsUp className="w-3 h-3" />
              <span>{comment.likes}</span>
            </button>
            
            <button
              onClick={() => handleDislikeComment(comment.id)}
              className={cn(
                "flex items-center space-x-1 rtl:space-x-reverse text-xs text-gray-500 hover:text-red-500 transition-colors",
                comment.isDisliked && "text-red-500"
              )}
            >
              <ThumbsDown className="w-3 h-3" />
              <span>{comment.dislikes}</span>
            </button>
            
            {!isReply && (
              <button
                onClick={() => setReplyingTo(replyingTo === comment.id ? null : comment.id)}
                className="flex items-center space-x-1 rtl:space-x-reverse text-xs text-gray-500 hover:text-green-500 transition-colors"
              >
                <Reply className="w-3 h-3" />
                <span>رد</span>
              </button>
            )}
          </div>
          
          {/* Reply Form */}
          {replyingTo === comment.id && !isReply && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-3 p-3 bg-gray-50 rounded-lg"
            >
              <textarea
                value={replyContent}
                onChange={(e) => setReplyContent(e.target.value)}
                placeholder="اكتب ردك..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none text-sm"
                rows={2}
              />
              <div className="flex items-center justify-end space-x-2 rtl:space-x-reverse mt-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setReplyingTo(null)}
                >
                  إلغاء
                </Button>
                <Button
                  size="sm"
                  onClick={() => handleReply(comment.id)}
                  disabled={!replyContent.trim()}
                >
                  <Send className="w-3 h-3 ml-1" />
                  إرسال
                </Button>
              </div>
            </motion.div>
          )}
          
          {/* Replies */}
          {comment.replies.length > 0 && (
            <div className="mt-3 space-y-2">
              {comment.replies.map(reply => renderComment(reply, true))}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  )

  // Don't render until client-side
  if (!isClient) {
    return (
      <Card className={cn("", className)}>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 rtl:space-x-reverse">
            <MessageCircle className="w-5 h-5 text-blue-500" />
            <span>التعليقات</span>
            <Sparkles className="w-4 h-4 text-yellow-500 sparkle" />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <div className="w-8 h-8 border-2 border-gray-300 border-t-primary rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-500">جاري التحميل...</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className={cn("", className)}>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2 rtl:space-x-reverse">
          <MessageCircle className="w-5 h-5 text-blue-500" />
          <span>التعليقات</span>
          <Sparkles className="w-4 h-4 text-yellow-500 sparkle" />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4" suppressHydrationWarning>
          {/* Add Comment Form */}
          <div className="flex space-x-2 rtl:space-x-reverse">
            <input
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="اكتب تعليقك هنا..."
              className="flex-1 px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
            <Button
              onClick={handleAddComment}
              disabled={!newComment.trim()}
              className="flex items-center space-x-1 rtl:space-x-reverse"
            >
              <Send className="w-4 h-4" />
              <span>إرسال</span>
            </Button>
          </div>

          {/* Comments List */}
          <AnimatePresence>
            {localComments.map(comment => renderComment(comment))}
          </AnimatePresence>

          {localComments.length === 0 && (
            <div className="text-center py-8">
              <MessageCircle className="w-12 h-12 text-gray-400 mx-auto mb-3" />
              <p className="text-gray-500">لا توجد تعليقات بعد. كن أول من يعلق!</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
} 