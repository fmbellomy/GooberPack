let GREENHOUSE;
MIMachineEvents.registerRecipeTypes((event) => {
  GREENHOUSE = event
    .register("greenhouse")
    .withItemInputs()
    .withFluidInputs()
    .withItemOutputs();
});
MIMachineEvents.registerMachines((event) => {
  const greenhouseHatch = event.hatchOf(
    "item_input",
    "item_output",
    "fluid_input",
    "energy_input"
  );
  const foundationBlock = event.memberOfBlock(
    "modern_industrialization:steel_machine_casing"
  );
  const sidesBlock = event.memberOfBlock(
    "modern_industrialization:steel_machine_casing_pipe"
  );
  const glass = event.memberOfBlock("minecraft:glass");
  const grass = event.memberOfBlock("minecraft:grass_block");

  // builder starts here
  let greenhouseShapeBuilder = event.startShape("steel");
  /*******************************
   *          floor level        *
   ******************************/
  for (let x = -2; x <= 2; x++) {
    for (let z = 0; z <= 5; z++) {
      if (x !== 0 && z !== 0) {
        if (x === -2 || x === 2 || z == 0 || z == 5) {
          greenhouseShapeBuilder.add(x, 0, z, foundationBlock, greenhouseHatch);
        } else {
          greenhouseShapeBuilder.add(x, 0, z, grass, event.noHatch());
        }
      }
    }
  }

  /*******************************
   *    right and left walls     *
   ******************************/
  for (let y = 1; y <= 3; y++) {
    for (let z = 0; z <= 5; z++) {
      if (z === 0 || z === 5) {
        greenhouseShapeBuilder.add(-2, y, z, sidesBlock, event.noHatch());
        greenhouseShapeBuilder.add(2, y, z, sidesBlock, event.noHatch());
      } else {
        greenhouseShapeBuilder.add(-2, y, z, glass, event.noHatch());
        greenhouseShapeBuilder.add(2, y, z, glass, event.noHatch());
      }
    }
  }
  /********************************
   *           back wall          *
   *******************************/
  for (let y = 1; y <= 3; y++) {
    for (let x = -1; x <= 1; x++) {
      greenhouseShapeBuilder.add(x, y, 5, glass, event.noHatch());
    }
  }
  /********************************
   *             roof             *
   *******************************/
  for (let x = -1; x <= 1; x++) {
    for (let z = 0; z <= 5; z++) {
      if (z === 0 || z === 5) {
        greenhouseShapeBuilder.add(x, 4, z, foundationBlock, event.noHatch());
      } else {
        greenhouseShapeBuilder.add(x, 4, z, glass, event.noHatch());
      }
    }
  }
  const greenhouseShape = greenhouseShapeBuilder.build();

  // register da multiblock
  event.simpleElectricCraftingMultiBlock(
    "Greenhouse",
    "greenhouse",
    GREENHOUSE,
    greenhouseShape,
    event.progressBar(77, 33, "arrow"),
    (itemInputs) => itemInputs.addSlot(56, 35),
    (itemOutputs) => itemOutputs.addSlots(102, 35, 1, 3),
    (fluidInputs) => fluidInputs.addSlot(36, 35),
    (fluidOutputs) => fluidOutputs,
    "steel",
    "greenhouse_overlays",
    true,
    false,
    false
  );
});
