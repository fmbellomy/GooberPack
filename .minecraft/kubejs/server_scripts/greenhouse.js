ServerEvents.recipes((event) => {
  event.shaped("modern_industrialization:greenhouse", ["RMR", "SBS", "CPC"], {
    R: "modern_industrialization:tin_rotor",
    M: "modern_industrialization:motor",
    S: "modern_industrialization:steel_machine_casing_pipe",
    B: "modern_industrialization:basic_machine_hull",
    C: "modern_industrialization:analog_circuit",
    P: "modern_industrialization:pump",
  });
  function generateGreenhouseRecipes(
    sapling,
    out,
    additionalOutput,
    additionalOutputChance
  ) {
    let manure = "extended_industrialization:manure";
    let composted_manure = "extended_industrialization:composted_manure";
    let npk_fertilizer = "extended_industrialization:npk_fertilizer";

    let ghrecipe = event.recipes.modern_industrialization
      .greenhouse(8, 200)
      .itemIn(sapling)
      .itemOut("8x " + out)
      .itemOut("2x " + sapling);
    if (additionalOutput) {
      ghrecipe.itemOut(additionalOutput, additionalOutputChance);
    }

    ghrecipe = event.recipes.modern_industrialization
      .greenhouse(6, 100)
      .itemIn(sapling)
      .fluidIn(manure, 100)
      .itemOut("12x " + out)
      .itemOut("2x " + sapling);
    if (additionalOutput) {
      ghrecipe.itemOut(additionalOutput, additionalOutputChance);
    }

    ghrecipe = event.recipes.modern_industrialization
      .greenhouse(4, 50)
      .itemIn(sapling)
      .fluidIn(composted_manure, 50)
      .itemOut("16x " + out)
      .itemOut("2x " + sapling);
    if (additionalOutput) {
      ghrecipe.itemOut(additionalOutput, additionalOutputChance);
    }

    ghrecipe = event.recipes.modern_industrialization
      .greenhouse(2, 20)
      .itemIn(sapling)
      .fluidIn(npk_fertilizer, 5)
      .itemOut("32x " + out)
      .itemOut("2x " + sapling);
    if (additionalOutput) {
      ghrecipe.itemOut(additionalOutput, additionalOutputChance);
    }
  }
  // apples from oak
  // also azaleas and propagules
  let items = Item.getList()
    .toArray()
    .map((i) => i.getItem().toString());
  let saplings = items.filter((i) => {
    return i.includes("sapling");
  });
  let oakIndex = saplings.findIndex((i) => i.contains("oak_sapling"));
  saplings.splice(oakIndex, oakIndex);
  let manure = "extended_industrialization:manure";
  let composted_manure = "extended_industrialization:composted_manure";
  let npk_fertilizer = "extended_industrialization:npk_fertilizer";
  console.log("SAPLINGS: !!!");
  console.log(saplings);

  for (let sapling of saplings) {
    let out = sapling.substring(0, sapling.indexOf("sapling")) + "log";
    generateGreenhouseRecipes(sapling, out);
  }
  generateGreenhouseRecipes(
    "minecraft:oak_sapling",
    "minecraft:oak_log",
    "1x minecraft:apple",
    0.2
  );
  generateGreenhouseRecipes("minecraft:mangrove_propagule", "mangrove_log");
  generateGreenhouseRecipes(
    "minecraft:azalea",
    "minecraft:oak_log",
    "2x minecraft:azalea_leaves",
    0.8
  );
  generateGreenhouseRecipes(
    "minecraft:flowering_azalea",
    "minecraft:oak_log",
    "2x minecraft:flowering_azalea_leaves",
    0.8
  );
});
