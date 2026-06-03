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

  themeConfig: {
    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  }
})
