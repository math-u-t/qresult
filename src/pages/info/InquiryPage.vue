<template>
  <div class="max-w-2xl mx-auto space-y-6">
    <div>
      <h1 class="text-3xl font-bold mb-2">お問い合わせ</h1>
      <p class="text-gray-600 dark:text-gray-400">ご質問・ご要望はこちらから</p>
    </div>

    <BaseCard>
      <form class="space-y-4">
        <div>
          <label class="block text-sm font-medium mb-2">お名前</label>
          <input type="text" class="input" placeholder="山田太郎" required />
        </div>
        <div>
          <label class="block text-sm font-medium mb-2">メールアドレス</label>
          <input type="email" class="input" placeholder="email@example.com" required />
        </div>
        <div>
          <label class="block text-sm font-medium mb-2">件名</label>
          <input type="text" class="input" placeholder="お問い合わせ内容" required />
        </div>
        <div>
          <label class="block text-sm font-medium mb-2">メッセージ</label>
          <textarea rows="6" class="input resize-none" placeholder="詳細をお書きください" required />
        </div>
        <BaseButton type="submit" variant="primary" class="w-full">送信</BaseButton>
      </form>
    </BaseCard>
  </div>
</template>

<script setup lang="ts">
import BaseCard from '@/components/ui/BaseCard.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
</script>
