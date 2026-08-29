# On Key Pressed

Emitted when the player presses a keyboard key while the story is running.

The key name is the Minecraft key name without its `key.keyboard.` prefix, so `key.keyboard.space` becomes `space`, and `key.keyboard.left.shift` becomes `left.shift`.

## Side
CLIENT

## Syntax

```
= on_key_pressed(key)
```

## Parameters

- `key` *(string)*: Name of the pressed key, in lowercase. Examples: `f`, `space`, `left.shift`, `escape`, `1`.

## Examples

```
// Let the player knock on a door with a key
= on_key_pressed(key)
{key == "f":
    # sound play door_knock
    Steve: Anyone home?
}
# gameplay
-> DONE
```

```
// Open a safe when the player types the right code
VAR code_progress = 0

= on_key_pressed(key)
{key == "3" and code_progress == 0:
    ~ code_progress = 1
}
{key == "7" and code_progress == 1:
    -> chapter_1_safe_opened
}
# gameplay
-> DONE
```
