# События

Шина событий — это типизированная система pub/sub. Все события — неизменяемые Java-записи (records).

## Подписка

Зарегистрируйте обработчик через ваш `AddonContext`:

```java
ctx.registerEvent(DialogStartEvent.class, event -> {
    System.out.println("Dialog started: " + event.text());
});
```

Чтобы отписаться позже, сохраните ссылку на обработчик:

```java
EventListener<DialogStartEvent> listener = event -> { ... };
ctx.registerEvent(DialogStartEvent.class, listener);

// позже
ctx.unregister(DialogStartEvent.class, listener);
```

## Доступные события

### Жизненный цикл сессии

| Событие | Когда срабатывает |
|---|---|
| `PlayerSessionStartEvent` | Запуск сессии игрока |
| `PlayerSessionEndEvent` | Завершение сессии игрока |
| `StoryStartEvent` | Начало сюжета |
| `StoryEndEvent` | Завершение сюжета |
| `SceneEndEvent` | Завершение сцены |
| `ChapterSceneStartEvent` | Запуск сцены внутри главы |
| `ChapterSceneChangeEvent` | Смена сцены внутри главы |

### Персонажи

| Событие | Когда срабатывает |
|---|---|
| `CharacterSpawnEvent` | Появление персонажа |
| `CharacterDespawnEvent` | Исчезновение персонажа |

### Катсцены

| Событие | Когда срабатывает |
|---|---|
| `CutsceneStartEvent` | Запуск катсцены |
| `CutsceneEndEvent` | Завершение катсцены |

### Диалоги

| Событие | Когда срабатывает |
|---|---|
| `DialogStartEvent` | Начало строки диалога |
| `DialogEndEvent` | Завершение строки диалога |
| `DialogChoiceEvent` | Сделан выбор |

### Взаимодействия

| Событие | Когда срабатывает |
|---|---|
| `InteractionTriggerEvent` | Срабатывание взаимодействия |
| `InteractionZoneEnterEvent` | Вход игрока в зону |
| `InteractionZoneLeaveEvent` | Выход игрока из зоны |

### Ink actions

| Событие | Когда срабатывает |
|---|---|
| `InkActionStopEvent` | Остановка Ink action |
| `InkTagProcessedEvent` | Обработка Ink-тега |

### Запись

| Событие | Когда срабатывает |
|---|---|
| `RecordingStartEvent` | Начало записи |
| `RecordingStopEvent` | Остановка записи |
| `RecordingSaveEvent` | Сохранение записи |

### Воспроизведение

| Событие | Когда срабатывает |
|---|---|
| `PlaybackStartEvent` | Начало воспроизведения |
| `PlaybackEndEvent` | Завершение воспроизведения |
| `PlaybackPauseEvent` | Пауза воспроизведения |
| `PlaybackResumeEvent` | Возобновление воспроизведения |
