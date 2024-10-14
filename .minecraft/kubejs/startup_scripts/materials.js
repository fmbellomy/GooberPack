const eioMaterials = [
  { display: "Conductive Alloy", name: "conductive_alloy", color: 0xff7176 },
  { display: "Pulsating Alloy", name: "pulsating_alloy", color: 0x16ff5c },
  { display: "Energetic Alloy", name: "energetic_alloy", color: 0xffa653 },
  { display: "Vibrant Alloy", name: "vibrant_alloy", color: 0x99ff3a },
];
MIMaterialEvents.addMaterials((event) => {
  eioMaterials.forEach((mat) => {
    event.createMaterial(mat.display, mat.name, mat.color, (builder) => {
      builder
        .addParts("plate")
        .defaultRecipes()
        .addExternalPart("ingot", `enderio:${mat.name}_ingot`);
      console.log(`enderio:${mat.name}_ingot`);
    });
  });
});
