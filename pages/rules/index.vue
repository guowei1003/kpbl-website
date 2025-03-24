<template>
  <div class="rules-page">
    <div class="page-header mb-10">
      <h1 class="text-3xl font-bold text-gray-900 dark:text-white">{{ locale === 'zh' ? '所有规则' : 'All Rules' }}</h1>
      <p class="text-lg text-gray-600 dark:text-gray-400 mt-2">
        {{ locale === 'zh' ? '搜索规则' : 'Search Rules' }}
      </p>
    </div>
    
    <div class="grid grid-cols-1 lg:grid-cols-4 gap-8">
      <!-- 左侧标签列表 -->
      <div class="lg:col-span-1 mb-8 lg:mb-0">
        <div class="sticky top-24 bg-white dark:bg-gray-800 rounded-lg shadow-md p-5">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            {{ locale === 'zh' ? '分类' : 'Categories' }}
          </h3>
          
          <div class="space-y-2">
            <button 
              v-for="tag in tags" 
              :key="tag.id"
              @click="selectTag(tag.id)"
              class="block w-full text-left px-3 py-2 rounded-md transition-colors"
              :class="selectedTagId === tag.id 
                ? 'bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300' 
                : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'"
            >
              {{ tag.name }}
            </button>
          </div>
        </div>
      </div>
      
      <!-- 右侧规则卡片列表 -->
      <div class="lg:col-span-3">
        <div v-if="loading" class="flex justify-center items-center h-64">
          <div class="text-xl text-gray-500 dark:text-gray-400">{{ locale === 'zh' ? '加载中...' : 'Loading...' }}</div>
        </div>
        
        <div v-else-if="filteredRules.length > 0" class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          <div v-for="rule in filteredRules" :key="rule.id">
            <RuleCard :rule="rule" :locale="locale" />
          </div>
        </div>
        
        <div v-else class="text-center py-16">
          <p class="text-xl text-gray-500 dark:text-gray-400">{{ locale === 'zh' ? '暂无规则' : 'No Rules Found' }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { getRules, getTags } from '~/utils/api'
import type { Rule, Tag } from '~/types'

definePageMeta({
  layout: 'default',
})

useHead({
  title: '规则库 - Capybara Rules',
})

// 数据状态
const rules = ref<Rule[]>([])
const tags = ref<Tag[]>([])
const loading = ref(true)
const selectedTagId = ref<number | null>(null)
const locale = ref('zh')

// 筛选规则
const filteredRules = computed(() => {
  if (!selectedTagId.value) return rules.value
  
  return rules.value.filter(rule => {
    return rule.tags.some(tag => tag.id === selectedTagId.value)
  })
})

// 选择标签
function selectTag(tagId: number) {
  if (selectedTagId.value === tagId) {
    selectedTagId.value = null
  } else {
    selectedTagId.value = tagId
  }
}

// 获取数据
onMounted(async () => {
  try {
    const [rulesData, tagsData] = await Promise.all([
      getRules(),
      getTags()
    ])
    
    rules.value = rulesData
    tags.value = tagsData

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
  } catch (error) {
    console.error('Failed to fetch data:', error)
  } finally {
    loading.value = false
  }
})
</script> 