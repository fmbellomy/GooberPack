ServerEvents.recipes((recipeEvent) => {
  recipeEvent.recipes.modern_industrialization
    .compressor(2, 40)
    .itemIn("2x minecraft:paper")
    .itemOut("kubejs:silly_straw");

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
    recipeEvent.shapeless(fluid_name + "drinky", [
      "kubejs:silly_straw",
      bucketID,
    ]);
  });
});
