# Save

Writes the player progression to their save file. NarrativeCraft already saves on every scene change and when the story finishes; use this tag to add a checkpoint inside a scene.

## Side
SERVER

## Syntax

```
save [--include_last_position] [--hide_icon]
```

## Parameters

- `--include_last_position` *(flag, optional)*: Stores the player position and rotation in the save. When the story is resumed, the player is teleported back to it.
- `--hide_icon` *(flag, optional)*: Suppresses the save icon normally shown on the HUD.

## Examples

```
// Checkpoint before a hard sequence
# save
```

```
// Checkpoint that also restores where the player stood
# gameplay
# save --include_last_position
```

```
// Silent autosave, without the on-screen icon
# save --hide_icon
```
