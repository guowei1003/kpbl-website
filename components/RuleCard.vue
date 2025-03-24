<template>
  <NuxtLink :to="`/rules/${rule.id}`" class="block">
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-shadow p-5 h-full border border-transparent hover:border-indigo-100 dark:hover:border-indigo-900">
      <div class="flex flex-wrap gap-2 mb-3">
        <span 
          v-for="tag in rule.tags"
          :key="tag.id"
          class="text-xs font-medium bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300 px-2 py-1 rounded-full"
        >
          {{ tag.name }}
        </span>
      </div>
      
      <h3 class="font-semibold text-gray-900 dark:text-white text-lg mb-3 line-clamp-2">
        {{ rule.description }}
      </h3>
      
      <p class="text-gray-600 dark:text-gray-300 text-sm mb-5 line-clamp-3">
        {{ rule.summary }}
      </p>
      
      <div class="flex justify-between items-center mt-auto">
        <div class="flex items-center space-x-2">
          <img :src="rule.author.avatar" :alt="rule.author.name" class="w-6 h-6 rounded-full">
          <span class="text-sm text-gray-500 dark:text-gray-400">{{ rule.author.name }}</span>
        </div>
        
        <div class="flex items-center space-x-3 text-xs text-gray-500 dark:text-gray-400">
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
  </NuxtLink>
</template>

<script setup lang="ts">
import type { Rule } from '~/types'

const props = defineProps<{
  rule: Rule,
  locale?: string
}>()

// 格式化日期
function formatDate(dateString: string) {
  const date = new Date(dateString)
  return new Intl.DateTimeFormat(props.locale === 'en' ? 'en-US' : 'zh-CN', { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  }).format(date)
}
</script>

<style scoped>
.rule-card {
  transition: transform 0.2s, box-shadow 0.2s;
}

.rule-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
}

.markdown-content {
  scrollbar-width: thin;
}

.markdown-content::-webkit-scrollbar {
  width: 4px;
}

.markdown-content::-webkit-scrollbar-track {
  background: transparent;
}

.markdown-content::-webkit-scrollbar-thumb {
  background: rgba(100, 100, 100, 0.4);
  border-radius: 2px;
}
</style> 