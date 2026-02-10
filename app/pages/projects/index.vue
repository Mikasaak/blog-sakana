<script setup lang="ts">
const { data: projects } = await useAsyncData('projects', () => {
  return queryCollection('projects').order('date', 'DESC').all()
})

useHead({
  title: '精选项目 - Sakana的小窝',
})
</script>

<template>
  <div class="py-12">
    <SectionTitle 
      title="精选项目" 
      subtitle="看看我做了哪些有趣的个人项目吧"
      icon="fluent-emoji:rocket"
    />
    
    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
      <ProjectCard v-for="project in projects" :key="project.path" :project="project" />
    </div>
  </div>
</template>
