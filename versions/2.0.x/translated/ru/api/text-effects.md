# Текстовые эффекты

Текстовые эффекты применяют пословное смещение к тексту диалога во время отрисовки, позволяя создавать анимированные визуальные эффекты: волны, дрожание, подпрыгивание.

## Создание текстового эффекта

Реализуйте `ITextEffect`. Он получает индекс буквы, текущий тик, частичный тик и именованные параметры из Ink-тега. Возвращает `Vec2`, смещение, применяемое к позиции отрисовки буквы.

Может быть лямбдой:

```java
ITextEffect wave = (letterIndex, tick, partialTick, params) -> {
    float amplitude = Float.parseFloat(params.getOrDefault("amplitude", "2"));
    float offset = (float) Math.sin(tick * 0.1 + letterIndex * 0.5) * amplitude;
    return new Vec2(0, offset);
};
```

Или полноценным классом, если нужно состояние:

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

## Регистрация

```java
ctx.registerTextEffect("wave", wave);
```

Зарегистрированное имя, это то, что используется в Ink-теге для активации эффекта.
