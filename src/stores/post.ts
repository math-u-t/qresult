/**
 * Post Store
 *
 * Manages posts (questions/surveys) including:
 * - Fetching and caching posts
 * - Creating new posts
 * - Voting/answering
 * - Filtering and sorting
 *
 * @example
 * ```ts
 * const postStore = usePostStore()
 * await postStore.fetchPosts()
 * await postStore.createPost(newPost)
 * await postStore.vote(postId, optionIds)
 * ```
 */

import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type {
  Post,
  CreatePostInput,
  PostFilter,
  PostSortBy,
  Category,
  PaginatedResponse,
} from '@/types'

export const usePostStore = defineStore('post', () => {
  // State
  const posts = ref<Post[]>([])
  const currentPost = ref<Post | null>(null)
  const categories = ref<Category[]>([])
  const isLoading = ref(false)
  const error = ref<string | null>(null)
  const filter = ref<PostFilter>({})
  const sortBy = ref<PostSortBy>('newest')
  const currentPage = ref(1)
  const totalPosts = ref(0)
  const hasMore = ref(true)

  // Getters
  const filteredPosts = computed(() => {
    let result = [...posts.value]

    // Filter by category
    if (filter.value.category) {
      result = result.filter((post) => post.category.slug === filter.value.category)
    }

    // Filter by tags
    if (filter.value.tags && filter.value.tags.length > 0) {
      result = result.filter((post) =>
        post.tags.some((tag) => filter.value.tags?.includes(tag))
      )
    }

    // Filter by active status
    if (filter.value.isActive !== undefined) {
      result = result.filter((post) => post.isActive === filter.value.isActive)
    }

    // Search by title
    if (filter.value.search) {
      const searchLower = filter.value.search.toLowerCase()
      result = result.filter((post) =>
        post.title.toLowerCase().includes(searchLower)
      )
    }

    // Sort
    switch (sortBy.value) {
      case 'popular':
        result.sort((a, b) => b.totalAnswers - a.totalAnswers)
        break
      case 'trending':
        result.sort((a, b) => b.viewCount - a.viewCount)
        break
      case 'ending-soon':
        result.sort((a, b) => {
          if (!a.endsAt) return 1
          if (!b.endsAt) return -1
          return new Date(a.endsAt).getTime() - new Date(b.endsAt).getTime()
        })
        break
      case 'newest':
      default:
        result.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        )
    }

    return result
  })

  const activePosts = computed(() => posts.value.filter((post) => post.isActive))
  const trendingPosts = computed(() =>
    [...posts.value]
      .sort((a, b) => b.viewCount - a.viewCount)
      .slice(0, 10)
  )

  /**
   * Fetch posts with pagination
   * @param page - Page number
   * @param limit - Items per page
   */
  async function fetchPosts(page = 1, limit = 20): Promise<void> {
    try {
      isLoading.value = true
      error.value = null

      // TODO: Call API
      // const response = await apiFetchPosts({ page, limit, sortBy, filter })
      // posts.value = response.data
      // totalPosts.value = response.total
      // hasMore.value = response.hasMore

      // Mock data for now
      const mockPosts: Post[] = Array.from({ length: limit }, (_, i) => ({
        id: `${page}-${i + 1}`,
        authorId: 'user_' + Math.floor(Math.random() * 100),
        title: `Sample Question ${page}-${i + 1}`,
        description: 'This is a sample question description.',
        options: [
          { id: '1', text: 'Option A', order: 1, votes: 45, percentage: 45 },
          { id: '2', text: 'Option B', order: 2, votes: 35, percentage: 35 },
          { id: '3', text: 'Option C', order: 3, votes: 20, percentage: 20 },
        ],
        category: {
          id: 'cat_1',
          name: 'Technology',
          slug: 'technology',
          postCount: 100,
        },
        isMultipleChoice: false,
        endsAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
        createdAt: new Date(Date.now() - i * 60 * 60 * 1000).toISOString(),
        updatedAt: new Date(Date.now() - i * 60 * 60 * 1000).toISOString(),
        totalAnswers: 100,
        viewCount: Math.floor(Math.random() * 1000),
        isActive: true,
        tags: ['tech', 'survey'],
      }))

      if (page === 1) {
        posts.value = mockPosts
      } else {
        posts.value = [...posts.value, ...mockPosts]
      }

      currentPage.value = page
      totalPosts.value = 100
      hasMore.value = page < 5
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to fetch posts'
      console.error('Fetch posts error:', err)
    } finally {
      isLoading.value = false
    }
  }

  /**
   * Fetch single post by ID
   * @param id - Post ID
   */
  async function fetchPostById(id: string): Promise<Post | null> {
    try {
      isLoading.value = true
      error.value = null

      // TODO: Call API
      // const post = await apiFetchPost(id)
      // currentPost.value = post

      // Mock data
      const post: Post = {
        id,
        authorId: 'user_1',
        title: 'Sample Question ' + id,
        description: 'This is a detailed question description.',
        options: [
          { id: '1', text: 'Option A', order: 1, votes: 45, percentage: 45 },
          { id: '2', text: 'Option B', order: 2, votes: 35, percentage: 35 },
          { id: '3', text: 'Option C', order: 3, votes: 20, percentage: 20 },
        ],
        category: {
          id: 'cat_1',
          name: 'Technology',
          slug: 'technology',
          postCount: 100,
        },
        isMultipleChoice: false,
        endsAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        totalAnswers: 100,
        viewCount: 500,
        isActive: true,
        tags: ['tech', 'survey'],
      }

      currentPost.value = post
      return post
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to fetch post'
      console.error('Fetch post error:', err)
      return null
    } finally {
      isLoading.value = false
    }
  }

  /**
   * Create new post
   * @param input - Post creation data
   */
  async function createPost(input: CreatePostInput): Promise<Post | null> {
    try {
      isLoading.value = true
      error.value = null

      // TODO: Call API
      // const post = await apiCreatePost(input)
      // posts.value = [post, ...posts.value]
      // return post

      // Mock creation
      const newPost: Post = {
        id: Date.now().toString(),
        authorId: 'current_user',
        title: input.title,
        description: input.description,
        options: input.options.map((text, index) => ({
          id: `opt_${index + 1}`,
          text,
          order: index + 1,
          votes: 0,
          percentage: 0,
        })),
        category: {
          id: 'cat_1',
          name: input.category,
          slug: input.category.toLowerCase(),
          postCount: 0,
        },
        isMultipleChoice: input.isMultipleChoice,
        endsAt: input.duration
          ? new Date(Date.now() + input.duration * 24 * 60 * 60 * 1000).toISOString()
          : undefined,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        totalAnswers: 0,
        viewCount: 0,
        isActive: true,
        tags: input.tags || [],
      }

      posts.value = [newPost, ...posts.value]
      return newPost
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to create post'
      console.error('Create post error:', err)
      return null
    } finally {
      isLoading.value = false
    }
  }

  /**
   * Vote on a post
   * @param postId - Post ID
   * @param optionIds - Selected option IDs
   */
  async function vote(postId: string, optionIds: string[]): Promise<boolean> {
    try {
      isLoading.value = true
      error.value = null

      // TODO: Call API
      // await apiVote(postId, optionIds)

      // Mock vote - update local state
      const post = posts.value.find((p) => p.id === postId)
      if (post) {
        post.totalAnswers += 1
        // Recalculate percentages
        const totalVotes = post.totalAnswers
        post.options.forEach((opt) => {
          if (optionIds.includes(opt.id)) {
            opt.votes += 1
          }
          opt.percentage = Math.round((opt.votes / totalVotes) * 100)
        })
      }

      if (currentPost.value?.id === postId) {
        currentPost.value = post || null
      }

      return true
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to vote'
      console.error('Vote error:', err)
      return false
    } finally {
      isLoading.value = false
    }
  }

  /**
   * Fetch categories
   */
  async function fetchCategories(): Promise<void> {
    try {
      // TODO: Call API
      // categories.value = await apiFetchCategories()

      // Mock categories
      categories.value = [
        {
          id: '1',
          name: 'Technology',
          slug: 'technology',
          description: 'Tech-related questions',
          icon: 'monitor',
          color: '#3b82f6',
          postCount: 150,
        },
        {
          id: '2',
          name: 'Lifestyle',
          slug: 'lifestyle',
          description: 'Daily life questions',
          icon: 'heart',
          color: '#ec4899',
          postCount: 200,
        },
        {
          id: '3',
          name: 'Entertainment',
          slug: 'entertainment',
          description: 'Fun and entertainment',
          icon: 'film',
          color: '#8b5cf6',
          postCount: 180,
        },
        {
          id: '4',
          name: 'Business',
          slug: 'business',
          description: 'Business and career',
          icon: 'briefcase',
          color: '#10b981',
          postCount: 120,
        },
      ]
    } catch (err) {
      console.error('Fetch categories error:', err)
    }
  }

  /**
   * Set filter
   */
  function setFilter(newFilter: Partial<PostFilter>) {
    filter.value = { ...filter.value, ...newFilter }
  }

  /**
   * Set sort order
   */
  function setSortBy(sort: PostSortBy) {
    sortBy.value = sort
  }

  /**
   * Clear filter
   */
  function clearFilter() {
    filter.value = {}
  }

  /**
   * Load more posts (infinite scroll)
   */
  async function loadMore(): Promise<void> {
    if (!hasMore.value || isLoading.value) return
    await fetchPosts(currentPage.value + 1)
  }

  return {
    posts,
    currentPost,
    categories,
    isLoading,
    error,
    filter,
    sortBy,
    currentPage,
    totalPosts,
    hasMore,
    filteredPosts,
    activePosts,
    trendingPosts,
    fetchPosts,
    fetchPostById,
    createPost,
    vote,
    fetchCategories,
    setFilter,
    setSortBy,
    clearFilter,
    loadMore,
  }
})
