<!--
  Profile Page

  User profile with:
  - User information
  - Post history
  - Answer history
  - Statistics
  - Settings
-->

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { User, FileText, CheckSquare, Settings, TrendingUp } from 'lucide-vue-next'
import { useAuthStore } from '@/stores/auth'
import { usePostStore } from '@/stores/post'
import BaseCard from '@/components/ui/BaseCard.vue'
import BaseButton from '@/components/ui/BaseButton.vue'

const authStore = useAuthStore()
const postStore = usePostStore()

const activeTab = ref<'posts' | 'answers' | 'stats' | 'settings'>('posts')

const tabs = [
  { value: 'posts', label: '投稿', icon: FileText },
  { value: 'answers', label: '回答', icon: CheckSquare },
  { value: 'stats', label: '統計', icon: TrendingUp },
  { value: 'settings', label: '設定', icon: Settings },
] as const

onMounted(() => {
  postStore.fetchPosts()
})
</script>

<template>
  <div class="max-w-6xl mx-auto space-y-6">
    <!-- Profile Header -->
    <BaseCard>
      <div class="flex items-center space-x-6">
        <div class="w-20 h-20 rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center text-white text-2xl font-bold">
          {{ authStore.currentUser?.username.charAt(0).toUpperCase() }}
        </div>
        <div class="flex-1">
          <h1 class="text-2xl font-bold mb-1">{{ authStore.currentUser?.username }}</h1>
          <p class="text-gray-600 dark:text-gray-400">{{ authStore.currentUser?.email }}</p>
        </div>
      </div>
    </BaseCard>

    <!-- Tabs -->
    <div class="border-b border-gray-200 dark:border-gray-700">
      <nav class="flex space-x-8 overflow-x-auto">
        <button
          v-for="tab in tabs"
          :key="tab.value"
          @click="activeTab = tab.value"
          :class="[
            'flex items-center space-x-2 py-4 px-2 border-b-2 font-medium text-sm whitespace-nowrap transition-colors',
            activeTab === tab.value
              ? 'border-primary-500 text-primary-600 dark:text-primary-400'
              : 'border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
          ]"
        >
          <component :is="tab.icon" :size="18" />
          <span>{{ tab.label }}</span>
        </button>
      </nav>
    </div>

    <!-- Tab Content -->
    <div>
      <!-- Posts Tab -->
      <div v-if="activeTab === 'posts'" class="space-y-4">
        <h2 class="text-xl font-semibold">投稿履歴</h2>
        <p class="text-gray-600 dark:text-gray-400">あなたが作成した質問・アンケートはここに表示されます</p>
        <BaseCard padding="md">
          <p class="text-center text-gray-500">まだ投稿がありません</p>
        </BaseCard>
      </div>

      <!-- Answers Tab -->
      <div v-else-if="activeTab === 'answers'" class="space-y-4">
        <h2 class="text-xl font-semibold">回答履歴</h2>
        <p class="text-gray-600 dark:text-gray-400">あなたが回答した質問はここに表示されます</p>
        <BaseCard padding="md">
          <p class="text-center text-gray-500">まだ回答がありません</p>
        </BaseCard>
      </div>

      <!-- Stats Tab -->
      <div v-else-if="activeTab === 'stats'" class="space-y-4">
        <h2 class="text-xl font-semibold">統計情報</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <BaseCard padding="md">
            <div class="text-center">
              <p class="text-3xl font-bold text-primary-600 dark:text-primary-400">0</p>
              <p class="text-sm text-gray-600 dark:text-gray-400 mt-1">投稿数</p>
            </div>
          </BaseCard>
          <BaseCard padding="md">
            <div class="text-center">
              <p class="text-3xl font-bold text-secondary-600 dark:text-secondary-400">0</p>
              <p class="text-sm text-gray-600 dark:text-gray-400 mt-1">回答数</p>
            </div>
          </BaseCard>
          <BaseCard padding="md">
            <div class="text-center">
              <p class="text-3xl font-bold text-green-600 dark:text-green-400">0</p>
              <p class="text-sm text-gray-600 dark:text-gray-400 mt-1">総閲覧数</p>
            </div>
          </BaseCard>
        </div>
      </div>

      <!-- Settings Tab -->
      <div v-else-if="activeTab === 'settings'" class="space-y-6">
        <h2 class="text-xl font-semibold">設定</h2>

        <BaseCard>
          <h3 class="font-semibold mb-4">通知設定</h3>
          <div class="space-y-3">
            <label class="flex items-center justify-between">
              <span>メール通知</span>
              <input type="checkbox" class="toggle" checked />
            </label>
            <label class="flex items-center justify-between">
              <span>回答通知</span>
              <input type="checkbox" class="toggle" checked />
            </label>
            <label class="flex items-center justify-between">
              <span>コメント通知</span>
              <input type="checkbox" class="toggle" checked />
            </label>
          </div>
        </BaseCard>

        <BaseCard>
          <h3 class="font-semibold mb-4">プライバシー設定</h3>
          <div class="space-y-3">
            <label class="flex items-center justify-between">
              <span>プロフィールを公開</span>
              <input type="checkbox" class="toggle" checked />
            </label>
            <label class="flex items-center justify-between">
              <span>回答履歴を公開</span>
              <input type="checkbox" class="toggle" />
            </label>
          </div>
        </BaseCard>

        <div class="flex justify-end">
          <BaseButton variant="primary">設定を保存</BaseButton>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.toggle {
  @apply w-12 h-6 rounded-full bg-gray-300 dark:bg-gray-600 relative cursor-pointer appearance-none;
  @apply checked:bg-primary-600 transition-colors;
}

.toggle::after {
  content: '';
  @apply absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform;
}

.toggle:checked::after {
  @apply transform translate-x-6;
}
</style>
