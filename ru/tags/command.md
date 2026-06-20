# Command

Выполняет обычную команду Minecraft с полными правами оператора. Команда запускается от имени игрока, но проверки прав пропускаются. `@p` автоматически заменяется на имя игрока. Фигурные скобки нужно экранировать как `\{` и `\}`.

## Сторона
SERVER

## Синтаксис

```
command <commandValue:string>
```

## Параметры

- `commandValue` *(string, обязательный)*: Команда Minecraft для выполнения без ведущего `/`.

## Примеры

```ink
// Выдать игроку алмазный меч
# command "give @p diamond_sword 1"
```

```ink
// Выдать кастомное достижение
# command "advancement grant @p only mymod:secret_found"
```

```ink
// Показать заголовок на экране
# command "title @p title \{\"text\":\"Chapter 2\",\"bold\":true\}"
```
