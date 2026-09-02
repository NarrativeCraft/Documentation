# Gameplay

Restores standard player controls after a cutscene or camera sequence. Puts the player in the requested game mode, teleports them to the main character's last position, and brings the HUD back.

## Side
CLIENT_SERVER

## Syntax

```
gameplay [gamemode:string=adventure]
```

## Parameters

- `gamemode` *(string, optional)*: Game mode applied when entering gameplay mode. Accepted values: `adventure`, `survival`, `creative`, `spectator`. Defaults to `adventure`.

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
