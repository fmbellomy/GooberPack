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

let effectsMap = {
  "minecraft:manure_drinky": function (itemstack, entity) {
    entity.kill();
    return itemstack;
  },

  default: function (itemstack, entity) {
    let effects = entity.potionEffects;
    effects.add("minecraft:blindness", 10 * 20);
    return itemstack;
  },
};

global.consumeDrinky = (itemstack, entity) => {
  if (entity.player) {
    itemstack.shrink(1);
    entity.addItem(Item.of("minecraft:bucket"));
    if (effectsMap[itemstack.item]) {
      return effectsMap[itemstack.item](itemstack, entity);
    } else {
      return effectsMap["default"](itemstack, entity);
    }
  }
  return itemstack;
};
