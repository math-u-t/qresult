<!--
  Home Page

  Displays a list of questions/surveys with:
  - Category filter
  - Sort options (newest, popular, trending)
  - Search functionality
  - Infinite scroll or pagination
-->

<script setup lang="ts">
import { onMounted, ref, computed } from 'vue'
import { RouterLink } from 'vue-router'
import { Search, Filter, TrendingUp, Clock, BarChart3 } from 'lucide-vue-next'
import { usePostStore } from '@/stores/post'
import BaseCard from '@/components/ui/BaseCard.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import type { PostSortBy } from '@/types'

const postStore = usePostStore()
const searchQuery = ref('')
const selectedCategory = ref('')
const selectedSort = ref<PostSortBy>('newest')

const sortOptions = [
  { value: 'newest', label: '新着順', icon: Clock },
  { value: 'popular', label: '人気順', icon: TrendingUp },
  { value: 'trending', label: 'トレンド', icon: BarChart3 },
  { value: 'ending-soon', label: '終了間近', icon: Clock },
] as const

onMounted(async () => {
  await postStore.fetchPosts()
  await postStore.fetchCategories()
})

function handleSearch() {
  postStore.setFilter({ search: searchQuery.value })
}

function handleCategoryChange(categorySlug: string) {
  selectedCategory.value = categorySlug
  postStore.setFilter({ category: categorySlug || undefined })
}

function handleSortChange(sort: PostSortBy) {
  selectedSort.value = sort
  postStore.setSortBy(sort)
}

function formatDate(dateString: string) {
  const date = new Date(dateString)
  const now = new Date()
  const diff = now.getTime() - date.getTime()
  const hours = Math.floor(diff / (1000 * 60 * 60))

  if (hours < 1) return '数分前'
  if (hours < 24) return `${hours}時間前`
  const days = Math.floor(hours / 24)
  if (days < 7) return `${days}日前`
  return date.toLocaleDateString('ja-JP')
}

function calculateProgress(post: typeof postStore.filteredPosts[0]) {
  if (!post.endsAt) return null
  const now = new Date().getTime()
  const end = new Date(post.endsAt).getTime()
  const remaining = Math.max(0, end - now)
  const days = Math.floor(remaining / (1000 * 60 * 60 * 24))
  const hours = Math.floor((remaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))

  if (days > 0) return `残り${days}日`
  if (hours > 0) return `残り${hours}時間`
  return '終了間近'
}
</script>

<template>
  <div class="space-y-6">
    <!-- Header -->
    <div>
      <h1 class="text-3xl font-bold mb-2">質問・アンケート</h1>
      <p class="text-gray-600 dark:text-gray-400">
        匿名で質問に回答したり、アンケートに参加しよう
      </p>
    </div>

    <!-- Search & Filters -->
    <div class="space-y-4">
      <!-- Search Bar -->
      <div class="relative">
        <div class="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
          <Search :size="20" />
        </div>
        <input
          v-model="searchQuery"
          @keyup.enter="handleSearch"
          type="text"
          placeholder="質問を検索..."
          class="input pl-12 pr-4"
        />
      </div>

      <!-- Filter Bar -->
      <div class="flex flex-col sm:flex-row gap-4">
        <!-- Category Filter -->
        <div class="flex-1">
          <select
            v-model="selectedCategory"
            @change="handleCategoryChange(selectedCategory)"
            class="input"
          >
            <option value="">すべてのカテゴリ</option>
            <option
              v-for="category in postStore.categories"
              :key="category.id"
              :value="category.slug"
            >
              {{ category.name }} ({{ category.postCount }})
            </option>
          </select>
        </div>

        <!-- Sort Options -->
        <div class="flex gap-2 overflow-x-auto pb-2">
          <button
            v-for="option in sortOptions"
            :key="option.value"
            @click="handleSortChange(option.value)"
            :class="[
              'btn whitespace-nowrap flex items-center space-x-2',
              selectedSort === option.value ? 'btn-primary' : 'btn-outline'
            ]"
          >
            <component :is="option.icon" :size="16" />
            <span>{{ option.label }}</span>
          </button>
        </div>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="postStore.isLoading && postStore.posts.length === 0" class="space-y-4">
      <div v-for="i in 3" :key="i" class="card p-6">
        <div class="skeleton h-6 w-3/4 mb-4"></div>
        <div class="skeleton h-4 w-full mb-2"></div>
        <div class="skeleton h-4 w-2/3"></div>
      </div>
    </div>

    <!-- Post List -->
    <div v-else-if="postStore.filteredPosts.length > 0" class="space-y-4">
      <RouterLink
        v-for="post in postStore.filteredPosts"
        :key="post.id"
        :to="`/post/${post.id}`"
      >
        <BaseCard hover class="space-y-4">
          <!-- Post Header -->
          <div class="flex items-start justify-between">
            <div class="flex-1">
              <h3 class="text-xl font-semibold mb-2 line-clamp-2">
                {{ post.title }}
              </h3>
              <p v-if="post.description" class="text-gray-600 dark:text-gray-400 text-sm line-clamp-2 mb-3">
                {{ post.description }}
              </p>
            </div>
          </div>

          <!-- Category & Tags -->
          <div class="flex flex-wrap gap-2">
            <span
              class="px-3 py-1 rounded-full text-xs font-medium bg-primary-100 text-primary-700 dark:bg-primary-900 dark:text-primary-300"
            >
              {{ post.category.name }}
            </span>
            <span
              v-for="tag in post.tags.slice(0, 3)"
              :key="tag"
              class="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300"
            >
              #{{ tag }}
            </span>
          </div>

          <!-- Stats -->
          <div class="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
            <div class="flex items-center space-x-4">
              <span>{{ post.totalAnswers }}回答</span>
              <span>{{ post.viewCount }}閲覧</span>
              <span>{{ formatDate(post.createdAt) }}</span>
            </div>
            <span v-if="calculateProgress(post)" class="text-yellow-600 dark:text-yellow-400 font-medium">
              {{ calculateProgress(post) }}
            </span>
          </div>

          <!-- Progress Preview -->
          <div v-if="post.options.length > 0" class="space-y-2">
            <div
              v-for="(option, index) in post.options.slice(0, 2)"
              :key="option.id"
              class="flex items-center space-x-3"
            >
              <div class="flex-1 bg-gray-100 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
                <div
                  class="bg-primary-500 h-full transition-all duration-500"
                  :style="{ width: `${option.percentage}%` }"
                />
              </div>
              <span class="text-xs font-medium w-12 text-right">
                {{ option.percentage }}%
              </span>
            </div>
            <p v-if="post.options.length > 2" class="text-xs text-gray-500 dark:text-gray-400">
              他{{ post.options.length - 2 }}件の選択肢
            </p>
          </div>
        </BaseCard>
      </RouterLink>

      <!-- Load More -->
      <div v-if="postStore.hasMore" class="text-center">
        <BaseButton
          @click="postStore.loadMore"
          :loading="postStore.isLoading"
          variant="outline"
        >
          もっと見る
        </BaseButton>
      </div>
    </div>

    <!-- Empty State -->
    <div v-else class="text-center py-12">
      <Filter :size="48" class="mx-auto mb-4 text-gray-400" />
      <h3 class="text-xl font-semibold mb-2">質問が見つかりません</h3>
      <p class="text-gray-600 dark:text-gray-400 mb-6">
        フィルターを変更するか、新しい質問を作成してみましょう
      </p>
      <RouterLink to="/post">
        <BaseButton variant="primary">質問を作成</BaseButton>
      </RouterLink>
    </div>
  </div>
</template>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
