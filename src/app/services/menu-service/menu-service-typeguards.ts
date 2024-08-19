import { objIsType, OptionalBooleanProp, OptionalFunctionProp, OptionalStringProp, OptionalStyleProp, OptionalWeakObjectProp, TypeMapping } from 'warskald-ui/type-guards';
import { WSMenuItem } from './menu-service-types';
import { isNavAction } from '../nav-service/navigation-service-typeguards';

const wsMenuItemTypeMap: TypeMapping<WSMenuItem> = {
    command: OptionalFunctionProp,
    customIcon: OptionalStyleProp,
    disabled: OptionalBooleanProp,
    icon: OptionalStringProp,
    id: OptionalStringProp,
    isExpanded: OptionalBooleanProp,
    items: { predicate: isWSMenuItemArray, optional: true },
    label: OptionalStringProp,
    maxHeight: OptionalStringProp,
    navAction: { predicate: isNavAction, optional: true},
    tooltip: OptionalStringProp,
    tooltipOptions: OptionalWeakObjectProp,
    tooltipPosition: OptionalStringProp,
    visible: OptionalBooleanProp,
};

export function isWSMenuItem(obj: unknown): obj is WSMenuItem {
    return objIsType<WSMenuItem>(obj, wsMenuItemTypeMap);
}

export function isWSMenuItemArray(obj: unknown): obj is WSMenuItem[] {
    return Array.isArray(obj) && obj.every((item) => isWSMenuItem(item));
}