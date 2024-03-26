import { Injectable } from '@angular/core';
import { LogServiceConfig } from './log-service-config';
import { isBoolean } from 'lodash';
import { GeneralFunction } from '../../models/general';
import { FunctionMap } from './log-service.types';
import { LogLevel, LogAccessMode, LoggableObject, LogSettings } from './log-service.types';

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
    public static canLog(callLogLevel: LogLevel, caller: LoggableObject): boolean {
        
        const { localLogLevel, canLog } = caller;

        /** If the caller's canLog flag is false, return immediately before doing anything else */
        if(canLog === false && LogService.useCanLog) {
            return false;
        }
        
        /** Check whitelist/blacklist properties in order of priority */

        const hasAccess: boolean = [
            {accessor: 'caller', prop: caller.LOCAL_ID},
            {accessor: 'function', prop: LogService._getCallerFunctionName(4)},
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
    public static updateLocalLogSettings(caller: LoggableObject, settings: LogSettings) {
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
        }
    }

    public static loadState(stateName: string) {
        const state: LogServiceConfig | undefined = LogService._serviceStates[stateName];
        if(state) {
            LogService.currentStateName = stateName;
            console.log(`Switching to state: ${stateName}`);

            Object.keys(state).forEach((key: string) => {
                LogService[key] = state[key] ?? LogService[key];
            });

            LogService.toggleKeyListener(true);
        }
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
        LogService.writeLog(caller, LogLevel.Assert, LogService._getCallerFunctionName(), condition, ...messages);
    }
    
    /**
     * Logs a message at the debug level.
     * 
     * @param caller - the object that is logging the message
     * @param messages - the messages to log
     */
    public static debug(caller: LoggableObject, ...messages: unknown[]) {
        LogService.writeLog(caller, LogLevel.Debug, LogService._getCallerFunctionName(), ...messages);
    }
    
    /**
     * Logs a message at the error level.
     * 
     * @param caller - the object that is logging the message
     * @param messages - the messages to log
     */
    public static error(caller: LoggableObject, ...messages: unknown[]) {
        LogService.writeLog(caller, LogLevel.Error, LogService._getCallerFunctionName(), ...messages);
    }
    
    /**
     * Logs a message at the info level.
     * 
     * @param caller - the object that is logging the message
     * @param messages - the messages to log
     */
    public static info(caller: LoggableObject, ...messages: unknown[]) {
        LogService.writeLog(caller, LogLevel.Info, LogService._getCallerFunctionName(), ...messages);
    }
    
    /**
     * Logs a message at the log level.
     * 
     * @param caller - the object that is logging the message
     * @param messages - the messages to log
     */
    public static log(caller: LoggableObject, ...messages: unknown[]) {
        LogService.writeLog(caller, LogLevel.Log, LogService._getCallerFunctionName(), ...messages);
    }
    
    /**
     * Logs a message at the trace level.
     * 
     * @param caller - the object that is logging the message
     * @param messages - the messages to log
     */
    public static trace(caller: LoggableObject, ...messages: unknown[]) {
        LogService.writeLog(caller, LogLevel.Trace, LogService._getCallerFunctionName(), ...messages);
    }
    
    /**
     * Logs a message at the warn level.
     * 
     * @param caller - the object that is logging the message
     * @param messages - the messages to log
     */
    public static warn(caller: LoggableObject, ...messages: unknown[]) {
        LogService.writeLog(caller, LogLevel.Warn, LogService._getCallerFunctionName(), ...messages);
    }

    /**
     * Writes a message to the console. The message is prefixed with the log level, the
     * local ID of the calling object, and the name of the function that is logging the message.
     * 
     * @param caller - the object that is logging the message
     * @param logLevel - {@link LogLevel} of the message
     * @param functionName - the name of the function that is logging the message
     * @param messages - additional messages to log
     */
    public static writeLog(caller: LoggableObject, logLevel: LogLevel, functionName: string, ...messages: unknown[]): void {
        if(LogService.canLog(logLevel, caller)) {
            if(logLevel === LogLevel.Assert) {
                const [condition, ...additionalMessages] = messages;
                if(isBoolean(condition)) {
                    console.assert(condition, `ASSERT::${caller.LOCAL_ID}::${functionName}::`, ...additionalMessages);
                }
            }
            else {
                /* ignore ts-lint for this since we know the console object has the functions and
                we are restricting the keys to known functions of it */

                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const logFunction = (console as any)[LogLevel[logLevel].toLowerCase()];
                
                logFunction(`${LogLevel[logLevel].toUpperCase()}::${caller.LOCAL_ID}::${functionName}::`, ...messages);
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
            const { currentStateName } = LogService;
            if(currentStateName !== 'toggleState') {
                LogService.loadState('toggleState');
            }
            else {
                LogService._serviceStates.latestState != null ? 
                    LogService.loadState('latestState') : 
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
 * Decorator for logging messages to the console.
 * 
 * @param logLevel - {@link LogLevel} of the message
 * @param messages - additional messages to log
 * @returns - a function that logs messages to the console
 */
export function Loggable(logLevel?: LogLevel, ...messages: unknown[]): GeneralFunction<PropertyDescriptor> {
    
    return function (target: LoggableObject, propertyKey: string, descriptor: PropertyDescriptor) {
        const originalMethod = descriptor.value; 
        descriptor.value = function (this: LoggableObject, ...args: unknown[]) {
            
            const argNames = getArgNames(originalMethod);
            const argsOutput: unknown[] = [];
            argNames.forEach((argName, index) => {
                if(argName.startsWith('...')) {
                    argsOutput.push(`${argName}:`, args.slice(index));
                    return;
                }
                argsOutput.push(`${argName}:`, args[index]);
            });

            LogService.writeLog(this, logLevel ?? LogLevel.Debug, propertyKey, 'entering', ...argsOutput, ...messages);

            const returnVal = originalMethod.apply(this, args);

            LogService.writeLog(this, logLevel ?? LogLevel.Debug, propertyKey, 'exiting', 'returnVal:', returnVal, ...messages);

            return returnVal;
        };
        

        return descriptor;
    };
}