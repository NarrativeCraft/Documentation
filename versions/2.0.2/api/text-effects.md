# Text Effects

Text effects apply a per-letter offset to dialog text during rendering, allowing animated visual effects like waves, shakes, or bounces.

## Creating a text effect

Implement `ITextEffect`. It receives the letter index, the current tick, the partial tick, and named parameters from the Ink tag. It returns a `Vec2` offset applied to the letter's render position.

It can be a lambda:

```java
ITextEffect wave = (letterIndex, tick, partialTick, params) -> {
    float amplitude = Float.parseFloat(params.getOrDefault("amplitude", "2"));
    float offset = (float) Math.sin(tick * 0.1 + letterIndex * 0.5) * amplitude;
    return new Vec2(0, offset);
};
```

Or a full class if you need state:

```java
public class WaveEffect implements ITextEffect {
    @Override
    public Vec2 apply(int letterIndex, int tick, float partialTick, Map<String, String> params) {
        float amplitude = Float.parseFloat(params.getOrDefault("amplitude", "2"));
        float offset = (float) Math.sin(tick * 0.1 + letterIndex * 0.5) * amplitude;
        return new Vec2(0, offset);
    }
}
```

## Registering

```java
ctx.registerTextEffect("wave", wave);
```

The name you register is what you use in the Ink tag to activate the effect.