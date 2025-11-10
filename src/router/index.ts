/**
 * Vue Router Configuration
 *
 * Defines all application routes with:
 * - Route guards for authentication
 * - Meta information for page titles
 * - Lazy loading for code splitting
 * - Transition animations
 *
 * @example
 * ```ts
 * import router from '@/router'
 * app.use(router)
 * ```
 */

import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useThemeStore } from '@/stores/theme'

const routes: RouteRecordRaw[] = [
  // Main pages
  {
    path: '/',
    name: 'home',
    component: () => import('@/pages/main/HomePage.vue'),
    meta: {
      title: 'ホーム - qresult',
      layout: 'default',
    },
  },
  {
    path: '/post',
    name: 'post-create',
    component: () => import('@/pages/main/PostCreatePage.vue'),
    meta: {
      title: '投稿作成 - qresult',
      layout: 'default',
      requiresAuth: true,
    },
  },
  {
    path: '/post/:id',
    name: 'post-detail',
    component: () => import('@/pages/main/PostDetailPage.vue'),
    meta: {
      title: '投稿詳細 - qresult',
      layout: 'default',
    },
  },
  {
    path: '/profile',
    name: 'profile',
    component: () => import('@/pages/main/ProfilePage.vue'),
    meta: {
      title: 'プロフィール - qresult',
      layout: 'default',
      requiresAuth: true,
    },
  },
  {
    path: '/stats',
    name: 'stats',
    component: () => import('@/pages/main/StatsPage.vue'),
    meta: {
      title: '統計・トレンド - qresult',
      layout: 'default',
    },
  },

  // Auth pages
  {
    path: '/login',
    name: 'login',
    component: () => import('@/pages/auth/LoginPage.vue'),
    meta: {
      title: 'ログイン - qresult',
      layout: 'auth',
    },
  },

  // Info pages
  {
    path: '/faq',
    name: 'faq',
    component: () => import('@/pages/info/FaqPage.vue'),
    meta: {
      title: 'よくある質問 - qresult',
      layout: 'default',
    },
  },
  {
    path: '/inquiry',
    name: 'inquiry',
    component: () => import('@/pages/info/InquiryPage.vue'),
    meta: {
      title: 'お問い合わせ - qresult',
      layout: 'default',
    },
  },
  {
    path: '/devs',
    name: 'devs',
    component: () => import('@/pages/info/DevsPage.vue'),
    meta: {
      title: '開発者情報 - qresult',
      layout: 'default',
    },
  },
  {
    path: '/jobs',
    name: 'jobs',
    component: () => import('@/pages/info/JobsPage.vue'),
    meta: {
      title: '採用情報 - qresult',
      layout: 'default',
    },
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('@/pages/info/AboutPage.vue'),
    meta: {
      title: 'サービス概要 - qresult',
      layout: 'default',
    },
  },
  {
    path: '/policy',
    name: 'policy',
    component: () => import('@/pages/info/PolicyPage.vue'),
    meta: {
      title: 'プライバシーポリシー - qresult',
      layout: 'default',
    },
  },
  {
    path: '/terms',
    name: 'terms',
    component: () => import('@/pages/info/TermsPage.vue'),
    meta: {
      title: '利用規約 - qresult',
      layout: 'default',
    },
  },

  // Error page
  {
    path: '/error',
    name: 'error',
    component: () => import('@/pages/ErrorPage.vue'),
    meta: {
      title: 'エラー - qresult',
      layout: 'minimal',
    },
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    redirect: '/error',
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0, behavior: 'smooth' }
    }
  },
})

/**
 * Global navigation guard for authentication
 */
router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore()
  const themeStore = useThemeStore()

  // Initialize theme on first navigation
  if (!from.name) {
    themeStore.initTheme()
  }

  // Check authentication requirement
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next({
      name: 'login',
      query: { redirect: to.fullPath },
    })
    return
  }

  // Redirect authenticated users away from login page
  if (to.name === 'login' && authStore.isAuthenticated) {
    next({ name: 'home' })
    return
  }

  // Update document title
  if (to.meta.title) {
    document.title = to.meta.title as string
  }

  next()
})

/**
 * Global after hook for analytics, etc.
 */
router.afterEach((to, from) => {
  // TODO: Track page view analytics
  // trackPageView(to.path)
})

export default router
