# On Player Leave Zone

Emitted when the player leaves an interaction zone that is currently active. The zone is started with the [`interaction`](/tags/interaction) tag.

## Side
SERVER

## Syntax

```
= on_player_leave_zone(zone_name)
```

## Parameters

- `zone_name` *(string)*: Name of the zone as defined in the interaction editor. This is the zone name, not its stitch name.

## Examples

```
// Call the player back when they walk away
= on_player_leave_zone(zone_name)
{zone_name == "camp":
    Alex: Do not wander off, stay in the camp.
}
# gameplay
-> DONE
```

```
// Stop an ambient sound tied to an area
= on_player_leave_zone(zone_name)
{zone_name == "waterfall":
    # sound stop waterfall_ambient
}
# gameplay
-> DONE
```
