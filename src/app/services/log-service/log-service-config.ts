import { FunctionMap, WeakObject } from 'warskald-ui/models';
import { ConsoleFunctLevelMap, ConsoleFunctName, LogAccessMode } from './log-service-types';


/**
 * Configuration for the log service.
 */
export interface ILogServiceConfig extends WeakObject {
    
    /**
     * The log level for the application.
     */
    logLevel: number;

    /**
     * Whether or not to use the local log level of the calling object.
     */
    useLocalLogLevel: boolean;

    /**
     * If true, the service will use the stricter of the global log level and the local log level.
     * If false, the service will use the looser of the global log level and the local log level.
     */
    useStrictLocalLogLevel: boolean;

    /**
     * Whether or not to use the canLog property of the calling object.
     */
    useCanLog: boolean;

    /**
     * The default log function for the application.
     */
    defaultLogFunct: ConsoleFunctName;

    /**
     * If true, the service will log getter calls.
     */
    logGetters: boolean;

    /**
     * If true, the service will log setter calls.
     */
    logSetters: boolean;

    /**
     * If true, the service will show the arguments passed in for the console function in addition to the message.
     */
    showConsoleFunctArgs: boolean;

    /**
     * Array of strings to ignore when getting string args for a console function.
     */
    ignoredStrings: string[];

    /**
     * Object use to customize console function behavior.
     */
    customConsoleFunctDefs: Partial<ConsoleFunctLevelMap>;

    /**
     * The list of objects that are allowed to log messages.
     */
    callerWhiteList: string[];

    /**
     * The list of objects that are not allowed to log messages.
     */
    callerBlackList: string[];

    /**
     * The access mode for the caller white list/black list.
     */
    callerAccessMode: LogAccessMode;



    /**
     * The list of functions that are allowed to log messages.
     */
    functionWhiteList: string[];

    /**
     * The list of functions that are not allowed to log messages.
     */
    functionBlackList: string[];

    /**
     * The access mode for the function white list/black list.
     */
    functionAccessMode: LogAccessMode;



    /**
     * The list of log levels that are allowed to be logged.
     */
    logLevelWhiteList: number[];

    /**
     * The list of log levels that are not allowed to be logged.
     */
    logLevelBlackList: number[];

    /**
     * The access mode for the log level white list/black list.
     */
    logLevelAccessMode: LogAccessMode;



    /**
     * If true, the {@link LogService} will add an event listener to the 
     * document that listens for the {@link reportKey} to be pressed. When
     * the key is pressed, the log settings will be output to the console.
     */
    enableReportListener: boolean;

    /**
     * If {@link enableReportListener} is true, pressing this key will output the log settings
     * to the console
     */
    reportKey: string;

    /**
     * If enabled, the log service will add an event listener to the document that listens for the
     * the {@link toggleKey} to be pressed. When the key is pressed, the LogService will be switched
     * to the {@link serviceStates}.
     */
    enableToggleListener: boolean;

    /**
     * If {@link enableToggleKey} is true, pressing this key will switch the LogService to the
     * {@link serviceStates}.
     */
    toggleKey: string;

    /**
     * The state that the LogService will be switched to when the {@link toggleKey} is pressed.
     */
    toggleState: LogServiceConfig;

    /**
     * The name of the default state for the LogService.
     */
    defaultStateName: string;

    /**
     * If true, the LogService will persist the current state to {@link localStorage} when switching 
     * to a new state.
     * 
     * @see https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage
     */
    persistCurrentState: boolean;

    /**
     * Additional states that the LogService can be switched to. The key in each record is the identifier
     * for the state. The value is the configuration for the state.
     */
    additionalServiceStates: Record<string, LogServiceConfig>;

    /**
     * Additional listeners to add to the LogService. The key in each record is the key to listen for.
     * The value is the function to call when the key is pressed.
     */
    customKeyListeners: FunctionMap;
}

export type LogServiceConfig = Partial<ILogServiceConfig>;