ServerEvents.recipes((recipeEvent) => {
  const eioMaterials = [
    "conductive_alloy",
    "pulsating_alloy",
    "energetic_alloy",
    "vibrant_alloy",
  ];
  const eioCapacitors = ["basic", "double_layer", "octadic"];
  const eioBatteries = ["basic", "advanced", "vibrant"];
  // eio base thruster
  recipeEvent.shaped(
    Item.of(
      'ironjetpacks:thruster[ironjetpacks:jetpack_id="ironjetpacks:conductive_alloy"]'
    ),
    [" P ", "PCP", "P P"],
    {
      P: `#c:plates/conductive_alloy`,
      C: Item.of(`enderio:basic_capacitor`),
    }
  );
  for (let i = 1; i < eioMaterials.length; i++) {
    let newTier = eioMaterials[i];

    recipeEvent.shaped(
      Item.of(
        `ironjetpacks:thruster[ironjetpacks:jetpack_id="ironjetpacks:${newTier}",rarity="uncommon"]`
      ),
      [" P ", "PCP", "P P"],
      {
        P: `#c:plates/${newTier}`,
        C: Item.of(`enderio:${eioBatteries[i - 1]}_capacitor_bank`),
      }
    );
  }

  // eio base jetpack
  recipeEvent.shaped(
    Item.of(
      'ironjetpacks:jetpack[ironjetpacks:jetpack_id="ironjetpacks:conductive_alloy"]'
    ),
    ["I I", "IPI", "T T"],
    {
      I: "enderio:conductive_alloy_ingot",
      P: "modern_industrialization:conductive_alloy_plate",
      T: 'ironjetpacks:thruster[ironjetpacks:jetpack_id="ironjetpacks:conductive_alloy"]',
    }
  );
  // rest of the eio jetpacks
  for (let i = 1; i < eioMaterials.length; i++) {
    recipeEvent.shaped(
      Item.of(
        `ironjetpacks:jetpack[ironjetpacks:jetpack_id="ironjetpacks:${eioMaterials[i]}"]`
      ),
      ["I I", "IPI", "T T"],
      {
        I: `enderio:${eioMaterials[i]}_ingot`,
        P: `ironjetpacks:jetpack[ironjetpacks:jetpack_id="ironjetpacks:${
          eioMaterials[i - 1] // previous tier jetpack
        }"]`,
        T: `ironjetpacks:thruster[ironjetpacks:jetpack_id="ironjetpacks:${eioMaterials[i]}"]`,
      }
    );
  }
});
