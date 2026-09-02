# On Player Item Pickup

Emitted when the player picks up an item from the ground.

## Side
SERVER

## Syntax

```
= on_player_item_pickup(item_id, count)
```

## Parameters

- `item_id` *(string)*: Item id picked up, such as `minecraft:iron_ingot`.
- `count` *(int)*: Number of items in the picked up stack.

## Examples

```
// Move the story forward when the quest item is found
= on_player_item_pickup(item_id, count)
{item_id == "minecraft:compass":
    -> chapter_1_follow_the_compass
}
# gameplay
-> DONE
```

```
// Comment on a large stack
= on_player_item_pickup(item_id, count)
{count > 16:
    Steve: You cannot carry all of that.
}
# gameplay
-> DONE
```
