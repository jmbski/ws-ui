import { Dictionary, NumericDictionary } from 'lodash';
import { GenericFunction } from './general';

export type PContainsTypes = string | number | Date | unknown[] | boolean;

export type PUnknownFilterFunct = (value: unknown, filterValue: unknown, filterLocale?: string) => boolean;
export type PContainsFilterFunct = (value: PContainsTypes, filterValue: PContainsTypes, filterLocale?: string) => boolean;
export type PStringFilterFunct = (value: string, filterValue: string, filterLocale?: string) => boolean;

export type PFilterFunct = 
    PUnknownFilterFunct | 
    PStringFilterFunct;

export interface PFilterFunctionMap {
    startsWith: PStringFilterFunct;
    endsWith: PStringFilterFunct;
    contains: PContainsFilterFunct;
    equals: PFilterFunct;
    notEquals: PFilterFunct;
    in: PFilterFunct;
    lt: PFilterFunct;
    lte: PFilterFunct;
    gt: PFilterFunct;
    gte: PFilterFunct;
    is: PFilterFunct;
    isNot: PFilterFunct;
    before: PFilterFunct;
    after: PFilterFunct;
    
    [key: string]: PFilterFunct;
}

export type Collection<T = unknown> = Dictionary<T> | NumericDictionary<T> | null | undefined;
export function isCollection<T = unknown>(value: unknown): value is Collection<T> {
    return typeof value === 'object' && value !== null;
}

export type ArrayFilterFunction = (value: unknown[], filterValue: unknown, ...args: unknown[]) => boolean;
export type DateFilterFunction = (value: Date, filterValue: Date, ...args: unknown[]) => boolean;
export type NumberFilterFunction = (value: number, filterValue: number, ...args: unknown[]) => boolean;
export type ObjectFilterFunction = (value: object, filterValue: unknown, ...args: unknown[]) => boolean;
export type StringFilterFunction = (value: string, filterValue: string, ...args: unknown[]) => boolean;

export type StartsEndsWithType = string | number | unknown[];
export type ContainsType = string | number | Date | unknown[] | boolean;

export type ContainsFilter = (value: ContainsType, filterValue: unknown, ...args: unknown[]) => boolean;
export type InFilter = (value: unknown, filterValue: ContainsType, ...args: unknown[]) => boolean;

export type StartsEndsWithFilter = (
    value: StartsEndsWithType, 
    filterValue: unknown, 
    checkFirstIdx?: boolean, 
    byReference?: boolean, 
    ...args: unknown[]
) => boolean;

/* export type FilterFunction = 
    ArrayFilterFunction | 
    ContainsFilter |
    DateFilterFunction | 
    InFilter |
    NumberFilterFunction | 
    ObjectFilterFunction |
    StartsEndsWithFilter |
    StringFilterFunction ;  */

export type FilterFunction = GenericFunction<boolean>;

export interface FilterFunctionMap extends Record<string, FilterFunction>{
    startsWith: StartsEndsWithFilter;
    endsWith: StartsEndsWithFilter;
    contains: ContainsFilter;
    equals: FilterFunction;
    notEquals: FilterFunction;
    in: InFilter;
    lt: FilterFunction;
    lte: FilterFunction;
    gt: FilterFunction;
    gte: FilterFunction;
    is: FilterFunction;
    isNot: FilterFunction;
    before: DateFilterFunction;
    after: DateFilterFunction;
    
    [key: string]: FilterFunction;
}