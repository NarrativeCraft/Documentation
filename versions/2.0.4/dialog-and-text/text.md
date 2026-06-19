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

```ink
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