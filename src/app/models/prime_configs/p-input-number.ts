export interface PInputNumberConfig {
    showButtons?: boolean;
    format?: boolean;
    buttonLayout?: string;
    inputId?: string | undefined;
    styleClass?: string | undefined;
    style?: { [klass: string]: unknown } | null | undefined;
    placeholder?: string | undefined;
    size?: number | undefined;
    maxlength?: number | undefined;
    tabindex?: number | undefined;
    title?: string | undefined;
    ariaLabelledBy?: string | undefined;
    ariaLabel?: string | undefined;
    ariaRequired?: boolean | undefined;
    name?: string | undefined;
    required?: boolean | undefined;
    autocomplete?: string | undefined;
    min?: number | undefined;
    max?: number | undefined;
    incrementButtonClass?: string | undefined;
    decrementButtonClass?: string | undefined;
    incrementButtonIcon?: string | undefined;
    decrementButtonIcon?: string | undefined;
    readonly?: boolean;
    step?: number;
    allowEmpty?: boolean;
    locale?: string | undefined;
    localeMatcher?: string | undefined;
    mode?: string;
    currency?: string | undefined;
    currencyDisplay?: string | undefined;
    useGrouping?: boolean;
    variant?: 'filled' | 'outlined';
    minFractionDigits?: number | undefined;
    maxFractionDigits?: number | undefined;
    prefix?: string | undefined;
    suffix?: string | undefined;
    inputStyle?: unknown;
    inputStyleClass?: string | undefined;
    showClear?: boolean;
    autofocus?: boolean | undefined;
    disabled?: boolean;

    [key: string]: unknown;
}
