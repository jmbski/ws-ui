import os, json, re

from modules.common import ROOT_DIR

LOG_LEVEL_PATTERN = r'(\s*localLogLevel: LogLevels\.)(\w+)(.*)'
DECORATOR_PATTERN = r'@LoggableC.*\('
TEST_PATH = '/home/joseph/coding_base/ws-ui-2/src/app/app.component.ts'

def update_file(file_path: str, log_level: str = 'Error'):
    
    if(isinstance(file_path, str) and os.path.exists(file_path)):
        with open(file_path, 'r') as reader:
            lines = reader.readlines()
            
        in_decorator = False
        apply_update = False
        
        for i, line in enumerate(lines):
            result = re.match(LOG_LEVEL_PATTERN, line)
            
            if(re.match(DECORATOR_PATTERN, line)):
                in_decorator = True
                
            if(result and in_decorator):
                local_log, level, rest = result.groups()
                if(level != log_level):
                    apply_update = True
                    replaced = f'{local_log}{log_level}{rest}'
                    if(not replaced.endswith('\n')):
                        replaced += '\n'
                    lines[i] = replaced
                in_decorator = False
                
        if(apply_update):
            print(f'Updating {file_path}')
            new_file = ''.join(lines)
            with open(file_path, 'w') as writer:
                writer.write(new_file)
        
def walk_files(log_level: str = 'Error'):
    for root, subdirs, files in os.walk(ROOT_DIR):
        for file in files:
            if(file.endswith('.ts')):
                update_file(os.path.join(root, file), log_level)

    
    