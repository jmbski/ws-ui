import { TopNavConfig } from 'warskald-ui/models';
import { objIsType, OptionalStringProp, OptionalStyleGroupProp, TypeMapping } from '../general-type-guards';
import { isComponentDef } from '../page-type-guards';


const TopNavConfigTypeMap: TypeMapping<TopNavConfig> = {
    headerStyles: OptionalStyleGroupProp,
    headerTextStyles: OptionalStyleGroupProp,
    headerText: OptionalStringProp,
    topNavWrapperStyles: OptionalStyleGroupProp,
    topNavShadowStyles: OptionalStyleGroupProp,
    topNavStyles: OptionalStyleGroupProp,
    logoDef: { predicate: isComponentDef, optional: true },
    navMenuWrapperStyles: OptionalStyleGroupProp,
    navMenuDef: { predicate: isComponentDef, optional: true },
    topNavDef: { predicate: isComponentDef, optional: true },
};

export function isTopNavConfig(value: unknown): value is TopNavConfig {
    return objIsType(value, TopNavConfigTypeMap);
}