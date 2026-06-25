# Написание сюжета

Теперь напишем сюжет!

::: warning
Предполагается, что вы уже знаете основы Ink. Если нет, прочтите [предварительные требования](/ru/introduction/prerequisites.md).
:::

Откройте [Inky](https://github.com/inkle/inky/releases), нажмите `File` в левом верхнем углу и выберите `Open...`.

Перейдите в папку вашего мира, затем в `narrativecraft` и откройте `main.ink`.

Вы увидите ошибку в верхней части: «Expected at least one line within the knot but saw end of line».

Это нормально. Когда вы создаёте главу и её сцены, в Inky нужно вручную написать knot.

Перейдите в `chapter_1.ink` и напишите `-> chapter_1_scene_one`.

Это будет выглядеть так:

```ink
=== chapter_1 ===
-> chapter_1_scene_one
```

Затем перейдите в `scene_one.ink`, вы увидите:

```ink
=== chapter_1_scene_one ===
# on_enter
-> END
```

Видите `# on_enter`? **Не удаляйте его**. Он должен быть здесь для корректного переключения сцен.

Итак, что мы будем делать:

- Воспроизведём `scene one`
- Воспроизведём катсцену `walk cut`
- Вызовем ракурс `steve_view`
- Затем заставим их говорить
- После разговора вызовем взаимодействие `my interaction` и перейдём в режим геймплея

Это будет выглядеть так:

```ink
=== chapter_1_scene_one ===
# on_enter
# cutscene "walk cut" // Воспроизвести катсцену
# camera "end walk" steve_view // После катсцены включить ракурс steve_view из end walk
Steve: hey! how are you?
# camera "end walk" alex_view
Alex: I'm great, thanks for asking
# camera "end walk" both_view
Steve: Nice, let's explore the area!
# interaction start "my interaction" // После разговора запустить взаимодействие «my interaction»
# gameplay // Перейти в режим геймплея, чтобы сюжет не закончился сразу
-> END
```

Это очень простой скрипт. Он создаст персонажей, заставит их говорить, и вы сможете продолжить игру.

В этом скрипте есть команды, начинающиеся с `#`. Они называются **тегами**.

Тег, это кастомная команда, которую NarrativeCraft интерпретирует и выполняет в Minecraft.

Например:

```
# cutscene "walk cut"
```

Запускает катсцену «walk cut» из главы 1 сцены 1.

## Смена сцены

Чтобы сменить сцену, нужно вызвать knot, с которого хотите продолжить.

Например, после сцены 1 игрок должен начать сцену 2:

```ink{10}
=== chapter_1_scene_one ===
# on_enter
# cutscene "walk cut"
# camera "end walk" steve_view
Steve: hey! how are you?
# camera "end walk" alex_view
Alex: I'm great, thanks for asking
# camera "end walk" both_view
Steve: Nice, let's explore the area!
-> chapter_1_scene_two
```

## Взаимодействия

Ранее мы определили переходы `my_zone` и `my_point`.

Чтобы они выполнялись при взаимодействии игрока, нужно определить эти переходы в скрипте:

```ink
= my_zone
I entered a zone!
# gameplay
-> DONE

= my_point
I clicked the point! yay!
# gameplay
-> DONE
```

Если игрок войдёт в `zone1` из взаимодействия, выполнится переход `my_zone`.
Если игрок нажмёт на `point1` из взаимодействия, выполнится переход `my_point`.

Тег `gameplay` используется здесь, чтобы сохранить состояние геймплея. Иначе сюжет завершится!

## Теги

Есть два типа тегов:
- Обычные, выполняются, и сюжет продолжается
- Блокирующие, останавливают выполнение сюжета и ждут завершения тега, прежде чем продолжить

[cutscene](/ru/tags/cutscene), блокирующий тег. Он ждёт завершения катсцены, прежде чем продолжить сюжет.

Когда скрипт готов, сохраните его (`CTRL + S`) и вернитесь в игру. Выполните `/nc story reload`. Он скомпилирует сюжет и проверит теги и сам сюжет. Если всё хорошо, сюжет скомпилируется успешно. Если есть ошибки, компиляция не удастся, и вам укажут точное место ошибки.
