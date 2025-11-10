<!--
  Base Modal Component

  Reusable modal dialog.

  Props:
  - modelValue: boolean (v-model)
  - title: string
  - size: 'sm' | 'md' | 'lg' | 'xl'
  - showClose: boolean

  Emits:
  - update:modelValue
  - close
-->

<script setup lang="ts">
import { computed, watch } from 'vue'
import { X } from 'lucide-vue-next'

interface Props {
  modelValue: boolean
  title?: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
  showClose?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  size: 'md',
  showClose: true,
})

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  'close': []
}>()

const sizeClasses = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-xl',
}

const modalClasses = computed(() => ['w-full', sizeClasses[props.size]])

function close() {
  emit('update:modelValue', false)
  emit('close')
}

function handleBackdropClick(event: MouseEvent) {
  if (event.target === event.currentTarget) {
    close()
  }
}

// Prevent body scroll when modal is open
watch(() => props.modelValue, (isOpen) => {
  if (isOpen) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
})
</script>

<template>
  <Teleport to="body">
    <Transition name="modal">
      <div
        v-if="modelValue"
        class="modal-backdrop"
        @click="handleBackdropClick"
      >
        <div :class="modalClasses" class="card p-0 m-4 animate-scale-up">
          <!-- Header -->
          <div
            v-if="title || showClose"
            class="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700"
          >
            <h3 v-if="title" class="text-xl font-semibold">
              {{ title }}
            </h3>
            <button
              v-if="showClose"
              @click="close"
              class="p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              aria-label="閉じる"
            >
              <X :size="20" />
            </button>
          </div>

          <!-- Content -->
          <div class="p-6">
            <slot />
          </div>

          <!-- Footer -->
          <div
            v-if="$slots.footer"
            class="p-6 border-t border-gray-200 dark:border-gray-700"
          >
            <slot name="footer" />
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-active .card,
.modal-leave-active .card {
  transition: transform 0.3s ease;
}

.modal-enter-from .card,
.modal-leave-to .card {
  transform: scale(0.9);
}
</style>
