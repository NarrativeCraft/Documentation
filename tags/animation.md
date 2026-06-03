# Animation

Plays or stops a named character animation defined in the scene editor. Supports looping and blocking until the animation finishes.

## Side
SERVER

## Syntax

```
animation <action:string> <animationName:string> [loop:boolean=false] [unique:boolean=false] [--block]
```

## Parameters

- `action` *(string, required)*: What to do. Accepted values: `play`, `stop`.
- `animationName` *(string, required)*: Name of the animation as defined in the scene editor.
- `loop` *(boolean, optional)*: If `true`, the animation restarts automatically when it ends. Defaults to `false`.
- `unique` *(boolean, optional)*: If `true`, the character entity is killed when the animation ends. Defaults to `false`.
- `--block` *(flag, optional)*: Pauses story progression until the animation finishes. Only applies to `play`.

## Examples

```ink
// Play a walking animation without blocking
# animation play guard_patrol
```

```ink
// Play a looping idle animation
# animation play npc_idle loop=true
```

```ink
// Play a death animation and wait for it to finish
# animation play boss_death --block
```

```ink
// Stop a running animation
# animation stop guard_patrol
```
