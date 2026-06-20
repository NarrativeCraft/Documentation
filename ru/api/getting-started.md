# Начало работы

Добавьте NarrativeCraft API как `compileOnly` зависимость в ваш мод. Это даст доступ ко всем публичным интерфейсам без включения самого мода.

:::info
Текущая версия API NarrativeCraft — **1**
:::

## Gradle

Добавьте репозиторий в `settings.gradle` (или `build.gradle`, в зависимости от настроек), затем объявите зависимость в `build.gradle`:

```groovy
maven {
    name "loudo"
    url "https://maven.loudo.dev"
}
```

```groovy
compileOnly 'fr.loudo.narrativecraft:narrativecraft-api:{{VERSION}}+mc{minecraft_version}'
```

## Maven

Добавьте репозиторий и зависимость в `pom.xml`:

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
    <version>{{VERSION}}+mc{minecraft_version}</version>
</dependency>
```

## Версии Minecraft для API

Текущие доступные версии Minecraft: `26.2` и `1.21.1`

## Регистрация аддона

Всё делается через `AddonContext`. Создайте его в инициализаторе вашего мода до любых вызовов регистрации:

```java
AddonContext ctx = NarrativeCraftAPI.getInstance().createAddon(
    "my-mod-id",        // id вашего мода
    "My Addon",         // отображаемое имя
    "A brief description",
    "AuthorName",
    null,               // homeLink, может быть null. Ссылка на ваш мод (например Modrinth)
    NarrativeCraftAPI.VERSION
);
```

Последний аргумент — целевая версия API. Она должна точно равняться `NarrativeCraftAPI.VERSION`. Если нет, аддон устанавливается в `DISABLED`, и все вызовы `register*` молча игнорируются. Без краша, но ничего не регистрируется. Всегда передавайте `NarrativeCraftAPI.VERSION` напрямую, а не жёстко заданное число — тогда проверка будет синхронизироваться автоматически.

При необходимости можно проверить, отключён ли аддон:

```java
if (ctx.isDisabled()) {
    // несовместимая версия API, выход
    return;
}
```

## Регистрация расширений

Когда контекст получен, используйте его для регистрации всего, что предоставляет ваш аддон:

```java
ctx.registerEvent(StoryStartEvent.class, event -> { ... });
ctx.registerInkAction(MyInkAction.class, MyInkAction::new);
ctx.registerCutsceneLayer(new MyLayerType());
ctx.registerTextEffect("my-effect", new MyTextEffect());
ctx.registerRecordingAction("my_action", tick -> new MyAction(tick));
```

У каждого типа регистрации есть своя страница:

- [События](/ru/api/events)
- [Ink Actions](/ru/api/ink-actions)
- [Слои катсцен](/ru/api/cutscene-layers)
- [Текстовые эффекты](/ru/api/text-effects)
- [Запись](/ru/api/recording)
