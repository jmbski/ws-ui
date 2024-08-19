import { GenericFunction, WeakObject } from 'warskald-ui/models';
import { isWeakObject, isStringArray, isString } from 'warskald-ui/type-guards';
import { isConsoleDirOptions } from './log-service-typeguards';
import { ConsoleDirOptions, ConsoleFunctLevelMap } from './log-service-types';
import { LogLevels, LogSvcIgnoredStrings$ } from './log-service-constants';

/**
 * Map of console functions to their log levels and argument parsing functions
 */
export const consoleFunctDefMap: ConsoleFunctLevelMap = {
    assert: {
        logLevel: LogLevels.Assert,
        getArgs: (condition: unknown, ...args: unknown[]) => [condition, ...args],
        contextStringInArgs: true,
    },
    clear: {
        logLevel: LogLevels.Debug,
        getArgs: () => [],
    },
    count: {
        logLevel: LogLevels.Debug,
        getArgs: getConsoleStringArg,
    },
    countReset: {
        logLevel: LogLevels.Debug,
        getArgs: getConsoleStringArg,
    },
    debug: {
        logLevel: LogLevels.Debug,
        getArgs: (...args: unknown[]) => args,
        contextStringInArgs: true,
    },
    dir: {
        logLevel: LogLevels.Debug,
        getArgs: getConsoleDirArgs,
    },
    dirxml: {
        logLevel: LogLevels.Debug,
        getArgs: getConsoleDirArgs,
    },
    error: {
        logLevel: LogLevels.Error,
        getArgs: (...args: unknown[]) => args,
        contextStringInArgs: true,
    },
    group: {
        logLevel: LogLevels.Debug,
        getArgs: getConsoleStringArg,
    },
    groupCollapsed: {
        logLevel: LogLevels.Debug,
        getArgs: getConsoleStringArg,
    },
    groupEnd: {
        logLevel: LogLevels.Debug,
        getArgs: () => [],
    },
    info: {
        logLevel: LogLevels.Info,
        getArgs: (...args: unknown[]) => args,
        contextStringInArgs: true,
    },
    log: {
        logLevel: LogLevels.Log,
        getArgs: (...args: unknown[]) => args,
        contextStringInArgs: true,
    },
    table: {
        logLevel: LogLevels.Debug,
        getArgs: getConsoleTableArgs,
    },
    time: {
        logLevel: LogLevels.Debug,
        getArgs: getConsoleStringArg,
    },
    timeEnd: {
        logLevel: LogLevels.Debug,
        getArgs: getConsoleStringArg,
    },
    timeLog: {
        logLevel: LogLevels.Debug,
        getArgs: (...args: unknown[]) => args,
        contextStringInArgs: true,
    },
    timeStamp: {
        logLevel: LogLevels.Experimental,
        getArgs: getConsoleStringArg,
    },
    trace: {
        logLevel: LogLevels.Trace,
        getArgs: (...args: unknown[]) => args,
        contextStringInArgs: true,
    },
    warn: {
        logLevel: LogLevels.Warn,
        getArgs: (...args: unknown[]) => args,
        contextStringInArgs: true,
    },
};

/**
 * Parses a function and returns an array containing the names of its arguments
 * 
 * @returns - Array of argument names
 * @param fn - The function to parse
 */
export function getArgNames(fn: GenericFunction<unknown>): string[] {
    // First match everything inside the function argument parentheses.
    const functStr = fn.toString();
    if(functStr) {
        const args = functStr.match(/^.+\((.+?)\)\s{/)?.[1];
     
        if(args) {
            return args.split(',').map(function(arg) {
                // Split the arguments string into an array comma delimited.
                return arg.replace(/\/\*.*\*\//, '').trim();
            }).filter(function(arg) {
                // Ensure no undefined values are added.
                return arg;
            });
        }
    }
    return [];
}

/**
 * Parses the arguments of a function and returns an object with the argument names as keys
 * 
 * @param funct - The function to parse
 * @param args - The arguments to parse
 * @returns - Object with argument names as keys
 */
export function getArgsOutput(funct: GenericFunction<unknown>, ...args: unknown[]): WeakObject {
    const argNames = getArgNames(funct);
    const argsOutput: WeakObject = {};
    argNames.forEach((argName, index) => {
        if(argName.startsWith('...')) {
            argsOutput[`${argName}`] = args.slice(index);
            return;
        }
        
        argsOutput[`${argName}`] = args[index];
    });

    return argsOutput;
}
/**
 * Retrieves the first string argument in the args array that is not in the ignored strings array
 * 
 * @param args - the log args passed through the log service
 * @returns - the first string argument in the args array that is not in the ignored strings array
 */
export function getConsoleStringArg(...args: unknown[]): string[] {
    const prop = args.find(arg => isString(arg) && 
        !LogSvcIgnoredStrings$.getValue().includes(arg));
    return prop ? [prop as string] : [];
}

/**
 * Retrieves the object and options arguments for the console.dir function
 * 
 * @param args - the log args passed through the log service
 * @returns - the object and options arguments for the console.dir function
 */
export function getConsoleDirArgs(...args: unknown[]): object[] {
    const returnArgs: object[] = [];

    const objIndex =  args.findIndex(arg => isWeakObject(arg));

    const optionsIndex = args.slice(objIndex + 1).findIndex(arg => isConsoleDirOptions(arg));
    
    if(objIndex > -1) {
        returnArgs.push(args[objIndex] as object);
        if(optionsIndex > -1) {
            returnArgs.push(args[optionsIndex + objIndex + 1] as ConsoleDirOptions);
        }
    }

    return returnArgs;
}

/**
 * Retrieves the data and columns arguments for the console.table function
 * 
 * @param args - the log args passed through the log service
 * @returns - the data and columns arguments for the console.table function
 */
export function getConsoleTableArgs(...args: unknown[]) {
    const returnArgs: unknown[] = [];

    const dataIndex = args.findIndex(arg => Array.isArray(arg) || typeof arg === 'object');
    if(dataIndex > -1) {
        returnArgs.push(args[dataIndex]);
        const columnsIndex = args.findIndex((arg, index) => isStringArray(arg) && index > dataIndex);
        if(columnsIndex > dataIndex) {
            returnArgs.push(args[columnsIndex]);
        }
    }

    return returnArgs;
}