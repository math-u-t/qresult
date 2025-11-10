<!--
  Post Create Page

  Form for creating new questions/surveys with:
  - Title and description
  - Dynamic options (add/remove)
  - Category selection
  - Multiple choice toggle
  - Duration settings
  - Preview mode
-->

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { Plus, Trash2, Eye } from 'lucide-vue-next'
import { usePostStore } from '@/stores/post'
import { useNotificationStore } from '@/stores/notification'
import BaseCard from '@/components/ui/BaseCard.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import BaseModal from '@/components/ui/BaseModal.vue'
import type { CreatePostInput } from '@/types'

const router = useRouter()
const postStore = usePostStore()
const notificationStore = useNotificationStore()

const title = ref('')
const description = ref('')
const options = ref(['', ''])
const selectedCategory = ref('')
const isMultipleChoice = ref(false)
const duration = ref(7) // days
const tags = ref('')

const showPreview = ref(false)
const isSubmitting = ref(false)

const isValid = computed(() => {
  return (
    title.value.trim().length > 0 &&
    selectedCategory.value.length > 0 &&
    options.value.filter(opt => opt.trim().length > 0).length >= 2
  )
})

const validOptions = computed(() => options.value.filter(opt => opt.trim().length > 0))

function addOption() {
  if (options.value.length < 10) {
    options.value.push('')
  }
}

function removeOption(index: number) {
  if (options.value.length > 2) {
    options.value.splice(index, 1)
  }
}

async function handleSubmit() {
  if (!isValid.value) {
    notificationStore.showError('必須項目を入力してください')
    return
  }

  try {
    isSubmitting.value = true

    const input: CreatePostInput = {
      title: title.value.trim(),
      description: description.value.trim() || undefined,
      options: validOptions.value,
      category: selectedCategory.value,
      isMultipleChoice: isMultipleChoice.value,
      duration: duration.value,
      tags: tags.value
        .split(',')
        .map(t => t.trim())
        .filter(t => t.length > 0),
    }

    const post = await postStore.createPost(input)

    if (post) {
      notificationStore.showSuccess('質問を投稿しました')
      router.push(`/post/${post.id}`)
    } else {
      notificationStore.showError('投稿に失敗しました')
    }
  } catch (error) {
    console.error('Submit error:', error)
    notificationStore.showError('エラーが発生しました')
  } finally {
    isSubmitting.value = false
  }
}

function handlePreview() {
  if (!isValid.value) {
    notificationStore.showWarning('プレビューには必須項目の入力が必要です')
    return
  }
  showPreview.value = true
}
</script>

<template>
  <div class="max-w-3xl mx-auto space-y-6">
    <!-- Header -->
    <div>
      <h1 class="text-3xl font-bold mb-2">質問・アンケートを作成</h1>
      <p class="text-gray-600 dark:text-gray-400">
        匿名で回答を集められる質問やアンケートを作成しましょう
      </p>
    </div>

    <!-- Form -->
    <BaseCard>
      <form @submit.prevent="handleSubmit" class="space-y-6">
        <!-- Title -->
        <div>
          <label for="title" class="block text-sm font-medium mb-2">
            質問タイトル <span class="text-red-500">*</span>
          </label>
          <input
            id="title"
            v-model="title"
            type="text"
            placeholder="例: あなたの好きなプログラミング言語は？"
            class="input"
            maxlength="200"
            required
          />
          <p class="text-xs text-gray-500 mt-1">
            {{ title.length }}/200文字
          </p>
        </div>

        <!-- Description -->
        <div>
          <label for="description" class="block text-sm font-medium mb-2">
            説明（任意）
          </label>
          <textarea
            id="description"
            v-model="description"
            rows="3"
            placeholder="質問の詳細や補足説明を入力..."
            class="input resize-none"
            maxlength="500"
          />
          <p class="text-xs text-gray-500 mt-1">
            {{ description.length }}/500文字
          </p>
        </div>

        <!-- Category -->
        <div>
          <label for="category" class="block text-sm font-medium mb-2">
            カテゴリ <span class="text-red-500">*</span>
          </label>
          <select
            id="category"
            v-model="selectedCategory"
            class="input"
            required
          >
            <option value="">カテゴリを選択</option>
            <option
              v-for="category in postStore.categories"
              :key="category.id"
              :value="category.slug"
            >
              {{ category.name }}
            </option>
          </select>
        </div>

        <!-- Options -->
        <div>
          <label class="block text-sm font-medium mb-2">
            選択肢 <span class="text-red-500">*</span>
          </label>
          <div class="space-y-3">
            <div
              v-for="(option, index) in options"
              :key="index"
              class="flex items-center space-x-2"
            >
              <span class="text-sm font-medium text-gray-500 w-8">
                {{ index + 1 }}.
              </span>
              <input
                v-model="options[index]"
                type="text"
                :placeholder="`選択肢 ${index + 1}`"
                class="input flex-1"
                maxlength="100"
              />
              <button
                v-if="options.length > 2"
                @click="removeOption(index)"
                type="button"
                class="p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 dark:text-red-400 transition-colors"
                :aria-label="`選択肢${index + 1}を削除`"
              >
                <Trash2 :size="20" />
              </button>
            </div>
          </div>

          <BaseButton
            v-if="options.length < 10"
            @click="addOption"
            type="button"
            variant="outline"
            class="mt-3 w-full"
          >
            <Plus :size="16" class="mr-2" />
            選択肢を追加
          </BaseButton>
          <p class="text-xs text-gray-500 mt-2">
            2〜10個の選択肢を設定できます
          </p>
        </div>

        <!-- Multiple Choice -->
        <div class="flex items-center space-x-3">
          <input
            id="multipleChoice"
            v-model="isMultipleChoice"
            type="checkbox"
            class="w-4 h-4 text-primary-600 rounded focus:ring-primary-500"
          />
          <label for="multipleChoice" class="text-sm font-medium">
            複数選択を許可
          </label>
        </div>

        <!-- Duration -->
        <div>
          <label for="duration" class="block text-sm font-medium mb-2">
            公開期間
          </label>
          <select
            id="duration"
            v-model.number="duration"
            class="input"
          >
            <option :value="1">1日</option>
            <option :value="3">3日</option>
            <option :value="7">7日（推奨）</option>
            <option :value="14">14日</option>
            <option :value="30">30日</option>
          </select>
        </div>

        <!-- Tags -->
        <div>
          <label for="tags" class="block text-sm font-medium mb-2">
            タグ（任意）
          </label>
          <input
            id="tags"
            v-model="tags"
            type="text"
            placeholder="tech, survey, gaming（カンマ区切り）"
            class="input"
          />
          <p class="text-xs text-gray-500 mt-1">
            カンマ区切りで複数のタグを設定できます
          </p>
        </div>

        <!-- Actions -->
        <div class="flex flex-col sm:flex-row gap-3 pt-4">
          <BaseButton
            type="submit"
            variant="primary"
            :disabled="!isValid"
            :loading="isSubmitting"
            class="flex-1"
          >
            投稿する
          </BaseButton>
          <BaseButton
            @click="handlePreview"
            type="button"
            variant="outline"
            :disabled="!isValid"
            class="flex-1"
          >
            <Eye :size="16" class="mr-2" />
            プレビュー
          </BaseButton>
        </div>
      </form>
    </BaseCard>

    <!-- Preview Modal -->
    <BaseModal
      v-model="showPreview"
      title="プレビュー"
      size="lg"
    >
      <div class="space-y-4">
        <div>
          <h3 class="text-2xl font-bold mb-2">{{ title }}</h3>
          <p v-if="description" class="text-gray-600 dark:text-gray-400">
            {{ description }}
          </p>
        </div>

        <div class="flex flex-wrap gap-2">
          <span class="px-3 py-1 rounded-full text-xs font-medium bg-primary-100 text-primary-700 dark:bg-primary-900 dark:text-primary-300">
            {{ postStore.categories.find(c => c.slug === selectedCategory)?.name }}
          </span>
          <span
            v-for="tag in tags.split(',').filter(t => t.trim())"
            :key="tag"
            class="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300"
          >
            #{{ tag.trim() }}
          </span>
        </div>

        <div class="space-y-2">
          <div
            v-for="(option, index) in validOptions"
            :key="index"
            class="p-4 border-2 border-gray-200 dark:border-gray-700 rounded-lg hover:border-primary-500 cursor-pointer transition-colors"
          >
            <div class="flex items-center space-x-3">
              <input
                :type="isMultipleChoice ? 'checkbox' : 'radio'"
                :name="'preview-option'"
                class="w-4 h-4"
                disabled
              />
              <span>{{ option }}</span>
            </div>
          </div>
        </div>

        <div class="text-sm text-gray-500 dark:text-gray-400">
          <p>公開期間: {{ duration }}日間</p>
          <p v-if="isMultipleChoice">複数選択可能</p>
        </div>
      </div>
    </BaseModal>
  </div>
</template>
