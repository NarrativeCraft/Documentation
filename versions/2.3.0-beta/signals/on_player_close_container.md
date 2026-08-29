# On Player Close Container

Emitted when the player closes a container screen, such as a chest, a furnace or a crafting table. The position is the block position of the player, not of the container.

## Side
SERVER

## Syntax

```
= on_player_close_container(x, y, z)
```

## Parameters

- `x` *(int)*: X block position of the player.
- `y` *(int)*: Y block position of the player.
- `z` *(int)*: Z block position of the player.

## Examples

```
// Continue the story after the player looted the chest
= on_player_close_container(x, y, z)
Alex: Found anything useful?
# gameplay
-> DONE
```

```
// Only react near the room where the quest chest is
= on_player_close_container(x, y, z)
{y < 40:
    Steve: We should not stay in this cellar.
}
# gameplay
-> DONE
```
