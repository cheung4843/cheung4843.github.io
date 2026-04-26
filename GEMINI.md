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
    *   「關於我 (About)」頁面加入專屬介紹，並嵌入了 YouTube 歌曲（想和你看五月的晚風）。
    *   清理了範本預設的示範文章，僅保留 `tech` 和 `mood` 分類的示範文章（例如：「彼岸的起源」）。
*   **部署與版本控制**：
    *   將專案推送到 GitHub Repository `cheung4843/cheung4843.github.io`。
    *   設定 GitHub Actions 工作流程 (`deploy.yml`)，實現自動部署到 GitHub Pages 根網域 (`https://cheung4843.github.io/`)。
