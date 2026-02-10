<template>
  <div class="min-h-screen flex flex-col font-sans transition-colors duration-300 bg-[var(--bg-body)] text-[var(--text-main)]">
    <AppHeader />
    <main class="flex-grow container mx-auto px-4 py-8">
      <slot />
    </main>
    <AppFooter />
    <MusicPlayer />
  </div>
</template>
