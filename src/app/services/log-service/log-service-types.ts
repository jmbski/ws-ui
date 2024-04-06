/**
 * Interface for objects that can be logged.
 */
export interface LoggableObject {
    LOCAL_ID: string;
    localLogLevel?: number;
    canLog?: boolean;
}

export interface ConsoleDirOptions {
    depth?: number;
    showHidden?: boolean;
    colors?: boolean;
}

export type LogLevelConsoleFunctMap = Record<number, ConsoleFunctName | undefined>;

export type LogLevelOrFunct = number | ConsoleFunctName | undefined;

export type ConsoleFunctName = Exclude<keyof Console, 'Console' | 'profile' | 'profileEnd'>;

export interface ConsoleFunctDef {
    logLevel: number;
    getArgs: (...args: unknown[]) => unknown[];
    /** if true, the context string will be included in the getArgs function */
    contextStringInArgs?: boolean;
}

/**
 * Interface for log settings.
 */
export type LocalLogSettings = Partial<LoggableObject>;

/**
 * Access modes for white/black lists.
 */
export type LogAccessMode = 'whitelist' | 'blacklist' | 'none';

export type ConsoleFunctLevelMap = Record<ConsoleFunctName, ConsoleFunctDef>;