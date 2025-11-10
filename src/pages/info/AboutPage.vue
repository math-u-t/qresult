<template>
  <div class="max-w-4xl mx-auto space-y-8">
    <div class="text-center">
      <h1 class="text-4xl font-bold text-gradient mb-4">qresult</h1>
      <p class="text-xl text-gray-600 dark:text-gray-400">匿名質問・アンケートSNS</p>
    </div>

    <BaseCard>
      <h2 class="text-2xl font-bold mb-4">サービス概要</h2>
      <div class="prose dark:prose-invert max-w-none">
        <p>qresultは、誰でも簡単に質問やアンケートを作成し、匿名で回答を集められるプラットフォームです。</p>
        <p>ユーザーのプライバシーを最優先に考え、完全匿名での参加が可能です。</p>
      </div>
    </BaseCard>

    <BaseCard>
      <h2 class="text-2xl font-bold mb-4">主な機能</h2>
      <ul class="space-y-3">
        <li class="flex items-start space-x-3">
          <span class="text-primary-600 dark:text-primary-400">✓</span>
          <span>簡単な質問・アンケート作成</span>
        </li>
        <li class="flex items-start space-x-3">
          <span class="text-primary-600 dark:text-primary-400">✓</span>
          <span>完全匿名での回答</span>
        </li>
        <li class="flex items-start space-x-3">
          <span class="text-primary-600 dark:text-primary-400">✓</span>
          <span>リアルタイム結果表示</span>
        </li>
        <li class="flex items-start space-x-3">
          <span class="text-primary-600 dark:text-primary-400">✓</span>
          <span>カテゴリ別分類</span>
        </li>
      </ul>
    </BaseCard>
  </div>
</template>

<script setup lang="ts">
import BaseCard from '@/components/ui/BaseCard.vue'
</script>
