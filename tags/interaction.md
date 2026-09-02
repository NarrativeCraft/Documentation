# Interaction

Activates or deactivates a named interaction zone within the current scene. Starting an interaction gives the player the ability to interact with defined triggers in the world.

Several interactions can be active at the same time. Starting one no longer replaces the previous one, so each `start` must be matched by its own `remove` when the zone is no longer needed.

## Side
SERVER

## Syntax

```
interaction <action:string> <interactionName:string>
```

## Parameters

- `action` *(string, required)*: What to do. Accepted values: `start` (activate the interaction), `remove` (deactivate it).
- `interactionName` *(string, required)*: Name of the interaction zone as defined in the scene editor.

## Examples

```
// Activate the door interaction zone
# interaction start door_to_castle
```

```
// Run several interactions at once
# interaction start door_to_castle
# interaction start window_to_garden
```

```
// Remove the interaction after the player uses it
# interaction remove door_to_castle
```

```
// Swap from one interaction zone to another
# interaction remove puzzle_step_1
# interaction start puzzle_step_2
```
