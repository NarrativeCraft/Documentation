# Command

Executes a vanilla Minecraft command with full operator permissions. The command is run as the player but bypasses permission checks. `@p` is automatically replaced by the player's name. Curly braces must be escaped as `\{` and `\}`.

## Side
SERVER

## Syntax

```
command <commandValue:string>
```

## Parameters

- `commandValue` *(string, required)*: The Minecraft command to execute, without the leading `/`.

## Target a character

`@char(name)` resolves to the entity currently playing that character in the story, and is replaced by `@s` with the character entity as the command executor.

```
# command "attribute @char(user) minecraft:scale base set 3"
```

The name is resolved the same way as anywhere else in the story, so `user` targets the main character. When the character has no active entity, the command falls back to the internal command executor.

Only one `@char(...)` is resolved per command.

## Quotes

A tag value can be quoted with `"` or `'`. Inside a quoted value the other quote character is a plain character, so a command containing double quotes can be wrapped in single quotes:

```
# command 'say "Watch out!"'
```

To use the same quote character inside the value, escape it with `\`:

```
# command "say \"Watch out!\""
```

An unclosed quote fails validation when the story is compiled.

Curly braces are Ink syntax and must be escaped in every case, whichever quote character wraps the value:

```
# command "tellraw @p \{\"text\":\"Chapter 2\"\}"
```

```
# command 'tellraw @p \{"text":"Chapter 2"\}'
```

## Examples

```
// Give the player a diamond sword
# command "give @p diamond_sword 1"
```

```
// Trigger a custom advancement
# command "advancement grant @p only mymod:secret_found"
```

```
// Make the main character glow
# command "effect give @char(user) minecraft:glowing 10 0 true"
```
