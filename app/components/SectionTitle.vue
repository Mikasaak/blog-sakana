<script setup lang="ts">
defineProps<{
  title: string
  subtitle?: string
}>()
</script>

<template>
  <div class="mb-8">
    <h2 class="text-2xl font-bold text-gray-800 dark:text-gray-100 flex items-center gap-2">
      <span class="w-1 h-6 bg-primary-500 rounded-full"></span>
      {{ title }}
    </h2>
    <p v-if="subtitle" class="text-gray-500 dark:text-gray-400 mt-1 ml-3 text-sm">
      {{ subtitle }}
    </p>
  </div>
</template>
