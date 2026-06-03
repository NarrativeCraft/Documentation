# Structuration

NarrativeCraft follows a simple structuration with **chapters** and **scenes**.

You have a chapter that contains the main topic, and you have scenes that separate it by parts.

Chapters are sorted by index, and scenes too meaning that if you first chapter is `foo` and your first scene is `bar`, then the player will start the story with chapter `foo` and scene `bar`.

Each scene starts with a new objective, a new environment, to have a clean save point.

## Folder

In your world directory you will have a folder called `narrativecraft` with inside :

- chapters
- characters
- data
- saves
- main.ink
- variables.ink
- functions.ink


### chapters

`chapters` directory contains all your chapters, and inside each chapters contains your scenes.
In each chapter, you'll have ink files, to have separated scripts and keep it organized for each entry.

### characters

This is the folders of all your characters, with their data and skin.

### data

Misc data are stored here, you don't really need it for your case

### saves

Stores saves for each players. If your server is premium it will store with player uuid, however if it is a cracked server then it will save as player username.

### main.ink

This is your main ink file. **Do not edit it** because each modification will be overwritten. The only purpose of this file is to open it with [Inky](https://github.com/inkle/inky/releases) so every chapters and scenes ink files are imported and listed directly in the IDE.

### variables.ink

Contains all your global [variables](https://github.com/inkle/ink/blob/master/Documentation/WritingWithInk.md#1-global-variables), can be edited and accessible anywhere in the project

### functions.ink

Contains all your global [functions](https://github.com/inkle/ink/blob/master/Documentation/WritingWithInk.md#5-functions), can be edited and accessible anywhere in the project
