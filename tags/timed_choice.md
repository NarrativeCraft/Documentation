# Timed Choice

Puts a time limit on the next choice. A timeline bar is drawn under the choices and shrinks until it runs out, then a choice is picked automatically.

Place the tag before the Ink choices it applies to. It only affects the next choice screen.

## Side
CLIENT

## Syntax

```
timed_choice [seconds:float=10] [default_answer_idx:int=-1] [easing:string=linear] [fade_duration:float=2.0] [line_offset_y:float=20.0] [line_width:float=150.0] [line_height:float=1.0] [line_color:string=ffffff] [outline_color:string=000000] [outline_padding:float=1.0] [--no_text]
```

## Parameters

- `seconds` *(float, optional)*: Time the player has to decide. Must be greater than `0`. Defaults to `10`.
- `default_answer_idx` *(int, optional)*: Choice selected when the timer runs out, from `1` to `4`. `-1` picks a random choice. Defaults to `-1`.
- `easing` *(string, optional)*: Easing applied to the bar. Accepted values: `linear`, `ease_in`, `ease_out`, `smooth`. Defaults to `linear`.
- `fade_duration` *(float, optional)*: Fade in duration of the bar. Cannot be negative or longer than `seconds`. Defaults to `2.0`.
- `line_offset_y` *(float, optional)*: Vertical offset of the bar. Defaults to `20.0`.
- `line_width` *(float, optional)*: Width of the bar in pixels. Must be greater than `0`. Defaults to `150.0`.
- `line_height` *(float, optional)*: Height of the bar in pixels. Must be greater than `0`. Defaults to `1.0`.
- `line_color` *(string, optional)*: Hex color of the bar. Defaults to `ffffff`.
- `outline_color` *(string, optional)*: Hex color of the bar outline. Defaults to `000000`.
- `outline_padding` *(float, optional)*: Outline thickness around the bar. Cannot be negative. Defaults to `1.0`.
- `--no_text` *(flag, optional)*: Hides the remaining seconds drawn next to the bar.

## Examples

```
// Five seconds to answer, a random choice is taken on timeout
# timed_choice seconds:5
* [Take the knife]
* [Walk away]
```

```
// Three seconds, and staying silent is the second choice
# timed_choice seconds:3 default_answer_idx:2
* [Tell her the truth]
* [Say nothing]
```

```
// A thicker red bar, without the countdown text
# timed_choice seconds:8 line_color:ff0000 line_height:3 --no_text
```
