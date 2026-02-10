<template>
  <footer class="bg-[var(--bg-footer)] border-t border-[var(--border-color)] transition-colors duration-300">
    <div class="container mx-auto px-4 py-8">
      <div class="grid md:grid-cols-3 gap-8 mb-8">
        <!-- Brand -->
        <div class="space-y-4">
          <div class="flex items-center gap-2 text-xl font-bold text-gray-800 dark:text-white">
            <Icon name="fluent-emoji:fish" class="w-8 h-8" />
            <span>Sakana的小窝</span>
          </div>
          <p class="text-gray-500 text-sm leading-relaxed max-w-xs dark:text-gray-400">
            记录生活，分享技术，探索未知的数字世界。<br>
            愿你在这里找到属于你的温暖。
          </p>
        </div>

        <!-- Links -->
        <div class="grid grid-cols-2 gap-4">
          <div>
            <h4 class="font-bold text-gray-800 dark:text-gray-100 mb-4">导航</h4>
            <ul class="space-y-2 text-sm text-gray-500 dark:text-gray-400">
              <li><NuxtLink to="/" class="hover:text-primary-500 transition-colors">首页</NuxtLink></li>
              <li><NuxtLink to="/about" class="hover:text-primary-500 transition-colors">关于我</NuxtLink></li>
              <li><NuxtLink to="/blog" class="hover:text-primary-500 transition-colors">归档</NuxtLink></li>
              <li><a href="/rss.xml" class="hover:text-primary-500 transition-colors">RSS 订阅</a></li>
            </ul>
          </div>
          <div>
            <h4 class="font-bold text-gray-800 dark:text-gray-100 mb-4">友链</h4>
            <ul class="space-y-2 text-sm text-gray-500 dark:text-gray-400">
              <li><a href="https://paul.ren" target="_blank" class="hover:text-primary-500 transition-colors">保罗的小窝</a></li>
              <li><a href="https://nuxtjs.org" target="_blank" class="hover:text-primary-500 transition-colors">Nuxt.js</a></li>
            </ul>
          </div>
        </div>

        <!-- Social -->
        <div class="flex flex-col items-end gap-4">
           <div class="flex gap-4">
            <a href="#" class="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-500 hover:bg-primary-500 hover:text-white transition-all">
              <Icon name="uil:twitter" class="w-5 h-5" />
            </a>
            <a href="#" class="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-500 hover:bg-gray-900 hover:text-white transition-all">
              <Icon name="uil:github" class="w-5 h-5" />
            </a>
            <a href="#" class="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-500 hover:bg-blue-500 hover:text-white transition-all">
              <Icon name="uil:telegram" class="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>

      <div class="border-t border-gray-100 dark:border-gray-800 pt-8 text-center">
        <p class="text-gray-400 text-xs dark:text-gray-500">
          © {{ new Date().getFullYear() }} Sakana的小窝. Powered by Nuxt 3.
        </p>
      </div>
    </div>
  </footer>
</template>
