# Cutscene

Triggers a pre-built cutscene sequence by name and blocks story progression until it finishes.

## Side
SERVER

## Syntax

```
cutscene <cutsceneName:string>
```

## Parameters

- `cutsceneName` *(string, required)*: Name of the cutscene as defined in the scene editor.

## Examples

```ink
// Play the opening cutscene
# cutscene intro_sequence
```

```ink
// Trigger a cutscene before a boss fight
# cutscene boss_reveal
```

```ink
// Play the ending credits cutscene
# cutscene ending_credits
```
