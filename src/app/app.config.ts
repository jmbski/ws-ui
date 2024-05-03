import { ApplicationConfig } from '@angular/core';
import { provideRouter, Routes } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { DataService, DEFAULT_SRC_NAMES } from './services/data-service/data-service';
import { ClassRegistry, NgLogService } from 'warskald-ui/services';
import { logServiceConfig } from 'environment';
import { WsComponentMap } from 'warskald-ui/components';

export const routes: Routes = [
    { path: '', redirectTo: 'showcase', pathMatch: 'full' },
    { path: 'showcase', loadComponent: () => import('./showcase/showcase.component').then(m => m.ShowcaseComponent) },
    { path: 'test', loadComponent: () => import('./showcase/test/test.component').then(m => m.TestComponent) },
];


NgLogService.initialize(logServiceConfig);
DataService.initialize();
ClassRegistry.initialize(WsComponentMap);
export const appConfig: ApplicationConfig = {
    providers: [
        provideRouter(routes),
        provideAnimations(),
        {provide: DEFAULT_SRC_NAMES, useValue: ['data-service', 'log-service']}
    ]
};
