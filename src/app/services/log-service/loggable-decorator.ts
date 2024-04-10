/* eslint-disable @typescript-eslint/no-explicit-any */
import { GenericFunction, WeakObject } from 'warskald-ui/models';
import { NgLogService } from './log-service';
import { ConsoleFuncts, LogLevels } from './log-service-constants';
import { ConsoleDirOptions, ConsoleFunctName, LogLevelOrFunct, LoggableObject } from './log-service-types';
import { getArgsOutput } from './log-service-utils';
import { isFunction } from 'lodash';
import { Type } from '@angular/core';

/** 
 * Clears the console terminal 
 * 
 * LogLevel = {@link LogLevels.Debug}
 * 
 * @param consoleFunct - {@link ConsoleFuncts.Clear} 
 */
export function Loggable(consoleFunct?: ConsoleFuncts.Clear): GenericFunction<PropertyDescriptor>;

/** 
 * Exits the current inline group in the console 
 * 
 * LogLevel = {@link LogLevels.Debug}
 * 
 * @param consoleFunct - {@link ConsoleFuncts.GroupEnd} 
 */
export function Loggable(consoleFunct?: ConsoleFuncts.GroupEnd): GenericFunction<PropertyDescriptor>;

/** 
 * Logs the number of times that this particular call to console.count() has been called 
 * 
 * LogLevel = {@link LogLevels.Debug}
 * 
 * @param consoleFunct - {@link ConsoleFuncts.Count} 
 * @param label - An optional string containing the label for the count
 */
export function Loggable(consoleFunct?: ConsoleFuncts.Count, label?: string): GenericFunction<PropertyDescriptor>;

/** 
 * Resets the number of times that this particular call to console.count() has been called 
 * 
 * LogLevel = {@link LogLevels.Debug}
 * 
 * @param consoleFunct - {@link ConsoleFuncts.CountReset} 
 * @param label - An optional string containing the label for the count
 */
export function Loggable(consoleFunct?: ConsoleFuncts.CountReset, label?: string): GenericFunction<PropertyDescriptor>;

/**
 * Creates a new inline group in the Web console log, causing any subsequent 
 * console messages to be indented by an additional level, until console.groupEnd()
 * is called.
 * 
 * LogLevel = {@link LogLevels.Debug}
 * 
 * @param consoleFunct - {@link ConsoleFuncts.Group}
 * @param label - An optional string containing the label for the group
 */
export function Loggable(consoleFunct?: ConsoleFuncts.Group, label?: string): GenericFunction<PropertyDescriptor>;

/**
 * Creates a new inline group in the Web console log, causing any subsequent 
 * console messages to be indented by an additional level, until console.groupEnd() 
 * is called. The new group is created collapsed.
 * 
 * LogLevel = {@link LogLevels.Debug}
 * 
 * @param consoleFunct - {@link ConsoleFuncts.GroupCollapsed}
 * @param label - An optional string containing the label for the group
 */
export function Loggable(consoleFunct?: ConsoleFuncts.GroupCollapsed, label?: string): GenericFunction<PropertyDescriptor>;

/**
 * Starts a timer in the console. Calling console.timeEnd() with the same name will stop 
 * the timer and log the elapsed time in milliseconds.
 * 
 * LogLevel = {@link LogLevels.Debug}
 * 
 * @param consoleFunct - {@link ConsoleFuncts.Time}
 * @param label - An optional string containing the label for the timer
 */
export function Loggable(consoleFunct?: ConsoleFuncts.Time, label?: string): GenericFunction<PropertyDescriptor>;

/**
 * Stops a timer that was previously started by calling console.time() and logs the elapsed time.
 * 
 * LogLevel = {@link LogLevels.Debug}
 * 
 * @param consoleFunct - {@link ConsoleFuncts.TimeEnd}
 * @param label - An optional string containing the label for the timer
 */
export function Loggable(consoleFunct?: ConsoleFuncts.TimeEnd, label?: string): GenericFunction<PropertyDescriptor>;

/**
 * Adds a timestamp to the console. This lets you log the time at which a particular piece of code was executed.
 * 
 * LogLevel = {@link LogLevels.Experimental}
 * 
 * @param consoleFunct - {@link ConsoleFuncts.TimeStamp}
 * @param label - An optional string containing the label for the timestamp
 */
export function Loggable(consoleFunct?: ConsoleFuncts.TimeStamp, label?: string): GenericFunction<PropertyDescriptor>;

/**
 * Displays an interactive list of the properties of the specified JavaScript object. 
 * The output is presented as a hierarchical listing with disclosure triangles that let
 * you see the contents of child objects.
 * 
 * LogLevel = {@link LogLevels.Debug}
 * 
 * @param consoleFunct - {@link ConsoleFuncts.Dir}
 * @param objOrOpts - An object to log, or the options object if you simply want it to dir the input/output
 * @param options - Options for the console.dir() function if objOrOpts is an object
 */
export function Loggable(consoleFunct?: ConsoleFuncts.Dir, objOrOpts?: object | ConsoleDirOptions, options?: ConsoleDirOptions): GenericFunction<PropertyDescriptor>;

/**
 * Displays an XML/HTML Element representation of the specified object if possible 
 * or the JavaScript Object view if it is not.
 * 
 * LogLevel = {@link LogLevels.Debug}
 * 
 * @param consoleFunct - {@link ConsoleFuncts.Dirxml}
 * @param objOrOpts - An object to log, or the options object if you simply want it to dir the input/output
 * @param options - Options for the console.dir() function if objOrOpts is an object
 */
export function Loggable(consoleFunct?: ConsoleFuncts.Dirxml, objOrOpts?: object | ConsoleDirOptions, options?: ConsoleDirOptions): GenericFunction<PropertyDescriptor>;

/**
 * Displays tabular data as a table. This function takes one mandatory argument data, 
 * which must be an array or an object, and one additional optional parameter columns.
 * 
 * LogLevel = {@link LogLevels.Debug}
 * 
 * @param consoleFunct - {@link ConsoleFuncts.Table}
 * @param data - An object or array to log
 * @param columns - An array of strings containing the names of columns to include in the output
 */
export function Loggable(consoleFunct?: ConsoleFuncts.Table, data?: object | unknown[], columns?: string[]): GenericFunction<PropertyDescriptor>;

/**
 * One of the standard logging function from {@link Console} to use for logging.
 * 
 * @param consoleFunct - {@link ConsoleFunctName} name of the function to call
 * @param logArgs - arguments to be passed to the logging function
 */
export function Loggable(consoleFunct?: ConsoleFunctName, ...logArgs: unknown[]): GenericFunction<PropertyDescriptor>;

/**
 * Logs a message at the specified log level. If no log level is provided, the default
 * value is {@link LogLevels.Debug}.
 * 
 * @param logLevel - {@link LogLevels} - the log level of the message
 * @param logArgs - additional arguments to pass to the logging function
 */
export function Loggable(logLevel?: LogLevels, ...logArgs: unknown[]): GenericFunction<PropertyDescriptor>;

/**
 * Decorator function factory for logging function calls. Can be passed a specific logging level 
 * or the name of a console function, as well as additional arguments to pass to the logging function.
 * If no arguments are passed, the default value is {@link LogLevels.Debug}.
 * 
 * @param levelOrFunct - {@link LogLevels} or {@link ConsoleFunctName}
 * @param logArgs - additional arguments to pass to the logging function
 * @returns - A decorator function
 */
export function Loggable(levelOrFunct?: LogLevelOrFunct, ...logArgs: unknown[]): GenericFunction<PropertyDescriptor> {
    
    return function (_target: LoggableObject, propertyKey: string, descriptor: PropertyDescriptor) {
        
        const originalMethod = descriptor.value; 
        const originalGetter = descriptor.get;
        const originalSetter = descriptor.set;

        if(originalGetter && NgLogService.logGetters) {
            descriptor.get = function (this: LoggableObject) {
                const value = originalGetter?.call(this);
                NgLogService.writeLog(this, levelOrFunct, propertyKey, '\ngetting\n', ...logArgs, value);
                return value;
            };
        }
        
        if(originalSetter && NgLogService.logSetters) {
            descriptor.set = function (this: LoggableObject, value: unknown) {
                const argsOutput: WeakObject = getArgsOutput(originalSetter, value);
        
                NgLogService.writeLog(this, levelOrFunct!, propertyKey, '\nsetting\n', argsOutput, ...logArgs);
                originalSetter?.call(this, value);
            };
        }
        
        if(originalMethod instanceof Function && descriptor.writable) {
            descriptor.value = function (this: LoggableObject, ...args: unknown[]) {

                const argsOutput: WeakObject = getArgsOutput(originalMethod, ...args);
            
                let returnVal: unknown = null;
                
                NgLogService.writeLog(this, levelOrFunct!, propertyKey, 'entering;', '\nargs:\n', argsOutput, ...logArgs);
            
                try {
                    returnVal = originalMethod.apply(this, args);
                }
                catch(error: unknown) {
                    NgLogService.writeLog(this, ConsoleFuncts.Error, propertyKey, 'error:', error, ...logArgs);
                }
            
                NgLogService.writeLog(this, levelOrFunct!, propertyKey, 'exiting;', 'returnVal:', returnVal, ...logArgs);
                            
                return returnVal;
            };
            
        
        }
        

        return descriptor;
    };
}


export function buildProperty(value: unknown): PropertyDescriptor {
    return {
        value: value,
        writable: true,
        enumerable: true,
        configurable: true
    };
}

/**
 * Decorator function for adding logging to an Angular Component class. 
 * Requires a configuration object with the desired logging options.
 * 
 * Config options:
 * - LOCAL_ID: string - **Required** The local ID for the class, used to provide context for log statements
 * - autoAddLogs: boolean (optional) - Automatically add logging to all class methods
 * - canLog: boolean (optional) - Whether or not the class can log
 * - className: string (optional) - The name of the class, used for black/white listing
 * - localLogLevel: {@link LogLevels} (optional) - The default log level for the class
 * 
 * @param config - Logging options for the component class
 * @returns - A class decorator
 */
export function LoggableComponent<T>(config: LoggableObject) {
    return function(_class: Type<T>) {

        Object.assign(_class.prototype, config);

        const classProps = Object.getOwnPropertyDescriptors(_class.prototype);

        if(config.autoAddLogs) {
            const logFactory = Loggable();
            for(const key in classProps) {
                Object.defineProperty(_class.prototype, key, logFactory(_class.prototype, key, classProps[key]));
            }
        }
            
        return _class;
    };
}

/**
 * Decorator function for adding logging to a class. Requires a
 * configuration object with the desired logging options.
 * 
 * @param config - options to pass to the LoggableClass decorator
 * @returns - A class decorator
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
export function LoggableClass(config: LoggableObject) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
    return function _LoggableClass<T extends { new (...args: any[]): {} }>(constructor: T) {

        for(const key in config) {
            Object.defineProperty(constructor, key, buildProperty(config[key]));
            
        }

        const logFactory = Loggable();
        const classProps = Object.getOwnPropertyDescriptors(constructor);

        for(const key in classProps) {
            // console.log('LOGGABLE:', key, classProps[key]);
            const classProp = classProps[key];
            const { value, get, set } = classProp;
            if(isFunction(value) || isFunction(get) || isFunction(set)){
                Object.defineProperty(constructor, key, logFactory(constructor, key, classProps[key]));
            }
        }
    };
}