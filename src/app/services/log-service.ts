import { Injectable } from '@angular/core';

export enum LogLevel {
    Trace = 0,
    Debug = 1,
    Info = 2,
    Warn = 3,
    Error = 4,
    Assert = 5,
    None = 6
}


@Injectable({
    providedIn: 'root'
})
export class LogService {
    // #region public properties

    public logLevel: LogLevel = LogLevel.Trace;
    
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

    constructor() {

    }

    // #endregion constructor and lifecycle hooks
    
    
    // #region public methods
    public canLog(level: LogLevel): boolean {
        return level >= this.logLevel;
    }

    public assert(condition: boolean, ...messages: unknown[]) {
        if(this.canLog(LogLevel.Assert)) {
            console.assert(condition, this.getCallerFunctionName(), ...messages);
        }
    }
    

    public debug(...messages: unknown[]) {
        if(this.canLog(LogLevel.Debug)) {
            console.debug(this.getCallerFunctionName(), ...messages);
        }
    }

    public error(...messages: unknown[]) {
        if(this.canLog(LogLevel.Error)) {
            console.error(this.getCallerFunctionName(), ...messages);
        }
    }

    public info(...messages: unknown[]) {
        if(this.canLog(LogLevel.Info)) {
            console.info(this.getCallerFunctionName(), ...messages);
        }
    }

    public log(...messages: unknown[]) {
        if(this.canLog(LogLevel.Trace)) {
            console.log(this.getCallerFunctionName(), ...messages);
        }
    }

    public trace(...messages: unknown[]) {
        if(this.canLog(LogLevel.Trace)) {
            console.trace(this.getCallerFunctionName(), ...messages);
        }
    }

    public warn(...messages: unknown[]) {
        if(this.canLog(LogLevel.Warn)) {
            console.warn(this.getCallerFunctionName(), ...messages);
        }
    }
    
    // #endregion public methods
    
    
    // #region protected methods
    
    // #endregion protected methods
    
    
    // #region private methods
    private getCallerFunctionName(): string {
        const error = new Error();
        // in stack trace, line [2] pertains to the caller
        const stacktraceLine = error.stack?.split('\n')[3] ?? '0 1 2 3 4 unknown';

        // clean up the stack trace line and return function's name
        return stacktraceLine.split(' ')[5];
    }
    
    // #endregion private methods
    
    
}