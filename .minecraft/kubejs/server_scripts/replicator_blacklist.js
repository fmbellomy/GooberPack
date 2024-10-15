ServerEvents.tags("item", (event) => {
  let additions = [
    // ae2 things to blacklist
    /storage_cell/,
    /portable_.*_cell/,
    "ae2:view_cell",
    "ae2:wireless_crafting_terminal",
    "ae2wtlib:wireless_universal_terminal",
    "megacells:bulk_item_cell",
    "extendedae:package",

    // sophisticated storage and functional storage
    /sophisticated.*:.*(shulker|barrel|chest|backpack)/,
    /functionalstorage/,

    // some stuff from MI that shouldn't really be replicable
    /^modern_industrialization:quantum_.*/,
    "modern_industrialization:replicator",
    "modern_industrialization:helium_plasma_bucket",
    "modern_industrialization:singularity",
    "modern_industrialization:nuke",
  ];
  event.add("modern_industrialization:replicator_blacklist", additions);
});
