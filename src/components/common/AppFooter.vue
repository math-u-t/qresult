<!--
  App Footer

  Global footer with:
  - Site links
  - Legal links
  - Copyright information
  - Social links
-->

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { Github, Twitter, Mail } from 'lucide-vue-next'

const footerLinks = {
  about: [
    { name: 'サービス概要', path: '/about' },
    { name: '採用情報', path: '/jobs' },
    { name: '開発者情報', path: '/devs' },
  ],
  support: [
    { name: 'よくある質問', path: '/faq' },
    { name: 'お問い合わせ', path: '/inquiry' },
  ],
  legal: [
    { name: '利用規約', path: '/terms' },
    { name: 'プライバシーポリシー', path: '/policy' },
  ],
}

const socialLinks = [
  { name: 'GitHub', icon: Github, url: 'https://github.com' },
  { name: 'Twitter', icon: Twitter, url: 'https://twitter.com' },
  { name: 'Email', icon: Mail, url: 'mailto:info@qresult.com' },
]
</script>

<template>
  <footer class="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 mt-auto">
    <div class="container mx-auto px-4 py-12 max-w-7xl">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
        <!-- Brand -->
        <div>
          <h2 class="text-2xl font-bold text-gradient mb-4">qresult</h2>
          <p class="text-gray-600 dark:text-gray-400 text-sm">
            匿名質問・アンケートSNS
          </p>
          <div class="flex space-x-4 mt-4">
            <a
              v-for="social in socialLinks"
              :key="social.name"
              :href="social.url"
              target="_blank"
              rel="noopener noreferrer"
              class="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              :aria-label="social.name"
            >
              <component :is="social.icon" :size="20" />
            </a>
          </div>
        </div>

        <!-- About Links -->
        <div>
          <h3 class="font-semibold mb-4 text-gray-900 dark:text-gray-100">
            qresultについて
          </h3>
          <ul class="space-y-2">
            <li v-for="link in footerLinks.about" :key="link.path">
              <RouterLink
                :to="link.path"
                class="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors text-sm"
              >
                {{ link.name }}
              </RouterLink>
            </li>
          </ul>
        </div>

        <!-- Support Links -->
        <div>
          <h3 class="font-semibold mb-4 text-gray-900 dark:text-gray-100">
            サポート
          </h3>
          <ul class="space-y-2">
            <li v-for="link in footerLinks.support" :key="link.path">
              <RouterLink
                :to="link.path"
                class="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors text-sm"
              >
                {{ link.name }}
              </RouterLink>
            </li>
          </ul>
        </div>

        <!-- Legal Links -->
        <div>
          <h3 class="font-semibold mb-4 text-gray-900 dark:text-gray-100">
            法的情報
          </h3>
          <ul class="space-y-2">
            <li v-for="link in footerLinks.legal" :key="link.path">
              <RouterLink
                :to="link.path"
                class="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors text-sm"
              >
                {{ link.name }}
              </RouterLink>
            </li>
          </ul>
        </div>
      </div>

      <!-- Copyright -->
      <div class="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700 text-center">
        <p class="text-gray-600 dark:text-gray-400 text-sm">
          © {{ new Date().getFullYear() }} qresult. All rights reserved.
        </p>
      </div>
    </div>
  </footer>
</template>
