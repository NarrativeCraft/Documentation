# NarrativeCraft API — Compte rendu pour documentation

> Ce document est destiné à servir de base pour la rédaction d'une documentation complète de l'API du mod NarrativeCraft. Il décrit exhaustivement chaque classe, interface, enum et annotation publique exposée par le module `api`.

---

## Vue d'ensemble

NarrativeCraft est un mod Minecraft permettant de créer des narrations interactives. Son API (module `api`) permet à d'autres mods de s'intégrer avec les systèmes suivants :

- **Système d'événements** — bus pub/sub typé avec 26 événements couvrant tout le cycle de vie
- **Cutscenes** — timeline animée avec couches et keyframes interpolées
- **Dialogues** — effets visuels sur le texte
- **Actions Ink** — commandes embarquées dans les tags du langage Ink, extensibles
- **Enregistrement/Playback** — actions binaires sérialisables avec support du rewind
- **Gestion de stories** — chapitres, scènes, interactions
- **Sessions joueur** — contexte d'exécution par joueur

Toutes les dépendances partent du singleton `NarrativeCraftAPI`, accessible via `NarrativeCraftAPI.getInstance()`.

---

## Structure des packages

```
fr.loudo.narrativecraft.api
├── NarrativeCraftAPI.java              ← point d'entrée (singleton)
├── dialog/                             ← dialogues et effets texte
├── editors/                            ← registres d'éditeurs
│   └── cutscene/
│       ├── keyframes/                  ← keyframes, menus, interpolation
│       └── layers/                     ← couches de cutscene
├── events/                             ← bus d'événements + 26 event records
├── inkAction/                          ← actions Ink et parsing de syntaxe
│   └── syntax/
├── managers/                           ← gestionnaires exposés
├── narrative/                          ← modèles de données narratifs
│   ├── chapter/
│   ├── character/
│   ├── cutscene/
│   ├── interaction/
│   └── scene/
├── playback/                           ← session de playback
├── recording/                          ← enregistrement + actions
│   └── action/
└── session/                            ← session joueur
```

---

## 1. Point d'entrée — `NarrativeCraftAPI`

**Package :** `fr.loudo.narrativecraft.api`  
**Pattern :** Singleton

C'est l'unique façade vers tous les sous-systèmes. On y accède via :

```java
NarrativeCraftAPI api = NarrativeCraftAPI.getInstance();
```

### Champs

| Champ | Type | Rôle |
|---|---|---|
| `INSTANCE` | `NarrativeCraftAPI` | Singleton statique |
| `modId` | `String` | ID du mod hôte |
| `actionRegistry` | `IActionRegistry` | Registre des types d'actions de playback |
| `cutsceneLayerRegistry` | `ICutsceneLayerRegistry` | Registre des types de couches de cutscene |
| `textEffectRegistry` | `ITextEffectRegistry` | Registre des effets de texte pour les dialogues |
| `storyHandlerManager` | `IStoryHandlerManager` | Gestionnaire du cycle de vie des stories |
| `eventBus` | `IEventBus` | Bus d'événements |
| `recordingManager` | `IRecordingManager` | Accès aux enregistrements actifs |
| `inkTagDispatcher` | `InkTagDispatcher` | Registre des actions Ink |

### Méthodes

```java
NarrativeCraftAPI.getInstance()               // accès au singleton
api.getActionRegistry()                       // IActionRegistry
api.getCutsceneLayerRegistry()                // ICutsceneLayerRegistry
api.getTextEffectRegistry()                   // ITextEffectRegistry
api.getStoryHandlerManager()                  // IStoryHandlerManager
api.getEventBus()                             // IEventBus
api.getRecordingManager()                     // IRecordingManager
api.getInkTagDispatcher()                     // InkTagDispatcher
api.getModId()                                // String
```

---

## 2. Système d'événements — package `events`

### `Event` (interface marqueur)

Toutes les classes d'événements implémentent cette interface vide. Le bus est générique, il n'est donc jamais nécessaire de caster.

### `EventListener<E extends Event>` (interface fonctionnelle)

```java
@FunctionalInterface
public interface EventListener<E extends Event> {
    void handle(E event);
}
```

Peut s'écrire sous forme de lambda.

### `IEventBus`

```java
eventBus.register(SomeEvent.class, event -> { /* handler */ });
eventBus.unregister(SomeEvent.class, listenerRef);
```

### Liste des 26 événements

Tous sont des **records Java** immuables.

#### Cycle de vie des sessions

| Record | Champs | Déclenchement |
|---|---|---|
| `PlayerSessionStartEvent` | `IPlayerSession session` | Démarrage d'une session joueur |
| `PlayerSessionEndEvent` | `IPlayerSession session` | Fin d'une session joueur |
| `StoryStartEvent` | `IPlayerSession session` | Début d'une story |
| `StoryEndEvent` | `IPlayerSession session` | Fin d'une story |
| `SceneEndEvent` | `IPlayerSession session, IScene scene` | Fin d'une scène |
| `ChapterSceneStartEvent` | `IPlayerSession session, IChapter chapter, IScene scene` | Début d'une scène dans un chapitre |
| `ChapterSceneChangeEvent` | `IPlayerSession session, IChapter chapter, IScene scene` | Changement de scène dans un chapitre |

#### Personnages

| Record | Champs | Déclenchement |
|---|---|---|
| `CharacterSpawnEvent` | `ICharacterStory character, IScene scene` | Apparition d'un personnage |
| `CharacterDespawnEvent` | `ICharacterStory character, IScene scene` | Disparition d'un personnage |

#### Cutscenes

| Record | Champs | Déclenchement |
|---|---|---|
| `CutsceneStartEvent` | `IPlayerSession session, ICutscene cutscene` | Début d'une cutscene |
| `CutsceneEndEvent` | `IPlayerSession session, ICutscene cutscene` | Fin d'une cutscene |

#### Dialogues

| Record | Champs | Déclenchement |
|---|---|---|
| `DialogStartEvent` | `IPlayerSession session, String speakerName, String text` | Début d'un dialogue |
| `DialogEndEvent` | `IPlayerSession session` | Fin d'un dialogue |
| `DialogChoiceEvent` | `IPlayerSession session, List<String> choices, int selectedIndex` | Choix effectué |

#### Interactions

| Record | Champs | Déclenchement |
|---|---|---|
| `InteractionTriggerEvent` | `IPlayerSession session, IInteraction interaction` | Déclenchement d'une interaction |
| `InteractionZoneEnterEvent` | `ServerPlayer player, IInteractionZone zone` | Joueur entre dans une zone |
| `InteractionZoneLeaveEvent` | `ServerPlayer player, IInteractionZone zone` | Joueur quitte une zone |

#### Actions Ink

| Record | Champs | Déclenchement |
|---|---|---|
| `InkActionStopEvent` | `IPlayerSession session, String actionKeyword` | Arrêt d'une action Ink |
| `InkTagProcessedEvent` | `IPlayerSession session, String keyword, String rawTag` | Tag Ink traité |

#### Enregistrement

| Record | Champs | Déclenchement |
|---|---|---|
| `RecordingStartEvent` | `ServerPlayer player, IRecording recording` | Démarrage d'un enregistrement |
| `RecordingStopEvent` | `ServerPlayer player, IRecording recording` | Arrêt d'un enregistrement |
| `RecordingSaveEvent` | `ServerPlayer player, IRecording recording, String recordingName` | Sauvegarde d'un enregistrement |

#### Playback

| Record | Champs | Déclenchement |
|---|---|---|
| `PlaybackStartEvent` | `IPlaybackSession playback` | Début du playback |
| `PlaybackEndEvent` | `IPlaybackSession playback` | Fin du playback |
| `PlaybackPauseEvent` | `IPlaybackSession playback` | Pause du playback |
| `PlaybackResumeEvent` | `IPlaybackSession playback` | Reprise du playback |

---

## 3. Actions Ink — package `inkAction`

Le système d'actions Ink permet d'associer un mot-clé à une classe qui sera exécutée quand ce mot-clé apparaît dans un tag du script Ink (`# keyword:arg1:arg2`).

### `@InkCommand` (annotation)

Doit décorer chaque classe d'action Ink.

```java
@InkCommand(
    keyword = "wait",
    description = "Attend N secondes",
    syntax = "wait <duration:float> [unit:string=s]",
    side = Side.SERVER   // SERVER (défaut) ou CLIENT
)
public class WaitAction extends InkAction { ... }
```

| Attribut | Type | Obligatoire | Rôle |
|---|---|---|---|
| `keyword` | `String` | Oui | Mot-clé du tag Ink |
| `description` | `String` | Non | Documentation courte |
| `syntax` | `String` | Non | Déclaration de syntaxe (voir SyntaxParser) |
| `side` | `Side` | Non | `SERVER` ou `CLIENT`, défaut `SERVER` |

### `Side` (enum)

- `SERVER` — l'action s'exécute côté serveur
- `CLIENT` — l'action s'exécute côté client

### `InkAction` (classe abstraite)

Classe de base à étendre pour créer une action personnalisée.

**Champs protégés disponibles :**

| Champ | Type | Description |
|---|---|---|
| `instanceId` | `long` | Identifiant unique de l'instance |
| `canBeExecuted` | `boolean` | Indique si l'action peut s'exécuter |
| `isRunning` | `boolean` | Vrai pendant l'exécution |
| `blocking` | `boolean` | Si `true`, bloque la queue d'actions |
| `tick` | `int` | Tick courant de l'action |
| `totalTick` | `int` | Durée totale planifiée |

**Méthodes à implémenter :**

```java
// Valide la syntaxe et la cohérence avant exécution
protected abstract InkActionResult doValidate(ParsedCommand command, IScene scene);

// Exécute l'action dans la session donnée
protected abstract InkActionResult doExecute(IPlayerSession session);
```

**Méthodes de cycle de vie (optionnelles à surcharger) :**

```java
public void tick() { }
public void partialTick(float partialTick) { }
public void render(GuiGraphicsExtractor graphics, float partialTick) { }
public void render(PoseStack poseStack, float partialTick) { }
public void stop() { }
```

**Méthodes utilitaires :**

```java
action.getKeyword()       // lit depuis @InkCommand
action.getSide()          // lit depuis @InkCommand
action.isRunning()
action.isBlocking()
action.getInstanceId()
```

### `InkActionResult` (record)

Retourné par `doValidate` et `doExecute`.

```java
// Fabriques statiques
InkActionResult.ok()
InkActionResult.ignored()
InkActionResult.block()           // met en pause la queue
InkActionResult.error("message")
InkActionResult.warn("message")
```

**Status possibles :**

| Status | Signification |
|---|---|
| `OK` | Succès |
| `IGNORED` | Action ignorée sans erreur |
| `BLOCK` | Met en pause la queue d'actions |
| `ERROR` | Erreur bloquante |
| `WARN` | Avertissement non bloquant |

### `InkTagDispatcher` (interface)

Sert à enregistrer une action Ink dans le système.

```java
InkTagDispatcher dispatcher = NarrativeCraftAPI.getInstance().getInkTagDispatcher();
dispatcher.register(WaitAction.class, WaitAction::new);
```

### `InkActionUtil` (classe utilitaire)

```java
// Convertit une valeur temporelle (ex: 2.5, "m") en secondes
double seconds = InkActionUtil.getSecondsFromTimeValue(2.5, "m");

// Remplace %variable% par leur valeur dans une Story Ink
String resolved = InkActionUtil.parseVariables(story, "Hello %player_name%!");
```

---

## 4. Syntaxe des actions Ink — package `inkAction.syntax`

Ce sous-système gère le parsing des déclarations de syntaxe définies dans `@InkCommand(syntax = "...")`.

### Grammaire de la syntaxe

| Format | Type | Description |
|---|---|---|
| `<name:type>` | Argument positionnel requis | Doit être fourni, dans l'ordre |
| `(name:type)` | Argument positionnel optionnel | Peut être omis |
| `[name:type=default]` | Argument nommé optionnel | Passé sous forme `name=valeur` |
| `[--flagname]` | Flag booléen | Présence = `true`, absence = `false` |

**Types disponibles (`ArgType`) :** `STRING`, `INT`, `FLOAT`, `BOOLEAN`

### `ArgDef` (record)

```java
record ArgDef(String name, ArgType type)
```

Représente un argument positionnel requis.

### `NamedArgDef` (record)

```java
record NamedArgDef(String name, ArgType type, Object defaultValue)
```

Représente un argument nommé optionnel avec valeur par défaut.

### `FlagDef` (record)

```java
record FlagDef(String name)
```

Représente un flag booléen (`[--name]`).

### `CommandSpec` (classe finale)

Spec compilée d'une déclaration de syntaxe. Produite par `SyntaxParser`.

```java
CommandSpec spec = SyntaxParser.parse("wait", "wait <duration:float> [unit:string=s]");
ParsedCommand command = spec.parse(tokens);
```

### `ParsedCommand` (classe finale)

Snapshot typé et validé d'une commande parsée. Transmis à `doValidate` et `doExecute`.

```java
float duration = command.getFloat("duration");
String unit    = command.getString("unit");
boolean fast   = command.flag("fast");
int count      = command.getInt("count");

// Sérialisation pour le réseau
String json    = command.toJson();
ParsedCommand  = ParsedCommand.fromJson(json);
```

**Méthodes disponibles :**

| Méthode | Retour |
|---|---|
| `get(name)` | `Object` (générique) |
| `getString(name)` | `String` |
| `getInt(name)` | `int` |
| `getFloat(name)` | `float` |
| `getBoolean(name)` | `boolean` |
| `flag(name)` | `boolean` |
| `toJson()` | `String` |
| `fromJson(json)` | `ParsedCommand` (static) |

### `SyntaxParser` (classe utilitaire finale)

```java
CommandSpec spec = SyntaxParser.parse(keyword, syntaxDeclaration);
```

Expressions régulières utilisées en interne :

| Pattern | Format reconnu |
|---|---|
| `<(\w+):(\w+)>` | Argument requis |
| `\((\w+):(\w+)\)` | Argument optionnel positionnel |
| `\[(\w+):(\w+)(?:=([^\]]*))?]` | Argument nommé optionnel |
| `\[--(\\w+)]` | Flag |

---

## 5. Cutscenes — packages `editors` et `editors.cutscene`

### `ICutsceneLayerRegistry`

Registre des types de couches disponibles dans l'éditeur de cutscenes.

```java
ICutsceneLayerRegistry registry = NarrativeCraftAPI.getInstance().getCutsceneLayerRegistry();
registry.register(myLayerType);
registry.unregister("my-layer-id");
ICutsceneLayerType type = registry.getType("my-layer-id");
List<ICutsceneLayerType> all = registry.getTypes();
```

### `ICutsceneLayerType`

Factory et descripteur pour un type de couche.

```java
public interface ICutsceneLayerType {
    String getId();           // identifiant unique, ex: "camera"
    String getName();         // nom affiché dans l'UI
    ICutsceneLayer createLayer();  // factory
}
```

### `ICutsceneLayer`

Instance d'une couche sur la timeline.

```java
public interface ICutsceneLayer {
    String getTypeId();
    ICutsceneLayerType getType();
    boolean execute(float tick);  // true si géré
}
```

### `CutsceneLayer` (classe abstraite)

Classe de base à étendre pour implémenter une couche de cutscene personnalisée.

**Méthode abstraite :**

```java
public abstract Keyframe createDefaultKeyframe(int tick);
```

**Méthodes publiques :**

```java
layer.addKeyframe(keyframe);
layer.removeKeyframe(keyframe);
layer.getKeyframes();         // List<Keyframe>
layer.getType();
layer.getSortIndex();
layer.setSortIndex(int);
```

**Méthodes protégées utiles :**

```java
// Retourne les keyframes triés, filtrés par sous-type
List<K> sorted = getSortedKeyframes(MyKeyframe.class);

// Trouve le segment entre deux keyframes qui encadre le tick
KeyframeSegment<K> seg = findSegment(sortedList, tick);

// Tests
boolean covered = isTickCoveredBy(tick);
boolean exact   = isExactTick(tick);
```

---

## 6. Keyframes — package `editors.cutscene.keyframes`

### `EasingType` (enum)

| Valeur | Interpolation |
|---|---|
| `LINEAR` | Linéaire |
| `EASE_IN` | Accélération |
| `EASE_OUT` | Décélération |
| `SMOOTH` | Ease in+out |

### `Interpolation` (classe utilitaire finale)

```java
// Applique une courbe d'easing sur t ∈ [0, 1]
double t2 = Interpolation.applyEasing(EasingType.SMOOTH, t);

// Lerp standard
double v = Interpolation.lerp(a, b, t);

// Lerp angulaire (gère le wrap 0°–360°)
double angle = Interpolation.lerpAngle(fromDeg, toDeg, t);

// Interpolation Catmull-Rom (4 points de contrôle)
double v = Interpolation.catmullRom(p0, p1, p2, p3, t);
```

### `Keyframe` (classe abstraite)

Keyframe de base. Gère la position dans l'éditeur et la sélection.

**Champs protégés :**

| Champ | Type |
|---|---|
| `x, y` | `int` (position dans l'UI) |
| `tick` | `int` (position temporelle) |
| `isSelected` | `boolean` |
| `layer` | `CutsceneLayer` |

**Constantes :**

```java
Keyframe.SIZE                  // int = 7 (taille visuelle)
Keyframe.KEYFRAME_SPRITE       // Identifier
Keyframe.KEYFRAME_SELECTED_SPRITE
```

**Méthode abstraite :**

```java
public abstract KeyframeMenu<?> createMenu();
```

**Méthodes publiques :**

```java
keyframe.getTick() / setTick(int)
keyframe.getX() / setX(int)
keyframe.getY() / setY(int)
keyframe.isSelected() / setSelected(boolean)
keyframe.getLayer()
keyframe.isHovered(mouseX, mouseY)
keyframe.setLayerPosition(x, y)

// Méthodes de rendu/interaction (appelées par l'éditeur)
keyframe.click(event, bool)
keyframe.drag(delta, mouseX, mouseY, width)
keyframe.render(graphics, deltaTracker)
```

### `KeyframeMenu<T extends Keyframe>` (classe abstraite)

UI contextuelle popup pour éditer les propriétés d'un keyframe.

**Méthodes abstraites à implémenter :**

```java
public abstract int getContentHeight();
public abstract void renderContent(GuiGraphicsExtractor, DeltaTracker, x, y, w, h, mouseY);
public abstract void applyChanges();
public abstract void initContent();
```

**Méthodes publiques :**

```java
menu.render(graphics, deltaTracker, mouseX, mouseY)
menu.mouseClicked(event, bool)    // boolean: consommé ou non
menu.mouseDragged(event, dx, dy)
menu.mouseScrolled(delta)
menu.charTyped(event)
menu.keyPressed(event)
menu.isVisible()
menu.close()
```

**Constantes :**

```java
KeyframeMenu.WIDTH          // 110
KeyframeMenu.PADDING        // 5
KeyframeMenu.BUTTON_HEIGHT  // 14
KeyframeMenu.BUTTON_WIDTH   // 50
KeyframeMenu.BACKGROUND_COLOR
```

### `KeyframeSegment<K extends Keyframe>` (record)

```java
record KeyframeSegment<K extends Keyframe>(
    K from,    // keyframe de départ
    K to,      // keyframe d'arrivée
    K p0,      // point de contrôle avant `from` (Catmull-Rom)
    K p3,      // point de contrôle après `to` (Catmull-Rom)
    double rawT  // t normalisé ∈ [0,1] dans le segment
)
```

Utilisé par `CutsceneLayer.findSegment(...)` pour interpoler entre deux keyframes.

---

## 7. Dialogues et effets de texte — package `dialog`

### `ITextEffect`

Interface à implémenter pour créer un effet visuel sur les lettres d'un dialogue.

```java
public interface ITextEffect {
    /**
     * @param letterIndex index de la lettre dans le texte
     * @param tick        tick courant (long)
     * @param partialTick fraction du tick courant
     * @param params      paramètres nommés depuis le tag Ink
     * @return décalage (x, y) à appliquer à la position de la lettre
     */
    Vec2 apply(int letterIndex, long tick, float partialTick, Map<String, String> params);
}
```

### `ITextEffectRegistry`

```java
ITextEffectRegistry registry = NarrativeCraftAPI.getInstance().getTextEffectRegistry();
registry.register("wave", new WaveEffect());
registry.unregister("wave");
ITextEffect effect = registry.get("wave");
List<String> names = registry.getNames();
```

### `IDialogPresetProvider`

Interface pour fournir des présets de dialogues à l'éditeur.

```java
public interface IDialogPresetProvider {
    void providePresets(IDialogPresetConsumer consumer);

    interface IDialogPresetConsumer {
        void registerPreset(String name, Object preset);
    }
}
```

---

## 8. Narratif — package `narrative`

Ces interfaces représentent les entités narratives du mod. Elles sont passées dans les événements et les sessions.

### `IScene`

```java
UUID    scene.getId()
String  scene.getName()
IChapter scene.getChapter()
```

### `IChapter`

```java
UUID    chapter.getId()
String  chapter.getName()
```

### `ICharacterStory`

```java
UUID    character.getId()
String  character.getName()
```

### `ICutscene`

```java
UUID    cutscene.getId()
String  cutscene.getName()
IScene  cutscene.getScene()
```

### `IInteraction`

```java
UUID    interaction.getId()
String  interaction.getName()
IScene  interaction.getScene()
```

### `IInteractionZone`

Zone physique dans le monde qui déclenche automatiquement un stitch Ink quand un joueur y entre.

```java
UUID    zone.getId()
String  zone.getName()
String  zone.getStitchName()   // nom du nœud Ink à exécuter
```

---

## 9. Gestion de stories — package `narrative` + `session`

### `IStoryHandlerManager`

Gère le démarrage et l'arrêt des stories.

```java
IStoryHandlerManager manager = NarrativeCraftAPI.getInstance().getStoryHandlerManager();

manager.start(playerSession);                     // démarre depuis la session
manager.start("knotName", playerSession); // démarre un fichier précis
manager.stop(playerSession);
```

### `IStoryHandler`

Contrôle une story en cours d'exécution. Obtenu via `session.getStoryHandler()`.

```java
handler.start("knotName")              // démarre au nœud Ink donné (throws Exception)
handler.stop()
handler.onChoiceSelected(index)        // transmet le choix sélectionné
handler.onTagsDrained()                // signale que tous les tags ont été traités
handler.playStitch("stitchName")       // exécute un stitch

handler.getPlayerSession()             // IPlayerSession associée
handler.isEnded()                      // booléen
handler.getMainCharacterEntity()       // Entity
handler.finish()
handler.getCharacterEntities()         // Map<String, Entity>
handler.getLastCharacterSpoke()        // String
handler.getInteractionIds()            // Set<UUID>
handler.hasAlreadyInteracted(uuid)
handler.addInteractionId(uuid)
handler.hasFinishedStory()
handler.setFinishedStory(boolean)
```

### `IPlayerSession`

Contexte d'un joueur en cours de session narrative.

```java
session.getPlayer()                    // ServerPlayer
session.isGameplayMode()
session.setGameplayMode(boolean)
session.isClientSide()
session.getActiveClientInkActions()    // List<InkAction> (actions bloquantes client actives)
session.getStoryHandler()              // IStoryHandler
```

---

## 10. Enregistrement — packages `recording` et `recording.action`

### `IRecordingManager`

Accède aux enregistrements depuis n'importe quel contexte.

```java
IRecordingManager manager = NarrativeCraftAPI.getInstance().getRecordingManager();

manager.getById(uuid)                    // IRecording par UUID
manager.isRecording(player)             // boolean
manager.getRecording(player)            // IRecording du joueur
manager.getRecording(entity)            // IRecording d'une entité
manager.getRecordingEntityData(entity)  // IRecordingEntityData
```

### `IRecording`

Enregistrement actif. Permet d'ajouter des actions et de contrôler l'enregistrement.

```java
recording.addAction(action, entity)
recording.markEntityAsTracked(entity)   // retourne le recording ID (int) ou -1
recording.start()
recording.stop()
recording.getRecordingEntityData(entity)
recording.getTick()
recording.isRecording()
```

### `IRecordingEntityData`

Données d'une entité dans le contexte d'un enregistrement.

```java
entityData.addAction(action)
entityData.markAsTracked()             // retourne le recording ID
entityData.getRecording()              // IRecording parent
entityData.getRecordingId()            // int unique par entité
entityData.getEntity()
entityData.getRecordingTick()          // tick courant
entityData.isTracked() / setTracked(boolean)
entityData.getFirstSeenTick()
entityData.getLastInteractedBlockPos()
entityData.setLastInteractedBlockPos(blockPos)
```

### `IActionRegistry`

Enregistrement de types d'actions de playback.

```java
IActionRegistry registry = NarrativeCraftAPI.getInstance().getActionRegistry();
ActionType type = registry.register("my_action", tick -> new MyAction(tick));
```

### `AbstractAction` (classe abstraite)

Base pour toutes les actions enregistrées. À étendre pour créer une action personnalisée.

**Méthodes abstraites à implémenter :**

```java
public abstract String getId();
public abstract void write(Action.Writer writer) throws IOException;
public abstract void read(Action.Reader reader) throws IOException;
```

**Méthodes optionnelles à surcharger :**

```java
// Retourne true si les deux actions ont des valeurs différentes
// (utilisé pour dé-dupliquer les actions identiques consécutives)
public boolean differs(AbstractAction other) { return true; }

// Retourne la liste des actions à rejouer pour annuler cette action (rewind)
public List<AbstractAction> createRewindSnapshot(IPlaybackContext ctx, IPlaybackSession session) { return List.of(); }

// Si true, l'action est ré-exécutée pendant un rewind pour restaurer l'état
public boolean shouldExecuteOnRewind() { return false; }
```

**Méthodes publiques :**

```java
action.getTick() / setTick(int)
action.execute(context, session)     // ActionResult
```

### `Action` (interface)

```java
ActionResult execute(IPlaybackContext context, IPlaybackSession session);
```

#### `Action.Writer` — sérialisation binaire

```java
writer.addByte(byte)
writer.addShort(short)
writer.addInt(int)
writer.addLong(long)
writer.addDouble(double)
writer.addFloat(float)
writer.addString(String)
writer.addBoolean(boolean)
writer.addUUID(UUID)
writer.addVec3(Vec3)
writer.addBlockPos(BlockPos)
```

#### `Action.Reader` — désérialisation binaire

```java
reader.readByte()
reader.readShort()
reader.readInt()
reader.readLong()
reader.readDouble()
reader.readFloat()
reader.readString()
reader.readBoolean()
reader.readUUID()
reader.readVec3()
reader.readBlockPos()
```

### `ActionResult` (enum)

| Valeur | Signification |
|---|---|
| `OK` | Exécution réussie |
| `ERROR` | Erreur d'exécution |
| `IGNORED` | Action ignorée |

### `ActionType` (record)

```java
record ActionType(String id, IntFunction<AbstractAction> factory)
```

---

## 11. Playback — package `playback`

### `IPlaybackContext`

Contexte d'une entité pendant le playback.

```java
context.getEntity()
context.getRecordingId()       // int, identifiant utilisé dans les actions
context.respawnEntity()        // force la réapparition de l'entité
```

### `IPlaybackSession`

Session de playback au niveau global.

```java
session.getLevel()                                   // ServerLevel
session.getEntityByRecordingId(id)                   // Entity (nullable)
session.respawnEntityByRecordingId(id)

session.forSpecificPlayers()                         // boolean: ciblé ou global
session.getTargetedPlayers()                         // Collection<ServerPlayer>

// Gestion de l'état des blocs pendant le playback
session.getBlockStateAtTick(blockPos, tick)          // BlockState virtuelle
session.recordBlockState(tick, blockPos, blockState)
session.clearBlockStateLogFrom(tick)
```

---

## 12. Patterns et conventions

### Pattern d'enregistrement (registres)

Tous les registres suivent le même contrat :

```java
registry.register(...)    // ajoute une entrée
registry.unregister(...)  // retire une entrée
registry.get(...)         // accède par identifiant
```

### Pattern Factory pour les actions Ink

```java
dispatcher.register(MyAction.class, MyAction::new);
```

### Hiérarchie des actions Ink

```
InkAction (abstract)
└── @InkCommand(keyword, side, description, syntax)
    └── doValidate(ParsedCommand, IScene): InkActionResult
    └── doExecute(IPlayerSession): InkActionResult
```

### Hiérarchie des actions de playback

```
AbstractAction (abstract)
└── implements Action
    └── write(Writer) / read(Reader)
    └── getId()
    └── execute(IPlaybackContext, IPlaybackSession): ActionResult
```

### Hiérarchie des couches de cutscene

```
CutsceneLayer (abstract)
└── implements ICutsceneLayer
    └── createDefaultKeyframe(tick): Keyframe
    └── (utilise Keyframe et KeyframeSegment en interne)
```

---

## 13. Exemple d'utilisation minimal

### Enregistrer une action Ink côté serveur

```java
@InkCommand(
    keyword = "teleport",
    description = "Téléporte le joueur à une position",
    syntax = "teleport <x:float> <y:float> <z:float>",
    side = Side.SERVER
)
public class TeleportAction extends InkAction {

    @Override
    protected InkActionResult doValidate(ParsedCommand command, IScene scene) {
        // Validation avant exécution (appelée au chargement)
        return InkActionResult.ok();
    }

    @Override
    protected InkActionResult doExecute(IPlayerSession session) {
        float x = command.getFloat("x");
        float y = command.getFloat("y");
        float z = command.getFloat("z");
        session.getPlayer().teleportTo(x, y, z);
        return InkActionResult.ok();
    }
}

// Enregistrement
NarrativeCraftAPI.getInstance()
    .getInkTagDispatcher()
    .register(TeleportAction.class, TeleportAction::new);
```

### Écouter un événement

```java
NarrativeCraftAPI.getInstance()
    .getEventBus()
    .register(DialogStartEvent.class, event -> {
        ServerPlayer player = event.session().getPlayer();
        String speaker = event.speakerName();
        // ...
    });
```

### Enregistrer un effet de texte

```java
NarrativeCraftAPI.getInstance()
    .getTextEffectRegistry()
    .register("shake", (letterIndex, tick, partialTick, params) -> {
        float amplitude = Float.parseFloat(params.getOrDefault("amplitude", "2"));
        float dx = (float) (Math.random() * amplitude * 2 - amplitude);
        float dy = (float) (Math.random() * amplitude * 2 - amplitude);
        return new Vec2(dx, dy);
    });
```

---

## Annexe — Dépendances entre interfaces

```
NarrativeCraftAPI
├── IActionRegistry          → AbstractAction → Action (Writer/Reader)
├── ICutsceneLayerRegistry   → ICutsceneLayerType → ICutsceneLayer
│   └── CutsceneLayer → Keyframe → KeyframeMenu
│       └── Interpolation + EasingType + KeyframeSegment
├── ITextEffectRegistry      → ITextEffect
├── IStoryHandlerManager     → IStoryHandler
│   └── IPlayerSession → (IStoryHandler, List<InkAction>)
├── IEventBus                → Event (26 records)
│   └── PlayerSession / Story / Scene / Chapter / Character /
│       Cutscene / Dialog / Interaction / InkAction / Recording / Playback
├── IRecordingManager        → IRecording → IRecordingEntityData
└── InkTagDispatcher         → InkAction
    └── @InkCommand → CommandSpec
        ├── ParsedCommand
        ├── ArgDef / NamedArgDef / FlagDef / ArgType
        └── SyntaxParser

IPlaybackSession ← IPlaybackContext
IInteractionZone → IScene
ICutscene        → IScene
IScene           → IChapter
```
