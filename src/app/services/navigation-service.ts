import { Injectable } from '@angular/core';
import { LoggableObject, LogLevel } from 'warskald-ui/models';
import { nanoid } from 'nanoid';
import { NavigationExtras, Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class NavigationService implements LoggableObject {
    LOCAL_ID: string = 'NavigationService_' + nanoid();
    canLog?: boolean = true;
    localLogLevel?: LogLevel = LogLevel.Debug;

    public static router: Router;

    constructor(
        private _router: Router
    ) {
        NavigationService.router = _router;
    }

    public static navigateTo(route: string | string, extras?: NavigationExtras): void {
        NavigationService.router.navigate((<string[]>[]).concat(route), extras);
    }

    public static navigateToHome(): void {
        NavigationService.navigateTo('/');
    }

    public static navByUrl(url: string): void {
        NavigationService.router.navigateByUrl(url);
    }
}