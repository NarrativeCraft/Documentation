# Signals

A signal is a game event that NarrativeCraft sends to the running story. Breaking a block, pressing a key, entering a zone or losing the game window all emit a signal.

Where a tag lets the story act on the game, a signal lets the game act on the story.

A story reacts to a signal by declaring a stitch named after it inside the scene knot. When the signal is emitted, the story jumps to that stitch and continues from there.

```
=== chapter_1_scene_one ===
# on_enter
# interaction start "my interaction"
# gameplay
-> DONE

= on_player_jump
Alex: Stop jumping around, we have work to do.
# gameplay
-> DONE
```

If the current scene knot has no stitch with that name, the signal is ignored. Nothing is logged, and the story keeps running as if the event never happened.

## Arguments

Most signals carry values. They are passed as stitch parameters, in the order given by the signal page, and the stitch must declare every one of them:

```
= on_player_item_pickup(item_id, count)
Steve: You found {count} of {item_id}.
# gameplay
-> DONE
```

Each argument has a type, listed on the signal page:

| Type | Ink value |
|---|---|
| `string` | text, always lowercase for identifiers |
| `int` | whole number |
| `float` | decimal number |
| `bool` | `true` or `false` |

A string argument that has no value, such as `killer_name` when the player drowned, is an empty string.

## Ending a signal stitch

A signal diverts the story flow into the stitch, it does not return to where the story was. Finish the stitch the same way you finish an interaction stitch:

```
= on_player_enter_zone(zone_name)
Alex: Careful, we are not alone here.
# gameplay
-> DONE
```

Without `# gameplay`, the story leaves gameplay mode and ends when the stitch reaches `-> DONE`. A stitch can also divert to another knot or stitch to move the story forward:

```
= on_player_death(damage_id, killer_name, x, y, z)
-> chapter_1_game_over
```

## When a signal is dropped

A signal only plays when the story is idle. It is dropped, not queued, while:

- a dialog line is waiting for the player,
- a tag is still running, such as a cutscene or a blocking animation,
- the story is stopped, or no story is running.

This makes signals a gameplay tool. During scripted sequences, keep using tags.

## Side

Each signal is emitted from one side, listed on its page.

`SERVER` signals come from the server. `CLIENT` signals are detected on the player's game, then sent to the server to be played. Client signals are also ignored while the game is paused.

The side changes nothing to how the story is written. It only tells you where the event is observed, which matters on a multiplayer server.

## Signals and addons

Addons can declare and emit their own signals, and read the built-in ones. See [Signals](../api/signals) in the API reference.
