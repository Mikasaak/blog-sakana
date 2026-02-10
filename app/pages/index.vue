<script setup lang="ts">
const { data: posts } = await useAsyncData('latest-posts', () => {
  return queryCollection('blog').order('date', 'DESC').limit(3).all()
})

const { data: projects } = await useAsyncData('featured-projects', () => {
  return queryCollection('projects').limit(4).all()
})
</script>

<template>
  <div class="space-y-24 pb-20">
    <!-- Hero Section -->
    <HomeHero />

    <!-- Blog Section -->
    <section id="posts" class="scroll-mt-20">
      <SectionTitle title="最新文章" subtitle="技术积累与人生感悟。" />
      <div class="grid md:grid-cols-3 gap-6">
        <PostCard v-for="post in posts" :key="post.path" :post="post" />
      </div>
      <div class="mt-8 text-center">
        <NuxtLink to="/blog" class="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-primary-600 transition-colors">
          查看归档 <Icon name="uil:arrow-right" />
        </NuxtLink>
      </div>
    </section>

    <!-- Daily Captures (Moments) -->
    <section>
      <SectionTitle title="近期捕获" subtitle="捕捉人生中的每一份精彩时刻与温暖。" />
      <HomeMoments />
    </section>

    <!-- Projects & Music Grid -->
    <section class="grid lg:grid-cols-3 gap-8">
      <!-- Projects (Takes up 2 columns) -->
      <div class="lg:col-span-2">
        <SectionTitle title="精选项目" subtitle="看看我做了哪些有趣的个人项目。" />
        <div class="grid sm:grid-cols-2 gap-4">
          <ProjectCard v-for="project in projects" :key="project.path" :project="project" />
        </div>
      </div>

      <!-- Music (Takes up 1 column) -->
      <div class="lg:col-span-1">
        <SectionTitle title="奇趣音乐盒" subtitle="最近在听多元化的听歌风格。" />
        <HomeMusic />
      </div>
    </section>
  </div>
</template>
