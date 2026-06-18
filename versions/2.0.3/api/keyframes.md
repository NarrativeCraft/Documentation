# Keyframes

## Creating a custom keyframe

Extend `Keyframe` and implement `createMenu()`, which returns the popup UI shown when the user clicks the keyframe in the editor:

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

Implement `KeyframeMenu<MyKeyframe>` to define the editor UI for this keyframe. You need to implement `getContentHeight`, `renderContent`, `applyChanges`, and `initContent`.

## Interpolating between keyframes

Use `findSegment` on your layer to get the two keyframes around the current tick, along with Catmull-Rom control points:

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
    // apply value
}
```

## Easing

`EasingType` controls the interpolation curve applied to the normalized `t` in `[0, 1]`:

- `LINEAR` - constant speed
- `EASE_IN` - starts slow, accelerates
- `EASE_OUT` - starts fast, decelerates
- `SMOOTH` - ease in and out

## Interpolation utilities

```java
// apply an easing curve to t in [0, 1]
double t2 = Interpolation.applyEasing(EasingType.SMOOTH, t);

// standard lerp
double v = Interpolation.lerp(a, b, t);

// angular lerp (handles 0 to 360 wrap)
double angle = Interpolation.lerpAngle(fromDeg, toDeg, t);

// Catmull-Rom (4 control points)
double v = Interpolation.catmullRom(p0, p1, p2, p3, t);
```
