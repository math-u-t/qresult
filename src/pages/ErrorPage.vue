<!--
  Error Page

  404 and other error states
-->

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { Home, ArrowLeft } from 'lucide-vue-next'
import BaseButton from '@/components/ui/BaseButton.vue'
</script>

<template>
  <div class="text-center px-4">
    <div class="mb-8">
      <h1 class="text-9xl font-bold text-gradient">404</h1>
      <h2 class="text-3xl font-bold mt-4 mb-2">ページが見つかりません</h2>
      <p class="text-gray-600 dark:text-gray-400">
        お探しのページは存在しないか、移動した可能性があります
      </p>
    </div>

    <div class="flex flex-col sm:flex-row gap-4 justify-center">
      <RouterLink to="/">
        <BaseButton variant="primary">
          <Home :size="18" class="mr-2" />
          ホームに戻る
        </BaseButton>
      </RouterLink>
      <BaseButton variant="outline" @click="$router.back()">
        <ArrowLeft :size="18" class="mr-2" />
        前のページに戻る
      </BaseButton>
    </div>
  </div>
</template>
