import { defineConfig } from 'vitepress'
import { enConfig } from './locales/en'
import { frConfig } from './locales/fr'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "NarrativeCraft",
  description: "Official documentation of NarrativeCraft",

  locales: {
    root: enConfig,
    fr: frConfig,
  },
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

})
