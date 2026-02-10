<script setup lang="ts">
const { data: posts } = await useAsyncData('blog', () => {
  return queryCollection('blog').order('date', 'DESC').all()
})

useHead({
  title: '文章 - Sakana的小窝',
})
</script>

<template>
  <div class="py-12">
    <SectionTitle 
      title="所有文章" 
      subtitle="分享技术积累与人生感悟"
      icon="fluent-emoji:writing-hand"
    />
    
    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
      <PostCard v-for="post in posts" :key="post.path" :post="post" />
    </div>
  </div>
</template>
