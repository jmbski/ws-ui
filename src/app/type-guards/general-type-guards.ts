import { TemplateRef, Type } from '@angular/core';
import { CssStyleObject, GeneralFunction, WeakObject, TypedRecord, StyleGroup } from 'warskald-ui/models';
import { isEmpty } from 'lodash';

/**
     * Checks if the input is a string indexed object.
     * 
     * @param input- The value to check if it is a string indexed object
     * @returns true if the input is a string indexed object, false otherwise
     */
export function isWeakObject(input: unknown): input is WeakObject {
    return typeof input === 'object' && input != null && !Array.isArray(input) && Object.keys(input).every(key => typeof key === 'string');
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
export function isFunction(value: unknown): value is GeneralFunction<unknown> {
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

export type TypeGuard<T> = (input: unknown) => input is T;

export interface PropertyTypeGuard {
    typeGuard: TypeGuard<unknown>;
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

export type ObjectTypeMapping = Record<string, PropertyTypeGuard>;

export const OptionalStringProp: PropertyTypeGuard = { typeGuard: isString, optional: true };
export const OptionalNumberProp: PropertyTypeGuard = { typeGuard: isNumber, optional: true };
export const OptionalBooleanProp: PropertyTypeGuard = { typeGuard: isBoolean, optional: true };
export const OptionalDateProp: PropertyTypeGuard = { typeGuard: isDate, optional: true };
export const OptionalFunctionProp: PropertyTypeGuard = { typeGuard: isFunction, optional: true };
export const OptionalRecordObjectProp: PropertyTypeGuard = { typeGuard: isWeakObject, optional: true };
export const OptionalRecordObjectArrayProp: PropertyTypeGuard = { typeGuard: isWeakObjectArray, optional: true };
export const OptionalStringArrayProp: PropertyTypeGuard = { typeGuard: isStringArray, optional: true };
export const OptionalNumberArrayProp: PropertyTypeGuard = { typeGuard: isNumberArray, optional: true };
export const OptionalBooleanArrayProp: PropertyTypeGuard = { typeGuard: isBooleanArray, optional: true };
export const OptionalDateArrayProp: PropertyTypeGuard = { typeGuard: isDateArray, optional: true };
export const OptionalExistsProp: PropertyTypeGuard = { typeGuard: exists, optional: true };
export const OptionalStyleProp: PropertyTypeGuard = { typeGuard: isStyle, optional: true };
export const OptionalArrayProp: PropertyTypeGuard = { typeGuard: isArray, optional: true };

export const StringProp: PropertyTypeGuard = { typeGuard: isString };
export const NumberProp: PropertyTypeGuard = { typeGuard: isNumber };
export const BooleanProp: PropertyTypeGuard = { typeGuard: isBoolean };
export const DateProp: PropertyTypeGuard = { typeGuard: isDate };
export const FunctionProp: PropertyTypeGuard = { typeGuard: isFunction };
export const RecordObjectProp: PropertyTypeGuard = { typeGuard: isWeakObject };
export const RecordObjectArrayProp: PropertyTypeGuard = { typeGuard: isWeakObjectArray };
export const StringArrayProp: PropertyTypeGuard = { typeGuard: isStringArray };
export const NumberArrayProp: PropertyTypeGuard = { typeGuard: isNumberArray };
export const BooleanArrayProp: PropertyTypeGuard = { typeGuard: isBooleanArray };
export const DateArrayProp: PropertyTypeGuard = { typeGuard: isDateArray };
export const ExistsProp: PropertyTypeGuard = { typeGuard: exists };
export const StyleProp: PropertyTypeGuard = { typeGuard: isStyle };
export const ArrayProp: PropertyTypeGuard = { typeGuard: isArray };


export function objectIsType<T>(obj: unknown, typeGuards: ObjectTypeMapping | string[]): obj is T {
    if(Array.isArray(typeGuards)) {
        return isWeakObject(obj) && typeGuards.every(key => isWeakObject(obj[key]));
    }
    return isWeakObject(obj) && Object.keys(typeGuards).every(key => {
        const { typeGuard, optional } = typeGuards[key];
        const property = obj[key];
        return optional ? isUndefined(property) || typeGuard(property) : typeGuard(property);
    });
}

export function isTypedRecord<T>(obj: unknown, typeGuard: TypeGuard<T>): obj is TypedRecord<T> {
    return isWeakObject(obj) && Object.values(obj).every(typeGuard);
}

export function isTypedRecordArray<T>(obj: unknown, typeGuard: (obj: unknown) => obj is T): obj is TypedRecord<T>[] {
    return Array.isArray(obj) && obj.every(item => isTypedRecord(item, typeGuard));
}

export function isNumericString(str: string): boolean {
    return !isNaN(Number(str));
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

export const StyleGroupTypeMap: ObjectTypeMapping = {
    baseClass: OptionalStringProp,
    optionalClass: OptionalStringProp,
    style: OptionalStyleProp,
};

export function isStyleGroup(obj: unknown): obj is StyleGroup {
    return objectIsType<StyleGroup>(obj, StyleGroupTypeMap);
}

export function isStyleGroupArray(obj: unknown): obj is StyleGroup[] {
    return Array.isArray(obj) && obj.every(isStyleGroup);
}