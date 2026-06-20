import { fileURLToPath } from 'url'
import { dirname } from 'path'
import { enConfig } from './locales/en'
import { frConfig } from './locales/fr'
import defineVersionedConfig from 'vitepress-versioning-plugin'

const __dirname = dirname(fileURLToPath(import.meta.url))

// Single source of truth for the current mod version.
// Bumping a patch = change this one line; every `{{VERSION}}` token in the docs
// is filled automatically, version-aware for past snapshots under versions/.
const latestVersion = '2.0.6'

export default defineVersionedConfig({
  title: "NarrativeCraft",
  description: "Official documentation of NarrativeCraft",

  locales: {
    root: enConfig,
    fr: frConfig,
  } as any,
  cleanUrls: true,
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }],
  ],

  themeConfig: {
    socialLinks: [
      { icon: "modrinth", link: "https://modrinth.com/mod/narrativecraft" },
      { icon: "github", link: "https://github.com/NarrativeCraft/NarrativeCraft" },
      { icon: "discord", link: "https://discord.gg/E3zzNv79DN" },
    ],
    search: {
      provider: "local",
    },
  },
  markdown: {
    theme: {
      light: 'catppuccin-latte',
      dark: 'catppuccin-mocha',
    },
    config: (md) => {
      // Replace {{VERSION}} tokens with the page's own version: a snapshot under
      // versions/2.0.3/ renders "2.0.3", everything else renders latestVersion.
      md.core.ruler.before('normalize', 'version-substitution', (state) => {
        const path: string = state.env?.relativePath ?? ''
        const match = path.match(/(?:^|\/)versions\/(\d+\.\d+\.\d+)\//)
        const version = match ? match[1] : latestVersion
        state.src = state.src.replace(/\{\{\s*VERSION\s*\}\}/g, version)
      })
    },
  },

  versioning: {
    latestVersion,
    rewrites: {
      localePrefix: 'translated',
    },
    sidebars: {
      sidebarPathResolver: (version) => {
        return fileURLToPath(new URL(`./sidebars/versioned/${version}.json`, import.meta.url))
      }
    }
  },

}, __dirname)
