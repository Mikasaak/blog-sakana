# Sakana Blog

Nuxt 4 + Nuxt Content personal blog, with Markdown/JSON content collections and a server API for the homepage music module.

## Setup

Install dependencies with npm:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

## Vercel Deployment

This project should be deployed to Vercel as a Nuxt SSR/serverless app. Do not use `npm run generate` for the first deployment, because the homepage music module depends on the server route at `/api/music/playlist`.

Recommended Vercel project settings:

| Setting | Value |
| --- | --- |
| Framework Preset | Nuxt |
| Install Command | default, or `npm ci` |
| Build Command | `npm run build` |
| Output Directory | leave empty/default |
| Node.js Version | `24.x` recommended; `22.x` is also compatible |

Nuxt and Nuxt Content both support Vercel zero-configuration deployment. Push the repository to GitHub, GitLab, or Bitbucket, then import it from the Vercel dashboard.
This repository also includes [vercel.json](/E:/Code/Code-Front-End/Blog/blog-sakana/vercel.json) to pin the framework preset and build command, plus `package.json` `engines.node` to prefer Node `24.x`.

Official references:

- [Nuxt on Vercel](https://nuxt.com/deploy/vercel)
- [Nuxt Content on Vercel](https://content.nuxt.com/docs/deploy/vercel)
- [Vercel Node.js versions](https://vercel.com/docs/functions/runtimes/node-js/node-js-versions)

## Environment Variables

Configure these in Vercel Project Settings > Environment Variables.

| Name | Required | Description |
| --- | --- | --- |
| `NCM_COOKIE` | Optional | NetEase Cloud Music cookie used by `/api/music/playlist` when loading user listening records. |

Never commit a real `NCM_COOKIE` value. Keep it in Vercel and in local `.env` only.

## Deployment Verification

After a production deployment, verify:

- `/` renders the homepage and shows latest posts, featured projects, and the music module area.
- `/blog` renders the blog list.
- At least one existing blog detail page renders Markdown content.
- `/projects` renders the project list.
- At least one existing project detail page renders project content.
- The search modal opens and can find posts or projects.
- `/api/music/playlist?mode=record&uid=318343018&type=1&limit=8` returns a usable response.

If the music API fails because `NCM_COOKIE` is missing or expired, the homepage should still render instead of crashing.

## Rollback

Use the Vercel Deployments page to promote or roll back to the last successful deployment if a new deployment breaks core pages or the music API.

## First Production Rollout Notes

- Production alias: [blog-sakana.vercel.app](https://blog-sakana.vercel.app)
- Date verified: 2026-04-28
- Blog and project detail pages are prerendered during `npm run build` so Vercel serves stable content routes like `/blog/first-post` and `/projects/sakana-blog`.
- `NCM_COOKIE` is optional for this rollout and has not been configured in Vercel yet. The current music API response is still healthy, but private listening-history reliability may change later without the cookie.
- Search entry and search query logic were manually verified in production on 2026-04-29.
- The production icon rendering issue was fixed on 2026-04-29 by bundling the required icon sets locally through Nuxt Icon's client bundle.
