# Слои катсцен

Слои катсцен — это треки на временной шкале. Вы можете регистрировать кастомные типы слоёв, которые появятся в редакторе и будут выполнять логику на заданном тике.

## Создание типа слоя

Реализуйте `ICutsceneLayerType` для описания и создания вашего слоя:

```java
public class MyLayerType implements ICutsceneLayerType {
    @Override public String getId()   { return "my-layer"; }
    @Override public String getName() { return "My Layer"; }
    @Override public ICutsceneLayer createLayer() { return new MyLayer(this); }
}
```

Затем расширьте `CutsceneLayer` для самого слоя. Нужно реализовать `createDefaultKeyframe`, который возвращает новый ключевой кадр на заданном тике:

```java
public class MyLayer extends CutsceneLayer {
    @Override
    public Keyframe createDefaultKeyframe(int tick) {
        return new MyKeyframe(tick, this);
    }
}
```

## Регистрация

```java
ctx.registerCutsceneLayer(new MyLayerType());
```

## Выполнение на тике

`ICutsceneLayer.execute(float tick)` вызывается на каждом тике воспроизведения. Возвращает `true`, если слой обработал тик, и `false`, если тик вне диапазона ключевых кадров. Базовая реализация возвращает `false`, поэтому переопределите её для применения эффекта слоя.

Используйте `isTickCoveredBy(tick)` для ранней проверки, затем читайте интерполированные данные и применяйте их:

```java
@Override
public boolean execute(float tick) {
    if (!isTickCoveredBy(tick)) return false;
    // интерполировать и применить эффект
    return true;
}
```

## Работа с ключевыми кадрами

Внутри слоя используйте следующие защищённые методы:

```java
// ключевые кадры, отсортированные по тику, отфильтрованные по подтипу
List<K> sorted = getSortedKeyframes(MyKeyframe.class);

// сегмент, обрамляющий заданный тик (используется для интерполяции)
KeyframeSegment<K> seg = findSegment(sorted, tick);

// проверка покрытия тика
boolean covered = isTickCoveredBy(tick);
boolean exact   = isExactTick(tick);
```

См. [Ключевые кадры](/ru/api/keyframes) для реализации кастомного `Keyframe` и интерполяции между ними.
