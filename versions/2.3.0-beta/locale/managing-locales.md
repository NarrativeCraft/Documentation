# Managing locales

Locale management commands require moderator permissions.

## List locales

```text
/nc locale list
```

This displays the default locale and the number of translated keys in each available locale.

An empty translation does not count as translated.

## Add a locale

```text
/nc locale add fr_fr
```

This command:

- Creates `locales/fr_fr/`.
- Scans the Ink files for every `@trans(...)` key.
- Creates the corresponding `global.yml` and `chapter_<number>.yml` files.
- Makes the locale available to players.

The generated translations are empty. Open the YAML files, fill their values, then run:

```text
/nc locale reload
```

Locale codes are converted to lowercase. Use codes such as `en_us`, `fr_fr`, `pt_br`, or `ja_jp`.

## Synchronize locales

Run this command after adding, renaming, or removing translation keys in your Ink files:

```text
/nc locale sync
```

NarrativeCraft checks every locale and appends missing keys to the appropriate files:

```yaml
# --- added by /nc locale sync ---
chapter_1.market.new_offer: ""
```

Existing translations, comments, order, and formatting are preserved.

Keys that are no longer used by any Ink file are reported in chat. They are never deleted automatically, so you can check and remove them yourself.

After filling the new values, run `/nc locale reload`. If you also changed the Ink story, use `/nc story reload` instead.

## Change the default locale

```text
/nc locale default en_us
```

The default locale is used for players without another valid selection and as the fallback for missing translations.

If the locale does not exist yet, NarrativeCraft creates it with empty translation values. It is safer to add and translate the locale before making it the default.

## Reload translations

```text
/nc locale reload
```

Use this after editing YAML files. Players do not need to restart their story. A dialog or choice currently on screen is immediately displayed in the updated language.

## Let players select a language

When at least two locales are available, a `Story Language` button appears in the NarrativeCraft main-screen options.

The player can:

1. Open `Options`.
2. Click `Story Language`.
3. Select an available language.
4. Click `Done` to save the setting.

The new language applies immediately, even when a story is running. If a dialog or a list of choices is visible, it is refreshed in the selected language.

An already visible text overlay is not refreshed. It uses the selected language the next time it is displayed.

The command alternative is:

```text
/nc story locale fr_fr
```

A moderator can change the locale of another player:

```text
/nc story locale fr_fr <player>
```

## Remove a locale

```text
/nc locale remove fr_fr
```

::: danger
This permanently deletes the locale folder and all translations inside it. Make a backup if you may need them again.
:::

The default locale cannot be removed. Select another default locale first.

Players using a removed locale are moved back to the default locale.

## Command summary

| Command | Purpose |
|---|---|
| `/nc locale list` | List locales and translation progress |
| `/nc locale add <locale>` | Create a locale and its translation files |
| `/nc locale sync` | Add missing keys and report unused keys |
| `/nc locale reload` | Reload YAML translations |
| `/nc locale default <locale>` | Change the default locale |
| `/nc locale remove <locale>` | Delete a locale |
| `/nc story locale <locale> [target]` | Change a player's story language |
