# Weather

Changes the world weather for the player. In multiplayer or with the `--instant` flag, the change is applied immediately via a client packet.

## Side
SERVER

## Syntax

```
weather <type:string> [--instant]
```

## Parameters

- `type` *(string, required)*: The weather to apply. Accepted values: `clear`, `rain`, `thunder`.
- `--instant` *(flag, optional)*: Forces the weather change to apply immediately via a direct client packet, bypassing the normal world weather transition.

## Examples

```
// Clear the sky at the start of a hopeful scene
# weather clear
```

```
// Start a storm instantly for a dramatic moment
# weather thunder --instant
```

```
// Transition to rain as tension builds
# weather rain
```
