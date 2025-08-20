import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("ar-EG", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date)
}

export function formatRelativeTime(date: Date): string {
  const now = new Date()
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000)

  if (diffInSeconds < 60) return "الآن"
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} دقيقة`
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} ساعة`
  if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 86400)} يوم`
  
  return formatDate(date)
}

export function generateId(): string {
  return Math.random().toString(36).substr(2, 9)
} 