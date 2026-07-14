# Gameplay

Restores standard player controls after a cutscene or camera sequence. Puts the player in Adventure mode and teleports them to the main character's last position.

## Side
SERVER

## Syntax

```
gameplay [gamemode:string=adventure]
```

## Parameters

- `gamemode` *(string, optional)*: Set the gameplay of the player when entering in gameplay mode. Default to adventure
## Examples

```
// Return control to the player after a cutscene and set it to survival gamemode
# cutscene boss_reveal
# gameplay gamemode:survival
```

```
// Give the player back control after a camera angle
# camera dungeon dramatic_angle
# gameplay
```

```
// End a scripted sequence and let the player explore
# wait 2 seconds
# gameplay
```
