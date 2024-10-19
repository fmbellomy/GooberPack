// composting (scale is from 0.0 - 1.0)
ServerEvents.compostableRecipes((event) => {
  const DEFAULT_COMPOST_RATE = 0.3;
  // add things that should be compostable here.
  // they will all have a default rate of 30%

  const dumb_uncompostables = [
    "minecraft:poisonous_potatoes",
    "extradelight:corn_husk",
    "extradelight:corn_cob",
    "extradelight:ginger",
    "extradelight:mint_leaf",
  ];

  for (uncompostable in dumb_uncompostables) {
    event.add(uncompostable, DEFAULT_COMPOST_RATE);
  }
});
