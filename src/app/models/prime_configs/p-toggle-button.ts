export interface PToggleButtonConfig {
    onLabel?: string | undefined;
    offLabel?: string | undefined;
    onIcon?: string | undefined;
    offIcon?: string | undefined;
    ariaLabel?: string | undefined;
    ariaLabelledBy?: string | undefined;
    disabled?: boolean | undefined;
    style?: unknown;
    styleClass?: string | undefined;
    inputId?: string | undefined;
    tabindex?: number | undefined;
    iconPos?: 'left' | 'right';
    autofocus?: boolean | undefined;

    [key: string]: unknown;
}
