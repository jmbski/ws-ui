import { LogLevel } from '../app/models/general';
import { LogServiceConfig } from '../app/services/log-service/log-service-config';

export const logServiceConfig: LogServiceConfig = {
    logLevel: LogLevel.Error,
    useLocalLogLevel: true,
    useStrictLocalLogLevel: false,
    enableReportListener: true,
    enableToggleListener: true,
    toggleState: {
        logLevel: LogLevel.Trace,
        useLocalLogLevel: false,
        enableReportListener: true,
        enableToggleListener: true
    }
};

export const environment: Record<string, unknown> = {
    production: true,
    logServiceConfig
};