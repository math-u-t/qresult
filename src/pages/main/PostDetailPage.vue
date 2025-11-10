<!--
  Post Detail Page

  Displays question/survey details with:
  - Question content
  - Voting interface (if not voted)
  - Results visualization (bar/pie charts)
  - Share buttons
  - Comments section
-->

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import { Share2, Clock, Eye, Users } from 'lucide-vue-next'
import { usePostStore } from '@/stores/post'
import { useNotificationStore } from '@/stores/notification'
import BaseCard from '@/components/ui/BaseCard.vue'
import BaseButton from '@/components/ui/BaseButton.vue'

const route = useRoute()
const postStore = usePostStore()
const notificationStore = useNotificationStore()

const selectedOptions = ref<string[]>([])
const hasVoted = ref(false)
const isSubmitting = ref(false)

const post = computed(() => postStore.currentPost)

const canVote = computed(() => {
  if (!post.value) return false
  if (hasVoted.value) return false
  if (post.value.isMultipleChoice) {
    return selectedOptions.value.length > 0
  }
  return selectedOptions.value.length === 1
})

onMounted(async () => {
  const postId = route.params.id as string
  await postStore.fetchPostById(postId)
})

function handleOptionSelect(optionId: string) {
  if (hasVoted.value) return

  if (post.value?.isMultipleChoice) {
    const index = selectedOptions.value.indexOf(optionId)
    if (index > -1) {
      selectedOptions.value.splice(index, 1)
    } else {
      selectedOptions.value.push(optionId)
    }
  } else {
    selectedOptions.value = [optionId]
  }
}

async function handleVote() {
  if (!post.value || !canVote.value) return

  try {
    isSubmitting.value = true
    const success = await postStore.vote(post.value.id, selectedOptions.value)

    if (success) {
      hasVoted.value = true
      notificationStore.showSuccess('回答を送信しました')
    } else {
      notificationStore.showError('回答の送信に失敗しました')
    }
  } catch (error) {
    console.error('Vote error:', error)
    notificationStore.showError('エラーが発生しました')
  } finally {
    isSubmitting.value = false
  }
}

function handleShare() {
  const url = window.location.href
  if (navigator.share) {
    navigator.share({
      title: post.value?.title,
      url: url,
    }).catch(() => {
      // User cancelled or error
    })
  } else {
    navigator.clipboard.writeText(url)
    notificationStore.showSuccess('URLをコピーしました')
  }
}

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString('ja-JP', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

function getRemainingTime(endsAt: string) {
  const now = new Date().getTime()
  const end = new Date(endsAt).getTime()
  const remaining = Math.max(0, end - now)
  const days = Math.floor(remaining / (1000 * 60 * 60 * 24))
  const hours = Math.floor((remaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))

  if (days > 0) return `残り${days}日`
  if (hours > 0) return `残り${hours}時間`
  return '終了'
}
</script>

<template>
  <div v-if="post" class="max-w-4xl mx-auto space-y-6">
    <!-- Header -->
    <BaseCard>
      <div class="space-y-4">
        <div>
          <h1 class="text-3xl font-bold mb-3">{{ post.title }}</h1>
          <p v-if="post.description" class="text-gray-600 dark:text-gray-400">
            {{ post.description }}
          </p>
        </div>

        <!-- Category & Tags -->
        <div class="flex flex-wrap gap-2">
          <span class="px-3 py-1 rounded-full text-xs font-medium bg-primary-100 text-primary-700 dark:bg-primary-900 dark:text-primary-300">
            {{ post.category.name }}
          </span>
          <span
            v-for="tag in post.tags"
            :key="tag"
            class="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300"
          >
            #{{ tag }}
          </span>
        </div>

        <!-- Stats -->
        <div class="flex flex-wrap gap-6 text-sm text-gray-600 dark:text-gray-400">
          <div class="flex items-center space-x-2">
            <Users :size="16" />
            <span>{{ post.totalAnswers }} 回答</span>
          </div>
          <div class="flex items-center space-x-2">
            <Eye :size="16" />
            <span>{{ post.viewCount }} 閲覧</span>
          </div>
          <div class="flex items-center space-x-2">
            <Clock :size="16" />
            <span>{{ formatDate(post.createdAt) }}</span>
          </div>
          <div
            v-if="post.endsAt"
            class="flex items-center space-x-2 text-yellow-600 dark:text-yellow-400 font-medium"
          >
            <Clock :size="16" />
            <span>{{ getRemainingTime(post.endsAt) }}</span>
          </div>
        </div>

        <!-- Share Button -->
        <div>
          <BaseButton @click="handleShare" variant="outline" size="sm">
            <Share2 :size="16" class="mr-2" />
            シェア
          </BaseButton>
        </div>
      </div>
    </BaseCard>

    <!-- Voting Section (if not voted) -->
    <BaseCard v-if="!hasVoted">
      <div class="space-y-4">
        <h2 class="text-xl font-semibold">回答を選択</h2>

        <div class="space-y-3">
          <label
            v-for="option in post.options"
            :key="option.id"
            class="block p-4 border-2 rounded-lg cursor-pointer transition-all"
            :class="[
              selectedOptions.includes(option.id)
                ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                : 'border-gray-200 dark:border-gray-700 hover:border-primary-300'
            ]"
          >
            <div class="flex items-center space-x-3">
              <input
                :type="post.isMultipleChoice ? 'checkbox' : 'radio'"
                :name="'option'"
                :value="option.id"
                :checked="selectedOptions.includes(option.id)"
                @change="handleOptionSelect(option.id)"
                class="w-4 h-4 text-primary-600 focus:ring-primary-500"
              />
              <span class="flex-1 font-medium">{{ option.text }}</span>
            </div>
          </label>
        </div>

        <p v-if="post.isMultipleChoice" class="text-sm text-gray-500 dark:text-gray-400">
          複数選択可能です
        </p>

        <BaseButton
          @click="handleVote"
          :disabled="!canVote"
          :loading="isSubmitting"
          variant="primary"
          class="w-full"
        >
          回答を送信
        </BaseButton>
      </div>
    </BaseCard>

    <!-- Results Section -->
    <BaseCard v-if="hasVoted || post.totalAnswers > 0">
      <div class="space-y-6">
        <div class="flex items-center justify-between">
          <h2 class="text-xl font-semibold">結果</h2>
          <span class="text-sm text-gray-500 dark:text-gray-400">
            {{ post.totalAnswers }} 回答
          </span>
        </div>

        <!-- Bar Chart -->
        <div class="space-y-4">
          <div
            v-for="option in post.options"
            :key="option.id"
            class="space-y-2"
          >
            <div class="flex items-center justify-between text-sm">
              <span class="font-medium">{{ option.text }}</span>
              <span class="text-gray-600 dark:text-gray-400">
                {{ option.votes }} 票 ({{ option.percentage }}%)
              </span>
            </div>
            <div class="relative bg-gray-100 dark:bg-gray-700 rounded-full h-8 overflow-hidden">
              <div
                class="absolute inset-y-0 left-0 bg-gradient-to-r from-primary-500 to-primary-600 transition-all duration-1000 ease-out flex items-center justify-end px-3"
                :style="{ width: `${option.percentage}%` }"
              >
                <span
                  v-if="option.percentage > 10"
                  class="text-xs font-medium text-white"
                >
                  {{ option.percentage }}%
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </BaseCard>
  </div>

  <!-- Loading State -->
  <div v-else class="max-w-4xl mx-auto">
    <BaseCard>
      <div class="skeleton h-8 w-3/4 mb-4"></div>
      <div class="skeleton h-4 w-full mb-2"></div>
      <div class="skeleton h-4 w-2/3"></div>
    </BaseCard>
  </div>
</template>
