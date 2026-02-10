<script setup lang="ts">
const links = [
  { name: '首页', path: '/', icon: 'heroicons:home' },
  { 
    name: '文章', 
    path: '/blog', 
    icon: 'heroicons:pencil-square',
    children: [
      { name: '博客', path: '/blog' },
      { name: '语录', path: '/notes' }
    ]
  },
  { name: '瞬间', path: '/moments', icon: 'heroicons:photo' },
  { 
    name: '精选', 
    path: '/bookmarks', 
    icon: 'heroicons:star',
    children: [
      { name: '网站', path: '/bookmarks/websites' },
      { name: '软件', path: '/bookmarks/software' }
    ]
  },
  { name: '项目', path: '/projects', icon: 'heroicons:briefcase' },
  { name: '关于', path: '/about', icon: 'mdi:pac-man' },
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
      <nav class="hidden md:flex items-center gap-4">
        <div
          v-for="link in links" 
          :key="link.path"
          class="relative group"
        >
          <NuxtLink 
            :to="link.path"
            :title="link.name"
            class="text-[var(--text-secondary)] hover:text-primary-500 transition-all relative block p-2 rounded-full hover:bg-white/50 dark:hover:bg-gray-800/50"
            active-class="text-primary-600 bg-white/50 dark:bg-gray-800/50"
          >
            <Icon :name="link.icon" class="w-6 h-6" />
            
            <!-- Tooltip for non-dropdown items -->
            <span v-if="!link.children" class="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs bg-gray-800 text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-10">
              {{ link.name }}
            </span>
          </NuxtLink>

          <!-- Dropdown Menu -->
          <div 
            v-if="link.children"
            class="absolute top-full left-1/2 -translate-x-1/2 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 min-w-[120px]"
          >
            <div class="bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-xl shadow-xl border border-gray-100 dark:border-gray-700 overflow-hidden py-1">
              <NuxtLink 
                v-for="child in link.children"
                :key="child.path"
                :to="child.path"
                class="block px-4 py-2 text-sm text-gray-600 dark:text-gray-300 hover:text-primary-500 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors text-center whitespace-nowrap"
              >
                {{ child.name }}
              </NuxtLink>
            </div>
          </div>
        </div>
        
        <div class="h-4 w-px bg-gray-300 dark:bg-gray-700 mx-2"></div>
        
        <button @click="isSearchOpen = true" class="text-[var(--text-secondary)] hover:text-primary-500 transition-colors focus:outline-none p-2 rounded-full hover:bg-white/50 dark:hover:bg-gray-800/50" aria-label="Search" title="搜索">
          <Icon name="heroicons:magnifying-glass" class="w-5 h-5" />
        </button>

        <button @click="toggleDark" class="text-[var(--text-secondary)] hover:text-primary-500 dark:hover:text-yellow-400 transition-colors focus:outline-none p-2 rounded-full hover:bg-white/50 dark:hover:bg-gray-800/50" title="切换主题">
          <Icon :name="isDark ? 'uil:moon' : 'uil:sun'" class="w-5 h-5" />
        </button>
        
        <a href="https://github.com" target="_blank" class="text-[var(--text-secondary)] hover:text-[var(--text-main)] transition-transform hover:scale-110 p-2 rounded-full hover:bg-white/50 dark:hover:bg-gray-800/50" title="GitHub">
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
