#!/bin/bash
# if a modlist already exists, wipe it first.
rm -f modlist.txt
for toml in ./.minecraft/mods/.index/*.toml; do
    tomlq .name "$toml" | tr -d '"' >> modlist.txt
done