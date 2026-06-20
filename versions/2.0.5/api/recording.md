# Recording

The recording system captures entity actions as binary-serializable records. Custom action types can be registered so your data is captured and replayed correctly.

## Creating a custom action

Extend `AbstractAction` and implement `getId`, `write`, and `read`:

```java
public class MyAction extends AbstractAction {

    public static final String ID = "my_action";

    private float myValue;

    public MyAction(int tick) {
        super(tick);
    }

    @Override
    public String getId() { return ID; }

    @Override
    public void write(Action.Writer writer) throws IOException {
        writer.addFloat(myValue);
    }

    @Override
    public void read(Action.Reader reader) throws IOException {
        myValue = reader.readFloat();
    }

    @Override
    public ActionResult execute(IPlaybackContext ctx, IPlaybackSession session) {
        // apply myValue during playback
        return ActionResult.SUCCESS;
    }
}
```

`write` and `read` must be symmetric, write order must match read order exactly.

## Deduplication and rewind

Override `differs` to avoid recording identical consecutive frames:

```java
@Override
public boolean differs(AbstractAction other) {
   if (!(other instanceof MyAction that)) {
        return false;
    }
    return Float.compare(myValue, that.myValue) != 0;
}
```

Override `createRewindSnapshot` and `shouldExecuteOnRewind` if the action needs to participate in rewind playback for cutscenes:

```java
@Override
public boolean shouldExecuteOnRewind() { return true; }
```

## Registering

```java
ctx.registerRecordingAction(MyAction.ID, MyAction::new);
```

The id you pass here must match `getId()` on your action class.
