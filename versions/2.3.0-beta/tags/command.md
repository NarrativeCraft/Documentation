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
// Give cake with the custom name "Super cake" (1.20.1)
# command "/give cake\{display:\{Name:'\{"text":"super cake"\}'\}\} 1"
```
