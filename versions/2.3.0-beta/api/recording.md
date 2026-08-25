# Recording

NarrativeCraft recordings store actions for entities and execute those actions again during playback. Addons can register new serializable action types, add them to an active recording, and make them behave correctly when the timeline is rewound.

## Create a recording action

This action records and restores whether an entity is glowing:

```java
public final class GlowAction extends AbstractAction {

    public static final String ID = "my_addon_glow";

    private boolean glowing;

    public GlowAction(int tick) {
        super(tick);
    }

    public GlowAction(int tick, boolean glowing) {
        super(tick);
        this.glowing = glowing;
    }

    @Override
    public String getId() {
        return ID;
    }

    @Override
    public void write(Action.Writer writer) throws IOException {
        writer.addBoolean(glowing);
    }

    @Override
    public void read(Action.Reader reader) throws IOException {
        glowing = reader.readBoolean();
    }

    @Override
    public ActionResult execute(
        IPlaybackContext context,
        IPlaybackSession session
    ) {
        Entity entity = context.getEntity();
        if (entity == null) {
            return ActionResult.ERROR;
        }

        entity.setGlowingTag(glowing);
        return ActionResult.OK;
    }

    @Override
    public boolean differs(AbstractAction previous) {
        return !(previous instanceof GlowAction other)
            || glowing != other.glowing;
    }

    @Override
    public boolean shouldExecuteOnRewind() {
        return true;
    }
}
```

`AbstractAction` requires a constructor that accepts the recording tick because its factory is an `IntFunction<AbstractAction>`.

`write` and `read` must use the same fields in exactly the same order. `getId()` must return the same lowercase identifier used during registration.

## Register the action

Register the action during common addon initialization:

```java
addon.registerRecordingAction(GlowAction.ID, GlowAction::new);
```

The public `ActionType` record pairs an `id()` with its `factory()`. Addons normally do not construct it directly: `registerRecordingAction` creates the registry entry for you.

`IActionRegistry.register(id, factory)` is the underlying public registry contract and returns that `ActionType`. NarrativeCraft owns the registry, so addons should use `AddonContext.registerRecordingAction`.

## Add an action to every recorded entity

Get the current recording from the manager and use the recording's current tick:

```java
IRecordingManager recordings =
    NarrativeCraftAPI.getInstance().getRecordingManager();

IRecording recording = recordings.getRecording(player);
if (recording != null) {
    for (IRecordingEntityData entityData :
        recording.getRecordingEntities()) {
        entityData.addAction(
            new GlowAction(
                entityData.getRecordingTick(),
                true
            )
        );
    }
}
```

`getRecordingEntities()` returns the entity data currently present in the recording. This lets an addon apply an action to every recorded entity without depending on implementation classes.

`IRecordingEntityData.addAction()` associates the action with that entity's playback context. Each entity has its own action history, so deduplication is also evaluated independently for each entity.

## Add an action to one entity

When only one entity is affected, find its recording data first:

```java
IRecordingEntityData entityData =
    recording.getRecordingEntityData(target);

if (entityData != null) {
    entityData.addAction(
        new GlowAction(entityData.getRecordingTick(), true)
    );
}
```

An entity must already belong to the active recording. `getRecordingEntityData` returns `null` when it does not.

You can also use `IRecording.addAction(AbstractAction, Entity)` or `IRecording.addAction(AbstractAction, UUID)`. Both overloads target the entity whose playback context will execute the action.

## Track an interacted entity

Use `markEntityAsTracked` when the recording must preserve an entity that the player interacted with:

```java
int recordingId = recording.markEntityAsTracked(target);
if (recordingId == -1) {
    // The entity is not available in this recording.
}
```

The returned recording ID identifies that entity inside playback. The equivalent `IRecordingEntityData.markAsTracked()` method returns the same kind of ID when you already have the entity data.

## Deduplicate state

NarrativeCraft can compare a new action with the previous action of the same type. Override `differs` for frequently recorded state:

```java
@Override
public boolean differs(AbstractAction previous) {
    return !(previous instanceof GlowAction other)
        || glowing != other.glowing;
}
```

Returning `false` prevents identical consecutive state from being stored.

## Support rewind

There are two rewind strategies.

For pure state such as position, pose or the glowing flag, return `true` from `shouldExecuteOnRewind()`. NarrativeCraft re-executes the most recent action of that class at or before the destination tick. `GlowAction` uses this strategy.

For an event that changes something which cannot be reconstructed from the latest state action, return inverse actions from `createRewindSnapshot`:

```java
@Override
public List<AbstractAction> createRewindSnapshot(
    IPlaybackContext context,
    IPlaybackSession session
) {
    boolean previousValue = context.getEntity().isCurrentlyGlowing();
    return List.of(new GlowAction(getTick(), previousValue));
}
```

Snapshots are captured before the original action executes and are run when playback moves backward past that tick. They must restore state silently: do not play sounds or trigger unrelated visual effects from a snapshot.

Use one strategy when it fully restores the action. The default implementations return no snapshots and do not re-execute on rewind.

## Serialization values

`Action.Writer` and `Action.Reader` provide matching methods:

| Value | Write | Read |
| --- | --- | --- |
| `byte` | `addByte` | `readByte` |
| `short` | `addShort` | `readShort` |
| `int` | `addInt` | `readInt` |
| `long` | `addLong` | `readLong` |
| `double` | `addDouble` | `readDouble` |
| `float` | `addFloat` | `readFloat` |
| `boolean` | `addBoolean` | `readBoolean` |
| `String` | `addString` | `readString` |
| `UUID` | `addUUID` | `readUUID` |
| `Vec3` | `addVec3` | `readVec3` |
| `BlockPos` | `addBlockPos` | `readBlockPos` |

`write` and `read` may throw `IOException`; let the recording system handle that failure.

## Recording reference

### `IRecordingManager`

| Method | Result |
| --- | --- |
| `getById(UUID)` | Finds a recording by its recording ID. |
| `isRecording(ServerPlayer)` | Checks whether a player is currently recording. |
| `getRecording(ServerPlayer)` | Gets the player's active recording. |
| `getRecording(UUID)` | Gets the active recording for a player UUID. |
| `getRecording(Entity)` | Gets the recording that currently contains an entity. |
| `getRecordingEntityData(Entity)` | Gets recorded data for an entity. |

Lookup methods can return `null` when there is no match.

### `IRecording`

| Method | Use |
| --- | --- |
| `start()` / `stop()` | Controls recording. NarrativeCraft normally calls these from its recording workflow. |
| `isRecording()` | Reports whether capture is active. |
| `getTick()` | Returns the current recording tick. |
| `addAction(action, entity)` | Adds an action for an entity. |
| `addAction(action, entityId)` | Adds an action for an entity UUID. |
| `markEntityAsTracked(entity)` | Preserves an interacted entity and returns its recording ID, or `-1`. |
| `getRecordingEntityData(entity)` | Gets the entity's recording data. |
| `getRecordingEntityData(entityId)` | Gets recording data by entity UUID. |
| `getRecordingEntities()` | Returns all entity data currently present in the recording. |

### `IRecordingEntityData`

| Method | Use |
| --- | --- |
| `addAction(AbstractAction)` | Adds an action directly to this entity's data. |
| `markAsTracked()` | Marks this entity as tracked and returns its recording ID. |
| `getRecording()` | Returns the owning recording. |
| `getRecordingId()` | Returns the entity's playback ID. |
| `getEntity()` | Returns the source entity. |
| `getRecordingTick()` | Returns the owning recording's current tick. |
| `isTracked()` / `setTracked(boolean)` | Reads or changes tracked state. Prefer `markAsTracked()` when initial state must be captured. |
| `getFirstSeenTick()` | Returns when the entity first appeared in the recording. |
| `getLastInteractedBlockPos()` / `setLastInteractedBlockPos(BlockPos)` | Reads or stores the last interacted block position. |

## Playback context

`execute` receives two complementary views:

- `IPlaybackContext` is specific to the recorded entity. It exposes `getEntity()`, `getRecordingId()` and `respawnEntity()`.
- `IPlaybackSession` represents the whole playback. It exposes the server level, all recorded entities and the playback audience.

`IPlaybackSession` methods:

| Method | Use |
| --- | --- |
| `getLevel()` | Returns the playback `ServerLevel`. |
| `getEntityByRecordingId(int)` | Finds another playback entity, or returns `null`. |
| `respawnEntityByRecordingId(int)` | Respawns another recorded entity. |
| `forSpecificPlayers()` | Reports whether playback targets a limited audience. |
| `getTargetedPlayers()` | Returns that audience, or an empty collection for global playback. |
| `getBlockStateAtTick(pos, tick)` | Reads the virtual block state immediately before a tick. |
| `recordBlockState(tick, pos, state)` | Adds a post-action block state to the playback log. |
| `clearBlockStateLogFrom(tick)` | Clears block history at and after a tick. NarrativeCraft calls this while rewinding. |

Return `ActionResult.OK` after a successful action, `ActionResult.IGNORED` when it intentionally has nothing to do, or `ActionResult.ERROR` when playback must stop because the action failed.

`getTick()` and `setTick(int)` read or change an action's timestamp. Timestamp assignment is normally handled when the action is recorded or reconstructed.
