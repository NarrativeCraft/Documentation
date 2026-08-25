# Play the story

Now that you have done everything, it's time to play the story!

For this, first reload your story by doing `/nc story reload`.

::: warning
For each modification in your story, you must always do `/nc story reload` to apply your modifications!
:::

And then, do `/nc story play`.

Enjoy your creation!

## Pre-compiling the story

Compiling on every server start costs time on a large story. `/nc story reload as_file` compiles the story and writes the result to `compiled_story.json` in your `narrativecraft` folder.

That file is then loaded in priority when the world or the server starts, instead of compiling the story again.

::: warning
The pre-compiled file is a snapshot. Run `/nc story reload as_file` again after every modification, otherwise the world keeps loading the old story.
:::

Delete `compiled_story.json` to go back to compiling on start.
