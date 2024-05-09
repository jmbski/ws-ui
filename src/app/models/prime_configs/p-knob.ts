export interface PKnobConfig {
    styleClass?: string | undefined;
    style?: { [klass: string]: unknown } | null | undefined;
    ariaLabel?: string | undefined;
    ariaLabelledBy?: string | undefined;
    tabindex?: number;
    valueColor?: string;
    rangeColor?: string;
    textColor?: string;
    valueTemplate?: string;
    name?: string | undefined;
    size?: number;
    step?: number;
    min?: number;
    max?: number;
    strokeWidth?: number;
    disabled?: boolean | undefined;
    showValue?: boolean;
    readonly?: boolean;

    [key: string]: unknown;
}
