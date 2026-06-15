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

## Examples

```ink
// Give the player a diamond sword
# command "give @p diamond_sword 1"
```

```ink
// Trigger a custom advancement
# command "advancement grant @p only mymod:secret_found"
```

```ink
// Play a title screen message
# command "title @p title \{"text":"Chapter 2","bold":true\}"
```
