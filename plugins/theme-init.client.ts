// 客户端主题初始化插件
export default defineNuxtPlugin(() => {
  if (process.client) {
    const colorMode = localStorage.getItem('nuxt-color-mode')
    const isDarkMode = colorMode === 'dark' || 
      (colorMode !== 'light' && window.matchMedia('(prefers-color-scheme: dark)').matches)
    
    // 添加或移除暗色主题类
    document.documentElement.classList.toggle('dark', isDarkMode)
  }
}) 