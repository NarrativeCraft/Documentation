# On Screen Open

Emitted when a screen opens, such as an inventory or a chest. The pause menu is ignored.

## Side
CLIENT

## Syntax

```
= on_screen_open(screen_id)
```

## Parameters

- `screen_id` *(string)*: Id of the opened screen. It is the screen class name in lowercase, split on capitals, such as `inventory_screen`, `chat_screen` or `container_screen`.

## Examples

```
// Hint at the inventory the first time it is opened
VAR inventory_seen = false

= on_screen_open(screen_id)
{screen_id == "inventory_screen" and not inventory_seen:
    ~ inventory_seen = true
    Alex: Your bag is a mess, sort it out.
}
# gameplay
-> DONE
```

```
// React to the player opening a chest
= on_screen_open(screen_id)
{screen_id == "container_screen":
    Steve: Take only what we need.
}
# gameplay
-> DONE
```
