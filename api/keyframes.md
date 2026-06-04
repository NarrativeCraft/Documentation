# Keyframes

## Keyframe *(abstract)*

Base class for all keyframes. Handles position in the timeline editor and selection state.

Extend it and implement `createMenu()`, which returns the popup UI for editing this keyframe's properties.

### Protected fields

| Field | Type | Description |
|---|---|---|
| `x, y` | `int` | Position in the editor UI |
| `tick` | `int` | Temporal position |
| `isSelected` | `boolean` | Selection state |
| `layer` | `CutsceneLayer` | Parent layer |

### Constants

| Constant | Value | Description |
|---|---|---|
| `SIZE` | `7` | Visual size in the editor |
| `KEYFRAME_SPRITE` | `Identifier` | Default sprite |
| `KEYFRAME_SELECTED_SPRITE` | `Identifier` | Selected sprite |

## KeyframeMenu\<T extends Keyframe\> *(abstract)*

Contextual popup UI for editing keyframe properties. Implement `getContentHeight`, `renderContent`, `applyChanges`, and `initContent`.

### Constants

| Constant | Value |
|---|---|
| `WIDTH` | `110` |
| `PADDING` | `5` |
| `BUTTON_HEIGHT` | `14` |
| `BUTTON_WIDTH` | `50` |

## KeyframeSegment\<K extends Keyframe\>

Record holding the two keyframes around a tick and the Catmull-Rom control points.

```java
record KeyframeSegment<K extends Keyframe>(
    K from,      // start keyframe
    K to,        // end keyframe
    K p0,        // control point before `from`
    K p3,        // control point after `to`
    double rawT  // normalized t in [0, 1]
)
```

Produced by `CutsceneLayer.findSegment(...)`.

## EasingType

| Value | Interpolation |
|---|---|
| `LINEAR` | Linear |
| `EASE_IN` | Accelerating |
| `EASE_OUT` | Decelerating |
| `SMOOTH` | Ease in + out |

## Interpolation

Utility class for animating values between keyframes.

```java
// Apply an easing curve to t in [0, 1]
double t2 = Interpolation.applyEasing(EasingType.SMOOTH, t);

// Standard lerp
double v = Interpolation.lerp(a, b, t);

// Angular lerp (handles 0 to 360 wrap)
double angle = Interpolation.lerpAngle(fromDeg, toDeg, t);

// Catmull-Rom (4 control points)
double v = Interpolation.catmullRom(p0, p1, p2, p3, t);
```
