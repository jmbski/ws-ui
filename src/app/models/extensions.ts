import { Injectable } from '@angular/core';

@Injectable()
export class Extensions {}

export type StringFormat = 'camel' | 'snake' | 'capitalize-first' | 'capitalize' | 'label' | 'hyphenated';

declare global {
    export interface String {
        toFormat(format: StringFormat): string;
        ReplaceAll(stringToReplace: string | RegExp, replaceWith: string): string;
    }
}

String.prototype.toFormat = function (this: string, format: StringFormat): string {
    let result: string = '';
    switch (format) {
        case 'camel':
            result = toCamelCase(this);
            break;
        case 'snake':
            break;
        case 'capitalize-first':
            result = this.charAt(0).toUpperCase() + this.slice(1);
            break;
        case 'capitalize':
            result = toCapitalized(this);
            break;
        case 'label':
            result = toLabelCase(this);
            break;
        case 'hyphenated':
            result = toHyphenated(this);
            break;
    }
    return result;
};

String.prototype.ReplaceAll = function (this: string, strToReplace: string | RegExp, replaceWith: string): string {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const result: string = strReplaceAll(this, strToReplace, replaceWith);
    return result;
};

export function strReplaceAll(input: string, strToReplace: string | RegExp, replaceWith: string): string {
    let result: string = input;
    if (strToReplace !== replaceWith) {
        if(typeof strToReplace === 'string') {
            while (result.includes(strToReplace)) {
                result = result.replace(strToReplace, replaceWith);
            }
        }
        else {
            result = result.replace(strToReplace, replaceWith);
        
        }
    }
    return result;
}

export function toCapitalized(input: string) {
    const labelString: string = toLabelCase(input);
    let newString: string = '';

    for (let i = 0; i < labelString.length; i++) {
        const char: string = labelString.charAt(i);
        if (i === 0) {
            newString += char;
        }
        else if (i > 0) {
            const previousChar: string = labelString.charAt(i - 1);
            if (previousChar === ' ') {
                newString += char.toUpperCase();
            }
            else {
                newString += char;
            }
        }
    }
    return newString;
}

export function toCamelCase(input: string): string {
    let result: string = '';
    const regex: RegExp = /[-_ ]/g;
    const words: string[] = input.split(regex);
    for (let i = 0; i < words.length; i++) {
        const word: string = words[i];
        if (i === 0) {
            result += word.toLowerCase();
        }
        else {
            result += word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
        }
    }

    return result;
}

export function toHyphenated(value: string) {
    return value.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
}

export function isChar(input: string): boolean {
    const charList: string = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const result: boolean = charList.includes(input);
    return result;
}

export function toLabelCase(str: string): string {
    // Remove all non-word characters (like hyphens and underscores) and replace camel cased words
    const labelCase = str.replace(/[\W_]+(.)/g, ' $1').replace(/([a-z\d])([A-Z])/g, '$1 $2');
  
    // Split the string into words
    const words = labelCase.split(' ');
  
    // Capitalize the first letter of each word and join back into a string
    const capitalizedWords = words.map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    
    return capitalizedWords;
}

export function capitalizeFirst(input: string): string {
    return input.charAt(0).toUpperCase() + input.slice(1);
}