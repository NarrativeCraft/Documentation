# On Player Right Click Block

Emitted when the player right clicks a block, with or without an item in hand.

When the hand also holds an item, [`on_player_use_item_on_block`](./on_player_use_item_on_block) is emitted right after this one.

## Side
SERVER

## Syntax

```
= on_player_right_click_block(block_id, x, y, z)
```

## Parameters

- `block_id` *(string)*: Item id of the clicked block, such as `minecraft:oak_door`.
- `x` *(int)*: X block position.
- `y` *(int)*: Y block position.
- `z` *(int)*: Z block position.

## Examples

```
// Answer the player knocking on a locked door
= on_player_right_click_block(block_id, x, y, z)
{block_id == "minecraft:oak_door":
    Steve: It is locked. We need the key.
}
# gameplay
-> DONE
```

```
// Trigger a secret on one exact block
= on_player_right_click_block(block_id, x, y, z)
{x == 12 and y == 70 and z == 45:
    -> chapter_3_secret_lever
}
# gameplay
-> DONE
```
