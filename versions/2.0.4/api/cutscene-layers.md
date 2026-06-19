# Cutscene Layers

Cutscene layers are the tracks on the timeline. You can register custom layer types that appear in the editor and execute logic at a given tick.

## Creating a layer type

Implement `ICutsceneLayerType` to describe and factory your layer:

```java
public class MyLayerType implements ICutsceneLayerType {
    @Override public String getId()   { return "my-layer"; }
    @Override public String getName() { return "My Layer"; }
    @Override public ICutsceneLayer createLayer() { return new MyLayer(this); }
}
```

Then extend `CutsceneLayer` for the layer itself. You must implement `createDefaultKeyframe`, which returns a new keyframe placed at the given tick:

```java
public class MyLayer extends CutsceneLayer {
    @Override
    public Keyframe createDefaultKeyframe(int tick) {
        return new MyKeyframe(tick, this);
    }
}
```

## Registering

```java
ctx.registerCutsceneLayer(new MyLayerType());
```

## Executing at a tick

`ICutsceneLayer.execute(float tick)` is called at each playback tick. It returns `true` if the layer handled the tick, `false` if the tick is outside its keyframe range. The default implementation returns `false`, so override it to apply your layer's effect.

Use `isTickCoveredBy(tick)` to guard early, then read your interpolated data and apply it:

```java
@Override
public boolean execute(float tick) {
    if (!isTickCoveredBy(tick)) return false;
    // interpolate and apply your effect here
    return true;
}
```

## Working with keyframes

Inside your layer, use these protected helpers:

```java
// keyframes sorted by tick, filtered to a specific subtype
List<K> sorted = getSortedKeyframes(MyKeyframe.class);

// segment bracketing a given tick (used for interpolation)
KeyframeSegment<K> seg = findSegment(sorted, tick);

// tick coverage checks
boolean covered = isTickCoveredBy(tick);
boolean exact   = isExactTick(tick);
```

See [Keyframes](/api/keyframes) for how to implement a custom `Keyframe` and interpolate between them.
