<script setup lang="ts">
const props = defineProps<{
  isOpen: boolean
}>()

const emit = defineEmits(['close'])

const searchQuery = ref('')
const searchInput = ref<HTMLInputElement | null>(null)
const selectedIndex = ref(0)
const searchResults = ref<any[]>([])

// Focus input when opened
watch(() => props.isOpen, async (val) => {
  if (val) {
    await nextTick()
    searchInput.value?.focus()
    searchQuery.value = ''
    searchResults.value = []
  }
})

// Search Logic (Debounced)
let searchTimeout: NodeJS.Timeout
const handleSearch = () => {
  clearTimeout(searchTimeout)
  searchTimeout = setTimeout(async () => {
    if (!searchQuery.value.trim()) {
      searchResults.value = []
      return
    }
    
    // Search in blog and projects
    const blogResults = await queryCollection('blog')
      .where('title', 'LIKE', `%${searchQuery.value}%`)
      .select('title', 'path', 'description', 'date')
      .limit(5)
      .all()
      
    const projectResults = await queryCollection('projects')
      .where('title', 'LIKE', `%${searchQuery.value}%`)
      .select('title', 'path', 'description')
      .limit(3)
      .all()

    searchResults.value = [
      ...blogResults.map(r => ({ ...r, type: '文章' })),
      ...projectResults.map(r => ({ ...r, type: '项目' }))
    ]
    selectedIndex.value = 0
  }, 300)
}

const navigate = (direction: number) => {
  const newIndex = selectedIndex.value + direction
  if (newIndex >= 0 && newIndex < searchResults.value.length) {
    selectedIndex.value = newIndex
  }
}

const selectResult = () => {
  if (searchResults.value[selectedIndex.value]) {
    navigateTo(searchResults.value[selectedIndex.value].path)
    emit('close')
  }
}

// Close on Escape
const onKeydown = (e: KeyboardEvent) => {
  if (e.key === 'Escape') {
    e.preventDefault()
    emit('close')
  }
}

onMounted(() => {
  window.addEventListener('keydown', onKeydown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', onKeydown)
})

// Shortcut to open (Cmd+K) - Handled in parent or global listener
</script>

<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0 scale-95"
      enter-to-class="opacity-100 scale-100"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100 scale-100"
      leave-to-class="opacity-0 scale-95"
    >
      <div v-if="isOpen" class="fixed inset-0 z-[100] overflow-y-auto" role="dialog" aria-modal="true">
        <!-- Backdrop -->
        <div class="fixed inset-0 bg-gray-500/75 dark:bg-gray-900/80 backdrop-blur-sm transition-opacity" @click="$emit('close')"></div>

        <div class="flex min-h-full items-start justify-center p-4 pt-16 sm:p-6 sm:pt-24">
          <div class="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-white dark:bg-gray-800 shadow-2xl ring-1 ring-black ring-opacity-5 transition-all">
            <!-- Search Input -->
            <div class="relative border-b border-gray-100 dark:border-gray-700">
              <Icon name="heroicons:magnifying-glass" class="pointer-events-none absolute left-4 top-3.5 h-6 w-6 text-gray-400" />
              <input
                ref="searchInput"
                v-model="searchQuery"
                @input="handleSearch"
                @keydown.down.prevent="navigate(1)"
                @keydown.up.prevent="navigate(-1)"
                @keydown.enter.prevent="selectResult"
                type="text"
                class="h-14 w-full border-0 bg-transparent pl-12 pr-4 text-gray-900 dark:text-white placeholder:text-gray-400 focus:ring-0 sm:text-sm"
                placeholder="搜索文章、项目..."
              />
            </div>

            <!-- Results -->
            <ul v-if="searchResults.length > 0" class="max-h-[60vh] overflow-y-auto py-2 text-sm text-gray-800 dark:text-gray-200" role="listbox">
              <li
                v-for="(result, index) in searchResults"
                :key="result.path"
                :class="['group flex cursor-pointer select-none items-center px-4 py-3', index === selectedIndex ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400' : 'hover:bg-gray-50 dark:hover:bg-gray-700/50']"
                @click="navigateTo(result.path); $emit('close')"
                @mouseenter="selectedIndex = index"
              >
                <Icon :name="result.type === '文章' ? 'heroicons:document-text' : 'heroicons:cube'" class="h-5 w-5 flex-none text-gray-400 mr-3" :class="{ 'text-primary-500': index === selectedIndex }" />
                <div class="flex-auto truncate">
                  <span class="font-medium">{{ result.title }}</span>
                  <span class="ml-2 truncate text-gray-500 dark:text-gray-400 text-xs">{{ result.description }}</span>
                </div>
                <span class="ml-3 flex-none text-xs text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-0.5 rounded-full">{{ result.type }}</span>
              </li>
            </ul>

            <!-- Empty State -->
            <div v-else-if="searchQuery && searchResults.length === 0" class="px-6 py-14 text-center text-sm sm:px-14">
              <Icon name="fluent-emoji:confused-face" class="mx-auto h-10 w-10 opacity-50" />
              <p class="mt-4 font-semibold text-gray-900 dark:text-white">未找到相关内容</p>
              <p class="mt-2 text-gray-500 dark:text-gray-400">换个关键词试试？</p>
            </div>
            
            <!-- Footer -->
            <div v-else class="px-6 py-10 text-center text-xs text-gray-500 dark:text-gray-400 border-t border-gray-100 dark:border-gray-700">
               输入关键词搜索全站内容
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
