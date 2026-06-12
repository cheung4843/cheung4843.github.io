# CLAUDE.md — The other shore 部落格

這是 cheung4843 的個人部落格，基於 [Astro Paper](https://github.com/satnaing/astro-paper) 主題建立。
內容包含技術文章、心情札記、小說連載，以及偶爾分享的歌曲與感想。
部署於 `https://cheung4843.github.io/`。

## 專案概覽

- **框架**：Astro + Astro Paper 主題
- **語言**：TypeScript / Astro
- **樣式**：Tailwind CSS（Nord 冷色調配色）
- **部署**：GitHub Actions → GitHub Pages

## 目錄結構

```
src/
  config.ts              # 網站基本設定 (SITE)
  constants.ts           # 社群連結 (SOCIALS, SHARE_LINKS)
  content.config.ts      # Content Collections schema
  data/blog/             # 文章 Markdown 檔案
    mood/                # 心情札記
    tech/                # 技術文件
    novel/               # 小說連載
  assets/
    images/              # 文章插圖（供 Astro <Image /> 優化）
    icons/               # SVG 圖示
  components/            # Astro 元件
  layouts/               # 頁面佈局
  pages/                 # 路由頁面
  utils/                 # 工具函式
```

## 撰寫新文章

文章放在 `src/data/blog/{category}/` 下，Markdown frontmatter 格式如下：

```markdown
---
title: 文章標題
author: cheung4843
pubDatetime: 2026-01-01T00:00:00Z   # 使用 Asia/Taipei 時區對應的 UTC 時間
slug: url-friendly-slug
featured: false
draft: false
tags:
  - mood   # 分類 tag：tech / mood / novel
description: 文章一行摘要
ogImage: ../../../assets/images/{folder}/cover.jpg   # 選填
---
```

## 圖片規範

- **文章插圖**必須放在 `src/assets/images/` 下（才能被 Astro `<Image />` 優化）
- 在 Markdown 中以**相對路徑**引用，例如：`../../../assets/images/folder/pic.jpg`
- 放在 `public/` 的圖片**不能**用 `<Image />` 優化，強行使用會拋出 `ImageNotFound`

## 文章過濾機制

`postFilter` 只過濾 `draft: true` 的文章，**不**檢查發布時間。
這是刻意的設計，避免伺服器時區 (UTC) 導致新文章在 GitHub Pages 部署後短暫消失。

## 互動元件（MDX）

`.mdx` 文章可以直接 import 並嵌入 Astro 元件，適合放互動視覺化。

**安裝資訊**：`@astrojs/mdx@4.x`（Astro 5 相容版本，`@astrojs/mdx@6` 需要 Astro 6）

**已設定完成**：
- `astro.config.ts`：已加入 `import mdx from "@astrojs/mdx"` 與 `mdx()` integration
- `content.config.ts`：glob pattern 已改為 `**/[^_]*.{md,mdx}`

**使用方式**：把文章副檔名改為 `.mdx`，在文章頂部 import 元件：

```mdx
---
title: 文章標題
...
---

import PCAScatterDemo from '@/components/PCAScatterDemo.astro'

## 章節標題

<PCAScatterDemo />
```

互動元件放在 `src/components/`，純 Vanilla JS + Canvas 元件不需要任何額外設定。

## 功能特色

| 功能 | 說明 |
|------|------|
| Nord 配色 | `h1` 紅、`h2` 橘、`h3` 黃、`h4` 綠 (Nord Aurora) |
| TOC | 文章側欄懸浮目錄，桌機版顯示，支援 h1–h4 |
| LaTeX | `remark-math` + `rehype-katex`，公式顏色跟隨主題 |
| 留言 | Giscus（GitHub Discussions），自動切換深淺主題 |
| ogImage | 文章卡片預覽圖，frontmatter 設定 `ogImage` 啟用 |
| 影片 | Hero Section 自動播放、靜音、循環影片 |
| MDX | `@astrojs/mdx@4.x` 支援在文章中嵌入 Astro 互動元件 |

## 已知陷阱

- **`ogImage` 型別**：可能為 `string` 或優化後的圖片物件；在 `Layout.astro` / `Card.astro` 使用 `<Image />` 時若型別錯誤，以 `as any` 強制轉型
- **Tailwind 4.0 `@apply`**：某些數值（如 `top-24`）在 `<style>` 中 `@apply` 會編譯失敗，改為直接寫在 HTML 標籤上
- **KaTeX 顏色**：在 CSS 對 `.katex`、`.katex-display` 套用 `@apply text-foreground`，確保深淺模式下公式顏色正確

## 常用指令

```bash
npm run dev      # 本地開發 (http://localhost:4321)
npm run build    # 建置產出至 dist/
npm run preview  # 預覽建置結果
```

## 部署

推送到 `main` 分支後，GitHub Actions (`deploy.yml`) 自動建置並部署到 GitHub Pages。
