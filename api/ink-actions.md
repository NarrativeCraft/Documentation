# Ink Actions

Ink actions are classes bound to an Ink tag keyword (`# keyword:arg1:arg2`). When that keyword appears in a script, the action is instantiated and executed.

## Creating an Ink action

Extend `InkAction` and annotate it with `@InkCommand`.

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
        // doValidate is where you read and assign all your data
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

`doValidate` is mandatory. It receives the `ParsedCommand` and is where you read and assign all your data. `doExecute` only receives the player session.

## Reading arguments

Use the typed accessors on `ParsedCommand`:

```java
command.getString("name")    // String
command.getInt("count")      // int
command.getFloat("duration") // float
command.getBoolean("loop")   // boolean
command.flag("block")        // boolean, true if the flag was present in the tag
```

## Client Ink Action

Implementing a client ink action differs from a standard one. Start by writing your ink class with only the `doValidation` method implemented, `doExecute` should simply return `InkActionResult.ignored()` for now.

Next, create a new class prefixed with `Client` followed by the name of your ink action (e.g. `ClientMyInkAction`), and have it extend the class you just created. This is where you implement `doExecute`.

## Registering

```java
NarrativeCraftAPI.getInstance().getInkTagDispatcher()
    .register(TeleportAction.class, TeleportAction::new);
```

If your Ink Action is client side, also register is client ink action in the same dispatcher.

## @InkCommand

| Attribute | Type | Description |
|---|---|---|
| `keyword` | `String` | Tag keyword |
| `description` | `String` | Short description |
| `syntax` | `String`| Syntax declaration, see [Syntax](/api/ink-syntax) |
| `side` | `Side` | `SERVER` (default) or `CLIENT` |

## Side

- `SERVER`: executes server-side
- `CLIENT`: executes client-side

## InkAction protected fields

| Field | Type | Description |
|---|---|---|
| `instanceId` | `long` | Unique instance identifier |
| `canBeExecuted` | `boolean` | Whether the action can run |
| `isRunning` | `boolean` | True while executing |
| `blocking` | `boolean` | If `true`, pauses the action queue |
| `tick` | `int` | Current tick |
| `totalTick` | `int` | Scheduled total duration |

## Lifecycle overrides

You can override `tick()`, `partialTick(float)`, `render(GuiGraphicsExtractor, float)`, and `stop()` if your action needs to run logic over multiple ticks or render something client-side.

## InkActionResult

Returned by `doValidate` and `doExecute`.

```java
InkActionResult.ok()
InkActionResult.ignored()
InkActionResult.block()       // pauses the action queue
InkActionResult.error("msg")
InkActionResult.warn("msg")
```

## InkActionUtil

```java
// Converts a time value (e.g. 2.5, "m") to seconds
double seconds = InkActionUtil.getSecondsFromTimeValue(2.5, "minute");

// Replaces %variable% with their Ink story value
String resolved = InkActionUtil.parseVariables(story, "Hello %player_name%!");
```
