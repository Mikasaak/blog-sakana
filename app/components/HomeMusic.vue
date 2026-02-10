<script setup lang="ts">
const songs = [
  {
    title: 'We Gotta Get Out Of This Place',
    artist: 'The Animals',
    album: 'Animal Tracks',
    cover: 'https://images.unsplash.com/photo-1493225255756-d9584f8606e9?ixlib=rb-1.2.1&auto=format&fit=crop&w=120&q=80',
    played: '224次'
  },
  {
    title: "Runnin' Down A Dream",
    artist: 'Tom Petty',
    album: 'Full Moon Fever',
    cover: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?ixlib=rb-1.2.1&auto=format&fit=crop&w=120&q=80',
    played: '189次'
  },
  {
    title: 'The Girl Is Mine',
    artist: 'Paul McCartney',
    album: 'Thriller',
    cover: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?ixlib=rb-1.2.1&auto=format&fit=crop&w=120&q=80',
    played: '156次'
  },
  {
    title: 'Let Her Dance',
    artist: 'Bobby Fuller Four',
    album: 'Fantastic Mr. Fox',
    cover: 'https://images.unsplash.com/photo-1514525253440-b393452e8d26?ixlib=rb-1.2.1&auto=format&fit=crop&w=120&q=80',
    played: '142次'
  }
]
</script>

<template>
  <div class="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-100 dark:border-gray-700">
    <div class="flex items-center justify-between mb-6">
      <h3 class="text-xl font-bold flex items-center gap-2">
        <Icon name="fluent:headphones-sound-wave-24-filled" class="text-primary-500" />
        最近在听
      </h3>
      <span class="text-xs font-medium px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-gray-500">
        Top Weekly
      </span>
    </div>

    <div class="space-y-4">
      <div v-for="(song, index) in songs" :key="index" class="flex items-center gap-4 group">
        <div class="relative w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
          <img :src="song.cover" :alt="song.title" class="w-full h-full object-cover" />
          <div class="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <Icon name="fluent:play-24-filled" class="text-white w-6 h-6" />
          </div>
        </div>
        
        <div class="flex-grow min-w-0">
          <h4 class="font-medium text-gray-900 dark:text-gray-100 truncate group-hover:text-primary-600 transition-colors">
            {{ song.title }}
          </h4>
          <p class="text-xs text-gray-500 dark:text-gray-400 truncate">
            {{ song.artist }}
          </p>
        </div>
        
        <div class="text-xs text-gray-400 font-mono">
          {{ song.played }}
        </div>
      </div>
    </div>
  </div>
</template>
