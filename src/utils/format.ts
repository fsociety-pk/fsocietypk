import { formatDistanceToNow, format, parseISO } from 'date-fns'

// ── Date ──────────────────────────────────────────────────────────
export const timeAgo = (date: string | Date): string =>
  formatDistanceToNow(typeof date === 'string' ? parseISO(date) : date, { addSuffix: true })

export const formatDate = (date: string | Date, pattern = 'MMM d, yyyy'): string =>
  format(typeof date === 'string' ? parseISO(date) : date, pattern)

export const formatDateTime = (date: string | Date): string =>
  format(typeof date === 'string' ? parseISO(date) : date, 'MMM d, yyyy · HH:mm')

// ── Numbers ───────────────────────────────────────────────────────
export const formatPoints = (points: number): string => {
  if (points >= 1000) return `${(points / 1000).toFixed(1)}k`
  return points.toString()
}

export const formatRank = (rank: number): string => {
  const suffix = ['th', 'st', 'nd', 'rd']
  const v = rank % 100
  return rank + (suffix[(v - 20) % 10] || suffix[v] || suffix[0])
}

// ── File size ─────────────────────────────────────────────────────
export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 B'
  const k = 1024
  const sizes = ['B', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`
}

// ── Strings ───────────────────────────────────────────────────────
export const truncate = (str: string, maxLen: number): string =>
  str.length > maxLen ? `${str.slice(0, maxLen)}…` : str

export const capitalize = (str: string): string =>
  str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()

// ── Challenge helpers ─────────────────────────────────────────────
export const getDifficultyColor = (difficulty: string): string => {
  const map: Record<string, string> = {
    easy: 'text-difficulty-easy',
    medium: 'text-difficulty-medium',
    hard: 'text-difficulty-hard',
    insane: 'text-difficulty-insane',
  }
  return map[difficulty.toLowerCase()] ?? 'text-text-secondary'
}

export const getCategoryIcon = (category: string): string => {
  const map: Record<string, string> = {
    web: 'WEB',
    pwn: 'PWN',
    rev: 'REV',
    crypto: 'CRY',
    forensics: 'FOR',
    osint: 'OSI',
    misc: 'MSC',
    stego: 'STG',
    network: 'NET',
    mobile: 'MOB',
  }
  return map[category.toLowerCase()] ?? 'GEN'
}
