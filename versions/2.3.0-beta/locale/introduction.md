# Locale

Locale allows you to translate your story.

Your Ink files keep the story structure and use translation keys instead of the final text. Each language then has YAML files that associate these keys with translated text.

For example, your story contains:

```text
Alice: @trans(chapter_1.market.welcome)
```

The English translation contains:

```yaml
chapter_1.market.welcome: "Welcome to the market!"
```

And the French translation contains:

```yaml
chapter_1.market.welcome: "Bienvenue au marché !"
```

The same Ink story is used for both languages. Only the displayed text changes.

## Locale codes

Each language is identified by a lowercase locale code:

- `en_us` for English (United States)
- `en_gb` for English (United Kingdom)
- `fr_fr` for French (France)
- `de_de` for German (Germany)
- etc...

You can also use a language code without a region, such as `en` or `fr`. However, it is recommended to use the locale syntax shown above so that it matches Minecraft's locale code.


## Default locale

Every story has a default locale. It is used when:

- A player has not selected another story language.
- The selected locale does not contain a translation.
- The player's saved locale is no longer available.

You should fully translate the default locale before adding other languages. It will act as a fallback for every incomplete translation.

## Folder structure

Translations are stored in the `locales` folder of your world:

```text
narrativecraft/
├── chapters/
├── locales/
│   ├── en_us/
│   │   ├── global.yml
│   │   └── chapter_1.yml
│   └── fr_fr/
│       ├── global.yml
│       └── chapter_1.yml
├── functions.ink
├── main.ink
└── variables.ink
```

NarrativeCraft creates one translation file for each chapter that uses translation keys:

- Keys from chapter 1 are added to `chapter_1.yml`.
- Keys from chapter 2 are added to `chapter_2.yml`.
- Keys from `variables.ink`, and `functions.ink` are added to `global.yml`.

Some of these files may not exist if no translation key is used there.

## Translation workflow

To translate a story:

1. Replace displayed text in your Ink files with [`@trans(...)` keys](/locale/translation-keys).
2. Run `/nc locale sync` to generate the missing keys for your default locale.
3. Fill the generated YAML values with the default text.
4. Run `/nc locale add fr_fr` to create another locale.
5. Translate the values in `locales/fr_fr/`.
6. Run `/nc story reload` after changing Ink files, or `/nc locale reload` when you only edit YAML files.

The next page explains where and how to use translation keys.
