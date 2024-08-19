import { ApplicationConfig } from '@angular/core';
import { provideRouter, Routes } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { DataService, DEFAULT_SRC_NAMES } from './services/data-service/data-service';
import { ClassRegistry, LogLevels, LogServiceConfig, NgLogService } from 'warskald-ui/services';
import { environment } from 'environment';
import { WsComponentMap } from 'warskald-ui/components';
import { ComponentLogLevels } from './common/constants';
import { PropTracker } from './services/property-tracker';
import { nanoid } from 'nanoid';

export const routes: Routes = [
    { path: '', redirectTo: 'showcase', pathMatch: 'full' },
    { path: 'showcase', loadComponent: () => import('./showcase/showcase.component').then(m => m.ShowcaseComponent) },
    { path: 'test', loadComponent: () => import('./showcase/test/test.component').then(m => m.TestComponent) },
];

NgLogService.initialize(<LogServiceConfig>environment.logSettings);
DataService.initialize();
ClassRegistry.initialize(WsComponentMap);

export interface AppSettingsConfig {
    test1?: string;
    test2?: number;
    test3?: boolean;
    test4?: string[];
    test5?: number[];

    [key: string]: unknown;
}

export const AppSettings: PropTracker<AppSettingsConfig> = new PropTracker<AppSettingsConfig>({
    test1: 'test3',
});

AppSettings.setUpdateFunctions({
    test1: () => {
        const newVal = nanoid();
        AppSettings.settings.test1.next(newVal);
    }
});

export const appConfig: ApplicationConfig = {
    providers: [
        provideRouter(routes),
        provideAnimations(),
        {provide: DEFAULT_SRC_NAMES, useValue: ['data-service', 'log-service']}
    ]
};
