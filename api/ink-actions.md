# Ink Actions

Ink actions turn Ink tags into addon behavior. A tag is parsed and validated by NarrativeCraft, then a fresh instance of the registered action runs on either the server or the client.

Use [Ink Syntax](/api/ink-syntax) for the complete argument grammar.

## Create a server action

Extend `InkAction` and annotate the class with `@InkCommand`. The first token in `syntax` must match `keyword`.

This action teleports the player and finishes immediately:

```java
@InkCommand(
    keyword = "teleport",
    description = "Teleports the player to a position.",
    syntax = "teleport <x:float> <y:float> <z:float>",
    side = Side.SERVER
)
public final class TeleportInkAction extends InkAction {

    private double x;
    private double y;
    private double z;

    @Override
    protected InkActionResult doValidate(ParsedCommand command, IScene scene) {
        x = command.getFloat("x");
        y = command.getFloat("y");
        z = command.getFloat("z");
        return InkActionResult.ok();
    }

    @Override
    protected InkActionResult doExecute(IPlayerSession session) {
        session.getPlayer().teleportTo(x, y, z);
        return InkActionResult.singleOk();
    }
}
```

`doValidate` and `doExecute` are the two protected methods every action must implement:

1. `doValidate(ParsedCommand, IScene)` reads the parsed arguments, stores any values needed later, and checks story-specific requirements.
2. `doExecute(IPlayerSession)` performs the action.

Return an error from validation when the tag is syntactically valid but cannot be used in the current scene:

```java
if (scene.getCharacterManager().getByName(characterName) == null) {
    return InkActionResult.error("Unknown character: " + characterName);
}
```

Syntax and type errors are already reported before `doValidate` is called.

## Register the action

Register the annotated class and a factory during your common addon initialization:

```java
addon.registerInkAction(TeleportInkAction.class, TeleportInkAction::new);
```

The action class inherits its keyword, syntax and execution side from `@InkCommand`. NarrativeCraft creates a new action instance for each processed tag.

The Ink tag is then:

```ink
# teleport 12.5 64 -30
```

## Create a client action

Client actions use a common base class and a client-only subclass. This keeps client classes out of code that can be loaded by a dedicated server.

The common class declares and validates the command:

```java
@InkCommand(
    keyword = "flash",
    description = "Flashes the screen for a duration.",
    syntax = "flash <duration:float> [color:string=FFFFFF] [--block]",
    side = Side.CLIENT
)
public class FlashInkAction extends InkAction {

    protected int durationTicks;
    protected int color;

    @Override
    protected InkActionResult doValidate(ParsedCommand command, IScene scene) {
        durationTicks = Math.max(1, (int) (command.getFloat("duration") * 20));

        try {
            color = Integer.parseInt(command.getString("color"), 16);
        } catch (NumberFormatException exception) {
            return InkActionResult.error("The flash color must be hexadecimal.");
        }

        blocking = command.flag("block");
        return InkActionResult.ok();
    }

    @Override
    protected InkActionResult doExecute(IPlayerSession session) {
        return InkActionResult.ignored();
    }
}
```

The client-only subclass performs the visual work:

```java
public final class ClientFlashInkAction extends FlashInkAction {

    private int elapsedTicks;

    @Override
    protected InkActionResult doExecute(IPlayerSession session) {
        elapsedTicks = 0;
        return InkActionResult.ok();
    }

    @Override
    public void tick() {
        if (++elapsedTicks >= durationTicks) {
            isRunning = false;
        }
    }

    @Override
    public void render(GuiGraphicsExtractor graphics, float partialTick) {
        if (!isRunning()) return;
        graphics.fill(
            0,
            0,
            graphics.guiWidth(),
            graphics.guiHeight(),
            ARGB.color(120, color)
        );
    }
}
```

Register only the common class during common initialization:

```java
addon.registerInkAction(FlashInkAction.class, FlashInkAction::new);
```

Register the client implementation during client initialization:

```java
addon.registerInkAction(ClientFlashInkAction.class, ClientFlashInkAction::new);
```

Because `@InkCommand` is inherited, both classes use the same keyword. On a physical client, the second registration supplies the client implementation. Never load or register `ClientFlashInkAction` from common initialization.

Example tags:

```ink
# flash 0.5 color:FFCC00
# flash 1.5 color:FF0000 --block
```

## Run on both sides

`Side.CLIENT_SERVER` runs the same tag on the server and on the client. NarrativeCraft executes the server instance first, then forwards the tag to the client instance.

Declare the side once on the common class:

```java
@InkCommand(
    keyword = "gameplay",
    description = "Gives the controls back to the player.",
    syntax = "gameplay [gamemode:string=adventure]",
    side = Side.CLIENT_SERVER
)
public class GameplayInkAction extends InkAction { /* server behavior */ }
```

The client subclass overrides `doExecute` with the client-only half:

```java
public final class ClientGameplayInkAction extends GameplayInkAction {

    @Override
    protected InkActionResult doExecute(IPlayerSession session) {
        UtilsClient.setHudHidden(false);
        return InkActionResult.singleOk();
    }
}
```

Registration follows the same rule as a client action: the common class during common initialization, the client subclass during client initialization.

| Side | Where `doExecute` runs |
|---|---|
| `SERVER` | Server only |
| `CLIENT` | Client only, after the server validated the tag |
| `CLIENT_SERVER` | Server, then client |

## `isRunning`: instant or persistent actions

Every new `InkAction` starts with `isRunning == false`. When NarrativeCraft calls `execute()`, the API sets it to `true` before entering your `doExecute()` method.

What you do with that state determines the action's lifetime.

An **instant action** performs all its work in `doExecute()` and returns `singleOk()`, which sets the state back to `false`:

```java
@Override
protected InkActionResult doExecute(IPlayerSession session) {
    performImmediateWork();
    return InkActionResult.singleOk();
}
```

Setting `isRunning = false;` before returning `ok()` has the same effect and remains valid.

A **persistent action** leaves the state as `true`. NarrativeCraft keeps the instance active and calls its lifecycle methods until the action changes the state to `false`:

```java
@Override
protected InkActionResult doExecute(IPlayerSession session) {
    elapsedTicks = 0;
    return InkActionResult.ok(); // isRunning remains true
}

@Override
public void tick() {
    updateEffect();

    if (++elapsedTicks >= durationTicks) {
        isRunning = false;
    }
}
```

You normally do not need to call `isRunning = true;` inside `doExecute()`, because `execute()` has already done it.

While a server action is running, NarrativeCraft calls `tick()` once per server tick. While a client action is running, NarrativeCraft calls:

- `tick()` once per client tick;
- `partialTick(float)` while rendering between ticks;
- `render(GuiGraphicsExtractor, float)` during HUD rendering;
- `render(PoseStack, float)` during world rendering.

When `isRunning` becomes `false`, NarrativeCraft removes the action from the active list. A blocking action also releases the Ink tag queue at that point.

Use `singleOk()` or `isRunning = false;` when the action completes normally. Use `stop()` when it must be cancelled or needs cleanup:

```java
@Override
public void stop() {
    releaseTemporaryResources();
    super.stop();
}
```

The default `stop()` implementation sets `isRunning` to `false`, which is why an override must call `super.stop()`.

For a non-blocking persistent server action, return `InkActionResult.ok()` and leave `isRunning` as `true`: later Ink tags continue while the action receives ticks. For a blocking server action, return `InkActionResult.block()` instead. For a blocking client action, set `blocking = true` during `doValidate`. In both blocking cases, the Ink tag queue waits until the action is no longer running.

## Results

`InkActionResult` provides these factories:

| Factory | Meaning |
| --- | --- |
| `ok()` | The action was accepted and keeps running in the background. |
| `singleOk()` | The action was accepted and is finished; NarrativeCraft stops it for you. |
| `ignored()` | The action intentionally did nothing on this side. |
| `block()` | A server action started and pauses the tag queue until it finishes. |
| `warn(message)` | The action produced a non-fatal warning. |
| `error(message)` | Validation or execution failed. |

The result record exposes `status()`, `errorMessage()`, `isOk()`, `isSingleOk()`, `isIgnore()`, `isBlock()`, `isWarn()` and `isError()`. `isOk()` and `isSingleOk()` are also `true` for an ignored result.

Return `singleOk()` instead of writing `isRunning = false;` yourself when the action does all its work in `doExecute()`:

```java
@Override
protected InkActionResult doExecute(IPlayerSession session) {
    session.getPlayer().teleportTo(x, y, z);
    return InkActionResult.singleOk();
}
```

## Action methods

NarrativeCraft calls `validate()` and `execute()` for you. It also assigns the `instanceId` used to match a running client action with the server.

| Method | Use |
| --- | --- |
| `getKeyword()` | Returns the annotation keyword. |
| `getSide()` | Returns the annotation execution side. |
| `getInstanceId()` / `setInstanceId(long)` | Reads or assigns the runtime action identifier. Assignment is normally framework-managed. |
| `isRunning()` / `setRunning(boolean)` | Reads or changes whether the instance remains active and receives lifecycle callbacks. |
| `isBlocking()` | Reports whether the action pauses the tag queue. |
| `tick()` | Updates a running action once per game tick. |
| `partialTick(float)` | Updates a client action between game ticks. |
| `render(GuiGraphicsExtractor, float)` | Draws two-dimensional client UI. |
| `render(PoseStack, float)` | Draws with a pose stack when that rendering path is needed. |
| `stop()` | Stops the action; override it to add cleanup. |

## Time conversion

`InkActionUtil.getSecondsFromTimeValue(value, unit)` converts values whose unit contains `second`, `minute` or `hour`:

```java
double duration = InkActionUtil.getSecondsFromTimeValue(2.5, "minutes");
if (duration < 0) {
    return InkActionResult.error("Unknown time unit.");
}
```

The method returns `-1` for an unsupported unit.

## Dispatcher contract

`InkTagDispatcher.register(Class<T>, Supplier<T>)` is the public registry contract used to associate an annotated action with its factory. NarrativeCraft owns the dispatcher, so addon code should use `AddonContext.registerInkAction` rather than trying to obtain the dispatcher directly.
