# On Screenshot Taken

Emitted when the player takes a screenshot with the `F2` key.

## Side
CLIENT

## Syntax

```
= on_screenshot_taken
```

## Parameters

This signal has no parameter.

## Examples

```
// Break the fourth wall
= on_screenshot_taken
Alex: Did you just take a picture of me?
# gameplay
-> DONE
```

```
// Count the pictures the player took of a view point
VAR pictures = 0

= on_screenshot_taken
~ pictures = pictures + 1
# gameplay
-> DONE
```
