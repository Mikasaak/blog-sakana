<script setup lang="ts">
const route = useRoute()
const { data: post } = await useAsyncData('post-' + route.path, () => {
  return queryCollection('blog').path(route.path).first()
})

if (!post.value) {
  throw createError({ statusCode: 404, statusMessage: 'Post not found', fatal: true })
}
</script>

<template>
  <article class="max-w-4xl mx-auto py-8">
    <div class="mb-8 text-center">
      <div class="flex items-center justify-center gap-2 text-sm text-gray-500 mb-4">
        <span>{{ new Date(post.date).toLocaleDateString() }}</span>
        <span v-if="post.tags" class="px-2 py-0.5 bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 rounded-full">
          {{ post.tags[0] }}
        </span>
      </div>
      <h1 class="text-3xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white">{{ post.title }}</h1>
      <p class="text-xl text-gray-500 dark:text-gray-400">{{ post.description }}</p>
    </div>

    <div v-if="post.cover" class="mb-10 rounded-2xl overflow-hidden shadow-lg">
      <NuxtImg :src="post.cover" :alt="post.title" class="w-full h-auto object-cover" />
    </div>

    <div class="prose lg:prose-xl dark:prose-invert mx-auto">
      <ContentRenderer :value="post" />
    </div>

    <CommentSection />
  </article>
</template>
