---
title: Quartz Publishing Guide
publish: false
tags:
  - meta
  - quartz
  - github-pages
  - setup
date: 2026-04-06
---

# 🌐 Publishing This Vault as a Website with Quartz

> [!info] Goal
> Publish this Obsidian vault as a live portfolio website at:
> **`https://jay-021.github.io/profile/`**
> using [Quartz](https://github.com/jackyzha0/quartz) — the fastest Obsidian-to-website tool.

---

## 📋 One-Time Setup (Do This Once)

### Step 1 — Fork Quartz

1. Go to [github.com/jackyzha0/quartz](https://github.com/jackyzha0/quartz)
2. Click **Fork** → name the repo **`profile`**
3. Your repo will be: `github.com/jay-021/profile`

### Step 2 — Clone Locally

```bash
git clone https://github.com/jay-021/profile.git
cd profile
npm install
```

### Step 3 — Copy Vault Content into Quartz

```bash
# From inside the profile/ repo folder:
cp -r "/path/to/Obsidian Vault/"* ./content/
```

Or point Quartz directly at your vault in `quartz.config.ts`:

```ts
// quartz.config.ts
const config: QuartzConfig = {
  configuration: {
    pageTitle: "Jay Mathukiya",
    enableSPA: true,
    enablePopovers: true,
    analytics: null,
    locale: "en-GB",
    baseUrl: "jay-021.github.io/profile",
    ignorePatterns: [
      "500 - Job Hunt Germany",   // ← hides job hunt from live site
      "700 - GitHub",              // ← deprecated folder
      "_templates",
      "_attachments",
      "private",
      "*.canvas"                   // canvas files don't render in Quartz
    ],
    defaultDateType: "modified",
    theme: {
      fontOrigin: "googleFonts",
      cdnCaching: true,
      typography: {
        header: "Inter",
        body: "Inter",
        code: "JetBrains Mono",
      },
      colors: {
        lightMode: {
          light: "#fafafa",
          lightgray: "#e5e5e5",
          gray: "#b8b8b8",
          darkgray: "#4e4e4e",
          dark: "#1a1a2e",
          secondary: "#0052cc",
          tertiary: "#0747a6",
          highlight: "rgba(0, 82, 204, 0.1)",
        },
        darkMode: {
          light: "#0d1117",
          lightgray: "#21262d",
          gray: "#484f58",
          darkgray: "#8b949e",
          dark: "#f0f6fc",
          secondary: "#58a6ff",
          tertiary: "#388bfd",
          highlight: "rgba(88, 166, 255, 0.1)",
        },
      },
    },
  },
  plugins: {
    transformers: [
      Plugin.FrontMatter(),
      Plugin.CreatedModifiedDate({ priority: ["frontmatter", "filesystem"] }),
      Plugin.Latex({ renderEngine: "katex" }),
      Plugin.SyntaxHighlighting(),
      Plugin.ObsidianFlavoredMarkdown({ enableInHtmlEmbed: false }),
      Plugin.GitHubFlavoredMarkdown(),
      Plugin.TableOfContents(),
      Plugin.CrawlLinks({ markdownLinkResolution: "shortest" }),
      Plugin.Description(),
    ],
    filters: [Plugin.RemoveDrafts()],  // removes publish: false notes
    emitters: [
      Plugin.AliasRedirects(),
      Plugin.ComponentResources(),
      Plugin.ContentPage(),
      Plugin.FolderPage(),
      Plugin.TagPage(),
      Plugin.ContentIndex({ enableSiteMap: true, enableRSS: true }),
      Plugin.Assets(),
      Plugin.Static(),
      Plugin.NotFoundPage(),
    ],
  },
}
```

### Step 4 — Enable GitHub Pages

1. Go to `github.com/jay-021/profile` → **Settings** → **Pages**
2. Set Source: **GitHub Actions**
3. Quartz ships with a `.github/workflows/deploy.yml` — it auto-deploys on every push

### Step 5 — Deploy

```bash
npx quartz sync --no-pull   # first time
# or
npx quartz build
git add -A && git commit -m "publish vault" && git push
```

---

## 🙈 What Gets Hidden from the Public Site

These folders have `publish: false` in their frontmatter — Quartz's `RemoveDrafts` plugin automatically excludes them:

| Hidden | Reason |
|--------|--------|
| `500 - Job Hunt Germany/` | Private job hunt strategy |
| `700 - GitHub/` (deprecated) | Merged into Projects |
| `_templates/` | Internal templates |
| `_attachments/` | Raw files |

---

## ✅ What's Live on the Public Site

| Visible Folder | Content |
|---------------|---------|
| `000 - HQ/` | Home page, dashboard |
| `100 - Projects/` | All projects + GitHub portfolio |
| `200 - Experience/` | Work history |
| `300 - Skills & Tech/` | Full tech stack |
| `400 - Certifications/` | All 22 credentials |
| `600 - Education/` | Vilnius University |

---

## 🔗 Resources

- [Quartz Docs](https://quartz.jzhao.xyz/)
- [Quartz GitHub](https://github.com/jackyzha0/quartz)
- [GitHub Pages Docs](https://docs.github.com/en/pages)
- [Your Repo (after setup)](https://github.com/jay-021/profile)
- [Live Site (after deploy)](https://jay-021.github.io/profile/)
