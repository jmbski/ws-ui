import { getConsoleStringArg, LogLevels, EzLogService, LogServiceConfig } from 'warskald-ui/services';

export const logServiceConfig: LogServiceConfig = {
    logLevel: LogLevels.Debug,
    defaultStateName: 'primaryState',
    useLocalLogLevel: true,
    useStrictLocalLogLevel: true,
    showConsoleFunctArgs: true,
    callerAccessMode: 'whitelist',
    customConsoleFunctDefs: {
        timeStamp: {
            logLevel: LogLevels.Debug,
            getArgs: getConsoleStringArg,
        },
    },
    additionalServiceStates: {
        logEverything: {
            logLevel: LogLevels.Trace,
            useLocalLogLevel: false,
            enableReportListener: true,
            enableToggleListener: true,
            persistCurrentState: true,

        }
    },
    enableReportListener: true,
    enableToggleListener: true,
    persistCurrentState: true,
    customKeyListeners: {
        '1': () => {
            EzLogService.loadState('primaryState');
        },
        '2': () => {
            EzLogService.loadState('logEverything');
        }
    }
};

export const environment: Record<string, unknown> = {
    production: false,
    logServiceConfig
};