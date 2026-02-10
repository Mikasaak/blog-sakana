<script setup lang="ts">
const isDark = useDark()

// Config - You should replace these with your actual repo details
const repo = 'your-username/your-repo'
const repoId = 'R_kgD...'
const category = 'Announcements'
const categoryId = 'DIC_kwD...'
</script>

<template>
  <div class="mt-16 pt-8 border-t border-gray-100 dark:border-gray-800">
    <h3 class="text-2xl font-bold mb-8 text-gray-900 dark:text-white flex items-center gap-2">
      <Icon name="fluent-emoji:speech-balloon" />
      评论
    </h3>
    
    <div class="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 min-h-[200px] flex items-center justify-center">
      <!-- Giscus Component Placeholder -->
      <!-- In a real app, you would use @giscus/vue or a script tag here -->
      <div class="text-center">
        <p class="text-gray-500 dark:text-gray-400 mb-4">评论系统配置中...</p>
        <p class="text-sm text-gray-400">请在 CommentSection.vue 中填入您的 Giscus 配置信息</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
// Simple composable if not using @vueuse/core
function useDark() {
  const isDark = ref(false)
  if (import.meta.client) {
    isDark.value = document.documentElement.classList.contains('dark')
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
          isDark.value = document.documentElement.classList.contains('dark')
        }
      })
    })
    observer.observe(document.documentElement, { attributes: true })
  }
  return isDark
}
</script>
