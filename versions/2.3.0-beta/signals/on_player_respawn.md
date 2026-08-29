# On Player Respawn

Emitted when the player respawns after dying, once they are back in the world. It is also emitted when the player returns from the End through the exit portal.

[`on_player_death`](./on_player_death) is emitted first, when the player dies.

## Side
SERVER

## Syntax

```
= on_player_respawn
```

## Parameters

This signal has no parameter.

## Examples

```
// Pick the story back up where the player died
= on_player_respawn
Alex: You are awake. Do not do that again.
# gameplay
-> DONE
```

```
// Send the player back to the scene they failed
= on_player_respawn
-> chapter_2_second_try
```

```
// Count the attempts and give up after three deaths
VAR attempts = 0

= on_player_respawn
~ attempts = attempts + 1
{attempts >= 3:
    -> chapter_2_easy_path
}
# gameplay
-> DONE
```
