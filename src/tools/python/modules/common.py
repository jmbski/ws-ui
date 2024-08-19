import os

ROOT_DIR = os.path.abspath('./src/app')
""" Common reference to the absolute path of the root project directory. """

NG_PACKAGR_PATH = os.path.abspath('./node_modules/ng-packagr/ng-package.schema.json')
""" Common reference to the absolute path of the ng-packagr schema file. """

NG_PACKAGE_EXCLUDED_DIRS = [
    os.path.join(ROOT_DIR, 'components'),
    os.path.join(ROOT_DIR, 'assets', 'images'),
    os.path.join(ROOT_DIR, 'assets', 'images', 'icons'),
    os.path.join(ROOT_DIR, 'assets', 'images', 'textures'),
    os.path.join(ROOT_DIR, 'assets', 'fonts'),
    os.path.join(ROOT_DIR, 'assets', 'styles'),
    os.path.join(ROOT_DIR, 'assets', 'styles', 'themes'),
    os.path.join(ROOT_DIR, 'showcase'),
]
""" Common reference to the list of directories to exclude from adding ng-package.json files to. """

INDEX_EXCLUDED_DIRS = [
    os.path.join(ROOT_DIR, 'assets', 'images'),
    os.path.join(ROOT_DIR, 'assets', 'images', 'icons'),
    os.path.join(ROOT_DIR, 'assets', 'images', 'textures'),
    os.path.join(ROOT_DIR, 'assets', 'fonts'),
    os.path.join(ROOT_DIR, 'assets', 'styles'),
    os.path.join(ROOT_DIR, 'assets', 'styles', 'themes'),
    os.path.join(ROOT_DIR, 'showcase'),
]
""" Common reference to the list of directories to exclude from adding _index.ts files to. """