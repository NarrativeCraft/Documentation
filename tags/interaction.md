# Interaction

Activates or deactivates a named interaction zone within the current scene. Starting an interaction gives the player the ability to interact with defined triggers in the world.

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
// Remove the interaction after the player uses it
# interaction remove door_to_castle
```

```
// Swap from one interaction zone to another
# interaction remove puzzle_step_1
# interaction start puzzle_step_2
```
