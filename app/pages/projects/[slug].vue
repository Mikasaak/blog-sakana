<script setup lang="ts">
const route = useRoute()
const { data: project } = await useAsyncData('project-' + route.path, () => {
  return queryCollection('projects').path(route.path).first()
})

if (!project.value) {
  throw createError({ statusCode: 404, statusMessage: 'Project not found', fatal: true })
}
</script>

<template>
  <article class="max-w-4xl mx-auto py-8">
    <div class="mb-8">
      <div class="flex items-center gap-4 mb-6">
        <div class="p-4 bg-primary-50 dark:bg-primary-900/30 rounded-2xl text-primary-600 dark:text-primary-400">
          <Icon name="fluent:box-24-filled" class="w-10 h-10" />
        </div>
        <div>
          <h1 class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">{{ project.title }}</h1>
          <div class="flex gap-3">
            <span v-for="tag in project.tags" :key="tag" class="text-sm px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 rounded-md">
              {{ tag }}
            </span>
          </div>
        </div>
      </div>

      <div v-if="project.image" class="mb-10 rounded-2xl overflow-hidden shadow-lg">
        <NuxtImg :src="project.image" :alt="project.title" class="w-full h-auto object-cover" />
      </div>

      <div class="prose lg:prose-xl dark:prose-invert max-w-none">
        <ContentRenderer :value="project" />
      </div>

      <div v-if="project.link" class="mt-8 pt-8 border-t border-gray-100 dark:border-gray-800">
        <a :href="project.link" target="_blank" class="inline-flex items-center gap-2 px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-xl font-medium transition-colors">
          访问项目
          <Icon name="uil:arrow-right" class="w-5 h-5" />
        </a>
      </div>
    </div>
  </article>
</template>
