# Events

NarrativeCraft events let your addon react to story, dialog, cutscene, interaction, recording, and playback changes without polling.

Every event is an immutable Java record that implements `Event`.

## Register a listener

Register listeners through your `AddonContext`:

```java
context.registerEvent(DialogStartEvent.class, event -> {
    String speaker = event.speakerName();
    String text = event.text();
    ServerPlayer player = event.session().getPlayer();

    LOGGER.info("{} heard {} say: {}", player.getName().getString(), speaker, text);
});
```

The listener type determines which event records it receives.

## Unregister a listener

Keep the listener instance when it must be removed later:

```java
EventListener<DialogStartEvent> dialogListener = event -> {
    LOGGER.info("Dialog started: {}", event.text());
};

context.registerEvent(DialogStartEvent.class, dialogListener);

// Later:
context.unregisterEvent(DialogStartEvent.class, dialogListener);
```

Passing a new lambda to `unregisterEvent()` does not remove the original listener because it is a different object.

## Listen to a group of events

The event bus dispatches an event to listeners registered for its class or one of its parent event types. Register `Event.class` to observe every NarrativeCraft event:

```java
context.registerEvent(Event.class, event -> {
    LOGGER.debug("NarrativeCraft event: {}", event.getClass().getSimpleName());
});
```

Prefer a specific event class when the listener only needs one lifecycle moment.

## Story and session events

| Event | Fields | Fired when |
|---|---|---|
| `PlayerSessionStartEvent` | `session` | NarrativeCraft creates a player session |
| `PlayerSessionEndEvent` | `session` | A player session is removed |
| `StoryStartEvent` | `session` | Story playback starts |
| `StoryEndEvent` | `session` | Story playback stops |
| `ChapterSceneStartEvent` | `session`, `chapter`, `scene` | The initial chapter scene starts |
| `ChapterSceneChangeEvent` | `session`, `chapter`, `scene` | Playback changes to another chapter scene |
| `SceneEndEvent` | `session`, `scene` | The current scene ends |

Example:

```java
context.registerEvent(ChapterSceneChangeEvent.class, event -> {
    LOGGER.info(
        "{} entered scene {}",
        event.session().getPlayer().getName().getString(),
        event.scene().getName()
    );
});
```

## Characters

| Event | Fields | Fired when |
|---|---|---|
| `CharacterSpawnEvent` | `character`, `scene` | A story character entity is registered in a scene |
| `CharacterDespawnEvent` | `character`, `scene` | A story character entity is removed from a scene |

The event exposes the narrative character, not the spawned Minecraft entity. Use the player's `IStoryHandler` to resolve it:

```java
context.registerEvent(CharacterSpawnEvent.class, event -> {
    // Resolve through the relevant running story when you also have its session.
    LOGGER.info("Spawned character {}", event.character().getName());
});
```

## Dialog

| Event | Fields | Fired when |
|---|---|---|
| `DialogStartEvent` | `session`, `speakerName`, `text` | A dialog line is shown |
| `DialogEndEvent` | `session` | The current dialog closes |
| `DialogChoiceEvent` | `session`, `choices`, `selectedIndex` | The player selects an Ink choice |

Use `selectedIndex()` to read the selected value safely:

```java
context.registerEvent(DialogChoiceEvent.class, event -> {
    int index = event.selectedIndex();
    if (index >= 0 && index < event.choices().size()) {
        LOGGER.info("Selected: {}", event.choices().get(index));
    }
});
```

The choice strings are the localized text shown to the player.

## Cutscenes

| Event | Fields | Fired when |
|---|---|---|
| `CutsceneStartEvent` | `session`, `cutscene` | A cutscene starts |
| `CutsceneEndEvent` | `session`, `cutscene` | A cutscene ends |

```java
context.registerEvent(CutsceneStartEvent.class, event -> {
    LOGGER.info("Playing cutscene {}", event.cutscene().getName());
});
```

## Interactions

| Event | Fields | Fired when |
|---|---|---|
| `InteractionTriggerEvent` | `session`, `interaction` | An interaction starts |
| `InteractionZoneEnterEvent` | `player`, `zone` | A player enters an active interaction zone |
| `InteractionZoneLeaveEvent` | `player`, `zone` | A player leaves an active interaction zone |

Zone events provide the zone name, UUID, and stitch:

```java
context.registerEvent(InteractionZoneEnterEvent.class, event -> {
    event.player().sendSystemMessage(
        Component.literal("Entered " + event.zone().getName())
    );

    LOGGER.debug("Zone stitch: {}", event.zone().getStitchName());
});
```

## Ink actions

| Event | Fields | Fired when |
|---|---|---|
| `InkTagProcessedEvent` | `session`, `keyword`, `rawTag` | A known Ink tag has been parsed and validated |
| `InkActionStopEvent` | `session`, `actionKeyword` | A running Ink action stops |

`rawTag()` contains the original tag text. `keyword()` contains the registered action keyword.

## Recording

| Event | Fields | Fired when |
|---|---|---|
| `RecordingStartEvent` | `player`, `recording` | Recording starts |
| `RecordingStopEvent` | `player`, `recording` | Recording stops |
| `RecordingSaveEvent` | `player`, `recording`, `recordingName` | A recording is saved as an animation |

Custom recording data can be added while a recording is active:

```java
context.registerEvent(RecordingStartEvent.class, event -> {
    LOGGER.info("Recording started at tick {}", event.recording().getTick());
});
```

See [Recording actions](/api/recording) for adding custom actions.

## Playback

| Event | Fields | Fired when |
|---|---|---|
| `PlaybackStartEvent` | `playback` | Recorded animation playback starts |
| `PlaybackPauseEvent` | `playback` | Playback pauses |
| `PlaybackResumeEvent` | `playback` | Playback resumes |
| `PlaybackEndEvent` | `playback` | Playback ends |

The `IPlaybackSession` record field provides the level, playback entities, targeted players, and rewind block-state log:

```java
context.registerEvent(PlaybackStartEvent.class, event -> {
    ServerLevel level = event.playback().getLevel();
    LOGGER.info("Playback started in {}", level.dimension().identifier());
});
```

## Listener contract

`EventListener<E>` is a functional interface with one method:

```java
void handle(E event);
```

`IEventBus.register()` and `IEventBus.unregister()` define the underlying typed event contract. Addons should use the equivalent `AddonContext` methods so addon compatibility state is respected.
