from os import listdir, path, walk
import sys
import zipfile
def mod_filter(modname: str) -> bool:
    exclusions = [".index", "DistantHorizons", "dynamic-fps", "entity_texture_features", "EuphoriaPatcher", "ProbeJS", "sodium", "iris", "zume"]
    return not any(map(lambda x: x in modname, exclusions))

def zipdir(filepath, ziph):
    # ziph is zipfile handle
    for root, dirs, files in walk(filepath):
        for file in files:
            ziph.write(path.join(root, file), 
                       path.relpath(path.join(root, file), 
                                       path.join(filepath, '..')))
def main():
    n = len(sys.argv)
    if(n < 2):
        print("Usage: ./make_server_files.py VERSION_IDENTIFIER")
        exit(1)
    version = sys.argv[1]
    with zipfile.ZipFile(f"goober_server_pack-{version}.zip", 'w', zipfile.ZIP_DEFLATED) as zipf:
        # add mods
        modspath = ".minecraft/mods"
        for root, dirs, files in walk(modspath):
            for file in files:
                if(mod_filter(file) and not ".toml" in str(file)):
                    zipf.write(path.join(root, file), 
                            path.relpath(path.join(root, file), 
                                            path.join(modspath, '..')))
        zipdir('.minecraft/kubejs', zipf)
        zipdir('.minecraft/config', zipf)
        zipdir('.minecraft/defaultconfigs', zipf)
    
    

if __name__ == "__main__":
    main()