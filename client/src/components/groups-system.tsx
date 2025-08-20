"use client"

import React, { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Users, 
  UserPlus, 
  Settings, 
  MessageCircle, 
  Calendar,
  TrendingUp
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface Group {
  id: string
  name: string
  description: string
  memberCount: number
  isMember: boolean
  createdAt: string
}

interface GroupsSystemProps {
  onCreateGroup: (groupData: { name: string; description: string }) => void
  onJoinGroup: (groupId: string) => void
  onLeaveGroup: (groupId: string) => void
}

export default function GroupsSystem({ 
  onCreateGroup, 
  onJoinGroup, 
  onLeaveGroup 
}: GroupsSystemProps) {
  const [isClient, setIsClient] = useState(false)
  const [groups, setGroups] = useState<Group[]>([
    {
      id: "1",
      name: "فريق الابتكار",
      description: "مجموعة مخصصة لتطوير الأفكار الابتكارية",
      memberCount: 12,
      isMember: true,
      createdAt: "2024-01-15"
    },
    {
      id: "2", 
      name: "مطوري الحلول",
      description: "فريق متخصص في حل المشاكل التقنية",
      memberCount: 8,
      isMember: false,
      createdAt: "2024-01-10"
    },
    {
      id: "3",
      name: "المفكرون الإبداعيون", 
      description: "مجموعة للعصف الذهني والأفكار الإبداعية",
      memberCount: 15,
      isMember: true,
      createdAt: "2024-01-20"
    }
  ])
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [newGroup, setNewGroup] = useState({ name: "", description: "" })

  useEffect(() => {
    setIsClient(true)
  }, [])

  const handleCreateGroup = (e: React.FormEvent) => {
    e.preventDefault()
    if (newGroup.name && newGroup.description) {
      onCreateGroup(newGroup)
      setNewGroup({ name: "", description: "" })
      setShowCreateForm(false)
    }
  }

  const handleJoinGroup = (groupId: string) => {
    setGroups(prev => 
      prev.map(group => 
        group.id === groupId 
          ? { ...group, isMember: true, memberCount: group.memberCount + 1 }
          : group
      )
    )
    onJoinGroup(groupId)
  }

  const handleLeaveGroup = (groupId: string) => {
    setGroups(prev => 
      prev.map(group => 
        group.id === groupId 
          ? { ...group, isMember: false, memberCount: group.memberCount - 1 }
          : group
      )
    )
    onLeaveGroup(groupId)
  }

  if (!isClient) {
    return <div>جاري التحميل...</div>
  }

  return (
    <div suppressHydrationWarning>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">المجموعات</h2>
            <p className="text-gray-600">انضم إلى المجموعات أو أنشئ مجموعة جديدة</p>
          </div>
          <Button 
            onClick={() => setShowCreateForm(true)}
            className="flex items-center space-x-2 rtl:space-x-reverse"
          >
            <UserPlus className="w-4 h-4" />
            <span>إنشاء مجموعة</span>
          </Button>
        </div>

        {/* Create Group Form */}
        <AnimatePresence>
          {showCreateForm && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>إنشاء مجموعة جديدة</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleCreateGroup} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        اسم المجموعة
                      </label>
                      <input
                        type="text"
                        value={newGroup.name}
                        onChange={(e) => setNewGroup({ ...newGroup, name: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="أدخل اسم المجموعة"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        وصف المجموعة
                      </label>
                      <textarea
                        value={newGroup.description}
                        onChange={(e) => setNewGroup({ ...newGroup, description: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        rows={3}
                        placeholder="أدخل وصف المجموعة"
                        required
                      />
                    </div>
                    <div className="flex space-x-3 rtl:space-x-reverse">
                      <Button type="submit" className="flex-1">
                        إنشاء المجموعة
                      </Button>
                      <Button 
                        type="button" 
                        variant="outline"
                        onClick={() => setShowCreateForm(false)}
                        className="flex-1"
                      >
                        إلغاء
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Groups List */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {groups.map((group) => (
            <motion.div
              key={group.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="h-full">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3 rtl:space-x-reverse">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <Users className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{group.name}</CardTitle>
                        <p className="text-sm text-gray-500">
                          {group.memberCount} عضو
                        </p>
                      </div>
                    </div>
                    {group.isMember && (
                      <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                        عضو
                      </span>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">{group.description}</p>
                  
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <span>أنشئت في {group.createdAt}</span>
                    <div className="flex items-center space-x-2 rtl:space-x-reverse">
                      <MessageCircle className="w-4 h-4" />
                      <span>نشطة</span>
                    </div>
                  </div>

                  <div className="flex space-x-2 rtl:space-x-reverse">
                    {group.isMember ? (
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleLeaveGroup(group.id)}
                        className="flex-1"
                      >
                        مغادرة المجموعة
                      </Button>
                    ) : (
                      <Button 
                        size="sm"
                        onClick={() => handleJoinGroup(group.id)}
                        className="flex-1"
                      >
                        الانضمام
                      </Button>
                    )}
                    <Button variant="ghost" size="sm">
                      <Settings className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Statistics */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 rtl:space-x-reverse">
              <TrendingUp className="w-5 h-5 text-green-500" />
              <span>إحصائيات المجموعات</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">
                  {groups.length}
                </div>
                <div className="text-sm text-gray-600">إجمالي المجموعات</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">
                  {groups.filter(g => g.isMember).length}
                </div>
                <div className="text-sm text-gray-600">مجموعاتي</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">
                  {groups.reduce((sum, g) => sum + g.memberCount, 0)}
                </div>
                <div className="text-sm text-gray-600">إجمالي الأعضاء</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">
                  {groups.filter(g => g.memberCount > 10).length}
                </div>
                <div className="text-sm text-gray-600">مجموعات نشطة</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 