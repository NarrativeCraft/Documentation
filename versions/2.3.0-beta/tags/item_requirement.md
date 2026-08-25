# Item Requirement

Checks the player inventory for a given item. When the player does not carry enough of it, the story is redirected to a fallback stitch in the current scene.

## Side
SERVER

## Syntax

```
item_requirement <redirect_fail_stitch:string> <itemId:string> [amount:int=1] [customName:string]
```

## Parameters

- `redirect_fail_stitch` *(string, required)*: Name used to build the fallback stitch. See below.
- `itemId` *(string, required)*: Registry id of the item, such as `minecraft:tripwire_hook`. An unregistered id fails validation.
- `amount` *(int, optional)*: Quantity the player must carry, counted across the whole inventory. Defaults to `1`.
- `customName` *(string, optional)*: When set, only item stacks whose custom name matches, ignoring case, are counted.

## Fallback stitch

The stitch played on failure is not `redirect_fail_stitch` itself. NarrativeCraft builds its name as:

```
on_<redirect_fail_stitch>_item_requierement_fail
```

So `# item_requirement key minecraft:tripwire_hook` redirects to the stitch `on_key_item_requireement_fail`.

When the player carries enough items, nothing happens and the story continues to the next line.

## Examples

```
// The player must carry the key
# item_requirement key minecraft:tripwire_hook
The door unlocks.
-> DONE

= on_key_item_requierement_fail
The door is locked. I need to find the key first.
-> DONE
```

```
// Three coins are needed
# item_requirement payment minecraft:gold_nugget 3
```

```
// Only a stack renamed "Rusty Key" counts
# item_requirement key minecraft:tripwire_hook 1 customName:"Rusty Key"
```
