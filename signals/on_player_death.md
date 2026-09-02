# On Player Death

Emitted when the player dies. The position is where the player died.

[`on_player_respawn`](./on_player_respawn) is emitted once the player is back in the world.

## Side
SERVER

## Syntax

```
= on_player_death(damage_id, killer_name, x, y, z)
```

## Parameters

- `damage_id` *(string)*: Id of the damage type that killed the player, such as `fall`, `lava`, `mob` or `player`. These are the vanilla damage message ids, written in camel case.
- `killer_name` *(string)*: Display name of the entity that killed the player. Empty when there is no killer, for example on a fall or a drowning.
- `x` *(int)*: X block position of the death.
- `y` *(int)*: Y block position of the death.
- `z` *(int)*: Z block position of the death.

## Examples

```
// Send the story to a game over scene
= on_player_death(damage_id, killer_name, x, y, z)
-> chapter_1_game_over
```

```
// Write a different line depending on what killed the player
= on_player_death(damage_id, killer_name, x, y, z)
{damage_id == "fall":
    Alex: I told you the roof was too high.
- else:
    Alex: We lost him.
}
-> chapter_1_game_over
```
