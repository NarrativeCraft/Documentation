# Text

Creates, edits, and removes named text overlays displayed on the client HUD. Each text is identified by an id and can be repositioned, recolored, faded, animated, and typed independently.

## Side
CLIENT

## Syntax

```
text <id:string> <action:string> [param1] [param2] [param3] [param4] [--block]
```

## Parameters

- `id` *(string, required)*: Unique identifier for this text overlay. Used to reference it in subsequent actions.
- `action` *(string, required)*: Operation to perform. See the table below for each action and its expected parameters.
- `--block` *(flag, optional)*: Used with `type`, `fade`, `fadein`, `fadeout` and `animate`. Pauses story progression until the effect finishes.

### Actions

| Action | param1 | param2 | param3 | param4 |
|---|---|---|---|---|
| `create` | text content *(required)* | hex color *(optional)* | | |
| `remove` | | | | |
| `edit` | new text content *(required)* | | | |
| `position` / `pos` | position value *(required)* | | | |
| `space` | x value *(required)* | y value *(required)* | | |
| `color` | hex color *(required)* | | | |
| `opacity` | opacity float 0.0 to 1.0 *(required)* | | | |
| `scale` | scale float *(required)* | | | |
| `width` | wrap width in pixels *(required)* | | | |
| `text_alignment` | `left`, `center` or `right` *(required)* | | | |
| `shadow` | boolean *(optional)* | | | |
| `mute` | boolean *(optional)* | | | |
| `fade` | fadeIn seconds *(required)* | stay seconds *(required)* | fadeOut seconds *(required)* | |
| `fadein` | duration seconds *(required)* | | | |
| `fadeout` | duration seconds *(required)* | | | |
| `animate` | from point *(required)* | to point *(required)* | duration seconds *(required)* | easing *(optional)* |
| `type` | scroll speed *(optional)* | | | |

**Position values:** `top_left`, `top`, `top_right`, `middle_left`, `middle`, `middle_right`, `bottom_left`, `bottom`, `bottom_right`

**Animation points:** either a position value, or an `x,y` pixel offset applied to the current anchor. Positive values shift the text left and up.

**Easing values:** `linear`, `ease_in`, `ease_out`, `smooth`. Defaults to `linear`.

`mute` silences the letter sound played by the `type` action.

## Examples

```
// Create a centered white subtitle
# text subtitle create "Hello world"
```

```
// Move an existing text to the bottom center
# text subtitle position bottom
```

```
// Change the text color to red and align it on the left
# text subtitle color FF0000
# text subtitle text_alignment left
```

```
// Play a typewriter effect and block until it finishes
# text subtitle type 1.5 --block
```

```
// Slide the text up into place over half a second
# text subtitle animate "0,-30" middle 0.5 ease_out --block
```

```
// Fade the text out over 1 second then remove it
# text subtitle fadeout 1.0
# text subtitle remove
```
