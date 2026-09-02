# On Player Hurt

Emitted every time the player takes damage, whatever the source.

## Side
SERVER

## Syntax

```
= on_player_hurt(damage_id, attacker_id, attacker_name)
```

## Parameters

- `damage_id` *(string)*: Id of the damage type, such as `fall`, `lava`, `inFire`, `mob` or `player`. These are the vanilla damage message ids, written in camel case.
- `attacker_id` *(string)*: Registry id of the entity that dealt the damage, such as `minecraft:zombie`. Empty when the damage has no entity source.
- `attacker_name` *(string)*: Display name of the entity that dealt the damage. Empty when the damage has no entity source.

## Examples

```
// Have a companion react to the player being attacked
= on_player_hurt(damage_id, attacker_id, attacker_name)
{attacker_id == "minecraft:zombie":
    Alex: Behind you!
}
# gameplay
-> DONE
```

```
// Interrupt the scene when the environment hurts the player
= on_player_hurt(damage_id, attacker_id, attacker_name)
{damage_id == "lava":
    -> chapter_3_cave_escape
}
# gameplay
-> DONE
```
