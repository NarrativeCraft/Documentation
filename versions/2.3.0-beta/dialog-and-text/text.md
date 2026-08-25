# Text

With NarrativeCraft you can make a character speak or render a dialog on screen.

For example
```
=== chapter_1_scene_one ===
# on_enter
# cutscene "walk cut" // Play the cutscene
# camera "end walk" steve_view // After the cutscene has finished, invoke the camera steve_view from end walk
Steve: hey! how are you?
I hope she's doing fine
-> END
```

```
Steve: hey! how are you?
```

In game, NarrativeCraft will check if an entity named "Steve" is here, if found, the dialog will be rendered for him to show that he is talking

but
```
I hope she's doing fine
```

Have no characters assigned, so it will render a dialog on the gui. This can be used for :
- Minded dialog
- Explanation
- Dialog that other characters cannot hear

## Variables

You can put your variables inside a dialog or tags

Example:

```
VAR eat_apple = 6

Jake: I ate %eat_apple% apple!
```

## Text Effects

You can apply animated text effects to dialog using inline tags.

### Syntax

`[<effect> (param1=value1 param2=value2)]<text>[/<effect>]`

Effects apply **only** to the enclosed text. All parameters are optional unless stated otherwise.

### Available Effects

#### `wave`

Applies a horizontal wave motion to the text.

#### `shake`

Applies a chaotic shaking motion.

**Parameters:**

- `time` _(float, optional)_ interval between shakes. Lower = faster movement.
- `force` _(float, optional)_ intensity of the shake.

#### `wait`

**Parameters:**

- `time` _(float)_ Value to wait before the text continue to render

### Examples

- `Mark: [shake force=0.1]What did you just say?[/shake]`
- `Jade: [wave]I'm just chilling[/wave]`
- `Jake: I'm... [wait time=1]I'm sorry.`

## Images

You can render an image inside a dialog with `[img <path>]`.

The path is resolved like the [image tag](/2.3.0-beta/tags/image#image-path): a bare path is looked up in `textures/nc_images/` of the `minecraft` namespace and `.png` is appended when missing. An image that cannot be loaded is skipped.

Placement decides how the image is drawn:

- At the start or the end of the line, the image becomes a **side image**. It is rendered in a gutter next to the text, larger than a line, and is visible immediately.
- Anywhere else, the image is **inline**. It flows with the text at about twice the line height and appears when the typewriter reaches it.

```
// Portrait on the left of the dialog
Clara: [img clara/happy] I'm feeling good right now!
```

```
// Icon in the middle of the sentence
Jake: I found this [img items/key] in the kitchen.
```

```
// Portraits on both sides
Clara: [img clara/happy] Nice to meet you! [img items/flower]
```
