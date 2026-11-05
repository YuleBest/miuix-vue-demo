# Miuix Vue Demo

用 [miuix-vue](https://github.com/YuKongA/miuix-vue) 做的 HyperOS 风格演示 App，移动端外壳 + 三个页面，覆盖组件库的全部组件、扩展图标包、Snackbar 指令式 API 与明暗主题。

## 运行

```sh
pnpm install
pnpm dev      # http://127.0.0.1:5173
pnpm build    # 类型检查 + 生产构建
pnpm lint     # oxlint
pnpm lint:fix # oxlint --fix
pnpm fmt      # oxfmt
pnpm fmt:check
```

## 编辑器

`.vscode` 已推荐 Oxc 扩展（`oxc.oxc-vscode`），保存时自动用 oxfmt 格式化，并通过 `source.fixAll.oxc` 执行 oxlint 修复。配置遵循 Oxc 官方文档。

- Lint 配置：`.oxlintrc.json`
- Format 配置：`.oxfmtrc.json`（`printWidth: 100`、单引号、无分号）

## 页面

| 页面 | 内容                                                                                                                                                  |
| :--- | :---------------------------------------------------------------------------------------------------------------------------------------------------- |
| 概览 | SearchBar、Surface 统计卡、Text 排版、BasicComponent、Button / IconButton / FAB、156 图标图库（5 种字重）、Card sink / tilt / 长按、ProgressIndicator |
| 控件 | TabRow（标准 / 轮廓）、Input、Switch、Checkbox、RadioButton、Slider / RangeSlider、NumberPicker、ColorPicker                                          |
| 设置 | 主题模式（跟随系统 / 浅色 / 深色）、六种 Preference 行、Dialog、Snackbar 各种形态、关于                                                               |

外壳包含 TopAppBar、ScrollArea、NavigationBar、FAB、BottomSheet（从 FAB 打开）和 SnackbarHost。

## 响应式

- 窄屏（< 900px）：大标题 TopAppBar + 底部 NavigationBar，单列内容。
- 宽屏（≥ 900px）：左侧导航栏 + 紧凑吸顶 TopAppBar，隐藏底部导航。
- 内容区不设最大宽度，按视口宽度切换 1 / 2 / 3 / 4 列（1024 / 1440 / 2200px）；每个 tab 仍保留自己的滚动位置。

## 说明

- 字体使用小米官方完整版 MiSans CDN（variable 150–700，完整语言子集）：`https://i02.appmifile.com/i18n/fonts/MiSans/vf/index.css`；CDN 不可用时回退到系统字体。
- `miuix-vue@0.1.1` 的 `package.json` 中 `types` 指向 `dist/index.d.ts`，实际发布在 `dist/src/index.d.ts`；`tsconfig.app.json` 里用 `paths` 映射修正，运行时不受影响。
- `MiuixTopAppBar` 的 subtitle 在 0.1.1 里是行内布局，`src/style.css` 里补了一条 flex 规则让副标题换行。
