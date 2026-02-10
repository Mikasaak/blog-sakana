<script setup lang="ts">
const isPlaying = ref(false)
const progress = ref(30)
const isExpanded = ref(false)

const currentSong = {
  title: 'Bring It on Home to Me',
  artist: 'Sam Cooke',
  cover: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80'
}

const togglePlay = () => {
  isPlaying.value = !isPlaying.value
}
</script>

<template>
  <div 
    class="fixed bottom-4 left-4 z-40 transition-all duration-300 ease-in-out"
    :class="[isExpanded ? 'w-64' : 'w-12 h-12 overflow-hidden rounded-full hover:scale-110']"
  >
    <div 
      class="bg-white/90 dark:bg-gray-800/90 backdrop-blur-md shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden"
      :class="[isExpanded ? 'rounded-2xl p-4' : 'rounded-full h-full w-full flex items-center justify-center cursor-pointer']"
      @click="!isExpanded && (isExpanded = true)"
    >
      <!-- Collapsed State -->
      <div v-if="!isExpanded" class="relative w-full h-full">
        <NuxtImg :src="currentSong.cover" class="w-full h-full object-cover animate-[spin_4s_linear_infinite]" :class="{ 'paused': !isPlaying }" />
        <div class="absolute inset-0 flex items-center justify-center bg-black/20">
          <Icon name="fluent-emoji:musical-note" class="w-5 h-5 text-white" />
        </div>
      </div>

      <!-- Expanded State -->
      <div v-else class="relative">
        <button 
          @click.stop="isExpanded = false" 
          class="absolute -top-2 -right-2 p-1 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300"
        >
          <Icon name="heroicons:chevron-down" class="w-5 h-5" />
        </button>

        <div class="flex items-center gap-3 mb-3">
          <div class="w-12 h-12 rounded-lg overflow-hidden shrink-0 shadow-sm">
            <NuxtImg :src="currentSong.cover" class="w-full h-full object-cover" />
          </div>
          <div class="min-w-0 flex-1">
            <h4 class="font-bold text-gray-900 dark:text-white truncate text-sm">{{ currentSong.title }}</h4>
            <p class="text-xs text-gray-500 dark:text-gray-400 truncate">{{ currentSong.artist }}</p>
          </div>
        </div>

        <div class="space-y-2">
          <!-- Progress Bar -->
          <div class="h-1 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
            <div class="h-full bg-primary-500 rounded-full" :style="{ width: progress + '%' }"></div>
          </div>

          <!-- Controls -->
          <div class="flex items-center justify-between text-gray-600 dark:text-gray-400">
            <button class="hover:text-primary-500"><Icon name="heroicons:backward" class="w-5 h-5" /></button>
            <button 
              @click="togglePlay" 
              class="w-8 h-8 flex items-center justify-center bg-primary-500 text-white rounded-full hover:bg-primary-600 shadow-md transition-transform hover:scale-105"
            >
              <Icon :name="isPlaying ? 'heroicons:pause' : 'heroicons:play'" class="w-5 h-5" />
            </button>
            <button class="hover:text-primary-500"><Icon name="heroicons:forward" class="w-5 h-5" /></button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.paused {
  animation-play-state: paused;
}
</style>
