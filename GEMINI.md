我想要的是偶爾放技術文章、偶爾放我個人的心情札記之類的，可能分享一些歌曲，甚至是放我寫的文章跟小說。因此我想要製作一個部落格，使用 Astro Paper

## 目前已完成的功能與修改 (2026-04-26)
*   **框架與主題**：基於 Astro Paper 建立，並初始化專案。
*   **基本資訊更新**：
    *   網站名稱：The other shore
    *   作者：cheung4843
    *   網站描述：屬於我自己的彼岸
    *   語系：zh-TW
*   **版面與風格客製化**：
    *   整體顏色更換為 **Nord (北歐冷色調)** 風格。
    *   Markdown 標題層級套用 **Nord Aurora (極光)** 配色 (`h1`紅、`h2`橘、`h3`黃、`h4`綠)，並移除了預設的 `h3` 斜體樣式。
    *   首頁 Hero Section 中文化：「歡迎來到彼岸」及專屬的自我介紹。
    *   首頁各區塊標題及按鈕（精選文章、最近更新、所有文章）中文化。
    *   自訂 Footer：`Copyright © {currentYear} cheung4843 | The other shore`。
*   **導覽列與分類 (Tags)**：
    *   修改導覽列選單為：技術文件 (`/tags/tech`)、心情札記 (`/tags/mood`)、小說 (`/tags/novel`)、標籤、關於我。
    *   使用 Markdown frontmatter 的 `tags` 屬性來自動分類文章。
*   **頁面更新**：
    *   「關於我 (About)」頁面加入專屬介紹，並嵌入了 YouTube 歌曲。
    *   清理了範本預設的示範文章，僅保留 `tech` 和 `mood` 分類的示範文章（例如：「彼岸的起源」）。
*   **部署與版本控制**：
    *   將專案推送到 GitHub Repository `cheung4843/cheung4843.github.io`。
    *   設定 GitHub Actions 工作流程 (`deploy.yml`)，實現自動部署到 GitHub Pages 根網域 (`https://cheung4843.github.io/`)。
*   **多媒體與互動功能 (2026-04-26 續)**：
    *   **首頁影片**：在 Hero Section 加入自動播放、靜音、循環且帶有控制列的影片 (`/hero-video.mp4`)。
    *   **留言系統**：整合 **Giscus (GitHub Discussions)**，支援深淺色主題自動切換。
    *   **文章目錄 (TOC)**：在文章側邊加入懸浮目錄導覽，支援 h1-h4 層級縮進，僅在桌機版寬螢幕顯示以保護閱讀體驗。
    *   **預覽圖片 (Card Image)**：修改首頁文章卡片，若文章有設定 `ogImage` 則顯示預覽圖。
    *   **數學公式支援 (LaTeX) (2026-04-27)**：
    *   整合 `remark-math` 與 `rehype-katex` 插件，支援 Markdown 中的 LaTeX 語法。
    *   引入 KaTeX CSS 並修正公式顏色，確保在深淺色主題下公式字體顏色正確（跟隨主題文字顏色）。
    *   **部署與細節優化 (2026-04-27)**：
    *   **修復 Build 錯誤**：解決 GitHub Actions 中因 `ogImage` 型別不相容導致的部署失敗問題。
    *   **首頁影片更新**：同步首頁 Hero Section 影片屬性，加入 `muted`、`loop` 與 `controls`。
    *   **文章過濾機制調整 (2026-04-27)**：
    *   簡化 `postFilter.ts` 邏輯，移除發布時間檢查，僅保留 `draft: true` 檢查。
    *   解決了因伺服器時區 (UTC) 導致未來文章在標籤頁面與首頁消失的問題，確保所有非草稿文章在推送後立即生效。

    ## 技術備忘與排除萬難 (Lessons Learned)    *   **圖片路徑陷阱**：
    *   放在 `public/` 的圖片無法被 Astro 的 `<Image />` 組件優化，強行使用會導致 `ImageNotFound` 錯誤。
    *   **解決方案**：將文章插圖移至 `src/assets/images/`，並在 Markdown 中使用相對於該檔案的相對路徑 (如 `../../../assets/images/pic.jpg`)。
    *   **Layout 與組件型別相容性**：
    *   `ogImage` 可能為字串或優化後的圖片物件。在 `Layout.astro` 或 `Card.astro` 中使用 `<Image />` 時，若遇到型別檢查失敗，可透過 `as any` 強制轉型解決編譯錯誤。
    *   **LaTeX 樣式覆蓋**：
    *   KaTeX 渲染出的 HTML 元素可能會繼承非預期的顏色設定（如藍色）。
    *   **解決方案**：在 CSS 中針對 `.katex` 與 `.katex-display` 類別明確套用 `@apply text-foreground`，使其顏色與主題一致。
    *   **Tailwind 4.0 編譯問題**：
    *   在 `<style>` 中使用 `@apply` 某些數值（如 `top-24`）可能導致編譯失敗。
    *   **解決方案**：直接將類名寫在 HTML 標籤上，避開 CSS 模組的解析限制。
*   **TOC 佈局**：
    *   使用 `relative` 容器搭配 `absolute left-[100%]` 可以讓目錄懸浮在內容之外，不佔據文章原本的閱讀寬度。
