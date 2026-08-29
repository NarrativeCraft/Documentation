# On Player Enter Zone

Emitted when the player enters an interaction zone that is currently active. The zone is started with the [`interaction`](/tags/interaction) tag.

This signal is emitted every time the player enters the zone, even when the zone is marked as one time and its own stitch has already been played.

## Side
SERVER

## Syntax

```
= on_player_enter_zone(zone_name)
```

## Parameters

- `zone_name` *(string)*: Name of the zone as defined in the interaction editor. This is the zone name, not its stitch name.

## Examples

```
// Warn the player when they walk into a dangerous area
= on_player_enter_zone(zone_name)
{zone_name == "ruins":
    Alex: Stay close, this place is not safe.
}
# gameplay
-> DONE
```

```
// Count how many times the player came back
VAR market_visits = 0

= on_player_enter_zone(zone_name)
{zone_name == "market":
    ~ market_visits = market_visits + 1
}
# gameplay
-> DONE
```
