# Getting Started

Add the NarrativeCraft API as a `compileOnly` dependency in your mod. It gives you access to all public interfaces without bundling the mod itself.

## Gradle

Add the repository in your `settings.gradle` (or `build.gradle` depending on your setup), then declare the dependency in your `build.gradle`:

```groovy
maven {
    name "loudo"
    url "https://maven.loudo.dev"
}
```

```groovy
compileOnly 'fr.loudo.narrativecraft:narrativecraft-api:2.0.0'
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
    <version>2.0.0</version>
</dependency>
```

Once imported, everything is accessible from `NarrativeCraftAPI.getInstance()`. See [NarrativeCraftAPI](/api/entry-point).
