# Sessions and stories

A player session connects a Minecraft player to NarrativeCraft's current gameplay and story state. Always obtain sessions from NarrativeCraft; do not implement `IPlayerSession` yourself.

## Find a player session

Use the session manager with a Minecraft `Player`:

```java
NarrativeCraftAPI api = NarrativeCraftAPI.getInstance();
IPlayerSession session = api.getPlayerSessionManager().getByPlayer(player);

if (session == null) {
    return;
}
```

`getByPlayer()` returns `null` when NarrativeCraft has not created a session for that player.

The session exposes:

| Method | Purpose |
|---|---|
| `getPlayer()` | Get the associated `ServerPlayer` |
| `getChapter()` | Get the chapter the player is currently in, or `null` |
| `getScene()` | Get the scene the player is currently in, or `null` |
| `isGameplayMode()` | Check whether normal player gameplay is enabled |
| `setGameplayMode(boolean)` | Change gameplay mode |
| `isClientSide()` | Check whether this is the client-side session |
| `getStoryHandler()` | Get the running story, or `null` |
| `getActiveClientInkActions()` | Get client Ink actions that are still active |

`getActiveClientInkActions()` is primarily useful from client-side Ink action code. Treat the returned list as NarrativeCraft-owned state.

`getChapter()` and `getScene()` follow the player through the story, so they are the cheapest way to get the scene an Ink action needs:

```java
IScene scene = session.getScene();
if (scene != null) {
    ICharacter guard = api.getCharacterManager().resolveCharacter("Guard", scene);
}
```

## Start a story

Start the story at its first chapter and scene:

```java
IStoryHandlerManager stories = api.getStoryHandlerManager();

try {
    stories.start(session);
} catch (Exception exception) {
    LOGGER.error("Could not start the story", exception);
}
```

Or start at a specific Ink knot:

```java
stories.start("chapter_2_village", session);
```

The knot must resolve to an existing NarrativeCraft chapter and scene. Both `start()` overloads may throw when the story cannot be loaded or the requested path is invalid.

The session passed to `IStoryHandlerManager` must come from `IPlayerSessionManager`. Passing a custom implementation causes an `IllegalArgumentException`.

## Stop a story

```java
api.getStoryHandlerManager().stop(session);
```

Stopping clears the running narrative state and removes story characters. Calling it when no story is running has no effect.

You can also retrieve the handler and stop it directly:

```java
IStoryHandler story = session.getStoryHandler();
if (story != null) {
    story.stop();
}
```

Prefer the manager when all you have is a session.

## Inspect the running story

```java
IStoryHandler story = session.getStoryHandler();
if (story == null || story.isEnded()) {
    return;
}

Entity mainCharacter = story.getMainCharacterEntity();
String lastSpeaker = story.getLastCharacterSpoke();
Map<String, Entity> activeCharacters = story.getCharacterEntities();
```

Character map keys are normalized character names. Use the character helpers when possible:

```java
ICharacter guard = api.getCharacterManager().resolveCharacter("Guard", currentScene);

if (guard != null && story.characterInStory(guard)) {
    Entity guardEntity = story.getEntityFromCharacter(guard);
}
```

`getMainCharacterEntity()` and `getEntityFromCharacter()` return `null` when the character has no active entity.

## Play a stitch

`playStitch()` plays a stitch in the current scene:

```java
story.playStitch("merchant_greeting");
```

Pass the stitch name, not its fully qualified Ink path. NarrativeCraft resolves it relative to the current scene.

## Track interactions

Story handlers remember interaction UUIDs:

```java
if (!story.hasAlreadyInteracted(interactionId)) {
    story.addInteractionId(interactionId);
}
```

`getInteractionIds()` exposes the current set for inspection. Use `addInteractionId()` to add an entry instead of mutating that set directly.

## Saved position

A story handler can remember where the player stood, so a resumed story puts them back there instead of at their current position:

```java
story.setLastPosition(UserPosition.of(session.getPlayer()));
UserPosition resumePoint = story.getLastPosition();
```

`UserPosition` is a record in `fr.loudo.narrativecraft.api.utils` holding `x`, `y`, `z`, `xRot` and `yRot`:

| Member | Purpose |
|---|---|
| `of(Entity)` | Build a position from an entity |
| `of(Vec3, float xRot, float yRot)` | Build a position from raw values |
| `position()` | Read the coordinates as a `Vec3` |
| `serialize()` / `deserialize(JsonObject)` | Convert to and from the save format |

`getLastPosition()` returns `null` when no position was stored. NarrativeCraft applies it when the story resumes, and the [save tag](/2.3.0-beta/tags/save) writes it with `--include_last_position`.

## Story completion

There is a difference between stopping a running story and marking the full story as finished:

```java
story.finish();
```

`finish()` marks the story as completed, saves that state, and stops playback.

The completion flag is also exposed directly:

```java
boolean completed = story.hasFinishedStory();
story.setFinishedStory(false);
```

Use `setFinishedStory()` when implementing a deliberate reset or save-management feature. Calling `stop()` alone does not mark the story as completed.

## Handler method reference

| Method | Intended use |
|---|---|
| `start(String knotPath)` | Start this handler at an Ink knot; the manager is preferred for normal startup |
| `stop()` | Stop and clear the running story |
| `playStitch(String)` | Play a stitch in the current scene |
| `finish()` | Save completion and stop |
| `getPlayerSession()` | Return the owner session |
| `isEnded()` | Check whether the handler has ended |
| `getMainCharacterEntity()` | Find the active main-character entity |
| `getCharacterEntities()` | Inspect all active character entities |
| `getLastCharacterSpoke()` | Read the last dialog speaker |
| `getEntityFromCharacter()` | Resolve an API character to its active entity |
| `characterInStory()` | Check whether a character is active |
| `getInteractionIds()` | Inspect remembered interaction UUIDs |
| `hasAlreadyInteracted()` | Test one interaction UUID |
| `addInteractionId()` | Remember one interaction UUID |
| `hasFinishedStory()` | Read the saved completion flag |
| `setFinishedStory()` | Change the completion flag |
| `getLastPosition()` | Read the stored resume position |
| `setLastPosition()` | Change the stored resume position |

`onChoiceSelected(int)` and `onTagsDrained()` are public lifecycle callbacks used by NarrativeCraft after a player selects a choice or the Ink action queue finishes. Addons normally observe these moments through [events](/api/events) or implement their behavior as Ink actions instead of invoking the callbacks manually.
