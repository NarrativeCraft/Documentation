# On Player Right Click Entity

Emitted when the player right clicks an entity. The position is the block position of the entity when it was clicked.

This is the signal to use to let the player talk to a character by clicking on it.

## Side
CLIENT

## Syntax

```
= on_player_right_click_entity(entity_id, entity_name, x, y, z)
```

## Parameters

- `entity_id` *(string)*: Registry id of the clicked entity, such as `minecraft:player`.
- `entity_name` *(string)*: Custom name of the entity. Empty when the entity has no custom name.
- `x` *(int)*: X block position of the entity.
- `y` *(int)*: Y block position of the entity.
- `z` *(int)*: Z block position of the entity.

## Examples

```
// Start a dialog when the player clicks on a character
= on_player_right_click_entity(entity_id, entity_name, x, y, z)
{entity_name == "Alex":
    -> chapter_1_talk_to_alex
}
# gameplay
-> DONE
```

```
// Refuse the interaction with an animal
= on_player_right_click_entity(entity_id, entity_name, x, y, z)
{entity_id == "minecraft:cow":
    Steve: Not now, we are in a hurry.
}
# gameplay
-> DONE
```
