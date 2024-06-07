import { KeyValue } from '@angular/common';
import { ChangeDetectorRef, ComponentRef, TemplateRef, Type } from '@angular/core';
import { AsyncValidatorFn, FormControl, ValidatorFn } from '@angular/forms';
import { SelectItem, TooltipOptions } from 'primeng/api';

/**
 * Shorthand for a record of string keys and values of type T.
 */
export type TypedRecord<T> = Record<string, T>;

/**
 * A string indexed object.
 */
export type WeakObject = TypedRecord<unknown>;

/**
 * Function that generates a union type of string literals.
 */
export function stringLiterals<T extends string>(...args: T[]): T[] {
    return args;
}

export function literalTypeUnion(...args: unknown[]): unknown[] {
    return args;
}

/**
 * Union type built from a list of string literals.
 */
export type UnionTypeOf<T extends ReadonlyArray<unknown>> = T extends ReadonlyArray<infer ElementType>
    ? ElementType
    : never;

/**
 * Modifies type T with properties from type M.
 */
export type ModdableType<T, M> = Omit<T, Extract<keyof T, keyof M>> & M;

export type WSParams = TypedRecord<unknown>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type GenericFunction<T> = (...args: any[]) => T;

export type MouseEventHandler = (event: MouseEvent) => void;

export type ChangeHandler = (event: Event) => void;

export type KeyHandler = (event: KeyboardEvent) => void;

export type ValueChangeHandler<T> = (value: T) => void;

export type TouchEventHandler = (event: TouchEvent) => void;

export interface SelectButtonItem {
    label: string;
    value: string;
}

export interface LocalObject {
    readonly LOCAL_ID: string;
}

export type ElementSelector = string | TemplateRef<unknown> | HTMLElement;

export type ComponentType = Type<unknown> | TemplateRef<unknown>;

export type DialogComponentType = ComponentType | string;

export interface ComponentDef<T> {
    component: ComponentType;
    config?: Partial<T>;
}

export interface BaseComponentClass extends Record<string, unknown> {
    LOCAL_ID: string;
    localLogLevel?: number;
    canLog?: boolean;
    cd: ChangeDetectorRef;
}
export type FunctionMap = Record<string, GenericFunction<unknown>>;

export type KeyOf<T> = Extract<keyof T, string>;

export type ValueOf<T> = T[KeyOf<T>];

export type Nullable<T = void> = T | null | undefined;

export type ObjectOf<T> = Partial<Record<KeyOf<T>, ValueOf<T>>>;

export type ButtonIconPosition = 'left' | 'right' | 'top' | 'bottom';

export interface ButtonAction {
    name: string;
    data?: WeakObject;
}

export type HTMLRef = HTMLElement | TemplateRef<unknown> | string;

export interface NgComponentOutletRef {
    _componentRef: ComponentRef<unknown>;

    [key: string]: unknown;
}

export type StrKeyValue = KeyValue<string, unknown>;

export type DictionaryType = 'string' | 'number' | 'boolean' | 'string[]' | 'number[]';

export const DictionaryTypes: SelectItem[] = [
    {label: 'String', value: 'string'},
    {label: 'Number', value: 'number'},
    {label: 'Boolean', value: 'boolean'},
    {label: 'String Array', value: 'string[]'},
    {label: 'Number Array', value: 'number[]'},
] as const;

export const DictionaryDefaults: Record<DictionaryType, unknown> = {
    string: '',
    number: 0,
    boolean: false,
    'string[]': [],
    'number[]': [],
};

export interface DictionaryItem {
    key: string;
    value: unknown;
    type?: DictionaryType;
    keyControl: FormControl;
    tooltip: string;
    valueControl: FormControl;
}

export type FormValidator = ValidatorFn | AsyncValidatorFn;

export interface FormValidatorConfig {
    validator: FormValidator;
    message?: string;
    id?: string;
}