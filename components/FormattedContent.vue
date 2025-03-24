<template>
  <div v-html="formattedContent"></div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import markdownit from 'markdown-it'

const props = defineProps<{
  content: string
}>()

// 创建markdown解析器
const md = new markdownit({
  html: false,
  breaks: true,
  linkify: true,
  typographer: true,
})

// 格式化内容
const formattedContent = computed(() => {
  try {
    return md.render(props.content)
  } catch (error) {
    console.error('Error rendering markdown:', error)
    return props.content
  }
})
</script>

<style scoped>
/* 自定义样式可以在这里添加 */
</style> 