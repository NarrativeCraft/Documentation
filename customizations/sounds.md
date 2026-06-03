# Sounds

NarrativeCraft includes default sounds for dialog text and choice appear.

To override them, place your `.ogg` files in the following paths within your resource pack:

- **Dialog sound**: `narrativecraft/assets/sounds/sfx/dialog_sound.ogg`

```json
"sfx.dialog_sound": {
  "category": "master",
  "sounds": ["narrativecraft:sfx/dialog_sound"]
}
```

- **Choice appear sound**: `narrativecraft/assets/sounds/sfx/choice_appear.ogg`

```json
"sfx.choice_appear": {
  "category": "master",
  "sounds": ["narrativecraft:sfx/choice_appear"]
}
```

Put the JSON entry in `narrativecraft/assets/sounds.json`