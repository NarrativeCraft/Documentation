# On Game Focus Lost

Emitted when the game window loses focus, for example when the player alt-tabs or clicks on another window.

The game is not paused in this situation on a multiplayer server, so the story keeps running.

## Side
CLIENT

## Syntax

```
= on_game_focus_lost
```

## Parameters

This signal has no parameter.

## Examples

```
// Stop an ambient sound while the player is away
= on_game_focus_lost
# sound stop ambient_wind
# gameplay
-> DONE
```

```
// Count how many times the player looked away
VAR times_away = 0

= on_game_focus_lost
~ times_away = times_away + 1
# gameplay
-> DONE
```
