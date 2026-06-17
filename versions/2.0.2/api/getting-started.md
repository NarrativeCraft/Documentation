# Getting Started

Add the NarrativeCraft API as a `compileOnly` dependency in your mod. It gives you access to all public interfaces without bundling the mod itself.

:::info
Current API version of NarrativeCraft is **1**
:::

## Gradle

Add the repository in your `settings.gradle` (or `build.gradle` depending on your setup), then declare the dependency in your `build.gradle`:

```groovy
maven {
    name "loudo"
    url "https://maven.loudo.dev"
}
```

```groovy
compileOnly 'fr.loudo.narrativecraft:narrativecraft-api:2.0.2+mc{minecraft_version}'
```

## Maven

Add the repository and dependency in your `pom.xml`:

```xml
<repository>
    <id>loudo</id>
    <url>https://maven.loudo.dev</url>
</repository>
```

```xml
<dependency>
    <groupId>fr.loudo.narrativecraft</groupId>
    <artifactId>narrativecraft-api</artifactId>
    <version>2.0.2+mc{minecraft_version}</version>
</dependency>
```

## Minecraft versions for API

Current minecraft versions available: `26.1.2` and `1.21.1`

## Registering your addon

Everything goes through an `AddonContext`. Create one in your mod initializer, before any registration call:

```java
AddonContext ctx = NarrativeCraftAPI.getInstance().createAddon(
    "my-mod-id",        // your mod id
    "My Addon",         // display name
    "A brief description",
    "AuthorName",
    null,               // homeLink, nullable. Links to your mod (e.g Modrinth)
    NarrativeCraftAPI.VERSION
);
```

The last argument is your target API version. It must equal `NarrativeCraftAPI.VERSION` exactly. If it doesn't, the addon is set to `DISABLED` and every `register*` call silently becomes a no-op. No crash, but nothing gets registered. Always pass `NarrativeCraftAPI.VERSION` directly rather than a hardcoded integer, so the check stays in sync automatically.

You can guard against a disabled addon if you need to:

```java
if (ctx.isDisabled()) {
    // incompatible API version, bail out
    return;
}
```

## Registering extensions

Once you have a context, use it to register everything your addon provides:

```java
ctx.registerEvent(StoryStartEvent.class, event -> { ... });
ctx.registerInkAction(MyInkAction.class, MyInkAction::new);
ctx.registerCutsceneLayer(new MyLayerType());
ctx.registerTextEffect("my-effect", new MyTextEffect());
ctx.registerRecordingAction("my_action", tick -> new MyAction(tick));
```

Each registration type has its own page:

- [Events](/api/events)
- [Ink Actions](/api/ink-actions)
- [Cutscene Layers](/api/cutscene-layers)
- [Text Effects](/api/text-effects)
- [Recording](/api/recording)
