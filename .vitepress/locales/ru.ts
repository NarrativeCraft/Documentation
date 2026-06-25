import type { LocaleSpecificConfig } from 'vitepress'
import type { Versioned } from 'vitepress-versioning-plugin'

type LocaleConfig = LocaleSpecificConfig<Versioned.ThemeConfig> & { label: string; link?: string }

export const ruConfig: LocaleConfig = {
  label: 'Русский',
  lang: 'ru',
  themeConfig: {
    versionSwitcher: false,
    docFooter: {
      prev: 'Предыдущая страница',
      next: 'Следующая страница'
    },
    darkModeSwitchLabel: 'Оформление',
    sidebarMenuLabel: 'Боковое меню',
    returnToTopLabel: 'Наверх',
    langMenuLabel: 'Сменить язык',
    outline: {
      label: 'На этой странице'
    },
    lastUpdated: {
      text: 'Обновлено'
    },
    editLink: {
      text: 'Редактировать эту страницу'
    },
    notFound: {
      title: 'Страница не найдена',
      quote: 'Но если не сворачивать, можно найти что-то другое.',
      linkLabel: 'На главную',
      linkText: 'Вернуться на главную'
    },
    search: {
      provider: 'local',
      options: {
        locales: {
          ru: {
            translations: {
              button: {
                buttonText: 'Поиск',
                buttonAriaLabel: 'Поиск'
              },
              modal: {
                noResultsText: 'Ничего не найдено',
                resetButtonTitle: 'Сбросить',
                footer: {
                  selectText: 'выбрать',
                  navigateText: 'перейти',
                  closeText: 'закрыть'
                }
              }
            }
          }
        }
      }
    },
    nav: [
      { 
        component: 'VersionSwitcher', 
      },
      { text: 'NarrativeCraft', link: '/ru/introduction/what-is-narrativecraft' },
      { text: 'Справочник API', link: '/ru/api/getting-started' },
    ],
    sidebar: {
      '/ru/api/': [
        {
          text: 'Справочник API',
          items: [
            { text: 'Начало работы', link: '/ru/api/getting-started' },
          ]
        },
        {
          text: 'Ядро',
          items: [
            { text: 'События', link: '/ru/api/events' },
          ]
        },
        {
          text: 'Ink Actions',
          items: [
            { text: 'Ink Actions', link: '/ru/api/ink-actions' },
            { text: 'Синтаксис', link: '/ru/api/ink-syntax' },
          ]
        },
        {
          text: 'Катсцены',
          items: [
            { text: 'Слои', link: '/ru/api/cutscene-layers' },
            { text: 'Ключевые кадры', link: '/ru/api/keyframes' },
          ]
        },
        {
          text: 'Диалог',
          items: [
            { text: 'Текстовые эффекты', link: '/ru/api/text-effects' },
          ]
        },
        {
          text: 'Запись',
          items: [
            { text: 'Запись', link: '/ru/api/recording' },
          ]
        },
      ],
      '/ru/': [
        {
          text: 'Введение',
          items: [
            { text: 'Что такое NarrativeCraft?', link: '/ru/introduction/what-is-narrativecraft' },
            { text: 'Предварительные требования', link: '/ru/introduction/prerequisites' },
            { text: 'Структурирование', link: '/ru/introduction/structuration' },
          ]
        },
        {
          text: 'Первая история',
          items: [
            { text: 'Предварительные требования', link: '/ru/first-story/introduction' },
            { text: 'Создание персонажа', link: '/ru/first-story/create-your-characters' },
            { text: 'Первая глава и сцены', link: '/ru/first-story/first-chapter-and-scenes' },
            { text: 'Сессия', link: '/ru/first-story/session' },
            { text: 'Создание анимаций', link: '/ru/first-story/making-animations' },
            { text: 'Первая катсцена', link: '/ru/first-story/first-cutscene' },
            { text: 'Первый ракурс', link: '/ru/first-story/first-camera-angle' },
            { text: 'Первое взаимодействие', link: '/ru/first-story/first-interaction' },
            { text: 'Написание сюжета', link: '/ru/first-story/writing-the-story' },
            { text: 'Запустите сюжет', link: '/ru/first-story/play-the-story' },
          ]
        },
        {
          text: 'Диалоги и текст',
          items: [
            { text: 'Диалог', link: '/ru/dialog-and-text/dialog' },
            { text: 'Текст', link: '/ru/dialog-and-text/text' },
          ]
        },
        {
          text: 'Кастомизация',
          items: [
            { text: 'Главный экран', link: '/ru/customizations/main-screen' },
            { text: 'Звуки', link: '/ru/customizations/sounds' },
          ]
        },
        {
          text: 'Теги',
          collapsed: false,
          items: [
            { text: 'Анимации', link: '/ru/tags/animation' },
            { text: 'Граница', link: '/ru/tags/border' },
            { text: 'Камера', link: '/ru/tags/camera' },
            { text: 'Command', link: '/ru/tags/command' },
            { text: 'Катсцена', link: '/ru/tags/cutscene' },
            { text: 'Затемнение', link: '/ru/tags/fade' },
            { text: 'Геймплей', link: '/ru/tags/gameplay' },
            { text: 'Взаимодействие', link: '/ru/tags/interaction' },
            { text: 'Убийство', link: '/ru/tags/kill' },
            { text: 'При входе', link: '/ru/tags/on_enter' },
            { text: 'Тряска', link: '/ru/tags/shake' },
            { text: 'Звук', link: '/ru/tags/sound' },
            { text: 'Подсцена', link: '/ru/tags/subscene' },
            { text: 'Текст', link: '/ru/tags/text' },
            { text: 'Время', link: '/ru/tags/time' },
            { text: 'Ожидание', link: '/ru/tags/wait' },
            { text: 'Погода', link: '/ru/tags/weather' },
          ]
        }
      ],
    },
  }
}