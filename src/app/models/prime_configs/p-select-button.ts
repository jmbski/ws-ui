export interface PSelectButtonConfig {
    options?: unknown[] | undefined;
    optionLabel?: string | undefined;
    optionValue?: string | undefined;
    optionDisabled?: string | undefined;
    unselectable?: boolean;
    tabindex?: number;
    multiple?: boolean | undefined;
    allowEmpty?: boolean;
    style?: unknown;
    styleClass?: string | undefined;
    ariaLabelledBy?: string | undefined;
    disabled?: boolean | undefined;
    dataKey?: string | undefined;
    autofocus?: boolean | undefined;

    [key: string]: unknown;
}
