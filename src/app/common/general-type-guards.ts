import { CssStyleObject, GeneralFunction, RecordObject, TypedRecord } from '@models';
import { isEmpty } from 'lodash';

/**
     * Checks if the input is a string indexed object.
     * 
     * @param input- The value to check if it is a string indexed object
     * @returns true if the input is a string indexed object, false otherwise
     */
export function IsRecordObject(input: unknown): input is RecordObject {
    return typeof input === 'object' && input != null && !Array.isArray(input) && Object.keys(input).every(key => typeof key === 'string');
}

export function IsArray(value: unknown): value is unknown[] {
    return Array.isArray(value);
}

/**
 * Checks if the input is an array of string indexed objects.
 * 
 * @param input - The value to check if it is an array of string indexed objects
 * @returns true if the input is an array of string indexed objects, false otherwise
 */
export function IsRecordObjectArray(input: unknown): input is RecordObject[] {
    return Array.isArray(input) && input.every(IsRecordObject);
}

/**
 * Checks if the input is numeric.
 * 
 * @param value - The value to check if it is numeric
 * @returns true if the input is numeric, false otherwise 
 */
export function IsNumeric(value: unknown): value is number | string {
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
export function IsString(value: unknown): value is string {
    return typeof value === 'string';
}

/**
 * Checks if the input is an array of strings.
 * 
 * @param value - The value to check if it is an array of strings
 * @returns true if the input is an array of strings, false otherwise
 */
export function IsStringArray(value: unknown): value is string[] {
    return Array.isArray(value) && value.every(IsString);
}

/**
 * Checks if the input is a number.
 * 
 * @param value - The value to check if it is a number
 * @returns true if the input is a number, false otherwise
 */
export function IsNumber(value: unknown): value is number {
    return typeof value === 'number';
}

/**
 * Checks if the input is an array of numbers.
 * 
 * @param value - The value to check if it is an array of numbers
 * @returns true if the input is an array of numbers, false otherwise
 */
export function IsNumberArray(value: unknown): value is number[] {
    return Array.isArray(value) && value.every(IsNumber);
}

/**
 * Checks if the input is a boolean.
 * 
 * @param value - The value to check if it is a boolean
 * @returns true if the input is a boolean, false otherwise
 */
export function IsBoolean(value: unknown): value is boolean {
    return typeof value === 'boolean';
}

/**
 * Checks if the input is an array of booleans.
 * 
 * @param value - The value to check if it is an array of booleans
 * @returns true if the input is an array of booleans, false otherwise
 */
export function IsBooleanArray(value: unknown): value is boolean[] {
    return Array.isArray(value) && value.every(IsBoolean);
}

/**
 * Checks if the input is a function.
 * 
 * @param value - The value to check if it is a function
 * @returns true if the input is a function, false otherwise
 */
export function IsFunction(value: unknown): value is GeneralFunction<unknown> {
    return typeof value === 'function';
}

/**
 * Checks if the input is a date.
 * 
 * @param value - The value to check if it is a date
 * @returns true if the input is a date, false otherwise
 */
export function IsDate(value: unknown): value is Date {
    return value instanceof Date;
}

/**
 * Checks if the input is an array of dates.
 * 
 * @param value - The value to check if it is an array of dates
 * @returns true if the input is an array of dates, false otherwise
 */
export function IsDateArray(value: unknown): value is Date[] {
    return Array.isArray(value) && value.every(IsDate);
}

export function IsUndefined(value: unknown): value is undefined {
    return value === undefined;
}

export type TypeGuard<T> = (input: unknown) => input is T;

export interface PropertyTypeGuard {
    typeGuard: TypeGuard<unknown>;
    optional?: boolean;
}
export type Defined = Exclude<unknown, undefined | null>;

export function Exists(obj: unknown): obj is Defined {
    return obj != null;
}

export function HasValue(obj: unknown): boolean {
    if(!Exists(obj)) {
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

export const OptionalStringProp: PropertyTypeGuard = { typeGuard: IsString, optional: true };
export const OptionalNumberProp: PropertyTypeGuard = { typeGuard: IsNumber, optional: true };
export const OptionalBooleanProp: PropertyTypeGuard = { typeGuard: IsBoolean, optional: true };
export const OptionalDateProp: PropertyTypeGuard = { typeGuard: IsDate, optional: true };
export const OptionalFunctionProp: PropertyTypeGuard = { typeGuard: IsFunction, optional: true };
export const OptionalRecordObjectProp: PropertyTypeGuard = { typeGuard: IsRecordObject, optional: true };
export const OptionalRecordObjectArrayProp: PropertyTypeGuard = { typeGuard: IsRecordObjectArray, optional: true };
export const OptionalStringArrayProp: PropertyTypeGuard = { typeGuard: IsStringArray, optional: true };
export const OptionalNumberArrayProp: PropertyTypeGuard = { typeGuard: IsNumberArray, optional: true };
export const OptionalBooleanArrayProp: PropertyTypeGuard = { typeGuard: IsBooleanArray, optional: true };
export const OptionalDateArrayProp: PropertyTypeGuard = { typeGuard: IsDateArray, optional: true };
export const OptionalExistsProp: PropertyTypeGuard = { typeGuard: Exists, optional: true };
export const OptionalStyleProp: PropertyTypeGuard = { typeGuard: IsStyle, optional: true };
export const OptionalArrayProp: PropertyTypeGuard = { typeGuard: IsArray, optional: true };

export const StringProp: PropertyTypeGuard = { typeGuard: IsString };
export const NumberProp: PropertyTypeGuard = { typeGuard: IsNumber };
export const BooleanProp: PropertyTypeGuard = { typeGuard: IsBoolean };
export const DateProp: PropertyTypeGuard = { typeGuard: IsDate };
export const FunctionProp: PropertyTypeGuard = { typeGuard: IsFunction };
export const RecordObjectProp: PropertyTypeGuard = { typeGuard: IsRecordObject };
export const RecordObjectArrayProp: PropertyTypeGuard = { typeGuard: IsRecordObjectArray };
export const StringArrayProp: PropertyTypeGuard = { typeGuard: IsStringArray };
export const NumberArrayProp: PropertyTypeGuard = { typeGuard: IsNumberArray };
export const BooleanArrayProp: PropertyTypeGuard = { typeGuard: IsBooleanArray };
export const DateArrayProp: PropertyTypeGuard = { typeGuard: IsDateArray };
export const ExistsProp: PropertyTypeGuard = { typeGuard: Exists };
export const StyleProp: PropertyTypeGuard = { typeGuard: IsStyle };
export const ArrayProp: PropertyTypeGuard = { typeGuard: IsArray };


export function ObjectIsType<T>(obj: unknown, typeGuards: ObjectTypeMapping | string[]): obj is T {
    if(Array.isArray(typeGuards)) {
        return IsRecordObject(obj) && typeGuards.every(key => IsRecordObject(obj[key]));
    }
    return IsRecordObject(obj) && Object.keys(typeGuards).every(key => {
        const { typeGuard, optional } = typeGuards[key];
        const property = obj[key];
        return optional ? IsUndefined(property) || typeGuard(property) : typeGuard(property);
    });
}

export function IsTypedRecord<T>(obj: unknown, typeGuard: TypeGuard<T>): obj is TypedRecord<T> {
    return IsRecordObject(obj) && Object.values(obj).every(typeGuard);
}

export function IsTypedRecordArray<T>(obj: unknown, typeGuard: (obj: unknown) => obj is T): obj is TypedRecord<T>[] {
    return Array.isArray(obj) && obj.every(item => IsTypedRecord(item, typeGuard));
}

export function IsNumericString(str: string): boolean {
    return !isNaN(Number(str));
}

export function StringToDate(dateString: string): Date | undefined {
    if (isNaN(Date.parse(dateString))) {
        return undefined;
    } else {
        return new Date(dateString);
    }
}

export function IsBooleanString(str: string): boolean {
    return str.toLowerCase() === 'true' || str.toLowerCase() === 'false';
}

export function IsCssStyleObject(obj: unknown): obj is CssStyleObject {
    return IsTypedRecord<string>(obj, IsString);
}

export function IsStyle(obj: unknown): obj is string | CssStyleObject {
    return IsString(obj) || IsCssStyleObject(obj);
}