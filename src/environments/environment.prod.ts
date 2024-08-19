import { LogLevels } from '../app/services/log-service/log-service-constants';
import { LogServiceConfig } from '../app/services/log-service/log-service-config';

export const logServiceConfig: LogServiceConfig = {
    logLevel: LogLevels.Error,
    useLocalLogLevel: true,
    useStrictLocalLogLevel: false,
    enableReportListener: true,
    enableToggleListener: true,
    toggleState: {
        logLevel: LogLevels.Trace,
        useLocalLogLevel: false,
        enableReportListener: true,
        enableToggleListener: true
    }
};

export const environment: Record<string, unknown> = {
    production: true,
    logServiceConfig
};