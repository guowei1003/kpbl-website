import { defineNuxtPlugin } from 'nuxt/app'

export default defineNuxtPlugin((nuxtApp) => {
  // 添加全局辅助函数
  nuxtApp.provide('formatDate', (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat('zh-CN', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    }).format(date)
  })
}) 