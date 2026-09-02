# On Player Use Item On Block

Emitted when the player right clicks a block while holding an item. It is not emitted when the hand is empty.

[`on_player_right_click_block`](./on_player_right_click_block) is emitted just before this one, for the same click.

## Side
SERVER

## Syntax

```
= on_player_use_item_on_block(item_id, block_id, x, y, z)
```

## Parameters

- `item_id` *(string)*: Item id held when clicking, such as `minecraft:flint_and_steel`.
- `block_id` *(string)*: Item id of the clicked block, such as `minecraft:campfire`.
- `x` *(int)*: X block position of the block.
- `y` *(int)*: Y block position of the block.
- `z` *(int)*: Z block position of the block.

## Examples

```
// Light the camp fire to continue the story
= on_player_use_item_on_block(item_id, block_id, x, y, z)
{item_id == "minecraft:flint_and_steel" and block_id == "minecraft:campfire":
    -> chapter_2_night_camp
}
# gameplay
-> DONE
```

```
// Point the player to the right tool
= on_player_use_item_on_block(item_id, block_id, x, y, z)
{block_id == "minecraft:iron_door":
    Alex: A key would work better than that.
}
# gameplay
-> DONE
```
