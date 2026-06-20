# Border

Draws solid rectangles along the screen edges to create cinematic letterboxing or vignettes. Supports animated transitions in and out with easing.

## Side
CLIENT

## Syntax

```
border <verb:string> [up:int=0] [right:int=0] [down:int=0] [left:int=0] [color:string=000000] [opacity:float=1.0] [duration:float=0] [easing:string=SMOOTH]
```

## Parameters

- `verb` *(string, required)*: What to do with the border. Accepted values: `in` (animate borders appearing), `out` (animate borders disappearing), `set` (instantly set borders), `clear` (instantly remove all borders).
- `up` *(int, optional)*: Height of the top border in pixels. Defaults to `0`.
- `right` *(int, optional)*: Width of the right border in pixels. Defaults to `0`.
- `down` *(int, optional)*: Height of the bottom border in pixels. Defaults to `0`.
- `left` *(int, optional)*: Width of the left border in pixels. Defaults to `0`.
- `color` *(string, optional)*: Hex color of the borders without `#`. Defaults to `000000` (black). Ignored by `out` and `clear`.
- `opacity` *(float, optional)*: Opacity of the borders from `0.0` to `1.0`. Defaults to `1.0`. Ignored by `out` and `clear`.
- `duration` *(float, optional)*: Duration of the `in` or `out` animation in seconds. Defaults to `0` (instant).
- `easing` *(string, optional)*: Easing function used for the animation. Defaults to `SMOOTH`.

## Examples

```ink
// Instantly add cinematic black bars top and bottom
# border set up:60 down:60
```

```ink
// Animate borders in over 1 second with smooth easing
# border in up:60 down:60 duration:1.0
```

```ink
// Animate borders out over 0.5 seconds
# border out duration=0.5
```

```ink
// Remove all borders instantly
# border clear
```
