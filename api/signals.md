# Signals

A signal is a game event sent to the running story. The story reacts to it by declaring a stitch named after the signal in its current scene knot.

Your addon can declare its own signals and emit them whenever it wants, so writers can react to your mod from Ink. See [Signals](../signals/introduction) for the writing side and the list of built-in signals.

## Declare a signal type

A `SignalType` is an immutable record describing the signal:

```java
public record SignalType(String eventName, int argumentCount, Side side) {}
```

| Component | Purpose |
|---|---|
| `eventName` | Name of the stitch the story must declare. Use lowercase snake case, prefixed with `on_` |
| `argumentCount` | Exact number of arguments the signal carries |
| `side` | `Side.SERVER` or `Side.CLIENT` |

`Side.CLIENT_SERVER` is not allowed for a signal and throws when registered.

## Create a signal

Extend `Signal`, expose its type as a constant, and register the arguments in the constructor:

```java
public class SignalTokenGiven extends Signal {

    public static final SignalType SIGNAL_TYPE =
        new SignalType("on_token_given", 2, Side.SERVER);

    public SignalTokenGiven(String target, int amount) {
        registerStringArgument("target", target);
        registerIntArgument("amount", amount);
    }

    @Override
    public SignalType getSignalType() {
        return SIGNAL_TYPE;
    }
}
```

Arguments reach the story as stitch parameters, in the order they were registered. The story above declares:

```
= on_token_given(target, amount)
Alex: {target} got {amount} tokens.
# gameplay
-> DONE
```

Four argument types are available:

| Method | Ink value |
|---|---|
| `registerStringArgument()` | `String` |
| `registerIntArgument()` | `Integer` |
| `registerFloatArgument()` | `Float` |
| `registerBoolArgument()` | `Boolean` |

Argument names must be unique within a signal, and a `null` string value is stored as an empty string.

## Register the signal

Register the type once, during initialization, through your `AddonContext`:

```java
context.registerSignal(SignalTokenGiven.SIGNAL_TYPE);
```

Client signals use the client registry instead:

```java
context.registerClientSignal(SignalZoomToggled.SIGNAL_TYPE);
```

Both methods do nothing when the addon is disabled. Registering throws an `IllegalStateException` when the type is `null`, when its side is `CLIENT_SERVER`, when it is registered on the registry of the other side, or when a signal with the same event name is already registered.

## Emit the signal

A server signal is emitted for one player:

```java
NarrativeCraftAPI.getInstance()
    .getSignalEmitter()
    .emit(new SignalTokenGiven("alex", 3), player);
```

A client signal is emitted for the local player, with no player argument:

```java
NarrativeCraftClientAPI.getInstance()
    .getSignalEmitter()
    .emit(new SignalZoomToggled(true));
```

The client emitter sends the signal to the server, which plays it on the player's story. Guard the call with `NarrativeCraftClientAPI.isAvailable()` when the same code also runs on a server.

Emitting is silently ignored when there is nothing to play the signal on:

- the player has no NarrativeCraft session,
- no story is running for that player,
- the game is paused, for client signals.

Otherwise the signal is validated, and an `IllegalStateException` is thrown when:

- the signal has no signal type,
- the number of registered arguments does not match `argumentCount()`,
- an argument value does not match its declared type,
- the signal is emitted on the wrong side,
- the signal type was never registered.

Validate what you pass to your signal before emitting it. Argument values are carried as text and parsed back into Ink values, so an `int` argument built from a malformed string fails at emit time.

## What the story does with it

The signal plays only when the story is idle, and only when the current scene knot declares a stitch with the same name. Anything else, such as a story waiting for a dialog line or a scene without that stitch, drops the signal without an error.

This makes signals a way to offer story hooks, not a way to force the story forward. Use an [Ink action](/api/ink-actions) when the story must drive your mod, and a signal when your mod must notify the story.

## Inspect the registry

Both registries expose the same contract:

```java
SignalRegistry registry = NarrativeCraftAPI.getInstance().getSignalRegistry();

registry.isRegistered(SignalTokenGiven.SIGNAL_TYPE);
registry.getRegisteredSignals();
registry.unregister(SignalTokenGiven.SIGNAL_TYPE);
```

`getRegisteredSignals()` returns a read-only list of every signal available on that side, including the built-in ones. `unregister()` removes a signal, which then stops being emittable.

## Full example

```java
public final class MyAddon {

    public static final String MOD_ID = "my_addon";
    private static AddonContext context;

    public static void initialize() {
        context = NarrativeCraftAPI.getInstance().createAddon(
            MOD_ID,
            "My Addon",
            "Adds a token economy",
            "DeveloperName",
            "https://example.com/my-addon",
            NarrativeCraftAPI.VERSION
        );

        context.registerSignal(SignalTokenGiven.SIGNAL_TYPE);
    }

    public static void giveTokens(ServerPlayer player, String target, int amount) {
        // Your own logic here.

        NarrativeCraftAPI.getInstance()
            .getSignalEmitter()
            .emit(new SignalTokenGiven(target, amount), player);
    }
}
```

Continue with [Ink actions](/api/ink-actions) to let the story call your mod instead.
