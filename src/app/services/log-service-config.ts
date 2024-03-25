import { LogLevel, LogAccessMode } from './log-service';

/**
 * Configuration for the log service.
 */
export interface LogServiceConfig extends Record<string, unknown> {
    
    /**
     * The log level for the application.
     */
    logLevel?: LogLevel;

    /**
     * Whether or not to use the local log level of the calling object.
     */
    useLocalLogLevel?: boolean;

    /**
     * If true, the service will use the stricter of the global log level and the local log level.
     * If false, the service will use the looser of the global log level and the local log level.
     */
    useStrictLocalLogLevel?: boolean;

    /**
     * Whether or not to use the canLog property of the calling object.
     */
    useCanLog?: boolean;



    /**
     * The list of objects that are allowed to log messages.
     */
    callerWhiteList?: string[];

    /**
     * The list of objects that are not allowed to log messages.
     */
    callerBlackList?: string[];

    /**
     * The access mode for the caller white list/black list.
     */
    callerAccessMode?: LogAccessMode;



    /**
     * The list of functions that are allowed to log messages.
     */
    functionWhiteList?: string[];

    /**
     * The list of functions that are not allowed to log messages.
     */
    functionBlackList?: string[];

    /**
     * The access mode for the function white list/black list.
     */
    functionAccessMode?: LogAccessMode;



    /**
     * The list of log levels that are allowed to be logged.
     */
    logLevelWhiteList?: LogLevel[];

    /**
     * The list of log levels that are not allowed to be logged.
     */
    logLevelBlackList?: LogLevel[];

    /**
     * The access mode for the log level white list/black list.
     */
    logLevelAccessMode?: LogAccessMode;

    /**
     * If true, the {@link LogService} will add an event listener to the 
     * document that listens for the {@link reportKey} to be pressed. When
     * the key is pressed, the log settings will be output to the console.
     */
    enableReportListener?: boolean;

    /**
     * If {@link enableReportListener} is true, pressing this key will output the log settings
     * to the console
     */
    reportKey?: string;

}
