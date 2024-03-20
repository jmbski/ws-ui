import { ComponentClassBase, ContainerConfig, ElementType, IComponentConfig, TextBlockConfig } from 'src/app/models/_index';
import { Exists, ExistsProp, HasValue, IsArray, IsBoolean, IsRecordObject, IsString, IsStyle, IsUndefined, ObjectIsType, ObjectTypeMapping, OptionalArrayProp, OptionalBooleanProp, OptionalExistsProp, OptionalRecordObjectProp, OptionalStringProp, OptionalStyleProp, StringProp } from '../common/general-type-guards';
import { ImageConfig } from '@angular/common';

const { COMPONENT, CONTAINER, IMAGE, TEXT_BLOCK } = ElementType;

export function IsElementType(value: unknown): value is ElementType {
    return IsString(value) && (<string[]>Object.values(ElementType)).includes(value);
}

export const IComponentConfigTypeMap: ObjectTypeMapping = {
    elementType: { typeGuard: IsElementType },
    id: StringProp,
    content: OptionalExistsProp,
    style: OptionalStyleProp,
    styleClass: OptionalStringProp,
    options: OptionalRecordObjectProp,
    children: { typeGuard: IsIComponentConfigArray, optional: true},
    layoutClass: OptionalStringProp,
    layoutStyle: OptionalStyleProp,
};

export function IsIComponentConfig(value: unknown): value is IComponentConfig {
    return ObjectIsType(value, IComponentConfigTypeMap);
}

export function IsIComponentConfigArray(value: unknown): value is IComponentConfig[] {
    return IsArray(value) && value.every(IsIComponentConfig);
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
    content: { typeGuard: IsString },
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
    return IsIComponentConfig(value) && ObjectIsType(value, TextBlockTypeMap);
}

export function IsTextBlockArray(value: unknown): value is TextBlockConfig[] {
    return IsArray(value) && value.every(IsTextBlock);
}

export function IsContainer(value: unknown): value is ContainerConfig {
    return IsIComponentConfig(value) && ObjectIsType<ContainerConfig>(value, ContainerTypeMap);
}

export function IsContainerArray(value: unknown): value is ContainerConfig[] {
    return IsArray(value) && value.every(IsContainer);
}

export function IsImage(value: unknown): value is ImageConfig {
    return IsIComponentConfig(value) && ObjectIsType<ImageConfig>(value, ImageTypeMap);
}

export function IsImageArray(value: unknown): value is ImageConfig[] {
    return IsArray(value) && value.every(IsImage);
}

export function IsComponent(value: unknown): value is ComponentClassBase {
    return value instanceof ComponentClassBase;
}

export function IsComponentArray(value: unknown): value is IComponentConfig[] {
    return IsArray(value) && value.every(IsComponent);
}