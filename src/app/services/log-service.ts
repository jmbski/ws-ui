import { Injectable } from '@angular/core';
import { LogServiceConfig } from './log-service-config';

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

/**
 * Access modes for white/black lists.
 */
export type LogAccessMode = 'whitelist' | 'blacklist' | 'none';

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

    static [key: string]: unknown;
    
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
    public static updateLogServiceSettings(settings: LogServiceConfig) {
        Object.keys(settings).forEach((key: string) => {
            LogService[key] = settings[key] ?? LogService[key];
        });

        if(settings.enableReportListener) {
            this.toggleReportListener(true);
        }
    }

    /**
     * Toggles the report listener on or off.
     * 
     * @param toggleValue - whether or not to toggle the report listener
     */
    public static toggleReportListener(toggleValue?: boolean) {
        toggleValue = toggleValue ?? !this._reportListener;
        if(!toggleValue) {
            window.removeEventListener('keyup', LogService._reportListenHandler);
            this._reportListener = undefined;
        } 
        else {
            window.addEventListener('keyup', this._reportListenHandler);
        }
    }

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
    public static assert(condition: boolean, caller: LoggableObject, ...messages: unknown[]) {
        if(this.canLog(LogLevel.Assert, caller)) {
            console.assert(condition, `ASSERT::${caller.LOCAL_ID}::${LogService._getCallerFunctionName()}::`, ...messages);
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
            console.debug(`DEBUG::${caller.LOCAL_ID}::${LogService._getCallerFunctionName()}::`, ...messages);
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
            console.error(`ERROR::${caller.LOCAL_ID}::${LogService._getCallerFunctionName()}::`, ...messages);
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
            console.info(`INFO::${caller.LOCAL_ID}::${LogService._getCallerFunctionName()}::`, ...messages);
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
            console.log(`LOG::${caller.LOCAL_ID}::${LogService._getCallerFunctionName()}::`, ...messages);
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
            console.trace(`TRACE::${caller.LOCAL_ID}::${LogService._getCallerFunctionName()}::`, ...messages);
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
            console.warn(`WARN::${caller.LOCAL_ID}::${LogService._getCallerFunctionName()}::`, ...messages);
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
    private static _reportListenHandler(event: KeyboardEvent) {
        if(event.key === LogService.reportKey) {
            console.log('\nLOGSERVICE SETTINGS:');
            for(const key in LogService) {
                const prop = LogService[key];
                if(typeof prop !== 'function' && key !== 'ɵprov') {
                    console.log(key, prop);
                }
            }
        }
    }
    
    // #endregion private methods
    
    
}