<template>
  <div class="max-w-4xl mx-auto space-y-6">
    <div>
      <h1 class="text-3xl font-bold mb-2">採用情報</h1>
      <p class="text-gray-600 dark:text-gray-400">qresultで一緒に働きませんか</p>
    </div>

    <BaseCard>
      <h2 class="text-xl font-bold mb-4">現在の募集職種</h2>
      <div class="space-y-4">
        <div class="p-4 rounded-lg border-2 border-gray-200 dark:border-gray-700">
          <h3 class="font-bold mb-2">フロントエンドエンジニア</h3>
          <p class="text-sm text-gray-600 dark:text-gray-400 mb-3">Vue.js/TypeScriptを使った開発経験者歓迎</p>
          <p class="text-sm"><span class="font-semibold">勤務地:</span> リモート可</p>
        </div>
        <div class="p-4 rounded-lg border-2 border-gray-200 dark:border-gray-700">
          <h3 class="font-bold mb-2">バックエンドエンジニア</h3>
          <p class="text-sm text-gray-600 dark:text-gray-400 mb-3">Node.js/Go経験者歓迎</p>
          <p class="text-sm"><span class="font-semibold">勤務地:</span> リモート可</p>
        </div>
      </div>
    </BaseCard>

    <BaseCard>
      <h2 class="text-xl font-bold mb-4">応募方法</h2>
      <p class="text-gray-600 dark:text-gray-400">ご興味をお持ちの方は<RouterLink to="/inquiry" class="text-primary-600 dark:text-primary-400 hover:underline">お問い合わせフォーム</RouterLink>からご連絡ください。</p>
    </BaseCard>
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import BaseCard from '@/components/ui/BaseCard.vue'
</script>
