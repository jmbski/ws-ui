import { 
    includes, 
    isEqual,
} from 'lodash';
import { ContainsType, FilterFunctionMap, StartsEndsWithType, WeakObject } from 'warskald-ui/models';
import { isArray, isNumber, isString, TypeGuard } from 'warskald-ui/type-guards';

export function contains(value: unknown, filterValue: unknown): boolean {
    if(value == null || filterValue == null) {
        return false;
    }
    if(isEqual(value, filterValue)) {
        return true;
    }
    
    if(isArray(value)) {
        return value.some((v) => contains(v, filterValue));
    }

    if(typeof value === 'object') {
        return Object.values(value).some((v) => contains(v, filterValue));
    }

    if(isString(value) || isNumber(value)) {
        return includes(value.toString(), filterValue);
    }

    return false;
}

export function endsOrStartsWith(
    value: StartsEndsWithType, 
    filterValue: unknown, 
    checkFirstIdx: boolean = true,
    byReference: boolean = false
): boolean {
    if(value == null || filterValue == null) {
        return false;
    }
    
    if(isArray(value)) {
        const idx = checkFirstIdx ? 0 : value.length - 1;
        const item = value[idx];
        return byReference ? item === filterValue : isEqual(item, filterValue);
    }

    value = value.toString();
    filterValue = '' + filterValue;

    if(isString(value) && isString(filterValue)) {
        return checkFirstIdx ? value.startsWith(filterValue) : value.endsWith(filterValue);
    }

    return false;
}

export function greaterThanOrLessThan(value: unknown, filterValue: unknown, mode: 'gt' | 'gte' | 'lt' | 'lte'): boolean {
    if(value == null || filterValue == null) {
        return false;
    }

    if(typeof value === typeof filterValue) {
        switch(mode) {
            case 'gt':
                return value > filterValue;
            case 'gte':
                return value >= filterValue;
            case 'lt':
                return value < filterValue;
            case 'lte':
                return value <= filterValue;
        }
    }

    return false;
}

export function objHasKey(value: WeakObject, filterValue: unknown): boolean {
    if(value == null || filterValue == null) {
        return false;
    }

    if(typeof value === 'object') {
        return Object.keys(value).some((key) => isEqual(key, filterValue));
    }

    return false;
}

export function objHasValue(value: WeakObject, filterValue: unknown): boolean {
    if(value == null || filterValue == null) {
        return false;
    }

    if(typeof value === 'object') {
        return Object.values(value).some((val) => isEqual(val, filterValue));
    }

    return false;
}

export function objHasKeyValue(value: WeakObject, filterValue: WeakObject): boolean {
    if(value == null || filterValue == null) {
        return false;
    }

    if(typeof value === 'object' && typeof filterValue === 'object') {
        return Object.entries(filterValue).every(([key, val]) => isEqual(value[key], val));
    }

    return false;
}

export const FilterFunctions: FilterFunctionMap = {
    after: (value: Date, filterValue: Date) => value > filterValue,
    before: (value: Date, filterValue: Date) => value < filterValue,
    contains,
    endsWith: (value: StartsEndsWithType, filterValue: unknown, byReference?: boolean) => {
        return endsOrStartsWith(value, filterValue, false, byReference);
        
    },
    equals: (value: unknown, filterValue: unknown, byReference?: boolean) => {
        return byReference ? value === filterValue : isEqual(value, filterValue);
    },
    gt: (value: unknown, filterValue: unknown) => greaterThanOrLessThan(value, filterValue, 'gt'),
    gte: (value: unknown, filterValue: unknown) => greaterThanOrLessThan(value, filterValue, 'gte'),
    in: (value: unknown, filterValue: ContainsType) => contains(filterValue, value),
    is: (value: unknown, filterValue: TypeGuard<unknown>) => filterValue(value),
    isNot: (value: unknown, filterValue: TypeGuard<unknown>) => !filterValue(value),
    notEquals: (value: unknown, filterValue: unknown) => !isEqual(value, filterValue),
    lt: (value: unknown, filterValue: unknown) => greaterThanOrLessThan(value, filterValue, 'lt'),
    lte: (value: unknown, filterValue: unknown) => greaterThanOrLessThan(value, filterValue, 'lte'),
    startsWith: (value: StartsEndsWithType, filterValue: unknown, byReference?: boolean) => {
        return endsOrStartsWith(value, filterValue, true, byReference);
    },
    objHasKey,
    objHasValue,
    objHasKeyValue,
};