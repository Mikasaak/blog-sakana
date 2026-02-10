<script setup lang="ts">
const { data: items } = await useAsyncData('software', async () => {
  const result = await queryCollection('software').all()
  return result?.[0]?.meta?.body ?? []
})

useHead({
  title: '精选软件 - Sakana的小窝',
})
</script>

<template>
  <div class="py-12">
    <SectionTitle
      title="精选软件"
      subtitle="强力推荐的实用软件"
      icon="heroicons:cpu-chip"
    />

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
      <a
        v-for="(item, index) in items"
        :key="index"
        :href="item.url"
        target="_blank"
        class="group relative bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
      >
        <!-- Colored Header/Bar -->
        <div class="h-2 w-full" :class="item.color || 'bg-gray-200'"></div>
        
        <div class="p-6">
          <div class="flex items-center gap-3 mb-3">
            <div class="p-2 rounded-lg bg-gray-50 dark:bg-gray-700 text-primary-500 group-hover:scale-110 transition-transform">
              <Icon :name="item.icon || 'heroicons:cube'" class="w-6 h-6" />
            </div>
            <h3 class="text-lg font-bold text-gray-800 dark:text-white group-hover:text-primary-500 transition-colors">
              {{ item.title }}
            </h3>
          </div>
          
          <p class="text-gray-600 dark:text-gray-400 text-sm leading-relaxed line-clamp-3">
            {{ item.description }}
          </p>
        </div>

        <!-- External Link Icon -->
        <div class="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity text-gray-400">
          <Icon name="heroicons:arrow-top-right-on-square" class="w-5 h-5" />
        </div>
      </a>
    </div>
  </div>
</template>
