<!--
  Login Page

  Authentication page with login and register forms
-->

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { Mail, Lock, User } from 'lucide-vue-next'
import { useAuthStore } from '@/stores/auth'
import { useNotificationStore } from '@/stores/notification'
import BaseButton from '@/components/ui/BaseButton.vue'

const router = useRouter()
const authStore = useAuthStore()
const notificationStore = useNotificationStore()

const mode = ref<'login' | 'register'>('login')
const email = ref('')
const password = ref('')
const username = ref('')
const isSubmitting = ref(false)

async function handleSubmit() {
  try {
    isSubmitting.value = true
    let success = false

    if (mode.value === 'login') {
      success = await authStore.login(email.value, password.value)
    } else {
      success = await authStore.register(email.value, username.value, password.value)
    }

    if (success) {
      notificationStore.showSuccess(
        mode.value === 'login' ? 'ログインしました' : '登録が完了しました'
      )
      router.push('/')
    } else {
      notificationStore.showError(authStore.error || '認証に失敗しました')
    }
  } catch (error) {
    console.error('Auth error:', error)
    notificationStore.showError('エラーが発生しました')
  } finally {
    isSubmitting.value = false
  }
}

function toggleMode() {
  mode.value = mode.value === 'login' ? 'register' : 'login'
  email.value = ''
  password.value = ''
  username.value = ''
}
</script>

<template>
  <div class="space-y-6">
    <div class="text-center">
      <h2 class="text-2xl font-bold">
        {{ mode === 'login' ? 'ログイン' : '新規登録' }}
      </h2>
      <p class="text-gray-600 dark:text-gray-400 mt-2">
        {{ mode === 'login' ? 'アカウントにログイン' : 'アカウントを作成' }}
      </p>
    </div>

    <form @submit.prevent="handleSubmit" class="space-y-4">
      <!-- Username (Register only) -->
      <div v-if="mode === 'register'">
        <label for="username" class="block text-sm font-medium mb-2">
          ユーザー名
        </label>
        <div class="relative">
          <div class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            <User :size="20" />
          </div>
          <input
            id="username"
            v-model="username"
            type="text"
            placeholder="username"
            class="input pl-10"
            required
          />
        </div>
      </div>

      <!-- Email -->
      <div>
        <label for="email" class="block text-sm font-medium mb-2">
          メールアドレス
        </label>
        <div class="relative">
          <div class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            <Mail :size="20" />
          </div>
          <input
            id="email"
            v-model="email"
            type="email"
            placeholder="email@example.com"
            class="input pl-10"
            required
          />
        </div>
      </div>

      <!-- Password -->
      <div>
        <label for="password" class="block text-sm font-medium mb-2">
          パスワード
        </label>
        <div class="relative">
          <div class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            <Lock :size="20" />
          </div>
          <input
            id="password"
            v-model="password"
            type="password"
            placeholder="••••••••"
            class="input pl-10"
            required
            minlength="6"
          />
        </div>
      </div>

      <!-- Submit Button -->
      <BaseButton
        type="submit"
        variant="primary"
        :loading="isSubmitting"
        class="w-full"
      >
        {{ mode === 'login' ? 'ログイン' : '登録' }}
      </BaseButton>
    </form>

    <!-- Toggle Mode -->
    <div class="text-center">
      <button
        @click="toggleMode"
        class="text-sm text-primary-600 dark:text-primary-400 hover:underline"
      >
        {{
          mode === 'login'
            ? 'アカウントをお持ちでない方はこちら'
            : 'すでにアカウントをお持ちの方はこちら'
        }}
      </button>
    </div>
  </div>
</template>
