export interface PSliderConfig {
    animate?: boolean | undefined;
    disabled?: boolean | undefined;
    min?: number;
    max?: number;
    orientation?: 'horizontal' | 'vertical';
    step?: number | undefined;
    range?: boolean | undefined;
    style?: { [klass: string]: unknown } | null | undefined;
    styleClass?: string | undefined;
    ariaLabel?: string | undefined;
    ariaLabelledBy?: string | undefined;
    tabindex?: number;
    autofocus?: boolean | undefined;

    [key: string]: unknown;
}
