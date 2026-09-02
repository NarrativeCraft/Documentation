# On Character Spawn

Emitted when a character entity is spawned by the story, whether it comes from an animation, a subscene or a cutscene.

## Side
SERVER

## Syntax

```
= on_character_spawn(character_name)
```

## Parameters

- `character_name` *(string)*: Name of the character that was spawned, in lowercase.

## Examples

```
// Track who is currently on stage
VAR alex_is_here = false

= on_character_spawn(character_name)
{character_name == "alex":
    ~ alex_is_here = true
}
# gameplay
-> DONE
```

```
// Play a sound the first time a character shows up
= on_character_spawn(character_name)
{character_name == "boss":
    # sound play boss_theme
}
# gameplay
-> DONE
```
