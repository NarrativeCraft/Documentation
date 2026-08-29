# On Player Attack Entity

Emitted when the player hits an entity, whether or not the hit kills it. The position is the block position of the entity when it was hit.

Use [`on_player_kill_entity`](./on_player_kill_entity) to react only to a killing blow.

## Side
SERVER

## Syntax

```
= on_player_attack_entity(entity_id, entity_name, x, y, z)
```

## Parameters

- `entity_id` *(string)*: Registry id of the attacked entity, such as `minecraft:zombie`.
- `entity_name` *(string)*: Custom name of the entity. Empty when the entity has no custom name.
- `x` *(int)*: X block position of the entity.
- `y` *(int)*: Y block position of the entity.
- `z` *(int)*: Z block position of the entity.

## Examples

```
// Stop the player from hitting a story character
= on_player_attack_entity(entity_id, entity_name, x, y, z)
{entity_name == "Alex":
    Alex: Hey! What is wrong with you?
}
# gameplay
-> DONE
```

```
// Start a fight scene on the first hit
= on_player_attack_entity(entity_id, entity_name, x, y, z)
{entity_id == "minecraft:villager":
    -> chapter_1_guards_arrive
}
# gameplay
-> DONE
```
