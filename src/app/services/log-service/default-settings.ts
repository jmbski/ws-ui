import { NgLogService } from './log-service';
import { LogServiceConfig } from './log-service-config';
import { LogLevels } from './log-service-constants';
import { cloneDeep } from 'lodash';

function cycleState() {
    const state = NgLogService.currentStateName;
    if(state === 'logNothing') {
        NgLogService.loadState('logEverything');
    }
    else if(state === 'logEverything') {
        NgLogService.loadState('errorOnly');
    }
    else if(state === 'errorOnly') {
        NgLogService.loadState('preferLocal');
    }
    else if(state === 'preferLocal') {
        NgLogService.loadState('logNothing');
    }
}

const logSettings: Record<string, LogServiceConfig> = {
    logNothing: {
        logLevel: LogLevels.None,
        useLocalLogLevel: false,
        useStrictLocalLogLevel: true,
        enableReportListener: false,
        enableToggleListener: false,
        enableCustomKeyListeners: true,
        customKeyListeners: {
            '`': cycleState
        },
        useCanLog: false,
        logGetters: false,
        logSetters: false,
        persistCurrentState: true,
        defaultStateName: 'logNothing'
    },
    logEverything: {
        logLevel: LogLevels.All,
        useLocalLogLevel: false,
        useStrictLocalLogLevel: true,
        enableReportListener: false,
        enableToggleListener: false,
        enableCustomKeyListeners: true,
        customKeyListeners: {
            '`': cycleState
        },
        useCanLog: true,
        logGetters: false,
        logSetters: false,
        persistCurrentState: true,
        defaultStateName: 'logEverything'
    },
    errorOnly: {
        logLevel: LogLevels.Error,
        useLocalLogLevel: false,
        useStrictLocalLogLevel: true,
        enableReportListener: true,
        enableToggleListener: false,
        enableCustomKeyListeners: true,
        customKeyListeners: {
            '`': cycleState
        },
        useCanLog: true,
        logGetters: false,
        logSetters: false,
        persistCurrentState: true,
        defaultStateName: 'errorOnly'
    },
    preferLocal: {
        logLevel: LogLevels.Error,
        useLocalLogLevel: true,
        useStrictLocalLogLevel: false,
        enableReportListener: true,
        enableToggleListener: false,
        enableCustomKeyListeners: true,
        customKeyListeners: {
            '`': cycleState
        },
        useCanLog: true,
        logGetters: false,
        logSetters: true,
        persistCurrentState: true,
        defaultStateName: 'preferLocal'
    },
};

export const DefaultLogSettingsLogNothing: LogServiceConfig = cloneDeep(logSettings.logNothing);
export const DefaultLogSettingsLogEverything: LogServiceConfig = cloneDeep(logSettings.logEverything);
export const DefaultLogSettingsErrorOnly: LogServiceConfig = cloneDeep(logSettings.errorOnly);
export const DefaultLogSettingsPreferLocal: LogServiceConfig = cloneDeep(logSettings.preferLocal);

DefaultLogSettingsLogNothing.additionalServiceStates = {
    logEverything: DefaultLogSettingsLogEverything,
    errorOnly: DefaultLogSettingsErrorOnly,
    preferLocal: DefaultLogSettingsPreferLocal
};

DefaultLogSettingsLogEverything.additionalServiceStates = {
    logNothing: DefaultLogSettingsLogNothing,
    errorOnly: DefaultLogSettingsErrorOnly,
    preferLocal: DefaultLogSettingsPreferLocal
};

DefaultLogSettingsErrorOnly.additionalServiceStates = {
    logNothing: DefaultLogSettingsLogNothing,
    logEverything: DefaultLogSettingsLogEverything,
    preferLocal: DefaultLogSettingsPreferLocal
};

DefaultLogSettingsPreferLocal.additionalServiceStates = {
    logNothing: DefaultLogSettingsLogNothing,
    logEverything: DefaultLogSettingsLogEverything,
    errorOnly: DefaultLogSettingsErrorOnly
};

