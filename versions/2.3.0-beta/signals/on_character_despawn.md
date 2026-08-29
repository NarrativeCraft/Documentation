# On Character Despawn

Emitted when a character entity is removed from the story. This happens when the character dies, when an animation or a subscene marked as `unique` ends, or when the story kills it with the [`kill`](/tags/kill) tag.

## Side
SERVER

## Syntax

```
= on_character_despawn(character_name)
```

## Parameters

- `character_name` *(string)*: Name of the character that was removed, in lowercase.

## Examples

```
// Comment on a character leaving the scene
= on_character_despawn(character_name)
Steve: {character_name} is gone.
# gameplay
-> DONE
```

```
// Continue the story once the guard is no longer in the scene
= on_character_despawn(character_name)
{character_name == "guard":
    -> chapter_1_sneak_in
}
# gameplay
-> DONE
```
