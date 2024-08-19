import os, sys

from modules import (
    common,
    build_exports,
    set_log_levels
)

def main():
    if(len(sys.argv) < 2):
        print('Usage: python main.py [build_exports|set_log_levels] [log_level]')
        return
    
    command = sys.argv[1]
    
    if(command == 'build_exports'):
        build_exports.build_exports()
    elif(command == 'set_log_levels'):
        if(len(sys.argv) < 3):
            print('No log level provided')
            return
        log_level = sys.argv[2]
        set_log_levels.walk_files(log_level)
    else:
        print('Invalid command')
        
if (__name__ == '__main__'):
    main()