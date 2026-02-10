<script setup lang="ts">
const route = useRoute()
</script>

<template>
  <div class="container mx-auto px-4 py-12 flex flex-col md:flex-row gap-8 items-start">
    <!-- Sidebar -->
    <aside class="w-full md:w-48 shrink-0 md:sticky md:top-24">
      <div class="mb-8 text-center md:text-left">
        <h1 class="text-2xl font-bold text-gray-800 dark:text-gray-100">精选</h1>
      </div>
      
      <nav class="flex flex-row md:flex-col gap-2 justify-center md:justify-start">
        <NuxtLink 
          to="/bookmarks/websites" 
          class="px-6 py-2 md:px-4 md:py-2 rounded-xl transition-all duration-300 text-center md:text-left"
          :class="route.path.includes('/bookmarks/websites') 
            ? 'bg-white dark:bg-gray-800 text-primary-500 shadow-md border border-primary-100 dark:border-primary-900/30 font-bold transform scale-105' 
            : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-200'"
        >
          网站
        </NuxtLink>
        <NuxtLink 
          to="/bookmarks/software" 
          class="px-6 py-2 md:px-4 md:py-2 rounded-xl transition-all duration-300 text-center md:text-left"
          :class="route.path.includes('/bookmarks/software') 
            ? 'bg-white dark:bg-gray-800 text-primary-500 shadow-md border border-primary-100 dark:border-primary-900/30 font-bold transform scale-105' 
            : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-200'"
        >
          软件
        </NuxtLink>
      </nav>
    </aside>

    <!-- Content -->
    <main class="flex-1 min-w-0 w-full">
      <NuxtPage />
    </main>
  </div>
</template>
