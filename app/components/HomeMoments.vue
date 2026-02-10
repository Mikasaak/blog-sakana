<script setup lang="ts">
const moments = [
  {
    title: '外婆的旧手机',
    date: '2026-01-03',
    image: 'https://images.unsplash.com/photo-1556304653-cba65c59b3c5?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80',
    location: 'Home'
  },
  {
    title: '春椿',
    date: '2026-01-02',
    image: 'https://images.unsplash.com/photo-1490750967868-bcdf92dd218a?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80',
    location: 'Park'
  },
  {
    title: '橘福福',
    date: '2026-01-02',
    image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80',
    location: 'Cat Cafe'
  },
  {
    title: '随心',
    date: '2026-01-01',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80',
    location: 'Mountain'
  }
]
</script>

<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
    <div 
      v-for="(moment, index) in moments" 
      :key="index"
      class="group relative aspect-[4/5] overflow-hidden rounded-2xl cursor-pointer"
    >
      <img 
        :src="moment.image" 
        :alt="moment.title"
        class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
      />
      
      <!-- Overlay -->
      <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity">
        <div class="absolute bottom-0 left-0 p-4 w-full text-white">
          <div class="text-xs font-mono opacity-80 mb-1">{{ moment.date }}</div>
          <h3 class="font-bold text-lg mb-1">{{ moment.title }}</h3>
          <div class="flex items-center gap-1 text-xs opacity-70">
            <Icon name="uil:location-pin-alt" />
            {{ moment.location }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
