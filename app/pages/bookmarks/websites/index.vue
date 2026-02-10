<script setup lang="ts">
const { data: items } = await useAsyncData('websites', async () => {
  const result = await queryCollection('websites').all()
  return result?.[0]?.meta?.body ?? []
})

useHead({
  title: '精选网站 - Sakana的小窝',
})

// Search
const searchQuery = ref('')

// Group items by category
const groupedItems = computed(() => {
  const groups: Record<string, any[]> = {}
  let result = items.value || []

  // Filter by search query
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    result = result.filter(item => 
      item.title.toLowerCase().includes(query) || 
      item.description.toLowerCase().includes(query)
    )
  }

  // Grouping
  result.forEach(item => {
    const category = item.category || '未分类'
    if (!groups[category]) {
      groups[category] = []
    }
    groups[category].push(item)
  })

  return groups
})

// Categories management
const collapsedCategories = ref<Record<string, boolean>>({})

const toggleCategory = (category: string) => {
  collapsedCategories.value[category] = !collapsedCategories.value[category]
}

// Initialize collapsed state (all expanded by default)
// No need to explicitly set false as undefined is falsy
</script>

<template>
  <div class="py-12">
    <SectionTitle
      title="精选网站"
      subtitle="收集的一些有趣的网站和工具"
      icon="heroicons:globe-alt"
    />

    <!-- Search Bar -->
    <div class="mt-8 flex items-center justify-end">
      <div class="relative w-full md:w-64">
        <Icon name="heroicons:magnifying-glass" class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          v-model="searchQuery"
          type="text"
          placeholder="搜索网站..."
          class="w-full pl-10 pr-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500/50 transition-all text-gray-700 dark:text-gray-200 placeholder-gray-400 shadow-sm"
        />
      </div>
    </div>

    <div v-if="Object.keys(groupedItems).length > 0" class="mt-8 space-y-12">
      <div v-for="(groupItems, category) in groupedItems" :key="category" class="space-y-6">
        <!-- Category Header -->
        <div 
          @click="toggleCategory(category as string)"
          class="flex items-center justify-between cursor-pointer group select-none"
        >
          <div class="flex items-center gap-3">
            <h2 class="text-2xl font-bold text-gray-800 dark:text-gray-100 relative">
              {{ category }}
              <span class="absolute -bottom-2 left-0 w-full h-1 bg-primary-500/30 rounded-full scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
            </h2>
            <span class="px-2 py-0.5 text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 rounded-full">
              {{ groupItems.length }}
            </span>
          </div>
          <button class="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-400 hover:text-primary-500 transition-colors">
            <Icon 
              name="heroicons:chevron-down" 
              class="w-5 h-5 transition-transform duration-300"
              :class="{ 'rotate-180': collapsedCategories[category] }"
            />
          </button>
        </div>

        <!-- Grid -->
        <div 
          v-show="!collapsedCategories[category]"
          class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 transition-all duration-300"
        >
          <a
            v-for="(item, index) in groupItems"
            :key="index"
            :href="item.url"
            target="_blank"
            class="group/card relative bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 dark:border-gray-700/50"
          >
            <!-- Colored Header/Bar -->
            <div class="h-1.5 w-full transition-all duration-300 group-hover/card:h-2" :class="item.color || 'bg-gray-200'"></div>
            
            <div class="p-5">
              <div class="flex items-center gap-3 mb-3">
                <div class="p-2 rounded-lg bg-gray-50 dark:bg-gray-700/50 text-primary-500 group-hover/card:scale-110 transition-transform">
                  <Icon :name="item.icon || 'heroicons:globe-alt'" class="w-6 h-6" />
                </div>
                <h3 class="text-lg font-bold text-gray-800 dark:text-white group-hover/card:text-primary-500 transition-colors">
                  {{ item.title }}
                </h3>
              </div>
              
              <p class="text-gray-600 dark:text-gray-400 text-sm leading-relaxed line-clamp-2 mb-2">
                {{ item.description }}
              </p>
            </div>

            <!-- External Link Icon -->
            <div class="absolute top-4 right-4 opacity-0 group-hover/card:opacity-100 transition-opacity text-gray-400 hover:text-primary-500">
              <Icon name="heroicons:arrow-top-right-on-square" class="w-5 h-5" />
            </div>
          </a>
        </div>
      </div>
    </div>

    <!-- Empty State -->
    <div v-else class="flex flex-col items-center justify-center py-20 text-gray-500 dark:text-gray-400">
      <Icon name="heroicons:face-frown" class="w-16 h-16 mb-4 opacity-50" />
      <p class="text-lg">没有找到相关内容</p>
      <button 
        @click="searchQuery = ''"
        class="mt-4 text-primary-500 hover:text-primary-600 underline"
      >
        清除搜索
      </button>
    </div>
  </div>
</template>
