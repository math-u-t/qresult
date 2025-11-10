/**
 * Vite Configuration
 *
 * Configures the Vite build tool for Vue 3 development.
 * - Vue plugin for Single File Component support
 * - Path aliases for cleaner imports
 * - Server configuration
 */

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    port: 3000,
    open: true
  }
})
