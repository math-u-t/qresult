/**
 * Theme Store
 *
 * Manages the application theme (light/dark mode).
 * Persists user preference in localStorage and applies theme to DOM.
 *
 * @example
 * ```ts
 * const theme = useThemeStore()
 * theme.toggleTheme()
 * theme.setTheme('dark')
 * ```
 */

import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

type Theme = 'light' | 'dark' | 'system'

export const useThemeStore = defineStore('theme', () => {
  // State
  const theme = ref<Theme>('system')
  const isDark = ref(false)

  /**
   * Initialize theme from localStorage or system preference
   */
  function initTheme() {
    const savedTheme = localStorage.getItem('theme') as Theme | null
    if (savedTheme && ['light', 'dark', 'system'].includes(savedTheme)) {
      theme.value = savedTheme
    }
    applyTheme()
  }

  /**
   * Apply theme to document root element
   */
  function applyTheme() {
    const root = document.documentElement

    if (theme.value === 'system') {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      isDark.value = prefersDark
    } else {
      isDark.value = theme.value === 'dark'
    }

    if (isDark.value) {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }
  }

  /**
   * Set theme and persist to localStorage
   * @param newTheme - Theme to apply
   */
  function setTheme(newTheme: Theme) {
    theme.value = newTheme
    localStorage.setItem('theme', newTheme)
    applyTheme()
  }

  /**
   * Toggle between light and dark modes
   */
  function toggleTheme() {
    const newTheme = isDark.value ? 'light' : 'dark'
    setTheme(newTheme)
  }

  // Watch for system theme changes
  if (typeof window !== 'undefined') {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    mediaQuery.addEventListener('change', () => {
      if (theme.value === 'system') {
        applyTheme()
      }
    })
  }

  return {
    theme,
    isDark,
    initTheme,
    setTheme,
    toggleTheme,
  }
})
