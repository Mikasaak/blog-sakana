## 1. 部署前检查

- [x] 1.1 确认项目使用 `npm` 与 `package-lock.json` 作为 Vercel 构建依据。
- [x] 1.2 本地运行生产构建，确认 Nuxt、Nitro、Nuxt Content 和 native dependency 能完成构建。
- [x] 1.3 检查当前 Node.js 版本要求，并确定是否需要在 Vercel 项目中固定 Node.js 版本。

## 2. 仓库部署说明

- [x] 2.1 补充 Vercel 部署说明，包含导入仓库、构建命令、运行方式和验证路径。
- [x] 2.2 补充环境变量说明，声明 `NCM_COOKIE` 需要配置在 Vercel 项目环境变量中，且不得提交真实值。
- [x] 2.3 如有必要，添加 `.env.example` 或等价说明文件，只包含占位值和用途说明。

## 3. Vercel 项目配置

- [x] 3.1 在 Vercel 中导入仓库，并确认 Framework Preset 识别为 Nuxt。
- [x] 3.2 确认 Build Command 为 `npm run build`，且不使用静态导出命令。
- [x] 3.3 确认 `NCM_COOKIE` 为可选环境变量；首版上线暂不配置，且未配置时音乐接口不会导致首页崩溃。
- [x] 3.4 触发一次生产部署，并记录部署 URL。

## 4. 上线验证

- [x] 4.1 验证生产站点首页可以访问并展示最新文章、精选项目和音乐模块区域。
- [x] 4.2 验证 `/blog`、至少一篇文章详情页、`/projects` 和至少一个项目详情页可以访问。
- [x] 4.3 验证搜索入口可以打开，并能检索文章或项目（已手动验证）。
- [x] 4.4 验证 `/api/music/playlist?mode=record&uid=318343018&type=1&limit=8` 返回可用响应，且失败时不会导致首页崩溃。
- [x] 4.5 N/A：本次部署成功，未触发失败排查分支；如后续部署失败，按构建日志检查 Node.js 版本、依赖安装、native dependency 和环境变量配置。

## 5. 回滚准备

- [x] 5.1 确认 Vercel 中存在上一个成功 deployment 或当前成功 deployment，可用于快速回滚。
- [x] 5.2 记录首次上线后的已知问题和后续优化项。
