import { fileURLToPath } from 'url'
import { dirname } from 'path'
import { enConfig } from './locales/en'
import { frConfig } from './locales/fr'
import defineVersionedConfig from 'vitepress-versioning-plugin'

const __dirname = dirname(fileURLToPath(import.meta.url))

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
    }
  },

  versioning: {
    latestVersion: '2.0.6',
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
