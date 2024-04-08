import { 
    ComponentClassBase, 
    ComponentDef, 
    ComponentType, 
    ContainerConfig, 
    ElementType, 
    IComponentConfig, 
    TextBlockConfig, 
    WsImageConfig
} from 'warskald-ui/models';

import { 
    isArray, 
    isString, 
    objIsType, 
    TypeMapping, 
    OptionalBooleanProp, 
    OptionalExistsProp, 
    OptionalWeakObjectProp, 
    OptionalStringProp, 
    OptionalStyleProp, 
    StringProp, 
    OptionalNumberProp
} from './general-type-guards';
import { TemplateRef, Type } from '@angular/core';

const { COMPONENT, CONTAINER, IMAGE, TEXT_BLOCK } = ElementType;


export function isComponentType(value: unknown): value is ComponentType {
    return value instanceof TemplateRef || value instanceof Type;
}

export function IsElementType(value: unknown): value is ElementType {
    return isString(value) && (<string[]>Object.values(ElementType)).includes(value);
}

const componentDefTypeMap: TypeMapping<ComponentDef<unknown>> = {
    component: { predicate: isComponentType },
    config: OptionalWeakObjectProp,
};

export function isComponentDef<T>(value: unknown): value is ComponentDef<T> {
    return objIsType<ComponentDef<T>>(value, componentDefTypeMap);
}

export const IComponentConfigTypeMap: TypeMapping<IComponentConfig> = {
    elementType: { predicate: IsElementType },
    id: StringProp,
    content: OptionalExistsProp,
    style: OptionalStyleProp,
    styleClass: OptionalStringProp,
    options: OptionalWeakObjectProp,
    children: { predicate: IsIComponentConfigArray, optional: true },
    layoutClass: OptionalStringProp,
    layoutStyle: OptionalStyleProp,
};

export function IsIComponentConfig(value: unknown): value is IComponentConfig {
    return objIsType(value, IComponentConfigTypeMap);
}

export function IsIComponentConfigArray(value: unknown): value is IComponentConfig[] {
    return isArray(value) && value.every(IsIComponentConfig);
}

export function IsTextBlockEnum(value: unknown): value is ElementType.TEXT_BLOCK {
    return value === TEXT_BLOCK;
}

export function IsContainerEnum(value: unknown): value is ElementType.CONTAINER {
    return value === CONTAINER;
}

export function IsImageEnum(value: unknown): value is ElementType.IMAGE {
    return value === IMAGE;
}

export function IsComponentEnum(value: unknown): value is ElementType.COMPONENT {
    return value === COMPONENT;
}


export function IsElementTypeOf<T extends ElementType>(value: unknown, elementType: T): value is T {
    return value === elementType;
}

export const TextBlockTypeMap: TypeMapping<TextBlockConfig> = {
    elementType: { predicate: IsTextBlockEnum },
    content: { predicate: isString },
    illuminated: OptionalBooleanProp,
    illuminatedColor: OptionalStringProp,
    illuminatedBorder: OptionalStringProp,
};

export const ContainerTypeMap: TypeMapping<ContainerConfig> = {
    elementType: { predicate: IsContainerEnum },
    elements: { predicate: IsIComponentConfigArray }
};

export const ImageTypeMap: TypeMapping<WsImageConfig> = {
    LOCAL_ID: StringProp,
    canLog: OptionalBooleanProp,
    localLogLevel: OptionalNumberProp,
    elementType: { predicate: IsImageEnum },
    src: OptionalStringProp,
};

/**
 * Checks if the input is a text block config.
 * 
 * @param value - The value to check if it is a text block config
 * @returns true if the input is a text block config, false otherwise
 */
export function IsTextBlock(value: unknown): value is TextBlockConfig {
    return IsIComponentConfig(value) && objIsType(value, TextBlockTypeMap);
}

export function IsTextBlockArray(value: unknown): value is TextBlockConfig[] {
    return isArray(value) && value.every(IsTextBlock);
}

export function IsContainer(value: unknown): value is ContainerConfig {
    return IsIComponentConfig(value) && objIsType<ContainerConfig>(value, ContainerTypeMap);
}

export function IsContainerArray(value: unknown): value is ContainerConfig[] {
    return isArray(value) && value.every(IsContainer);
}

export function IsImage(value: unknown): value is WsImageConfig {
    return IsIComponentConfig(value) && objIsType<WsImageConfig>(value, ImageTypeMap);
}

export function IsImageArray(value: unknown): value is WsImageConfig[] {
    return isArray(value) && value.every(IsImage);
}

export function IsComponent(value: unknown): value is ComponentClassBase {
    return value instanceof ComponentClassBase;
}

export function IsComponentArray(value: unknown): value is IComponentConfig[] {
    return isArray(value) && value.every(IsComponent);
}