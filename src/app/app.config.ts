import { ApplicationConfig } from '@angular/core';
import { provideRouter, Routes } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { DEFAULT_SRC_NAMES } from './services/data-service';
import { LogService } from 'warskald-ui/services';
import { LogLevel } from 'warskald-ui/models';

export const routes: Routes = [
    { path: '', redirectTo: 'showcase', pathMatch: 'full' },
    { path: 'showcase', loadComponent: () => import('./showcase/showcase.component').then(m => m.ShowcaseComponent) },
];

LogService.updateLogServiceSettings({
    logLevel: LogLevel.Error,
    useLocalLogLevel: true,
    useStrictLocalLogLevel: false,
    enableReportListener: true,
    functionAccessMode: 'blacklist',
    functionBlackList: ['_MenuBarComponent.configureMenuLayout'],
    enableToggleListener: true,
    toggleState: {
        logLevel: LogLevel.Trace,
        useLocalLogLevel: false,
        enableReportListener: true,
        enableToggleListener: true,
    }
});

export const appConfig: ApplicationConfig = {
    providers: [
        provideRouter(routes),
        provideAnimations(),
        {provide: DEFAULT_SRC_NAMES, useValue: ['data-service', 'log-service']}
    ]
};
