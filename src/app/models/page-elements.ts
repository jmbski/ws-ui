import { FormControl, FormGroup } from '@angular/forms';
import { WeakObject } from './general';
import { CssStyleObject, StyleGroup } from './style-types';
import { Type } from '@angular/core';

/**
 * Represents an element to render on a page
 */
export interface BaseComponentConfig {

    LOCAL_ID?: string;

    canLog?: boolean;

    localLogLevel?: number;

    label?: string;

    actionID?: string;

    /**
     * The type of element to render
     */
    elementType: ElementType; // @todo: add type/enum later

    /**
     * The id of the element
     */
    id: string;

    /**
     * The content to render in the element
     */
    content?: unknown;

    /**
     * Styles and classes to apply to the element
     */
    baseStyles?: StyleGroup;

    /**
     * The options to apply to the element
     */
    options?: WeakObject;

    /**
     * The children of the element
     */
    children?: BaseComponentConfig[];

    /**
     * Styles and classes to use for the layout of the element
     */
    layoutStyles?: StyleGroup;

    [key: string]: unknown;
}

export interface FormElementConfig extends BaseComponentConfig {
    hasForm: true;
    value: unknown;
    form?: FormControl | FormGroup;
}

/**
 * Represents a block of text meant to be rendered as an illuminated text block.
 */
export interface TextBlockConfig extends BaseComponentConfig {
    elementType: ElementType.TEXT_BLOCK;
    content: string;
    illuminated?: boolean;
    illuminatedColor?: string;
    illuminatedBorder?: string;
    escapeHTML?: boolean;
    bodyStyles?: StyleGroup;
}

export interface ContainerConfig extends BaseComponentConfig {
    elementType: ElementType.CONTAINER;
    elements?: BaseComponentConfig[];
}

export interface WsImageConfig extends BaseComponentConfig {
    elementType: ElementType.IMAGE;
    src?: string;
}

export enum ButtonAction {
    SUBMIT = 'submit',
    CANCEL = 'cancel',
    RESET = 'reset',
    CUSTOM = 'custom',
}

export interface ButtonConfig {
    id: string,
    label?: string;
    action?: ButtonAction;
    icon?: string;
    iconPosition?: string;
    iconStyles?: StyleGroup;
    styles?: StyleGroup;
    disabled?: boolean;

    [key: string]: unknown;
}

export interface ButtonGroupConfig extends BaseComponentConfig {
    elementType: ElementType.BUTTON_GROUP;
    buttons: ButtonConfig[];
    buttonStyles?: StyleGroup;
}

/**
 * Union type of all possible element configs
 */
export type ComponentConfig = TextBlockConfig | ContainerConfig | WsImageConfig | ButtonGroupConfig | FormElementConfig | BaseComponentConfig;


export enum ElementType {
    BUTTON_GROUP = 'button-group',
    CHECKBOX = 'checkbox',
    COMPONENT = 'component',
    CONTAINER = 'container',
    GENERAL = 'general',
    IMAGE = 'image',
    NUMBER_INPUT = 'number-input',
    SELECT = 'select',
    TEXT_BLOCK = 'text-block',
    TEXT_INPUT = 'text-input',
}

export type ElementComponentMap = Record<string, Type<unknown>>;


export interface ElementModel {
    classType: Type<unknown>;
    config: BaseComponentConfig;
    elementId: string;
    actionID?: string;
}

export const registeredClasses: Record<string, Type<unknown>> = {};

/* export function RegisterClassType<T>(...classNames: string[]) {
    return function _RegisterClassType(klass: Type<T>) {
        for(const className of classNames) {
            registeredClasses[className] = klass;
        }
        return klass;
    };
} */