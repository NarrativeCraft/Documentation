# Translation keys

A translation key is a stable name that represents a piece of text. Write it inside `@trans(...)` wherever the player should see translated content.

```text
@trans(chapter_1.market.welcome)
```

Translation keys can contain letters, numbers, dots, underscores, and hyphens.

Use clear names that describe where the text appears:

```text
chapter_1.market.welcome
chapter_1.market.buy_apples
chapter_1.market.title
```

Avoid names such as `text1` or `line4`. A descriptive key is easier to find and can remain unchanged when you rewrite its translation.

## Dialog

Keep the character name outside of the translation expression:

```text
Alice: @trans(chapter_1.market.welcome)
```

Only the dialog is translated. `Alice` must remain unchanged so NarrativeCraft can identify the character.

## Choices

Translation keys can be used inside Ink choices:

```text
* [@trans(chapter_1.market.buy)]
    -> buy
* [@trans(chapter_1.market.leave)]
    -> leave
```

The knots and diverts are part of the story structure, so they should not be translated.

## Text tags

You can also translate text displayed by a tag:

```text
# text chapter_title create "@trans(chapter_1.market.title)"
```

Keep the expression between quotes when it is used as a tag value. The text can then contain spaces without changing how the tag is read.

The same expression can be used for text added to a cutscene.

::: warning
Use `@trans(...)` only for content displayed to the player. Do not translate character names, knot names, scene names, cutscene names, ids, or command names.
:::

## Dynamic values

Pass a named argument when part of a sentence changes during the story:

```text
VAR apple_count = 3

Alice: @trans(chapter_1.market.apples_left, count={apple_count})
```

Use `%count%` in the translation file where the value should appear:

```yaml
chapter_1.market.apples_left: "There are %count% apples left."
```

If `apple_count` is `3`, the player will see:

```text
There are 3 apples left.
```

The argument name inside `%...%` must match the name passed to `@trans(...)`.

You can pass several values:

```text
@trans(chapter_1.market.price, count={apple_count}, price={apple_price})
```

```yaml
chapter_1.market.price: "%count% apples cost %price% coins."
```

If an argument itself contains a comma, put its value between quotes:

```text
@trans(chapter_1.travel.arrival, place="Paris, France")
```

## Player name

Use `%user%` directly inside a translation to display the current player's name:

```yaml
chapter_1.market.welcome: "Welcome to the market, %user%!"
```

You do not need to pass `%user%` as an argument.

Now that your Ink files contain translation keys, you can fill their values in the [translation files](/locale/translation-files).
