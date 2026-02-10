<template>
  <div v-if="totalPages > 1" class="flex justify-center items-center gap-2 mt-12">
    <!-- Previous Button -->
    <button
      @click="changePage(currentPage - 1)"
      :disabled="currentPage === 1"
      class="p-2 rounded-lg transition-colors"
      :class="currentPage === 1 ? 'text-gray-300 dark:text-gray-600 cursor-not-allowed' : 'text-gray-600 dark:text-gray-400 hover:text-primary-500 hover:bg-primary-50 dark:hover:bg-primary-900/10'"
      aria-label="Previous Page"
    >
      <Icon name="heroicons:chevron-left" class="w-5 h-5" />
    </button>

    <!-- Page Numbers -->
    <div class="flex gap-1 flex-wrap justify-center">
      <template v-for="page in visiblePages" :key="page">
        <span v-if="page === '...'" class="w-8 h-8 flex items-center justify-center text-gray-400">
          ...
        </span>
        <button
          v-else
          @click="changePage(page as number)"
          class="w-8 h-8 rounded-lg flex items-center justify-center text-sm transition-all"
          :class="currentPage === page 
            ? 'bg-primary-500 text-white shadow-md shadow-primary-500/30' 
            : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'"
        >
          {{ page }}
        </button>
      </template>
    </div>

    <!-- Next Button -->
    <button
      @click="changePage(currentPage + 1)"
      :disabled="currentPage === totalPages"
      class="p-2 rounded-lg transition-colors"
      :class="currentPage === totalPages ? 'text-gray-300 dark:text-gray-600 cursor-not-allowed' : 'text-gray-600 dark:text-gray-400 hover:text-primary-500 hover:bg-primary-50 dark:hover:bg-primary-900/10'"
      aria-label="Next Page"
    >
      <Icon name="heroicons:chevron-right" class="w-5 h-5" />
    </button>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  currentPage: number
  totalItems: number
  pageSize: number
}>()

const emit = defineEmits<{
  (e: 'update:currentPage', page: number): void
  (e: 'change', page: number): void
}>()

const totalPages = computed(() => Math.ceil(props.totalItems / props.pageSize))

const visiblePages = computed(() => {
  const total = totalPages.value
  const current = props.currentPage
  const delta = 2 // Number of pages to show on each side of current
  const range: (number | string)[] = []

  for (let i = 1; i <= total; i++) {
    if (
      i === 1 ||
      i === total ||
      (i >= current - delta && i <= current + delta)
    ) {
      range.push(i)
    } else if (
      range[range.length - 1] !== '...' &&
      (i < current - delta || i > current + delta)
    ) {
      range.push('...')
    }
  }

  return range
})

const changePage = (page: number) => {
  if (page >= 1 && page <= totalPages.value) {
    emit('update:currentPage', page)
    emit('change', page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}
</script>
