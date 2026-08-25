# On Enter

Notifies NarrativeCraft that the player has entered a new scene or chapter based on the current ink knot. This tag must be at the top of a knot to register the scene transition when the story reaches that point.

## Side
SERVER

## Syntax

```
on_enter <knotName:string>
```

## Parameters

- `knotName` *(string, required)*: The knot name of your current scene. Do not touch this! Must be equals to the current knot name of the scene.
## Examples

```
=== chapter_1_forest ===
# on_enter chapter_1_forest
The trees close in around you.
```