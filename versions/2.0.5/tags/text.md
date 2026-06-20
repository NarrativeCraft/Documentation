# Text

Creates, edits, and removes named text overlays displayed on the client HUD. Each text is identified by an id and can be repositioned, recolored, faded, and animated independently.

## Side
CLIENT

## Syntax

```
text <id:string> <action:string> [param1] [param2] [param3] [--block]
```

## Parameters

- `id` *(string, required)*: Unique identifier for this text overlay. Used to reference it in subsequent actions.
- `action` *(string, required)*: Operation to perform. See the table below for each action and its expected parameters.
- `--block` *(flag, optional)*: Used with the `type` action. Pauses story progression until the typewriter effect finishes.

### Actions

| Action | param1 | param2 | param3 |
|---|---|---|---|
| `create` | text content *(required)* | hex color *(optional)* | |
| `remove` | | | |
| `edit` | new text content *(required)* | | |
| `position` / `pos` | position value *(required)* | | |
| `space` | x value *(required)* | y value *(required)* | |
| `color` | hex color *(required)* | | |
| `opacity` | opacity float 0.0 to 1.0 *(required)* | | |
| `scale` | scale float *(required)* | | |
| `width` | wrap width in pixels *(required)* | | |
| `fade` | fadeIn seconds *(required)* | stay seconds *(required)* | fadeOut seconds *(required)* |
| `fadein` | duration seconds *(required)* | | |
| `fadeout` | duration seconds *(required)* | | |
| `type` | scroll speed *(optional)* | | |

**Position values:** `top_left`, `top`, `top_right`, `middle_left`, `middle`, `middle_right`, `bottom_left`, `bottom`, `bottom_right`

## Examples

```ink
// Create a centered white subtitle
# text subtitle create "Hello world"
```

```ink
// Move an existing text to the bottom center
# text subtitle position bottom
```

```ink
// Change the text color to red
# text subtitle color FF0000
```

```ink
// Play a typewriter effect and block until it finishes
# text subtitle type 1.5 --block
```

```ink
// Fade the text out over 1 second then remove it
# text subtitle fadeout 1.0
# text subtitle remove
```
