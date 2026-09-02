# On Player Use Item

Emitted when the player uses an item, such as eating food, drinking a potion or raising a shield.

## Side
SERVER

## Syntax

```
= on_player_use_item(item_id, hand)
```

## Parameters

- `item_id` *(string)*: Item id used, such as `minecraft:bread`. An empty hand reports `minecraft:air`.
- `hand` *(string)*: Hand that used the item. Accepted values: `main_hand`, `off_hand`.

## Examples

```
// React to the player eating during a tense moment
= on_player_use_item(item_id, hand)
{item_id == "minecraft:bread":
    Alex: Really? Right now?
}
# gameplay
-> DONE
```

```
// Move on once the player drinks the potion
= on_player_use_item(item_id, hand)
{item_id == "minecraft:potion":
    -> chapter_4_the_cure
}
# gameplay
-> DONE
```
