# On Player Place Block

Emitted when the player places a block.

## Side
SERVER

## Syntax

```
= on_player_place_block(block_id, x, y, z)
```

## Parameters

- `block_id` *(string)*: Item id of the placed block, such as `minecraft:torch`.
- `x` *(int)*: X block position.
- `y` *(int)*: Y block position.
- `z` *(int)*: Z block position.

## Examples

```
// React to the player lighting the room
= on_player_place_block(block_id, x, y, z)
{block_id == "minecraft:torch":
    Alex: Much better.
}
# gameplay
-> DONE
```

```
// Complete a building objective
= on_player_place_block(block_id, x, y, z)
{block_id == "minecraft:crafting_table":
    -> chapter_2_workshop_ready
}
# gameplay
-> DONE
```
