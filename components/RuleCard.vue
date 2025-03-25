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
      
      <div class="relative">
        <div 
          class="code-content-area dark:text-gray-400 bg-gray-50 dark:bg-gray-700 rounded-md p-4 h-[500px] overflow-auto mb-5"
          @dblclick="selectContent"
        >
          <FormattedContent :content="rule.content" />
        </div>
        
        <Icon name="heroicons:clipboard-document"
          @click.prevent="copyContent"
          class="absolute w-6 h-6 top-2 right-3 p-2 bg-white dark:bg-gray-500 rounded-md shadow-sm text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors z-10"
          :title="locale === 'zh' ? '复制内容' : 'Copy Content'"
          />
        
        <div 
          v-if="showCopyMessage" 
          class="copy-message fixed top-20 right-8 bg-indigo-600 text-white px-3 py-2 rounded-md shadow-lg z-50"
        >
          {{ locale === 'zh' ? '已复制到剪贴板' : 'Copied to clipboard' }}
        </div>
      </div>
      
      <h5 class="font-semibold text-gray-900 dark:text-white text-xs mb-3 line-clamp-2">
        {{ rule.description }}
      </h5>
      
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
import { ref } from 'vue'
import type { Rule } from '~/types'

const props = defineProps<{
  rule: Rule,
  locale?: string
}>()

const showCopyMessage = ref(false)

// 格式化日期
function formatDate(dateString: string) {
  const date = new Date(dateString)
  return new Intl.DateTimeFormat(props.locale === 'en' ? 'en-US' : 'zh-CN', { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  }).format(date)
}

// 双击选中内容
function selectContent(event: MouseEvent) {
  const selection = window.getSelection()
  const range = document.createRange()
  
  if (event.target instanceof Node) {
    const container = (event.currentTarget as HTMLElement)
    range.selectNodeContents(container)
    selection?.removeAllRanges()
    selection?.addRange(range)
  }
}

// 复制内容
function copyContent(event: MouseEvent) {
  event.preventDefault()
  event.stopPropagation()
  
  if (navigator.clipboard) {
    navigator.clipboard.writeText(props.rule.content)
      .then(() => {
        showCopyMessage.value = true
        setTimeout(() => {
          showCopyMessage.value = false
        }, 2000)
      })
      .catch(err => {
        console.error('复制失败:', err)
      })
  }
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

.code-content-area {
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
  font-size: 0.9em;
  white-space: pre-wrap;
  word-break: break-word;
  scrollbar-width: thin;
  scrollbar-color: rgba(100, 100, 100, 0.4) transparent;
}

.code-content-area::-webkit-scrollbar {
  width: 4px;
}

.code-content-area::-webkit-scrollbar-track {
  background: transparent;
}

.code-content-area::-webkit-scrollbar-thumb {
  background: rgba(100, 100, 100, 0.4);
  border-radius: 2px;
}

.copy-message {
  animation: fadeInOut 2s ease-in-out;
}

@keyframes fadeInOut {
  0% { opacity: 0; transform: translateY(-10px); }
  10% { opacity: 1; transform: translateY(0); }
  90% { opacity: 1; transform: translateY(0); }
  100% { opacity: 0; transform: translateY(-10px); }
}
</style> 