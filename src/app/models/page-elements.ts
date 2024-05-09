import { FormControl, FormGroup } from '@angular/forms';
import { WeakObject } from './general';
import { StyleGroup } from './style-types';
import { Type } from '@angular/core';
import { ElementType } from './element-types';

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
    value?: unknown;

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

// export type PMultiSelectConfig = Partial<Omit<MultiSelect, 'options' | '_options'>>;




export type ElementComponentMap = Record<string, Type<unknown>>;


export interface ElementModel {
    classType: Type<unknown>;
    config: BaseComponentConfig;
    elementId: string;
    actionID?: string;
}