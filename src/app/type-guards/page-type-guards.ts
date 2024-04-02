import { 
    ComponentClassBase, 
    ContainerConfig, 
    ElementType, 
    IComponentConfig, 
    TextBlockConfig 
} from 'warskald-ui/models';

import { 
    isArray, 
    isString, 
    objectIsType, 
    ObjectTypeMapping, 
    OptionalBooleanProp, 
    OptionalExistsProp, 
    OptionalWeakObjectProp, 
    OptionalStringProp, 
    OptionalStyleProp, 
    StringProp 
} from './general-type-guards';

import { ImageConfig } from '@angular/common';

const { COMPONENT, CONTAINER, IMAGE, TEXT_BLOCK } = ElementType;

export function IsElementType(value: unknown): value is ElementType {
    return isString(value) && (<string[]>Object.values(ElementType)).includes(value);
}

export const IComponentConfigTypeMap: ObjectTypeMapping = {
    elementType: { typeGuard: IsElementType },
    id: StringProp,
    content: OptionalExistsProp,
    style: OptionalStyleProp,
    styleClass: OptionalStringProp,
    options: OptionalWeakObjectProp,
    children: { typeGuard: IsIComponentConfigArray, optional: true },
    layoutClass: OptionalStringProp,
    layoutStyle: OptionalStyleProp,
};

export function IsIComponentConfig(value: unknown): value is IComponentConfig {
    return objectIsType(value, IComponentConfigTypeMap);
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

export const TextBlockTypeMap: ObjectTypeMapping = {
    elementType: { typeGuard: IsTextBlockEnum },
    content: { typeGuard: isString },
    illuminated: OptionalBooleanProp,
    illuminatedColor: OptionalStringProp,
    illuminatedBorder: OptionalStringProp,
};

export const ContainerTypeMap: ObjectTypeMapping = {
    elementType: { typeGuard: IsContainerEnum },
    elements: { typeGuard: IsIComponentConfigArray }
};

export const ImageTypeMap: ObjectTypeMapping = {
    elementType: { typeGuard: IsImageEnum },
    src: OptionalStringProp,
};

/**
 * Checks if the input is a text block config.
 * 
 * @param value - The value to check if it is a text block config
 * @returns true if the input is a text block config, false otherwise
 */
export function IsTextBlock(value: unknown): value is TextBlockConfig {
    return IsIComponentConfig(value) && objectIsType(value, TextBlockTypeMap);
}

export function IsTextBlockArray(value: unknown): value is TextBlockConfig[] {
    return isArray(value) && value.every(IsTextBlock);
}

export function IsContainer(value: unknown): value is ContainerConfig {
    return IsIComponentConfig(value) && objectIsType<ContainerConfig>(value, ContainerTypeMap);
}

export function IsContainerArray(value: unknown): value is ContainerConfig[] {
    return isArray(value) && value.every(IsContainer);
}

export function IsImage(value: unknown): value is ImageConfig {
    return IsIComponentConfig(value) && objectIsType<ImageConfig>(value, ImageTypeMap);
}

export function IsImageArray(value: unknown): value is ImageConfig[] {
    return isArray(value) && value.every(IsImage);
}

export function IsComponent(value: unknown): value is ComponentClassBase {
    return value instanceof ComponentClassBase;
}

export function IsComponentArray(value: unknown): value is IComponentConfig[] {
    return isArray(value) && value.every(IsComponent);
}