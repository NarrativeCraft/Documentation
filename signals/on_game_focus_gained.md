# On Game Focus Gained

Emitted when the game window becomes active again, after the player alt-tabbed away or clicked outside of the game.

## Side
CLIENT

## Syntax

```
= on_game_focus_gained
```

## Parameters

This signal has no parameter.

## Examples

```
// Welcome the player back
= on_game_focus_gained
Alex: There you are.
# gameplay
-> DONE
```

```
// Resume the ambient sound that was stopped when focus was lost
= on_game_focus_gained
# sound play ambient_wind
# gameplay
-> DONE
```
