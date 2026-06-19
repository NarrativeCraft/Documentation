# Writing the story

Now, let's write the story!

::: warning
I'm assuming you already know the basics of Ink, if not please see [prerequisites](/introduction/prerequisites.md)
:::

Open [Inky](https://github.com/inkle/inky/releases), click on `File` up left and click `Open...`

Navigate to your world folder, then go to `narrativecraft` and open `main.ink`

You will see an error at the top middle saying something like "Expected at least one line within the knot but saw end of line".

That's normal, when you create a chapter and its scenes, in inky, you need to manually write the knot.

Go to `chapter_1.ink` and write `-> chapter_1_scene_one`

it will looks like

```ink
=== chapter_1 ===
-> chapter_1_scene_one
```

then go to `scene_one.ink` and you will see this

```ink
=== chapter_1_scene_one ===
# on_enter
-> END
```

So, you see `# on_enter`? **Do not remove it**. This must be here to make the scene switching working correctly.

So now, what are we going to do is :

- Play `scene one`
- Play cutscene `walk cut`
- Invoke camera angle `steve_view`
- Then making them talk
- After talking, invoke our interaction `my interaction` and enters in gameplay mode


It will looks like this

```ink
=== chapter_1_scene_one ===
# on_enter
# cutscene "walk cut" // Play the cutscene
# camera "end walk" steve_view // After the cutscene has finished, invoke the camera steve_view from end walk
Steve: hey! how are you?
# camera "end walk" alex_view
Alex: I'm great, thanks for asking
# camera "end walk" both_view
Steve: Nice, let's explore the area!
# interaction start "my interaction" // After the talking, start the interacion "my interaction"
# gameplay // And enter in "gameplay" mode, so the story does not end instantly
-> END

```

This is a very basic script, it will spawn the characters, make them talk, and we will be able to play after.

In this script, there are commands starting with `#`, they are called **tags**

A tag is a custom command that NarrativeCraft interprets and execute it in Minecraft.

For example
```
# cutscene "walk cut" 
```

Start the cutscene "walk cut" from chapter 1 scene one.

## Change scene

To change a scene, you need to call the knot you want the player to continue.

For example, after scene one, I want the player to start scene two.

It will look like this :

```ink{10}
=== chapter_1_scene_one ===
# on_enter
# cutscene "walk cut"
# camera "end walk" steve_view
Steve: hey! how are you?
# camera "end walk" alex_view
Alex: I'm great, thanks for asking
# camera "end walk" both_view
Steve: Nice, let's explore the area!
-> chapter_1_scene_two
```


## Interactions

Now for interactions, earlier we defined `my_zone` and `my_point` stitch.

To executes then when the player interacts with it, you habe to define the stitch on the script

```ink
= my_zone
I entered a zone!
# gameplay
-> DONE

= my_point
I clicked the point! yay!
# gameplay
-> DONE
```


If the player enter `zone1` from the interaction, it will executes the stitch `my_zone`.
If the player click `point1` from the interaction, it will executes the stitch `my_point`.

`gameplay` tag is used here to keep the gameplay state, otherwise, the story will end!

## Tags

There are two types of tag :
- Normal one, being executed and continuing the story
- Blocking one, stops the story execution and waits for the tag to finish before continuing.

[cutscene](/tags/cutscene) is a blocking tag, it waits for the cutscene to finish before continuing the story

When the script is done, save it `CTRL + S` and go back in game and execute `/nc story reload`. It will compile the story, and will do validation on tags and the story itself. If everything goes well the story will compile successfully, but if there are errors the story will not compile and will tell you exactly where you made the error.