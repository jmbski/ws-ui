/**
 * Matches the type for the Angular NgClass properties
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type NgStyleClass = string | string[] | Set<string> | { [klass: string]: any; };

export type CssStyleObject = Partial<CSSStyleDeclaration>;

export type NgStyleValues = CssStyleObject | string;

export interface StyleGroup {
    baseClass?: string;
    optionalClass?: string;
    style?: NgStyleValues;
    overrideDefault?: boolean;
}