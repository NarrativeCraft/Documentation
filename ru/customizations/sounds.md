# Звуки

NarrativeCraft включает стандартные звуки для текста диалога и появления выбора.

Чтобы переопределить их, поместите ваши `.ogg` файлы по следующим путям в вашем ресурс-паке:

- **Звук диалога**: `narrativecraft/assets/sounds/sfx/dialog_sound.ogg`

```json
"sfx.dialog_sound": {
  "category": "master",
  "sounds": ["narrativecraft:sfx/dialog_sound"]
}
```

- **Звук появления выбора**: `narrativecraft/assets/sounds/sfx/choice_appear.ogg`

```json
"sfx.choice_appear": {
  "category": "master",
  "sounds": ["narrativecraft:sfx/choice_appear"]
}
```

Поместите JSON-запись в `narrativecraft/assets/sounds.json`
