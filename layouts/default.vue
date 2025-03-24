<template>
  <div class="min-h-screen dark:bg-gray-700" :class="{ 'dark': isDarkMode }">
    <header class="bg-white dark:bg-gray-900 shadow-sm sticky top-0 z-50">
      <div class="mx-auto p-3 flex justify-between items-center">
        <NuxtLink to="/" class="flex items-center space-x-2">
          <div class="w-10 h-10">
            <img src="~/assets/svg/capybara-logo.svg" alt="Capybara Logo" class="w-full h-full" />
          </div>
          <span class="text-xl font-bold text-gray-900 dark:text-white">Capybara Rules</span>
        </NuxtLink>
        
        <nav class="flex items-center space-x-10">
          <NuxtLink to="/" class="text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400">
            {{ locale === 'zh' ? '首页' : 'Home' }}
          </NuxtLink>
          <NuxtLink to="/rules" class="text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400">
            {{ locale === 'zh' ? '规则库' : 'Rules' }}
          </NuxtLink>
          
          <div class="flex items-center space-x-4">
            <!-- 语言切换 -->
            <div class="relative group">
              <button class="flex items-center space-x-1 text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400">
                <Icon name="heroicons:language" class="w-5 h-5" />
                <span>{{ locale === 'zh' ? '语言' : 'Language' }}</span>
              </button>
              <div class="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <button 
                  @click="changeLocale('zh')"
                  class="block w-full px-4 py-2 text-left text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  中文
                </button>
                <button 
                  @click="changeLocale('en')"
                  class="block w-full px-4 py-2 text-left text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  English
                </button>
              </div>
            </div>
            
            <!-- 主题切换 -->
            <button @click="toggleColorMode" class="text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 flex items-center">
              <Icon v-if="isDarkMode" name="heroicons:sun" class="w-5 h-5" />
              <Icon v-else name="heroicons:moon" class="w-5 h-5" />
            </button>
          </div>
        </nav>
      </div>
    </header>

    <main class="container mx-auto py-8">
      <slot />
    </main>

    <footer class="bg-gray-100 dark:bg-gray-800 py-6">
      <div class="container mx-auto text-center text-gray-600 dark:text-gray-400">
        <p>&copy; {{ new Date().getFullYear() }} Capybara Rules. All rights reserved.</p>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'

// 使用简化的主题切换方法
const isDarkMode = ref(false)

// 添加语言设置
const locale = ref('zh')

// 在客户端检查初始主题和语言
onMounted(() => {
  if (typeof window !== 'undefined') {
    // 检查sessionStorage中是否已有保存的主题设置
    const savedTheme = sessionStorage.getItem('kpbl-theme')
    if (savedTheme) {
      isDarkMode.value = savedTheme === 'dark'
    } else {
      // 如果没有保存过设置，则根据系统偏好设置默认值
      isDarkMode.value = window.matchMedia('(prefers-color-scheme: dark)').matches
      // 保存到sessionStorage
      sessionStorage.setItem('kpbl-theme', isDarkMode.value ? 'dark' : 'light')
    }
    
    // 确保DOM上的dark类与当前状态一致
    document.documentElement.classList.toggle('dark', isDarkMode.value)
    
    // 检查sessionStorage中是否已有保存的语言设置
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

function toggleColorMode() {
  isDarkMode.value = !isDarkMode.value
  
  if (typeof window !== 'undefined') {
    // 保存到sessionStorage而不是localStorage
    sessionStorage.setItem('kpbl-theme', isDarkMode.value ? 'dark' : 'light')
    document.documentElement.classList.toggle('dark', isDarkMode.value)
  }
}

// 添加语言切换功能
function changeLocale(newLocale: string) {
  if (newLocale === 'zh' || newLocale === 'en') {
    locale.value = newLocale
    
    if (typeof window !== 'undefined') {
      // 保存到sessionStorage而不是localStorage
      sessionStorage.setItem('kpbl-locale', newLocale)
      
      // 重新加载页面以确保所有组件都使用新的语言设置
      window.location.reload()
    }
  }
}
</script>

<style scoped>
.router-link-active {
  @apply text-indigo-600 dark:text-indigo-400;
}
</style> 