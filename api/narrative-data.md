# Narrative data

The API exposes the chapters, scenes, characters, and other entries loaded by NarrativeCraft. These objects are views of NarrativeCraft-owned data: retrieve and inspect them, but do not implement their interfaces or modify manager lists directly.

## Start from the API

Chapters and global characters are available from `NarrativeCraftAPI`:

```java
NarrativeCraftAPI api = NarrativeCraftAPI.getInstance();

IChapterManager chapters = api.getChapterManager();
ICharacterManager characters = api.getCharacterManager();
```

Most narrative managers implement the same lookup contract:

| Method | Result |
|---|---|
| `getById(UUID id)` | Entry with the requested UUID, or `null` |
| `getByName(String name)` | Entry with the requested name, or `null` |
| `getList()` | Entries currently loaded by the manager |
| `size()` | Number of loaded entries |

Names are matched without regard to letter case. Always handle a missing result:

```java
IChapter chapter = chapters.getByName("Introduction");
if (chapter == null) {
    return;
}
```

## Chapters and scenes

A chapter provides its identity and its scene manager:

```java
UUID chapterId = chapter.getId();
String chapterName = chapter.getName();
ISceneManager scenes = chapter.getSceneManager();
```

Find a scene by UUID, name, or rank:

```java
IScene byName = scenes.getByName("Village");
IScene byRank = scenes.getByRank(1);
```

`IChapterManager` also supports the story chapter index:

```java
IChapter firstChapter = chapters.getChapterByIndex(1);
```

The chapter index and scene rank are narrative ordering values. They are different from a Java list index.

## Entries inside a scene

Every scene owns managers for its child entries:

```java
IScene scene = chapter.getSceneManager().getByName("Village");
if (scene == null) {
    return;
}

IAnimation walk = scene.getAnimationManager().getByName("Walk");
ISubscene crowd = scene.getSubsceneManager().getByName("Market crowd");
ICutscene arrival = scene.getCutsceneManager().getByName("Arrival");
ICameraAngle gate = scene.getCameraAngleManager().getByName("Gate view");
IInteraction merchant = scene.getInteractionManager().getByName("Merchant");
ICharacter guard = scene.getNpcManager().getByName("Guard");
```

The complete scene navigation API is:

| Method | Manager |
|---|---|
| `getAnimationManager()` | `IAnimationManager` |
| `getSubsceneManager()` | `ISubsceneManager` |
| `getCutsceneManager()` | `ICutsceneManager` |
| `getCameraAngleManager()` | `ICameraAngleManager` |
| `getInteractionManager()` | `IInteractionManager` |
| `getNpcManager()` | `INpcManager` |

A scene also exposes `getId()`, `getName()`, and `getChapter()`.

## Narrative object fields

Every public narrative object exposes a UUID and a name:

| Type | Additional access |
|---|---|
| `IAnimation` | Identity only |
| `ICameraAngle` | Identity only |
| `ISubscene` | Identity only |
| `ICharacter` | Identity only |
| `ICutscene` | `getScene()` |
| `IInteraction` | `getScene()` |

Example:

```java
if (arrival != null) {
    UUID id = arrival.getId();
    String name = arrival.getName();
    IScene owner = arrival.getScene();
}
```

`IInteractionZone` values are provided by interaction-zone events. A zone exposes:

```java
zone.getId();
zone.getName();
zone.getStitchName();
```

See [Events](/api/events#interactions) for zone entry and exit listeners.

## Resolve a character

`ICharacterManager` manages global story characters. NPCs belong to individual scenes.

Use `resolveCharacter()` when a value may refer to either:

```java
ICharacter character = characters.resolveCharacter("Guard", scene);
```

NarrativeCraft first looks for a global character. If none matches and a scene was provided, it looks in that scene's NPC manager.

Both name and UUID lookups are supported:

```java
ICharacter byName = characters.resolveCharacter("Guard", scene);
ICharacter byId = characters.resolveCharacter(characterId, scene);
```

Pass `null` as the scene when only global characters should be considered.

Other character queries include:

```java
ICharacter mainCharacter = characters.getMainCharacter();
List<? extends ICharacter> ordered = characters.getSortedList();
```

`getSortedList()` returns a separate ordered list with the main character first. Any character lookup may return `null` when the story does not define a match.

## Complete traversal example

The manager hierarchy lets you inspect the complete story without depending on NarrativeCraft implementation classes:

```java
NarrativeCraftAPI api = NarrativeCraftAPI.getInstance();

for (IChapter loadedChapter : api.getChapterManager().getList()) {
    System.out.println("Chapter: " + loadedChapter.getName());

    for (IScene loadedScene : loadedChapter.getSceneManager().getList()) {
        int cutsceneCount = loadedScene.getCutsceneManager().size();
        int interactionCount = loadedScene.getInteractionManager().size();

        System.out.println(
            "  " + loadedScene.getName()
                + ": " + cutsceneCount + " cutscenes, "
                + interactionCount + " interactions"
        );
    }
}
```

Use [Sessions and stories](/api/sessions-and-stories) when you need the scene or characters involved in a specific player's running story.
