# Text Effects

Text effects animate dialog one letter at a time. Each effect returns a two-dimensional offset that NarrativeCraft adds to the letter's normal render position.

## Create an effect

Implement `ITextEffect`:

```java
public final class BounceTextEffect implements ITextEffect {

    @Override
    public Vec2 apply(
        int letterIndex,
        long tick,
        float partialTick,
        Map<String, String> params
    ) {
        float height = readFloat(params, "height", 2.0F);
        float speed = readFloat(params, "speed", 4.0F);
        double time = (tick + partialTick) / 20.0;
        float y = (float) -Math.abs(
            Math.sin(time * speed + letterIndex * 0.35)
        ) * height;
        return new Vec2(0.0F, y);
    }

    private static float readFloat(
        Map<String, String> params,
        String name,
        float fallback
    ) {
        try {
            return Float.parseFloat(params.getOrDefault(name, String.valueOf(fallback)));
        } catch (NumberFormatException exception) {
            return fallback;
        }
    }
}
```

`apply` receives:

| Parameter | Meaning |
| --- | --- |
| `letterIndex` | The zero-based position of the letter in the effect span. |
| `tick` | The current game tick as a `long`. |
| `partialTick` | The fractional progress toward the next tick. |
| `params` | Parameters parsed from the inline effect tag. Parameter names are lowercase. |

Return `Vec2.ZERO` when no offset should be applied.

## Register the effect

Register the effect during addon initialization:

```java
addon.registerTextEffect("bounce", new BounceTextEffect());
```

Effect names are case-insensitive when registered and used. Choose a unique name made from letters, digits or underscores, because inline effect tags accept word characters.

Registering the same name twice is an error.

## Use the effect in dialog

Wrap the affected text in an opening and closing tag:

```text
This is [bounce]important[/bounce].
```

Add parameters after the effect name:

```text
This is [bounce height=4 speed=7]very important[/bounce].
```

Parameters use `name=value`, are separated by spaces, and cannot contain spaces themselves. Unknown parameters are simply available in the map, so your effect decides which names it supports and how invalid values are handled.

Only one effect is active at a time. Opening another effect replaces the current one until a closing effect tag is encountered.

## Use a lambda

For a small stateless effect, registration can use a lambda:

```java
addon.registerTextEffect("drift", (letter, tick, partial, params) -> {
    float x = (float) Math.sin((tick + partial + letter) * 0.08F);
    return new Vec2(x, 0.0F);
});
```

Text effects run while dialog is rendered. Keep `apply` fast and avoid changing game state from it.

## Registry contract

`ITextEffectRegistry` exposes `register(name, effect)`, `unregister(name)`, `get(name)` and `getNames()`. NarrativeCraft uses it to resolve inline effect names.

Addon code should register through `AddonContext.registerTextEffect`, which respects the addon's API compatibility state. The registry is not exposed from the public API entry point.
