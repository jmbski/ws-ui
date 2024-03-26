import { GeneralFunction } from 'warskald-ui/models';


export type FunctionMap = Record<string, GeneralFunction<unknown>>;/**
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

