# Wait

Pauses story progression for a given duration before advancing to the next line. This action is always blocking.

## Side
SERVER

## Syntax

```
wait <duration:float> <unit:string>
```

## Parameters

- `duration` *(float, required)*: How long to wait.
- `unit` *(string, required)*: Time unit for the duration. Accepted values: `second`, `seconds`, `minute`, `minutes`, `hour`, `hours`.

## Examples

```
// Wait 3 seconds before continuing
# wait 3 seconds
```

```
// Short pause of half a second
# wait 0.5 seconds
```

```
// Wait 1 minute
# wait 1 minute
```
