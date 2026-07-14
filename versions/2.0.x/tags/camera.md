# Camera

Transitions the player's camera to a pre-configured angle defined in the scene editor. The camera angle is composed of a parent group and a specific view within that group.

## Side
SERVER

## Syntax

```
camera <parentName:string> <childName:string>
```

## Parameters

- `parentName` *(string, required)*: Name of the camera angle group as defined in the scene editor.
- `childName` *(string, required)*: Name of the specific camera view within that group.

## Examples

```
// Switch to a close-up view of the throne room
# camera throne_room close_up
```

```
// Move to the wide establishing shot
# camera forest_entry wide_shot
```

```
// Cut to a dramatic low-angle view
# camera dungeon low_angle
```
