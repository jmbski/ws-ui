export interface PAccordionConfig {
    multiple?: boolean;
    style?: { [klass: string]: unknown } | null | undefined;
    styleClass?: string | undefined;
    expandIcon?: string | undefined;
    collapseIcon?: string | undefined;
    selectOnFocus?: boolean;

    [key: string]: unknown;
}
