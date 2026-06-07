# Time

Changes the in-game day time instantly or transitions smoothly from one value to another. Supports named time presets and raw tick values.

## Side
SERVER

## Syntax

```
time <action:string> <from:string> [to:string] [for:float=0] [unit:string=seconds] [easing:string=SMOOTH]
```

## Parameters

- `action` *(string, required)*: What to do. Accepted values: `set` (set to a specific time), `add` (add ticks to the current time).
- `from` *(string, required)*: The starting time or the amount to add. Accepts named presets (`day`, `noon`, `night`, `midnight`) or a raw tick value.
- `to` *(string, optional)*: The target time for a smooth transition. Only used with `set`. Same format as `from`.
- `for` *(float, optional)*: Duration of the transition. Defaults to `0` (instant).
- `unit` *(string, optional)*: Time unit for `for`. Accepted values: `seconds`, `minutes`, `hours`. Defaults to `seconds`.
- `easing` *(string, optional)*: Easing function for the transition. Defaults to `SMOOTH`.

**Named presets:** `day` = 1000, `noon` = 6000, `night` = 13000, `midnight` = 18000.

## Examples

```ink
// Jump instantly to dawn
# time set day
```

```ink
// Transition smoothly from noon to night over 10 seconds
# time set noon to:night for:10
```

```ink
// Add 2000 ticks to the current time
# time add 2000
```
