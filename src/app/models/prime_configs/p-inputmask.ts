export interface PInputmaskConfig {
    type?: string;
    slotChar?: string;
    autoClear?: boolean;
    showClear?: boolean;
    style?: { [klass: string]: unknown } | null | undefined;
    inputId?: string | undefined;
    styleClass?: string | undefined;
    placeholder?: string | undefined;
    size?: number | undefined;
    maxlength: number | string | null;
    tabindex?: string | undefined;
    title?: string | undefined;
    variant?: 'filled' | 'outlined';
    ariaLabel?: string | undefined;
    ariaLabelledBy?: string | undefined;
    ariaRequired?: boolean | undefined;
    disabled?: boolean | undefined;
    readonly?: boolean | undefined;
    unmask?: boolean | undefined;
    mask?: string;
    name?: string | undefined;
    required?: boolean | undefined;
    characterPattern?: string;
    autofocus?: boolean | undefined;
    autocomplete?: string | undefined;
    keepBuffer?: boolean;

    [key: string]: unknown;
}
