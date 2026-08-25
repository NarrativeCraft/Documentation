# Kill

Removes a named character from the scene by despawning their entity. Works for both global characters and NPCs defined in the current scene.

## Side
SERVER

## Syntax

```
kill <characterName:string>
```

## Parameters

- `characterName` *(string, required)*: Name of the character to despawn, as defined in the character manager or scene editor.

## Examples

```
// Despawn the guard character after the scene ends
# kill guard
```

```
// Remove an NPC after their dialogue
# kill merchant_npc
```

```
// Clean up multiple characters at once
# kill soldier_1
# kill soldier_2
```
