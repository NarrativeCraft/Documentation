# Syntax

The syntax system parses the `syntax` attribute of `@InkCommand` into a typed spec used to validate and read tag arguments.

## Syntax grammar

| Format | Kind | Description |
|---|---|---|
| `<name:type>` | Required positional | Must be provided, in order |
| `(name:type)` | Optional positional | Can be omitted |
| `[name:type=default]` | Named optional | Passed as `name=value` |
| `[--flagname]` | Boolean flag | Present = `true`, absent = `false` |

**Available types (`ArgType`):** `STRING`, `INT`, `FLOAT`, `BOOLEAN`

Example:

```
"shake <amplitude:float> [duration:float=1.0] [--loop]"
```

## SyntaxParser

```java
CommandSpec spec = SyntaxParser.parse(keyword, syntaxDeclaration);
```

## CommandSpec

Compiled representation of a syntax declaration. Parse a list of tokens against it:

```java
ParsedCommand command = spec.parse(tokens);
```

## ParsedCommand

Typed snapshot of a parsed command. Passed to `doValidate` - store it as a field to use it in `doExecute`. See [Reading arguments](/api/ink-actions#reading-arguments).

## Argument definition records

| Record | Fields | Represents |
|---|---|---|
| `ArgDef` | `name, ArgType` | Required positional |
| `NamedArgDef` | `name, ArgType, defaultValue` | Named optional |
| `FlagDef` | `name` | Boolean flag |
