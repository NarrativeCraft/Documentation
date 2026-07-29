# Translation files

Each locale has its own YAML files inside:

```text
<world>/narrativecraft/locales/<locale>/
```

For example:

```text
<world>/narrativecraft/locales/en_us/chapter_1.yml
<world>/narrativecraft/locales/fr_fr/chapter_1.yml
```

Run `/nc locale sync` to add missing keys to all existing locales, or `/nc locale add <locale>` to create a new locale with every key currently used by the story.

## Fill the generated values

New entries have an empty value:

```yaml
chapter_1.market.welcome: ""
chapter_1.market.buy: ""
chapter_1.market.leave: ""
```

Keep each key unchanged and write its translation after `:`.

English:

```yaml
chapter_1.market.welcome: "Welcome to the market, %user%!"
chapter_1.market.buy: "Buy apples"
chapter_1.market.leave: "Leave the market"
chapter_1.market.apples_left: "There are %count% apples left."
chapter_1.market.title: "The market"
```

French:

```yaml
chapter_1.market.welcome: "Bienvenue au marché, %user% !"
chapter_1.market.buy: "Acheter des pommes"
chapter_1.market.leave: "Quitter le marché"
chapter_1.market.apples_left: "Il reste %count% pommes."
chapter_1.market.title: "Le marché"
```

Putting text between double quotes is recommended. It prevents characters such as `:` or `#` from being interpreted as YAML syntax.

::: warning
Do not translate the key on the left. The same key must be used in the Ink file and in every locale.
:::

## Nested YAML

NarrativeCraft generates flat keys, but nested YAML is also supported.

These two formats are equivalent:

```yaml
chapter_1.market.welcome: "Welcome!"
```

```yaml
chapter_1:
  market:
    welcome: "Welcome!"
```

Using the generated flat format is usually simpler, especially when synchronizing several languages.

Both `.yml` and `.yaml` files are supported. You can also organize them in subfolders inside the locale folder.

## Missing translations

When NarrativeCraft displays a key, it looks for the text in this order:

1. The locale selected by the player.
2. The default locale.
3. The translation key itself.

An empty value is considered missing. This means you can publish a partially translated locale and let its missing entries use the default language.

For example, if `fr_fr` contains:

```yaml
chapter_1.market.welcome: ""
```

The English value is displayed when `en_us` is the default locale. If the English value is also empty or missing, the player sees:

```text
chapter_1.market.welcome
```

Seeing a translation key in game usually means that its value is missing from both the selected and default locales.

## Apply your changes

After editing only YAML files, run:

```text
/nc locale reload
```

This reloads translations without recompiling the story.

After editing an Ink file, run:

```text
/nc story reload
```

This recompiles the story and reloads the translations at the same time.

The currently displayed dialog or choices are refreshed when translations are reloaded. A text overlay that is already visible keeps its current text and uses the new translation the next time it is displayed.
