"use client"

import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { GalleryVertical, Heart, Share2, Download, Eye, Sparkles } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface GalleryItem {
  id: string
  title: string
  author: string
  image: string
  likes: number
  views: number
  category: string
  description: string
}

interface IdeaGalleryProps {
  items?: GalleryItem[]
  onLike: (itemId: string) => void
  onShare: (itemId: string) => void
  onDownload: (itemId: string) => void
  className?: string
}

const sampleGalleryItems: GalleryItem[] = [
  {
    id: "1",
    title: "تصميم تطبيق المطاعم",
    author: "أحمد محمد",
    image: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDMwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxjaXJjbGUgY3g9IjE1MCIgY3k9IjEwMCIgcj0iNDAiIGZpbGw9IiM2NjNFRUEiLz4KPHN2ZyB4PSIxMzAiIHk9IjgwIiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0id2hpdGUiPgo8cGF0aCBkPSJNMTIgMkM2LjQ4IDIgMiA2LjQ4IDIgMTJzNC40OCAxMCAxMCAxMCAxMC00LjQ4IDEwLTEwUzE3LjUyIDIgMTIgMnptMCAxOGMtNC40MSAwLTgtMy41OS04LThzMy41OS04IDgtOCA4IDMuNTkgOCA4LTMuNTkgOC04IDh6Ii8+CjxwYXRoIGQ9Ik0xMiA2Yy0zLjMxIDAtNiAyLjY5LTYgNnMyLjY5IDYgNiA2IDYtMi42OSA2LTYtMi42OS02LTYtNnptMCAxMGMtMi4yMSAwLTQtMS43OS00LTRzMS43OS00IDQtNCA0IDEuNzkgNCA0LTEuNzkgNC00IDR6Ii8+Cjwvc3ZnPgo8L3N2Zz4K",
    likes: 24,
    views: 156,
    category: "تصميم",
    description: "تصميم تطبيق طلب الطعام مع واجهة مستخدم حديثة"
  },
  {
    id: "2",
    title: "مخطط تطوير المنتج",
    author: "سارة أحمد",
    image: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDMwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRkY2QjM5Ii8+CjxyZWN0IHg9IjUwIiB5PSI1MCIgd2lkdGg9IjIwMCIgaGVpZ2h0PSIxMDAiIGZpbGw9IndoaXRlIiByeD0iMTAiLz4KPHN2ZyB4PSI2MCIgeT0iNzAiIHdpZHRoPSIxODAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0iIzM4M0E0QSI+CjxwYXRoIGQ9Ik0xOSAzSDF2MThoMThWM3ptMCAxNkgyVjRoMTR2MTV6Ii8+CjxwYXRoIGQ9Ik03IDdoMTB2Mkg3eiIvPgo8cGF0aCBkPSJNNyAxMGgxMHYySDd6Ii8+CjxwYXRoIGQ9Ik03IDEzaDEwdjJIN3oiLz4KPC9zdmc+Cjwvc3ZnPgo=",
    likes: 18,
    views: 89,
    category: "تخطيط",
    description: "مخطط تفصيلي لمراحل تطوير المنتج الجديد"
  },
  {
    id: "3",
    title: "رسم تخطيطي للفكرة",
    author: "محمد علي",
    image: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDMwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRjNDRjVGIi8+CjxjaXJjbGUgY3g9IjEwMCIgY3k9IjEwMCIgcj0iMzAiIGZpbGw9IiM4QjVDNkYiLz4KPGNpcmNsZSBjeD0iMjAwIiBjeT0iMTAwIiByPSIzMCIgZmlsbD0iIzM4M0E0QSIvPgo8bGluZSB4MT0iMTMwIiB5MT0iMTAwIiB4Mj0iMTcwIiB5Mj0iMTAwIiBzdHJva2U9IiM2QzcyODAiIHN0cm9rZS13aWR0aD0iMyIvPgo8L3N2Zz4K",
    likes: 31,
    views: 203,
    category: "رسم",
    description: "رسم تخطيطي يوضح فكرة المشروع الجديد"
  }
]

export default function IdeaGallery({ 
  items = sampleGalleryItems, 
  onLike, 
  onShare, 
  onDownload, 
  className 
}: IdeaGalleryProps) {
  const [_selectedItem, _setSelectedItem] = useState<GalleryItem | null>(null)
  const [filter, setFilter] = useState("all")

  const filteredItems = filter === "all" 
    ? items 
    : items.filter(item => item.category === filter)

  const categories = ["all", ...new Set(items.map(item => item.category))]

  return (
    <Card className={className}>
      <CardHeader>
                 <CardTitle className="flex items-center space-x-2 rtl:space-x-reverse">
           <GalleryVertical className="w-5 h-5 text-purple-500" />
           <span>معرض الأفكار</span>
           <Sparkles className="w-4 h-4 text-yellow-500" />
         </CardTitle>
      </CardHeader>
      <CardContent>
        {/* Filter */}
        <div className="flex items-center space-x-2 rtl:space-x-reverse mb-6">
          <span className="text-sm font-medium">التصنيف:</span>
          {categories.map((category) => (
            <Button
              key={category}
              variant={filter === category ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter(category)}
            >
              {category === "all" ? "الكل" : category}
            </Button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: index * 0.1 }}
                className="group"
              >
                <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer">
                  <div className="relative">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-48 object-cover"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                      <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 flex space-x-2 rtl:space-x-reverse">
                        <Button
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation()
                            onLike(item.id)
                          }}
                          className="bg-white text-gray-800 hover:bg-gray-100"
                        >
                          <Heart className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation()
                            onShare(item.id)
                          }}
                          className="bg-white text-gray-800 hover:bg-gray-100"
                        >
                          <Share2 className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation()
                            onDownload(item.id)
                          }}
                          className="bg-white text-gray-800 hover:bg-gray-100"
                        >
                          <Download className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold text-sm">{item.title}</h3>
                      <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                        {item.category}
                      </span>
                    </div>
                    <p className="text-xs text-gray-600 mb-3">{item.description}</p>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>بواسطة {item.author}</span>
                      <div className="flex items-center space-x-2 rtl:space-x-reverse">
                        <div className="flex items-center space-x-1 rtl:space-x-reverse">
                          <Heart className="w-3 h-3" />
                          <span>{item.likes}</span>
                        </div>
                        <div className="flex items-center space-x-1 rtl:space-x-reverse">
                          <Eye className="w-3 h-3" />
                          <span>{item.views}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Stats */}
        <div className="mt-6 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-200">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-purple-600">{items.length}</div>
              <div className="text-sm text-gray-600">إجمالي الأعمال</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-pink-600">
                {items.reduce((sum, item) => sum + item.likes, 0)}
              </div>
              <div className="text-sm text-gray-600">إجمالي الإعجابات</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-600">
                {items.reduce((sum, item) => sum + item.views, 0)}
              </div>
              <div className="text-sm text-gray-600">إجمالي المشاهدات</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
} 