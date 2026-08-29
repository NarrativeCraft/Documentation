# On Player Change Held Item

Emitted when the item held in the main hand changes, either because the player selected another hotbar slot, or because the item in the selected slot changed.

## Side
CLIENT

## Syntax

```
= on_player_change_held_item(item_id, slot)
```

## Parameters

- `item_id` *(string)*: Item id now held, such as `minecraft:torch`. An empty hand reports `minecraft:air`.
- `slot` *(int)*: Selected hotbar slot, from `0` to `8`.

## Examples

```
// Hint at the item the player just took out
= on_player_change_held_item(item_id, slot)
{item_id == "minecraft:torch":
    Steve: Good idea, it is dark down there.
}
# gameplay
-> DONE
```

```
// React to the player putting their weapon away
= on_player_change_held_item(item_id, slot)
{item_id == "minecraft:air":
    Guard: Wise choice.
}
# gameplay
-> DONE
```
