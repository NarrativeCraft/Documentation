import type { LocaleSpecificConfig } from 'vitepress'
import type { Versioned } from 'vitepress-versioning-plugin'

type LocaleConfig = LocaleSpecificConfig<Versioned.ThemeConfig> & { label: string; link?: string }

export const frConfig: LocaleConfig = {
  label: 'Français',
  lang: 'fr',
  link: '/fr/',
  themeConfig: {
    versionSwitcher: false,
    nav: [
      { 
        component: 'VersionSwitcher', 
      },
    ],
    sidebar: {
      '/fr/': [
        {
          text: 'Introduction',
          items: [
            { text: 'C\'est quoi NarrativeCraft ?', link: '/fr/introduction/what-is-narrativecraft' },
          ]
        }
      ],
    },
  }
}
