import os, json

from modules.common import ROOT_DIR, NG_PACKAGR_PATH, NG_PACKAGE_EXCLUDED_DIRS, INDEX_EXCLUDED_DIRS


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
    
    dirs = [file for file in files if os.path.isdir(os.path.join(path, file))]
    
    files = [file for file in files if file.endswith('.ts') and file != '_index.ts' and not file.endswith('.spec.ts')]
    
    
    export_lines = [f'export * from \'./{file[:-3]}\';' for file in files]
    export_lines.extend([f'export * from \'./{file}/_index\';' for file in dirs])
    export_lines.sort()
    
    with open(file_path, 'w') as writer:
        writer.write('\n'.join(export_lines))

def build_exports():
    for root, subdirs, files in os.walk(ROOT_DIR):
        for subdir in subdirs:
            path = os.path.join(root, subdir)
            if(path not in NG_PACKAGE_EXCLUDED_DIRS):
                build_ng_package_json(path)
            if(path not in INDEX_EXCLUDED_DIRS):
                build_index_ts(path)
                
if(__name__ == '__main__'):
    build_exports()