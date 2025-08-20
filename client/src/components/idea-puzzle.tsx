"use client"

import React, { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Puzzle, CheckCircle, RotateCcw, Sparkles, Zap } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface IdeaPuzzleProps {
  onComplete: (time: number) => void
  className?: string
}

interface PuzzlePiece {
  id: number
  text: string
  correctPosition: number
  currentPosition: number
}

const puzzlePieces: PuzzlePiece[] = [
  { id: 1, text: "فكرة مبدئية", correctPosition: 0, currentPosition: 0 },
  { id: 2, text: "تحليل السوق", correctPosition: 1, currentPosition: 1 },
  { id: 3, text: "تطوير الحل", correctPosition: 2, currentPosition: 2 },
  { id: 4, text: "اختبار الفكرة", correctPosition: 3, currentPosition: 3 },
  { id: 5, text: "تحسين المنتج", correctPosition: 4, currentPosition: 4 },
  { id: 6, text: "إطلاق النجاح", correctPosition: 5, currentPosition: 5 }
]

export default function IdeaPuzzle({ onComplete, className }: IdeaPuzzleProps) {
  const [pieces, setPieces] = useState<PuzzlePiece[]>([])
  const [isComplete, setIsComplete] = useState(false)
  const [startTime, setStartTime] = useState<number | null>(null)
  const [elapsedTime, setElapsedTime] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)

  useEffect(() => {
    if (isPlaying && startTime) {
      const interval = setInterval(() => {
        setElapsedTime(Date.now() - startTime)
      }, 100)
      return () => clearInterval(interval)
    }
  }, [isPlaying, startTime])

  const startPuzzle = () => {
    const shuffledPieces = [...puzzlePieces].sort(() => 0.5 - Math.random())
    shuffledPieces.forEach((piece, index) => {
      piece.currentPosition = index
    })
    setPieces(shuffledPieces)
    setIsComplete(false)
    setIsPlaying(true)
    setStartTime(Date.now())
    setElapsedTime(0)
  }

  const movePiece = (fromIndex: number, toIndex: number) => {
    if (!isPlaying) return

    const newPieces = [...pieces]
    const piece = newPieces[fromIndex]
    const targetPiece = newPieces[toIndex]

    // Swap positions
    piece.currentPosition = toIndex
    targetPiece.currentPosition = fromIndex

    // Swap in array
    newPieces[fromIndex] = targetPiece
    newPieces[toIndex] = piece

    setPieces(newPieces)

    // Check if puzzle is complete
    const isComplete = newPieces.every(piece => piece.currentPosition === piece.correctPosition)
    if (isComplete) {
      setIsComplete(true)
      setIsPlaying(false)
      onComplete(elapsedTime)
    }
  }

  const formatTime = (ms: number) => {
    const seconds = Math.floor(ms / 1000)
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
  }

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2 rtl:space-x-reverse">
          <Puzzle className="w-5 h-5 text-purple-500" />
          <span>لغز الأفكار</span>
          <Sparkles className="w-4 h-4 text-yellow-500" />
        </CardTitle>
      </CardHeader>
      <CardContent>
        {pieces.length === 0 ? (
          <div className="text-center">
            <Puzzle className="w-16 h-16 text-purple-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">رتب مراحل تطوير الفكرة</h3>
            <p className="text-gray-600 mb-4">اسحب وحرك القطع لترتيبها بالترتيب الصحيح</p>
            <Button onClick={startPuzzle} className="bg-gradient-to-r from-purple-500 to-pink-500">
              <Zap className="w-4 h-4 ml-2" />
              ابدأ اللغز
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Timer */}
            <div className="text-center mb-4">
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-lg inline-block">
                <span className="font-mono text-lg">{formatTime(elapsedTime)}</span>
              </div>
            </div>

            {/* Puzzle Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              <AnimatePresence>
                {pieces.map((piece, index) => (
                  <motion.div
                    key={piece.id}
                    layout
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`
                      p-4 rounded-lg border-2 cursor-pointer transition-all duration-200
                      ${piece.currentPosition === piece.correctPosition 
                        ? 'bg-green-100 border-green-500 text-green-700' 
                        : 'bg-white border-gray-300 hover:border-purple-400'
                      }
                      ${isComplete ? 'ring-2 ring-green-500' : ''}
                    `}
                    onClick={() => {
                      if (!isComplete) {
                        // Find next empty position or swap with adjacent
                        const nextIndex = (index + 1) % pieces.length
                        movePiece(index, nextIndex)
                      }
                    }}
                  >
                    <div className="text-center">
                      <div className="text-sm font-medium">{piece.text}</div>
                      {piece.currentPosition === piece.correctPosition && (
                        <CheckCircle className="w-4 h-4 text-green-600 mx-auto mt-1" />
                      )}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Controls */}
            <div className="flex justify-center space-x-4 rtl:space-x-reverse mt-6">
              <Button
                onClick={startPuzzle}
                variant="outline"
                size="sm"
                className="flex items-center space-x-2 rtl:space-x-reverse"
              >
                <RotateCcw className="w-4 h-4" />
                <span>إعادة تشغيل</span>
              </Button>
            </div>

            {/* Completion Message */}
            {isComplete && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border border-green-200 text-center"
              >
                <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <h4 className="font-semibold text-green-800 mb-1">أحسنت! 🎉</h4>
                <p className="text-green-700">لقد أكملت اللغز في {formatTime(elapsedTime)}</p>
                <p className="text-sm text-green-600 mt-1">+50 نقطة للسرعة!</p>
              </motion.div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
} 