# On Player Swing Hand

Emitted when the player swings a hand, whether or not the swing hits something.

## Side
CLIENT

## Syntax

```
= on_player_swing_hand(hand)
```

## Parameters

- `hand` *(string)*: Hand that was swung. Accepted values: `main_hand`, `off_hand`.

## Examples

```
// React to the player swinging at nothing
= on_player_swing_hand(hand)
Alex: Fighting the air will not help.
# gameplay
-> DONE
```

```
// Let the player knock by punching a door area
VAR knocks = 0

= on_player_swing_hand(hand)
{hand == "main_hand":
    ~ knocks = knocks + 1
}
{knocks >= 3:
    -> chapter_1_door_opens
}
# gameplay
-> DONE
```
