# First camera angle

Now that we have our cutscene, let's create camera angles to show the characters talking after the cutscene ended.

We are going to create 3 camera angles, one close up to Steve, one close up to Alex and an angle showing both characters.

Open story management, click on `Camera angles`, add a camera angle, name it `end walk`, and enter the camera angle maker editor by clicking the button with the camera angle name.

You'll have 4 buttons at the bottom :

- Camera icon : Add a camera angle
- Character : Spawn a character in the world
- Template : Add template character
- Burger : Manager to edit and delete what you have added
  
To access it, press `T` (or your key to open your chat)

## Character and Template

Adding a character through the character button will spawn a character on your current location

Adding characters through the template button will spawn characters from animation, subscenes or cutscenes at the last tick.

If you add a character through the character button, when you invoke the camera angle in the story **they will spawn**

However, if you add template characters and you invoke the camera angle, **they will not spawn**.

NarrativeCraft story workflow works like this :
- You start any animation, subscenes or cutscene
- At the end, every spawned entity from an entry will not be killed by default

Because we assume that the characters will speak at some point.

In our case we are going to add template characters from our cutscene `walk cut`, so we can have a way to correctly point our camera when the characters are speaking after the cutscene ended.

Click on the template button, select `Cutscenes` and select `walk cut`, it will spawn our two characters from our cutscene, now we want to create camera angle.

Go to Steve and click the camera icon, give it the name `steve_view`, then to enter it, open the manager and click on the `Preview` button from our created camera.

From there you can edit the position and edit dialog values.

In a camera angle, you can assign custom offset and scale to a character for this camera only.

To do so, press `G` and you will enter in dialog preview editor.

Change the offset and scale so we can clearly see the dialog and then leave the camera angle.

Do the same for alex `alex_view`, and create the camera angle pointing at both characters `both_view`.

Now we have our camera angles set!

Leave and save.