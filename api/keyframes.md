# Keyframes

A keyframe stores a layer value at a timeline tick. It also creates the editor menu used to change that value.

This page completes the persistent Subtitle layer from [Cutscene Layers](/api/cutscene-layers).

## Create a keyframe

Extend `Keyframe`. The API 3 constructor receives the layer first and the tick second:

```java
public final class SubtitleKeyframe extends Keyframe {

    private String text;

    public SubtitleKeyframe(
        CutsceneLayer layer,
        int tick,
        String text
    ) {
        super(layer, tick);
        this.text = text;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    @Override
    public KeyframeMenu<?> createMenu() {
        return new SubtitleKeyframeMenu(this);
    }
}
```

`createMenu()` is the required abstract method. NarrativeCraft calls it when the keyframe's editor menu must be opened.

## Create the editor menu

Extend `KeyframeMenu<T>` and implement the four required content methods:

```java
public final class SubtitleKeyframeMenu
    extends KeyframeMenu<SubtitleKeyframe> {

    private static final int LABEL_HEIGHT = 7;
    private static final int FIELD_HEIGHT = 14;

    private EditBox textField;

    public SubtitleKeyframeMenu(SubtitleKeyframe keyframe) {
        super(keyframe);
    }

    @Override
    protected void initContent() {
        int fieldWidth = width - padding * 2;
        textField = new EditBox(
            Minecraft.getInstance().font,
            0,
            0,
            fieldWidth,
            FIELD_HEIGHT,
            Component.empty()
        );
        textField.setValue(keyframe.getText());
    }

    @Override
    protected int getContentHeight() {
        return LABEL_HEIGHT + FIELD_HEIGHT;
    }

    @Override
    protected void renderContent(
        GuiGraphicsExtractor graphics,
        DeltaTracker delta,
        int x,
        int y,
        int contentWidth,
        int mouseX,
        int mouseY
    ) {
        graphics.text(
            Minecraft.getInstance().font,
            "Text",
            x,
            y - 2,
            0xFFAAAAAA
        );

        textField.setPosition(x, y + LABEL_HEIGHT);
        textField.setWidth(contentWidth);
        textField.extractRenderState(
            graphics,
            mouseX,
            mouseY,
            delta.getGameTimeDeltaTicks()
        );
    }

    @Override
    protected void applyChanges() {
        textField.setFocused(false);
        keyframe.setText(textField.getValue().trim());
    }

    @Override
    protected boolean onContentMouseClicked(
        MouseButtonEvent event,
        boolean isDoubleClick,
        int contentX,
        int contentY,
        int contentWidth
    ) {
        boolean hovered = isHovered(event, textField);
        textField.setFocused(hovered);
        if (hovered) {
            textField.mouseClicked(event, isDoubleClick);
        }
        return hovered;
    }

    @Override
    public boolean charTyped(CharacterEvent event) {
        return textField.isFocused() && textField.charTyped(event);
    }

    @Override
    public boolean keyPressed(KeyEvent event) {
        return textField.isFocused() && textField.keyPressed(event);
    }

    @Override
    public boolean mouseDragged(
        MouseButtonEvent event,
        double dragX,
        double dragY
    ) {
        return textField.isFocused()
            && textField.mouseDragged(event, dragX, dragY);
    }
}
```

`KeyframeMenu` calls `initContent()` from its constructor. Create widgets there, not in subclass field initializers that run later.

The base menu supplies the **Edit** and **Delete** buttons. **Edit** calls `applyChanges()` and closes the menu; **Delete** removes the keyframe from its layer.

## Menu methods

The four protected abstract methods are required:

| Method | Responsibility |
| --- | --- |
| `initContent()` | Creates widgets and initializes them from the keyframe. |
| `getContentHeight()` | Returns the height reserved above the base buttons. |
| `renderContent(...)` | Positions and renders custom widgets. |
| `applyChanges()` | Copies edited values back to the keyframe. |

Override input methods when your widgets need them:

| Method | Use |
| --- | --- |
| `onContentMouseClicked(...)` | Focuses or activates custom content. |
| `mouseDragged(...)` | Forwards drag input. |
| `mouseScrolled(double)` | Forwards scroll input. |
| `charTyped(CharacterEvent)` | Forwards typed characters. |
| `keyPressed(KeyEvent)` | Forwards key presses. |

`isHovered(event, widget)` helps route a click. NarrativeCraft calls the public `render`, `mouseClicked` and input methods for the open menu. `isVisible()` reports whether it remains open, and `close()` hides it.

## Keyframe state

The base `Keyframe` manages placement and editor interaction:

| Method | Use |
| --- | --- |
| `getTick()` / `setTick(int)` | Reads or changes the timeline tick. |
| `getLayer()` | Returns the owning `CutsceneLayer`. |
| `getX()` / `setX(int)` | Reads or changes the editor X position. |
| `getY()` / `setY(int)` | Reads or changes the editor Y position. |
| `setLayerPosition(x, y)` | Sets both editor coordinates. |
| `isSelected()` / `setSelected(boolean)` | Reads or changes selection. |
| `isHovered(mouseX, mouseY)` | Tests the keyframe's editor bounds. |
| `click(event, doubleClick)` | Selects the keyframe by default. |
| `drag(...)` | Moves the keyframe and calculates its tick from the visible timeline. |
| `render(graphics, delta)` | Draws the default selected or unselected sprite. |

Override `click`, `drag` or `render` only when your keyframe requires different editor interaction. The default constants `KEYFRAME_SPRITE`, `KEYFRAME_SELECTED_SPRITE` and `SIZE` are available for matching the built-in appearance.

## Interpolate values

For continuous layers, call `findSegment` from the layer after checking that at least two keyframes cover the current tick:

```java
List<OpacityKeyframe> sorted =
    getSortedKeyframes(OpacityKeyframe.class);

if (sorted.size() < 2 || !isTickCoveredBy(tick)) {
    return false;
}

KeyframeSegment<OpacityKeyframe> segment =
    findSegment(sorted, tick);

double easedT = Interpolation.applyEasing(
    EasingType.SMOOTH,
    segment.rawT()
);

double opacity = Interpolation.catmullRom(
    segment.p0().getOpacity(),
    segment.from().getOpacity(),
    segment.to().getOpacity(),
    segment.p3().getOpacity(),
    easedT
);
```

`KeyframeSegment<K>` exposes `from()`, `to()`, `p0()`, `p3()` and the normalized `rawT()`.

## Easing and interpolation

`EasingType` provides:

| Value | Curve |
| --- | --- |
| `LINEAR` | Constant progress. |
| `EASE_IN` | Slow start, accelerating finish. |
| `EASE_OUT` | Fast start, decelerating finish. |
| `SMOOTH` | Smooth start and finish. |

`Interpolation` provides:

```java
double eased = Interpolation.applyEasing(EasingType.SMOOTH, t);
double value = Interpolation.lerp(from, to, eased);
double angle = Interpolation.lerpAngle(fromDegrees, toDegrees, eased);
double curve = Interpolation.catmullRom(p0, p1, p2, p3, eased);
```

`lerpAngle` takes the shortest path across the 0°/360° boundary. Keep `t` within `[0, 1]` when using these helpers for a keyframe segment.
