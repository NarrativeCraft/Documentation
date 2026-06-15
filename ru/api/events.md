# Events

The event bus is a typed pub/sub system. All events are immutable Java records.

## Subscribing

Register a listener through your `AddonContext`:

```java
ctx.registerEvent(DialogStartEvent.class, event -> {
    System.out.println("Dialog started: " + event.text());
});
```

To unsubscribe later, keep a reference to the listener:

```java
EventListener<DialogStartEvent> listener = event -> { ... };
ctx.registerEvent(DialogStartEvent.class, listener);

// later
ctx.unregister(DialogStartEvent.class, listener);
```

## Available events

### Session lifecycle

| Event | Fired when |
|---|---|
| `PlayerSessionStartEvent` | A player session starts |
| `PlayerSessionEndEvent` | A player session ends |
| `StoryStartEvent` | A story begins |
| `StoryEndEvent` | A story ends |
| `SceneEndEvent` | A scene ends |
| `ChapterSceneStartEvent` | A scene starts inside a chapter |
| `ChapterSceneChangeEvent` | Scene changes within a chapter |

### Characters

| Event | Fired when |
|---|---|
| `CharacterSpawnEvent` | A character spawns |
| `CharacterDespawnEvent` | A character despawns |

### Cutscenes

| Event | Fired when |
|---|---|
| `CutsceneStartEvent` | A cutscene starts |
| `CutsceneEndEvent` | A cutscene ends |

### Dialogs

| Event | Fired when |
|---|---|
| `DialogStartEvent` | A dialog line starts |
| `DialogEndEvent` | A dialog line ends |
| `DialogChoiceEvent` | A choice is made |

### Interactions

| Event | Fired when |
|---|---|
| `InteractionTriggerEvent` | An interaction triggers |
| `InteractionZoneEnterEvent` | Player enters a zone |
| `InteractionZoneLeaveEvent` | Player leaves a zone |

### Ink actions

| Event | Fired when |
|---|---|
| `InkActionStopEvent` | An Ink action stops |
| `InkTagProcessedEvent` | An Ink tag is processed |

### Recording

| Event | Fired when |
|---|---|
| `RecordingStartEvent` | Recording starts |
| `RecordingStopEvent` | Recording stops |
| `RecordingSaveEvent` | Recording is saved |

### Playback

| Event | Fired when |
|---|---|
| `PlaybackStartEvent` | Playback starts |
| `PlaybackEndEvent` | Playback ends |
| `PlaybackPauseEvent` | Playback pauses |
| `PlaybackResumeEvent` | Playback resumes |
