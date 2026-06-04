# NarrativeCraftAPI

The NarrativeCraft API lets other mods integrate with the narrative systems. Everything is exposed through the `NarrativeCraftAPI` singleton.

```java
NarrativeCraftAPI api = NarrativeCraftAPI.getInstance();

api.getEventBus()               // IEventBus
api.getStoryHandlerManager()    // IStoryHandlerManager
api.getRecordingManager()       // IRecordingManager
api.getInkTagDispatcher()       // InkTagDispatcher
api.getActionRegistry()         // IActionRegistry
api.getCutsceneLayerRegistry()  // ICutsceneLayerRegistry
api.getTextEffectRegistry()     // ITextEffectRegistry
api.getModId()                  // String
```
