<!--
  Base Card Component

  Reusable card container with optional hover effect.

  Props:
  - hover: Enable hover effect
  - padding: 'none' | 'sm' | 'md' | 'lg'
-->

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  hover?: boolean
  padding?: 'none' | 'sm' | 'md' | 'lg'
}

const props = withDefaults(defineProps<Props>(), {
  hover: false,
  padding: 'md',
})

const cardClasses = computed(() => {
  const base = 'card'
  const hoverClass = props.hover ? 'card-hover cursor-pointer' : ''

  const paddings = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  }

  return [base, hoverClass, paddings[props.padding]]
})
</script>

<template>
  <div :class="cardClasses">
    <slot />
  </div>
</template>
