import { BehaviorSubject } from 'rxjs';
import { LogLevelConsoleFunctMap } from './log-service-types';


/**
 * Common Log levels in order of severity, number values in between can be used for more granular logging
 */
export enum LogLevels {
    All = 0,
    Experimental = 10,
    Trace = 20,
    Debug = 30,
    Info = 40,
    Log = 50,
    Warn = 60,
    Error = 70,
    Assert = 80,
    None = 90,
}

/**
 * Enum of console functions that can be called
 */
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
    Warn = 'warn'
}

/**
 * Map of log levels to console functions
 */
export const logLevelConsoleFunctMap: LogLevelConsoleFunctMap = {
    [LogLevels.Assert]: 'assert',
    [LogLevels.Debug]: 'debug',
    [LogLevels.Error]: 'error',
    [LogLevels.Info]: 'info',
    [LogLevels.Log]: 'log',
    [LogLevels.Trace]: 'trace',
    [LogLevels.Warn]: 'warn',
    [LogLevels.None]: undefined,
    [LogLevels.Experimental]: undefined,
};

/**
 * BehaviorSubject containing strings to be ignored when parsing out the logging arguments
 */
export const LogSvcIgnoredStrings$: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);