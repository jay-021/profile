import { QuartzConfig } from "./quartz/cfg"
import * as Plugin from "./quartz/plugins"

/**
 * Jay Mathukiya — Portfolio Site
 * Live at: https://jay-021.github.io/profile/
 * Repo: github.com/jay-021/profile
 */
const config: QuartzConfig = {
  configuration: {
    pageTitle: "Jay Mathukiya",
    pageTitleSuffix: "",
    enableSPA: true,
    enablePopovers: true,
    analytics: null,
    locale: "en-GB",
    baseUrl: "jay-021.github.io/profile",
    ignorePatterns: [
      "500 - Job Hunt Germany",
      "700 - GitHub",
      "_templates",
      "_attachments",
      "private",
      "Untitled.canvas",
    ],
    defaultDateType: "modified",
    generateSocialImages: false,
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
          light: "#ffffff",
          lightgray: "#f0f0f0",
          gray: "#b8b8b8",
          darkgray: "#333333",
          dark: "#0d1117",
          secondary: "#0052cc",
          tertiary: "#0747a6",
          highlight: "rgba(0, 82, 204, 0.08)",
          textHighlight: "#ffcc0088",
        },
        darkMode: {
          light: "#0d1117",
          lightgray: "#161b22",
          gray: "#30363d",
          darkgray: "#8b949e",
          dark: "#f0f6fc",
          secondary: "#58a6ff",
          tertiary: "#388bfd",
          highlight: "rgba(88, 166, 255, 0.1)",
          textHighlight: "#b9a60088",
        },
      },
    },
  },
  plugins: {
    transformers: [
      Plugin.FrontMatter(),
      Plugin.CreatedModifiedDate({
        priority: ["frontmatter", "filesystem"],
      }),
      Plugin.SyntaxHighlighting({
        theme: {
          light: "github-light",
          dark: "github-dark",
        },
        keepBackground: false,
      }),
      Plugin.ObsidianFlavoredMarkdown({ enableInHtmlEmbed: false }),
      Plugin.GitHubFlavoredMarkdown(),
      Plugin.TableOfContents(),
      Plugin.CrawlLinks({ markdownLinkResolution: "shortest" }),
      Plugin.Description(),
      Plugin.Latex({ renderEngine: "katex" }),
    ],
    filters: [Plugin.RemoveDrafts()],
    emitters: [
      Plugin.AliasRedirects(),
      Plugin.ComponentResources(),
      Plugin.ContentPage(),
      Plugin.FolderPage(),
      Plugin.TagPage(),
      Plugin.ContentIndex({
        enableSiteMap: true,
        enableRSS: true,
      }),
      Plugin.Assets(),
      Plugin.Static(),
      Plugin.NotFoundPage(),
    ],
  },
}

export default config
