<template>
  <div class="min-h-[80vh] flex flex-col">
    <!-- 顶部英雄区 -->
    <section class="py-16 md:py-24 flex flex-col items-center justify-center relative overflow-hidden">
      <div class="absolute w-full h-full top-0 left-0 z-0 bg-gradient-to-b from-indigo-50 to-purple-50 dark:from-gray-900 dark:to-gray-800"></div>
      
      <div class="container relative z-10 text-center">
        <h1 class="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
          Capybara Rules
        </h1>
        <p class="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-10 max-w-3xl mx-auto">
          {{ locale === 'zh' ? '一个分享和发现各种规则的平台' : 'A platform to share and discover various rules' }}
        </p>
        <NuxtLink to="/rules" class="btn btn-primary text-lg px-8 py-3">
          {{ locale === 'zh' ? '浏览规则库' : 'Browse Rules' }}
        </NuxtLink>
      </div>
      
      <!-- 动画卡皮巴拉 -->
      <div class="w-full max-w-3xl mx-auto mt-16">
        <CapybaraAnimation />
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

definePageMeta({
  layout: 'default',
})

useHead({
  title: 'Capybara Rules - 卡皮巴拉规则分享平台',
})

// 添加语言设置
const locale = ref('zh')

// 在客户端检查语言
onMounted(() => {
  // 获取语言设置
  if (typeof window !== 'undefined') {
    const savedLocale = sessionStorage.getItem('kpbl-locale')
    if (savedLocale === 'zh' || savedLocale === 'en') {
      locale.value = savedLocale
    } else {
      // 如果没有保存过设置，则根据浏览器语言设置默认值
      const browserLang = navigator.language.toLowerCase()
      locale.value = browserLang.includes('zh') ? 'zh' : 'en'
      // 保存到sessionStorage
      sessionStorage.setItem('kpbl-locale', locale.value)
    }
  }
})
</script> 