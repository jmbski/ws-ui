import { LogLevel } from '../app/models/general';
import { LogServiceConfig } from '../app/services/log-service/log-service-config';

export const logServiceConfig: LogServiceConfig = {
    logLevel: LogLevel.Trace,
    useLocalLogLevel: true,
    useStrictLocalLogLevel: true,
    enableReportListener: true,
    enableToggleListener: true,
    customKeyListeners: {
        '1': (event: KeyboardEvent) => {
            console.log('Custom key listener 1', event);
        }
    },
    toggleState: {
        logLevel: LogLevel.Error,
        useLocalLogLevel: false,
        enableReportListener: true,
        enableToggleListener: true
    }
};

export const environment: Record<string, unknown> = {
    production: false,
    logServiceConfig
};