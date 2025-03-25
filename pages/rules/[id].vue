<template>
  <div v-if="rule" class="rule-detail-page">
    <div class="mb-6">
      <NuxtLink to="/rules" class="text-indigo-600 dark:text-indigo-400 hover:underline flex items-center">
        <Icon name="heroicons:arrow-left" class="w-4 h-4 mr-1" />
        {{ locale === 'zh' ? '所有规则' : 'All Rules' }}
      </NuxtLink>
    </div>
    
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
      <!-- 规则头部信息 -->
      <div class="p-6 border-b border-gray-100 dark:border-gray-700">
        <div class="flex flex-wrap gap-2 mb-4">
          <span 
            v-for="tag in rule.tags" 
            :key="tag.id" 
            class="text-xs font-medium bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300 px-2 py-1 rounded-full"
          >
            {{ tag.name }}
          </span>
        </div>
        
        <h1 class="text-2xl font-bold text-gray-900 dark:text-white mb-3">
          {{ rule.description }}
        </h1>
        
        <div class="flex justify-between items-center">
          <div class="flex items-center space-x-3">
            <img :src="rule.author.avatar" :alt="rule.author.name" class="w-8 h-8 rounded-full" />
            <span class="text-gray-600 dark:text-gray-300">{{ rule.author.name }}</span>
          </div>
          
          <div class="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
            <div class="flex items-center space-x-1">
              <Icon name="heroicons:heart" class="w-4 h-4 text-red-500" />
              <span>{{ rule.stats.likes }}</span>
            </div>
            
            <div>
              {{ formatDate(rule.publishTime) }}
            </div>
          </div>
        </div>
      </div>
      
      <!-- 规则内容 -->
      <div class="p-6 relative">
        <div class="markdown-content prose prose-indigo dark:prose-invert max-w-none">
          <FormattedContent :content="rule.content" />
        </div>
        
        <button 
          @click="copyRuleContent" 
          class="absolute top-6 right-6 text-sm text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 flex items-center bg-white dark:bg-gray-700 rounded-md px-3 py-2 shadow-sm"
          :title="locale === 'zh' ? '复制' : 'Copy'"
        >
          <Icon name="heroicons:clipboard" class="w-4 h-4 mr-1" />
          <span>{{ copyStatus }}</span>
        </button>
      </div>
    </div>
  </div>
  
  <div v-else class="flex justify-center items-center min-h-[50vh]">
    <p class="text-xl text-gray-500 dark:text-gray-400">{{ locale === 'zh' ? '加载中...' : 'Loading...' }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { getRule } from '~/utils/api'
import type { Rule } from '~/types'

definePageMeta({
  layout: 'default',
})

const route = useRoute()

const rule = ref<Rule | null>(null)
const copyStatus = ref('')
const locale = ref('zh')

onMounted(async () => {
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
    copyStatus.value = locale.value === 'zh' ? '复制' : 'Copy'
  } else {
    copyStatus.value = '复制'
  }

  // 获取规则数据
  const id = Number(route.params.id)
  if (!isNaN(id)) {
    rule.value = await getRule(id)
  }
})

// 复制规则内容
function copyRuleContent() {
  if (!rule.value) return
  
  navigator.clipboard.writeText(rule.value.content)
    .then(() => {
      copyStatus.value = locale.value === 'zh' ? '已复制' : 'Copied'
      setTimeout(() => {
        copyStatus.value = locale.value === 'zh' ? '复制' : 'Copy'
      }, 2000)
    })
    .catch(err => {
      console.error('Failed to copy content: ', err)
    })
}

// 格式化日期
function formatDate(dateString: string) {
  const date = new Date(dateString)
  return new Intl.DateTimeFormat(locale.value === 'zh' ? 'zh-CN' : 'en-US', { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  }).format(date)
}

// 更新页面标题
useHead(() => ({
  title: rule.value ? `${rule.value.description} - Capybara Rules` : 'Capybara Rules',
}))
</script>

<style scoped>
.markdown-content {
  min-height: 300px;
}
</style> 