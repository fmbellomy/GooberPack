ServerEvents.recipes((e) => {
  e.replaceOutput(
    { output: "#c:silicon", type: "enderio:sag_milling" },
    "#c:silicon",
    null
  );
});
