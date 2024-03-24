import { ApplicationConfig } from '@angular/core';
import { provideRouter, Routes } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { DEFAULT_SRC_NAMES } from './services/data-service';
import { LogLevel, LogService } from './services/log-service';

export const routes: Routes = [
    { path: '', redirectTo: 'showcase', pathMatch: 'full' },
    { path: 'showcase', loadComponent: () => import('./showcase/showcase.component').then(m => m.ShowcaseComponent) },
];
LogService.updateLogServiceSettings({
    logLevel: LogLevel.Log,
    useStrictLocalLogLevel: false,
});

export const appConfig: ApplicationConfig = {
    providers: [
        provideRouter(routes),
        provideAnimations(),
        {provide: DEFAULT_SRC_NAMES, useValue: ['data-service', 'log-service']}
    ]
};
