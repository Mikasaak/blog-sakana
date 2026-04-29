## ADDED Requirements

### Requirement: Vercel 生产部署
系统 SHALL 支持通过 Vercel 部署当前 Nuxt 博客，并使用 Nuxt 生产构建保留服务端运行能力。

#### Scenario: 成功创建生产部署
- **WHEN** 项目仓库被导入 Vercel 并执行生产构建
- **THEN** Vercel SHALL 生成可访问的生产站点

#### Scenario: 服务端接口被保留
- **WHEN** 生产站点访问 `/api/music/playlist`
- **THEN** 系统 SHALL 通过 Vercel 的服务端运行时处理该请求

### Requirement: 内容页面可访问
系统 SHALL 在生产环境中提供 Nuxt Content 驱动的首页、列表页和详情页。

#### Scenario: 访问首页
- **WHEN** 用户访问生产站点首页
- **THEN** 系统 SHALL 展示最新文章、精选项目和音乐模块区域

#### Scenario: 访问文章详情页
- **WHEN** 用户访问任一已存在的文章详情路径
- **THEN** 系统 SHALL 渲染对应 Markdown 内容

#### Scenario: 访问项目详情页
- **WHEN** 用户访问任一已存在的项目详情路径
- **THEN** 系统 SHALL 渲染对应项目内容

### Requirement: 音乐接口环境变量
系统 SHALL 支持通过部署平台环境变量提供网易云音乐凭据，且不得将真实 `NCM_COOKIE` 写入仓库。

#### Scenario: 配置音乐凭据
- **WHEN** 部署者在 Vercel 项目中配置 `NCM_COOKIE`
- **THEN** `/api/music/playlist` SHALL 能够使用该凭据请求用户听歌记录

#### Scenario: 缺少音乐凭据
- **WHEN** 生产环境未配置 `NCM_COOKIE` 或凭据不可用
- **THEN** 音乐接口 SHALL 不导致首页整体渲染失败

### Requirement: 部署验证清单
系统 SHALL 提供首次上线后的验证步骤，覆盖核心页面、动态路由和音乐接口。

#### Scenario: 执行上线验证
- **WHEN** 生产部署完成
- **THEN** 部署者 SHALL 能验证首页、博客列表、文章详情、项目列表、搜索入口和 `/api/music/playlist` 的可用性

### Requirement: 构建环境兼容性
系统 SHALL 使用与 Nuxt、Nitro、Vite 和 native dependency 兼容的 Node.js 运行环境完成生产构建。

#### Scenario: Node.js 版本兼容
- **WHEN** Vercel 执行依赖安装和生产构建
- **THEN** 构建环境 SHALL 使用满足项目依赖要求的 Node.js 版本

#### Scenario: 构建失败排查
- **WHEN** Vercel 构建因运行时版本或 native dependency 失败
- **THEN** 部署者 SHALL 能根据部署说明检查并调整 Node.js 版本设置
