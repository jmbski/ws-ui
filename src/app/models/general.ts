import { MegaMenuItem, MenuItem } from 'primeng/api';
import { NgStyleValues } from './style-types';
import { ChangeDetectorRef, TemplateRef, Type } from '@angular/core';
import { ConsoleFunctName, ConsoleFunctDef } from '../services/log-service/log-service';

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

export interface MenuItemEventMods {
    item?: MenuItem | MegaMenuItem | WSMenuItem;
    data?: WSParams;
}
    
export type WSMenuItemEvent = ModdableType<Event, MenuItemEventMods>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type GeneralFunction<T> = (...args: any[]) => T;

export interface WSMenuItem extends MenuItem {
    customIcon?: NgStyleValues;
    command?: (event: WSMenuItemEvent) => void;
    wsStyle?: NgStyleValues | null;
    styleClass?: string;
    isExpanded?: boolean;
    maxHeight?: string;
}

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

/**
 * Interface for objects that can be logged.
 */
export interface LoggableObject {
    LOCAL_ID: string;
    localLogLevel?: LogLevel;
    canLog?: boolean;
}

export interface BaseComponentClass extends LoggableObject {
    cd: ChangeDetectorRef;

    [key: string]: unknown;
}
export type FunctionMap = Record<string, GeneralFunction<unknown>>;

/**
 * Log levels in order of severity.
 */
export enum LogLevel {
    Experimental,
    Trace,
    Debug,
    Info,
    Log,
    Warn,
    Error,
    Assert,
    None
}

/**
 * Interface for log settings.
 */
export type LocalLogSettings = Partial<LoggableObject>;

/**
 * Access modes for white/black lists.
 */
export type LogAccessMode = 'whitelist' | 'blacklist' | 'none';
export type ConsoleFunctLevelMap = Record<ConsoleFunctName, ConsoleFunctDef>;
