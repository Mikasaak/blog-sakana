<script setup lang="ts">
const route = useRoute()

const { data: page } = await useAsyncData('page-' + route.path, () => {
  return queryCollection('content').path(route.path).first()
})

if (!page.value) {
  throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true })
}
</script>

<template>
  <article class="prose lg:prose-xl dark:prose-invert max-w-4xl mx-auto">
    <ContentRenderer
      v-if="page"
      :value="page"
    />
  </article>
</template>
