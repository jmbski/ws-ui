export interface PRadioButtonConfig {
    value?: unknown;
    formControlName?: string | undefined;
    name?: string | undefined;
    disabled?: boolean | undefined;
    label?: string | undefined;
    variant?: 'filled' | 'outlined';
    tabindex?: number | undefined;
    inputId?: string | undefined;
    ariaLabelledBy?: string | undefined;
    ariaLabel?: string | undefined;
    style?: { [klass: string]: unknown } | null | undefined;
    styleClass?: string | undefined;
    labelStyleClass?: string | undefined;
    autofocus?: boolean | undefined;

    [key: string]: unknown;
}
