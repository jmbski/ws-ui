import { Injectable } from '@angular/core';
import { LogServiceConfig } from './log-service-config';
import { isBoolean, isFunction } from 'lodash';
import { GeneralFunction, FunctionMap, LogLevel, LogAccessMode, LoggableObject, LocalLogSettings, UnionTypeOf, stringLiterals, WeakObject  } from 'warskald-ui/models';
import { isStringArray } from 'warskald-ui/type-guards';

// direct import of environment variables will be done for the work
// version, since that will be a local service, not a packaged library
// import { environment, logServiceConfig } from 'environment';

export type ConsoleFunctName = Exclude<keyof Console, 'Console' | 'profile' | 'profileEnd'>;

export enum ConsoleFuncts {
    Assert = 'assert',
    Clear = 'clear',
    Count = 'count',
    CountReset = 'countReset',
    Debug = 'debug',
    Dir = 'dir',
    Dirxml = 'dirxml',
    Error = 'error',
    Group = 'group',
    GroupCollapsed = 'groupCollapsed',
    GroupEnd = 'groupEnd',
    Info = 'info',
    Log = 'log',
    Table = 'table',
    Time = 'time',
    TimeEnd = 'timeEnd',
    TimeLog = 'timeLog',
    TimeStamp = 'timeStamp',
    Trace = 'trace',
    Warn = 'warn',
}

export interface ConsoleFunctDef {
    logLevel: LogLevel;
    getArgs: (...args: unknown[]) => unknown[];
    /** if true, the context string will be included in the getArgs function */
    contextStringInArgs?: boolean;
}

export type ConsoleFunctLevelMap = Record<ConsoleFunctName, ConsoleFunctDef>;

function getStringArg(...args: unknown[]): string[] {
    return typeof args[0] === 'string' ? [args[0] as string] : [];
}

function getObjectArg(...args: unknown[]): object[] {
    return typeof args[0] === 'object' ? [args[0] as object] : [];
}

export const consoleFunctDefMap: ConsoleFunctLevelMap = {
    assert: {
        logLevel: LogLevel.Assert,
        getArgs: (condition: unknown, ...args: unknown[]) => [condition, ...args],
        contextStringInArgs: true,
    },
    clear: {
        logLevel: LogLevel.Debug,
        getArgs: () => [],
    },
    count: {
        logLevel: LogLevel.Debug,
        getArgs: getStringArg,
    },
    countReset: {
        logLevel: LogLevel.Debug,
        getArgs: getStringArg,
    },
    debug: {
        logLevel: LogLevel.Debug,
        getArgs: (...args: unknown[]) => args,
        contextStringInArgs: true,
    },
    dir: {
        logLevel: LogLevel.Debug,
        getArgs: getObjectArg,
    },
    dirxml: {
        logLevel: LogLevel.Debug,
        getArgs: getObjectArg,
    },
    error: {
        logLevel: LogLevel.Error,
        getArgs: (...args: unknown[]) => args,
        contextStringInArgs: true,
    },
    group: {
        logLevel: LogLevel.Debug,
        getArgs: getStringArg,
    },
    groupCollapsed: {
        logLevel: LogLevel.Debug,
        getArgs: getStringArg,
    },
    groupEnd: {
        logLevel: LogLevel.Debug,
        getArgs: () => [],
    },
    info: {
        logLevel: LogLevel.Info,
        getArgs: (...args: unknown[]) => args,
        contextStringInArgs: true,
    },
    log: {
        logLevel: LogLevel.Log,
        getArgs: (...args: unknown[]) => args,
        contextStringInArgs: true,
    },
    table: {
        logLevel: LogLevel.Debug,
        getArgs: (...args: unknown[]) => {
            const [data, columns] = args;
            if(Array.isArray(data) || typeof data === 'object') {
                if(isStringArray(columns)) {
                    return [data, columns];
                }
                return [data];
                
            }
            return [];
        },
    },
    time: {
        logLevel: LogLevel.Debug,
        getArgs: getStringArg,
    },
    timeEnd: {
        logLevel: LogLevel.Debug,
        getArgs: getStringArg,
    },
    timeLog: {
        logLevel: LogLevel.Debug,
        getArgs: (...args: unknown[]) => args,
        contextStringInArgs: true,
    },
    timeStamp: {
        logLevel: LogLevel.Experimental,
        getArgs: getStringArg,
    },
    trace: {
        logLevel: LogLevel.Debug,
        getArgs: (...args: unknown[]) => args,
        contextStringInArgs: true,
    },
    warn: {
        logLevel: LogLevel.Warn,
        getArgs: (...args: unknown[]) => args,
        contextStringInArgs: true,
    },
};

export type LogLevelConsoleFunctMap = Record<LogLevel, ConsoleFunctName | null>;

export const logLevelConsoleFunctMap: LogLevelConsoleFunctMap = {
    [LogLevel.Assert]: 'assert',
    [LogLevel.Debug]: 'debug',
    [LogLevel.Error]: 'error',
    [LogLevel.Info]: 'info',
    [LogLevel.Log]: 'log',
    [LogLevel.Trace]: 'trace',
    [LogLevel.Warn]: 'warn',
    [LogLevel.None]: null,
    [LogLevel.Experimental]: null,
};

export function isConsoleFunction(value: unknown, name: string): value is GeneralFunction<void> {
    return Object.keys(console).includes(name) && name !== 'Console' && isFunction(value);
}

export function isConsoleKey(value: unknown): value is ConsoleFunctName {
    return Object.keys(console).includes(value as string);
}

/**
 * Service for logging messages to the console.
 */
@Injectable({
    providedIn: 'root'
})
export class LogService {

    // #region public properties

    /** 
     * The log level for the application.
     */
    public static logLevel: LogLevel = LogLevel.Trace;

    /**
     * Whether or not to use the local log level of the calling object.
     */
    public static useLocalLogLevel: boolean = true;

    /**
     * Whether or not to use the canLog property of the calling object.
     */
    public static useCanLog: boolean = true;

    /**
     * If true, the service will use the stricter of the global log level and the local log level.
     * If false, the service will use the looser of the global log level and the local log level.
     */
    public static useStrictLocalLogLevel: boolean = false;

    /**
     * The list of objects that are allowed to log messages.
     */
    public static callerWhiteList: string[] = [];

    /**
     * The list of objects that are not allowed to log messages.
     */
    public static callerBlackList: string[] = [];

    /**
     * The access mode for the caller white list/black list.
     */
    public static callerAccessMode: LogAccessMode = 'none';

    /**
     * The list of functions that are allowed to log messages.
     */
    public static functionWhiteList: string[] = [];

    /**
     * The list of functions that are not allowed to log messages.
     */
    public static functionBlackList: string[] = [];

    /**
     * The access mode for the function white list/black list.
     */
    public static functionAccessMode: LogAccessMode = 'none';

    /**
     * The list of log levels that are allowed to be logged.
     */
    public static logLevelWhiteList: LogLevel[] = [];

    /**
     * The list of log levels that are not allowed to be logged.
     */
    public static logLevelBlackList: LogLevel[] = [];

    /**
     * The access mode for the log level white list/black list.
     */
    public static logLevelAccessMode: LogAccessMode = 'none';
    
    /**
     * The key to press to report the current state of the LogService.
     */
    public static reportKey: string = '~';

    /**
     * Flag indicating that the report listener has been added
     */
    public static reportListenerEnabled: boolean = false;

    /**
     * Flag to enable listening for the report key
     */
    public static enableReportListener: boolean = false;

    /**
     * Key to listen for to toggle to the {@link serviceStates}.
     */
    public static toggleKey: string = '`';

    /**
     * Default state name to use (primarily to toggle back to)
     */
    public static defaultStateName: string = 'defaultState';

    /**
     * Flag indicating that the toggle listener has been added
     */
    public static toggleListenerEnabled: boolean = false;

    /**
     * Flag to enable listening for the toggle key
     */
    public static enableToggleListener: boolean = false;

    /**
     * Additional listeners to add to the LogService. The key in each record is the key to listen for.
     * The value is the function to call when the key is pressed.
     */
    public static customKeyListeners: FunctionMap = {};

    /**
     * The current state of the service.
     */
    public static currentStateName: string = 'default';

    /**
     * Flag indicating that the key listener has been added
     */
    public static keyListenerActive: boolean = false;

    /**
     * Flag to persist the current state of the service to local storage.
     */
    public static persistCurrentState: boolean = true;

    static [key: string]: unknown;
    
    // #endregion public properties
    
    
    // #region private properties

    /**
     * Default state of the service
     */
    private static _defaultState: LogServiceConfig = {
        logLevel: LogLevel.Trace,
        useLocalLogLevel: true,
        useCanLog: true,
        useStrictLocalLogLevel: false,
        callerWhiteList: [],
        callerBlackList: [],
        callerAccessMode: 'none',
        functionWhiteList: [],
        functionBlackList: [],
        functionAccessMode: 'none',
        logLevelWhiteList: [],
        logLevelBlackList: [],
        logLevelAccessMode: 'none',
        reportKey: '~',
        enableReportListener: false,
        toggleKey: '`',
        enableToggleListener: false,
        customKeyListeners: {},
    };

    /**
     * Collection of states to switch between
     */
    private static _serviceStates: Record<string, LogServiceConfig> = {
        'defaultState': LogService._defaultState,
    };

    // private static _envSettings: LogServiceConfig = logServiceConfig;
    
    // #endregion private properties
    
    
    // #region getters/setters
    
    // #endregion getters/setters
    
    
    // #region standard inputs
    
    // #endregion standard inputs
    
    
    // #region get/set inputs
    
    // #endregion get/set inputs
    
    
    // #region outputs, emitters, and event listeners
    
    // #endregion outputs, emitters, and event listeners
    
    
    // #region viewchildren and contentchildren
    
    // #endregion viewchildren and contentchildren
    
    
    // #region constructor and lifecycle hooks

    // #endregion constructor and lifecycle hooks
    
    
    // #region public methods

    /**
     * Verifies that the provided calling object can log its output. This is based on 
     * the log level of the calling object and the global log level, as well as the
     * canLog property of the calling object. The service uses whichever log level is
     * higher between the global log level and the local log level of the calling object.
     * 
     * @param callLogLevel - The log level of the message.
     * @param caller - The object that is attempting to log a message.
     * @returns - True if the message can be logged, false otherwise.
     */
    public static canLog(callLogLevel: LogLevel, caller: LoggableObject, functName: string): boolean {
        
        const { localLogLevel, canLog } = caller;

        /** If the caller's canLog flag is false, return immediately before doing anything else */
        if(canLog === false && LogService.useCanLog) {
            return false;
        }
        
        /** Check whitelist/blacklist properties in order of priority */

        const hasAccess: boolean = [
            {accessor: 'caller', prop: caller.LOCAL_ID},
            {accessor: 'function', prop: functName},
            {accessor: 'logLevel', prop: callLogLevel},
        ].every(({accessor, prop}) => {
            
            const accessMode = LogService[`${accessor}AccessMode`];
            let allowed: boolean = true;

            if(<LogAccessMode>accessMode !== 'none') {
                const whitelist = LogService[`${accessor}WhiteList`];
                const blacklist = LogService[`${accessor}BlackList`];
                
                allowed = accessMode === 'whitelist' ?
                    (<unknown[]>whitelist).includes(prop) :
                    !(<unknown[]>blacklist).includes(prop);
            }

            return allowed;
        });

        if(!hasAccess) {
            return false;
        }
        
        let logLevel = LogService.logLevel;

        if(LogService.useLocalLogLevel) {
            logLevel = LogService.useStrictLocalLogLevel ? 
                Math.max(LogService.logLevel, localLogLevel ?? LogLevel.Trace) :
                Math.min(LogService.logLevel, localLogLevel ?? LogLevel.Trace);
        }

        return callLogLevel >= logLevel;
    }

    /**
     * Updates the log settings of the calling object.
     * 
     * @param caller - the object that is updating its log settings
     * @param settings - the new log settings
     */
    public static updateLocalLogSettings(caller: LoggableObject, settings: LocalLogSettings) {
        const { canLog, localLogLevel } = settings;
        caller.canLog = canLog ?? caller.canLog;
        caller.localLogLevel = localLogLevel ?? caller.localLogLevel;

        LogService.debug(caller, 'entering', settings);

        Object.assign(caller, settings);

        LogService.debug(caller, 'exiting', caller);
    }

    /**
     * Updates the log settings of the service.
     * 
     * @param settings - the new log settings
     */
    public static updateLogServiceSettings(
        settings: LogServiceConfig,
        stateName?: string
    ) {
        Object.keys(settings).forEach((key: string) => {
            LogService[key] = settings[key] ?? LogService[key];
        });

        LogService.saveState(stateName, settings);

        LogService.currentStateName = stateName ?? 'latestState';

        if(settings.toggleState) {
            LogService.saveState('toggleState', settings.toggleState);
        }
        
        LogService.toggleKeyListener(true);
    }

    /**
     * Saves a configuration of the state of the service settings.
     * 
     * @param stateName - the name of the state to save
     */
    public static saveState(stateName?: string, state?: LogServiceConfig) {
        stateName ??= 'latestState';
        state ??= {
            logLevel: LogService.logLevel,
            useLocalLogLevel: LogService.useLocalLogLevel,
            useCanLog: LogService.useCanLog,
            useStrictLocalLogLevel: LogService.useStrictLocalLogLevel,
            callerWhiteList: LogService.callerWhiteList,
            callerBlackList: LogService.callerBlackList,
            callerAccessMode: LogService.callerAccessMode,
            functionWhiteList: LogService.functionWhiteList,
            functionBlackList: LogService.functionBlackList,
            functionAccessMode: LogService.functionAccessMode,
            logLevelWhiteList: LogService.logLevelWhiteList,
            logLevelBlackList: LogService.logLevelBlackList,
            logLevelAccessMode: LogService.logLevelAccessMode,
            reportKey: LogService.reportKey,
            enableReportListener: LogService.enableReportListener,
            toggleKey: LogService.toggleKey,
            enableToggleListener: LogService.enableToggleListener,
            customKeyListeners: LogService.customKeyListeners,
        };

        state = Object.assign({}, LogService._defaultState, state);


        if(stateName !== 'defaultState') {
            LogService._serviceStates[stateName] = state;
            LogService._updateLocalStorage();
        }
    }

    public static loadState(stateName: string) {
        const state: LogServiceConfig | undefined = LogService._serviceStates[stateName];
        if(state) {
            LogService.currentStateName = stateName;
            console.log(`Switching to state: ${stateName}`);

            LogService._updateLocalStorage(true);

            Object.keys(state).forEach((key: string) => {
                LogService[key] = state[key] ?? LogService[key];
            });

            LogService.toggleKeyListener(true);
        }
    }

    public static deleteState(stateName: string) {
        delete LogService._serviceStates[stateName];
        LogService._updateLocalStorage();
    }

    /**
     * Toggles the report listener on or off.
     * 
     * @param toggleValue - whether or not to toggle the report listener
     */
    public static toggleKeyListener(toggleValue?: boolean) {
        toggleValue ??= !LogService.keyListenerActive;
        
        if(!toggleValue) {
            window.removeEventListener('keyup', LogService._keyListenHandler);
            LogService.keyListenerActive = false;
        } 
        else {
            // remove the listener first in case it is already active
            window.removeEventListener('keyup', LogService._keyListenHandler);
            window.addEventListener('keyup', LogService._keyListenHandler);
        }
    }

    public static initialize(settings?: LogServiceConfig, stateName?: string) {

        settings ??= LogService._defaultState;
        stateName ??= 'primaryState';

        Object.keys(settings).forEach((key: string) => {
            // using a bang operator since we know settings will be defined
            LogService[key] = settings![key] ?? LogService[key];
        });


        if(settings.toggleState) {
            LogService.saveState('toggleState', settings.toggleState);
        }

        LogService.saveState(stateName, settings);
        
        if(LogService.persistCurrentState) {
            const currentState = localStorage.getItem('currentStateName');

            if(currentState) {
                
                // LogService.saveState(currentState, settings);

                // const storedStates = localStorage.getItem('logServiceStates');

                // Object.assign(LogService._serviceStates, JSON.parse(storedStates ?? '{}'));

                LogService.loadState(currentState);
            }
        }
        else {
            LogService.currentStateName = stateName;
        }
        
        LogService.toggleKeyListener(true);

    }

    /**
     * Determines if a value is a LogLevel.
     * 
     * @param value - the value to check
     * @returns true if the value is a LogLevel, false otherwise
     */
    public static isAccessMode(value: unknown): value is LogAccessMode {
        return value === 'whitelist' || value === 'blacklist' || value === 'none';
    }

    /**
     * Asserts that a condition is true. 
     * Writes an error message to the console if the assertion is false. 
     * If the assertion is true, nothing happens.
     * 
     * @param condition - boolean expression to evaluate
     * @param caller - the object that is asserting the condition
     * @param messages - additional messages to log
     */
    public static assert(caller: LoggableObject, condition: boolean, ...messages: unknown[]) {
        LogService.writeLog(caller, 'assert', LogService._getCallerFunctionName(), condition, ...messages);
    }
    
    /**
     * Logs a message at the debug level.
     * 
     * @param caller - the object that is logging the message
     * @param messages - the messages to log
     */
    public static debug(caller: LoggableObject, ...messages: unknown[]) {
        LogService.writeLog(caller, 'debug', LogService._getCallerFunctionName(), ...messages);
    }
    
    /**
     * Logs a message at the error level.
     * 
     * @param caller - the object that is logging the message
     * @param messages - the messages to log
     */
    public static error(caller: LoggableObject, ...messages: unknown[]) {
        LogService.writeLog(caller, 'error', LogService._getCallerFunctionName(), ...messages);
    }
    
    /**
     * Logs a message at the info level.
     * 
     * @param caller - the object that is logging the message
     * @param messages - the messages to log
     */
    public static info(caller: LoggableObject, ...messages: unknown[]) {
        LogService.writeLog(caller, 'info', LogService._getCallerFunctionName(), ...messages);
    }
    
    /**
     * Logs a message at the log level.
     * 
     * @param caller - the object that is logging the message
     * @param messages - the messages to log
     */
    public static log(caller: LoggableObject, ...messages: unknown[]) {
        LogService.writeLog(caller, 'log', LogService._getCallerFunctionName(), ...messages);
    }
    
    /**
     * Logs a message at the trace level.
     * 
     * @param caller - the object that is logging the message
     * @param messages - the messages to log
     */
    public static trace(caller: LoggableObject, ...messages: unknown[]) {
        LogService.writeLog(caller, 'trace', LogService._getCallerFunctionName(), ...messages);
    }
    
    /**
     * Logs a message at the warn level.
     * 
     * @param caller - the object that is logging the message
     * @param messages - the messages to log
     */
    public static warn(caller: LoggableObject, ...messages: unknown[]) {
        LogService.writeLog(caller, 'warn', LogService._getCallerFunctionName(), ...messages);
    }

    /**
     * Writes a message to the console. The message is prefixed with the log level, the
     * local ID of the calling object, and the name of the function that is logging the message.
     * 
     * @param caller - the object that is logging the message
     * @param levelOrFunct - {@link LogLevel} of the message
     * @param functionName - the name of the function that is logging the message
     * @param messages - additional messages to log
     */
    public static writeLog(caller: LoggableObject, levelOrFunct: ConsoleFunctName | LogLevel, callingFunctName: string, ...args: unknown[]): void {

        if(isConsoleKey(levelOrFunct)) {
            const { getArgs, logLevel, contextStringInArgs } = consoleFunctDefMap[levelOrFunct];
    
            if(LogService.canLog(logLevel, caller, callingFunctName)) {
                const logFunction = console[levelOrFunct];
                const contextString = contextStringInArgs ? 
                    `\n${LogLevel[logLevel].toUpperCase()}::${caller.LOCAL_ID}::${callingFunctName}::` :
                    `\n${LogLevel[logLevel].toUpperCase()}::${caller.LOCAL_ID}::${callingFunctName}::${levelOrFunct}::`;
    
                const logArgs = contextStringInArgs ? getArgs(...[contextString, ...args]) : getArgs(...args);
    
                if(!contextStringInArgs) {
                    const levelConsoleFunctName = logLevelConsoleFunctMap[logLevel] ?? 'debug';
                    const levelLogFunction = console[levelConsoleFunctName];
                    if(isConsoleFunction(levelLogFunction, levelConsoleFunctName)) {
                        levelLogFunction(contextString, ...logArgs);
                    }
                }
                if(isConsoleFunction(logFunction, levelOrFunct)) {
                    logFunction(...logArgs);
                }
            }
        }
    }
    
    // #endregion public methods
    
    
    // #region protected methods
    
    // #endregion protected methods
    
    
    // #region private methods

    /**
     * Gets the name of the function that called the logging function.
     * 
     * @returns the name of the function that called the logging function
     */
    private static _getCallerFunctionName(functIndex: number = 3): string {
        const error = new Error();
        // in stack trace, line [2] pertains to the caller
        const stacktraceLine = error.stack?.split('\n')[functIndex] ?? 'unknown';
        const functNameRegex: RegExp = /at (.*) \(/;
        const results = functNameRegex.exec(stacktraceLine);
        const functName = results ? results[1] : 'unknown'; 
        return functName;
    }

    /**
     * Listens for the report key to be pressed and reports the current state of the LogService.
     * 
     * @param event - the keyup event
     */
    private static _keyListenHandler(event: KeyboardEvent) {
        if(event.key === LogService.reportKey && LogService.enableReportListener) {
            console.log('\nLOGSERVICE SETTINGS:');
            for(const key in LogService) {
                const prop = LogService[key];
                if(typeof prop !== 'function' && key !== 'ɵprov') {
                    console.log(key, prop);
                }
            }
        }
        else if(event.key === LogService.toggleKey && LogService.enableToggleListener) {
            const { currentStateName, defaultStateName } = LogService;
            if(currentStateName !== 'toggleState') {
                LogService.loadState('toggleState');
            }
            else {
                LogService._serviceStates[defaultStateName] != null ? 
                    LogService.loadState(LogService.defaultStateName) : 
                    LogService.loadState('defaultState');
            }
        }
        else {
            for(const key in LogService.customKeyListeners) {
                if(event.key === key) {
                    LogService.customKeyListeners[key](event);
                }
            }
        }
    }

    private static _updateLocalStorage(saveStateName: boolean = false): void {
        if(LogService.persistCurrentState) {
            localStorage.setItem('logServiceStates', JSON.stringify(LogService._serviceStates));
            if(saveStateName) {
                localStorage.setItem('currentStateName', LogService.currentStateName);
            }
        }
    }
    
    // #endregion private methods
}

/**
 * Parses a function and returns an array containing the names of its arguments
 * 
 * @returns - Array of argument names
 * @param fn - The function to parse
 */
export function getArgNames(fn: GeneralFunction<unknown>): string[] {
    // First match everything inside the function argument parentheses.
    const functStr = fn.toString();
    if(functStr) {
        const args = functStr.match(/^\w+\((.+?)\)\s*{/)?.[1];
     
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
 * Clears the console terminal 
 * 
 * LogLevel = {@link LogLevel.Debug}
 * 
 * @param consoleFunct - {@link ConsoleFuncts.Clear} 
 */
export function Loggable(consoleFunct?: ConsoleFuncts.Clear): GeneralFunction<PropertyDescriptor>;

/** 
 * Exits the current inline group in the console 
 * 
 * LogLevel = {@link LogLevel.Debug}
 * 
 * @param consoleFunct - {@link ConsoleFuncts.GroupEnd} 
 */
export function Loggable(consoleFunct?: ConsoleFuncts.GroupEnd): GeneralFunction<PropertyDescriptor>;

/** 
 * Logs the number of times that this particular call to console.count() has been called 
 * 
 * LogLevel = {@link LogLevel.Debug}
 * 
 * @param consoleFunct - {@link ConsoleFuncts.Count} 
 * @param label - An optional string containing the label for the count
 */
export function Loggable(consoleFunct?: ConsoleFuncts.Count, label?: string): GeneralFunction<PropertyDescriptor>;

/** 
 * Resets the number of times that this particular call to console.count() has been called 
 * 
 * LogLevel = {@link LogLevel.Debug}
 * 
 * @param consoleFunct - {@link ConsoleFuncts.CountReset} 
 * @param label - An optional string containing the label for the count
 */
export function Loggable(consoleFunct?: ConsoleFuncts.CountReset, label?: string): GeneralFunction<PropertyDescriptor>;

/**
 * Creates a new inline group in the Web console log, causing any subsequent 
 * console messages to be indented by an additional level, until console.groupEnd()
 * is called.
 * 
 * LogLevel = {@link LogLevel.Debug}
 * 
 * @param consoleFunct - {@link ConsoleFuncts.Group}
 * @param label - An optional string containing the label for the group
 */
export function Loggable(consoleFunct?: ConsoleFuncts.Group, label?: string): GeneralFunction<PropertyDescriptor>;

/**
 * Creates a new inline group in the Web console log, causing any subsequent 
 * console messages to be indented by an additional level, until console.groupEnd() 
 * is called. The new group is created collapsed.
 * 
 * LogLevel = {@link LogLevel.Debug}
 * 
 * @param consoleFunct - {@link ConsoleFuncts.GroupCollapsed}
 * @param label - An optional string containing the label for the group
 */
export function Loggable(consoleFunct?: ConsoleFuncts.GroupCollapsed, label?: string): GeneralFunction<PropertyDescriptor>;

/**
 * Starts a timer in the console. Calling console.timeEnd() with the same name will stop 
 * the timer and log the elapsed time in milliseconds.
 * 
 * LogLevel = {@link LogLevel.Debug}
 * 
 * @param consoleFunct - {@link ConsoleFuncts.Time}
 * @param label - An optional string containing the label for the timer
 */
export function Loggable(consoleFunct?: ConsoleFuncts.Time, label?: string): GeneralFunction<PropertyDescriptor>;

/**
 * Stops a timer that was previously started by calling console.time() and logs the elapsed time.
 * 
 * LogLevel = {@link LogLevel.Debug}
 * 
 * @param consoleFunct - {@link ConsoleFuncts.TimeEnd}
 * @param label - An optional string containing the label for the timer
 */
export function Loggable(consoleFunct?: ConsoleFuncts.TimeEnd, label?: string): GeneralFunction<PropertyDescriptor>;

/**
 * Adds a timestamp to the console. This lets you log the time at which a particular piece of code was executed.
 * 
 * LogLevel = {@link LogLevel.Experimental}
 * 
 * @param consoleFunct - {@link ConsoleFuncts.TimeStamp}
 * @param label - An optional string containing the label for the timestamp
 */
export function Loggable(consoleFunct?: ConsoleFuncts.TimeStamp, label?: string): GeneralFunction<PropertyDescriptor>;

/**
 * Displays an interactive list of the properties of the specified JavaScript object. 
 * The output is presented as a hierarchical listing with disclosure triangles that let
 * you see the contents of child objects.
 * 
 * LogLevel = {@link LogLevel.Debug}
 * 
 * @param consoleFunct - {@link ConsoleFuncts.Dir}
 * @param obj - An object to log
 */
export function Loggable(consoleFunct?: ConsoleFuncts.Dir, obj?: object): GeneralFunction<PropertyDescriptor>;

/**
 * Displays an XML/HTML Element representation of the specified object if possible 
 * or the JavaScript Object view if it is not.
 * 
 * LogLevel = {@link LogLevel.Debug}
 * 
 * @param consoleFunct - {@link ConsoleFuncts.Dirxml}
 * @param obj - An object to log
 */
export function Loggable(consoleFunct?: ConsoleFuncts.Dirxml, obj?: object): GeneralFunction<PropertyDescriptor>;

/**
 * Displays tabular data as a table. This function takes one mandatory argument data, 
 * which must be an array or an object, and one additional optional parameter columns.
 * 
 * LogLevel = {@link LogLevel.Debug}
 * 
 * @param consoleFunct - {@link ConsoleFuncts.Table}
 * @param data - An object or array to log
 * @param columns - An array of strings containing the names of columns to include in the output
 */
export function Loggable(consoleFunct?: ConsoleFuncts.Table, data?: object | unknown[], columns?: string[]): GeneralFunction<PropertyDescriptor>;

/**
 * One of the standard logging function from {@link Console} to use for logging.
 * 
 * @param consoleFunct - {@link ConsoleFunctName} name of the function to call
 * @param logArgs - arguments to be passed to the logging function
 */
export function Loggable(consoleFunct?: ConsoleFunctName, ...logArgs: unknown[]): GeneralFunction<PropertyDescriptor>;

/**
 * Logs a message at the specified log level. If no log level is provided, the default
 * value is {@link LogLevel.Debug}.
 * 
 * @param logLevel - {@link LogLevel} - the log level of the message
 * @param logArgs - additional arguments to pass to the logging function
 */
export function Loggable(logLevel?: LogLevel, ...logArgs: unknown[]): GeneralFunction<PropertyDescriptor>;

/**
 * Decorator function factory for logging function calls. Can be passed a specific logging level 
 * or the name of a console function, as well as additional arguments to pass to the logging function.
 * If no arguments are passed, the default value is {@link LogLevel.Debug}.
 * 
 * @param levelOrFunct - {@link LogLevel} or {@link ConsoleFunctName}
 * @param logArgs - additional arguments to pass to the logging function
 * @returns - A decorator function
 */
export function Loggable(levelOrFunct?: LogLevel | ConsoleFunctName, ...logArgs: unknown[]): GeneralFunction<PropertyDescriptor> {
    
    return function (target: LoggableObject, propertyKey: string, descriptor: PropertyDescriptor) {
        const originalMethod = descriptor.value; 
        descriptor.value = function (this: LoggableObject, ...args: unknown[]) {
            
            const methodArgNames = getArgNames(originalMethod);
            
            const methodArgsOutput: WeakObject = {};
            methodArgNames.forEach((argName, index) => {
                if(argName.startsWith('...')) {
                    methodArgsOutput[`${argName}`] = args.slice(index);
                    return;
                }
                
                methodArgsOutput[`${argName}`] = args[index];
            });

            let returnVal: unknown = null;

            levelOrFunct ??= LogLevel.Debug;

            if(isConsoleKey(levelOrFunct)) {
                LogService.writeLog(this, levelOrFunct, propertyKey, ...logArgs, methodArgsOutput);
                returnVal = originalMethod.apply(this, args);
            }
            else {
                const levelFunct = logLevelConsoleFunctMap[levelOrFunct];
                if(levelFunct) {
                    LogService.writeLog(this, levelFunct, propertyKey, 'entering;', '\nargs:\n', methodArgsOutput, ...logArgs);
        
                    returnVal = originalMethod.apply(this, args);
        
                    LogService.writeLog(this, levelFunct, propertyKey, 'exiting;', 'returnVal:', returnVal, ...logArgs);
                }
            }

            return returnVal;
        };
        

        return descriptor;
    };
}