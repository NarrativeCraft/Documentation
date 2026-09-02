# On Perspective Change

Emitted when the player changes camera perspective, usually with the `F5` key.

## Side
CLIENT

## Syntax

```
= on_perspective_change(perspective)
```

## Parameters

- `perspective` *(string)*: The new perspective. Accepted values: `first_person`, `third_person_back`, `third_person_front`.

## Examples

```
// Comment when the player looks at themselves
= on_perspective_change(perspective)
{perspective == "third_person_front":
    Alex: Nice haircut.
}
# gameplay
-> DONE
```

```
// Remember the perspective the player prefers
VAR player_perspective = "first_person"

= on_perspective_change(perspective)
~ player_perspective = perspective
# gameplay
-> DONE
```
