# Recording

The recording system captures entity actions as binary-serializable records. Custom action types can be registered so your data is captured and replayed correctly.

## Creating a custom action

Extend `AbstractAction` and implement `getId`, `write`, and `read`:

```java
public class MyAction extends AbstractAction {

    @Override
    public String getId() { return "my_action"; }

    @Override
    public void write(Action.Writer writer) throws IOException {
        writer.addFloat(myValue);
    }

    @Override
    public void read(Action.Reader reader) throws IOException {
        myValue = reader.readFloat();
    }
}
```

You can also override `differs(AbstractAction)` to deduplicate identical consecutive actions, `createRewindSnapshot(...)` to define what gets replayed on rewind, and `shouldExecuteOnRewind()` to re-execute this action during a rewind.

## Registering

```java
ActionType type = NarrativeCraftAPI.getInstance().getActionRegistry()
    .register("my_action", tick -> new MyAction(tick));
```