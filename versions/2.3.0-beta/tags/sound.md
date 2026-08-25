# Sound

Plays or stops a sound effect or music track on the client. Supports looping, pitch and volume control, and fade-in/out transitions.

## Side
CLIENT

## Syntax

```
sound <type:string> <action:string> <name:string> [volume:float=1.0] [pitch:float=1.0] [--loop] [fadeTime:float=0]
```

## Parameters

- `type` *(string, required)*: Category of the sound. Accepted values: `sfx` (sound effect), `song` (music track), `stop` (used with `all` to stop every active sound).
- `action` *(string, required)*: What to do with the sound. Accepted values: `play`, `stop`.
- `name` *(string, required)*: Sound identifier. Use `namespace:sound_name` format for custom sounds, or just `sound_name` to target the `minecraft` namespace. Use `all` with `action stop` to stop all sounds of the given type.
- `volume` *(float, optional)*: Playback volume from `0.0` to `1.0`. Defaults to `1.0`.
- `pitch` *(float, optional)*: Playback pitch multiplier. Defaults to `1.0`.
- `--loop` *(flag, optional)*: Makes the sound loop indefinitely until stopped.
- `fadeTime` *(float, optional)*: Duration in seconds to fade the volume in (on play) or out (on stop). Defaults to `0`.

## Examples

```
// Play a sound effect at full volume
# sound sfx play minecraft:entity.thunder_clap
```

```
// Play a looping music track with fade-in
# sound song play mymod:music.theme --loop fadeTime:2.0
```

```
// Stop a specific track with a fade-out
# sound song stop mymod:music.theme fadeTime:1.5
```

```
// Stop all active sounds immediately
# sound stop stop all
```
