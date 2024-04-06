import { Injectable } from '@angular/core';
import { Loggable, LoggableObject, LogLevels } from './log-service/_index';
import { nanoid } from 'nanoid';
import { NavigationExtras, Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class NavigationService implements LoggableObject {
    LOCAL_ID: string = 'NavigationService_' + nanoid();
    canLog?: boolean = true;
    localLogLevel?: number = LogLevels.Debug;

    public static router: Router;

    constructor(
        private _router: Router
    ) {
        NavigationService.router = _router;
    }

    @Loggable()
    public static navigateTo(route: string | string, extras?: NavigationExtras): void {
        NavigationService.router.navigate((<string[]>[]).concat(route), extras);
    }

    @Loggable()
    public static navigateToHome(): void {
        NavigationService.navigateTo('/');
    }

    @Loggable()
    public static navByUrl(url: string): void {
        NavigationService.router.navigateByUrl(url);
    }
}