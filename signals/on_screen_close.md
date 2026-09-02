# On Screen Close

Emitted when a screen closes, such as an inventory or a chest. The pause menu is ignored.

Moving from one screen to another emits this signal for the screen that closed, then [`on_screen_open`](./on_screen_open) for the new one.

## Side
CLIENT

## Syntax

```
= on_screen_close(screen_id)
```

## Parameters

- `screen_id` *(string)*: Id of the closed screen. It is the screen class name in lowercase, split on capitals, such as `inventory_screen`, `chat_screen` or `container_screen`.

## Examples

```
// Continue once the player closed their inventory
= on_screen_close(screen_id)
{screen_id == "inventory_screen":
    Alex: Ready when you are.
}
# gameplay
-> DONE
```

```
// Resume a timer that was paused while a screen was open
= on_screen_close(screen_id)
# gameplay
-> DONE
```
