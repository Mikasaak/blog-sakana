<script setup lang="ts">
import type { Collections } from '@nuxt/content'

defineProps<{
  project: Collections['projects']
}>()
</script>

<template>
  <a :href="project.link" target="_blank" class="group block bg-white dark:bg-gray-800 rounded-2xl p-6 transition-all hover:shadow-lg hover:-translate-y-1 border border-gray-100 dark:border-gray-700 h-full">
    <div class="flex items-start justify-between mb-4">
      <div class="p-3 bg-primary-50 dark:bg-primary-900/30 rounded-xl text-primary-600 dark:text-primary-400">
        <Icon name="fluent:box-24-filled" class="w-8 h-8" />
      </div>
      <Icon name="uil:arrow-up-right" class="w-5 h-5 text-gray-400 group-hover:text-primary-500 transition-colors" />
    </div>
    
    <h3 class="text-xl font-bold text-gray-800 dark:text-gray-100 mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
      {{ project.title }}
    </h3>
    
    <p class="text-gray-500 dark:text-gray-400 text-sm mb-4 line-clamp-2">
      {{ project.description }}
    </p>

    <div class="flex flex-wrap gap-2">
      <span v-for="tag in project.tags" :key="tag" class="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-md">
        {{ tag }}
      </span>
    </div>
  </a>
</template>
