export interface PInputSwitchConfig {
    style?: { [klass: string]: unknown } | null | undefined;
    styleClass?: string | undefined;
    tabindex?: number | undefined;
    inputId?: string | undefined;
    name?: string | undefined;
    disabled?: boolean | undefined;
    readonly?: boolean | undefined;
    trueValue?: unknown;
    falseValue?: unknown;
    ariaLabel?: string | undefined;
    ariaLabelledBy?: string | undefined;
    autofocus?: boolean | undefined;

    [key: string]: unknown;
}
