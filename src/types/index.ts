/**
 * Core Type Definitions
 *
 * Contains all TypeScript interfaces and types used throughout the application.
 * Organized by domain: User, Post, Answer, Category, Notification, etc.
 */

/**
 * User-related types
 */
export interface User {
  id: string
  username: string
  email: string
  avatar?: string
  bio?: string
  createdAt: string
  settings: UserSettings
}

export interface UserSettings {
  theme: 'light' | 'dark' | 'system'
  notifications: {
    email: boolean
    push: boolean
    answers: boolean
    comments: boolean
  }
  privacy: {
    showProfile: boolean
    showHistory: boolean
  }
}

/**
 * Post (Question/Survey) types
 */
export interface Post {
  id: string
  authorId: string
  title: string
  description?: string
  options: PostOption[]
  category: Category
  isMultipleChoice: boolean
  endsAt?: string
  createdAt: string
  updatedAt: string
  totalAnswers: number
  viewCount: number
  isActive: boolean
  tags: string[]
}

export interface PostOption {
  id: string
  text: string
  order: number
  votes: number
  percentage: number
}

export interface CreatePostInput {
  title: string
  description?: string
  options: string[]
  category: string
  isMultipleChoice: boolean
  duration?: number // in days
  tags?: string[]
}

/**
 * Answer types
 */
export interface Answer {
  id: string
  postId: string
  userId?: string // Optional for anonymous answers
  selectedOptions: string[] // Option IDs
  createdAt: string
  isAnonymous: boolean
}

/**
 * Category types
 */
export interface Category {
  id: string
  name: string
  slug: string
  description?: string
  icon?: string
  color?: string
  postCount: number
}

/**
 * Comment types
 */
export interface Comment {
  id: string
  postId: string
  userId?: string
  content: string
  createdAt: string
  updatedAt: string
  likes: number
  isAnonymous: boolean
  replies?: Comment[]
}

/**
 * Notification types
 */
export interface Notification {
  id: string
  userId: string
  type: NotificationType
  title: string
  message: string
  link?: string
  isRead: boolean
  createdAt: string
}

export type NotificationType =
  | 'answer'
  | 'comment'
  | 'like'
  | 'mention'
  | 'system'

export interface Toast {
  id: string
  type: 'success' | 'error' | 'warning' | 'info'
  message: string
  duration?: number
}

/**
 * Statistics types
 */
export interface UserStats {
  totalPosts: number
  totalAnswers: number
  totalViews: number
  totalVotes: number
  popularPost?: Post
  categoriesDistribution: Record<string, number>
}

export interface GlobalStats {
  totalPosts: number
  totalAnswers: number
  totalUsers: number
  trendingPosts: Post[]
  popularCategories: Category[]
  recentActivity: Activity[]
}

export interface Activity {
  id: string
  type: 'post' | 'answer' | 'comment'
  userId: string
  postId: string
  createdAt: string
}

/**
 * Filter and Sort types
 */
export interface PostFilter {
  category?: string
  tags?: string[]
  isActive?: boolean
  search?: string
}

export type PostSortBy = 'newest' | 'popular' | 'trending' | 'ending-soon'

export interface PaginationParams {
  page: number
  limit: number
  sortBy?: PostSortBy
  filter?: PostFilter
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  limit: number
  hasMore: boolean
}

/**
 * API Response types
 */
export interface ApiResponse<T = unknown> {
  success: boolean
  data?: T
  error?: ApiError
  message?: string
}

export interface ApiError {
  code: string
  message: string
  details?: Record<string, unknown>
}

/**
 * Form validation types
 */
export interface ValidationError {
  field: string
  message: string
}

export interface FormState<T> {
  data: T
  errors: ValidationError[]
  isSubmitting: boolean
  isDirty: boolean
}

/**
 * Route metadata
 */
export interface RouteMeta {
  title?: string
  requiresAuth?: boolean
  layout?: 'default' | 'auth' | 'minimal'
  transition?: string
}
