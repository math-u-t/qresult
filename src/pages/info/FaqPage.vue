<!--
  FAQ Page
-->

<script setup lang="ts">
import { ref } from 'vue'
import { ChevronDown } from 'lucide-vue-next'
import BaseCard from '@/components/ui/BaseCard.vue'

const faqs = [
  {
    question: 'qresultとは何ですか？',
    answer: 'qresultは匿名で質問やアンケートを作成・回答できるSNSプラットフォームです。',
  },
  {
    question: '無料で利用できますか？',
    answer: 'はい、qresultは完全無料でご利用いただけます。',
  },
  {
    question: '匿名性は保証されますか？',
    answer: '回答は完全匿名で行われ、個人を特定する情報は公開されません。',
  },
  {
    question: '質問の公開期間はどのくらいですか？',
    answer: '1日から30日の間で設定できます。期間終了後も結果は閲覧可能です。',
  },
]

const openIndex = ref<number | null>(null)

function toggleFaq(index: number) {
  openIndex.value = openIndex.value === index ? null : index
}
</script>

<template>
  <div class="max-w-3xl mx-auto space-y-6">
    <div>
      <h1 class="text-3xl font-bold mb-2">よくある質問</h1>
      <p class="text-gray-600 dark:text-gray-400">
        qresultに関するよくある質問と回答
      </p>
    </div>

    <div class="space-y-4">
      <BaseCard
        v-for="(faq, index) in faqs"
        :key="index"
        padding="none"
      >
        <button
          @click="toggleFaq(index)"
          class="w-full p-6 text-left flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
        >
          <h3 class="font-semibold pr-4">{{ faq.question }}</h3>
          <ChevronDown
            :size="20"
            :class="['transition-transform', openIndex === index ? 'rotate-180' : '']"
          />
        </button>
        <Transition name="slide-down">
          <div v-if="openIndex === index" class="px-6 pb-6">
            <p class="text-gray-600 dark:text-gray-400">{{ faq.answer }}</p>
          </div>
        </Transition>
      </BaseCard>
    </div>
  </div>
</template>
