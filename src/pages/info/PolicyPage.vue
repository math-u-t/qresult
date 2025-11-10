<template>
  <div class="max-w-4xl mx-auto space-y-6">
    <div>
      <h1 class="text-3xl font-bold mb-2">プライバシーポリシー</h1>
      <p class="text-gray-600 dark:text-gray-400">最終更新日: 2024年</p>
    </div>

    <BaseCard>
      <div class="prose dark:prose-invert max-w-none space-y-6">
        <section>
          <h2 class="text-xl font-bold mb-3">1. 収集する情報</h2>
          <p class="text-gray-600 dark:text-gray-400">
            当社は、サービス提供のために以下の情報を収集します：
          </p>
          <ul class="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-400">
            <li>メールアドレス</li>
            <li>ユーザー名</li>
            <li>利用履歴</li>
            <li>Cookie情報</li>
          </ul>
        </section>

        <section>
          <h2 class="text-xl font-bold mb-3">2. 情報の利用目的</h2>
          <p class="text-gray-600 dark:text-gray-400">
            収集した情報は以下の目的で利用します：
          </p>
          <ul class="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-400">
            <li>サービスの提供・運営</li>
            <li>ユーザーサポート</li>
            <li>サービスの改善</li>
            <li>利用規約違反への対応</li>
          </ul>
        </section>

        <section>
          <h2 class="text-xl font-bold mb-3">3. 情報の第三者提供</h2>
          <p class="text-gray-600 dark:text-gray-400">
            当社は、ユーザーの同意なく個人情報を第三者に提供することはありません。
            ただし、法令に基づく場合を除きます。
          </p>
        </section>

        <section>
          <h2 class="text-xl font-bold mb-3">4. セキュリティ</h2>
          <p class="text-gray-600 dark:text-gray-400">
            当社は、個人情報の保護のために適切なセキュリティ対策を実施しています。
          </p>
        </section>
      </div>
    </BaseCard>
  </div>
</template>

<script setup lang="ts">
import BaseCard from '@/components/ui/BaseCard.vue'
</script>
