import type { DefaultTheme, LocaleSpecificConfig } from 'vitepress'

type LocaleConfig = LocaleSpecificConfig<DefaultTheme.Config> & { label: string; link?: string }

export const frConfig: LocaleConfig = {
  label: 'Français',
  lang: 'fr',
  link: '/fr/',
  themeConfig: {
    nav: [
      {
        text: '2.0.0',
        items: [
          { text: '2.0.0', link: '/fr/' },
        ]
      },
    ],
    sidebar: [
      {
        text: 'Introduction',
        items: [
          { text: 'C\'est quoi NarrativeCraft ?', link: '/fr/introduction/what-is-narrativecraft' },
        ]
      }
    ],
  }
}
