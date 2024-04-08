import { NavigationExtras } from '@angular/router';

/**
 * Interface for a navigation action so external services can define navigation actions
 * without needing to know about Angular's router.
 */
export interface NavAction {
    route: string | string[];
    extras?: NavigationExtras;
}