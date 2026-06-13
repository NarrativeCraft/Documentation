# Ink Actions

Ink actions are classes bound to an Ink tag keyword (`# keyword:arg1:arg2`). When that keyword appears in a script, the action is instantiated and executed.

## Creating an Ink action

Extend `InkAction` and annotate it with `@InkCommand`:

```java
@InkCommand(
    keyword = "teleport",
    description = "Teleports the player",
    syntax = "teleport <x:float> <y:float> <z:float>",
    side = Side.SERVER
)
public class TeleportAction extends InkAction {

    private float x, y, z;

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
        return InkActionResult.ok();
    }
}
```

`doValidate` runs first and receives the parsed arguments. Read and store everything you need there, because `doExecute` only receives the player session.

## Reading arguments

Use the typed accessors on `ParsedCommand`:

```java
command.getString("name")    // String
command.getInt("count")      // int
command.getFloat("duration") // float
command.getBoolean("loop")   // boolean
command.flag("block")        // boolean, true if the flag was present in the tag
```

See [Syntax](/api/ink-syntax) for how to declare argument types in `@InkCommand`.

## Client-side Ink actions

Server actions run on the server, client actions run on the client. The split is done through inheritance rather than duplication.

Start with a base class where `doExecute` returns `InkActionResult.ignored()`, this is what the server sees:

```java
@InkCommand(
    keyword = "shake",
    syntax = "shake <amplitude:float>",
    side = Side.CLIENT
)
public class ShakeAction extends InkAction {

    protected float amplitude;

    @Override
    protected InkActionResult doValidate(ParsedCommand command, IScene scene) {
        amplitude = command.getFloat("amplitude");
        return InkActionResult.ok();
    }

    @Override
    protected InkActionResult doExecute(IPlayerSession session) {
        return InkActionResult.ignored();
    }
}
```

Then create a `Client`-prefixed subclass that overrides `doExecute` with the actual client logic:

```java
public class ClientShakeAction extends ShakeAction {

    @Override
    protected InkActionResult doExecute(IPlayerSession session) {
        // client-side screen shake logic
        return InkActionResult.ok();
    }
}
```

## Registering

Register both classes through your `AddonContext`:

```java
ctx.registerInkAction(ShakeAction.class, ShakeAction::new);
ctx.registerInkAction(ClientShakeAction.class, ClientShakeAction::new);
```

## Multi-tick actions

If your action runs over multiple ticks, override the relevant lifecycle methods:

```java
@Override
public void tick() {
    // called every server tick while isRunning
}

@Override
public void partialTick(float partialTick) {
    // called every frame on the client
}

@Override
public void render(GuiGraphicsExtractor graphics, float partialTick) {
    // client-side rendering
}

@Override
public void stop() {
    // cleanup when the action ends
}
```

Set `blocking = true` in `doValidate` if the action should pause the Ink script until it finishes.

## InkActionResult

Returned by both `doValidate` and `doExecute`:

```java
InkActionResult.ok()           // success
InkActionResult.ignored()      // this side doesn't handle it
InkActionResult.block()        // pauses the action queue
InkActionResult.error("msg")   // validation or execution failure
InkActionResult.warn("msg")    // non-fatal warning
```

## InkActionUtil

```java
// converts a time value (e.g. 2.5, "minute") to seconds
double seconds = InkActionUtil.getSecondsFromTimeValue(2.5, "minute");

// replaces %variable% with their Ink story value
String resolved = InkActionUtil.parseVariables(story, "Hello %player_name%!");
```
