# On Player Jump

Emitted when the player jumps.

## Side
SERVER

## Syntax

```
= on_player_jump
```

## Parameters

This signal has no parameter.

## Examples

```
// Have a character react to the player fooling around
= on_player_jump
Alex: Are you done?
# gameplay
-> DONE
```

```
// Teach the player a movement, then move on
VAR jumps = 0

= on_player_jump
~ jumps = jumps + 1
{jumps >= 3:
    -> chapter_1_tutorial_done
}
# gameplay
-> DONE
```
