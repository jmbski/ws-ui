import { ChangeDetectorRef, TemplateRef, Type } from '@angular/core';

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

export interface SelectButtonItem {
    label: string;
    value: string;
}

export interface LocalObject {
    readonly LOCAL_ID: string;
}

export type ElementSelector = string | TemplateRef<unknown> | HTMLElement;

export type ComponentType = Type<unknown> | TemplateRef<unknown>;

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
