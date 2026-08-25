# Ink action syntax

Each `@InkCommand` declares how NarrativeCraft parses the values written after its tag keyword.

For this declaration:

```java
@InkCommand(
    keyword = "give_token",
    syntax = "give_token <target:string> [amount:int=1] [--silent]"
)
```

The story can use:

```ink
# give_token Alex amount:3 --silent
```

The syntax declaration uses `=` to define a default value. The runtime Ink tag uses `:` to pass a named value.

## Syntax forms

| Declaration | Kind | Runtime example |
|---|---|---|
| `<name:type>` | Required positional argument | `Alex` |
| `(name:type)` | Optional positional argument | `gold` |
| `[name:type=default]` | Optional named argument | `amount:3` |
| `[--name]` | Boolean flag | `--silent` |

Required arguments are read in their declared order. Optional positional arguments are read after all required positional arguments.

Positional arguments can also be passed by name, in any order. Named and unnamed values can be mixed: unnamed values fill the positional arguments that were not given by name, in declaration order.

```ink
# give_token Alex
# give_token target:Alex
```

Because names resolve `name:value` tokens, every argument name in a syntax declaration must be unique. A duplicate name throws an `IllegalArgumentException` when the syntax is compiled. Passing the same positional argument twice throws at parse time.

For example, an optional positional argument can follow the required ones:

```java
syntax = "announce <message:string> (channel:string) [duration:float=2.0] [--overlay]"
```

Valid tags include:

```ink
# announce "The gate is open"
# announce "The gate is open" actionbar
# announce "The gate is open" actionbar duration:4.5 --overlay
```

Double quotes keep text containing spaces in one argument. Named string values can also be quoted when their declaration is named:

```java
syntax = "announce <message:string> [audience:string=everyone]"
```

```ink
# announce "Welcome" audience:"village guards"
```

## Supported types

`ArgType` supports four values:

| Syntax name | Enum value | Java value |
|---|---|---|
| `string` | `ArgType.STRING` | `String` |
| `int` | `ArgType.INT` | `Integer` |
| `float` | `ArgType.FLOAT` | `Float` |
| `boolean` | `ArgType.BOOLEAN` | `Boolean` |

Invalid integers, floats, and booleans produce a descriptive validation error before the action executes.

A value containing an Ink expression is left untouched by the parser. `InkAction.VARIABLE_PATTERN` matches `{...}`, and `ArgType.parse()` returns the raw string when it matches:

```java
public static final Pattern VARIABLE_PATTERN = Pattern.compile("\\{([^}]*)}");
```

This is what lets `# give_token {chosen_target} amount:{reward}` pass compile-time validation without `{reward}` failing the `int` check. At runtime Ink substitutes the expression before the tag is dispatched, so `doValidate()` receives a real value and no addon code has to handle the raw form.

`ArgType` also exposes the parsing operations directly:

```java
ArgType type = ArgType.fromToken("float");
Object value = type.parse("2.5"); // Float
```

## Defaults

Named arguments may declare a default:

```java
[amount:int=1]
[speed:float=0.5]
[label:string=token]
[visible:boolean=true]
```

When no value is written, string, integer, and float arguments use `""`, `0`, and `0.0` respectively. Boolean named arguments must declare an explicit `true` or `false` default.

Flags never take a value:

```ink
# give_token Alex --silent
```

They are `false` when absent and `true` when present.

## Read parsed values

NarrativeCraft passes a `ParsedCommand` to `InkAction.doValidate()`:

```java
String target = command.getString("target");
int amount = command.getInt("amount");
float duration = command.getFloat("duration");
boolean visible = command.getBoolean("visible");
boolean silent = command.flag("silent");
```

The generic accessor returns the stored typed value:

```java
Float duration = command.get("duration");
```

Accessor behavior for a missing name is:

| Method | Missing value |
|---|---|
| `get()` | `null` |
| `getString()` | `null` |
| `getInt()` | `0` |
| `getFloat()` | `0.0f` |
| `getBoolean()` | `false` |
| `flag()` | `false` |

Named defaults are inserted during parsing, so their accessors normally return the declared default instead of a missing value.

## Parse syntax directly

NarrativeCraft compiles `@InkCommand.syntax()` during action registration. The same public parser can be used by addon tooling:

```java
CommandSpec spec = SyntaxParser.parse(
    "give_token",
    "give_token <target:string> [amount:int=1] [--silent]"
);

ParsedCommand command = spec.parse(
    List.of("Alex", "amount:3", "--silent")
);
```

`CommandSpec.parse()` receives tokens after the keyword has already been removed. It throws `IllegalArgumentException` for missing arguments, invalid values, unknown flags, or extra positional values.

## Argument definition records

The compiled syntax uses these public immutable records:

| Record | Components |
|---|---|
| `ArgDef` | `name`, `type` |
| `NamedArgDef` | `name`, `type`, `defaultValue` |
| `FlagDef` | `name` |

Their record accessors, such as `name()` and `type()`, return the declared values.

## Serialize parsed commands

`ParsedCommand` can preserve its values and flags as JSON:

```java
String json = command.toJson();
ParsedCommand restored = ParsedCommand.fromJson(json);
```

NarrativeCraft uses this format to transport client-side Ink actions. Addons usually do not need to serialize commands themselves, but the methods are available when an integration needs to preserve the same typed representation.

Continue with [Ink actions](/api/ink-actions) to use the parsed values during validation and execution.
