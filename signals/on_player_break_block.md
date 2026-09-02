# On Player Break Block

Emitted when the player breaks a block. The block id is read from the block that was broken, before it is removed.

## Side
SERVER

## Syntax

```
= on_player_break_block(block_id, x, y, z)
```

## Parameters

- `block_id` *(string)*: Item id of the broken block, such as `minecraft:oak_log`. Blocks without an item form, such as fire, report `minecraft:air`.
- `x` *(int)*: X block position.
- `y` *(int)*: Y block position.
- `z` *(int)*: Z block position.

## Examples

```
// React to the player breaking the wrong thing
= on_player_break_block(block_id, x, y, z)
{block_id == "minecraft:oak_log":
    Alex: That tree belongs to the village.
}
# gameplay
-> DONE
```

```
// Open a passage once a specific block is mined
= on_player_break_block(block_id, x, y, z)
{x == 128 and y == 64 and z == -40:
    -> chapter_2_hidden_room
}
# gameplay
-> DONE
```
