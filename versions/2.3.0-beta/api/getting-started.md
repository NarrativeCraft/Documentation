# Getting started

The NarrativeCraft API lets your mod listen to story events, inspect narrative data, control player stories, and register custom Ink actions, recording actions, text effects, and cutscene layers.

:::info
- Current API major version of NarrativeCraft is **3**
- Current API latest version of NarrativeCraft is **3.1.0-beta**
:::

## Add the dependency

Add LOUDO's Maven repository:

```groovy
repositories {
    maven {
        name = "loudo"
        url = "https://maven.loudo.dev"
    }
}
```

Then add the API as a compile-only dependency:

```groovy
dependencies {
    compileOnly "fr.loudo.narrativecraft:narrativecraft-api-26.2:3.1.0-beta"
}
```

NarrativeCraft must still be installed at runtime. Declare it as a required dependency in your loader metadata so that your initializer runs after NarrativeCraft.

For Maven projects:

```xml
<repositories>
    <repository>
        <id>loudo</id>
        <url>https://maven.loudo.dev</url>
    </repository>
</repositories>

<dependencies>
    <dependency>
        <groupId>fr.loudo.narrativecraft</groupId>
        <artifactId>narrativecraft-api-26.2</artifactId>
        <version>3.1.0-beta</version>
        <scope>provided</scope>
    </dependency>
</dependencies>
```


## Minecraft versions for API

Current minecraft versions available: `26.2`, `1.21.1` and `1.20.1`

## Create an addon

Access the API from your mod initializer, after NarrativeCraft has initialized:

```java
public final class MyAddon {

    public static final String MOD_ID = "my_addon";
    private static AddonContext context;

    public static void initialize() {
        NarrativeCraftAPI api = NarrativeCraftAPI.getInstance();

        context = api.createAddon(
            MOD_ID,
            "My Addon",
            "Adds new narrative tools",
            "DeveloperName",
            "https://example.com/my-addon",
            NarrativeCraftAPI.VERSION
        );
    }

    public static AddonContext getContext() {
        return context;
    }
}
```

Do not call `NarrativeCraftAPI.getInstance()` from an eagerly initialized static field. It throws an `IllegalStateException` when NarrativeCraft has not initialized the API yet.

## API entry point

`NarrativeCraftAPI` exposes:

| Method | Purpose |
|---|---|
| `getInstance()` | Returns the initialized API singleton |
| `createAddon(...)` | Creates and registers an addon context |
| `getAddonRegistry()` | Returns all addon contexts |
| `getModId()` | Returns NarrativeCraft's mod ID |
| `getChapterManager()` | Returns loaded chapters |
| `getCharacterManager()` | Returns global story characters |
| `getPlayerSessionManager()` | Returns NarrativeCraft player sessions |
| `getStoryHandlerManager()` | Starts and stops stories |
| `getRecordingManager()` | Returns active recordings and recorded entity data |

## Addon compatibility

The API version passed to `createAddon()` must equal `NarrativeCraftAPI.VERSION`.

```java
if (context.isDisabled()) {
    return;
}
```

An incompatible addon is marked as `DISABLED`. Its `register*` methods become no-ops and NarrativeCraft writes a warning to the log.

You can inspect the state and metadata later:

```java
context.getState();
context.isEnabled();
context.isDisabled();

context.getModId();
context.getName();
context.getDescription();
context.getAuthor();
context.getHomeLink();
context.getApiVersion();
context.getApi();
```

## Register extensions

Use the same `AddonContext` for every extension provided by your addon:

```java
context.registerEvent(StoryStartEvent.class, event -> {
    // React to the story.
});

context.registerInkAction(GiveTokenAction.class, GiveTokenAction::new);
context.registerRecordingAction(SetGlowAction.ID, SetGlowAction::new);
context.registerTextEffect("bounce", new BounceTextEffect());
context.registerCutsceneLayer(new SubtitleLayerType());
context.registerSignal(SignalTokenGiven.SIGNAL_TYPE);
```

Register extensions during initialization, before a story, recording, or cutscene that uses them is loaded.

| Method | Purpose |
|---|---|
| `registerEvent()` | Subscribe to a NarrativeCraft event |
| `unregisterEvent()` | Remove a previously registered listener |
| `registerInkAction()` | Add a custom Ink tag action |
| `registerRecordingAction()` | Add a binary recording action |
| `registerTextEffect()` | Add an animated dialog text effect |
| `registerCutsceneLayer()` | Add a persistent cutscene timeline layer |
| `registerSignal()` | Add a custom signal the story can react to |
| `registerClientSignal()` | Add a custom signal emitted from the client |

The registration interfaces used internally by NarrativeCraft are public contracts, but addons normally access them through these `AddonContext` methods.

## Inspect installed addons

The addon registry exposes every addon context created in the current game:

```java
AddonRegistry registry = NarrativeCraftAPI.getInstance().getAddonRegistry();

for (AddonContext addon : registry.getEnabled()) {
    System.out.println(addon.getName());
}
```

`getAll()` includes enabled and disabled addons. `getEnabled()` includes only contexts whose API version is compatible. Both returned lists are read-only.

## Access NarrativeCraft data

The API entry point also provides managers for runtime data:

```java
NarrativeCraftAPI api = NarrativeCraftAPI.getInstance();

api.getChapterManager();
api.getCharacterManager();
api.getPlayerSessionManager();
api.getStoryHandlerManager();
api.getRecordingManager();
```

Continue with [Narrative data](/api/narrative-data) to find chapters, scenes, and narrative entries, or [Sessions and stories](/api/sessions-and-stories) to work with a player's running story.
