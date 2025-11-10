<!--
  Stats Page

  Global statistics and trending content
-->

<script setup lang="ts">
import { TrendingUp, Users, FileText, Eye } from 'lucide-vue-next'
import { usePostStore } from '@/stores/post'
import BaseCard from '@/components/ui/BaseCard.vue'
import { RouterLink } from 'vue-router'

const postStore = usePostStore()
</script>

<template>
  <div class="space-y-6">
    <div>
      <h1 class="text-3xl font-bold mb-2">統計・トレンド</h1>
      <p class="text-gray-600 dark:text-gray-400">
        qresultのグローバル統計とトレンド情報
      </p>
    </div>

    <!-- Global Stats -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
      <BaseCard padding="md">
        <div class="flex items-center space-x-4">
          <div class="p-3 rounded-lg bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-400">
            <FileText :size="24" />
          </div>
          <div>
            <p class="text-2xl font-bold">1,234</p>
            <p class="text-sm text-gray-600 dark:text-gray-400">総投稿数</p>
          </div>
        </div>
      </BaseCard>

      <BaseCard padding="md">
        <div class="flex items-center space-x-4">
          <div class="p-3 rounded-lg bg-secondary-100 dark:bg-secondary-900 text-secondary-600 dark:text-secondary-400">
            <Users :size="24" />
          </div>
          <div>
            <p class="text-2xl font-bold">5,678</p>
            <p class="text-sm text-gray-600 dark:text-gray-400">総回答数</p>
          </div>
        </div>
      </BaseCard>

      <BaseCard padding="md">
        <div class="flex items-center space-x-4">
          <div class="p-3 rounded-lg bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400">
            <Eye :size="24" />
          </div>
          <div>
            <p class="text-2xl font-bold">12.3K</p>
            <p class="text-sm text-gray-600 dark:text-gray-400">総閲覧数</p>
          </div>
        </div>
      </BaseCard>

      <BaseCard padding="md">
        <div class="flex items-center space-x-4">
          <div class="p-3 rounded-lg bg-yellow-100 dark:bg-yellow-900 text-yellow-600 dark:text-yellow-400">
            <TrendingUp :size="24" />
          </div>
          <div>
            <p class="text-2xl font-bold">890</p>
            <p class="text-sm text-gray-600 dark:text-gray-400">アクティブユーザー</p>
          </div>
        </div>
      </BaseCard>
    </div>

    <!-- Trending Posts -->
    <BaseCard>
      <h2 class="text-xl font-semibold mb-4">トレンド質問</h2>
      <div class="space-y-4">
        <RouterLink
          v-for="post in postStore.trendingPosts.slice(0, 5)"
          :key="post.id"
          :to="`/post/${post.id}`"
          class="block p-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
        >
          <h3 class="font-semibold mb-2">{{ post.title }}</h3>
          <div class="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
            <span>{{ post.totalAnswers }} 回答</span>
            <span>{{ post.viewCount }} 閲覧</span>
          </div>
        </RouterLink>
      </div>
    </BaseCard>

    <!-- Popular Categories -->
    <BaseCard>
      <h2 class="text-xl font-semibold mb-4">人気カテゴリ</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div
          v-for="category in postStore.categories"
          :key="category.id"
          class="p-4 rounded-lg border-2 border-gray-200 dark:border-gray-700"
        >
          <h3 class="font-semibold mb-1">{{ category.name }}</h3>
          <p class="text-sm text-gray-600 dark:text-gray-400">{{ category.postCount }} 投稿</p>
        </div>
      </div>
    </BaseCard>
  </div>
</template>
