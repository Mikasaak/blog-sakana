<script setup lang="ts">
useHead({
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${titleChunk} - Sakana的小窝` : 'Sakana的小窝 - 记录生活与技术'
  },
  meta: [
    { name: 'description', content: 'Sakana的个人博客，分享技术积累、生活瞬间与有趣的项目。' },
    { name: 'theme-color', content: '#0ea5e9' },
    { property: 'og:type', content: 'website' },
    { property: 'og:site_name', content: 'Sakana的小窝' },
  ],
  link: [
    { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }
  ]
})
</script>

<template>
  <NuxtRouteAnnouncer />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
