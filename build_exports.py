import os, json

COMPONENTS_DIR = os.path.abspath('./src/app')

NG_PACKAGR_PATH = os.path.abspath('./node_modules/ng-packagr/ng-package.schema.json')

NG_PACKAGE_EXCLUDED_DIRS = [
    os.path.join(COMPONENTS_DIR, 'components'),
    os.path.join(COMPONENTS_DIR, 'styles'),
]

INDEX_EXCLUDED_DIRS = [
    os.path.join(COMPONENTS_DIR, 'styles'),
]



def get_ng_packagr_relpath(path: str):
    return os.path.relpath(NG_PACKAGR_PATH, path)

def build_ng_package_json(path: str):
    relpath = get_ng_packagr_relpath(path)
    ng_package: dict = {
        '$schema': relpath,
        'lib': {
            'entryFile': '_index.ts'
        }
    }
    file_path = os.path.join(path, 'ng-package.json')
    with open(file_path, 'w') as f:
        f.write(json.dumps(ng_package, indent=2))
        
def build_index_ts(path: str):
    file_path = os.path.join(path, '_index.ts')
    files = os.listdir(path)
    
    files = [file for file in files if file.endswith('.ts') and file != '_index.ts']
    
    export_lines = [f'export * from \'./{file[:-3]}\';' for file in files]
    
    with open(file_path, 'w') as writer:
        writer.write('\n'.join(export_lines))
    
for root, subdirs, files in os.walk(COMPONENTS_DIR):
    for subdir in subdirs:
        path = os.path.join(root, subdir)
        if(path not in NG_PACKAGE_EXCLUDED_DIRS):
            build_ng_package_json(path)
        if(path not in INDEX_EXCLUDED_DIRS):
            build_index_ts(path)