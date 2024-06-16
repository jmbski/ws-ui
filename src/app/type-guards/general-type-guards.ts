import { TemplateRef, Type } from '@angular/core';
import { CssStyleObject, GenericFunction, WeakObject, TypedRecord, StyleGroup, UnionTypeOf, KeyOf } from 'warskald-ui/models';
import { isEmpty } from 'lodash';
import { FormControl, FormGroup } from '@angular/forms';

/**
     * Checks if the input is a string indexed object.
     * 
     * @param input- The value to check if it is a string indexed object
     * @returns true if the input is a string indexed object, false otherwise
     */
export function isWeakObject(input: unknown): input is WeakObject {
    return typeof input === 'object' && input != null && !Array.isArray(input) && Object.keys(input).every(key => typeof key === 'string');
}

/**
 * Checks if the input is an object that is not an array.
 * While this will typically result in the same value as isWeakObject, it is a quicker check,
 * but also less strict.
 * 
 * @param input - The value to check if it is an object that is not an array
 * @returns true if the input is an object that is not an array, false otherwise
 */
export function isWeakObjectQuick(input: unknown): input is WeakObject {
    return typeof input === 'object' && input != null && !Array.isArray(input);
}

export function isArray(value: unknown): value is unknown[] {
    return Array.isArray(value);
}

/**
 * Checks if the input is an array of string indexed objects.
 * 
 * @param input - The value to check if it is an array of string indexed objects
 * @returns true if the input is an array of string indexed objects, false otherwise
 */
export function isWeakObjectArray(input: unknown): input is WeakObject[] {
    return Array.isArray(input) && input.every(isWeakObject);
}

/**
 * Checks if the input is numeric.
 * 
 * @param value - The value to check if it is numeric
 * @returns true if the input is numeric, false otherwise 
 */
export function isNumeric(value: unknown): value is number | string {
    if(typeof value === 'number') {
        return true;
    }
    if(typeof value === 'string') {
        return !isNaN(parseFloat(value));
    }
    return false;
}

/**
 * Checks if the input is a string.
 * 
 * @param value - The value to check if it is a string
 * @returns true if the input is a string, false otherwise
 */
export function isString(value: unknown): value is string {
    return typeof value === 'string';
}

/**
 * Checks if the input is an array of strings.
 * 
 * @param value - The value to check if it is an array of strings
 * @returns true if the input is an array of strings, false otherwise
 */
export function isStringArray(value: unknown): value is string[] {
    return Array.isArray(value) && value.every(isString);
}

/**
 * Checks if the input is a number.
 * 
 * @param value - The value to check if it is a number
 * @returns true if the input is a number, false otherwise
 */
export function isNumber(value: unknown): value is number {
    return typeof value === 'number';
}

/**
 * Checks if the input is an array of numbers.
 * 
 * @param value - The value to check if it is an array of numbers
 * @returns true if the input is an array of numbers, false otherwise
 */
export function isNumberArray(value: unknown): value is number[] {
    return Array.isArray(value) && value.every(isNumber);
}

/**
 * Checks if the input is a boolean.
 * 
 * @param value - The value to check if it is a boolean
 * @returns true if the input is a boolean, false otherwise
 */
export function isBoolean(value: unknown): value is boolean {
    return typeof value === 'boolean';
}

/**
 * Checks if the input is an array of booleans.
 * 
 * @param value - The value to check if it is an array of booleans
 * @returns true if the input is an array of booleans, false otherwise
 */
export function isBooleanArray(value: unknown): value is boolean[] {
    return Array.isArray(value) && value.every(isBoolean);
}

/**
 * Checks if the input is a function.
 * 
 * @param value - The value to check if it is a function
 * @returns true if the input is a function, false otherwise
 */
export function isFunction(value: unknown): value is GenericFunction<unknown> {
    return typeof value === 'function';
}

/**
 * Checks if the input is a date.
 * 
 * @param value - The value to check if it is a date
 * @returns true if the input is a date, false otherwise
 */
export function isDate(value: unknown): value is Date {
    return value instanceof Date;
}

/**
 * Checks if the input is an array of dates.
 * 
 * @param value - The value to check if it is an array of dates
 * @returns true if the input is an array of dates, false otherwise
 */
export function isDateArray(value: unknown): value is Date[] {
    return Array.isArray(value) && value.every(isDate);
}

export function isUndefined(value: unknown): value is undefined {
    return value === undefined;
}

export function isComparableType(value: unknown): value is number | string | Date | boolean {
    return isNumeric(value) || isString(value) || isDate(value) || isBoolean(value);
}

export type TypeGuard<T> = (input: unknown) => input is T;

export interface PropertyTypeGuard {
    predicate: TypeGuard<unknown>;
    optional?: boolean;
}
export type Defined = Exclude<unknown, undefined | null>;

export function exists(obj: unknown): obj is Defined {
    return obj != null;
}

export function hasValue(obj: unknown): boolean {
    if(!exists(obj)) {
        return false;
    }
    if(typeof obj === 'string' && obj.trim() === '') {
        return false;
    }
    if(isEmpty(obj)) {
        return false;
    }

    return true;
}

export function matchesAllOf<T extends unknown[]>(value: unknown, ...typeGuards: {[K in keyof T]: TypeGuard<T[K]>}): value is T {
    return typeGuards.every(typeGuard => typeGuard(value));
}

export function matchesAnyOf<T extends unknown[]>(value: unknown, ...typeGuards: {[K in keyof T]: TypeGuard<T[K]>}): value is T {
    return typeGuards.some(typeGuard => typeGuard(value));
}

export function matchesAllOfFactory<T extends unknown[]>(...typeGuards: {[K in keyof T]: TypeGuard<T[K]>}) {
    return (value: unknown): value is T => matchesAllOf(value, ...typeGuards);
}

export function matchesAnyOfFactory<T extends unknown[]>(...typeGuards: {[K in keyof T]: TypeGuard<T[K]>}) {
    return (value: unknown): value is T => matchesAnyOf(value, ...typeGuards);
}

export function stringUnionGuardFactory(...types: string[]): TypeGuard<UnionTypeOf<typeof types>> {
    return (value: unknown): value is string => isString(value) && types.includes(value);
}

export type TypeMapping<T> = Record<keyof T, PropertyTypeGuard>;

export const OptionalStringProp: PropertyTypeGuard = { predicate: isString, optional: true };
export const OptionalNumberProp: PropertyTypeGuard = { predicate: isNumber, optional: true };
export const OptionalBooleanProp: PropertyTypeGuard = { predicate: isBoolean, optional: true };
export const OptionalDateProp: PropertyTypeGuard = { predicate: isDate, optional: true };
export const OptionalFunctionProp: PropertyTypeGuard = { predicate: isFunction, optional: true };
export const OptionalWeakObjectProp: PropertyTypeGuard = { predicate: isWeakObject, optional: true };
export const OptionalWeakObjectArrayProp: PropertyTypeGuard = { predicate: isWeakObjectArray, optional: true };
export const OptionalStringArrayProp: PropertyTypeGuard = { predicate: isStringArray, optional: true };
export const OptionalNumberArrayProp: PropertyTypeGuard = { predicate: isNumberArray, optional: true };
export const OptionalBooleanArrayProp: PropertyTypeGuard = { predicate: isBooleanArray, optional: true };
export const OptionalDateArrayProp: PropertyTypeGuard = { predicate: isDateArray, optional: true };
export const OptionalExistsProp: PropertyTypeGuard = { predicate: exists, optional: true };
export const OptionalStyleProp: PropertyTypeGuard = { predicate: isStyle, optional: true };
export const OptionalArrayProp: PropertyTypeGuard = { predicate: isArray, optional: true };
export const OptionalStyleGroupProp: PropertyTypeGuard = { predicate: isStyleGroup, optional: true };

export const StringProp: PropertyTypeGuard = { predicate: isString };
export const NumberProp: PropertyTypeGuard = { predicate: isNumber };
export const BooleanProp: PropertyTypeGuard = { predicate: isBoolean };
export const DateProp: PropertyTypeGuard = { predicate: isDate };
export const FunctionProp: PropertyTypeGuard = { predicate: isFunction };
export const WeakObjectProp: PropertyTypeGuard = { predicate: isWeakObject };
export const WeakObjectArrayProp: PropertyTypeGuard = { predicate: isWeakObjectArray };
export const StringArrayProp: PropertyTypeGuard = { predicate: isStringArray };
export const NumberArrayProp: PropertyTypeGuard = { predicate: isNumberArray };
export const BooleanArrayProp: PropertyTypeGuard = { predicate: isBooleanArray };
export const DateArrayProp: PropertyTypeGuard = { predicate: isDateArray };
export const ExistsProp: PropertyTypeGuard = { predicate: exists };
export const StyleProp: PropertyTypeGuard = { predicate: isStyle };
export const ArrayProp: PropertyTypeGuard = { predicate: isArray };
export const StyleGroupProp: PropertyTypeGuard = { predicate: isStyleGroup };


export function objIsType<T>(obj: unknown, typeGuards: TypeMapping<T> | string[]): obj is T {
    if(Array.isArray(typeGuards)) {
        return isWeakObject(obj) && typeGuards.every(key => Object.hasOwn(obj, key));
    }
    return isWeakObject(obj) && Object.keys(typeGuards).every(key => {
        const { predicate, optional } = typeGuards[key as keyof T];
        const property = obj[key];
        return optional ? isUndefined(property) || predicate(property) : predicate(property);
    });
}

export function isTypedRecord<T>(obj: unknown, typeGuard: TypeGuard<T>): obj is TypedRecord<T> {
    return isWeakObject(obj) && Object.values(obj).every(typeGuard);
}

export function isTypedRecordArray<T>(obj: unknown, typeGuard: (obj: unknown) => obj is T): obj is TypedRecord<T>[] {
    return Array.isArray(obj) && obj.every(item => isTypedRecord(item, typeGuard));
}

export function isNumericString(str: string, strict: boolean = true): boolean {
    return (strict && !isNaN(Number(str))) || (!strict && !isNaN(parseFloat(str)));
}

export function stringToDate(dateString: string): Date | undefined {
    if (isNaN(Date.parse(dateString))) {
        return undefined;
    } else {
        return new Date(dateString);
    }
}

export function isBooleanString(str: string): boolean {
    return str.toLowerCase() === 'true' || str.toLowerCase() === 'false';
}

export function isCssStyleObject(obj: unknown): obj is CssStyleObject {
    return isTypedRecord<string>(obj, isString);
}

export function isStyle(obj: unknown): obj is string | CssStyleObject {
    return isString(obj) || isCssStyleObject(obj);
}

export function isTemplateRef(obj: unknown): obj is TemplateRef<unknown> {
    return obj instanceof TemplateRef;
}

export function isComponentClass(obj: unknown): obj is Type<unknown> {
    return obj instanceof Type;
}

export const StyleGroupTypeMap: TypeMapping<StyleGroup> = {
    baseClass: OptionalStringProp,
    optionalClass: OptionalStringProp,
    style: OptionalStyleProp,
    overrideDefault: OptionalBooleanProp,
};

export function isStyleGroup(obj: unknown): obj is StyleGroup {
    return objIsType<StyleGroup>(obj, StyleGroupTypeMap);
}

export function isStyleGroupArray(obj: unknown): obj is StyleGroup[] {
    return Array.isArray(obj) && obj.every(isStyleGroup);
}

export function isFunctionRecord(obj: unknown): obj is Record<string, GenericFunction<unknown>> {
    return isTypedRecord(obj, isFunction);
}

export function isCast<T>(value: unknown): value is T {
    return true;
}

export function castAs<T>(value: unknown): T {
    return value as T;
}

export function isForm(obj: unknown): obj is FormControl | FormGroup {
    return obj instanceof FormControl || obj instanceof FormGroup;
}

export function isKeyOf<T>(value: unknown, obj: T): value is KeyOf<T> {
    return isWeakObject(obj) && isString(value) && Object.keys(obj).includes(value);
}