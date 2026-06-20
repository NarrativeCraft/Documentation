# Gameplay

Restores standard player controls after a cutscene or camera sequence. Puts the player in Adventure mode and teleports them to the main character's last position.

## Side
SERVER

## Syntax

```
gameplay
```

## Parameters

This action takes no parameters.

## Examples

```ink
// Return control to the player after a cutscene
# cutscene boss_reveal
# gameplay
```

```ink
// Give the player back control after a camera angle
# camera dungeon dramatic_angle
# gameplay
```

```ink
// End a scripted sequence and let the player explore
# wait 2 seconds
# gameplay
```
