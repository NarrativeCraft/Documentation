# On Player Sneak

Emitted when the player starts or stops sneaking. Both changes use the same signal, so read `is_sneaking` to know which one happened.

## Side
CLIENT

## Syntax

```
= on_player_sneak(is_sneaking)
```

## Parameters

- `is_sneaking` *(bool)*: `true` when the player started sneaking, `false` when they stopped.

## Examples

```
// Approve of the player being careful
= on_player_sneak(is_sneaking)
{is_sneaking:
    Alex: Good, stay low.
}
# gameplay
-> DONE
```

```
// Fail a stealth section when the player stands up
= on_player_sneak(is_sneaking)
{not is_sneaking:
    -> chapter_2_spotted
}
# gameplay
-> DONE
```
