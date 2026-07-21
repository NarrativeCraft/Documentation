import { fileURLToPath } from 'url'
import { dirname } from 'path'
import { enConfig } from './locales/en'
import { frConfig } from './locales/fr'
import { ruConfig } from './locales/ru'
import defineVersionedConfig from 'vitepress-versioning-plugin'

const __dirname = dirname(fileURLToPath(import.meta.url))

const latestVersion = '2.1.2'

export default defineVersionedConfig({
  title: "NarrativeCraft",
  description: "Official documentation of NarrativeCraft",

  locales: {
    root: enConfig,
    fr: frConfig,
    ru: ruConfig,
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
