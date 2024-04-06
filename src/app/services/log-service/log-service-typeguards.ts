import { isFunction, isFunctionRecord, isTypedRecord, objectIsType, OptionalBooleanProp, OptionalNumberProp, OptionalStringArrayProp, OptionalStringProp, TypeMapping } from 'warskald-ui/type-guards';
import { ConsoleDirOptions, ConsoleFunctName, LogAccessMode } from './log-service-types';
import { GeneralFunction } from 'warskald-ui/models';
import { LogServiceConfig } from './log-service-config';
import { LogLevels } from './log-service-constants';


const dirOptionsTypeMap: TypeMapping<ConsoleDirOptions> = {
    colors: OptionalBooleanProp,
    depth: OptionalNumberProp,
    showHidden: OptionalBooleanProp,
};

export function isConsoleDirOptions(value: unknown): value is ConsoleDirOptions {
    return objectIsType<ConsoleDirOptions>(value, dirOptionsTypeMap);
}

export function isConsoleFunction(value: unknown, name: string): value is GeneralFunction<void> {
    return Object.keys(console).includes(name) && name !== 'Console' && isFunction(value);
}

export function isConsoleKey(value: unknown): value is ConsoleFunctName {
    return Object.keys(console).includes(value as string);
}

export function isLogLevel(value: unknown): value is LogLevels {
    return typeof value === 'number' && Object.values(LogLevels).includes(value);
}

export function isLogLevelArray(value: unknown): value is LogLevels[] {
    return Array.isArray(value) && value.every(isLogLevel);
}

export function isLogAccessMode(value: unknown): value is LogAccessMode {
    return typeof value === 'string' && ['whitelist', 'blacklist', 'none'].includes(value);
}

const AccessModeProp = { typeGuard: isLogAccessMode, optional: true };

const logServiceTypeMap: TypeMapping<LogServiceConfig> = {
    logLevel: { typeGuard: isLogLevel, optional: true },
    useLocalLogLevel: OptionalBooleanProp,
    useStrictLocalLogLevel: OptionalBooleanProp,
    useCanLog: OptionalBooleanProp,
    logGetters: OptionalBooleanProp,
    logSetters: OptionalBooleanProp,
    callerWhiteList: OptionalStringArrayProp,
    callerBlackList: OptionalStringArrayProp,
    callerAccessMode: AccessModeProp,
    functionWhiteList: OptionalStringArrayProp,
    functionBlackList: OptionalStringArrayProp,
    functionAccessMode: AccessModeProp,
    logLevelWhiteList: { typeGuard: isLogLevelArray, optional: true },
    logLevelBlackList: { typeGuard: isLogLevelArray, optional: true },
    logLevelAccessMode: AccessModeProp,
    enableReportListener: OptionalBooleanProp,
    reportKey: OptionalStringProp,
    enableToggleListener: OptionalBooleanProp,
    toggleKey: OptionalStringProp,
    toggleState: { typeGuard: isLogServiceConfig, optional: true },
    defaultStateName: OptionalStringProp,
    persistCurrentState: OptionalBooleanProp,
    additonalServiceStates: { typeGuard: isLogServiceConfigRecord, optional: true },
    customKeyListeners: { typeGuard: isFunctionRecord, optional: true}
};

export function isLogServiceConfig(value: unknown): value is LogServiceConfig {
    return objectIsType(value, logServiceTypeMap);
}

export function isLogServiceConfigArray(value: unknown): value is LogServiceConfig[] {
    return Array.isArray(value) && value.every(isLogServiceConfig);
}

export function isLogServiceConfigRecord(value: unknown): value is Record<string, LogServiceConfig> {
    return isTypedRecord(value, isLogServiceConfig);
}