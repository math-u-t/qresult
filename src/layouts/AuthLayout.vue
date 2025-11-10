<!--
  Auth Layout

  Simplified layout for authentication pages (login, register).
  Features a centered card design with branding.
-->

<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-gray-900 dark:to-gray-800 px-4">
    <div class="w-full max-w-md">
      <div class="text-center mb-8">
        <RouterLink to="/" class="inline-block">
          <h1 class="text-4xl font-bold text-gradient">qresult</h1>
        </RouterLink>
        <p class="mt-2 text-gray-600 dark:text-gray-400">
          匿名質問・アンケートSNS
        </p>
      </div>

      <div class="card p-8 animate-slide-up">
        <slot />
      </div>

      <div class="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
        <RouterLink to="/terms" class="hover:text-primary-600 dark:hover:text-primary-400">
          利用規約
        </RouterLink>
        <span class="mx-2">·</span>
        <RouterLink to="/policy" class="hover:text-primary-600 dark:hover:text-primary-400">
          プライバシーポリシー
        </RouterLink>
      </div>
    </div>
  </div>
</template>
