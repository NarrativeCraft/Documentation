# Fade

Fades the screen to a solid color, holds for a duration, then fades back out.

## Side
CLIENT

## Syntax

```
fade <fadeIn:float> <stay:float> <fadeOut:float> [color:string=000000] [--clear]
```

## Parameters

- `fadeIn` *(float, required)*: Duration of the fade-in phase in seconds.
- `stay` *(float, required)*: Duration the screen stays fully covered in seconds.
- `fadeOut` *(float, required)*: Duration of the fade-out phase in seconds.
- `color` *(string, optional)*: Hex color of the overlay without `#`. Defaults to `000000` (black).
- `--clear` *(flag, optional)*: Clear all active fade.

## Examples

```
// Classic black fade, short and snappy
# fade 0.5 0.5 0.5
```

```
// Slow white flash for a dream sequence
# fade 1.5 2.0 1.5 FFFFFF
```

```
// Instant cut to black with a long hold before revealing
# fade 0 3.0 1.0
```


```
// Clear all active fade
# fade --clear
```