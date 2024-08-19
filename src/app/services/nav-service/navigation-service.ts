import { Injectable } from '@angular/core';
import { LoggableClass, LogLevels } from '../log-service/_index';
import { Router } from '@angular/router';
import { NavAction } from './navigation-service-types';
import { isStringArray } from 'warskald-ui/type-guards';

/**
 * A service for managing navigation.
 */
@LoggableClass({
    LOCAL_ID: 'NavigationService',
    autoAddLogs: true,
    canLog: true,
    localLogLevel: LogLevels.Error
})
@Injectable({
    providedIn: 'root'
})
export class NavigationService {

    // #region public properties
    
    public static router: Router;
    
    // #endregion public properties
    
    
    // #region private properties
    
    // #endregion private properties
    
    
    // #region getters/setters
    
    // #endregion getters/setters
    
    
    // #region standard inputs
    
    // #endregion standard inputs
    
    
    // #region get/set inputs
    
    // #endregion get/set inputs
    
    
    // #region outputs, emitters, and event listeners
    
    // #endregion outputs, emitters, and event listeners
    
    
    // #region viewchildren and contentchildren
    
    // #endregion viewchildren and contentchildren
    
    
    // #region constructor and lifecycle hooks
    
    // #endregion constructor and lifecycle hooks
    
    
    // #region public methods

    public static initialize(router: Router): void {
        NavigationService.router = router;
    }

    /**
     * Navigates to the specified route. If the route is an array, it will use the navigate method. 
     * Otherwise, it will use the navigateByUrl method.
     * 
     * @param action - The action to take.
     */
    public static navigate(action: NavAction): void {
        const { route, extras } = action;
        if(isStringArray(route)) {
            NavigationService.router.navigate(route, extras);
        }
        else {
            NavigationService.router.navigateByUrl(route, extras);
        }
    }

    public static navigateToHome(): void {
        NavigationService.navigate({ route: ['/'] });
    }
    
    // #endregion public methods
    
    
    // #region protected methods
    
    // #endregion protected methods
    
    
    // #region private methods
    
    // #endregion private methods
}