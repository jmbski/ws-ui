import {
    LocalObject,
    WSMenuItem,
} from 'warskald-ui/models';
import { LoremIpsum } from 'lorem-ipsum';

export interface XMLPropertyDef {
    name: string;
    type: string;
}

export interface XMLCollectionDef {
    name: string;
    properties: XMLPropertyDef[];
    count: number;
}

export class Utils implements LocalObject {
    public readonly LOCAL_ID: string = 'utils';
    
    public static printMap(map: Map<unknown, unknown>): void {
        for (const [key, value] of map.entries()) {
            console.log(key, value);
        }
    }

    public static compareStrings(a: string, b: string, threshold: number = 0.7): boolean {
        a = a.toLowerCase().replace(/\s/g, '');
        b = b.toLowerCase().replace(/\s/g, '');
      
        if (a === b) return true;
      
        const setA = new Set(a.split(''));
        const setB = new Set(b.split(''));
      
        const intersection = new Set([...setA].filter(x => setB.has(x)));
      
        // calculate Jaccard similarity
        const similarity = intersection.size / (setA.size + setB.size - intersection.size);
      
        return similarity >= threshold;
    }

    public static HandleError(error?: Error | unknown, funcName?: string, additional?: string) {
        let errorMessage: string = 'CAUGHT ERROR:\n';
        errorMessage += funcName ? `At function ${funcName}\n` : '';
        errorMessage += additional ? `Additional Information: ${additional}\n` : '';
        errorMessage += error ? `Logged error object: ${error}\n` : '';

        console.error(errorMessage);
    }

    /**
     * Retrieves the command function from a menu item, or a default function that logs the event to the console.
     * 
     * @todo improve typing for the event and function
     * 
     * @param {WSMenuItem} input - The value of the menu item to get the command from
     * @returns the command function of the menu item, or a default function that logs the event to the console
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    public static getCommand(input: WSMenuItem): (event: any) => void {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        let command: (event: any) => void = (event: any) => {
            console.log(event);
        };
        if (input?.command) {
            command = input.command;
        }
        return command;
    }

    /**
     * Converts a string dimensional value to a number representing pixels.
     * 
     * @param input - Value to convert
     * @returns 
     */
    public static stringToPx(input: string): number {
        let num: number = parseFloat(input);
        if (!isNaN(num)) {
            num *= input.endsWith('em') ? 16 : 1;
        }
        return num;
    }
    
    /**
     * Retrieves an element from the DOM, either by the element itself or by a query selector string. If the element is not found, 
     * it returns undefined. If the parentElement is not provided, it defaults to the document body.
     * 
     * @param element {HTMLElement | string} - The element to retrieve, or a query selector string to find the element
     * @param parentElement {HTMLElement | string | null} - The parent element to search for the element in, or a query selector 
     *      string to find the parent element
     * @returns - The provided element if it is an HTMLElement, an element from the DOM if it is a query selector string, or
     *      undefined if the element is not found
     */
    public static retrieveElement(element?: HTMLElement | string, parentElement?: HTMLElement | string | null): HTMLElement | undefined {
        /** @todo: update this to be able to retrieve specifically HTMLElements or SVGElements */

        let result: HTMLElement | undefined = undefined;

        if(parentElement && typeof parentElement === 'string') {
            const _parentElement = document.querySelector(parentElement) as HTMLElement;
            if(_parentElement instanceof HTMLElement) {
                parentElement = _parentElement;
            }
        }

        if(!parentElement || !(parentElement instanceof HTMLElement)) {
            parentElement = document.body;
        }

        if (typeof element === 'string') {
            const foundElement = parentElement.querySelector(element);

            if(foundElement instanceof HTMLElement) {
                result = foundElement;
            }
        }
        else if (element instanceof HTMLElement) {
            result = element;
        }

        return result;
    }

    /**
     * Generates a random set of data for testing purposes in xml format and returns it as a string.
     * The data represents an array of objects, each with a set of properties and values. These are intended
     * to be parsed into row data for a table. The structure of the xml is as follows:
     *  <ws:data-collection>
     *      <ws:member>
     *          <ws:collection-name>
     *              <ws:property>value</ws:property>
     *              etc...
     *          </ws:collection-name>
     *      </ws:member>
     *      <ws:member>
     *          <ws:collection-name-2>
     *              <ws:property>value</ws:property>
     *              etc...
     *          </ws:collection-name-2>
     *      </ws:member>
     *      etc...
     *  </ws:data-collection>
     * 
     * 
     * @returns - A string representing the xml data
     */
    public static generateXMLData(structure: XMLCollectionDef[]): string {
        let xmlString: string = '<ws:data-collection>';
        structure.forEach((collection: XMLCollectionDef) => {
            for(let i = 0; i < collection.count; i++) {
                xmlString += `<ws:member><ws:${collection.name}>`;
                collection.properties.forEach((property: XMLPropertyDef) => {
                    let value: string = '';
                    switch(property.type) {
                        case 'int':
                            value = Utils.GetRandomInt().toString();
                            break;
                        case 'float':
                            value = Utils.GetRandomFloat().toString();
                            break;
                        case 'boolean':
                            value = Utils.GetRandomBoolean().toString();
                            break;
                        case 'date':
                            value = Utils.GetRandomDate().toISOString();
                            break;
                        case 'string':
                        default:
                            value = Utils.GetRandomSentence();
                            break;
                    }
                    xmlString += `<ws:${property.name}>${value}</ws:${property.name}>`;
                });
                xmlString += `</ws:${collection.name}></ws:member>`;
            }
        });
        xmlString += '</ws:data-collection>';
        return xmlString;

    }

    public static GetRandomInt(max: number = 100): number {
        return Math.floor(Math.random() * max);
    }

    public static GetRandomFloat(max: number = 100): number {
        return Math.random() * max;
    }

    public static GetRandomBoolean(): boolean {
        return Math.random() > 0.5;
    }

    public static GetRandomDate(withinDateRange: string = '10y'): Date {
        const date: Date = new Date();
        let range: number = 0;
        let unit: string = '';
        const dateRange: string[] = withinDateRange.match(/(\d+)([yMwdhms])/) || [];
        if (dateRange.length > 2) {
            range = parseInt(dateRange[1]);
            unit = dateRange[2];
        }
        switch (unit) {
            case 'y':
                date.setFullYear(date.getFullYear() - range);
                break;
            case 'M':
                date.setMonth(date.getMonth() - range);
                break;
            case 'w':
                date.setDate(date.getDate() - (range * 7));
                break;
            case 'd':
                date.setDate(date.getDate() - range);
                break;
            case 'h':
                date.setHours(date.getHours() - range);
                break;
            case 'm':
                date.setMinutes(date.getMinutes() - range);
                break;
            case 's':
                date.setSeconds(date.getSeconds() - range);
                break;
            default:
                break;
        }
        return date;
    }

    public static GetRandomSentence(): string {
        const lorem: LoremIpsum = new LoremIpsum({

            wordsPerSentence: {
                max: 16,
                min: 4
            }
        });
        return lorem.generateSentences(1);
    }

    public static GetRandomParagraph(): string {
        const lorem: LoremIpsum = new LoremIpsum({

            wordsPerSentence: {
                max: 16,
                min: 4
            }
        });
        return lorem.generateParagraphs(1);
    }


}
