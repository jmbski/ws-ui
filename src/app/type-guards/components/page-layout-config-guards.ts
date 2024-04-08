import { objIsType, OptionalBooleanProp, OptionalNumberProp, OptionalStyleGroupProp, OptionalStyleProp, OptionalWeakObjectProp, TypeMapping } from '../general-type-guards';

import { PageLayoutConfig } from 'warskald-ui/models';
import { isComponentDef } from '../page-type-guards';



const pageLayoutConfigTypeMap: TypeMapping<PageLayoutConfig> = {
    LOCAL_ID: OptionalStyleProp,
    localLogLevel: OptionalNumberProp,
    canLog: OptionalBooleanProp,
    pageLayoutStyles: OptionalStyleGroupProp,
    pageContentStyles: OptionalStyleGroupProp,
    customTopNavDef: { predicate: isComponentDef, optional: true },
    wsTopNavConfig: OptionalWeakObjectProp,
};

export function isPageLayoutConfig(value: unknown): value is PageLayoutConfig {
    return objIsType(value, pageLayoutConfigTypeMap);
}