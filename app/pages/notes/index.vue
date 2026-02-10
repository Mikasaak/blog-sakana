<script setup lang="ts">
const {data: notes} = await useAsyncData('notes', async () => {
  const result = await queryCollection('notes').all()
  console.log("🚀 ~  ~ result: ", result);
  // Nuxt Content v3 treats JSON file as a single entry or multiple entries depending on config.
  // If result is empty or not what we expect, we might need to adjust.
  // Assuming 'notes/*.json' and data.json contains an array.
  // It usually returns the array items as individual entries if the file contains an array.
  return result?.[0]?.meta?.body ?? []
})
console.log("🚀 ~  ~ notes: ", notes);

useHead({
  title: '语录 - Sakana的小窝',
})

// Color mapping for borders
const colorMap: Record<string, string> = {
  blue: 'border-blue-400',
  red: 'border-red-400',
  green: 'border-green-400',
  purple: 'border-purple-400',
  orange: 'border-orange-400',
  pink: 'border-pink-400',
}

const getColorClass = (color?: string) => {
  return colorMap[color || 'blue'] || colorMap['blue']
}
</script>

<template>
  <div class="py-12">
    <SectionTitle
        title="语录"
        subtitle="收藏触动心灵的文字"
        icon="fluent-emoji:bookmark"
    />

    <!-- Debug Info -->
    <!-- <pre>{{ notes }}</pre> -->

    <div class="columns-1 md:columns-2 gap-6 mt-8 space-y-6">
      <div
          v-for="(note, index) in notes"
          :key="index"
          class="break-inside-avoid bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow border-l-4"
          :class="getColorClass(note.color)"
      >
        <div class="text-gray-700 dark:text-gray-200 text-lg leading-relaxed whitespace-pre-line mb-4">
          {{ note.content }}
        </div>

        <div class="flex flex-col items-end text-sm text-gray-500 dark:text-gray-400 italic gap-1">
          <div v-if="note.source">出自 “{{ note.source }}”</div>
          <div v-if="note.author">作者：{{ note.author }}</div>
          <div class="mt-2 text-xs opacity-70 not-italic">
            <Icon name="heroicons:calendar" class="w-3 h-3 inline mr-1"/>
            {{ note.date }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
