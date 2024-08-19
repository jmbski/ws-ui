import { isString, isStringArray, matchesAnyOfFactory, objIsType, OptionalBooleanProp, OptionalExistsProp, OptionalStringProp, OptionalWeakObjectProp, stringUnionGuardFactory, TypeMapping } from 'warskald-ui/type-guards';
import { NavAction } from './navigation-service-types';
import { ActivatedRoute, NavigationExtras } from '@angular/router';

export function isActivatedRoute(obj: unknown): obj is ActivatedRoute {
    return obj instanceof ActivatedRoute;
}

const navigationExtrasTypeMap: TypeMapping<NavigationExtras> = {
    fragment: OptionalStringProp,
    queryParams: OptionalWeakObjectProp,
    queryParamsHandling: {
        predicate: stringUnionGuardFactory('preserve', 'merge', ''), 
        optional: true
    },
    preserveFragment: OptionalBooleanProp,
    relativeTo: { predicate: isActivatedRoute, optional: true },
    skipLocationChange: OptionalBooleanProp,
    info: OptionalExistsProp,
    state: OptionalWeakObjectProp,
    onSameUrlNavigation: {
        predicate: stringUnionGuardFactory('reload', 'ignore'),
        optional: true
    },
    replaceUrl: OptionalBooleanProp
};

export function isNavigationExtras(obj: unknown): obj is NavigationExtras {
    return objIsType<NavigationExtras>(obj, navigationExtrasTypeMap);
}


const navActionTypeMap: TypeMapping<NavAction> = {
    route: { predicate: matchesAnyOfFactory(isString, isStringArray) },
    extras: { predicate: isNavigationExtras, optional: true }
};

export function isNavAction(obj: unknown): obj is NavAction {
    return objIsType<NavAction>(obj, navActionTypeMap);
}