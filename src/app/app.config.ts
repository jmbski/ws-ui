import { ApplicationConfig } from '@angular/core';
import { provideRouter, Routes } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { DataService, DEFAULT_SRC_NAMES } from './services/data-service/data-service';
import { EzLogService } from 'warskald-ui/services';
import { logServiceConfig } from 'environment';

export const routes: Routes = [
    { path: '', redirectTo: 'showcase', pathMatch: 'full' },
    { path: 'showcase', loadComponent: () => import('./showcase/showcase.component').then(m => m.ShowcaseComponent) },
    { path: 'test', loadComponent: () => import('./showcase/test/test.component').then(m => m.TestComponent) },
];


EzLogService.initialize(logServiceConfig);
DataService.initialize();
export const appConfig: ApplicationConfig = {
    providers: [
        provideRouter(routes),
        provideAnimations(),
        {provide: DEFAULT_SRC_NAMES, useValue: ['data-service', 'log-service']}
    ]
};
