## Why

当前博客已经具备 Nuxt Content 内容页与服务端音乐接口，但仓库尚未固化部署路径。为了最快上线，需要明确一条以 Vercel 为目标的平台部署方案，在尽量不改变现有功能的前提下完成生产构建、运行时配置与上线验证。

## What Changes

- 为博客建立 Vercel 部署能力，使用 Nuxt/Nitro 的生产构建运行，而不是静态导出。
- 明确部署所需的 Node.js 版本、构建命令、运行时环境变量与上线验证入口。
- 保留现有页面、Nuxt Content 内容查询、搜索体验和 `/api/music/playlist` 服务端接口行为。
- 支持将网易云音乐凭据通过 Vercel 环境变量配置，不写入仓库；首版上线允许暂不配置。
- 提供可执行的部署检查步骤，帮助首次上线后快速发现构建、路由、内容或音乐接口问题。

## Capabilities

### New Capabilities

- `vercel-deployment`: 定义博客通过 Vercel 部署、配置环境变量并验证生产站点可用性的行为要求。

### Modified Capabilities

无。

## Impact

- 影响部署配置、项目文档或环境变量说明。
- 影响 Vercel 项目设置，包括构建命令、Node.js 版本与 `NCM_COOKIE` 环境变量。
- 需要验证 Nuxt Content 页面、动态路由、搜索弹窗和 `/api/music/playlist` 服务端接口在生产环境中正常工作。
- 不应改变现有博客内容结构、页面视觉设计或音乐接口返回契约。
