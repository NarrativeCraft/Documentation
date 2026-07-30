# Cutscene Layers

A cutscene layer is a track on the timeline. Its type gives the editor a name, creates layer instances, and saves and loads their keyframes. The layer itself owns the keyframes and performs the effect during playback.

A custom layer therefore has three parts:

1. an `ICutsceneLayerType`;
2. a `CutsceneLayer`;
3. one or more custom [keyframes](/api/keyframes).

The following example adds a persistent **Subtitle** layer.

## Create the layer type

Implement all five methods of `ICutsceneLayerType`:

```java
public final class SubtitleLayerType implements ICutsceneLayerType {

    public static final String ID = "my_addon:subtitle";

    @Override
    public String getId() {
        return ID;
    }

    @Override
    public String getName() {
        return "Subtitle";
    }

    @Override
    public CutsceneLayer createLayer() {
        return new SubtitleLayer(this);
    }

    @Override
    public JsonObject serializeKeyframe(Keyframe keyframe) {
        if (!(keyframe instanceof SubtitleKeyframe subtitle)) {
            return null;
        }

        JsonObject json = new JsonObject();
        json.addProperty("tick", subtitle.getTick());
        json.addProperty("text", subtitle.getText());
        return json;
    }

    @Override
    public Keyframe deserializeKeyframe(
        CutsceneLayer layer,
        JsonObject json
    ) {
        if (!(layer instanceof SubtitleLayer)
            || !json.has("tick")
            || !json.has("text")) {
            return null;
        }

        try {
            return new SubtitleKeyframe(
                layer,
                json.get("tick").getAsInt(),
                json.get("text").getAsString()
            );
        } catch (RuntimeException exception) {
            return null;
        }
    }
}
```

The type contract is:

| Method | Responsibility |
| --- | --- |
| `getId()` | Returns a unique, stable identifier saved with the layer. |
| `getName()` | Returns the name shown in the cutscene editor. |
| `createLayer()` | Returns a fresh layer for a new or loaded timeline track. |
| `serializeKeyframe(Keyframe)` | Returns the keyframe JSON, or `null` for an unsupported keyframe. |
| `deserializeKeyframe(CutsceneLayer, JsonObject)` | Returns a keyframe attached to the supplied layer, or `null` for invalid JSON. |

Every serialized keyframe must contain its integer tick under a property named exactly `tick`. NarrativeCraft uses that property when saving, loading, copying and pasting keyframes.

Do not add the keyframe to the layer inside `deserializeKeyframe`. NarrativeCraft adds the returned keyframe itself.

## Create the layer

Extend `CutsceneLayer` and pass its type to the superclass:

```java
public final class SubtitleLayer extends CutsceneLayer {

    private int lastExecutedTick = Integer.MIN_VALUE;

    public SubtitleLayer(ICutsceneLayerType type) {
        super(type);
    }

    @Override
    public Keyframe createDefaultKeyframe(int tick) {
        return new SubtitleKeyframe(this, tick, "Subtitle");
    }

    @Override
    public boolean execute(float tick) {
        int wholeTick = (int) tick;
        if (wholeTick == lastExecutedTick) {
            return false;
        }
        lastExecutedTick = wholeTick;

        for (SubtitleKeyframe keyframe :
            getSortedKeyframes(SubtitleKeyframe.class)) {
            if (keyframe.getTick() == wholeTick) {
                Minecraft minecraft = Minecraft.getInstance();
                if (minecraft.player != null) {
                    minecraft.player.displayClientMessage(
                        Component.literal(keyframe.getText()),
                        true
                    );
                }
                return true;
            }
        }

        return false;
    }

    @Override
    public void stop() {
        lastExecutedTick = Integer.MIN_VALUE;
    }
}
```

`createDefaultKeyframe(int)` is the required abstract method: the editor calls it when the user creates a keyframe on this layer.

`execute(float)` receives a fractional playback position. Return `true` when the layer applied its effect for that call and `false` otherwise.

`stop()` is called when cutscene playback stops. Override it when your layer must reset cached state, stop an effect or release resources.

## Register the layer

Register one type during addon initialization:

```java
addon.registerCutsceneLayer(new SubtitleLayerType());
```

Once registered, the type can be selected in the cutscene editor and its keyframes can be persisted through the public JSON contract.

## Work with keyframes

`CutsceneLayer` exposes the layer's contents:

```java
layer.addKeyframe(keyframe);
layer.removeKeyframe(keyframe);
List<Keyframe> keyframes = layer.getKeyframes();
```

It also exposes:

| Method | Use |
| --- | --- |
| `getTypeId()` | Returns the stable ID supplied by the type. |
| `getType()` | Returns the `ICutsceneLayerType` that created the layer. |
| `getSortIndex()` / `setSortIndex(int)` | Reads or changes the track order in the timeline. |

The editor and serializer normally manage adding, removing and ordering keyframes. Use these methods when your own layer behavior needs to inspect or modify its track.

## Interpolate between keyframes

Subclasses can use protected timing helpers:

```java
List<OpacityKeyframe> keyframes =
    getSortedKeyframes(OpacityKeyframe.class);

if (keyframes.size() < 2 || !isTickCoveredBy(tick)) {
    return false;
}

KeyframeSegment<OpacityKeyframe> segment =
    findSegment(keyframes, tick);

double t = Interpolation.applyEasing(
    EasingType.SMOOTH,
    segment.rawT()
);
double opacity = Interpolation.lerp(
    segment.from().getOpacity(),
    segment.to().getOpacity(),
    t
);
```

`getSortedKeyframes(Class<K>)` filters the layer to one keyframe subtype and sorts it by tick. `findSegment` requires at least two keyframes and a tick inside their range, so check the list and `isTickCoveredBy` first.

`getFirstKeyframeTick()` and `getLastKeyframeTick()` return the bounds, or `-1` for an empty layer. `isExactTick(float)` is available for layers that trigger only at their exact endpoint.

See [Keyframes](/api/keyframes) for menus, easing and interpolation utilities.

## Registry contract

`ICutsceneLayerRegistry` exposes `register(type)`, `unregister(typeId)`, `getType(typeId)` and `getTypes()`. NarrativeCraft uses this registry to populate the editor and resolve saved type IDs.

Addon code should register through `AddonContext.registerCutsceneLayer`, which respects the addon's API compatibility state.
