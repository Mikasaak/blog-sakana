import { defineContentConfig, defineCollection, z } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    content: defineCollection({
      type: 'page',
      source: '*.md',
    }),
    blog: defineCollection({
      type: 'page',
      source: 'blog/*.md',
      schema: z.object({
        title: z.string(),
        description: z.string(),
        date: z.string(),
        cover: z.string().optional(),
        tags: z.array(z.string()).optional(),
      }),
    }),
    projects: defineCollection({
      type: 'page',
      source: 'projects/*.md',
      schema: z.object({
        title: z.string(),
        description: z.string(),
        date: z.string(),
        link: z.string().optional(),
        image: z.string().optional(),
        tags: z.array(z.string()).optional(),
      }),
    }),
    notes: defineCollection({
      type: 'data',
      source: 'notes/data.json', // Specify the exact file
      schema: z.object({
        content: z.string(),
        author: z.string().optional(),
        source: z.string().optional(),
        date: z.string(),
        color: z.enum(['red', 'blue', 'green', 'purple', 'orange', 'pink']).optional(),
      }),
    }),
  },
})
