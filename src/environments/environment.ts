import { LogService } from 'warskald-ui/services';
import { LogLevel } from '../app/models/general';
import { LogServiceConfig } from '../app/services/log-service/log-service-config';

export const logServiceConfig: LogServiceConfig = {
    logLevel: LogLevel.Error,
    defaultStateName: 'primaryState',
    useLocalLogLevel: true,
    useStrictLocalLogLevel: true,
    additionalServiceStates: {
        logEverything: {
            logLevel: LogLevel.Trace,
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
        '1': (event: KeyboardEvent) => {
            LogService.loadState('primaryState');
        },
        '2': (event: KeyboardEvent) => {
            LogService.loadState('logEverything');
        }
    }
};

export const environment: Record<string, unknown> = {
    production: false,
    logServiceConfig
};