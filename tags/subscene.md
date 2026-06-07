# Subscene

Plays or stops a named subscene, which is a group of animations that run together. Supports looping and blocking until all animations in the group finish.

## Side
SERVER

## Syntax

```
subscene <action:string> <subsceneName:string> [loop:boolean=false] [unique:boolean=false] [--block]
```

## Parameters

- `action` *(string, required)*: What to do. Accepted values: `play`, `stop`.
- `subsceneName` *(string, required)*: Name of the subscene as defined in the scene editor.
- `loop` *(boolean, optional)*: If `true`, all animations in the subscene restart when they all finish. Defaults to `false`.
- `unique` *(boolean, optional)*: If `true`, character entities are killed when the subscene ends. Defaults to `false`.
- `--block` *(flag, optional)*: Pauses story progression until all animations finish. Only applies to `play`.

## Examples

```ink
// Play a group of characters walking in together
# subscene play guards_enter
```

```ink
// Play a looping ambient crowd subscene
# subscene play crowd_idle loop:true
```

```ink
// Play a combat sequence and wait for it to finish
# subscene play battle_intro --block
```

```ink
// Stop a running subscene
# subscene stop crowd_idle
```
