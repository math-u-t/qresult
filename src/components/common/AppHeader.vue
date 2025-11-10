<!--
  App Header

  Global navigation header with:
  - Logo and branding
  - Navigation links
  - Theme toggle
  - User menu / Login button
  - Mobile hamburger menu
-->

<script setup lang="ts">
import { ref, computed } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { Menu, X, Moon, Sun, User, LogOut, Settings, Bell } from 'lucide-vue-next'
import { useAuthStore } from '@/stores/auth'
import { useThemeStore } from '@/stores/theme'
import { useNotificationStore } from '@/stores/notification'

const router = useRouter()
const authStore = useAuthStore()
const themeStore = useThemeStore()
const notificationStore = useNotificationStore()

const isMobileMenuOpen = ref(false)
const isUserMenuOpen = ref(false)

const navItems = [
  { name: 'ホーム', path: '/' },
  { name: '統計', path: '/stats' },
  { name: 'FAQ', path: '/faq' },
]

function toggleMobileMenu() {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

function toggleUserMenu() {
  isUserMenuOpen.value = !isUserMenuOpen.value
}

async function handleLogout() {
  await authStore.logout()
  isUserMenuOpen.value = false
  router.push('/login')
}

function closeMobileMenu() {
  isMobileMenuOpen.value = false
}
</script>

<template>
  <header class="sticky top-0 z-50 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700">
    <nav class="container mx-auto px-4 max-w-7xl">
      <div class="flex items-center justify-between h-16">
        <!-- Logo -->
        <RouterLink to="/" class="flex items-center space-x-2">
          <h1 class="text-2xl font-bold text-gradient">qresult</h1>
        </RouterLink>

        <!-- Desktop Navigation -->
        <div class="hidden md:flex items-center space-x-8">
          <RouterLink
            v-for="item in navItems"
            :key="item.path"
            :to="item.path"
            class="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
          >
            {{ item.name }}
          </RouterLink>
        </div>

        <!-- Right Actions -->
        <div class="flex items-center space-x-4">
          <!-- Create Post Button (Desktop) -->
          <RouterLink
            v-if="authStore.isAuthenticated"
            to="/post"
            class="hidden md:block btn btn-primary text-sm"
          >
            投稿作成
          </RouterLink>

          <!-- Theme Toggle -->
          <button
            @click="themeStore.toggleTheme"
            class="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            :aria-label="themeStore.isDark ? 'ライトモードに切り替え' : 'ダークモードに切り替え'"
          >
            <Sun v-if="themeStore.isDark" :size="20" />
            <Moon v-else :size="20" />
          </button>

          <!-- Notifications (if authenticated) -->
          <div v-if="authStore.isAuthenticated" class="relative hidden md:block">
            <button
              class="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors relative"
              aria-label="通知"
            >
              <Bell :size="20" />
              <span
                v-if="notificationStore.unreadCount > 0"
                class="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"
              />
            </button>
          </div>

          <!-- User Menu or Login Button (Desktop) -->
          <div v-if="authStore.isAuthenticated" class="relative hidden md:block">
            <button
              @click="toggleUserMenu"
              class="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <User :size="20" />
            </button>

            <!-- User Dropdown -->
            <Transition name="fade">
              <div
                v-if="isUserMenuOpen"
                class="absolute right-0 mt-2 w-48 card py-2"
                @click="isUserMenuOpen = false"
              >
                <RouterLink
                  to="/profile"
                  class="flex items-center space-x-2 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <User :size="16" />
                  <span>プロフィール</span>
                </RouterLink>
                <button
                  @click="handleLogout"
                  class="flex items-center space-x-2 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors w-full text-left"
                >
                  <LogOut :size="16" />
                  <span>ログアウト</span>
                </button>
              </div>
            </Transition>
          </div>
          <RouterLink
            v-else
            to="/login"
            class="hidden md:block btn btn-outline text-sm"
          >
            ログイン
          </RouterLink>

          <!-- Mobile Menu Button -->
          <button
            @click="toggleMobileMenu"
            class="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            aria-label="メニュー"
          >
            <Menu v-if="!isMobileMenuOpen" :size="24" />
            <X v-else :size="24" />
          </button>
        </div>
      </div>

      <!-- Mobile Menu -->
      <Transition name="slide-down">
        <div v-if="isMobileMenuOpen" class="md:hidden py-4 border-t border-gray-200 dark:border-gray-700">
          <div class="flex flex-col space-y-4">
            <RouterLink
              v-for="item in navItems"
              :key="item.path"
              :to="item.path"
              @click="closeMobileMenu"
              class="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
            >
              {{ item.name }}
            </RouterLink>

            <div v-if="authStore.isAuthenticated" class="pt-4 border-t border-gray-200 dark:border-gray-700">
              <RouterLink
                to="/post"
                @click="closeMobileMenu"
                class="block mb-2 btn btn-primary w-full text-center"
              >
                投稿作成
              </RouterLink>
              <RouterLink
                to="/profile"
                @click="closeMobileMenu"
                class="block text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors mb-2"
              >
                プロフィール
              </RouterLink>
              <button
                @click="handleLogout"
                class="text-gray-700 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 transition-colors"
              >
                ログアウト
              </button>
            </div>
            <RouterLink
              v-else
              to="/login"
              @click="closeMobileMenu"
              class="btn btn-outline w-full text-center"
            >
              ログイン
            </RouterLink>
          </div>
        </div>
      </Transition>
    </nav>
  </header>
</template>

<style scoped>
.slide-down-enter-active,
.slide-down-leave-active {
  transition: all 0.3s ease;
}

.slide-down-enter-from {
  transform: translateY(-10px);
  opacity: 0;
}

.slide-down-leave-to {
  transform: translateY(-10px);
  opacity: 0;
}
</style>
