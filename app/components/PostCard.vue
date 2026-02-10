<script setup lang="ts">
import type { Collections } from '@nuxt/content'

defineProps<{
  post: Collections['blog']
}>()
</script>

<template>
  <NuxtLink :to="post.path" class="group block bg-white dark:bg-gray-800 rounded-2xl p-4 transition-all hover:shadow-lg hover:-translate-y-1 border border-gray-100 dark:border-gray-700">
    <div class="aspect-video rounded-xl overflow-hidden mb-4 bg-gray-100 dark:bg-gray-700 relative">
      <NuxtImg 
        v-if="post.cover" 
        :src="post.cover" 
        :alt="post.title"
        class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <div v-else class="w-full h-full flex items-center justify-center text-gray-300 dark:text-gray-600">
        <Icon name="uil:image-slash" class="w-12 h-12" />
      </div>
    </div>
    
    <div class="space-y-2">
      <div class="flex items-center gap-2 text-xs text-gray-400 dark:text-gray-500">
        <span>{{ new Date(post.date).toLocaleDateString() }}</span>
        <span v-if="post.tags" class="px-2 py-0.5 bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 rounded-full">
          {{ post.tags[0] }}
        </span>
      </div>
      
      <h3 class="text-lg font-bold text-gray-800 dark:text-gray-100 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors line-clamp-1">
        {{ post.title }}
      </h3>
      
      <p class="text-sm text-gray-500 dark:text-gray-400 line-clamp-2">
        {{ post.description }}
      </p>
    </div>
  </NuxtLink>
</template>
