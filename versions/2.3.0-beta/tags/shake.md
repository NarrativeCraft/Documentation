# Shake

Applies a Simplex-noise camera shake effect to the screen. The shake starts at the given strength, then naturally decays over time at the rate you define.

## Side
CLIENT

## Syntax

```
shake <strength:float> <decayRate:float> <speed:float>
```

## Parameters

- `strength` *(float, required)*: Initial intensity of the shake in pixels. Higher values produce a more violent shake.
- `decayRate` *(float, required)*: How fast the shake fades out per tick. Higher values make the shake stop sooner.
- `speed` *(float, required)*: Speed at which the noise index advances, controlling how fast the camera moves while shaking.

## Examples

```
// Subtle rumble, light tremor that fades quickly
# shake 5 4.0 2.0
```

```
// Heavy impact, strong jolt with slow decay
# shake 30 2.0 4.0
```

```
// Stop any ongoing shake
# shake 0 0 0
```
