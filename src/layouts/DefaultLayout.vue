<!--
  Default Layout

  Main layout with header and footer for most pages.
  Includes:
  - Navigation header
  - Main content area
  - Footer
-->

<script setup lang="ts">
import AppHeader from '@/components/common/AppHeader.vue'
import AppFooter from '@/components/common/AppFooter.vue'
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <AppHeader />
    <main class="flex-1 container mx-auto px-4 py-8 max-w-7xl">
      <slot />
    </main>
    <AppFooter />
  </div>
</template>
