# Image

Creates, moves, fades, animates, and removes named image overlays displayed on the client HUD. Each image is identified by an id and can be manipulated independently.

## Side
CLIENT

## Syntax

```
image <id:string> <action:string> [param1] [param2] [param3] [param4] [--block]
```

## Parameters

- `id` *(string, required)*: Unique identifier for this image overlay. Used to reference it in subsequent actions.
- `action` *(string, required)*: Operation to perform. See the table below for each action and its expected parameters.
- `--block` *(flag, optional)*: Used with `fade`, `fadein`, `fadeout` and `animate`. Pauses story progression until the effect finishes.

### Actions

| Action | param1 | param2 | param3 | param4 |
|---|---|---|---|---|
| `render` | image path *(required)* | | | |
| `remove` | | | | |
| `position` / `pos` | position value *(required)* | | | |
| `space` | x value *(required)* | y value *(required)* | | |
| `opacity` | opacity float 0.0 to 1.0 *(required)* | | | |
| `scale` | scale float *(required)* | | | |
| `fade` | fadeIn seconds *(required)* | stay seconds *(required)* | fadeOut seconds *(required)* | |
| `fadein` | duration seconds *(required)* | | | |
| `fadeout` | duration seconds *(required)* | | | |
| `animate` | from point *(required)* | to point *(required)* | duration seconds *(required)* | easing *(optional)* |

**Position values:** `top_left`, `top`, `top_right`, `middle_left`, `middle`, `middle_right`, `bottom_left`, `bottom`, `bottom_right`

**Animation points:** either a position value, or an `x,y` pixel offset applied to the current anchor. Positive values shift the image left and up.

**Easing values:** `linear`, `ease_in`, `ease_out`, `smooth`. Defaults to `linear`.

An image ends its own life when a `fade` or `fadeout` reaches zero opacity. Use `remove` to drop it immediately.

## Image path

The path is a resource location resolved from your resource pack.

A bare path is looked up in `textures/nc_images/` of the `minecraft` namespace, and `.png` is appended when the path has no extension:

| Written path | Resolved file |
|---|---|
| `letter` | `assets/minecraft/textures/nc_images/letter.png` |
| `notes/letter` | `assets/minecraft/textures/nc_images/notes/letter.png` |
| `textures/gui/letter.png` | `assets/minecraft/textures/gui/letter.png` |
| `mymod:textures/gui/letter.png` | `assets/mymod/textures/gui/letter.png` |

A missing texture falls back to the vanilla "unknown pack" texture instead of stopping the story.

## Examples

```
// Show a full screen image
# image letter render notes/letter
```

```
// Move it to the bottom right and shrink it
# image letter position bottom_right
# image letter scale 0.5
```

```
// Offset an image by 20 pixels on x and 10 on y
# image letter space 20 10
```

```
// Fade in for 1s, stay 3s, fade out for 1s, and wait for it
# image letter fade 1 3 1 --block
```

```
// Slide the image in from the left and wait for the movement to end
# image letter animate 150,0 middle 1.5 ease_out --block
```

```
// Remove the image
# image letter remove
```
