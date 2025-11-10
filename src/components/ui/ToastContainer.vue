<!--
  Toast Container

  Displays toast notifications from the notification store.
  Supports different types: success, error, warning, info.
-->

<script setup lang="ts">
import { useNotificationStore } from '@/stores/notification'
import { CheckCircle, XCircle, AlertTriangle, Info, X } from 'lucide-vue-next'
import type { Toast } from '@/types'

const notificationStore = useNotificationStore()

const iconMap = {
  success: CheckCircle,
  error: XCircle,
  warning: AlertTriangle,
  info: Info,
}

const colorMap = {
  success: 'bg-green-500',
  error: 'bg-red-500',
  warning: 'bg-yellow-500',
  info: 'bg-blue-500',
}

function handleClose(id: string) {
  notificationStore.removeToast(id)
}
</script>

<template>
  <div class="fixed bottom-4 right-4 z-50 space-y-2 max-w-sm w-full px-4">
    <TransitionGroup name="toast">
      <div
        v-for="toast in notificationStore.toasts"
        :key="toast.id"
        class="card p-4 flex items-start space-x-3 shadow-lg"
      >
        <div :class="[colorMap[toast.type], 'p-1 rounded-lg text-white']">
          <component :is="iconMap[toast.type]" :size="20" />
        </div>
        <p class="flex-1 text-sm text-gray-900 dark:text-gray-100">
          {{ toast.message }}
        </p>
        <button
          @click="handleClose(toast.id)"
          class="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
        >
          <X :size="16" />
        </button>
      </div>
    </TransitionGroup>
  </div>
</template>

<style scoped>
.toast-enter-active,
.toast-leave-active {
  transition: all 0.3s ease;
}

.toast-enter-from {
  opacity: 0;
  transform: translateX(100%);
}

.toast-leave-to {
  opacity: 0;
  transform: translateX(50%);
}

.toast-move {
  transition: transform 0.3s ease;
}
</style>
