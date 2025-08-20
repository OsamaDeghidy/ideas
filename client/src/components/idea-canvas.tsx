"use client"

import React, { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { Palette, Download, RotateCcw, Sparkles, Brush, Type, Square } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface IdeaCanvasProps {
  onSave: (canvasData: string) => void
  className?: string
}

type Tool = 'brush' | 'text' | 'shape' | 'image'

export default function IdeaCanvas({ onSave, className }: IdeaCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const [currentTool, setCurrentTool] = useState<Tool>('brush')
  const [color, setColor] = useState('#3B82F6')
  const [brushSize, setBrushSize] = useState(5)
  const [text, setText] = useState('')
  const [showTextInput, setShowTextInput] = useState(false)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Set canvas size
    canvas.width = 600
    canvas.height = 400

    // Set initial background
    ctx.fillStyle = '#ffffff'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Set initial drawing style
    ctx.strokeStyle = color
    ctx.lineWidth = brushSize
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'
  }, [color, brushSize])

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (currentTool !== 'brush') return

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const rect = canvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    ctx.beginPath()
    ctx.moveTo(x, y)
    setIsDrawing(true)
  }

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing || currentTool !== 'brush') return

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const rect = canvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    ctx.lineTo(x, y)
    ctx.stroke()
  }

  const stopDrawing = () => {
    setIsDrawing(false)
  }

  const clearCanvas = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    ctx.fillStyle = '#ffffff'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
  }

  const addText = () => {
    if (currentTool !== 'text') return

    setShowTextInput(true)
  }

  const handleTextSubmit = () => {
    if (!text.trim()) return

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    ctx.font = '20px Arial'
    ctx.fillStyle = color
    ctx.fillText(text, 50, 50)
    
    setText('')
    setShowTextInput(false)
  }

  const addShape = () => {
    if (currentTool !== 'shape') return

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    ctx.fillStyle = color
    ctx.fillRect(50, 50, 100, 100)
  }

  const saveCanvas = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    const dataURL = canvas.toDataURL('image/png')
    onSave(dataURL)
  }

  const colors = [
    '#3B82F6', '#EF4444', '#10B981', '#F59E0B', 
    '#8B5CF6', '#EC4899', '#06B6D4', '#84CC16'
  ]

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2 rtl:space-x-reverse">
          <Palette className="w-5 h-5 text-purple-500" />
          <span>لوحة الأفكار</span>
          <Sparkles className="w-4 h-4 text-yellow-500" />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Tools */}
          <div className="flex items-center space-x-2 rtl:space-x-reverse mb-4">
            <Button
              variant={currentTool === 'brush' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setCurrentTool('brush')}
              className="flex items-center space-x-1 rtl:space-x-reverse"
            >
              <Brush className="w-4 h-4" />
              <span>فرشاة</span>
            </Button>
            
            <Button
              variant={currentTool === 'text' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setCurrentTool('text')}
              className="flex items-center space-x-1 rtl:space-x-reverse"
            >
              <Type className="w-4 h-4" />
              <span>نص</span>
            </Button>
            
            <Button
              variant={currentTool === 'shape' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setCurrentTool('shape')}
              className="flex items-center space-x-1 rtl:space-x-reverse"
            >
              <Square className="w-4 h-4" />
              <span>شكل</span>
            </Button>
          </div>

          {/* Color Palette */}
          <div className="flex items-center space-x-2 rtl:space-x-reverse mb-4">
            <span className="text-sm font-medium">الألوان:</span>
            {colors.map((colorOption) => (
              <button
                key={colorOption}
                onClick={() => setColor(colorOption)}
                className={`w-6 h-6 rounded-full border-2 ${
                  color === colorOption ? 'border-gray-800' : 'border-gray-300'
                }`}
                style={{ backgroundColor: colorOption }}
              />
            ))}
          </div>

          {/* Brush Size */}
          {currentTool === 'brush' && (
            <div className="flex items-center space-x-2 rtl:space-x-reverse mb-4">
              <span className="text-sm font-medium">حجم الفرشاة:</span>
              <input
                type="range"
                min="1"
                max="20"
                value={brushSize}
                onChange={(e) => setBrushSize(Number(e.target.value))}
                className="w-24"
              />
              <span className="text-sm text-gray-600">{brushSize}px</span>
            </div>
          )}

          {/* Canvas */}
          <div className="border-2 border-gray-300 rounded-lg overflow-hidden">
            <canvas
              ref={canvasRef}
              onMouseDown={startDrawing}
              onMouseMove={draw}
              onMouseUp={stopDrawing}
              onMouseLeave={stopDrawing}
              className="cursor-crosshair w-full h-64"
            />
          </div>

          {/* Text Input */}
          {showTextInput && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center space-x-2 rtl:space-x-reverse"
            >
              <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="اكتب النص هنا..."
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                onKeyPress={(e) => e.key === 'Enter' && handleTextSubmit()}
              />
              <Button onClick={handleTextSubmit} size="sm">
                إضافة
              </Button>
              <Button onClick={() => setShowTextInput(false)} variant="outline" size="sm">
                إلغاء
              </Button>
            </motion.div>
          )}

          {/* Actions */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              <Button onClick={clearCanvas} variant="outline" size="sm">
                <RotateCcw className="w-4 h-4 ml-2" />
                مسح
              </Button>
              
              {currentTool === 'text' && (
                <Button onClick={addText} size="sm">
                  <Type className="w-4 h-4 ml-2" />
                  إضافة نص
                </Button>
              )}
              
              {currentTool === 'shape' && (
                <Button onClick={addShape} size="sm">
                  <Square className="w-4 h-4 ml-2" />
                  إضافة شكل
                </Button>
              )}
            </div>
            
            <Button onClick={saveCanvas} className="bg-gradient-to-r from-purple-500 to-pink-500">
              <Download className="w-4 h-4 ml-2" />
              حفظ
            </Button>
          </div>

          {/* Instructions */}
          <div className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
            <p className="font-medium mb-1">تعليمات:</p>
            <ul className="space-y-1 text-xs">
              <li>• اختر الأداة المناسبة من الأعلى</li>
              <li>• اختر اللون المفضل</li>
              <li>• ارسم أو أضف نصوص وأشكال</li>
              <li>• احفظ عملك الإبداعي</li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  )
} 