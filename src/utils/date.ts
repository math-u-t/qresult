/**
 * Date Utilities
 *
 * Common date formatting and manipulation functions.
 */

/**
 * Format date to relative time (e.g., "2 hours ago")
 * @param date - Date string or Date object
 * @returns Formatted relative time string
 */
export function formatRelativeTime(date: string | Date): string {
  const now = new Date()
  const target = typeof date === 'string' ? new Date(date) : date
  const diff = now.getTime() - target.getTime()

  const seconds = Math.floor(diff / 1000)
  const minutes = Math.floor(seconds / 60)
  const hours = Math.floor(minutes / 60)
  const days = Math.floor(hours / 24)
  const weeks = Math.floor(days / 7)
  const months = Math.floor(days / 30)
  const years = Math.floor(days / 365)

  if (seconds < 60) return 'たった今'
  if (minutes < 60) return `${minutes}分前`
  if (hours < 24) return `${hours}時間前`
  if (days < 7) return `${days}日前`
  if (weeks < 4) return `${weeks}週間前`
  if (months < 12) return `${months}ヶ月前`
  return `${years}年前`
}

/**
 * Format date to Japanese date string
 * @param date - Date string or Date object
 * @returns Formatted date string (e.g., "2024年1月1日")
 */
export function formatJapaneseDate(date: string | Date): string {
  const target = typeof date === 'string' ? new Date(date) : date
  return target.toLocaleDateString('ja-JP', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

/**
 * Format date to ISO date string
 * @param date - Date string or Date object
 * @returns ISO date string (e.g., "2024-01-01")
 */
export function formatISODate(date: string | Date): string {
  const target = typeof date === 'string' ? new Date(date) : date
  return target.toISOString().split('T')[0] ?? ''
}

/**
 * Calculate remaining time until a date
 * @param endDate - End date string or Date object
 * @returns Remaining time string (e.g., "3日", "2時間")
 */
export function getRemainingTime(endDate: string | Date): string {
  const now = new Date()
  const end = typeof endDate === 'string' ? new Date(endDate) : endDate
  const remaining = Math.max(0, end.getTime() - now.getTime())

  const days = Math.floor(remaining / (1000 * 60 * 60 * 24))
  const hours = Math.floor((remaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  const minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60))

  if (days > 0) return `残り${days}日`
  if (hours > 0) return `残り${hours}時間`
  if (minutes > 0) return `残り${minutes}分`
  return '終了'
}
