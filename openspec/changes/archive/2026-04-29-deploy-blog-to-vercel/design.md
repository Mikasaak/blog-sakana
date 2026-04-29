## Context

当前项目是 Nuxt 4 + Nuxt Content 博客，使用 `npm` 与 `package-lock.json` 管理依赖。页面内容主要来自 `content/` 下的 Markdown 和 JSON 数据，同时首页音乐模块会请求 `/api/music/playlist`，该接口依赖 `NeteaseCloudMusicApi`，并可通过 `NCM_COOKIE` 读取用户听歌记录。

仓库目前没有部署配置文件，也没有 `.env.example`。用户的目标是最快上线，并尽量不改变现有功能，因此部署方案需要优先减少应用改造，同时保留 Nuxt 服务端能力。

## Goals / Non-Goals

**Goals:**

- 使用 Vercel 完成首版生产部署。
- 保留 Nuxt Content 页面、动态路由、搜索和 `/api/music/playlist` 接口。
- 明确 Vercel 项目设置、环境变量、Node.js 版本和验证路径。
- 避免将 `NCM_COOKIE` 或其他敏感配置写入仓库。
- 让后续实现可以通过小范围配置和文档补充完成。

**Non-Goals:**

- 不迁移到 Cloudflare、Netlify、VPS 或 Docker。
- 不将站点改造成纯静态导出。
- 不重构音乐模块、搜索模块或内容模型。
- 不新增数据库、登录系统、评论系统或 CDN 图片处理策略。

## Decisions

### 使用 Vercel SSR/Serverless 部署，而不是静态导出

Vercel 可以直接运行 Nuxt/Nitro 生产构建，保留 `/api/music/playlist` 这类服务端接口。静态导出虽然更简单，但会削弱或破坏当前音乐 API 的运行方式，不符合“功能尽量不动”的目标。

备选方案：`npm run generate` + 静态托管。该方案适合只发布 Markdown 内容，但需要重新设计音乐模块，因此暂不采用。

### 使用现有 npm 工作流

项目已有 `package-lock.json`，Vercel 导入后应使用 `npm install`/`npm ci` 风格的依赖安装，并执行 `npm run build`。不引入新的包管理器，避免锁文件和构建行为变化。

备选方案：切换到 pnpm。该方案可能改善安装速度，但会引入锁文件变化，不适合首次上线。

### 通过 Vercel 环境变量可选地管理 `NCM_COOKIE`

`NCM_COOKIE` 属于敏感凭据，如需个性化听歌记录，应配置在 Vercel Project Settings 的 Environment Variables 中。首版上线可以不配置，但仓库仍需补充环境变量说明，且不得提交真实 cookie。

备选方案：将 cookie 写入 `.env` 或代码。该方案存在泄露风险，不能采用。

### Node.js 版本优先使用 Vercel 当前默认运行时，必要时固定到兼容版本

当前依赖中的 Nuxt/Nitro/Vite 要求较新的 Node.js 20/22/24 系列。首次部署可以使用 Vercel 默认 Node.js 版本；如果构建失败，应在 Vercel 项目设置中固定到兼容版本，并在部署说明中记录。

备选方案：在仓库中强制声明 Node.js 版本。该方案可以提升可重复性，但首次上线可以先由平台设置控制，避免过早扩大文件变更。

## Risks / Trade-offs

- Vercel 构建环境与本地 Node.js 版本不一致 → 在任务中加入 Node.js 版本检查，并在部署失败时固定 Vercel Node.js 版本。
- `NCM_COOKIE` 缺失、过期或权限不足 → 音乐接口必须不导致页面崩溃，并在上线验证中覆盖 `/api/music/playlist`。
- 网易云接口波动或限流 → 保留现有接口 fallback 行为，首版部署不扩大外部依赖范围。
- 服务端函数存在冷启动 → 接受首版上线的小幅延迟，后续再根据真实访问情况优化缓存。
- Vercel 免费额度限制 → 首版个人博客可接受，后续如流量增长再评估缓存、静态化或自托管。

## Migration Plan

1. 补充部署相关说明或配置，使项目导入 Vercel 时能按 Nuxt 生产构建运行。
2. 在 Vercel 创建项目并连接代码仓库。
3. 如需个性化听歌记录，配置 `NCM_COOKIE` 环境变量。
4. 触发生产部署。
5. 验证首页、文章页、项目页、搜索和音乐接口。
6. 如果生产部署失败，先检查 Node.js 版本、依赖安装和环境变量，再决定是否补充固定配置。

回滚策略：保留上一版 Vercel deployment；如果新部署失败或关键页面不可用，立即在 Vercel 中回滚到上一个成功 deployment。

## Open Questions

- 是否需要在仓库中加入 `.env.example` 来提示 `NCM_COOKIE`，但不包含真实值？
- 是否需要固定 Node.js 版本，还是先依赖 Vercel 默认版本？
- 是否需要为首次部署添加一份简短 README 部署章节，方便以后重复发布？
