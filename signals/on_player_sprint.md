# On Player Sprint

Emitted when the player starts or stops sprinting. Both changes use the same signal, so read `is_sprinting` to know which one happened.

## Side
CLIENT

## Syntax

```
= on_player_sprint(is_sprinting)
```

## Parameters

- `is_sprinting` *(bool)*: `true` when the player started sprinting, `false` when they stopped.

## Examples

```
// Tell the player to slow down
= on_player_sprint(is_sprinting)
{is_sprinting:
    Alex: Not so fast, they will hear you.
}
# gameplay
-> DONE
```

```
// Keep track of the player running during a chase
VAR is_running = false

= on_player_sprint(is_sprinting)
~ is_running = is_sprinting
# gameplay
-> DONE
```
