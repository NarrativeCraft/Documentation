# Ink Actions

Ink actions — это классы, привязанные к ключевому слову в Ink-теге (`# keyword:arg1:arg2`). Когда такое ключевое слово появляется в скрипте, действие создаётся и выполняется.

## Создание Ink action

Расширьте `InkAction` и аннотируйте его `@InkCommand`:

```java
@InkCommand(
    keyword = "teleport",
    description = "Teleports the player",
    syntax = "teleport <x:float> <y:float> <z:float>",
    side = Side.SERVER
)
public class TeleportAction extends InkAction {

    private float x, y, z;

    @Override
    protected InkActionResult doValidate(ParsedCommand command, IScene scene) {
        x = command.getFloat("x");
        y = command.getFloat("y");
        z = command.getFloat("z");
        return InkActionResult.ok();
    }

    @Override
    protected InkActionResult doExecute(IPlayerSession session) {
        session.getPlayer().teleportTo(x, y, z);
        return InkActionResult.ok();
    }
}
```

`doValidate` выполняется первым и получает разобранные аргументы. Читайте и сохраняйте всё, что нужно, там, потому что `doExecute` получает только сессию игрока.

## Чтение аргументов

Используйте типизированные геттеры на `ParsedCommand`:

```java
command.getString("name")    // String
command.getInt("count")      // int
command.getFloat("duration") // float
command.getBoolean("loop")   // boolean
command.flag("block")        // boolean, true если флаг присутствовал в теге
```

См. [Синтаксис](/ru/api/ink-syntax) для описания типов аргументов в `@InkCommand`.

## Ink actions на стороне клиента

Серверные действия выполняются на сервере, клиентские — на клиенте. Разделение делается через наследование, а не дублирование.

Начните с базового класса, где `doExecute` возвращает `InkActionResult.ignored()` — это то, что видит сервер:

```java
@InkCommand(
    keyword = "shake",
    syntax = "shake <amplitude:float>",
    side = Side.CLIENT
)
public class ShakeAction extends InkAction {

    protected float amplitude;

    @Override
    protected InkActionResult doValidate(ParsedCommand command, IScene scene) {
        amplitude = command.getFloat("amplitude");
        return InkActionResult.ok();
    }

    @Override
    protected InkActionResult doExecute(IPlayerSession session) {
        return InkActionResult.ignored();
    }
}
```

Затем создайте подкласс с префиксом `Client`, переопределяющий `doExecute` с реальной клиентской логикой:

```java
public class ClientShakeAction extends ShakeAction {

    @Override
    protected InkActionResult doExecute(IPlayerSession session) {
        // клиентская логика дрожания экрана
        return InkActionResult.ok();
    }
}
```

## Регистрация

Зарегистрируйте оба класса через ваш `AddonContext`:

```java
ctx.registerInkAction(ShakeAction.class, ShakeAction::new);
ctx.registerInkAction(ClientShakeAction.class, ClientShakeAction::new);
```

## Многотиковые действия

Если ваше действие выполняется несколько тиков, переопределите соответствующие методы жизненного цикла:

```java
@Override
public void tick() {
    // вызывается каждый серверный тик, пока isRunning
}

@Override
public void partialTick(float partialTick) {
    // вызывается каждый кадр на клиенте
}

@Override
public void render(GuiGraphicsExtractor graphics, float partialTick) {
    // отрисовка на клиенте
}

@Override
public void stop() {
    // очистка при завершении действия
}
```

Установите `blocking = true` в `doValidate`, если действие должно приостанавливать Ink-скрипт до завершения.

## InkActionResult

Возвращается методами `doValidate` и `doExecute`:

```java
InkActionResult.ok()           // успех
InkActionResult.ignored()      // эта сторона не обрабатывает
InkActionResult.block()        // приостанавливает очередь действий
InkActionResult.error("msg")   // ошибка валидации или выполнения
InkActionResult.warn("msg")    // нефатальное предупреждение
```

## InkActionUtil

```java
// преобразует время (например 2.5, "minute") в секунды
double seconds = InkActionUtil.getSecondsFromTimeValue(2.5, "minute");

// заменяет %variable% на значения из Ink-сюжета
String resolved = InkActionUtil.parseVariables(story, "Hello %player_name%!");
```
