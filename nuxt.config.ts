import { basename, extname, join } from 'node:path'
import { readdir } from 'node:fs/promises'

async function collectPrerenderRoutes() {
  const targets = [
    { dir: 'content/blog', prefix: '/blog' },
    { dir: 'content/projects', prefix: '/projects' },
  ]

  const routes: string[] = []

  for (const target of targets) {
    const entries = await readdir(join(process.cwd(), target.dir), { withFileTypes: true })
    for (const entry of entries) {
      if (!entry.isFile() || extname(entry.name) !== '.md') {
        continue
      }

      routes.push(`${target.prefix}/${basename(entry.name, '.md')}`)
    }
  }

  return routes
}

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/content',
    '@nuxt/icon',
    '@nuxt/image',
    '@nuxt/eslint',
    '@nuxt/fonts',
    '@nuxtjs/tailwindcss',
  ],
  css: [
    '~/assets/css/main.css',
  ],
  icon: {
    provider: 'none',
    serverBundle: false,
    clientBundle: {
      scan: true,
      icons: [
        'fluent-emoji:fish',
        'fluent-emoji:writing-hand',
        'fluent-emoji:camera',
        'fluent-emoji:speech-balloon',
        'fluent-emoji:musical-note',
        'fluent-emoji:bookmark',
        'fluent-emoji:confused-face',
        'fluent-emoji:rocket',
        'fluent:headphones-sound-wave-24-filled',
        'fluent:play-24-filled',
        'fluent:music-note-off-1-24-regular',
        'fluent:box-24-filled',
        'heroicons:home',
        'heroicons:pencil-square',
        'heroicons:photo',
        'heroicons:star',
        'heroicons:briefcase',
        'heroicons:magnifying-glass',
        'heroicons:bars-3',
        'heroicons:x-mark',
        'heroicons:chevron-left',
        'heroicons:chevron-right',
        'heroicons:chevron-down',
        'heroicons:chevron-up',
        'heroicons:document-text',
        'heroicons:cube',
        'heroicons:calendar',
        'heroicons:code-bracket',
        'heroicons:backward',
        'heroicons:pause',
        'heroicons:play',
        'heroicons:forward',
        'heroicons:arrow-top-right-on-square',
        'heroicons:face-frown',
        'heroicons:globe-alt',
        'heroicons:server',
        'heroicons:sparkles',
        'heroicons:swatch',
        'heroicons:musical-note',
        'heroicons:video-camera',
        'logos:vue',
        'logos:nuxt-icon',
        'logos:react',
        'logos:tailwindcss-icon',
        'logos:vitejs',
        'logos:mdn',
        'logos:visual-studio-code',
        'logos:webstorm',
        'logos:docker-icon',
        'logos:postman-icon',
        'logos:figma',
        'logos:adobe-photoshop',
        'logos:blender',
        'logos:chrome',
        'logos:notion-icon',
        'mdi:pac-man',
        'simple-icons:openai',
        'simple-icons:vercel',
        'simple-icons:bilibili',
        'simple-icons:pixiv',
        'simple-icons:iconify',
        'uil:twitter',
        'uil:github',
        'uil:telegram',
        'uil:arrow-right',
        'uil:arrow-up-right',
        'uil:image-slash',
        'uil:location-pin-alt',
        'uil:sun',
        'uil:moon',
        'svg-spinners:3-dots-fade',
        'fluent-emoji:brain',
        'fluent-emoji:artist-palette',
        'fluent-emoji:cherry-blossom',
        'fluent-emoji:green-book',
        'fluent-emoji:purple-heart',
      ],
    },
  },
  devtools: { enabled: true },
  compatibilityDate: '2024-04-03',
  nitro: {
    prerender: {
      crawlLinks: true,
      routes: ['/', '/blog', '/projects'],
    },
  },
  hooks: {
    async 'prerender:routes'(ctx) {
      for (const route of await collectPrerenderRoutes()) {
        ctx.routes.add(route)
      }
    },
  },
})
// Trigger restart
