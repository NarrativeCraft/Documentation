# Lock Choice

Marks choices as locked on the next choice screen. A locked choice is still displayed, prefixed with a padlock, but cannot be selected.

Use it instead of hiding a choice when the player should see that an option exists but is out of reach.

Place the tag before the Ink choices it applies to. It only affects the next choice screen.

## Side
CLIENT

## Syntax

```
lock_choice [a:boolean=false] [b:boolean=false] [c:boolean=false] [d:boolean=false]
```

## Parameters

- `a` *(boolean, optional)*: Locks the first choice. Defaults to `false`.
- `b` *(boolean, optional)*: Locks the second choice. Defaults to `false`.
- `c` *(boolean, optional)*: Locks the third choice. Defaults to `false`.
- `d` *(boolean, optional)*: Locks the fourth choice. Defaults to `false`.

A choice screen displays at most four choices, which is why only `a` to `d` exist.

## Examples

```
// The second choice is visible but unavailable
# lock_choice b:true
* [Open the door]
* [Unlock the chest]
```

```
// Lock the last two options of a four-choice screen
# lock_choice c:true d:true
* [Push]
* [Pull]
* [Break the lock]
* [Pick the lock]
```
