import { Injectable } from '@angular/core';
import { FunctionMap, WeakObject } from 'warskald-ui/models';
import { LogServiceConfig } from './log-service-config';
import { ConsoleFuncts, LogLevels, LogSvcIgnoredStrings$, logLevelConsoleFunctMap } from './log-service-constants';
import { isLogLevel, isConsoleKey, isConsoleFunction } from './log-service-typeguards';
import { ConsoleFunctName, ConsoleFunctLevelMap, LogAccessMode, LocalLogSettings, ConsoleDirOptions, LogLevelOrFunct } from './log-service-types';
import { consoleFunctDefMap } from './log-service-utils';
import { isNumber, isString, isWeakObject } from 'warskald-ui/type-guards';


export let DefaultLogFunct: ConsoleFunctName = ConsoleFuncts.Info;

/**
 * Service for logging messages to the console.
 */
@Injectable({
    providedIn: 'root'
})
export class EzLogService {

    // #region public properties

    /** 
     * The log level for the application.
     */
    public static logLevel: number = LogLevels.Trace;

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
     * If true, the service will log getter calls.
     */
    public static logGetters?: boolean = true;

    /**
     * If true, the service will log setter calls.
     */
    public static logSetters?: boolean = true;

    /**
     * If true, the service will show the arguments passed in for the console function in addition to the message.
     */
    public static showConsoleFunctArgs?: boolean;

    /**
     * Object use to customize console function behavior.
     */
    public static customConsoleFunctDefs?: ConsoleFunctLevelMap;

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
    public static logLevelWhiteList: LogLevels[] = [];

    /**
     * The list of log levels that are not allowed to be logged.
     */
    public static logLevelBlackList: LogLevels[] = [];

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
        logLevel: LogLevels.Trace,
        useLocalLogLevel: true,
        useCanLog: true,
        useStrictLocalLogLevel: false,
        logGetters: true,
        logSetters: true,
        additionalServiceStates: {},
        customConsoleFunctDefs: undefined,
        defaultLogFunct: ConsoleFuncts.Info,
        ignoredStrings: [
            'entering;',
            'entering',
            'exiting;',
            'exiting',
            '\nargs:\n',
            'setting',
            '\nsetting\n',
            'getting',
            '\ngetting\n',
        ],
        showConsoleFunctArgs: true,
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
        enableReportListener: true,
        toggleKey: '`',
        enableToggleListener: true,
        customKeyListeners: {},
        persistCurrentState: true,
        additonalServiceStates: {},
        defaultStateName: 'defaultState',
        toggleState: {},
    };

    /**
     * Collection of states to switch between
     */
    private static _serviceStates: Record<string, LogServiceConfig> = {
        'defaultState': EzLogService._defaultState,
    };

    /**
     * Map of console function definitions.
     */
    private static _consoleFunctDefMap: ConsoleFunctLevelMap = Object.assign({}, consoleFunctDefMap);

    // private static _envSettings: LogServiceConfig = logServiceConfig;
    
    // #endregion private properties
    
    
    // #region getters/setters

    /**
     * Additional states that the service can switch between.
     */
    static get additionalServiceStates(): Record<string, LogServiceConfig> {
        return EzLogService._serviceStates;
    }
    static set additionalServiceStates(states: Record<string, LogServiceConfig> | undefined) {
        if(states) {
            Object.keys(states).forEach((key: string) => {
                EzLogService._serviceStates[key] = states[key];
            });
        }
    }

    /**
     * The default log function for the application.
     */
    /**
     * The default log function for the application.
     */
    static get defaultLogFunct(): ConsoleFunctName {
        return DefaultLogFunct;
    }
    static set defaultLogFunct(input: ConsoleFunctName) {
        DefaultLogFunct = input;
    }

    /**
     * Array of strings to ignore when getting string args for a console function.
     */
    static get ignoredStrings(): string[] {
        return LogSvcIgnoredStrings$.getValue();
    }
    static set ignoredStrings(input: string[]) {
        LogSvcIgnoredStrings$.next(input);
    }
    
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
    public static canLog(callLogLevel: LogLevels, caller: unknown, functName: string): boolean {
        
        if(isWeakObject(caller)) {
            const { localLogLevel, canLog } = caller;
    
            /** If the caller's canLog flag is false, return immediately before doing anything else */
            if(canLog === false && EzLogService.useCanLog) {
                return false;
            }
            
            /** Check whitelist/blacklist properties in order of priority */
    
            const hasAccess: boolean = [
                {accessor: 'caller', prop: caller.LOCAL_ID},
                {accessor: 'function', prop: functName},
                {accessor: 'logLevel', prop: callLogLevel},
            ].every(({accessor, prop}) => {
                
                const accessMode = EzLogService[`${accessor}AccessMode`];
                let allowed: boolean = true;
    
                if(<LogAccessMode>accessMode !== 'none') {
                    const whitelist = EzLogService[`${accessor}WhiteList`];
                    const blacklist = EzLogService[`${accessor}BlackList`];
                    
                    allowed = accessMode === 'whitelist' ?
                        (<unknown[]>whitelist).includes(prop) :
                        !(<unknown[]>blacklist).includes(prop);
                }
    
                return allowed;
            });
    
            if(!hasAccess) {
                return false;
            }
            
            let logLevel = EzLogService.logLevel;
    
            if(EzLogService.useLocalLogLevel) {
                logLevel = EzLogService.useStrictLocalLogLevel ? 
                    Math.max(EzLogService.logLevel, <number>localLogLevel ?? LogLevels.Trace) :
                    Math.min(EzLogService.logLevel, <number>localLogLevel ?? LogLevels.Trace);
            }
    
            return callLogLevel >= logLevel;
        }
        return false;
    }

    /**
     * Updates the log settings of the calling object.
     * 
     * @param caller - the object that is updating its log settings
     * @param settings - the new log settings
     */
    public static updateLocalLogSettings(caller: unknown, settings: LocalLogSettings) {
        if(isWeakObject(caller)) {
            const { canLog, localLogLevel } = settings;
            caller.canLog = canLog ?? caller.canLog;
            caller.localLogLevel = localLogLevel ?? caller.localLogLevel;
    
            EzLogService.debug(caller, 'entering', settings);
    
            Object.assign(caller, settings);
    
            EzLogService.debug(caller, 'exiting', caller);
        }
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
            EzLogService[key] = settings[key] ?? EzLogService[key];
        });

        EzLogService.saveState(stateName, settings);

        EzLogService.currentStateName = stateName ?? 'latestState';

        if(settings.toggleState) {
            EzLogService.saveState('toggleState', settings.toggleState);
        }

        if(settings.customConsoleFunctDefs) {
            EzLogService.updateConsoleFunctDefMap(settings.customConsoleFunctDefs);
        }
        
        EzLogService.toggleKeyListener(true);
    }

    /**
     * @param functDefMap - a {@link ConsoleFunctLevelMap} to update the default console function definitions
     */
    public static updateConsoleFunctDefMap(functDefMap: Partial<ConsoleFunctLevelMap>) {
        EzLogService._consoleFunctDefMap = Object.assign({}, consoleFunctDefMap, functDefMap);
    }

    /**
     * Saves a configuration of the state of the service settings.
     * 
     * @param stateName - the name of the state to save
     */
    public static saveState(stateName?: string, state?: LogServiceConfig) {
        stateName ??= 'latestState';
        state ??= {
            logLevel: EzLogService.logLevel,
            useLocalLogLevel: EzLogService.useLocalLogLevel,
            useCanLog: EzLogService.useCanLog,
            useStrictLocalLogLevel: EzLogService.useStrictLocalLogLevel,
            callerWhiteList: EzLogService.callerWhiteList,
            callerBlackList: EzLogService.callerBlackList,
            callerAccessMode: EzLogService.callerAccessMode,
            functionWhiteList: EzLogService.functionWhiteList,
            functionBlackList: EzLogService.functionBlackList,
            functionAccessMode: EzLogService.functionAccessMode,
            logLevelWhiteList: EzLogService.logLevelWhiteList,
            logLevelBlackList: EzLogService.logLevelBlackList,
            logLevelAccessMode: EzLogService.logLevelAccessMode,
            reportKey: EzLogService.reportKey,
            enableReportListener: EzLogService.enableReportListener,
            toggleKey: EzLogService.toggleKey,
            enableToggleListener: EzLogService.enableToggleListener,
            customKeyListeners: EzLogService.customKeyListeners,
        };

        state = Object.assign({}, EzLogService._defaultState, state);


        if(stateName !== 'defaultState') {
            EzLogService._serviceStates[stateName] = state;
            EzLogService._updateLocalStorage();
        }
    }

    /**
     * Saves multiple states of the service settings.
     * 
     * @param states - the states to save
     */
    public static saveStates(states: Record<string, LogServiceConfig>) {
        Object.keys(states).forEach((key: string) => {
            EzLogService.saveState(key, states[key]);
        });
    }

    /**
     * Loads a saved state of the service settings.
     * 
     * @param stateName - the name of the state to load
     */
    public static loadState(stateName: string) {
        const state: LogServiceConfig | undefined = EzLogService._serviceStates[stateName];
        if(state) {
            EzLogService.currentStateName = stateName;
            console.log(`Switching to state: ${stateName}`);

            EzLogService._updateLocalStorage(true);

            Object.keys(state).forEach((key: string) => {
                EzLogService[key] = state[key] ?? EzLogService[key];
            });

            if(state.customConsoleFunctDefs) {
                EzLogService.updateConsoleFunctDefMap(state.customConsoleFunctDefs);
            }

            EzLogService.toggleKeyListener(true);
        }
    }

    public static deleteState(stateName: string) {
        delete EzLogService._serviceStates[stateName];
        EzLogService._updateLocalStorage();
    }

    /**
     * Toggles the report listener on or off.
     * 
     * @param toggleValue - whether or not to toggle the report listener
     */
    public static toggleKeyListener(toggleValue?: boolean) {
        toggleValue ??= !EzLogService.keyListenerActive;
        
        if(!toggleValue) {
            window.removeEventListener('keyup', EzLogService._keyListenHandler);
            EzLogService.keyListenerActive = false;
        } 
        else {
            // remove the listener first in case it is already active
            window.removeEventListener('keyup', EzLogService._keyListenHandler);
            window.addEventListener('keyup', EzLogService._keyListenHandler);
        }
    }

    public static allowCaller(caller: unknown) {
        if(isWeakObject(caller)) {
            const { LOCAL_ID } = caller;
            if(isString(LOCAL_ID)) {
                EzLogService.callerWhiteList.push(LOCAL_ID);
            }
        }
    }

    public static blockCaller(caller: unknown) {
        if(isWeakObject(caller)) {
            const { LOCAL_ID } = caller;
            if(isString(LOCAL_ID)) {
                EzLogService.callerBlackList.push(LOCAL_ID);
            }
        }
    }

    public static allowFunction(functName: string) {
        EzLogService.functionWhiteList.push(functName);
    }

    public static blockFunction(functName: string) {
        EzLogService.functionBlackList.push(functName);
    }

    public static allowLogLevel(logLevel: LogLevels) {
        EzLogService.logLevelWhiteList.push(logLevel);
    }

    public static blockLogLevel(logLevel: LogLevels) {
        EzLogService.logLevelBlackList.push(logLevel);
    }

    /**
     * Used to set the initial settings for the  log service.
     * 
     * @param settings - the settings to initialize the service with
     * @param stateName - the name of the state to save
     */
    public static initialize(settings?: LogServiceConfig, stateName?: string) {

        settings ??= EzLogService._defaultState;
        stateName ??= 'primaryState';

        Object.keys(settings).forEach((key: string) => {
            // using a bang operator since we know settings will be defined
            EzLogService[key] = settings![key] ?? EzLogService[key];
        });

        if(settings.customConsoleFunctDefs) {
            EzLogService.updateConsoleFunctDefMap(settings.customConsoleFunctDefs);
        }


        if(settings.toggleState) {
            EzLogService.saveState('toggleState', settings.toggleState);
        }

        EzLogService.saveState(stateName, settings);
        
        if(EzLogService.persistCurrentState) {
            const currentState = localStorage.getItem('currentStateName');

            if(currentState) {
                
                // LogService.saveState(currentState, settings);

                // const storedStates = localStorage.getItem('logServiceStates');

                // Object.assign(LogService._serviceStates, JSON.parse(storedStates ?? '{}'));

                EzLogService.loadState(currentState);
            }
        }
        else {
            EzLogService.currentStateName = stateName;
        }
        
        EzLogService.toggleKeyListener(true);

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
    public static assert(caller: unknown, condition: boolean, ...messages: unknown[]) {
        EzLogService.writeLog(caller, 'assert', EzLogService._getCallerFunctionName(), condition, ...messages);
    }

    /**
     * Clears the console.
     */
    public static clear(caller: unknown) {
        EzLogService.writeLog(caller, 'clear', EzLogService._getCallerFunctionName());
    }

    /**
     * Logs the number of times that count() has been called with the same label.
     * 
     * @param caller - the object that is logging the message
     * @param label - the label to log
     */
    public static count(caller: unknown, label?: string) {
        EzLogService.writeLog(caller, 'count', EzLogService._getCallerFunctionName(), label);
    }

    /**
     * Resets the count for the label.
     * 
     * @param caller - the object that is logging the message
     * @param label - the label to reset
     */
    public static countReset(caller: unknown, label?: string) {
        EzLogService.writeLog(caller, 'countReset', EzLogService._getCallerFunctionName(), label);
    }
    
    /**
     * Logs a message at the debug level.
     * 
     * @param caller - the object that is logging the message
     * @param messages - the messages to log
     */
    public static debug(caller: unknown, callingFunct: string, ...messages: unknown[]) {
        
        EzLogService.writeLog(caller, 'debug', callingFunct, ...messages);
    }

    /**
     * Displays an interactive list of the properties of the specified JavaScript object. 
     * The output is presented as a hierarchical listing with disclosure triangles that let
     * you see the contents of child objects.
     * 
     * @param caller - the object that is logging the message
     * @param obj - the object to log
     * @param options - the options for the dir function
     */
    public static dir(caller: unknown, obj: WeakObject, options?: ConsoleDirOptions) {
        EzLogService.writeLog(caller, 'dir', EzLogService._getCallerFunctionName(), obj, options);
    }

    /**
     * Displays an XML/HTML Element representation of the specified object.
     * 
     * @param caller - the object that is logging the message
     * @param obj - the object to log
     * @param options - the options for the dirxml function
     */
    public static dirxml(caller: unknown, obj: WeakObject, options?: ConsoleDirOptions) {
        EzLogService.writeLog(caller, 'dirxml', EzLogService._getCallerFunctionName(), obj, options);
    }
    
    /**
     * Logs a message at the error level.
     * 
     * @param caller - the object that is logging the message
     * @param messages - the messages to log
     */
    public static error(caller: unknown, ...messages: unknown[]) {
        EzLogService.writeLog(caller, 'error', EzLogService._getCallerFunctionName(), ...messages);
    }

    /**
     * Creates a new inline group in the console. This indents following console messages by an additional level, until console.groupEnd() is called.
     * 
     * @param caller - the object that is logging the message
     * @param label - the label to log
     */
    public static group(caller: unknown, label?: string) {
        EzLogService.writeLog(caller, 'group', EzLogService._getCallerFunctionName(), label);
    }

    /**
     * Creates a new inline group in the console. However, the new group is created as collapsed, 
     * needing to be expanded before the user can see the messages.
     * 
     * @param caller - the object that is logging the message
     * @param label - the label to log
     */
    public static groupCollapsed(caller: unknown, label?: string) {
        EzLogService.writeLog(caller, 'groupCollapsed', EzLogService._getCallerFunctionName(), label);
    }

    /**
     * Exits the current inline group in the console.
     */
    public static groupEnd(caller: unknown) {
        EzLogService.writeLog(caller, 'groupEnd', EzLogService._getCallerFunctionName());
    }
    
    /**
     * Logs a message at the info level.
     * 
     * @param caller - the object that is logging the message
     * @param messages - the messages to log
     */
    public static info(caller: unknown, ...messages: unknown[]) {
        EzLogService.writeLog(caller, 'info', EzLogService._getCallerFunctionName(), ...messages);
    }
    
    /**
     * Logs a message at the log level.
     * 
     * @param caller - the object that is logging the message
     * @param messages - the messages to log
     */
    public static log(caller: unknown, ...messages: unknown[]) {
        EzLogService.writeLog(caller, 'log', EzLogService._getCallerFunctionName(), ...messages);
    }

    /**
     * Displays tabular data as a table. This function takes one mandatory argument data, 
     * which must be an array or an object, and one additional optional parameter columns.
     * 
     * @param caller - the object that is logging the message
     * @param data - an object or array to show as a table
     * @param columns - an array of strings to use as the column headers
     */
    public static table(caller: unknown, data: unknown, columns?: string[]) {
        EzLogService.writeLog(caller, 'table', EzLogService._getCallerFunctionName(), data, columns);
    }

    /**
     * Starts a new timer. The timer is identified by the label parameter.
     * 
     * @param caller - the object that is logging the message
     * @param label - the label to log
     */
    public static time(caller: unknown, label?: string) {
        EzLogService.writeLog(caller, 'time', EzLogService._getCallerFunctionName(), label);
    }

    /**
     * Stops a timer that was previously started by calling console.time().
     * 
     * @param caller - the object that is logging the message
     * @param label - the label to log
     */
    public static timeEnd(caller: unknown, label?: string) {
        EzLogService.writeLog(caller, 'timeEnd', EzLogService._getCallerFunctionName(), label);
    }

    /**
     * Logs the value of the timer to the console.
     * 
     * @param caller - the object that is logging the message
     * @param label - the label to log
     */
    public static timeLog(caller: unknown, label?: string) {
        EzLogService.writeLog(caller, 'timeLog', EzLogService._getCallerFunctionName(), label);
    }

    /**
     * Adds a marker to the browser's Timeline or Waterfall tool.
     * 
     * @param caller - the object that is logging the message
     * @param label - the label to log
     */
    public static timeStamp(caller: unknown, label?: string) {
        EzLogService.writeLog(caller, 'timeStamp', EzLogService._getCallerFunctionName(), label);
    }
    
    /**
     * Logs a message at the trace level.
     * 
     * @param caller - the object that is logging the message
     * @param messages - the messages to log
     */
    public static trace(caller: unknown, ...messages: unknown[]) {
        EzLogService.writeLog(caller, 'trace', EzLogService._getCallerFunctionName(), ...messages);
    }
    
    /**
     * Logs a message at the warn level.
     * 
     * @param caller - the object that is logging the message
     * @param messages - the messages to log
     */
    public static warn(caller: unknown, ...messages: unknown[]) {
        EzLogService.writeLog(caller, 'warn', EzLogService._getCallerFunctionName(), ...messages);
    }

    /**
     * Writes a message to the console. The message is prefixed with the log level, the
     * local ID of the calling object, and the name of the function that is logging the message.
     * 
     * @param caller - the object that is logging the message
     * @param levelOrFunct - {@link LogLevels} of the message
     * @param functionName - the name of the function that is logging the message
     * @param messages - additional messages to log
     */
    /* public static writeLog(caller: unknown, levelOrFunct: LogLevelOrFunct = DefaultLogFunct, callingFunctName: string, ...args: unknown[]): void {
        
        if(isLogLevel(levelOrFunct)) {
            levelOrFunct = logLevelConsoleFunctMap[levelOrFunct];
        }

        if(isConsoleKey(levelOrFunct)) {
            const { getArgs, logLevel, contextStringInArgs } = EzLogService._consoleFunctDefMap[levelOrFunct];
        
            if(EzLogService.canLog(logLevel, caller, callingFunctName)) {
                const logFunction = console[levelOrFunct];
                const contextString = contextStringInArgs ? 
                    `\n${LogLevels[logLevel].toUpperCase()}::${caller.LOCAL_ID}::${callingFunctName}::` :
                    `\n${LogLevels[logLevel].toUpperCase()}::${caller.LOCAL_ID}::${callingFunctName}::${levelOrFunct}::`;
        
                const logArgs = contextStringInArgs ? getArgs(...[contextString, ...args]) : getArgs(...args);
        
                if(!contextStringInArgs) {
                    const levelConsoleFunctName = logLevelConsoleFunctMap[logLevel] ?? 'debug';
                    const levelLogFunction = console[levelConsoleFunctName];
                    if(isConsoleFunction(levelLogFunction, levelConsoleFunctName)) {
                        EzLogService.showConsoleFunctArgs ? 
                            levelLogFunction(`${contextString}::console funct args:`, ...logArgs) :
                            levelLogFunction(contextString);
                    }
                }
                if(isConsoleFunction(logFunction, levelOrFunct)) {
                    logFunction(...logArgs);
                }
            }
        }
    } */

    /**
     * Writes a message to the console. The message is prefixed with the log level, the
     * local ID of the calling object, and the name of the function that is logging the message.
     * 
     * @param caller - the object that is logging the message
     * @param levelOrFunct - {@link LogLevels} of the message
     * @param functionName - the name of the function that is logging the message
     * @param messages - additional messages to log
     */
    public static writeLog(caller: unknown, levelOrFunct: LogLevelOrFunct = DefaultLogFunct, callingFunctName: string, ...args: unknown[]): void {
        
        if(isWeakObject(caller)) {
            if(isLogLevel(levelOrFunct)) {
                levelOrFunct = logLevelConsoleFunctMap[levelOrFunct];
            }
    
            if(isConsoleKey(levelOrFunct)) {
                const { getArgs, logLevel, contextStringInArgs } = EzLogService._consoleFunctDefMap[levelOrFunct];
            
                if(EzLogService.canLog(logLevel, caller, callingFunctName)) {
                    const logFunction = console[levelOrFunct];
                    const contextString = contextStringInArgs ? 
                        `\n${LogLevels[logLevel].toUpperCase()}::${caller.LOCAL_ID}::${callingFunctName}::` :
                        `\n${LogLevels[logLevel].toUpperCase()}::${caller.LOCAL_ID}::${callingFunctName}::${levelOrFunct}::`;
            
                    const logArgs = contextStringInArgs ? getArgs(...[contextString, ...args]) : getArgs(...args);
            
                    if(!contextStringInArgs) {
                        const levelConsoleFunctName = logLevelConsoleFunctMap[logLevel] ?? 'debug';
                        const levelLogFunction = console[levelConsoleFunctName];
                        if(isConsoleFunction(levelLogFunction, levelConsoleFunctName)) {
                            EzLogService.showConsoleFunctArgs ? 
                                levelLogFunction(`${contextString}::console funct args:`, ...logArgs) :
                                levelLogFunction(contextString);
                        }
                    }
                    if(isConsoleFunction(logFunction, levelOrFunct)) {
                        logFunction(...logArgs);
                    }
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
        const index = isNumber(functIndex) ? functIndex : 3;
        const stacktraceLine = error.stack?.split('\n')[index] ?? 'unknown';
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
        if(event.key === EzLogService.reportKey && EzLogService.enableReportListener) {
            console.log('\nLOGSERVICE SETTINGS:');
            for(const key in EzLogService) {
                const prop = EzLogService[key];
                if(typeof prop !== 'function' && key !== 'ɵprov') {
                    console.log(key, prop);
                }
            }
        }
        else if(event.key === EzLogService.toggleKey && EzLogService.enableToggleListener) {
            const { currentStateName, defaultStateName } = EzLogService;
            if(currentStateName !== 'toggleState') {
                EzLogService.loadState('toggleState');
            }
            else {
                EzLogService._serviceStates[defaultStateName] != null ? 
                    EzLogService.loadState(EzLogService.defaultStateName) : 
                    EzLogService.loadState('defaultState');
            }
        }
        else {
            for(const key in EzLogService.customKeyListeners) {
                if(event.key === key) {
                    EzLogService.customKeyListeners[key](event);
                }
            }
        }
    }

    /**
     * Updates the local storage with the current state of the service, if the {@link persistCurrentState} 
     * flag is set to true.
     * 
     * @param saveStateName - whether or not to save the state name to local storage
     */
    private static _updateLocalStorage(saveStateName: boolean = false): void {
        if(EzLogService.persistCurrentState) {
            localStorage.setItem('logServiceStates', JSON.stringify(EzLogService._serviceStates));
            if(saveStateName) {
                localStorage.setItem('currentStateName', EzLogService.currentStateName);
            }
        }
    }
    
    // #endregion private methods
}