import type { DefaultTheme, LocaleSpecificConfig } from 'vitepress'

type LocaleConfig = LocaleSpecificConfig<DefaultTheme.Config> & { label: string; link?: string }

export const enConfig: LocaleConfig = {
  label: 'English',
  lang: 'en',
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
    ],
    sidebar: [
      {
        text: 'Introduction',
        items: [
          { text: 'What is NarrativeCraft?', link: '/introduction/what-is-narrativecraft' },
          { text: 'Prerequisites', link: '/introduction/prerequisites' },
          { text: 'Structuration', link: '/introduction/structuration' },
        ]
      }
    ],
  }
}
