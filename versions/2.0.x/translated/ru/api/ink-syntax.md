# Синтаксис

Система синтаксиса разбирает атрибут `syntax` аннотации `@InkCommand` в типизированную спецификацию, используемую для валидации и чтения аргументов тега.

## Грамматика синтаксиса

| Формат | Тип | Описание |
|---|---|---|
| `<name:type>` | Обязательный позиционный | Должен быть указан, по порядку |
| `(name:type)` | Необязательный позиционный | Можно опустить |
| `[name:type=default]` | Именованный необязательный | Передаётся как `name=value` |
| `[--flagname]` | Булев флаг | Присутствует = `true`, отсутствует = `false` |

**Доступные типы (`ArgType`):** `STRING`, `INT`, `FLOAT`, `BOOLEAN`

Пример:

```
"shake <amplitude:float> [duration:float=1.0] [--loop]"
```

## SyntaxParser

```java
CommandSpec spec = SyntaxParser.parse(keyword, syntaxDeclaration);
```

## CommandSpec

Скомпилированное представление объявления синтаксиса. Разбирает список токенов по нему:

```java
ParsedCommand command = spec.parse(tokens);
```

## ParsedCommand

Типизированный снимок разобранной команды. Передаётся в `doValidate`, сохраните его как поле для использования в `doExecute`. См. [Чтение аргументов](/ru/api/ink-actions#чтение-аргументов).

## Определения аргументов

| Запись | Поля | Представляет |
|---|---|---|
| `ArgDef` | `name, ArgType` | Обязательный позиционный |
| `NamedArgDef` | `name, ArgType, defaultValue` | Именованный необязательный |
| `FlagDef` | `name` | Булев флаг |
