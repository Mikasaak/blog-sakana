<script setup lang="ts">
const links = [
  { name: '首页', path: '/' },
  { name: '文章', path: '/blog' },
  { name: '瞬间', path: '/moments' },
  { name: '项目', path: '/projects' },
  { name: '关于', path: '/about' },
]

const isMenuOpen = ref(false)
const isDark = ref(false)
const isSearchOpen = ref(false)

onMounted(() => {
  // Initialize dark mode based on local storage or system preference
  if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    isDark.value = true
    document.documentElement.classList.add('dark')
  } else {
    isDark.value = false
    document.documentElement.classList.remove('dark')
  }

  // Cmd+K Shortcut
  window.addEventListener('keydown', (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault()
      isSearchOpen.value = true
    }
  })
})

const toggleDark = () => {
  isDark.value = !isDark.value
  if (isDark.value) {
    document.documentElement.classList.add('dark')
    localStorage.theme = 'dark'
  } else {
    document.documentElement.classList.remove('dark')
    localStorage.theme = 'light'
  }
}
</script>

<template>
  <header class="bg-[var(--bg-header)] backdrop-blur-md sticky top-0 z-50 border-b border-[var(--border-color)] transition-colors duration-300 shadow-sm">
    <div class="container mx-auto px-4 h-16 flex items-center justify-between">
      <!-- Logo -->
      <NuxtLink to="/" class="text-xl font-bold text-[var(--text-main)] flex items-center gap-2 hover:opacity-80 transition-opacity">
        <Icon name="fluent-emoji:fish" class="w-8 h-8" />
        <span class="text-primary-500">Sakana的小窝</span>
      </NuxtLink>

      <!-- Desktop Navigation -->
      <nav class="hidden md:flex items-center gap-6">
        <NuxtLink 
          v-for="link in links" 
          :key="link.path" 
          :to="link.path"
          class="text-[var(--text-secondary)] hover:text-primary-500 font-medium transition-colors relative group py-2"
          active-class="text-primary-600 font-semibold"
        >
          {{ link.name }}
          <span class="absolute bottom-0 left-0 w-0 h-0.5 bg-primary-500 transition-all duration-300 group-hover:w-full group-[.router-link-active]:w-full"></span>
        </NuxtLink>
        <div class="h-4 w-px bg-gray-200 dark:bg-gray-700 mx-2"></div>
        
        <button @click="isSearchOpen = true" class="text-[var(--text-secondary)] hover:text-primary-500 transition-colors focus:outline-none" aria-label="Search">
          <Icon name="heroicons:magnifying-glass" class="w-5 h-5" />
        </button>

        <button @click="toggleDark" class="text-[var(--text-secondary)] hover:text-primary-500 dark:hover:text-yellow-400 transition-colors focus:outline-none">
          <Icon :name="isDark ? 'uil:moon' : 'uil:sun'" class="w-5 h-5" />
        </button>
        
        <a href="https://github.com" target="_blank" class="text-[var(--text-secondary)] hover:text-[var(--text-main)] transition-transform hover:scale-110">
          <Icon name="uil:github" class="w-5 h-5" />
        </a>
      </nav>

      <SearchModal :is-open="isSearchOpen" @close="isSearchOpen = false" />

      <!-- Mobile Menu Button -->
      <div class="flex items-center gap-4 md:hidden">
        <button @click="toggleDark" class="text-[var(--text-secondary)] hover:text-primary-500 dark:hover:text-yellow-400 transition-colors focus:outline-none">
          <Icon :name="isDark ? 'uil:moon' : 'uil:sun'" class="w-5 h-5" />
        </button>
        <button @click="isMenuOpen = !isMenuOpen" class="text-[var(--text-secondary)] hover:text-primary-500 focus:outline-none">
          <Icon :name="isMenuOpen ? 'heroicons:x-mark' : 'heroicons:bars-3'" class="w-6 h-6" />
        </button>
      </div>
    </div>

    <!-- Mobile Navigation -->
    <div v-show="isMenuOpen" class="md:hidden border-t border-[var(--border-color)] bg-[var(--bg-card)] backdrop-blur-md absolute w-full left-0 shadow-lg">
      <nav class="flex flex-col py-4">
        <NuxtLink 
          v-for="link in links" 
          :key="link.path" 
          :to="link.path"
          class="px-6 py-3 text-[var(--text-secondary)] hover:text-primary-500 hover:bg-primary-50 dark:hover:bg-primary-900/10 transition-colors"
          active-class="text-primary-600 font-semibold bg-primary-50 dark:bg-primary-900/10 border-l-4 border-primary-500"
          @click="isMenuOpen = false"
        >
          {{ link.name }}
        </NuxtLink>
      </nav>
    </div>
  </header>
</template>
