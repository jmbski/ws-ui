import { Injectable } from '@angular/core';

/**
 * Log levels in order of severity.
 */
export enum LogLevel {
    Trace = 0,
    Debug = 1,
    Info = 2,
    Log = 3,
    Warn = 4,
    Error = 5,
    Assert = 6,
    None = 7
}

/**
 * Interface for objects that can be logged.
 */
export interface LoggableObject {
    LOCAL_ID: string;
    localLogLevel?: LogLevel;
    canLog?: boolean;
}

/**
 * Interface for log settings.
 */
export type LogSettings = Partial<LoggableObject>;

export interface LogServiceConfig {
    logLevel?: LogLevel;
    useLocalLogLevel?: boolean;
    useCanLog?: boolean;
    useStrictLocalLogLevel?: boolean;
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
    public static useStrictLocalLogLevel: boolean = true;
    
    // #endregion public properties
    
    
    // #region private properties
    
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

        if(canLog === false && LogService.useCanLog) {
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
    public static updateLogServiceSettings(settings: LogServiceConfig) {
        
        LogService.logLevel = settings.logLevel ?? LogService.logLevel;
        LogService.useCanLog = settings.useCanLog ?? LogService.useCanLog;
        LogService.useLocalLogLevel = settings.useLocalLogLevel ?? LogService.useLocalLogLevel;
        LogService.useStrictLocalLogLevel = settings.useStrictLocalLogLevel ?? LogService.useStrictLocalLogLevel;
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
    public static assert(condition: boolean, caller: LoggableObject, ...messages: unknown[]) {
        if(this.canLog(LogLevel.Assert, caller)) {
            console.assert(condition, `${caller.LOCAL_ID}::${LogService._getCallerFunctionName()}::`, ...messages);
        }
    }
    
    /**
     * Logs a message at the debug level.
     * 
     * @param caller - the object that is logging the message
     * @param messages - the messages to log
     */
    public static debug(caller: LoggableObject, ...messages: unknown[]) {
        if(this.canLog(LogLevel.Debug, caller)) {
            console.debug(`${caller.LOCAL_ID}::${LogService._getCallerFunctionName()}::`, ...messages);
        }
    }
    
    /**
     * Logs a message at the error level.
     * 
     * @param caller - the object that is logging the message
     * @param messages - the messages to log
     */
    public static error(caller: LoggableObject, ...messages: unknown[]) {
        if(this.canLog(LogLevel.Error, caller)) {
            console.error(`${caller.LOCAL_ID}::${LogService._getCallerFunctionName()}::`, ...messages);
        }
    }
    
    /**
     * Logs a message at the info level.
     * 
     * @param caller - the object that is logging the message
     * @param messages - the messages to log
     */
    public static info(caller: LoggableObject, ...messages: unknown[]) {
        if(this.canLog(LogLevel.Info, caller)) {
            console.info(`${caller.LOCAL_ID}::${LogService._getCallerFunctionName()}::`, ...messages);
        }
    }
    
    /**
     * Logs a message at the log level.
     * 
     * @param caller - the object that is logging the message
     * @param messages - the messages to log
     */
    public static log(caller: LoggableObject, ...messages: unknown[]) {
        if(this.canLog(LogLevel.Log, caller)) {
            console.log(`${caller.LOCAL_ID}::${LogService._getCallerFunctionName()}::`, ...messages);
        }
    }
    
    /**
     * Logs a message at the trace level.
     * 
     * @param caller - the object that is logging the message
     * @param messages - the messages to log
     */
    public static trace(caller: LoggableObject, ...messages: unknown[]) {
        if(this.canLog(LogLevel.Trace, caller)) {
            console.trace(`${caller.LOCAL_ID}::${LogService._getCallerFunctionName()}::`, ...messages);
        }
    }
    
    /**
     * Logs a message at the warn level.
     * 
     * @param caller - the object that is logging the message
     * @param messages - the messages to log
     */
    public static warn(caller: LoggableObject, ...messages: unknown[]) {
        if(this.canLog(LogLevel.Warn, caller)) {
            console.warn(`${caller.LOCAL_ID}::${LogService._getCallerFunctionName()}::`, ...messages);
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
    private static _getCallerFunctionName(): string {
        const error = new Error();
        // in stack trace, line [2] pertains to the caller
        const stacktraceLine = error.stack?.split('\n')[3] ?? 'unknown';
        const functNameRegex: RegExp = /at (.*) \(/;
        const results = functNameRegex.exec(stacktraceLine);
        const functName = results ? results[1] : 'unknown'; 
        return functName;
    }
    
    // #endregion private methods
    
    
}