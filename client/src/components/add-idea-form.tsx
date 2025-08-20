"use client"

import React, { useState } from "react"
import { motion } from "framer-motion"
import { Plus, Sparkles, Tag, Send } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface AddIdeaFormProps {
  onSubmit: (idea: {
    title: string
    description: string
    category: string
    tags: string[]
  }) => void
  className?: string
}

const categories = [
  "تحسين الخدمات",
  "تطوير المنتجات",
  "تحسين العمليات",
  "التسويق والبيع",
  "التكنولوجيا",
  "الموارد البشرية",
  "التمويل",
  "أخرى"
]

export default function AddIdeaForm({ onSubmit, className }: AddIdeaFormProps) {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [category, setCategory] = useState("")
  const [tags, setTags] = useState<string[]>([])
  const [newTag, setNewTag] = useState("")
  const [isExpanded, setIsExpanded] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim() || !description.trim() || !category) return

    onSubmit({
      title: title.trim(),
      description: description.trim(),
      category,
      tags
    })

    // Reset form
    setTitle("")
    setDescription("")
    setCategory("")
    setTags([])
    setNewTag("")
    setIsExpanded(false)
  }

  const addTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()])
      setNewTag("")
    }
  }

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove))
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault()
      addTag()
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className={cn("", className)}>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 rtl:space-x-reverse">
            <Plus className="w-5 h-5 text-primary" />
            <span>أضف فكرة جديدة</span>
            <Sparkles className="w-4 h-4 text-yellow-500 sparkle" />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                عنوان الفكرة *
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="اكتب عنوان فكرتك هنا..."
                className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                وصف الفكرة *
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="اشرح فكرتك بالتفصيل..."
                rows={3}
                className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                التصنيف *
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                required
              >
                <option value="">اختر التصنيف</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                الكلمات المفتاحية
              </label>
              <div className="flex space-x-2 rtl:space-x-reverse">
                <input
                  type="text"
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="أضف كلمة مفتاحية..."
                  className="flex-1 px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
                <Button
                  type="button"
                  onClick={addTag}
                  variant="outline"
                  size="sm"
                  className="flex items-center space-x-1 rtl:space-x-reverse"
                >
                  <Tag className="w-4 h-4" />
                  <span>إضافة</span>
                </Button>
              </div>
              
              {tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center space-x-1 rtl:space-x-reverse px-2 py-1 bg-primary/10 text-primary rounded-full text-sm"
                    >
                      <span>#{tag}</span>
                      <button
                        type="button"
                        onClick={() => removeTag(tag)}
                        className="text-primary hover:text-primary/70"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>

            <div className="flex justify-end space-x-2 rtl:space-x-reverse">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsExpanded(!isExpanded)}
              >
                {isExpanded ? "إخفاء" : "عرض المزيد"}
              </Button>
              <Button
                type="submit"
                className="flex items-center space-x-2 rtl:space-x-reverse"
                disabled={!title.trim() || !description.trim() || !category}
              >
                <Send className="w-4 h-4" />
                <span>إرسال الفكرة</span>
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  )
} 