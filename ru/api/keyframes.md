# Ключевые кадры

## Создание кастомного ключевого кадра

Расширьте `Keyframe` и реализуйте `createMenu()`, который возвращает всплывающий UI, появляющийся при нажатии на ключевой кадр в редакторе:

```java
public class MyKeyframe extends Keyframe {

    public float myValue;

    public MyKeyframe(int tick, CutsceneLayer layer) {
        super(tick, layer);
    }

    @Override
    public KeyframeMenu<?> createMenu() {
        return new MyKeyframeMenu(this);
    }
}
```

Реализуйте `KeyframeMenu<MyKeyframe>` для определения UI редактора этого ключевого кадра. Нужно реализовать `getContentHeight`, `renderContent`, `applyChanges` и `initContent`.

## Интерполяция между ключевыми кадрами

Используйте `findSegment` на вашем слое, чтобы получить два ключевых кадра вокруг текущего тика, а также контрольные точки Catmull-Rom:

```java
List<MyKeyframe> sorted = getSortedKeyframes(MyKeyframe.class);
KeyframeSegment<MyKeyframe> seg = findSegment(sorted, tick);

if (seg != null) {
    double t = Interpolation.applyEasing(EasingType.SMOOTH, seg.rawT());
    double value = Interpolation.catmullRom(
        seg.p0().myValue,
        seg.from().myValue,
        seg.to().myValue,
        seg.p3().myValue,
        t
    );
    // применить значение
}
```

## Плавность

`EasingType` управляет кривой интерполяции, применяемой к нормализованному `t` в `[0, 1]`:

- `LINEAR`, постоянная скорость
- `EASE_IN`, начинается медленно, ускоряется
- `EASE_OUT`, начинается быстро, замедляется
- `SMOOTH`, плавное начало и конец

## Утилиты интерполяции

```java
// применить кривую плавности к t в [0, 1]
double t2 = Interpolation.applyEasing(EasingType.SMOOTH, t);

// стандартная линейная интерполяция
double v = Interpolation.lerp(a, b, t);

// угловая интерполяция (обрабатывает переход 0–360)
double angle = Interpolation.lerpAngle(fromDeg, toDeg, t);

// Catmull-Rom (4 контрольные точки)
double v = Interpolation.catmullRom(p0, p1, p2, p3, t);
```
