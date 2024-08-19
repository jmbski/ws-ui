import { DefaultLogSettingsPreferLocal } from 'src/app/services/log-service/default-settings';
import { getConsoleStringArg, LogLevels, NgLogService, LogServiceConfig } from 'warskald-ui/services';

/* export const logSettings: LogServiceConfig = {
    logLevel: LogLevels.All,
    defaultStateName: 'primaryState',
    useLocalLogLevel: true,
    useStrictLocalLogLevel: true,
    showConsoleFunctArgs: true,
    logGetters: false,
    customConsoleFunctDefs: {
        timeStamp: {
            logLevel: LogLevels.Debug,
            getArgs: getConsoleStringArg,
        },
    },
    additionalServiceStates: {
        logEverything: {
            logLevel: LogLevels.All,
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
            NgLogService.loadState('primaryState');
        },
        '2': () => {
            NgLogService.loadState('logEverything');
        }
    }
}; */

export const environment: Record<string, unknown> = {
    production: false,
    logSettings: DefaultLogSettingsPreferLocal
};