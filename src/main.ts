/**
 * Application Entry Point
 *
 * Initializes the Vue application with:
 * - Router for navigation
 * - Pinia for state management
 * - Global styles
 * - Authentication state
 */

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import './styles/main.css'

// Create Vue app
const app = createApp(App)

// Create Pinia store
const pinia = createPinia()

// Use plugins
app.use(pinia)
app.use(router)

// Initialize auth state
import { useAuthStore } from './stores/auth'
const authStore = useAuthStore()
authStore.initAuth()

// Mount app
app.mount('#app')
