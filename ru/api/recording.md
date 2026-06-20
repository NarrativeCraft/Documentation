# Запись

Система записи захватывает действия сущностей как бинарно-сериализуемые записи. Можно регистрировать кастомные типы действий, чтобы ваши данные корректно захватывались и воспроизводились.

## Создание кастомного действия

Расширьте `AbstractAction` и реализуйте `getId`, `write` и `read`:

```java
public class MyAction extends AbstractAction {

    public static final String ID = "my_action";

    private float myValue;

    public MyAction(int tick) {
        super(tick);
    }

    @Override
    public String getId() { return ID; }

    @Override
    public void write(Action.Writer writer) throws IOException {
        writer.addFloat(myValue);
    }

    @Override
    public void read(Action.Reader reader) throws IOException {
        myValue = reader.readFloat();
    }

    @Override
    public ActionResult execute(IPlaybackContext ctx, IPlaybackSession session) {
        // применить myValue во время воспроизведения
        return ActionResult.SUCCESS;
    }
}
```

`write` и `read` должны быть симметричны — порядок записи должен точно соответствовать порядку чтения.

## Дедупликация и перемотка

Переопределите `differs`, чтобы избежать записи одинаковых последовательных кадров:

```java
@Override
public boolean differs(AbstractAction other) {
   if (!(other instanceof MyAction that)) {
        return false;
    }
    return Float.compare(myValue, that.myValue) != 0;
}
```

Переопределите `createRewindSnapshot` и `shouldExecuteOnRewind`, если действие должно участвовать в перемотке для катсцен:

```java
@Override
public boolean shouldExecuteOnRewind() { return true; }
```

## Регистрация

```java
ctx.registerRecordingAction(MyAction.ID, MyAction::new);
```

Переданный id должен совпадать с `getId()` вашего класса действия.
