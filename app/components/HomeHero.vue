<template>
  <section class="py-20 md:py-32 flex flex-col items-center text-center relative overflow-hidden">
    <!-- Animated Background -->
    <div class="absolute inset-0 -z-10">
      <div class="absolute top-0 left-1/4 w-72 h-72 bg-primary-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
      <div class="absolute top-0 right-1/4 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
      <div class="absolute -bottom-8 left-1/3 w-72 h-72 bg-yellow-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
    </div>
    
    <div class="mb-8 relative group">
       <img src="https://github.com/Dreamer-Paul.png" alt="Avatar" class="paul-avatar" />
       <div class="absolute bottom-2 right-2 bg-green-500 w-5 h-5 rounded-full border-4 border-white dark:border-gray-800"></div>
    </div>
    
    <h1 class="text-4xl md:text-6xl font-bold text-[var(--text-main)] mb-6 tracking-tight">
      你好, 我是 <span class="text-primary-500">Sakana</span>
    </h1>
    
    <p class="text-xl md:text-2xl text-[var(--text-secondary)] max-w-2xl leading-relaxed mb-10">
      <span class="inline-block hover:animate-bounce">🎨</span> 创造 
      <span class="mx-2">·</span> 
      <span class="inline-block hover:animate-bounce animation-delay-100">💻</span> 编码 
      <span class="mx-2">·</span> 
      <span class="inline-block hover:animate-bounce animation-delay-200">📸</span> 生活
    </p>
    
    <div class="flex gap-4">
      <NuxtLink to="/about" class="px-8 py-3 bg-primary-500 text-white rounded-full font-bold hover:bg-primary-600 hover:shadow-lg hover:-translate-y-1 transition-all">
        关于我
      </NuxtLink>
      <a href="#posts" class="px-8 py-3 bg-[var(--bg-card)] text-[var(--text-main)] border border-[var(--border-color)] rounded-full font-bold hover:shadow-lg hover:-translate-y-1 transition-all">
        开始阅读
      </a>
    </div>
  </section>
</template>

<style scoped>
.animate-blob {
  animation: blob 7s infinite;
}
.animation-delay-2000 {
  animation-delay: 2s;
}
.animation-delay-4000 {
  animation-delay: 4s;
}
.animation-delay-100 {
  animation-delay: 0.1s;
}
.animation-delay-200 {
  animation-delay: 0.2s;
}
@keyframes blob {
  0% { transform: translate(0px, 0px) scale(1); }
  33% { transform: translate(30px, -50px) scale(1.1); }
  66% { transform: translate(-20px, 20px) scale(0.9); }
  100% { transform: translate(0px, 0px) scale(1); }
}
</style>
