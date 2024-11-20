import { ElementRef, TemplateRef } from '@angular/core';

export interface PPasswordConfig {
    ariaLabel?: string | undefined;
    ariaLabelledBy?: string | undefined;
    label?: string | undefined;
    disabled?: boolean | undefined;
    promptLabel?: string | undefined;
    mediumRegex?: string;
    strongRegex?: string;
    weakLabel?: string | undefined;
    mediumLabel?: string | undefined;
    maxLength?: number | undefined;
    strongLabel?: string | undefined;
    inputId?: string | undefined;
    feedback?: boolean;
    appendTo?: HTMLElement | ElementRef | TemplateRef<unknown> | string | null | undefined | unknown;
    toggleMask?: boolean | undefined;
    inputStyleClass?: string | undefined;
    styleClass?: string | undefined;
    style?: { [klass: string]: unknown } | null | undefined;
    inputStyle?: { [klass: string]: unknown } | null | undefined;
    showTransitionOptions?: string;
    hideTransitionOptions?: string;
    autocomplete?: string | undefined;
    placeholder?: string | undefined;
    showClear?: boolean;
    autofocus?: boolean | undefined;
    variant?: 'filled' | 'outlined';

    [key: string]: unknown;
}
