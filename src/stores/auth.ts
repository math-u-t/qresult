/**
 * Authentication Store
 *
 * Manages user authentication state, login/logout operations,
 * and user profile data.
 *
 * @example
 * ```ts
 * const auth = useAuthStore()
 * await auth.login(email, password)
 * await auth.logout()
 * const user = auth.currentUser
 * ```
 */

import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { User } from '@/types'

export const useAuthStore = defineStore('auth', () => {
  // State
  const currentUser = ref<User | null>(null)
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  // Getters
  const isAuthenticated = computed(() => currentUser.value !== null)
  const userId = computed(() => currentUser.value?.id)

  /**
   * Initialize auth state from stored token
   */
  async function initAuth() {
    const token = localStorage.getItem('auth_token')
    if (token) {
      try {
        isLoading.value = true
        // TODO: Fetch user profile from API
        // const user = await fetchUserProfile(token)
        // currentUser.value = user

        // Mock user for now
        currentUser.value = {
          id: '1',
          username: 'demo_user',
          email: 'demo@qresult.com',
          createdAt: new Date().toISOString(),
          settings: {
            theme: 'system',
            notifications: {
              email: true,
              push: true,
              answers: true,
              comments: true,
            },
            privacy: {
              showProfile: true,
              showHistory: false,
            },
          },
        }
      } catch (err) {
        console.error('Failed to initialize auth:', err)
        localStorage.removeItem('auth_token')
      } finally {
        isLoading.value = false
      }
    }
  }

  /**
   * Login user with email and password
   * @param email - User email
   * @param password - User password
   */
  async function login(email: string, password: string): Promise<boolean> {
    try {
      isLoading.value = true
      error.value = null

      // TODO: Call login API
      // const response = await apiLogin(email, password)
      // localStorage.setItem('auth_token', response.token)
      // currentUser.value = response.user

      // Mock login for now
      localStorage.setItem('auth_token', 'mock_token_' + Date.now())
      currentUser.value = {
        id: '1',
        username: email.split('@')[0] ?? 'user',
        email,
        createdAt: new Date().toISOString(),
        settings: {
          theme: 'system',
          notifications: {
            email: true,
            push: true,
            answers: true,
            comments: true,
          },
          privacy: {
            showProfile: true,
            showHistory: false,
          },
        },
      }

      return true
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Login failed'
      return false
    } finally {
      isLoading.value = false
    }
  }

  /**
   * Register new user
   * @param email - User email
   * @param username - Username
   * @param password - User password
   */
  async function register(
    email: string,
    username: string,
    password: string
  ): Promise<boolean> {
    try {
      isLoading.value = true
      error.value = null

      // TODO: Call register API
      // const response = await apiRegister(email, username, password)
      // localStorage.setItem('auth_token', response.token)
      // currentUser.value = response.user

      // Mock register for now
      localStorage.setItem('auth_token', 'mock_token_' + Date.now())
      currentUser.value = {
        id: Date.now().toString(),
        username,
        email,
        createdAt: new Date().toISOString(),
        settings: {
          theme: 'system',
          notifications: {
            email: true,
            push: true,
            answers: true,
            comments: true,
          },
          privacy: {
            showProfile: true,
            showHistory: false,
          },
        },
      }

      return true
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Registration failed'
      return false
    } finally {
      isLoading.value = false
    }
  }

  /**
   * Logout current user
   */
  async function logout() {
    try {
      isLoading.value = true
      // TODO: Call logout API
      // await apiLogout()

      localStorage.removeItem('auth_token')
      currentUser.value = null
      error.value = null
    } catch (err) {
      console.error('Logout error:', err)
    } finally {
      isLoading.value = false
    }
  }

  /**
   * Update user profile
   * @param updates - Partial user data to update
   */
  async function updateProfile(updates: Partial<User>): Promise<boolean> {
    if (!currentUser.value) return false

    try {
      isLoading.value = true
      error.value = null

      // TODO: Call update profile API
      // const updated = await apiUpdateProfile(updates)
      // currentUser.value = updated

      // Mock update for now
      currentUser.value = { ...currentUser.value, ...updates }

      return true
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Update failed'
      return false
    } finally {
      isLoading.value = false
    }
  }

  return {
    currentUser,
    isLoading,
    error,
    isAuthenticated,
    userId,
    initAuth,
    login,
    register,
    logout,
    updateProfile,
  }
})
