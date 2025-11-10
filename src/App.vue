<!--
  Root Application Component

  Renders the appropriate layout based on route meta and handles:
  - Layout switching (default, auth, minimal)
  - Toast notifications
  - Global loading states
-->

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import DefaultLayout from './layouts/DefaultLayout.vue'
import AuthLayout from './layouts/AuthLayout.vue'
import MinimalLayout from './layouts/MinimalLayout.vue'
import ToastContainer from './components/ui/ToastContainer.vue'

const route = useRoute()

const layout = computed(() => {
  const layoutName = route.meta.layout as string || 'default'
  switch (layoutName) {
    case 'auth':
      return AuthLayout
    case 'minimal':
      return MinimalLayout
    case 'default':
    default:
      return DefaultLayout
  }
})
</script>

<template>
  <component :is="layout">
    <RouterView v-slot="{ Component }">
      <Transition name="fade" mode="out-in">
        <component :is="Component" />
      </Transition>
    </RouterView>
  </component>
  <ToastContainer />
</template>

<style>
/* Page transition animations */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
