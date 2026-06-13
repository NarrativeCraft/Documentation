# Events

The event bus is a typed pub/sub system. All events are immutable Java records implementing the `Event` marker interface.

## Subscribing

```java
NarrativeCraftAPI.getInstance().getEventBus()
    .register(DialogStartEvent.class, event -> { ... });
```

To unsubscribe, keep a reference to the listener and pass it to `unregister`.

```java
EventListener<DialogStartEvent> listener = event -> { ... };
eventBus.register(DialogStartEvent.class, listener);
// later
eventBus.unregister(DialogStartEvent.class, listener);
```

## Events reference

### Session lifecycle

| Event | Fields | Fired when |
|---|---|---|
| `PlayerSessionStartEvent` | `IPlayerSession session` | A player session starts |
| `PlayerSessionEndEvent` | `IPlayerSession session` | A player session ends |
| `StoryStartEvent` | `IPlayerSession session` | A story begins |
| `StoryEndEvent` | `IPlayerSession session` | A story ends |
| `SceneEndEvent` | `IPlayerSession session, IScene scene` | A scene ends |
| `ChapterSceneStartEvent` | `IPlayerSession session, IChapter chapter, IScene scene` | A scene starts inside a chapter |
| `ChapterSceneChangeEvent` | `IPlayerSession session, IChapter chapter, IScene scene` | Scene changes within a chapter |

### Characters

| Event | Fields | Fired when |
|---|---|---|
| `CharacterSpawnEvent` | `ICharacterStory character, IScene scene` | A character spawns |
| `CharacterDespawnEvent` | `ICharacterStory character, IScene scene` | A character despawns |

### Cutscenes

| Event | Fields | Fired when |
|---|---|---|
| `CutsceneStartEvent` | `IPlayerSession session, ICutscene cutscene` | A cutscene starts |
| `CutsceneEndEvent` | `IPlayerSession session, ICutscene cutscene` | A cutscene ends |

### Dialogs

| Event | Fields | Fired when |
|---|---|---|
| `DialogStartEvent` | `IPlayerSession session, String speakerName, String text` | A dialog line starts |
| `DialogEndEvent` | `IPlayerSession session` | A dialog line ends |
| `DialogChoiceEvent` | `IPlayerSession session, List<String> choices, int selectedIndex` | A choice is made |

### Interactions

| Event | Fields | Fired when |
|---|---|---|
| `InteractionTriggerEvent` | `IPlayerSession session, IInteraction interaction` | An interaction triggers |
| `InteractionZoneEnterEvent` | `ServerPlayer player, IInteractionZone zone` | Player enters a zone |
| `InteractionZoneLeaveEvent` | `ServerPlayer player, IInteractionZone zone` | Player leaves a zone |

### Ink actions

| Event | Fields | Fired when |
|---|---|---|
| `InkActionStopEvent` | `IPlayerSession session, String actionKeyword` | An Ink action stops |
| `InkTagProcessedEvent` | `IPlayerSession session, String keyword, String rawTag` | An Ink tag is processed |

### Recording

| Event | Fields | Fired when |
|---|---|---|
| `RecordingStartEvent` | `ServerPlayer player, IRecording recording` | Recording starts |
| `RecordingStopEvent` | `ServerPlayer player, IRecording recording` | Recording stops |
| `RecordingSaveEvent` | `ServerPlayer player, IRecording recording, String recordingName` | Recording is saved |

### Playback

| Event | Fields | Fired when |
|---|---|---|
| `PlaybackStartEvent` | `IPlaybackSession playback` | Playback starts |
| `PlaybackEndEvent` | `IPlaybackSession playback` | Playback ends |
| `PlaybackPauseEvent` | `IPlaybackSession playback` | Playback pauses |
| `PlaybackResumeEvent` | `IPlaybackSession playback` | Playback resumes |
