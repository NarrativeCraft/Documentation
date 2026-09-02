# On Player Kill Entity

Emitted when an entity dies from damage dealt by the player. The position is the block position of the entity when it died.

[`on_player_attack_entity`](./on_player_attack_entity) is emitted as well, for the hit that killed the entity.

## Side
SERVER

## Syntax

```
= on_player_kill_entity(entity_id, entity_name, x, y, z)
```

## Parameters

- `entity_id` *(string)*: Registry id of the killed entity, such as `minecraft:zombie`.
- `entity_name` *(string)*: Custom name of the entity. Empty when the entity has no custom name.
- `x` *(int)*: X block position of the entity.
- `y` *(int)*: Y block position of the entity.
- `z` *(int)*: Z block position of the entity.

## Examples

```
// End a fight once the boss is down
= on_player_kill_entity(entity_id, entity_name, x, y, z)
{entity_name == "The Warden of Ash":
    -> chapter_4_victory
}
# gameplay
-> DONE
```

```
// Count the wave the player has cleared
VAR kills = 0

= on_player_kill_entity(entity_id, entity_name, x, y, z)
{entity_id == "minecraft:zombie":
    ~ kills = kills + 1
}
{kills >= 5:
    -> chapter_4_wave_cleared
}
# gameplay
-> DONE
```
