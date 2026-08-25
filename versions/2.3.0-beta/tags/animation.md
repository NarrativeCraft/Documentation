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

## Entity reuse

When a character already has an entity in the story and it stands within one block of the animation's first recorded position, that entity plays the animation instead of a new one being spawned.

This keeps a character continuous across consecutive animations. Place the first frame of a follow-up animation on the character's current position to take advantage of it.

## Examples

```
// Play a walking animation without blocking
# animation play guard_patrol
```

```
// Play a looping idle animation
# animation play npc_idle loop:true
```

```
// Play a death animation and wait for it to finish
# animation play boss_death --block
```

```
// Stop a running animation
# animation stop guard_patrol
```
