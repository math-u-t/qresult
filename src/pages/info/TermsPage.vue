<template>
  <div class="max-w-4xl mx-auto space-y-6">
    <div>
      <h1 class="text-3xl font-bold mb-2">利用規約</h1>
      <p class="text-gray-600 dark:text-gray-400">最終更新日: 2024年</p>
    </div>

    <BaseCard>
      <div class="prose dark:prose-invert max-w-none space-y-6">
        <section>
          <h2 class="text-xl font-bold mb-3">第1条（適用）</h2>
          <p class="text-gray-600 dark:text-gray-400">
            本規約は、本サービスの利用に関する条件を定めるものです。
            ユーザーは本規約に同意の上、本サービスを利用するものとします。
          </p>
        </section>

        <section>
          <h2 class="text-xl font-bold mb-3">第2条（利用登録）</h2>
          <p class="text-gray-600 dark:text-gray-400">
            登録希望者が当社の定める方法によって利用登録を申請し、
            当社がこれを承認することによって、利用登録が完了するものとします。
          </p>
        </section>

        <section>
          <h2 class="text-xl font-bold mb-3">第3条（禁止事項）</h2>
          <ul class="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-400">
            <li>法令または公序良俗に違反する行為</li>
            <li>犯罪行為に関連する行為</li>
            <li>本サービスの運営を妨害する行為</li>
            <li>他のユーザーに対する嫌がらせや誹謗中傷</li>
            <li>不正アクセスまたは不正な目的での利用</li>
          </ul>
        </section>

        <section>
          <h2 class="text-xl font-bold mb-3">第4条（免責事項）</h2>
          <p class="text-gray-600 dark:text-gray-400">
            当社は、本サービスに起因してユーザーに生じたあらゆる損害について、
            一切の責任を負いません。
          </p>
        </section>
      </div>
    </BaseCard>
  </div>
</template>

<script setup lang="ts">
import BaseCard from '@/components/ui/BaseCard.vue'
</script>
