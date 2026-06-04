# Text Effects

Text effects apply a per-letter offset to dialog text during rendering, allowing animated visual effects like waves, shakes, or bounces.

## Creating a text effect

Implement `ITextEffect`. It receives the letter index, the current tick, the partial tick, and named parameters from the Ink tag. It returns a `Vec2` offset applied to the letter's render position.

It can be a lambda:

```java
registry.register("wave", (letterIndex, tick, partialTick, params) -> {
    float amplitude = Float.parseFloat(params.getOrDefault("amplitude", "2"));
    float offset = (float) Math.sin(tick * 0.1 + letterIndex * 0.5) * amplitude;
    return new Vec2(0, offset);
});
```

## Registering

```java
NarrativeCraftAPI.getInstance().getTextEffectRegistry()
    .register("my-effect", new MyEffect());
```

## IDialogPresetProvider

Lets you expose dialog presets to the editor.

```java
public class MyPresetProvider implements IDialogPresetProvider {
    @Override
    public void providePresets(IDialogPresetConsumer consumer) {
        consumer.registerPreset("my-preset", myPresetObject);
    }
}
```
