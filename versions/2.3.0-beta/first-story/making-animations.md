# Making animations

Now that you have a session, you now can create your first animation.

For this first animation, we are going to record ourselves walking and stopping, with the goal of showing two people walking together before stopping to talk.

To do so, do first `/nc record start`, it will instantly start a recording. Then, after you're done, do `/nc record stop`.

If you failed your recording, you can do `/nc record start` again to start again, or you can discard the recording by doing `/nc record discard`.

If you are satisfied, do `/nc record save steve_walk`, and the animation will be saved to that name.

## Subscene

Now that we have our first animation `steve_walk`, we want to create the second animation, synced with the first one.

To achieve this, open the story management screen by pressing `N` and click on `Subscenes`. Create a subscene and name it `walk sub`. After you've created the subscene, click the gear icon and assign the animation `steve_walk` and click on `send`.

## Record the second animation

Now that we have our subscene defined, leave the story management screen and type `/nc record start` and before proceeding, we are going to add 2 arguments. `with "walk sub"`, giving `/nc record start with "walk sub"`. Doing so will start the recording AND will start the subscene `walk sub` with `steve_walk` assigned.

Do the second animation, and when you are good `/nc record stop` and `/nc record save alex_walk`.

Then assign it to the subscene `walk sub`.

## Assign characters to animations

Now that we have our two animations, we want to assign the correct character to the animations.

To do so, open the story management screen, go to `Animations` and click the gear icon. The arrow shows what character is assigned to the animation.

For `steve_walk` with want Steve to be assigned and `alex_walk` we want Alex to be assigned.