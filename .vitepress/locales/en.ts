import type { DefaultTheme, LocaleSpecificConfig } from 'vitepress'

type LocaleConfig = LocaleSpecificConfig<DefaultTheme.Config> & { label: string; link?: string }

export const enConfig: LocaleConfig = {
  label: 'English',
  lang: 'en',
  themeConfig: {
    nav: [
      {
        text: '2.0.0',
        items: [
          { text: '2.0.0', link: '/' },
        ]
      },
    ],
    sidebar: [
      {
        text: 'Introduction',
        items: [
          { text: 'What is NarrativeCraft?', link: '/introduction/what-is-narrativecraft' },
          { text: 'Prerequisites', link: '/introduction/prerequisites' },
          { text: 'Structuration', link: '/introduction/structuration' },
        ]
      },
       {
        text: 'First story',
        items: [
          { text: 'Introduction', link: '/first-story/introduction' },
          { text: 'Create your characters', link: '/first-story/create-your-characters' },
          { text: 'First chapter and scenes', link: '/first-story/first-chapter-and-scenes' },
          { text: 'Session', link: '/first-story/session' },
          { text: 'Making animations', link: '/first-story/making-animations' },
          { text: 'First cutscene', link: '/first-story/first-cutscene' },
          { text: 'First camera angle', link: '/first-story/first-camera-angle' },
          { text: 'First interaction', link: '/first-story/first-interaction' },
          { text: 'Writing the story', link: '/first-story/writing-the-story' },
        ]
      },
      {
        text: 'Dialog And Text',
        items: [
          { text: 'Dialog', link: '/dialog-and-text/dialog' },
          { text: 'Text', link: '/dialog-and-text/text' },
        ]
      },
      {
        text: 'Customizations',
        items: [
          { text: 'Main Screen', link: '/customizations/main-screen' },
          { text: 'Sounds', link: '/customizations/sounds' },
        ]
      },
      {
    text: 'Tags',
    items: [
      { text: 'Animation', link: '/tags/animation' },
      { text: 'Border', link: '/tags/border' },
      { text: 'Camera', link: '/tags/camera' },
      { text: 'Command', link: '/tags/command' },
      { text: 'Cutscene', link: '/tags/cutscene' },
      { text: 'Fade', link: '/tags/fade' },
      { text: 'Gameplay', link: '/tags/gameplay' },
      { text: 'Interaction', link: '/tags/interaction' },
      { text: 'Kill', link: '/tags/kill' },
      { text: 'On Enter', link: '/tags/on_enter' },
      { text: 'Save', link: '/tags/save' },
      { text: 'Shake', link: '/tags/shake' },
      { text: 'Sound', link: '/tags/sound' },
      { text: 'Subscene', link: '/tags/subscene' },
      { text: 'Text', link: '/tags/text' },
      { text: 'Time', link: '/tags/time' },
      { text: 'Wait', link: '/tags/wait' },
      { text: 'Weather', link: '/tags/weather' },
    ]
  }
    ],
  }
}
