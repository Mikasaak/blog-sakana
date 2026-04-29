<script setup lang="ts">
const limit = ref(8)
const type = ref('1') // '1': Week, '0': All Time
const loadTrigger = ref<HTMLElement | null>(null)

const { data: songs, status } = await useFetch('/api/music/playlist', {
  query: { 
    limit: limit,
    mode: 'record',
    uid: '318343018', // 您的网易云 UID
    type: type
  },
  server: true,
  lazy: true,
  watch: [limit, type]
})

// Reset limit when type changes
watch(type, () => {
  limit.value = 8
})

// Use IntersectionObserver for infinite scroll
let observer: IntersectionObserver | null = null

onMounted(() => {
  observer = new IntersectionObserver((entries) => {
    const entry = entries[0]
    if (entry.isIntersecting && status.value !== 'pending') {
      limit.value += 6
    }
  }, {
    root: null, // viewport or parent container if needed
    rootMargin: '100px', // trigger before reaching bottom
    threshold: 0.1
  })

  if (loadTrigger.value) {
    observer.observe(loadTrigger.value)
  }
})

onUnmounted(() => {
  if (observer) {
    observer.disconnect()
  }
})
</script>

<template>
  <div class="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-100 dark:border-gray-700 flex flex-col h-[600px]">
    <div class="flex items-center justify-between mb-6 flex-shrink-0">
      <h3 class="text-xl font-bold flex items-center gap-2">
        <Icon name="fluent:headphones-sound-wave-24-filled" class="text-primary-500" />
        最近在听
      </h3>
      
      <!-- Time Range Switcher -->
      <div class="flex bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
        <button 
          @click="type = '1'"
          class="px-3 py-1 text-xs font-medium rounded-md transition-all duration-300"
          :class="type === '1' ? 'bg-white dark:bg-gray-600 text-primary-500 shadow-sm' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'"
        >
          Top Weekly
        </button>
        <button 
          @click="type = '0'"
          class="px-3 py-1 text-xs font-medium rounded-md transition-all duration-300"
          :class="type === '0' ? 'bg-white dark:bg-gray-600 text-primary-500 shadow-sm' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'"
        >
          All Time
        </button>
      </div>
    </div>

    <!-- Scrollable container -->
    <div class="flex-1 overflow-y-auto custom-scrollbar pr-2 -mr-2">
      <div v-if="status === 'pending' && (!songs || songs.length === 0)" class="space-y-4">
        <div v-for="i in 4" :key="i" class="flex items-center gap-4 animate-pulse">
          <div class="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
          <div class="flex-grow space-y-2">
            <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
            <div class="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
          </div>
        </div>
      </div>

      <div v-else-if="songs && songs.length > 0" class="space-y-4 pb-4">
        <div v-for="(song, index) in songs" :key="index" class="flex items-center gap-4 group">
          <div class="relative w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
            <img :src="song.cover" :alt="song.title" class="w-full h-full object-cover" />
            <div class="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
              <Icon name="fluent:play-24-filled" class="text-white w-6 h-6" />
            </div>
          </div>
          
          <div class="flex-grow min-w-0">
            <h4 class="font-medium text-gray-900 dark:text-gray-100 truncate group-hover:text-primary-600 transition-colors cursor-pointer" :title="song.title">
              {{ song.title }}
            </h4>
            <p class="text-xs text-gray-500 dark:text-gray-400 truncate" :title="song.artist">
              {{ song.artist }}
            </p>
          </div>
          
          <div class="text-xs text-gray-400 font-mono">
            {{ song.played }}
          </div>
        </div>
        
        <!-- Loading More Indicator & Sentinel -->
        <div ref="loadTrigger" class="py-4 flex justify-center h-10 w-full">
          <Icon v-if="status === 'pending'" name="svg-spinners:3-dots-fade" class="w-6 h-6 text-gray-400" />
        </div>
      </div>

      <div v-else class="text-center py-8 text-gray-500">
        <Icon name="fluent:music-note-off-1-24-regular" class="w-8 h-8 mx-auto mb-2 opacity-50" />
        <p class="text-sm">暂无播放记录</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: rgba(156, 163, 175, 0.3);
  border-radius: 20px;
}

.custom-scrollbar:hover::-webkit-scrollbar-thumb {
  background-color: rgba(156, 163, 175, 0.5);
}
</style>
