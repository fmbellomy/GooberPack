//@ts-check
StartupEvents.registry("item", (event) => {
  let targets = Item.getList()
    .toArray()
    .map((item) => item.getItem().toString());
  let results = targets.filter((itemName) => {
    return (
      itemName.includes("industrialization") && itemName.includes("bucket")
    );
  });
  results.forEach((bucketID) => {
    let fluid_name = bucketID.substring(
      bucketID.indexOf(":"),
      bucketID.indexOf("bucket")
    );
    event
      .create(fluid_name + "drinky")
      .textures({
        layer0: "kubejs:item/bucket",
        layer1: "kubejs:item/drinky_fluid",
        layer2: "kubejs:item/straw",
      })
      //@ts-expect-error | Item.of(bucketID) will be of type MIBucketItem, which has a public color attribute
      .color(1, Item.of(bucketID).item.color)
      .useAnimation("drink")
      .useDuration((itemstack) => 20)
      .use((level, player, hand) => true)
      .finishUsing((itemstack, level, entity) => {
        return global.consumeDrinky(itemstack, entity);
      });
  });
  event.create("silly_straw").texture("kubejs:item/silly_straw");
});

// a mapping between the item id of a given drinky to the function that should be run when it's consumed
let effectsMap = {
  "minecraft:manure_drinky": function (itemstack, entity) {
    entity.kill();
    return itemstack;
  },
  // default function to run if the drinky does not have a unique effect
  default: function (itemstack, entity) {
    let effects = entity.potionEffects;
    effects.add("minecraft:blindness", 10 * 20);
    return itemstack;
  },
};
// function that is run whenever you consume a drinky
// this is global so that way hot-reloading works
global.consumeDrinky = (itemstack, entity) => {
  // only run this if the consuming entity is a player
  // (i dont know how it would ever be anything else,
  // but since we're using player-exclusive functions
  // it would crash the game if that happened)
  if (entity.player) {
    // remove one drinky
    itemstack.shrink(1);
    // give back an empty bucket
    entity.addItem(Item.of("minecraft:bucket"));
    // if the effects map actually has a function for this particular drinky
    if (effectsMap[itemstack.item]) {
      // run the function associated with this drinky
      return effectsMap[itemstack.item](itemstack, entity);
    } else {
      // otherwise run the default function
      return effectsMap["default"](itemstack, entity);
    }
  }
  return itemstack;
};
