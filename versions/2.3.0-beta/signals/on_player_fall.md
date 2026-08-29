# On Player Fall

Emitted when the player takes fall damage. Falls short enough to deal no damage do not emit this signal.

[`on_player_hurt`](./on_player_hurt) is emitted as well, with `fall` as its damage id.

## Side
SERVER

## Syntax

```
= on_player_fall(distance)
```

## Parameters

- `distance` *(float)*: Distance of the fall, in blocks.

## Examples

```
// React to a hard landing
= on_player_fall(distance)
{distance > 10:
    Alex: That looked painful.
}
# gameplay
-> DONE
```

```
// Fail a stealth section when the player drops into the courtyard
= on_player_fall(distance)
{distance > 4:
    -> chapter_2_alarm_raised
}
# gameplay
-> DONE
```
