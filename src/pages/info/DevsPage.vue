<template>
  <div class="max-w-4xl mx-auto space-y-6">
    <div>
      <h1 class="text-3xl font-bold mb-2">開発者情報</h1>
      <p class="text-gray-600 dark:text-gray-400">qresultの開発チーム</p>
    </div>

    <BaseCard>
      <h2 class="text-xl font-bold mb-4">技術スタック</h2>
      <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
        <div class="p-4 rounded-lg bg-gray-50 dark:bg-gray-700">
          <p class="font-semibold">Vue 3</p>
          <p class="text-sm text-gray-600 dark:text-gray-400">Frontend Framework</p>
        </div>
        <div class="p-4 rounded-lg bg-gray-50 dark:bg-gray-700">
          <p class="font-semibold">TypeScript</p>
          <p class="text-sm text-gray-600 dark:text-gray-400">Type Safety</p>
        </div>
        <div class="p-4 rounded-lg bg-gray-50 dark:bg-gray-700">
          <p class="font-semibold">Tailwind CSS</p>
          <p class="text-sm text-gray-600 dark:text-gray-400">Styling</p>
        </div>
        <div class="p-4 rounded-lg bg-gray-50 dark:bg-gray-700">
          <p class="font-semibold">Pinia</p>
          <p class="text-sm text-gray-600 dark:text-gray-400">State Management</p>
        </div>
        <div class="p-4 rounded-lg bg-gray-50 dark:bg-gray-700">
          <p class="font-semibold">Vite</p>
          <p class="text-sm text-gray-600 dark:text-gray-400">Build Tool</p>
        </div>
        <div class="p-4 rounded-lg bg-gray-50 dark:bg-gray-700">
          <p class="font-semibold">Vue Router</p>
          <p class="text-sm text-gray-600 dark:text-gray-400">Routing</p>
        </div>
      </div>
    </BaseCard>

    <BaseCard>
      <h2 class="text-xl font-bold mb-4">お問い合わせ</h2>
      <p class="text-gray-600 dark:text-gray-400">技術的なお問い合わせは<RouterLink to="/inquiry" class="text-primary-600 dark:text-primary-400 hover:underline">こちら</RouterLink>からお願いします。</p>
    </BaseCard>
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import BaseCard from '@/components/ui/BaseCard.vue'
</script>
