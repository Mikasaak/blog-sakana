<script setup lang="ts">
// Define types
interface BookmarkItem {
  title: string
  description: string
  url: string
  icon?: string
  color?: string
}

interface BookmarkCategory {
  category: string
  items: BookmarkItem[]
}

const { data: categoriesData } = await useAsyncData('software', async () => {
  const result = await queryCollection('software').all()
  const doc = result?.[0]
  const body = doc?.meta?.body || doc?.body
  return (Array.isArray(body) ? body : []) as unknown as BookmarkCategory[]
})

useHead({
  title: '精选软件 - Sakana的小窝',
})

// Search
const searchQuery = ref('')

// Group items by category (Filtered)
const groupedItems = computed(() => {
  const groups: Record<string, BookmarkItem[]> = {}
  
  if (!categoriesData.value) return groups

  categoriesData.value.forEach(cat => {
    let items = cat.items || []

    // Filter by search query
    if (searchQuery.value) {
      const query = searchQuery.value.toLowerCase()
      items = items.filter(item => 
        item.title.toLowerCase().includes(query) || 
        item.description.toLowerCase().includes(query)
      )
    }

    if (items.length > 0) {
      groups[cat.category] = items
    }
  })

  return groups
})

// Categories management
const collapsedCategories = ref<Record<string, boolean>>({})

const toggleCategory = (category: string) => {
  collapsedCategories.value[category] = !collapsedCategories.value[category]
}
</script>

<template>
  <div class="py-12">
    <SectionTitle
      title="精选软件"
      subtitle="强力推荐的实用软件"
      icon="heroicons:cpu-chip"
    />

    <!-- Search Bar -->
    <div class="mt-8 flex items-center justify-end">
      <div class="relative w-full md:w-64">
        <Icon name="heroicons:magnifying-glass" class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          v-model="searchQuery"
          type="text"
          placeholder="搜索软件..."
          class="w-full pl-10 pr-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500/50 transition-all text-gray-700 dark:text-gray-200 placeholder-gray-400 shadow-sm"
        />
      </div>
    </div>

    <div v-if="Object.keys(groupedItems).length > 0" class="mt-8 space-y-8">
      <div 
        v-for="(groupItems, category) in groupedItems" 
        :key="category" 
        class="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700/50 overflow-hidden transition-shadow duration-300 hover:shadow-lg"
      >
        <!-- Category Header -->
        <div 
          @click="toggleCategory(category as string)"
          class="flex items-center justify-between p-5 cursor-pointer select-none bg-gray-50/50 dark:bg-gray-800/50 hover:bg-gray-100/50 dark:hover:bg-gray-700/50 transition-colors border-b border-gray-100 dark:border-gray-700/50"
          :class="{ 'border-b-0': collapsedCategories[category] }"
        >
          <div class="flex items-center gap-4">
            <div class="w-1.5 h-6 bg-primary-500 rounded-full shadow-sm shadow-primary-500/50"></div>
            <h2 class="text-xl font-bold text-gray-800 dark:text-gray-100 flex items-center gap-3">
              {{ category }}
              <span class="px-2.5 py-0.5 text-xs font-medium bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 rounded-full">
                {{ groupItems.length }}
              </span>
            </h2>
          </div>
          <div 
            class="w-8 h-8 flex items-center justify-center rounded-full bg-white dark:bg-gray-700 text-gray-400 shadow-sm transition-all duration-300"
            :class="{ 'rotate-180': collapsedCategories[category], 'bg-primary-50 text-primary-500': !collapsedCategories[category] }"
          >
            <Icon name="heroicons:chevron-up" class="w-5 h-5" />
          </div>
        </div>

        <!-- Grid Container with Animation -->
        <div 
          class="grid transition-[grid-template-rows] duration-500 ease-in-out"
          :class="collapsedCategories[category] ? 'grid-rows-[0fr]' : 'grid-rows-[1fr]'"
        >
          <div class="overflow-hidden">
            <div class="p-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 bg-white dark:bg-gray-800">
              <a
                v-for="(item, index) in groupItems"
                :key="index"
                :href="item.url"
                target="_blank"
                class="group/card relative bg-gray-50 dark:bg-gray-700/30 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 dark:border-gray-700"
              >
                <!-- Colored Header/Bar -->
                <div class="h-1.5 w-full transition-all duration-300 group-hover/card:h-2" :class="item.color || 'bg-gray-200'"></div>
                
                <div class="p-5">
                  <div class="flex items-center gap-3 mb-3">
                    <div class="p-2 rounded-lg bg-white dark:bg-gray-800 text-primary-500 shadow-sm group-hover/card:scale-110 transition-transform">
                      <Icon :name="item.icon || 'heroicons:cube'" class="w-6 h-6" />
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
